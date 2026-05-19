import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCabinFilter } from "./addCabinFilter";
import { deleteCabinFilter } from "./deleteCabinFilter";
import { getCabinFilters } from "./getCabinFilters";
import { updateCabinFilter } from "./updateCabinFilter";
import type {
  CabinFilter,
  CabinFilterInsertPayload,
  CabinFilterUpdatePayload,
} from "./types";

export const cabinFiltersQueryKey = () => ["cabinFilters"] as const;

export function useCabinFilters() {
  return useQuery<CabinFilter[]>({
    queryKey: cabinFiltersQueryKey(),
    queryFn: () => getCabinFilters(),
  });
}

export function useAddCabinFilter(options?: {
  onSuccess?: (data: CabinFilter[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<CabinFilter[], Error, CabinFilterInsertPayload>({
    mutationFn: (filter) => addCabinFilter(filter),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: cabinFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useUpdateCabinFilter(options?: {
  onSuccess?: (data: CabinFilter[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<CabinFilter[], Error, CabinFilterUpdatePayload>({
    mutationFn: (filter) => updateCabinFilter(filter),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: cabinFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useDeleteCabinFilter(options?: {
  onSuccess?: (data: CabinFilter[] | null) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<CabinFilter[] | null, Error, { id: number }>({
    mutationFn: ({ id }) => deleteCabinFilter(id),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: cabinFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}
