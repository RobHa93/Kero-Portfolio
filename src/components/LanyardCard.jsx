const LanyardCard = ({
  ready,
  name = "Robin & Kevin",
  role = "Full-Stack Developer",
  photo = "/assets/img/Foto.png",
  tags = ["Frontend", "Backend"],
  delay = 0,
  stringHeight = "28vh",
}) => {
  return (
    <div
      className={`flex flex-col items-center select-none ${
        ready ? "swing-in" : "opacity-0"
      }`}
      style={{ transformOrigin: "top center", animationDelay: `${delay}s` }}
    >
      {/* Lanyard string */}
      <div
        className="w-3 rounded-full bg-gradient-to-b from-transparent via-zinc-500/70 to-zinc-500/90"
        style={{ height: stringHeight }}
      />

      {/* Carabiner / clip */}
      <div className="flex flex-col items-center -mt-px">
        <div className="w-3.5 h-5 rounded-full border-2 border-zinc-500 bg-zinc-800 shadow" />
        <div className="w-1 h-2 bg-zinc-600" />
      </div>

      {/* ID Card */}
      <div className="w-56 rounded-2xl overflow-hidden bg-white shadow-[0_24px_70px_rgba(0,0,0,0.65)] border border-white/10">
        {/* Photo */}
        <div className="overflow-hidden" style={{ height: "180px" }}>
          <img
            src={photo}
            alt={name}
            className="object-cover w-full h-full object-fit grayscale"
          />
        </div>

        {/* Card info */}
        <div className="px-4 pt-3 pb-4 bg-white">
          <p className="mb-1 font-mono text-xs tracking-widest uppercase text-zinc-400">
            kero.dev
          </p>
          <h3 className="text-base font-bold leading-snug text-zinc-900">{name}</h3>
          <p className="mb-3 text-xs text-zinc-500">{role}</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-zinc-100 text-zinc-600 px-2.5 py-0.5 rounded-full border border-zinc-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanyardCard;
