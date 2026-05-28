"use client";

import { useEffect } from "react";

export function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `Dermalytix — ${title}`;
  }, [title]);
  return null;
}
