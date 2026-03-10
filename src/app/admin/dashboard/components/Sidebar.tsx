import React from "react";
import Image from "next/image";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="px-4 py-6">
          <Image
            src="/images/maybeline_logo.png"
            alt="Maybelline Logo"
            width={120}
            height={40}
            className="w-full h-auto object-contain"
          />
        </div>
        <nav className="w-full px-3">
          <div className="bg-primary rounded-lg px-3.5 py-2.5 flex items-center gap-2 cursor-pointer shadow-sm">
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
            <span className="text-white text-[13px] font-semibold">ผู้ลงทะเบียน</span>
          </div>
        </nav>
      </aside>
    </>
  );
}
