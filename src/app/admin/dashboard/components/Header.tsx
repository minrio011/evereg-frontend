import React from "react";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  username: string;
}

export function Header({ setSidebarOpen, username }: HeaderProps) {
  return (
    <header className="bg-primary px-6 h-14 flex items-center justify-between shrink-0 shadow-sm">
      <div className="flex items-center gap-3">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        </button>
        <h1 className="header-title text-white text-xl font-bold">
          ผู้ลงทะเบียน
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8.5 h-8.5 rounded-full bg-white/25 flex items-center justify-center">
          <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
        <span className="text-white text-[13px] font-semibold">{username}</span>
        <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </header>
  );
}
