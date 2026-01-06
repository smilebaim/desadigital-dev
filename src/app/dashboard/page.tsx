"use client";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardHome />
    </ProtectedRoute>
  );
}
