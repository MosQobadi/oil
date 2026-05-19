"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/language-context";
import { useAddOil, useUpdateOil } from "@/lib/api/oils/queries";
import {
  useAddOilFilter,
  useUpdateOilFilter,
} from "@/lib/api/oilFilters/queries";
import { uploadImage } from "@/lib/api/uploadImage";
import {
  useAddAirFilter,
  useUpdateAirFilter,
} from "@/lib/api/airFilters/queries";
import {
  useAddCabinFilter,
  useUpdateCabinFilter,
} from "@/lib/api/cabinFilters/queries";
import type {
  Oil,
  OilInsertPayload,
  OilUpdatePayload,
} from "@/lib/api/oils/types";
import type {
  OilFilter,
  OilFilterInsertPayload,
  OilFilterUpdatePayload,
} from "@/lib/api/oilFilters/types";
import type {
  AirFilter,
  AirFilterInsertPayload,
  AirFilterUpdatePayload,
} from "@/lib/api/airFilters/types";
import type {
  CabinFilter,
  CabinFilterInsertPayload,
  CabinFilterUpdatePayload,
} from "@/lib/api/cabinFilters/types";

type ProductType = "oils" | "oilFilters" | "airFilters" | "cabinFilters";
type AnyProduct = Oil | OilFilter | AirFilter | CabinFilter;
type AnyInsertPayload =
  | OilInsertPayload
  | OilFilterInsertPayload
  | AirFilterInsertPayload
  | CabinFilterInsertPayload;
type AnyUpdatePayload =
  | OilUpdatePayload
  | OilFilterUpdatePayload
  | AirFilterUpdatePayload
  | CabinFilterUpdatePayload;

interface AddProductFormProps {
  productType: ProductType;
  mode?: "add" | "edit";
  defaultValues?: Partial<AnyProduct>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddProductForm = ({
  productType,
  mode = "add",
  defaultValues,
  onSuccess,
  onCancel,
}: AddProductFormProps) => {
  const { t } = useLanguage();
  const [brand, setBrand] = useState(defaultValues?.brand ?? "");
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [model, setModel] = useState(defaultValues?.model ?? "");
  const [price, setPrice] = useState(
    defaultValues?.price ? String(defaultValues.price) : "",
  );
  const [badge, setBadge] = useState(defaultValues?.badge ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.imageUrl ?? null,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBrand(defaultValues?.brand ?? "");
    setName(defaultValues?.name ?? "");
    setModel(defaultValues?.model ?? "");
    setPrice(defaultValues?.price ? String(defaultValues.price) : "");
    setBadge(defaultValues?.badge ?? "");
    setImageFile(null);
    setImagePreview(defaultValues?.imageUrl ?? null);
    setMessage(null);
    setError(null);
  }, [defaultValues]);

  // Create mutations for each product type
  const addOilMutation = useAddOil({
    onSuccess: () => {
      setMessage(t.admin.addSuccess);
      setBrand("");
      setName("");
      setModel("");
      setPrice("");
      setBadge("");
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

  const updateOilMutation = useUpdateOil({
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

  const addOilFilterMutation = useAddOilFilter({
    onSuccess: () => {
      setMessage(t.admin.addSuccess);
      setBrand("");
      setName("");
      setModel("");
      setPrice("");
      setBadge("");
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

  const updateOilFilterMutation = useUpdateOilFilter({
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

  const addAirFilterMutation = useAddAirFilter({
    onSuccess: () => {
      setMessage(t.admin.addSuccess);
      setBrand("");
      setName("");
      setModel("");
      setPrice("");
      setBadge("");
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

  const updateAirFilterMutation = useUpdateAirFilter({
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

  const addCabinFilterMutation = useAddCabinFilter({
    onSuccess: () => {
      setMessage(t.admin.addSuccess);
      setBrand("");
      setName("");
      setModel("");
      setPrice("");
      setBadge("");
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

  const updateCabinFilterMutation = useUpdateCabinFilter({
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

  // Get the appropriate mutations based on product type
  const getAddMutation = () => {
    switch (productType) {
      case "oils":
        return addOilMutation;
      case "oilFilters":
        return addOilFilterMutation;
      case "airFilters":
        return addAirFilterMutation;
      case "cabinFilters":
        return addCabinFilterMutation;
    }
  };

  const getUpdateMutation = () => {
    switch (productType) {
      case "oils":
        return updateOilMutation;
      case "oilFilters":
        return updateOilFilterMutation;
      case "airFilters":
        return updateAirFilterMutation;
      case "cabinFilters":
        return updateCabinFilterMutation;
    }
  };

  const addMutation = getAddMutation();
  const updateMutation = getUpdateMutation();

  const isSaving =
    mode === "edit"
      ? updateMutation!.status === "pending"
      : addMutation!.status === "pending";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    let imageUrl = defaultValues?.imageUrl;
    const folderMap: Record<ProductType, string> = {
      oils: "oils",
      oilFilters: "oil-filters",
      airFilters: "air-filters",
      cabinFilters: "cabin-filters",
    };

    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile, folderMap[productType]);
      } catch (uploadError) {
        setError(
          uploadError instanceof Error ? uploadError.message : t.common.error,
        );
        return;
      }
    }

    const payload: AnyInsertPayload = {
      brand,
      name,
      model,
      price: price ? parseFloat(price) : undefined,
      badge,
      imageUrl,
    };

    if (mode === "edit") {
      if (!defaultValues?.id) {
        setError(t.common.error);
        return;
      }

      const updatePayload: AnyUpdatePayload = {
        id: defaultValues.id,
        ...payload,
      };
      updateMutation!.mutate(updatePayload as any);
      return;
    }

    addMutation!.mutate(payload as any);
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">
          {t.admin.title}
        </p>
        <h2 className="text-2xl font-semibold text-foreground">
          {mode === "edit" ? t.admin.editProduct : t.admin.addProduct}
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {mode === "edit"
            ? t.admin.editProductDescription
            : t.admin.addProductDescription}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="space-y-2 text-sm text-foreground">
          <span>{t.admin.brand}</span>
          <input
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="e.g. APEX"
            required
          />
        </label>

        <label className="space-y-2 text-sm text-foreground">
          <span>{t.admin.name}</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="e.g. Pro Racing"
            required
          />
        </label>

        <label className="space-y-2 text-sm text-foreground">
          <span>{t.admin.model}</span>
          <input
            value={model}
            onChange={(event) => setModel(event.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="e.g. GT-2"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-foreground">
            <span>{t.admin.price}</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="e.g. 24.99"
              required
            />
          </label>

          <label className="space-y-2 text-sm text-foreground">
            <span>{t.admin.badge}</span>
            <input
              value={badge}
              onChange={(event) => setBadge(event.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="e.g. Best Seller"
            />
          </label>
        </div>

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
              className="mt-3 h-28 w-full rounded-xl object-cover border border-border"
            />
          ) : null}
        </label>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
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

        {message ? <p className="text-sm text-foreground">{message}</p> : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </form>
    </section>
  );
};

export default AddProductForm;
