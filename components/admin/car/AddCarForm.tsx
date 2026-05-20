"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/language-context";
import { useAddCar, useUpdateCar } from "@/lib/api/cars/queries";
import { useProducts } from "@/lib/api/products/queries";
import { uploadImage } from "@/lib/api/uploadImage";
import { MultiSelect } from "@/components/ui/multi-select";
import type {
  Car,
  CarInsertPayload,
  SuggestedProducts,
} from "@/lib/api/cars/types";

interface AddCarFormProps {
  mode?: "add" | "edit";
  defaultValues?: Partial<Car>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddCarForm = ({
  mode = "add",
  defaultValues,
  onSuccess,
  onCancel,
}: AddCarFormProps) => {
  const { t } = useLanguage();
  const [brand, setBrand] = useState(defaultValues?.brand ?? "");
  const [model, setModel] = useState(defaultValues?.model ?? "");
  const [year, setYear] = useState(
    defaultValues?.year ? String(defaultValues.year) : "",
  );
  const [engine, setEngine] = useState(defaultValues?.engine ?? "");
  const [description, setDescription] = useState(
    defaultValues?.description ?? "",
  );
  const [suggestedOils, setSuggestedOils] = useState<number[]>(
    defaultValues?.suggestedProducts?.suggestedOils ?? [],
  );
  const [suggestedOilFilters, setSuggestedOilFilters] = useState<number[]>(
    defaultValues?.suggestedProducts?.suggestedOilFilters ?? [],
  );
  const [suggestedAirFilters, setSuggestedAirFilters] = useState<number[]>(
    defaultValues?.suggestedProducts?.suggestedAirFilters ?? [],
  );
  const [suggestedCabinFilters, setSuggestedCabinFilters] = useState<number[]>(
    defaultValues?.suggestedProducts?.suggestedCabinFilters ?? [],
  );
  const [suggestedFuelFilters, setSuggestedFuelFilters] = useState<number[]>(
    defaultValues?.suggestedProducts?.suggestedFuelFilters ?? [],
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.imageUrl ?? null,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBrand(defaultValues?.brand ?? "");
    setModel(defaultValues?.model ?? "");
    setYear(defaultValues?.year ? String(defaultValues.year) : "");
    setEngine(defaultValues?.engine ?? "");
    setDescription(defaultValues?.description ?? "");
    setSuggestedOils(defaultValues?.suggestedProducts?.suggestedOils ?? []);
    setSuggestedOilFilters(
      defaultValues?.suggestedProducts?.suggestedOilFilters ?? [],
    );
    setSuggestedAirFilters(
      defaultValues?.suggestedProducts?.suggestedAirFilters ?? [],
    );
    setSuggestedCabinFilters(
      defaultValues?.suggestedProducts?.suggestedCabinFilters ?? [],
    );
    setSuggestedFuelFilters(
      defaultValues?.suggestedProducts?.suggestedFuelFilters ?? [],
    );
    setImageFile(null);
    setImagePreview(defaultValues?.imageUrl ?? null);
    setMessage(null);
    setError(null);
  }, [defaultValues]);

  const oilsQuery = useProducts("oils");
  const oilFiltersQuery = useProducts("oilFilters");
  const airFiltersQuery = useProducts("airFilters");
  const cabinFiltersQuery = useProducts("cabinFilters");
  const fuelFiltersQuery = useProducts("fuelFilters");

  const addCarMutation = useAddCar({
    onSuccess: () => {
      setMessage(t.admin.addSuccess);
      setBrand("");
      setModel("");
      setYear("");
      setEngine("");
      setDescription("");
      setSuggestedOils([]);
      setSuggestedOilFilters([]);
      setSuggestedAirFilters([]);
      setSuggestedCabinFilters([]);
      setSuggestedFuelFilters([]);
      setImageFile(null);
      setImagePreview(null);
      onSuccess?.();
    },
    onError: (submitError) => {
      setError(
        submitError instanceof Error ? submitError.message : t.common.error,
      );
    },
  });

  const updateCarMutation = useUpdateCar({
    onSuccess: () => {
      setMessage(t.admin.addSuccess);
      onSuccess?.();
    },
    onError: (submitError) => {
      setError(
        submitError instanceof Error ? submitError.message : t.common.error,
      );
    },
  });

  const isSaving =
    mode === "edit"
      ? updateCarMutation.status === "pending"
      : addCarMutation.status === "pending";

  const buildSuggestedProducts = (): SuggestedProducts | undefined => {
    const result: SuggestedProducts = {};

    if (suggestedOils.length > 0) {
      result.suggestedOils = suggestedOils;
    }
    if (suggestedOilFilters.length > 0) {
      result.suggestedOilFilters = suggestedOilFilters;
    }
    if (suggestedAirFilters.length > 0) {
      result.suggestedAirFilters = suggestedAirFilters;
    }
    if (suggestedCabinFilters.length > 0) {
      result.suggestedCabinFilters = suggestedCabinFilters;
    }
    if (suggestedFuelFilters.length > 0) {
      result.suggestedFuelFilters = suggestedFuelFilters;
    }

    return Object.keys(result).length > 0 ? result : undefined;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    let imageUrl = defaultValues?.imageUrl;

    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile, "cars");
      } catch (uploadError) {
        setError(
          uploadError instanceof Error ? uploadError.message : t.common.error,
        );
        return;
      }
    }

    const payload: CarInsertPayload = {
      brand,
      model,
      year: year ? parseInt(year, 10) : undefined,
      engine,
      description,
      imageUrl,
      suggestedProducts: buildSuggestedProducts(),
    };

    if (mode === "edit") {
      if (!defaultValues?.id) {
        setError(t.common.error);
        return;
      }

      updateCarMutation.mutate({ id: defaultValues.id, ...payload });
      return;
    }

    addCarMutation.mutate(payload);
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm max-h-[90vh] overflow-y-auto">
      <div className="mb-6 flex flex-col gap-2 sticky top-0 bg-card pb-4 border-b border-border">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">
          {t.admin.title}
        </p>
        <h2 className="text-2xl font-semibold text-foreground">
          {mode === "edit" ? t.admin.editCar : t.admin.addCar}
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {mode === "edit" ? t.admin.editDescription : t.admin.addDescription}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Car Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            Car Information
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-foreground">
              <span>{t.admin.brand}</span>
              <input
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="e.g. Toyota"
                required
              />
            </label>

            <label className="space-y-2 text-sm text-foreground">
              <span>{t.admin.model}</span>
              <input
                value={model}
                onChange={(event) => setModel(event.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="e.g. Corolla"
                required
              />
            </label>

            <label className="space-y-2 text-sm text-foreground">
              <span>{t.admin.year}</span>
              <input
                type="number"
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="e.g. 2024"
                required
              />
            </label>

            <label className="space-y-2 text-sm text-foreground">
              <span>{t.admin.engine}</span>
              <input
                value={engine}
                onChange={(event) => setEngine(event.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="e.g. 2.0L Turbo"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-foreground">
            <span>{t.admin.detailsLabel}</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-[100px] w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Optional notes or description"
            />
          </label>

          <label className="space-y-2 text-sm text-foreground">
            <span>{t.admin.image}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                setImageFile(file);
                setImagePreview(
                  file
                    ? URL.createObjectURL(file)
                    : (defaultValues?.imageUrl ?? null),
                );
              }}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 h-24 w-32 rounded-xl object-cover border border-border"
              />
            ) : null}
          </label>
        </div>

        {/* Suggested Products Section */}
        <div className="space-y-4 border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground">
            Suggested Products
          </h3>
          <p className="text-xs text-muted-foreground">
            Select products to recommend when this car is found (all optional)
          </p>

          <label className="space-y-2 text-sm text-foreground">
            <span>{t.admin.suggestedOils}</span>
            <MultiSelect
              options={(oilsQuery.data ?? []).map((product) => ({
                id: product.id,
                label: `${product.brand} ${product.name}`,
              }))}
              selectedIds={suggestedOils}
              onSelectionChange={setSuggestedOils}
              placeholder="Search and select oils..."
            />
          </label>

          <label className="space-y-2 text-sm text-foreground">
            <span>{t.admin.suggestedOilFilters}</span>
            <MultiSelect
              options={(oilFiltersQuery.data ?? []).map((product) => ({
                id: product.id,
                label: `${product.brand} ${product.name}`,
              }))}
              selectedIds={suggestedOilFilters}
              onSelectionChange={setSuggestedOilFilters}
              placeholder="Search and select oil filters..."
            />
          </label>

          <label className="space-y-2 text-sm text-foreground">
            <span>{t.admin.suggestedAirFilters}</span>
            <MultiSelect
              options={(airFiltersQuery.data ?? []).map((product) => ({
                id: product.id,
                label: `${product.brand} ${product.name}`,
              }))}
              selectedIds={suggestedAirFilters}
              onSelectionChange={setSuggestedAirFilters}
              placeholder="Search and select air filters..."
            />
          </label>

          <label className="space-y-2 text-sm text-foreground">
            <span>{t.admin.suggestedCabinFilters}</span>
            <MultiSelect
              options={(cabinFiltersQuery.data ?? []).map((product) => ({
                id: product.id,
                label: `${product.brand} ${product.name}`,
              }))}
              selectedIds={suggestedCabinFilters}
              onSelectionChange={setSuggestedCabinFilters}
              placeholder="Search and select cabin filters..."
            />
          </label>

          <label className="space-y-2 text-sm text-foreground">
            <span>{t.admin.suggestedFuelFilters}</span>
            <MultiSelect
              options={(fuelFiltersQuery.data ?? []).map((product) => ({
                id: product.id,
                label: `${product.brand} ${product.name}`,
              }))}
              selectedIds={suggestedFuelFilters}
              onSelectionChange={setSuggestedFuelFilters}
              placeholder="Search and select fuel filters..."
            />
          </label>
        </div>

        {/* Form Actions */}
        <div className="sticky bottom-0 bg-card pt-4 border-t border-border flex gap-3 sm:flex-row flex-col">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? t.common.loading : t.common.save}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary/10"
          >
            {t.common.cancel}
          </button>
        </div>

        {message ? (
          <p className="text-sm text-foreground bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            {error}
          </p>
        ) : null}
      </form>
    </section>
  );
};

export default AddCarForm;
