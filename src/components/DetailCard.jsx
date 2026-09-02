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

const BODY_TYPE_COLORS = {
  Electric: "text-[#e07a5f]",
  Acoustic: "text-[#c98a4b]",
  Bass: "text-[#8a6d8a]",
  Classical: "text-[#3d1f3d]",
};

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
    <div className="rounded-[28px] bg-white p-6 shadow-lg">
    
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#8a6d8a]">
            Active Item
          </p>
          <h3 className="mt-0.5 text-lg font-extrabold leading-tight text-[#3d1f3d]">
            {item.model}
          </h3>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
            item.role === "Merchant"
              ? "bg-[#e07a5f]/15 text-[#e07a5f]"
              : "bg-[#3d1f3d]/10 text-[#3d1f3d]"
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

     
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fdf6ec]">
            <Tag
              size={15}
              strokeWidth={2.2}
              className={BODY_TYPE_COLORS[item.bodyType] || "text-[#8a6d8a]"}
            />
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

        <div className="flex items-center gap-3">
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
