"use client";

import { useState, useEffect } from "react";
import "./dashboard.css";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { SummaryCards } from "./components/SummaryCards";
import { Filters } from "./components/Filters";
import { RegistrationTable } from "./components/RegistrationTable";
import { Toast } from "./components/Toast";
import { Registration, ToastState, FanZoneFilter, EventDateFilter, SummaryData } from "./types";
import { COLORS } from "@/constants/theme";
import { 
  getDashboardSummary, 
  getAllRegistrations, 
  updateEligibility, 
  sendManualEmail,
  exportRegistrations 
} from "@/services/campaign.service";

import withAuth from "@/hoc/withAuth";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [fanZoneFilter, setFanZoneFilter] = useState<FanZoneFilter>("ทั้งหมด");
  const [eventDateFilter, setEventDateFilter] = useState<EventDateFilter>("ทั้งหมด");
  const [emailFilter, setEmailFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Registration[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [summary, setSummary] = useState<SummaryData>({
    total_registrations: 0,
    fan_zone: { current: 0, total: 0 },
    email_sent: { sent: 0, total: 0 }
  });
  const [emailLoading, setEmailLoading] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);

  const showToast = (msg: string, type: ToastState["type"] = "success"): void => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const fetchData = async () => {
    try {
      // Map filters to API params
      const params: any = {
        page: currentPage,
        limit: 10,
      };

      if (fanZoneFilter !== "ทั้งหมด") {
        // Find event_id for the selected fan zone
        const eventMap: Record<string, number> = {
          "Winny - Satang": 1,
          "Almond - Progress": 2,
          "Daou": 3
        };
        params.event_id = eventMap[fanZoneFilter];
      }

      if (eventDateFilter !== "ทั้งหมด") {
        params.start_date = eventDateFilter;
        params.end_date = eventDateFilter;
      }

      if (search) params.search = search;
      if (emailFilter) params.email = emailFilter;

      const [registrationsRes, summaryRes] = await Promise.all([
        getAllRegistrations(params),
        getDashboardSummary()
      ]);

      setData(registrationsRes.data.list);
      setTotalItems(registrationsRes.data.pagination.totalItems);
      setSummary(summaryRes.data);
    } catch (error) {
      showToast("ไม่สามารถดึงข้อมูลได้", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, fanZoneFilter, search, emailFilter, eventDateFilter]);

  useEffect(() => {
    setEventDateFilter("ทั้งหมด");
  }, [fanZoneFilter]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleFanZone = async (id: number): Promise<void> => {
    try {
      await updateEligibility(id);
      setData((prev) =>
        prev.map((r) => (r.id === id ? { ...r, is_eligible: !r.is_eligible } : r))
      );
      showToast("อัปเดตสถานะ Fan Zone แล้ว");
      // Refresh summary
      const summaryRes = await getDashboardSummary();
      setSummary(summaryRes.data);
    } catch (error) {
      showToast("ไม่สามารถอัปเดตสถานะได้", "error");
    }
  };

  const sendEmail = async (id: number): Promise<void> => {
    setEmailLoading(id);
    try {
      await sendManualEmail(id);
      setData((prev) => prev.map((r) => (r.id === id ? { ...r, is_sent: true } : r)));
      showToast("ส่งอีเมลสำเร็จ ✓");
      // Refresh summary
      const summaryRes = await getDashboardSummary();
      setSummary(summaryRes.data);
    } catch (error) {
      showToast("ไม่สามารถส่งอีเมลได้", "error");
    } finally {
      setEmailLoading(null);
    }
  };

  const exportCSV = async (): Promise<void> => {
    try {
      const params: any = {};
      if (fanZoneFilter !== "ทั้งหมด") {
        const eventMap: Record<string, number> = {
          "Winny - Satang": 1,
          "Almond - Progress": 2,
          "Daou": 3
        };
        params.event_id = eventMap[fanZoneFilter];
      }
      if (search) params.search = search;
      if (emailFilter) params.email = emailFilter;

      const blob = await exportRegistrations(params);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Export สำเร็จ ✓");
    } catch (error) {
      showToast("ไม่สามารถ Export ข้อมูลได้", "error");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main-content">
        <Header setSidebarOpen={setSidebarOpen} username={user?.username || ""} />

        <main className="flex-1 p-6 overflow-y-auto">
          <SummaryCards summary={summary} />

          <Filters
            fanZoneFilter={fanZoneFilter}
            setFanZoneFilter={setFanZoneFilter}
            eventDateFilter={eventDateFilter}
            setEventDateFilter={setEventDateFilter}
            emailFilter={emailFilter}
            setEmailFilter={setEmailFilter}
            search={search}
            setSearch={setSearch}
            onExport={exportCSV}
          />

          <RegistrationTable
            registrations={data}
            totalRegistrations={totalItems}
            currentPage={currentPage}
            limit={10}
            emailLoading={emailLoading}
            onToggleFanZone={toggleFanZone}
            onSendEmail={sendEmail}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>

      <Toast toast={toast} />
    </div>
  );
}

export default withAuth(AdminDashboard);
