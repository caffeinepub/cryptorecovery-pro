import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ChatMessageInput,
  RecoveryRequest,
  RequestStatus,
  RequestSubmission,
  Testimonial,
} from "../backend";
import { useActor } from "./useActor";

export function useGetTopTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<Testimonial> | null>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTopTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllServiceListings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["serviceListings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServiceListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<RecoveryRequest>>({
    queryKey: ["allRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: RequestSubmission) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitRequest(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRequests"] });
    },
  });
}

export function useUpdateRequestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requestId,
      status,
    }: { requestId: bigint; status: RequestStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateRequestStatus(requestId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRequests"] });
    },
  });
}

// ─── Live Chat Hooks ──────────────────────────────────────────────────────────

export function useSendVisitorMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (input: ChatMessageInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendVisitorMessage(input);
    },
  });
}

export function useGetChatSession(sessionId: string, enabled = true) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["chatSession", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return [];
      return actor.getChatSession(sessionId);
    },
    enabled: !!actor && !isFetching && enabled && !!sessionId,
    refetchInterval: enabled ? 5000 : false,
  });
}

export function useGetAllChatSessions() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allChatSessions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllChatSessions();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });
}

export function useAdminReplyToChat() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sessionId,
      content,
    }: { sessionId: string; content: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminReplyToChat(sessionId, content);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["chatSession", vars.sessionId],
      });
      queryClient.invalidateQueries({ queryKey: ["allChatSessions"] });
    },
  });
}

export function useMarkChatResolved() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.markChatResolved(sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allChatSessions"] });
    },
  });
}
