import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RecoveryRequest {
    status: RequestStatus;
    serviceTier: string;
    name: string;
    user: Principal;
    walletType: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface RequestSubmission {
    serviceTier: string;
    name: string;
    walletType: string;
    email: string;
    message: string;
}
export interface ServiceListing {
    name: string;
    description: string;
    currency: string;
    price: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface Testimonial {
    clientName: string;
    message: string;
    rating: bigint;
}
export interface ChatMessageInput {
    sessionId: string;
    visitorName: string;
    visitorEmail: string;
    content: string;
}
export interface ChatMessage {
    id: bigint;
    sessionId: string;
    content: string;
    isFromAdmin: boolean;
    timestamp: bigint;
    senderName: string;
}
export interface ChatSession {
    sessionId: string;
    visitorName: string;
    visitorEmail: string;
    lastActivity: bigint;
    isResolved: boolean;
    messageCount: bigint;
}
export enum RequestStatus {
    pending = "pending",
    completed = "completed",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addServiceListing(listing: ServiceListing): Promise<bigint>;
    addTestimonial(testimonial: Testimonial): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllRequests(): Promise<Array<RecoveryRequest>>;
    getAllServiceListings(): Promise<Array<ServiceListing>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getTopTestimonials(): Promise<Array<Testimonial> | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserRequests(): Promise<Array<RecoveryRequest>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitRequest(request: RequestSubmission): Promise<bigint>;
    updateRequestStatus(requestId: bigint, status: RequestStatus): Promise<void>;
    sendVisitorMessage(input: ChatMessageInput): Promise<bigint>;
    adminReplyToChat(sessionId: string, content: string): Promise<bigint>;
    getChatSession(sessionId: string): Promise<Array<ChatMessage>>;
    getAllChatSessions(): Promise<Array<ChatSession>>;
    markChatResolved(sessionId: string): Promise<void>;
}
