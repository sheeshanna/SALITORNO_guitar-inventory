import { useMemo, useState } from "react";
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
  Filter,
} from "lucide-react";
import EmptyState from "./EmptyState";
import DetailCard from "./DetailCard";

const BODY_TYPE_ICONS = {
  Electric: Zap,
  Acoustic: Music,
  Bass: Music2,
  Classical: Music3,
};

function StockBar({ stock }) {
  let color = "bg-emerald-400";
  if (stock <= 10) color = "bg-red-400";
  else if (stock <= 30) color = "bg-amber-400";

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

function GuitarTable({
  items,
  selectedItem,
  selectedId,
  onSelectRow,
  onGoToRegister,
}) {
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredItems = useMemo(() => {
    if (roleFilter === "all") return items;
    return items.filter((item) => item.role === roleFilter);
  }, [items, roleFilter]);

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
    data: filteredItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
      {/* TABLE PANEL */}
      <div className="rounded-[32px] bg-white p-6 shadow-xl md:p-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#3d1f3d]">
              Guitar Registry
            </h2>
            <p className="text-sm text-[#8a6d8a]">
              {filteredItems.length} of {items.length} guitar
              {items.length !== 1 ? "s" : ""} shown · click a row for details
            </p>
          </div>

          {/* FILTER TOGGLE */}
          {items.length > 0 && (
            <div className="flex items-center gap-1.5 rounded-xl bg-[#fdf6ec] p-1">
              <Filter
                size={13}
                strokeWidth={2.3}
                className="ml-2 text-[#8a6d8a]"
              />
              {["all", "Merchant", "Consumer"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRoleFilter(option)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    roleFilter === option
                      ? "bg-[#3d1f3d] text-white"
                      : "text-[#8a6d8a] hover:bg-white"
                  }`}
                >
                  {option === "all" ? "All" : option}
                </button>
              ))}
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyState onRegisterClick={onGoToRegister} />
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#f0ddc4] py-14 text-center">
            <p className="text-sm font-semibold text-[#8a6d8a]">
              No guitars match this filter.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr_1fr] gap-3 px-4 text-xs font-bold uppercase tracking-wide text-[#8a6d8a] md:grid">
                <span>Guitar Model</span>
                <span className="text-center">Body Type</span>
                <span className="text-center">Brand</span>
                <span className="text-center">Stock</span>
                <span className="text-center">Manufacturer</span>
                <span className="text-center">Role</span>
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

                    <div className="flex items-center justify-center gap-1.5 text-sm text-[#3d1f3d]">
                      <BodyIcon
                        size={13}
                        strokeWidth={2.3}
                        className="shrink-0 text-[#e07a5f]"
                      />
                      {item.bodyType}
                    </div>

                    <div className="text-center text-sm text-[#3d1f3d]">
                      {item.brand}
                    </div>

                    <div className="flex justify-center">
                      <StockBar stock={item.stock} />
                    </div>

                    <div
                      className="truncate text-center text-sm text-[#3d1f3d]"
                      title={item.manufacturer}
                    >
                      {item.manufacturer}
                    </div>

                    <div className="flex justify-center">
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

      <DetailCard item={selectedItem} />
    </div>
  );
}

export default GuitarTable;
