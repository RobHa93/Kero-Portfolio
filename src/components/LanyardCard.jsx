const LanyardCard = ({ ready }) => {
  return (
    <div
      className={`flex flex-col items-center select-none ${
        ready ? "swing-in" : "opacity-0"
      }`}
      style={{ transformOrigin: "top center" }}
    >
      {/* Lanyard string */}
      <div
        className="w-3 rounded-full bg-gradient-to-b from-transparent via-zinc-500/70 to-zinc-500/90"
        style={{ height: "38vh" }}
      />

      {/* Carabiner / clip */}
      <div className="flex flex-col items-center -mt-px">
        <div className="w-3.5 h-5 rounded-full border-2 border-zinc-500 bg-zinc-800 shadow" />
        <div className="w-1 h-2 bg-zinc-600" />
      </div>

      {/* ID Card */}
      <div className="w-62 rounded-2xl overflow-hidden bg-white shadow-[0_24px_70px_rgba(0,0,0,0.65)] border border-white/10">
        {/* Photo */}
        <div className="overflow-hidden" style={{ height: "200px" }}>
          <img
            src="/assets/img/Foto.png"
            alt="Robin & Kevin"
            className="object-cover w-full h-full object-fit grayscale"
          />
        </div>

        {/* Card info */}
        <div className="px-4 pt-3 pb-4 bg-white">
          <p className="mb-1 font-mono text-xs tracking-widest uppercase text-zinc-400">
            kero.dev
          </p>
          <h3 className="text-lg font-bold leading-snug text-zinc-900">
            Robin &amp; Kevin
          </h3>
          <p className="mb-3 text-sm text-zinc-500">Full-Stack Developers</p>
          <div className="flex gap-1.5">
            <span className="text-xs bg-zinc-100 text-zinc-600 px-2.5 py-0.5 rounded-full border border-zinc-200">
              Frontend
            </span>
            <span className="text-xs bg-zinc-100 text-zinc-600 px-2.5 py-0.5 rounded-full border border-zinc-200">
              Backend
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanyardCard;
