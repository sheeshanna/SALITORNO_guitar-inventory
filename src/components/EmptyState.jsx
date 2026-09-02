import { PackageOpen } from "lucide-react";

function EmptyState({ onRegisterClick }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#f0ddc4] py-16 text-center">
      <PackageOpen size={32} strokeWidth={1.8} className="text-[#c4a98f]" />
      <p className="text-sm font-semibold text-[#8a6d8a]">
        No guitars registered yet.
      </p>
      <button
        type="button"
        onClick={onRegisterClick}
        className="mt-1 rounded-full bg-[#3d1f3d] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#2c162c]"
      >
        Register your first guitar
      </button>
    </div>
  );
}

export default EmptyState;
