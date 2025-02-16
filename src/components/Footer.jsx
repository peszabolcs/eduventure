export default function Footer() {
    return (
        <footer className="relative py-2">
            <div className="relative text-center text-xs sm:text-sm text-white/60">
                © {new Date().getFullYear()} Perjési Szabolcs. Minden jog fenntartva.
            </div>
        </footer>
    );
}