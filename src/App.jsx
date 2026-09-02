import { useState, useEffect } from "react";
import { Guitar, ClipboardList } from "lucide-react";
import GuitarForm from "./components/GuitarForm";
import GuitarTable from "./components/GuitarTable";

function App() {
  const [view, setView] = useState("register");
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

 
  useEffect(() => {
    if (selectedId === null) {
      setSelectedItem(null);
      return;
    }
    const found = items.find((item) => item.id === selectedId);
    setSelectedItem(found || null);
  }, [selectedId, items]);

  const handleRegister = (newItem) => {
    setItems((prev) => [...prev, newItem]);
    setTimeout(() => setView("registry"), 900);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#fdf6ec] p-4 md:p-8">
      <div className="w-full max-w-5xl">
        {/* TAB NAV */}
        <div className="mb-5 flex justify-center">
          <div className="inline-flex gap-1 rounded-2xl bg-white p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setView("register")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                view === "register"
                  ? "bg-[#3d1f3d] text-white shadow-sm"
                  : "text-[#8a6d8a] hover:bg-[#fdf6ec]"
              }`}
            >
              <Guitar size={15} strokeWidth={2.3} />
              Register
            </button>
            <button
              type="button"
              onClick={() => setView("registry")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                view === "registry"
                  ? "bg-[#3d1f3d] text-white shadow-sm"
                  : "text-[#8a6d8a] hover:bg-[#fdf6ec]"
              }`}
            >
              <ClipboardList size={15} strokeWidth={2.3} />
              Registry
              {items.length > 0 && (
                <span className="rounded-full bg-[#e07a5f] px-1.5 py-0.5 text-[10px] text-white">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {view === "register" && (
          <GuitarForm itemsCount={items.length} onRegister={handleRegister} />
        )}

        {view === "registry" && (
          <GuitarTable
            items={items}
            selectedId={selectedId}
            selectedItem={selectedItem}
            onSelectRow={setSelectedId}
            onGoToRegister={() => setView("register")}
          />
        )}
      </div>
    </div>
  );
}

export default App;
