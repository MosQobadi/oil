import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOilFilter } from "./addOilFilter";
import { deleteOilFilter } from "./deleteOilFilter";
import { getOilFilters } from "./getOilFilters";
import { updateOilFilter } from "./updateOilFilter";
import type {
  OilFilter,
  OilFilterInsertPayload,
  OilFilterUpdatePayload,
} from "./types";

export const oilFiltersQueryKey = () => ["oilFilters"] as const;

export function useOilFilters() {
  return useQuery<OilFilter[]>({
    queryKey: oilFiltersQueryKey(),
    queryFn: () => getOilFilters(),
  });
}

export function useAddOilFilter(options?: {
  onSuccess?: (data: OilFilter[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<OilFilter[], Error, OilFilterInsertPayload>({
    mutationFn: (filter) => addOilFilter(filter),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: oilFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useUpdateOilFilter(options?: {
  onSuccess?: (data: OilFilter[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<OilFilter[], Error, OilFilterUpdatePayload>({
    mutationFn: (filter) => updateOilFilter(filter),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: oilFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useDeleteOilFilter(options?: {
  onSuccess?: (data: OilFilter[] | null) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<OilFilter[] | null, Error, { id: number }>({
    mutationFn: ({ id }) => deleteOilFilter(id),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: oilFiltersQueryKey() });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}
