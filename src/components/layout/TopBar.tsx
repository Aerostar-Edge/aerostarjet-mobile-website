export default function TopBar() {
  return (
    <div className="bg-navy-deep px-4 py-2 text-label text-white/82">
      <div className="mx-auto max-w-[390px] space-y-1">
        <div className="flex flex-wrap items-center gap-1">
          <span className="font-medium">Approved training partner of</span>
          <span className="font-bold text-accent">NSDC</span>
          <span className="font-medium">&</span>
          <span className="font-bold text-accent">SKILL INDIA</span>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <span className="font-medium text-accent">Centres:</span>
          <span className="font-medium">Ahmedabad · Baroda · Surat · Rajkot</span>
        </div>
      </div>
    </div>
  )
}
