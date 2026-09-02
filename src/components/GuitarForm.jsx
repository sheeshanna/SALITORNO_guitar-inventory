import { useState } from "react";
import {
  Guitar,
  Tag,
  Building2,
  Boxes,
  Factory,
  Store,
  Headphones,
  AlertCircle,
  RotateCcw,
  Music2,
  CheckCircle2,
} from "lucide-react";

const BODY_TYPES = ["Electric", "Acoustic", "Bass", "Classical"];

function GuitarForm({ itemsCount, onRegister }) {
  const [formData, setFormData] = useState({
    model: "",
    bodyType: "",
    brand: "",
    stock: "",
    manufacturer: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [justAdded, setJustAdded] = useState(false);

  const validateField = (field, value) => {
    switch (field) {
      case "model":
        if (!value.trim()) return "Guitar model is required.";
        if (value.trim().length < 3) return "Must be at least 3 characters.";
        return "";
      case "bodyType":
        if (!value) return "Please select a body type.";
        return "";
      case "brand":
        if (!value.trim()) return "Brand name is required.";
        if (value.trim().length < 3) return "Must be at least 3 characters.";
        return "";
      case "stock": {
        if (value === "") return "Stock quantity is required.";
        const num = Number(value);
        if (num < 1 || num > 100) return "Must be between 1 and 100.";
        return "";
      }
      case "manufacturer":
        if (!value.trim()) return "Manufacturer name is required.";
        if (value.trim().length < 3) return "Must be at least 3 characters.";
        return "";
      case "role":
        if (!value) return "Please select a user role.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === "stock") value = value.replace(/-/g, "");

    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, role: value }));
    setErrors((prev) => ({ ...prev, role: "" }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const errorMessage = validateField(field, formData[field]);
      if (errorMessage) newErrors[field] = errorMessage;
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setJustAdded(false);
      return;
    }

    const newItem = {
      id: Date.now(),
      model: formData.model.trim(),
      bodyType: formData.bodyType,
      brand: formData.brand.trim(),
      stock: Number(formData.stock),
      manufacturer: formData.manufacturer.trim(),
      role: formData.role,
    };

    onRegister(newItem);
    setJustAdded(true);

    setFormData({
      model: "",
      bodyType: "",
      brand: "",
      stock: "",
      manufacturer: "",
      role: "",
    });
    setErrors({});

    setTimeout(() => setJustAdded(false), 900);
  };

  const handleClear = () => {
    setFormData({
      model: "",
      bodyType: "",
      brand: "",
      stock: "",
      manufacturer: "",
      role: "",
    });
    setErrors({});
    setJustAdded(false);
  };

  return (
    <div className="mx-auto flex w-full flex-col overflow-hidden rounded-[32px] bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl md:flex-row">
      
      <div className="relative flex flex-col justify-between overflow-hidden bg-[#3d1f3d] p-8 text-white md:w-2/5 md:p-10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#e07a5f]/20" />
        <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-[#f4a261]/10" />
        <div className="absolute right-8 top-24 h-16 w-16 rounded-full bg-[#f4a261]/10" />

        <div className="relative">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e07a5f] shadow-lg">
            <Guitar size={26} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
            Guitar Store
            <br />
            Inventory
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Register every guitar that comes through the shop — model, body
            type, brand, and stock, all in one place.
          </p>
        </div>

        <div className="relative mt-10 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-xs font-semibold text-white/80 transition-colors">
          <Music2
            size={15}
            strokeWidth={2.3}
            className="shrink-0 text-[#f4a261]"
          />
          <span>
            {itemsCount} guitar{itemsCount !== 1 ? "s" : ""} registered so far
          </span>
        </div>
      </div>

      
      <div className="flex-1 p-7 md:p-10">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#8a6d8a]">
                <Guitar
                  size={13}
                  strokeWidth={2.3}
                  className="text-[#e07a5f]"
                />
                Guitar Model
              </label>
              <input
                type="text"
                value={formData.model}
                onChange={handleChange("model")}
                placeholder="Stratocaster Custom"
                className={`w-full rounded-xl border-2 bg-white px-3.5 py-2.5 text-sm text-[#3d1f3d] outline-none transition-colors placeholder:text-[#c4a98f] ${
                  errors.model
                    ? "border-red-400"
                    : "border-[#f0ddc4] focus:border-[#e07a5f]"
                }`}
              />
              {errors.model && (
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                  <AlertCircle size={11} strokeWidth={2.5} />
                  {errors.model}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#8a6d8a]">
                <Tag size={13} strokeWidth={2.3} className="text-[#e07a5f]" />
                Body Type
              </label>
              <select
                value={formData.bodyType}
                onChange={handleChange("bodyType")}
                className={`w-full rounded-xl border-2 bg-white px-3.5 py-2.5 text-sm text-[#3d1f3d] outline-none transition-colors ${
                  errors.bodyType
                    ? "border-red-400"
                    : "border-[#f0ddc4] focus:border-[#e07a5f]"
                }`}
              >
                <option value="">Select...</option>
                {BODY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.bodyType && (
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                  <AlertCircle size={11} strokeWidth={2.5} />
                  {errors.bodyType}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#8a6d8a]">
                <Building2
                  size={13}
                  strokeWidth={2.3}
                  className="text-[#e07a5f]"
                />
                Brand Name
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={handleChange("brand")}
                placeholder="Fender"
                className={`w-full rounded-xl border-2 bg-white px-3.5 py-2.5 text-sm text-[#3d1f3d] outline-none transition-colors placeholder:text-[#c4a98f] ${
                  errors.brand
                    ? "border-red-400"
                    : "border-[#f0ddc4] focus:border-[#e07a5f]"
                }`}
              />
              {errors.brand && (
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                  <AlertCircle size={11} strokeWidth={2.5} />
                  {errors.brand}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#8a6d8a]">
                <Boxes size={13} strokeWidth={2.3} className="text-[#e07a5f]" />
                Stock Quantity
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.stock}
                  onChange={handleChange("stock")}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e" || e.key === "+") {
                      e.preventDefault();
                    }
                  }}
                  placeholder="25"
                  className={`w-full rounded-xl border-2 bg-white px-3.5 py-2.5 pr-16 text-sm text-[#3d1f3d] outline-none transition-colors placeholder:text-[#c4a98f] ${
                    errors.stock
                      ? "border-red-400"
                      : "border-[#f0ddc4] focus:border-[#e07a5f]"
                  }`}
                />
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#c4a98f]">
                  / 100
                </span>
              </div>
              {errors.stock && (
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                  <AlertCircle size={11} strokeWidth={2.5} />
                  {errors.stock}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#8a6d8a]">
              <Factory size={13} strokeWidth={2.3} className="text-[#e07a5f]" />
              Manufacturer Name
            </label>
            <input
              type="text"
              value={formData.manufacturer}
              onChange={handleChange("manufacturer")}
              placeholder="Fender Musical Instruments Corp."
              className={`w-full rounded-xl border-2 bg-white px-3.5 py-2.5 text-sm text-[#3d1f3d] outline-none transition-colors placeholder:text-[#c4a98f] ${
                errors.manufacturer
                  ? "border-red-400"
                  : "border-[#f0ddc4] focus:border-[#e07a5f]"
              }`}
            />
            {errors.manufacturer && (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle size={11} strokeWidth={2.5} />
                {errors.manufacturer}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#8a6d8a]">
              User Role
            </label>
            <div className="flex gap-2.5">
              <label
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all ${
                  formData.role === "Merchant"
                    ? "border-[#e07a5f] bg-[#e07a5f] text-white shadow-sm"
                    : "border-[#f0ddc4] text-[#8a6d8a] hover:border-[#e07a5f]/50"
                }`}
              >
                <input
                  type="radio"
                  name="userRole"
                  value="Merchant"
                  checked={formData.role === "Merchant"}
                  onChange={handleRoleChange}
                  className="sr-only"
                />
                <Store size={16} strokeWidth={2.2} />
                Merchant
              </label>

              <label
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all ${
                  formData.role === "Consumer"
                    ? "border-[#e07a5f] bg-[#e07a5f] text-white shadow-sm"
                    : "border-[#f0ddc4] text-[#8a6d8a] hover:border-[#e07a5f]/50"
                }`}
              >
                <input
                  type="radio"
                  name="userRole"
                  value="Consumer"
                  checked={formData.role === "Consumer"}
                  onChange={handleRoleChange}
                  className="sr-only"
                />
                <Headphones size={16} strokeWidth={2.2} />
                Consumer
              </label>
            </div>
            {errors.role && (
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle size={12} strokeWidth={2.5} />
                {errors.role}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3d1f3d] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#2c162c] active:scale-[0.98]"
            >
              Register Guitar
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center rounded-xl bg-[#fdf6ec] px-4 py-3 text-[#8a6d8a] transition hover:bg-[#f0ddc4] active:scale-[0.98]"
              aria-label="Clear"
            >
              <RotateCcw size={16} strokeWidth={2.3} />
            </button>
          </div>

          {justAdded && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={15} strokeWidth={2.5} />
              Guitar registered! Taking you to the Registry...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default GuitarForm;
