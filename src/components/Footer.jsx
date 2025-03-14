export default function Footer() {
  return (
    <footer className="relative py-4 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-xs sm:text-sm text-white/60 backdrop-blur-sm">
            © {new Date().getFullYear()} Perjési Szabolcs. Minden jog
            fenntartva.
          </div>
          <a
            href="/privacy-policy"
            className="text-xs sm:text-sm text-white/60 hover:text-white/80 transition-colors backdrop-blur-sm"
          >
            Adatvédelmi irányelvek
          </a>
          <div className="text-xs sm:text-sm text-white/60 backdrop-blur-sm">
            Kérdésed van?{" "}
            <a
              href="mailto:info@edu-venture.hu"
              className="text-white/80 hover:text-white transition-colors"
            >
              info@edu-venture.hu
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
