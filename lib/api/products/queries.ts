import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "./addProduct";
import { deleteProduct } from "./deleteProduct";
import { getProducts } from "./getProducts";
import { updateProduct } from "./updateProduct";
import type {
  Product,
  ProductCategory,
  ProductInsertPayload,
  ProductUpdatePayload,
} from "./types";

export const productsQueryKey = (category: ProductCategory) =>
  ["products", category] as const;

export function useProducts(category: ProductCategory) {
  return useQuery<Product[]>({
    queryKey: productsQueryKey(category),
    queryFn: () => getProducts(category),
  });
}

export function useAddProduct(
  category: ProductCategory,
  options?: {
    onSuccess?: (data: Product[]) => void;
    onError?: (error: unknown) => void;
  },
) {
  const queryClient = useQueryClient();

  return useMutation<Product[], Error, ProductInsertPayload>({
    mutationFn: (product) => addProduct(category, product),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: productsQueryKey(category) });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useUpdateProduct(
  category: ProductCategory,
  options?: {
    onSuccess?: (data: Product[]) => void;
    onError?: (error: unknown) => void;
  },
) {
  const queryClient = useQueryClient();

  return useMutation<Product[], Error, ProductUpdatePayload>({
    mutationFn: (product) => updateProduct(category, product),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: productsQueryKey(category) });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}

export function useDeleteProduct(
  category: ProductCategory,
  options?: {
    onSuccess?: (data: Product[] | null) => void;
    onError?: (error: unknown) => void;
  },
) {
  const queryClient = useQueryClient();

  return useMutation<Product[] | null, Error, { id: number }>({
    mutationFn: ({ id }) => deleteProduct(category, id),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: productsQueryKey(category) });
      options?.onSuccess?.(data);
    },
    onError(error) {
      options?.onError?.(error);
    },
  });
}
