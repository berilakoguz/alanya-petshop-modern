"use client";

import { useState } from "react";
import { brandLogoDomains } from "@/data/brand-logos";

type BrandLogoProps = {
  brand: string;
};

function getBrandInitials(brand: string) {
  const words = brand
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toLocaleUpperCase("tr-TR");
}

export function BrandLogo({ brand }: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);
  const domain = brandLogoDomains[brand];
  const initials = getBrandInitials(brand);

  return (
    <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-neutral-200 bg-white p-2 shadow-sm">
      {domain && !hasError ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`}
          alt={`${brand} logosu`}
          className="size-full object-contain"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
        />
      ) : (
        <span
          className="flex size-full items-center justify-center rounded-[6px] bg-mint-100 text-sm font-black text-leaf-800"
          aria-label={`${brand} logosu`}
        >
          {initials}
        </span>
      )}
    </span>
  );
}

