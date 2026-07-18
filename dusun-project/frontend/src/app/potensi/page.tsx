import { Sprout, Tractor, Trees } from "lucide-react";

const potensiData = [
  {
    title: "Bawang Merah",
    description: "Komoditas utama kebanggaan warga, ditanam dengan penuh dedikasi menghasilkan kualitas terbaik yang diakui di pasar lokal maupun regional.",
    icon: Sprout,
    color: "text-shallot",
    bgColor: "bg-shallot/10",
    borderColor: "border-shallot/20",
  },
  {
    title: "Pertanian",
    description: "Sistem agrikultur yang subur menopang ketahanan pangan dan roda perekonomian dusun, didukung pengairan dan iklim tropis yang ideal.",
    icon: Tractor,
    color: "text-paddy",
    bgColor: "bg-paddy/10",
    borderColor: "border-paddy/20",
  },
  {
    title: "Kehutanan",
    description: "Kawasan hutan yang terjaga kelestariannya, memberikan udara segar, resapan air, dan sumber daya alam yang berkelanjutan bagi masyarakat.",
    icon: Trees,
    color: "text-forest",
    bgColor: "bg-forest/10",
    borderColor: "border-forest/20",
  },
];

export default function PotensiPage() {
  return (
    <div className="min-h-screen bg-rice pt-24 pb-16 relative">
      {/* Tribuwhana Watermark Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q70 40 50 80 Q30 40 50 20 Z' fill='%232C4A3B'/%3E%3Cpath d='M20 50 Q40 60 50 80 Q30 70 20 50 Z' fill='%238B3A62'/%3E%3Cpath d='M80 50 Q60 60 50 80 Q70 70 80 50 Z' fill='%238B3A62'/%3E%3C/svg%3E\")", backgroundSize: "120px" }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">Potensi Lokal</h1>
          <div className="h-1 w-20 bg-shallot mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-forest/80 max-w-2xl mx-auto">
            Dusun Karangasem Kulon dianugerahi kekayaan alam yang melimpah. Berikut adalah pilar-pilar utama penopang kemandirian desa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {potensiData.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-8 shadow-lg shadow-forest/5 hover:shadow-xl transition-all duration-300 border border-forest/10 group animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${item.bgColor} ${item.color} border ${item.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl font-bold text-forest mb-4">{item.title}</h3>
              <p className="text-forest/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Image Section */}
        <div className="mt-20 relative rounded-3xl overflow-hidden h-[400px] shadow-2xl flex items-center justify-center animate-in fade-in duration-1000 delay-500 border border-forest/20">
          <div className="absolute inset-0 bg-[url('/images/tentang/kulonprogo1.webp')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-forest/60 backdrop-blur-[2px]"></div>
          <div className="relative z-10 text-center px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-rice mb-4">Berkembang Bersama Alam</h2>
            <p className="text-rice/90 text-lg max-w-xl mx-auto">Sinergi antara masyarakat dan alam adalah kunci keberlanjutan potensi Karangasem Kulon.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
