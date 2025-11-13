"use client";
import { useEffect, useRef } from "react";

export default function LessonLayout({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [children]);

  return (
    <div ref={ref} className="overflow-y-scroll h-[90%]">
      {children}
    </div>
  );
}
