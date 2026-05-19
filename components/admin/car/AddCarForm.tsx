"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/language-context";
import { useAddCar, useUpdateCar } from "@/lib/api/cars/queries";
import { uploadImage } from "@/lib/api/uploadImage";
import type { Car, CarInsertPayload } from "@/lib/api/cars/types";

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
    setImageFile(null);
    setImagePreview(defaultValues?.imageUrl ?? null);
    setMessage(null);
    setError(null);
  }, [defaultValues]);

  const addCarMutation = useAddCar({
    onSuccess: () => {
      setMessage(t.admin.addSuccess);
      setBrand("");
      setModel("");
      setYear("");
      setEngine("");
      setDescription("");
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
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-2">
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

      <form onSubmit={handleSubmit} className="grid gap-4">
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

        <div className="grid gap-4 md:grid-cols-2">
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
            className="min-h-[120px] w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
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

export default AddCarForm;
