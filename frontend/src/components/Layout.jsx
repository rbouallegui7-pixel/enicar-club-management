import Sidebar from "./Sidebar";

export default function Layout({ children, title, subtitle }) {
  return (
    <div className="flex h-screen bg-[#0f1117] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="px-6 py-4 border-b border-[#1e2130] flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-white font-black text-lg" style={{ fontFamily: "Syne, sans-serif" }}>
              {title}
            </h1>
            {subtitle && <p className="text-[#5a6080] text-xs mt-0.5">{subtitle}</p>}
          </div>
          <div className="w-8 h-8 bg-[#161924] border border-[#1e2540] rounded-lg flex items-center justify-center relative cursor-pointer">
            <div className="w-3 h-0.5 bg-[#5a6080] rounded" style={{ boxShadow: "0 4px 0 #5a6080, 0 -4px 0 #5a6080" }} />
            <div className="w-1.5 h-1.5 bg-[#4f7fff] rounded-full absolute top-1.5 right-1.5" />
          </div>
        </div>
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}