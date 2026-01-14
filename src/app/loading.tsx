export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* لوگوی در حال تپش */}
        <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#1A2A3A] font-bold font-serif animate-pulse">VELA...</p>
      </div>
    </div>
  );
}