import {
  Guitar,
  Tag,
  Building2,
  Boxes,
  Factory,
  Store,
  Headphones,
  MousePointerClick,
} from "lucide-react";

function DetailCard({ item }) {
  if (!item) {
    return (
      <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 rounded-[28px] border-2 border-dashed border-[#f0ddc4] bg-white/60 p-8 text-center">
        <MousePointerClick
          size={28}
          strokeWidth={1.8}
          className="text-[#c4a98f]"
        />
        <p className="text-sm font-semibold text-[#8a6d8a]">
          Select a guitar from the table to view its full details here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-lg">

      <div className="bg-[#3d1f3d] px-6 py-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">
          Active Item
        </p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <h3 className="truncate text-lg font-extrabold leading-tight text-white">
            {item.model}
          </h3>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
              item.role === "Merchant"
                ? "bg-[#e07a5f] text-white"
                : "bg-white/15 text-white"
            }`}
          >
            {item.role === "Merchant" ? (
              <Store size={12} strokeWidth={2.5} />
            ) : (
              <Headphones size={12} strokeWidth={2.5} />
            )}
            {item.role}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fdf6ec]">
            <Tag size={15} strokeWidth={2.2} className="text-[#e07a5f]" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#8a6d8a]">
              Body Type
            </p>
            <p className="text-sm font-semibold text-[#3d1f3d]">
              {item.bodyType}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fdf6ec]">
            <Building2 size={15} strokeWidth={2.2} className="text-[#e07a5f]" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#8a6d8a]">
              Brand
            </p>
            <p className="text-sm font-semibold text-[#3d1f3d]">{item.brand}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fdf6ec]">
            <Boxes size={15} strokeWidth={2.2} className="text-[#e07a5f]" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#8a6d8a]">
              Stock Quantity
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[#3d1f3d]">
                {item.stock} / 100
              </p>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f0ddc4]">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.stock <= 10
                      ? "bg-red-400"
                      : item.stock <= 30
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                  }`}
                  style={{ width: `${Math.min(item.stock, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fdf6ec]">
            <Factory size={15} strokeWidth={2.2} className="text-[#e07a5f]" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#8a6d8a]">
              Manufacturer
            </p>
            <p className="text-sm font-semibold text-[#3d1f3d]">
              {item.manufacturer}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-[#f0ddc4] pt-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fdf6ec]">
            <Guitar size={15} strokeWidth={2.2} className="text-[#e07a5f]" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#8a6d8a]">
              Item ID
            </p>
            <p className="text-sm font-semibold text-[#3d1f3d]">
              #{item.id.toString().slice(-6)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
