import { useState } from "react";
import Layout from "../components/Layout";
import { mockClubs, mockUsers } from "../mock/data";

function ClubCard({ club, onDelete }) {
  const president = mockUsers.find((u) => u.id === club.presidentId);
  const initials = club.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="bg-[#161924] border border-[#1e2540] hover:border-[#4f7fff] rounded-xl p-4 transition-all cursor-pointer">
      <div className="w-10 h-10 rounded-lg bg-[#1a2040] border border-[#2a3060] flex items-center justify-center text-[#4f7fff] text-sm font-black mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
        {initials}
      </div>
      <div className="text-white text-sm font-bold mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
        {club.name}
      </div>
      <div className="text-[#5a6080] text-xs mb-4 leading-relaxed">{club.description}</div>
      <div className="flex items-center justify-between border-t border-[#1e2130] pt-3">
        <div className="text-xs text-[#5a6080]">
          <span className="text-[#4f7fff] font-semibold">{club.members.length}</span> membres
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1a2040] text-[#4f7fff] border border-[#2a3060]" style={{ fontFamily: "Syne, sans-serif" }}>
            {president?.fullName?.split(" ")[0]}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(club.id); }}
            className="text-[10px] text-[#2e3455] hover:text-red-400 transition-colors font-bold"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

function NewClubModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#161924] border border-[#1e2540] rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-white font-black text-base mb-5" style={{ fontFamily: "Syne, sans-serif" }}>
          Créer un nouveau club
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#5a6080] text-xs uppercase tracking-wider">Nom du club *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Club Robotique"
              className="bg-[#0f1117] border border-[#1e2540] rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#2e3455] focus:outline-none focus:border-[#4f7fff] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[#5a6080] text-xs uppercase tracking-wider">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description du club..."
              rows={3}
              className="bg-[#0f1117] border border-[#1e2540] rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#2e3455] focus:outline-none focus:border-[#4f7fff] transition-colors resize-none"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 bg-transparent border border-[#1e2540] rounded-lg py-2.5 text-[#5a6080] text-sm hover:border-[#4f7fff] transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 bg-[#4f7fff] hover:bg-[#3a62e8] disabled:opacity-40 rounded-lg py-2.5 text-white text-xs font-bold tracking-widest uppercase transition-colors"