export interface Registration {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  event_id: number;
  is_eligible: boolean;
  is_sent: boolean;
  created_at: string;
  event_name: string;
  event_date: string;
}

export interface ToastState {
  msg: string;
  type: "success" | "error";
}

export const FAN_ZONES = ["ทั้งหมด", "Winny - Satang", "Almond - Progress", "Daou"] as const;

export const EVENT_DATES_BY_FAN_ZONE: Record<string, readonly string[]> = {
  "Winny - Satang": ["ทั้งหมด", "2025-09-26 19:00:00"],
  "Almond - Progress": ["ทั้งหมด", "2025-09-27 19:00:00"],
  "Daou": ["ทั้งหมด", "2025-09-28 17:00:00"],
};

export const ALL_EVENT_DATES = ["ทั้งหมด", "2025-09-26 19:00:00", "2025-09-27 19:00:00", "2025-09-28 17:00:00"] as const;

export type FanZoneFilter = (typeof FAN_ZONES)[number];
export type EventDateFilter = string;

export interface SummaryData {
  total_registrations: number;
  fan_zone: {
    current: number;
    total: number;
  };
  email_sent: {
    sent: number;
    total: number;
  };
}
