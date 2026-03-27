const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} KeRo WebDev. Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-1 text-zinc-600 text-sm">
            Made by Robin &amp; Kevin
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;