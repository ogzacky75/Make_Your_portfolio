import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AuthenticatedLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "ml-0 md:ml-64"}`}>
        {/* Mobile navbar */}
        <div className="p-4 bg-white shadow-sm flex items-center justify-between md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-indigo-600">
            <i className="fas fa-bars text-2xl"></i>
          </button>
          <h1 className="text-lg font-semibold text-gray-800">{title || "Dashboard"}</h1>
        </div>

        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
