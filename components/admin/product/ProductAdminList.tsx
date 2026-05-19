"use client";

import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import type { BaseProduct } from "./types";
import { useLanguage } from "@/lib/language-context";

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

export default function ProductAdminList({
  title,
  description,
  filteredProducts,
  isLoading,
  isError,
  emptyText,
  onEdit,
  onDelete,
}: ProductAdminListProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} {t.admin.items}
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-border/50 bg-background p-8 text-center text-sm text-muted-foreground">
          {t.common.loading}
        </div>
      ) : isError ? (
        <div className="rounded-3xl border border-border/50 bg-background p-8 text-center text-sm text-destructive">
          {t.common.error}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-border/50 bg-background p-8 text-center text-sm text-muted-foreground">
          {emptyText}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="grid gap-4 rounded-3xl border border-border bg-background p-5 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.admin.brand}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {product.brand}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.admin.name}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {product.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.admin.model}
                    </p>
                    <p className="text-sm text-foreground">{product.model}</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.admin.price}
                    </p>
                    <p className="text-sm text-foreground">
                      ${product?.price?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.admin.badge}
                    </p>
                    <p className="text-sm text-foreground">
                      {product.badge || "—"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product)}
                  className="w-full sm:w-auto"
                >
                  <Edit3 className="h-4 w-4" /> {t.admin.edit}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(product)}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4" /> {t.admin.delete}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
