"use client";

import type { BaseProduct } from "./types";
import { useLanguage } from "@/lib/language-context";
import ProductAdminList from "./ProductAdminList";

interface ProductAdminListProps {
  title: string;
  description: string;
  products: BaseProduct[];
  filteredProducts: BaseProduct[];
  isLoading: boolean;
  isError: boolean;
  emptyText: string;
  onEdit: (product: BaseProduct) => void;
  onDelete: (product: BaseProduct) => void;
}

export default function OilAdminList(props: ProductAdminListProps) {
  return <ProductAdminList {...props} />;
}
