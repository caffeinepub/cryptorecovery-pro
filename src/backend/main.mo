import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module Request {
    public func compareByTimestampDesc(r1 : RecoveryRequest, r2 : RecoveryRequest) : Order.Order {
      Int.compare(r2.timestamp, r1.timestamp);
    };
  };

  module Testimonial {
    public func compareByRating(t1 : Testimonial, t2 : Testimonial) : Order.Order {
      Nat.compare(t2.rating, t1.rating);
    };
  };

  module ChatMsg {
    public func compareByTimestamp(m1 : ChatMessage, m2 : ChatMessage) : Order.Order {
      Int.compare(m1.timestamp, m2.timestamp);
    };
  };

  type RecoveryRequest = {
    user : Principal;
    name : Text;
    email : Text;
    walletType : Text;
    message : Text;
    serviceTier : Text;
    timestamp : Int;
    status : RequestStatus;
  };

  type ServiceListing = {
    name : Text;
    description : Text;
    price : Nat;
    currency : Text;
  };

  type Testimonial = {
    clientName : Text;
    message : Text;
    rating : Nat;
  };

  type RequestStatus = {
    #pending;
    #inProgress;
    #completed;
  };

  type ChatMessage = {
    id : Nat;
    sessionId : Text;
    content : Text;
    isFromAdmin : Bool;
    timestamp : Int;
    senderName : Text;
  };

  type ChatSession = {
    sessionId : Text;
    visitorName : Text;
    visitorEmail : Text;
    lastActivity : Int;
    isResolved : Bool;
    messageCount : Nat;
  };

  public type RequestSubmission = {
    name : Text;
    email : Text;
    walletType : Text;
    message : Text;
    serviceTier : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  public type ChatMessageInput = {
    sessionId : Text;
    visitorName : Text;
    visitorEmail : Text;
    content : Text;
  };

  let requests = Map.empty<Nat, RecoveryRequest>();
  let serviceListings = Map.empty<Nat, ServiceListing>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let userRequests = Map.empty<Principal, Set.Set<Nat>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let chatMessages = Map.empty<Nat, ChatMessage>();
  let chatSessions = Map.empty<Text, ChatSession>();
  var nextRequestId = 1;
  var nextListingId = 1;
  var nextTestimonialId = 1;
  var nextMessageId = 1;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Recovery Request Management
  public shared ({ caller }) func submitRequest(request : RequestSubmission) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit requests");
    };
    let id = nextRequestId;
    nextRequestId += 1;

    let newRequest : RecoveryRequest = {
      request with
      user = caller;
      timestamp = Time.now();
      status = #pending;
    };
    requests.add(id, newRequest);

    switch (userRequests.get(caller)) {
      case (null) { userRequests.add(caller, Set.singleton<Nat>(id)) };
      case (?existingSet) { existingSet.add(id) };
    };

    id;
  };

  public query ({ caller }) func getUserRequests() : async [RecoveryRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their requests");
    };

    switch (userRequests.get(caller)) {
      case (null) { [] };
      case (?idSet) {
        idSet.toArray().map(
          func(id) {
            switch (requests.get(id)) {
              case (null) { Runtime.trap("Request not found") };
              case (?req) { req };
            };
          }
        );
      };
    };
  };

  public query ({ caller }) func getAllRequests() : async [RecoveryRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all requests");
    };
    requests.values().toArray().sort(Request.compareByTimestampDesc);
  };

  public shared ({ caller }) func updateRequestStatus(requestId : Nat, status : RequestStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update request status");
    };

    switch (requests.get(requestId)) {
      case (null) { Runtime.trap("Request not found") };
      case (?request) {
        let updatedRequest = { request with status };
        requests.add(requestId, updatedRequest);
      };
    };
  };

  // Service Listing Management
  public shared ({ caller }) func addServiceListing(listing : ServiceListing) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add service listings");
    };

    let id = nextListingId;
    nextListingId += 1;
    serviceListings.add(id, listing);
    id;
  };

  public query func getAllServiceListings() : async [ServiceListing] {
    serviceListings.values().toArray();
  };

  // Testimonial Management
  public shared ({ caller }) func addTestimonial(testimonial : Testimonial) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add testimonials");
    };
    let id = nextTestimonialId;
    nextTestimonialId += 1;
    testimonials.add(id, testimonial);
    id;
  };

  public query func getTopTestimonials() : async ?[Testimonial] {
    if (testimonials.isEmpty()) { return null };
    let sorted = testimonials.values().toArray().sort(Testimonial.compareByRating);
    ?sorted.sliceToArray(0, Nat.min(5, sorted.size()));
  };

  // Live Chat Management
  public shared func sendVisitorMessage(input : ChatMessageInput) : async Nat {
    let id = nextMessageId;
    nextMessageId += 1;
    let now = Time.now();

    let msg : ChatMessage = {
      id;
      sessionId = input.sessionId;
      content = input.content;
      isFromAdmin = false;
      timestamp = now;
      senderName = input.visitorName;
    };
    chatMessages.add(id, msg);

    // Update or create session
    let existingCount = switch (chatSessions.get(input.sessionId)) {
      case (null) { 0 };
      case (?s) { s.messageCount };
    };
    let session : ChatSession = {
      sessionId = input.sessionId;
      visitorName = input.visitorName;
      visitorEmail = input.visitorEmail;
      lastActivity = now;
      isResolved = false;
      messageCount = existingCount + 1;
    };
    chatSessions.add(input.sessionId, session);

    id;
  };

  public shared ({ caller }) func adminReplyToChat(sessionId : Text, content : Text) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can reply to chats");
    };
    let id = nextMessageId;
    nextMessageId += 1;
    let now = Time.now();

    let msg : ChatMessage = {
      id;
      sessionId;
      content;
      isFromAdmin = true;
      timestamp = now;
      senderName = "Support Agent";
    };
    chatMessages.add(id, msg);

    switch (chatSessions.get(sessionId)) {
      case (null) {};
      case (?session) {
        chatSessions.add(sessionId, { session with lastActivity = now; messageCount = session.messageCount + 1 });
      };
    };

    id;
  };

  public query func getChatSession(sessionId : Text) : async [ChatMessage] {
    chatMessages.values().toArray()
      .filter(func(m : ChatMessage) : Bool { m.sessionId == sessionId })
      .sort(ChatMsg.compareByTimestamp);
  };

  public query ({ caller }) func getAllChatSessions() : async [ChatSession] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all chats");
    };
    chatSessions.values().toArray();
  };

  public shared ({ caller }) func markChatResolved(sessionId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can resolve chats");
    };
    switch (chatSessions.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        chatSessions.add(sessionId, { session with isResolved = true });
      };
    };
  };
};
