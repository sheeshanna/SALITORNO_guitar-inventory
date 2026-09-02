import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Store,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Zap,
  Music,
  Music2,
  Music3,
} from "lucide-react";
import EmptyState from "./EmptyState";

const BODY_TYPE_ICONS = {
  Electric: Zap,
  Acoustic: Music,
  Bass: Music2,
  Classical: Music3,
};

function StockBar({ stock }) {
  let color = "bg-emerald-400";
  let label = "In Stock";
  if (stock <= 10) {
    color = "bg-red-400";
    label = "Low";
  } else if (stock <= 30) {
    color = "bg-amber-400";
    label = "Limited";
  }

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#f0ddc4]">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${Math.min(stock, 100)}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-[#8a6d8a]">{stock}</span>
    </div>
  );
}

function GuitarTable({ items, selectedId, onSelectRow, onGoToRegister }) {
  const columns = useMemo(
    () => [
      { accessorKey: "model", header: "Guitar Model" },
      { accessorKey: "bodyType", header: "Body Type" },
      { accessorKey: "brand", header: "Brand" },
      { accessorKey: "stock", header: "Stock" },
      { accessorKey: "manufacturer", header: "Manufacturer" },
      { accessorKey: "role", header: "Role" },
    ],
    [],
  );

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 4 },
    },
  });

  return (
    <div className="rounded-[32px] bg-white p-6 shadow-xl md:p-8">
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#3d1f3d]">
            Guitar Registry
          </h2>
          <p className="text-sm text-[#8a6d8a]">
            {items.length} guitar{items.length !== 1 ? "s" : ""} registered ·
            click a row for details
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState onRegisterClick={onGoToRegister} />
      ) : (
        <>
          <div className="space-y-2">
            {/* HEADER ROW */}
            <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr_1fr] gap-3 px-4 text-xs font-bold uppercase tracking-wide text-[#8a6d8a] md:grid">
              <span>Guitar Model</span>
              <span>Body Type</span>
              <span>Brand</span>
              <span>Stock</span>
              <span>Manufacturer</span>
              <span>Role</span>
            </div>

            {table.getRowModel().rows.map((row) => {
              const item = row.original;
              const BodyIcon = BODY_TYPE_ICONS[item.bodyType] || Music;
              const isSelected = selectedId === item.id;

              return (
                <div
                  key={row.id}
                  onClick={() => onSelectRow(item.id)}
                  className={`grid cursor-pointer grid-cols-2 gap-3 rounded-2xl border-2 px-4 py-3.5 transition-all md:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr_1fr] md:items-center ${
                    isSelected
                      ? "border-[#e07a5f] bg-[#fdf1ea] shadow-sm"
                      : "border-transparent bg-[#fdf6ec] hover:border-[#f0ddc4]"
                  }`}
                >
                  <div className="col-span-2 font-bold text-[#3d1f3d] md:col-span-1">
                    {item.model}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-[#3d1f3d]">
                    <BodyIcon
                      size={13}
                      strokeWidth={2.3}
                      className="shrink-0 text-[#e07a5f]"
                    />
                    {item.bodyType}
                  </div>

                  <div className="text-sm text-[#3d1f3d]">{item.brand}</div>

                  <StockBar stock={item.stock} />

                  <div
                    className="truncate text-sm text-[#3d1f3d]"
                    title={item.manufacturer}
                  >
                    {item.manufacturer}
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                        item.role === "Merchant"
                          ? "bg-[#e07a5f]/15 text-[#e07a5f]"
                          : "bg-[#3d1f3d]/10 text-[#3d1f3d]"
                      }`}
                    >
                      {item.role === "Merchant" ? (
                        <Store size={11} strokeWidth={2.5} />
                      ) : (
                        <Headphones size={11} strokeWidth={2.5} />
                      )}
                      {item.role}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        
          <div className="mt-5 flex items-center justify-between border-t border-[#f0ddc4] pt-4">
            <span className="text-xs font-semibold text-[#8a6d8a]">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="flex items-center gap-1 rounded-xl border-2 border-[#f0ddc4] px-3.5 py-2 text-xs font-bold text-[#3d1f3d] transition hover:border-[#e07a5f] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#f0ddc4]"
              >
                <ChevronLeft size={14} strokeWidth={2.5} />
                Previous
              </button>
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="flex items-center gap-1 rounded-xl border-2 border-[#f0ddc4] px-3.5 py-2 text-xs font-bold text-[#3d1f3d] transition hover:border-[#e07a5f] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#f0ddc4]"
              >
                Next
                <ChevronRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GuitarTable;
