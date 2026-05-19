import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCar } from "./addCar";
import { deleteCar } from "./deleteCar";
import { getCars } from "./getCars";
import { updateCar } from "./updateCar";
import type { Car, CarInsertPayload, CarUpdatePayload } from "./types";

export const carsQueryKey = ["cars"] as const;

export function useCars() {
  return useQuery<Car[]>({
    queryKey: carsQueryKey,
    queryFn: getCars,
  });
}

export function useAddCar(options?: {
  onSuccess?: (data: Car[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<Car[], Error, CarInsertPayload>({
    mutationFn: (car) => addCar(car),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: carsQueryKey });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useUpdateCar(options?: {
  onSuccess?: (data: Car[]) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<Car[], Error, CarUpdatePayload>({
    mutationFn: (car) => updateCar(car),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: carsQueryKey });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useDeleteCar(options?: {
  onSuccess?: (data: Car[] | null) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<Car[] | null, Error, { id: number }>({
    mutationFn: ({ id }) => deleteCar(id),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: carsQueryKey });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}
