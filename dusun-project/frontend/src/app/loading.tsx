import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-rice/90 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center">
        {/* Outer rotating decorative rings */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-shallot/40 animate-[spin_3s_linear_infinite] scale-[1.3]"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-paddy/40 animate-[spin_2s_linear_infinite_reverse] scale-[1.15]"></div>
        
        {/* Inner pulsing logo */}
        <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 animate-[pulse_2s_ease-in-out_infinite]">
          <Image
            src="/images/logo/logo-tribuwhana.webp"
            alt="Logo Tribuwhana Akasa"
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-12 flex flex-col items-center">
        <p className="font-display font-medium text-forest/80 tracking-[0.2em] uppercase text-sm animate-pulse">
          Memuat
        </p>
        <div className="flex gap-1 mt-3">
          <div className="w-1.5 h-1.5 rounded-full bg-shallot animate-[bounce_1s_infinite_0ms]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-forest animate-[bounce_1s_infinite_200ms]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-paddy animate-[bounce_1s_infinite_400ms]"></div>
        </div>
      </div>
    </div>
  );
}
