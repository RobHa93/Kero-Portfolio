const Footer = () => {
  return (
    <footer className="border-t bg-zinc-950 border-white/5">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <div className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} KeRo WebDev. Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-1 text-sm text-zinc-600">
            Made by Kevin &amp; Robin
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;