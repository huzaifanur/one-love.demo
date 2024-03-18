import Sidebar from "@/components/layout/sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return <main className="min-h-screen flex">{children}</main>;
}
