export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-900 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} HireFlow. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with Next.js & Tailwind CSS for a better hiring experience.
        </p>
      </div>
    </footer>
  );
}