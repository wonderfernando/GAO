"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean); // remove vazios

  return (
    <nav className="flex items-center text-xs text-gray-500 mb-3">
      {segments.map((seg, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        const isLast = idx === segments.length - 1;

        return (
          <span key={idx} className="flex items-center">
            {isLast ? (
              <span className="font-semibold text-gray-700 capitalize">
                {decodeURIComponent(seg)}
              </span>
            ) : (
              <button
                onClick={() => router.push(href)}
                className="hover:underline hover:text-gray-700 capitalize"
              >
                {decodeURIComponent(seg)}
              </button>
            )}
            {!isLast && <ChevronRight className="w-3 h-3 mx-1" />}
          </span>
        );
      })}
    </nav>
  );
}
