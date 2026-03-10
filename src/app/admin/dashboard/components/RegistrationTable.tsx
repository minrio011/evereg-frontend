import React from "react";
import { Registration } from "../types";

interface RegistrationTableProps {
  registrations: Registration[];
  totalRegistrations: number;
  currentPage: number;
  limit: number;
  emailLoading: number | null;
  onToggleFanZone: (id: number) => void;
  onSendEmail: (id: number) => void;
  onPageChange: (page: number) => void;
}

export function RegistrationTable({
  registrations,
  totalRegistrations,
  currentPage,
  limit,
  emailLoading,
  onToggleFanZone,
  onSendEmail,
  onPageChange,
}: RegistrationTableProps) {
  const totalPages = Math.ceil(totalRegistrations / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-xl border-[1.5px] border-border-subtle overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-primary">
              {["#", "First name", "Last name", "Email", "phone", "register", "Fan Zone", "สิทธิ์ Fan Zone", "Send email", "timestamp"].map((h) => (
                <th
                  key={h}
                  className="px-3.5 py-3 text-white text-[12px] font-bold text-left whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registrations.map((row, idx) => (
              <tr
                key={row.id}
                className="row-hover border-b border-gray-50"
                style={{
                  background: idx % 2 === 0 ? "white" : "#fafafa",
                }}
              >
                <td className="px-3.5 py-2.5 text-gray-700 text-[13px] font-semibold">{(currentPage - 1) * limit + idx + 1}</td>
                <td className="px-3.5 py-2.5 text-gray-700 text-[13px] font-semibold">
                  {row.first_name}
                </td>
                <td className="px-3.5 py-2.5 text-gray-700 text-[13px] font-semibold">
                  {row.last_name}
                </td>
                <td className="px-3.5 py-2.5 text-[13px] text-gray-700">{row.email}</td>
                <td className="hide-mobile px-3.5 py-2.5 text-[13px] text-gray-600 font-semibold">
                  {row.phone_number}
                </td>
                <td className="hide-mobile px-3.5 py-2.5 text-[12px] text-gray-600 whitespace-nowrap font-semibold">
                  {row.event_date}
                </td>
                <td className="px-3.5 py-2.5 text-[13px] text-gray-700 font-semibold">
                  {row.event_name}
                </td>
                <td className="px-3.5 py-2.5">
                  <div className="flex justify-center">
                    <div
                      className={`toggle-box ${row.is_eligible ? "checked" : ""}`}
                      onClick={() => onToggleFanZone(row.id)}
                      role="checkbox"
                      aria-checked={row.is_eligible}
                    >
                    </div>
                  </div>
                </td>
                <td className="px-3.5 py-2.5">
                  <button
                    className="btn-send"
                    onClick={() => !row.is_sent && onSendEmail(row.id)}
                    disabled={emailLoading === row.id || row.is_sent}
                    style={{
                      opacity: emailLoading === row.id ? 0.7 : 1,
                      backgroundColor: row.is_sent ? "#6E6E6E" : "#008C4F",
                    }}
                  >
                    {emailLoading === row.id ? "..." : "ส่งอีเมล"}
                  </button>
                </td>
                <td className="hide-mobile px-3.5 py-2.5 text-[12px] text-gray-600 whitespace-nowrap font-semibold">
                  {row.created_at}
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-10 text-gray-400 text-sm">
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3 border-t border-border-subtle flex justify-between items-center flex-wrap gap-2">
        <span className="text-[12px] text-gray-400">
          แสดง {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, totalRegistrations)} จาก {totalRegistrations} รายการ
        </span>
        <div className="flex gap-1.5">
          {pages.map((p) => (
            <div
              key={p}
              className="page-badge"
              onClick={() => onPageChange(p)}
              style={{
                background: p === currentPage ? "#e8003a" : "transparent",
                color: p === currentPage ? "white" : "#888",
                borderColor: p === currentPage ? "#e8003a" : "#e0e0e0",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
