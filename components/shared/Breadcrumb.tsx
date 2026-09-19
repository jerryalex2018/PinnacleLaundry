import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  currentPage: string;
}

export default function Breadcrumb({ currentPage }: BreadcrumbProps) {
  return (
    <nav className="w-full border-b border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
        <Link
          href="/"
          className="flex items-center gap-1.5 hover:text-[#0088cc] transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">{currentPage}</span>
      </div>
    </nav>
  );
}
