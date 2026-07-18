import { apiFetch } from "@/lib/api";
import { TimelineEntry } from "@/types";

export const dynamic = "force-dynamic";

export default async function ProgramKerjaPage() {
  const [besar, individu] = await Promise.all([
    apiFetch<TimelineEntry[]>("/api/timeline?type=besar"),
    apiFetch<TimelineEntry[]>("/api/timeline?type=individu"),
  ]);

  return (
    <div className="min-h-screen bg-rice pt-24 pb-16 relative">
      {/* Tribuwhana Watermark Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q70 40 50 80 Q30 40 50 20 Z' fill='%232C4A3B'/%3E%3Cpath d='M20 50 Q40 60 50 80 Q30 70 20 50 Z' fill='%238B3A62'/%3E%3Cpath d='M80 50 Q60 60 50 80 Q70 70 80 50 Z' fill='%238B3A62'/%3E%3C/svg%3E\")", backgroundSize: "120px" }}></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">Program Kerja Utama</h1>
          <div className="h-1 w-20 bg-shallot mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-forest/80 max-w-2xl mx-auto">
            Inovasi pembuatan kompor Rocket Stove hemat energi untuk meningkatkan efisiensi dan
            mendukung kemandirian energi Dusun Karangasem Kulon.
          </p>
        </div>

        {/* Timeline Proker Besar */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-forest/20 before:to-transparent animate-in fade-in duration-1000 delay-200">
          {besar.map((entry, idx) => (
            <div key={entry.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Icon / Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-rice bg-shallot shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative">
                <span className="w-2.5 h-2.5 bg-rice rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-forest/5 border border-forest/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-shallot/10 transition-all duration-300 relative group-odd:text-right">
                {/* Arrow */}
                <div className="absolute top-5 -left-3 md:group-odd:-right-3 md:group-odd:left-auto md:group-even:-left-3 w-6 h-6 bg-white border-b border-l border-forest/10 transform rotate-45 md:group-odd:-rotate-[135deg]"></div>
                
                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-shallot bg-shallot/10 rounded-full border border-shallot/20">
                  {entry.date_or_period}
                </span>
                <h3 className="font-display text-2xl font-bold text-forest mb-3">{entry.title}</h3>
                <p className="text-forest/80 leading-relaxed text-sm md:text-base">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Proker Individu Grid */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-forest mb-4">Program Tambahan & Individu</h2>
            <div className="h-0.5 w-16 bg-paddy mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {individu.map((entry) => (
              <div key={entry.id} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-forest/10 shadow-lg shadow-forest/5 hover:bg-white transition-colors duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-paddy"></div>
                  <span className="text-xs font-semibold text-forest/50 uppercase tracking-wider">{entry.date_or_period}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-forest mb-2">{entry.title}</h3>
                <p className="text-forest/70 text-sm leading-relaxed">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
