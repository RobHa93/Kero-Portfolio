const SectionLabel = ({ children, className = "mb-12" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-8 h-px bg-sky-400" aria-hidden="true" />
    <span className="text-sm font-medium tracking-widest uppercase text-sky-400">
      {children}
    </span>
  </div>
);

export default SectionLabel;
