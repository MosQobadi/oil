import type { BaseProduct } from "./types";
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

export default function FuelFilterAdminList(props: ProductAdminListProps) {
  return <ProductAdminList {...props} />;
}
