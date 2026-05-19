import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addAirFilter } from "./addAirFilter";
import { deleteAirFilter } from "./deleteAirFilter";
import { getAirFilters } from "./getAirFilters";
import { updateAirFilter } from "./updateAirFilter";
import type {
  AirFilter,
  AirFilterInsertPayload,
  AirFilterUpdatePayload,
} from "./types";

export const airFiltersQueryKey = () => ["airFilters"] as const;

export function useAirFilters() {
  return useQuery<AirFilter[]>({
    queryKey: airFiltersQueryKey(),
    queryFn: () => getAirFilters(),
  });
}

export function useAddAirFilter(options?: {
  onSuccess?: (data: AirFilter[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<AirFilter[], Error, AirFilterInsertPayload>({
    mutationFn: (filter) => addAirFilter(filter),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: airFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useUpdateAirFilter(options?: {
  onSuccess?: (data: AirFilter[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<AirFilter[], Error, AirFilterUpdatePayload>({
    mutationFn: (filter) => updateAirFilter(filter),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: airFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useDeleteAirFilter(options?: {
  onSuccess?: (data: AirFilter[] | null) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<AirFilter[] | null, Error, { id: number }>({
    mutationFn: ({ id }) => deleteAirFilter(id),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: airFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}
