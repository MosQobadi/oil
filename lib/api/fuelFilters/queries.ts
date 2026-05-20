import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFuelFilter } from "./addFuelFilter";
import { deleteFuelFilter } from "./deleteFuelFilter";
import { getFuelFilters } from "./getFuelFilters";
import { updateFuelFilter } from "./updateFuelFilter";
import type {
  FuelFilter,
  FuelFilterInsertPayload,
  FuelFilterUpdatePayload,
} from "./types";

export const fuelFiltersQueryKey = () => ["fuelFilters"] as const;

export function useFuelFilters() {
  return useQuery<FuelFilter[]>({
    queryKey: fuelFiltersQueryKey(),
    queryFn: () => getFuelFilters(),
  });
}

export function useAddFuelFilter(options?: {
  onSuccess?: (data: FuelFilter[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<FuelFilter[], Error, FuelFilterInsertPayload>({
    mutationFn: (filter) => addFuelFilter(filter),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: fuelFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useUpdateFuelFilter(options?: {
  onSuccess?: (data: FuelFilter[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<FuelFilter[], Error, FuelFilterUpdatePayload>({
    mutationFn: (filter) => updateFuelFilter(filter),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: fuelFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useDeleteFuelFilter(options?: {
  onSuccess?: (data: FuelFilter[] | null) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<FuelFilter[] | null, Error, { id: number }>({
    mutationFn: ({ id }) => deleteFuelFilter(id),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: fuelFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}
