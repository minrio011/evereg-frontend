import React from "react";
import { SummaryData } from "../types";

interface SummaryCardsProps {
  summary: SummaryData;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    { value: summary.total_registrations, label: "ผู้ลงทะเบียนทั้งหมด", total: null },
    { value: summary.fan_zone.current, label: "สิทธิ์ Fan zone ทั้งหมด", total: summary.fan_zone.total },
    { value: summary.email_sent.sent, label: "การส่งอีเมล", total: summary.email_sent.total },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map(({ value, label, total }) => (
        <div key={label} className="stat-card">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-[#293074] leading-none">
              {value}
            </span>
            {total !== null && (
              <span className="text-lg text-[#293074] font-semibold">/{total}</span>
            )}
          </div>
          <div className="text-xs text-[#293074] mt-1.5">คน</div>
          <div className="text-[13px] text-[#293074] mt-1 font-medium">{label}</div>
        </div>
      ))}
    </div>
  );
}
