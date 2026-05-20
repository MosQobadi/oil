"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Plus, Home } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useCars, useDeleteCar } from "@/lib/api/cars/queries";
import { useOils, useDeleteOil } from "@/lib/api/oils/queries";
import {
  useOilFilters,
  useDeleteOilFilter,
} from "@/lib/api/oilFilters/queries";
import {
  useAirFilters,
  useDeleteAirFilter,
} from "@/lib/api/airFilters/queries";
import {
  useCabinFilters,
  useDeleteCabinFilter,
} from "@/lib/api/cabinFilters/queries";
import {
  useFuelFilters,
  useDeleteFuelFilter,
} from "@/lib/api/fuelFilters/queries";
import AddCarForm from "./car/AddCarForm";
import CarAdminList from "./car/CarAdminList";
import OilAdminList from "./product/OilAdminList";
import OilFilterAdminList from "./product/OilFilterAdminList";
import AirFilterAdminList from "./product/AirFilterAdminList";
import CabinFilterAdminList from "./product/CabinFilterAdminList";
import FuelFilterAdminList from "./product/FuelFilterAdminList";
import AddProductForm from "./product/AddProductForm";
import { ConfirmModal } from "./ConfirmModal";
import type { Car } from "@/lib/api/cars/types";
import type { Oil } from "@/lib/api/oils/types";
import type { OilFilter } from "@/lib/api/oilFilters/types";
import type { AirFilter } from "@/lib/api/airFilters/types";
import type { CabinFilter } from "@/lib/api/cabinFilters/types";
import type { FuelFilter } from "@/lib/api/fuelFilters/types";

const productTypes = [
  { id: "cars", key: "cars" },
  { id: "oils", key: "oils" },
  { id: "oilFilters", key: "oilFilters" },
  { id: "airFilters", key: "airFilters" },
  { id: "cabinFilters", key: "cabinFilters" },
  { id: "fuelFilters", key: "fuelFilters" },
] as const;

type ProductType = (typeof productTypes)[number]["id"];

type CategoryConfig = {
  listTitle: string;
  listDescription: string;
  addLabel: string;
  editLabel: string;
  addDescription: string;
  editDescription: string;
  deleteConfirm: string;
  emptyText: string;
};

type EditableProduct = Oil | OilFilter | AirFilter | CabinFilter | FuelFilter;

export default function AdminPanel() {
  const { t } = useLanguage();
  const router = useRouter();
  const {
    data: cars = [],
    isLoading: isCarsLoading,
    isError: isCarsError,
  } = useCars();

  const {
    data: oils = [],
    isLoading: isOilsLoading,
    isError: isOilsError,
  } = useOils();

  const {
    data: oilFilters = [],
    isLoading: isOilFiltersLoading,
    isError: isOilFiltersError,
  } = useOilFilters();

  const {
    data: airFilters = [],
    isLoading: isAirFiltersLoading,
    isError: isAirFiltersError,
  } = useAirFilters();

  const {
    data: cabinFilters = [],
    isLoading: isCabinFiltersLoading,
    isError: isCabinFiltersError,
  } = useCabinFilters();

  const {
    data: fuelFilters = [],
    isLoading: isFuelFiltersLoading,
    isError: isFuelFiltersError,
  } = useFuelFilters();

  const [selectedType, setSelectedType] = useState<ProductType>("cars");
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [editingProduct, setEditingProduct] = useState<EditableProduct | null>(
    null,
  );
  const [pendingDeleteCar, setPendingDeleteCar] = useState<Car | null>(null);
  const [pendingDeleteProduct, setPendingDeleteProduct] =
    useState<EditableProduct | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteCarMutation = useDeleteCar({
    onSuccess: () => {},
  });

  const deleteOilMutation = useDeleteOil({
    onSuccess: () => {},
  });

  const deleteOilFilterMutation = useDeleteOilFilter({
    onSuccess: () => {},
  });

  const deleteAirFilterMutation = useDeleteAirFilter({
    onSuccess: () => {},
  });

  const deleteCabinFilterMutation = useDeleteCabinFilter({
    onSuccess: () => {},
  });

  const deleteFuelFilterMutation = useDeleteFuelFilter({
    onSuccess: () => {},
  });

  const handleAddClick = () => {
    setEditingCar(null);
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleEditProduct = (product: EditableProduct) => {
    setEditingProduct(product);
    setEditingCar(null);
    setDialogOpen(true);
  };

  const handleDeleteCar = (car: Car) => {
    setPendingDeleteCar(car);
    setConfirmOpen(true);
  };

  const handleDeleteProduct = (product: EditableProduct) => {
    setPendingDeleteProduct(product);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteCar) {
      deleteCarMutation.mutate({ id: pendingDeleteCar.id });
      setPendingDeleteCar(null);
      setConfirmOpen(false);
    } else if (pendingDeleteProduct) {
      if (selectedType === "oils") {
        deleteOilMutation.mutate({ id: pendingDeleteProduct.id });
      } else if (selectedType === "oilFilters") {
        deleteOilFilterMutation.mutate({ id: pendingDeleteProduct.id });
      } else if (selectedType === "airFilters") {
        deleteAirFilterMutation.mutate({ id: pendingDeleteProduct.id });
      } else if (selectedType === "cabinFilters") {
        deleteCabinFilterMutation.mutate({ id: pendingDeleteProduct.id });
      } else if (selectedType === "fuelFilters") {
        deleteFuelFilterMutation.mutate({ id: pendingDeleteProduct.id });
      }
      setPendingDeleteProduct(null);
      setConfirmOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setPendingDeleteCar(null);
    setPendingDeleteProduct(null);
    setConfirmOpen(false);
  };

  const filteredCars = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return cars;

    return cars.filter((car) =>
      [car.brand, car.model, car.engine, String(car.year)]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [cars, searchQuery]);

  const filteredOils = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return oils;

    return oils.filter((oil) =>
      [oil.brand, oil.name, oil.model, oil.badge, String(oil.price)]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [oils, searchQuery]);

  const filteredOilFilters = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return oilFilters;

    return oilFilters.filter((filter) =>
      [
        filter.brand,
        filter.name,
        filter.model,
        filter.badge,
        String(filter.price),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [oilFilters, searchQuery]);

  const filteredAirFilters = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return airFilters;

    return airFilters.filter((filter) =>
      [
        filter.brand,
        filter.name,
        filter.model,
        filter.badge,
        String(filter.price),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [airFilters, searchQuery]);

  const filteredCabinFilters = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return cabinFilters;

    return cabinFilters.filter((filter) =>
      [
        filter.brand,
        filter.name,
        filter.model,
        filter.badge,
        String(filter.price),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [cabinFilters, searchQuery]);

  const filteredFuelFilters = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return fuelFilters;

    return fuelFilters.filter((filter) =>
      [
        filter.brand,
        filter.name,
        filter.model,
        filter.badge,
        String(filter.price),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [fuelFilters, searchQuery]);

  const isCarsView = selectedType === "cars";
  const selectedCategoryLabel =
    t.admin.tabs[selectedType as keyof typeof t.admin.tabs];

  const categoryConfig: Record<ProductType, CategoryConfig> = {
    cars: {
      listTitle: t.admin.carListTitle,
      listDescription: t.admin.carListDescription,
      addLabel: t.admin.addCar,
      editLabel: t.admin.editCar,
      addDescription: t.admin.addDescription,
      editDescription: t.admin.editDescription,
      deleteConfirm: t.admin.deleteConfirm,
      emptyText: t.admin.noCars,
    },
    oils: {
      listTitle: t.admin.oilListTitle,
      listDescription: t.admin.oilListDescription,
      addLabel: t.admin.addProduct,
      editLabel: t.admin.editProduct,
      addDescription: t.admin.addProductDescription,
      editDescription: t.admin.editProductDescription,
      deleteConfirm: t.admin.deleteConfirmProduct,
      emptyText: t.admin.noProducts,
    },
    oilFilters: {
      listTitle: t.admin.oilFilterListTitle,
      listDescription: t.admin.oilFilterListDescription,
      addLabel: t.admin.addProduct,
      editLabel: t.admin.editProduct,
      addDescription: t.admin.addProductDescription,
      editDescription: t.admin.editProductDescription,
      deleteConfirm: t.admin.deleteConfirmProduct,
      emptyText: t.admin.noProducts,
    },
    airFilters: {
      listTitle: t.admin.airFilterListTitle,
      listDescription: t.admin.airFilterListDescription,
      addLabel: t.admin.addProduct,
      editLabel: t.admin.editProduct,
      addDescription: t.admin.addProductDescription,
      editDescription: t.admin.editProductDescription,
      deleteConfirm: t.admin.deleteConfirmProduct,
      emptyText: t.admin.noProducts,
    },
    cabinFilters: {
      listTitle: t.admin.cabinFilterListTitle,
      listDescription: t.admin.cabinFilterListDescription,
      addLabel: t.admin.addProduct,
      editLabel: t.admin.editProduct,
      addDescription: t.admin.addProductDescription,
      editDescription: t.admin.editProductDescription,
      deleteConfirm: t.admin.deleteConfirmProduct,
      emptyText: t.admin.noProducts,
    },
    fuelFilters: {
      listTitle: t.admin.fuelFilterListTitle,
      listDescription: t.admin.fuelFilterListDescription,
      addLabel: t.admin.addProduct,
      editLabel: t.admin.editProduct,
      addDescription: t.admin.addProductDescription,
      editDescription: t.admin.editProductDescription,
      deleteConfirm: t.admin.deleteConfirmProduct,
      emptyText: t.admin.noProducts,
    },
  };

  const currentConfig = categoryConfig[selectedType];

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">
              {t.admin.title}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-foreground">
                  {t.admin.title}
                </h1>
                <p className="max-w-3xl text-sm text-muted-foreground">
                  {t.admin.description}
                </p>
              </div>
              <div className="flex gap-3 self-start sm:self-auto">
                <Button onClick={() => router.push("/")} variant="outline">
                  <Home className="h-4 w-4" /> Home
                </Button>
                <Button onClick={handleAddClick}>
                  <Plus className="h-4 w-4" /> {currentConfig.addLabel}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-wrap gap-2">
              {productTypes.map((tab) => (
                <Button
                  key={tab.id}
                  variant={selectedType === tab.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedType(tab.id);
                    setEditingCar(null);
                    setEditingProduct(null);
                  }}
                >
                  {t.admin.tabs[tab.key as keyof typeof t.admin.tabs]}
                </Button>
              ))}
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t.admin.searchPlaceholder}
                className="h-12 pl-11"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        {isCarsView ? (
          <CarAdminList
            cars={cars}
            filteredCars={filteredCars}
            isLoading={isCarsLoading}
            isError={isCarsError}
            emptyText={currentConfig.emptyText}
            onEdit={handleEditCar}
            onDelete={handleDeleteCar}
          />
        ) : selectedType === "oils" ? (
          <OilAdminList
            title={currentConfig.listTitle}
            description={currentConfig.listDescription}
            products={oils}
            filteredProducts={filteredOils}
            isLoading={isOilsLoading}
            isError={isOilsError}
            emptyText={currentConfig.emptyText}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ) : selectedType === "oilFilters" ? (
          <OilFilterAdminList
            title={currentConfig.listTitle}
            description={currentConfig.listDescription}
            products={oilFilters}
            filteredProducts={filteredOilFilters}
            isLoading={isOilFiltersLoading}
            isError={isOilFiltersError}
            emptyText={currentConfig.emptyText}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ) : selectedType === "airFilters" ? (
          <AirFilterAdminList
            title={currentConfig.listTitle}
            description={currentConfig.listDescription}
            products={airFilters}
            filteredProducts={filteredAirFilters}
            isLoading={isAirFiltersLoading}
            isError={isAirFiltersError}
            emptyText={currentConfig.emptyText}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ) : selectedType === "cabinFilters" ? (
          <CabinFilterAdminList
            title={currentConfig.listTitle}
            description={currentConfig.listDescription}
            products={cabinFilters}
            filteredProducts={filteredCabinFilters}
            isLoading={isCabinFiltersLoading}
            isError={isCabinFiltersError}
            emptyText={currentConfig.emptyText}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ) : (
          <FuelFilterAdminList
            title={currentConfig.listTitle}
            description={currentConfig.listDescription}
            products={fuelFilters}
            filteredProducts={filteredFuelFilters}
            isLoading={isFuelFiltersLoading}
            isError={isFuelFiltersError}
            emptyText={currentConfig.emptyText}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl p-0">
          <DialogHeader>
            <DialogTitle>
              {editingCar || editingProduct
                ? selectedType === "cars"
                  ? t.admin.editCar
                  : t.admin.editProduct
                : currentConfig.addLabel}
            </DialogTitle>
            <DialogDescription>
              {editingCar || editingProduct
                ? selectedType === "cars"
                  ? t.admin.editDescription
                  : t.admin.editProductDescription
                : currentConfig.addDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            {isCarsView ? (
              <AddCarForm
                mode={editingCar ? "edit" : "add"}
                defaultValues={editingCar ?? undefined}
                onSuccess={() => setDialogOpen(false)}
                onCancel={() => setDialogOpen(false)}
              />
            ) : (
              <AddProductForm
                productType={
                  selectedType as
                    | "oils"
                    | "oilFilters"
                    | "airFilters"
                    | "cabinFilters"
                    | "fuelFilters"
                }
                mode={editingProduct ? "edit" : "add"}
                defaultValues={editingProduct ?? undefined}
                onSuccess={() => setDialogOpen(false)}
                onCancel={() => setDialogOpen(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmModal
        open={confirmOpen}
        title={pendingDeleteCar ? "Delete Car" : "Delete Item"}
        description={
          pendingDeleteCar
            ? t.admin.deleteConfirm
            : t.admin.deleteConfirmProduct
        }
        confirmLabel={t.admin.delete || "Delete"}
        cancelLabel={t.common.cancel || "Cancel"}
        isLoading={
          deleteCarMutation.status === "pending" ||
          deleteOilMutation.status === "pending" ||
          deleteOilFilterMutation.status === "pending" ||
          deleteAirFilterMutation.status === "pending" ||
          deleteCabinFilterMutation.status === "pending" ||
          deleteFuelFilterMutation.status === "pending"
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDangerous
      />
    </section>
  );
}
