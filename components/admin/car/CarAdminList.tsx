"use client";

import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import type { Car } from "@/lib/api/cars/types";
import { useLanguage } from "@/lib/language-context";

interface CarAdminListProps {
  cars: Car[];
  filteredCars: Car[];
  isLoading: boolean;
  isError: boolean;
  emptyText: string;
  onEdit: (car: Car) => void;
  onDelete: (car: Car) => void;
}

export default function CarAdminList({
  cars,
  filteredCars,
  isLoading,
  isError,
  emptyText,
  onEdit,
  onDelete,
}: CarAdminListProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {t.admin.carListTitle}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.admin.carListDescription}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {filteredCars.length} {t.admin.items}
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
      ) : filteredCars.length === 0 ? (
        <div className="rounded-3xl border border-border/50 bg-background p-8 text-center text-sm text-muted-foreground">
          {emptyText}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="grid gap-4 rounded-3xl border border-border bg-background p-5 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.admin.brand}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {car.brand}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.admin.model}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {car.model}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.admin.year}
                    </p>
                    <p className="text-sm text-foreground">{car.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.admin.engine}
                    </p>
                    <p className="text-sm text-foreground">{car.engine}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.admin.detailsLabel}
                    </p>
                    <p className="text-sm text-foreground line-clamp-2">
                      {car.description || "—"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(car)}
                  className="w-full sm:w-auto"
                >
                  <Edit3 className="h-4 w-4" /> {t.admin.edit}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(car)}
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
