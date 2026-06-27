import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Sun, Calendar } from 'lucide-react';

interface DaysTogetherCounterProps {
  startDateStr: string;
}

function useCountUp(endValue: number, durationMs: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      
      // Khúc biến chuyển mượt mà (ease-out cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * endValue));

      if (progress < 1) {
        animFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    animFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrameId);
  }, [endValue, durationMs]);

  return count;
}

export default function DaysTogetherCounter({ startDateStr }: DaysTogetherCounterProps) {
  const [totalDays, setTotalDays] = useState(0);
  const [timeBreakdown, setTimeBreakdown] = useState({ years: 0, months: 0, days: 0 });

  useEffect(() => {
    const calculateTimes = () => {
      if (!startDateStr) return;
      const start = new Date(startDateStr);
      const now = new Date();
      if (isNaN(start.getTime())) return;

      // Tính tổng số ngày
      const diffTime = Math.max(0, now.getTime() - start.getTime());
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(days);

      // Tính cụ thể Số năm, Số tháng, Số ngày từ ngày yêu nhau
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let daysDecimal = now.getDate() - start.getDate();

      if (daysDecimal < 0) {
        // Mượn ngày từ tháng trước
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        daysDecimal += prevMonth.getDate();
        months--;
      }

      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeBreakdown({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, daysDecimal),
      });
    };

    calculateTimes();
    const interval = setInterval(calculateTimes, 60000);
    return () => clearInterval(interval);
  }, [startDateStr]);

  const animatedDays = useCountUp(totalDays, 2200);
  const animatedYears = useCountUp(timeBreakdown.years, 2200);
  const animatedMonths = useCountUp(timeBreakdown.months, 2200);
  const animatedDaysDecimal = useCountUp(timeBreakdown.days, 2200);

  const formatNum = (num: number) => {
    return num.toLocaleString('vi-VN');
  };

  return (
    <section id="countdown" className="py-24 bg-white/45 border-y border-[#FFDCE8]/50 relative overflow-hidden px-4">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-base/20 to-transparent pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-pastel/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-pastel/10 rounded-full blur-2xl pointer-events-none" />

      <div className="absolute top-1/4 left-10 text-brand-pastel/15 pointer-events-none select-none">
        <Heart className="w-16 h-16 fill-brand-pastel/5" />
      </div>
      <div className="absolute bottom-1/4 right-12 text-brand-pastel/15 pointer-events-none select-none">
        <Sparkles className="w-12 h-12 text-brand-accent/10" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <div 
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-pastel/30 border border-brand-pastel/50 text-brand-dark text-xs font-semibold tracking-widest uppercase mb-4 gsap-reveal-up"
        >
          <Heart className="w-3.5 h-3.5 text-brand-deep fill-brand-deep animate-pulse" />
          <span>Hành Trình Yêu Thương Qua Những Con Số</span>
        </div>

        <h3 
          className="font-serif text-3xl md:text-5xl text-brand-dark mb-4 tracking-wide font-medium gsap-reveal-up"
        >
          Ngày Bên Nhau
        </h3>
        
        <p 
          className="text-gray-500 font-light text-sm max-w-lg mx-auto mb-16 gsap-reveal-up"
        >
          Ghi dấu từng khoảnh khắc tuyệt vời của nụ cười, cột mốc hạnh phúc và những ước mơ mà chúng ta đã nắm chặt tay nhau vượt qua.
        </p>

        {/* Khung đếm số ngày cực đại đầy cảm xúc */}
        <div
          className="mb-14 relative inline-block gsap-reveal-scale"
        >
          <div className="absolute inset-0 bg-brand-pastel/20 rounded-3xl blur-xl scale-95" />
          <div className="relative bg-white/70 backdrop-blur-md px-10 py-8 rounded-3xl border border-brand-pastel/50 shadow-md">
            <h4 className="font-cursive text-5xl md:text-7xl text-brand-deep leading-none mb-2 select-none">
              {formatNum(animatedDays)} Ngày
            </h4>
            <span className="font-serif italic text-lg md:text-2xl text-brand-dark block font-light">
              Bên Nhau &amp; Tiếp Tục Đồng Hành 
            </span>
          </div>
        </div>

        {/* Lưới các thẻ Widget bé mỏng tinh giản gồm 2 Thẻ: Tổng Số Ngày và Ngày Hiện Tại */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto gsap-reveal-stagger-container">
          
          {/* Thẻ đếm Ngày */}
          <div
            className="bg-white/80 backdrop-blur-xs p-6 md:p-8 rounded-2xl relative border border-brand-pastel/30 shadow-xs group hover:-translate-y-1 hover:shadow-md transition-all duration-300 gsap-reveal-stagger-item"
          >
            <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-accent to-brand-deep opacity-80" />
            <div className="flex justify-center mb-3 text-brand-accent">
              <Sun className="w-7 h-7 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div className="font-serif text-4xl md:text-5xl font-semibold text-brand-dark group-hover:text-brand-deep transition-colors tracking-tight font-light tabular-nums">
              {formatNum(animatedDays)}
            </div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-3">Tổng số ngày</div>
          </div>

          {/* Thẻ tổng ngày - tháng - năm */}
          <div
            className="bg-white/80 backdrop-blur-xs p-6 md:p-8 rounded-2xl relative border border-brand-pastel/30 shadow-xs group hover:-translate-y-1 hover:shadow-md transition-all duration-300 gsap-reveal-stagger-item"
          >
            <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-accent to-brand-deep opacity-80" />
            <div className="flex justify-center mb-3 text-brand-accent">
              <Heart className="w-7 h-7 text-brand-accent fill-brand-accent/15 animate-pulse" />
            </div>
            <div className="font-serif text-xl sm:text-2xl md:text-[28px] md:leading-normal font-semibold text-brand-dark group-hover:text-brand-deep transition-all tracking-wide font-light flex items-center justify-center gap-1 hover:gap-1.5 flex-wrap min-h-[3rem]">
              <span><span className="font-bold tabular-nums">{animatedYears}</span> Năm</span>
              <span className="opacity-30">•</span>
              <span><span className="font-bold tabular-nums">{animatedMonths}</span> Tháng</span>
              <span className="opacity-30">•</span>
              <span><span className="font-bold tabular-nums">{animatedDaysDecimal}</span> Ngày</span>
            </div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-3">Tổng năm - tháng - ngày</div>
          </div>

        </div>

      </div>
    </section>
  );
}