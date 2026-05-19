import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOil } from "./addOil";
import { deleteOil } from "./deleteOil";
import { getOils } from "./getOils";
import { updateOil } from "./updateOil";
import type { Oil, OilInsertPayload, OilUpdatePayload } from "./types";

export const oilsQueryKey = () => ["oils"] as const;

export function useOils() {
  return useQuery<Oil[]>({
    queryKey: oilsQueryKey(),
    queryFn: () => getOils(),
  });
}

export function useAddOil(options?: {
  onSuccess?: (data: Oil[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<Oil[], Error, OilInsertPayload>({
    mutationFn: (oil) => addOil(oil),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: oilsQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useUpdateOil(options?: {
  onSuccess?: (data: Oil[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<Oil[], Error, OilUpdatePayload>({
    mutationFn: (oil) => updateOil(oil),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: oilsQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useDeleteOil(options?: {
  onSuccess?: (data: Oil[] | null) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<Oil[] | null, Error, { id: number }>({
    mutationFn: ({ id }) => deleteOil(id),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: oilsQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}
