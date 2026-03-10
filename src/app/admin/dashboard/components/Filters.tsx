import React from "react";
import { FAN_ZONES, EVENT_DATES_BY_FAN_ZONE, ALL_EVENT_DATES, FanZoneFilter, EventDateFilter } from "../types";

interface FiltersProps {
  fanZoneFilter: FanZoneFilter;
  setFanZoneFilter: (z: FanZoneFilter) => void;
  eventDateFilter: EventDateFilter;
  setEventDateFilter: (d: EventDateFilter) => void;
  emailFilter: string;
  setEmailFilter: (e: string) => void;
  search: string;
  setSearch: (s: string) => void;
  onExport: () => void;
}

export function Filters({
  fanZoneFilter,
  setFanZoneFilter,
  eventDateFilter,
  setEventDateFilter,
  emailFilter,
  setEmailFilter,
  search,
  setSearch,
  onExport,
}: FiltersProps) {
  const eventDates = fanZoneFilter === "ทั้งหมด" 
    ? ALL_EVENT_DATES 
    : EVENT_DATES_BY_FAN_ZONE[fanZoneFilter] || ["ทั้งหมด"];

  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-end">
        <div>
          <label className="text-[12px] text-gray-500 block mb-1 font-semibold">
            Fan Zone
          </label>
          <select
            className="filter-select"
            value={fanZoneFilter}
            onChange={(e) => setFanZoneFilter(e.target.value as FanZoneFilter)}
          >
            {FAN_ZONES.map((z) => <option key={z}>{z}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[12px] text-gray-500 block mb-1 font-semibold">
            ช่วงเวลา
          </label>
          <select
            className="filter-select"
            value={eventDateFilter}
            onChange={(e) => setEventDateFilter(e.target.value)}
          >
            {eventDates.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className="text-[12px] text-gray-500 block mb-1 font-semibold">
            Email
          </label>
          <input
            className="filter-input"
            placeholder="email"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
        </div>
        <div className="lg:col-span-2">
          <label className="text-[12px] text-gray-500 block mb-1 font-semibold">
            ค้นหา
          </label>
          <input
            className="filter-input"
            placeholder="ค้นหาชื่อ-นามสกุล"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button className="btn-export w-full lg:w-auto justify-center" onClick={onExport}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
