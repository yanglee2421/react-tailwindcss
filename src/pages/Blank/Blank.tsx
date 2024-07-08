import justHer from "@/assets/image/bg/justHer.jpg";

export function Blank() {
  return (
    <div className="fixed inset-0">
      <button className="absolute end-6 top-6 size-12 rounded-full bg-black/25"></button>

      <img
        src={new URL(justHer, import.meta.url).href}
        alt=""
        className="absolute start-0 top-0"
      />

      <div className="absolute inset-0 z-20 bg-black/50"></div>
    </div>
  );
}
