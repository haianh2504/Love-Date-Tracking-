import { motion } from 'motion/react';
import { Heart, ChevronUp, Sparkles, ArrowUp } from 'lucide-react';
import { CoupleProfile } from '../types';

interface FooterProps {
  profile: CoupleProfile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-t from-[#FFF0F4] to-[#FFF5F7] border-t border-[#FFDCE8]/60 py-16 px-4 relative overflow-hidden">
      
      {/* Decorative little floating stars */}
      <div className="absolute top-1/4 left-1/4 text-brand-pastel/30 select-none pointer-events-none pulse-gently">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute top-1/3 right-1/4 text-brand-pastel/30 select-none pointer-events-none animate-pulse">
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Animated big stylized heart container */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex justify-center items-center w-14 h-14 bg-white rounded-full border border-brand-pastel/50 text-brand-accent shadow-xs mb-6 cursor-pointer"
          onClick={scrollToTop}
          title="Về đầu trang"
        >
          <Heart className="w-6 h-6 fill-current" />
        </motion.div>

        {/* Elegant Closing quote */}
        <p className="font-serif italic text-xl md:text-3xl text-brand-dark tracking-wide font-light max-w-2xl mx-auto mb-3 px-4">
          &ldquo;{profile.quote}&rdquo;
        </p>

        {/* Couple names signature */}
        <div className="font-cursive text-3.5xl md:text-5.5.xl text-brand-deep mb-10 select-none">
          Yêu thương đong đầy, {profile.partner1} & {profile.partner2}
        </div>

        {/* Quick navigational triggers */}
        <div className="flex justify-center items-center gap-6 mb-8 text-xs font-semibold tracking-widest uppercase text-gray-400">
          <a href="#countdown" className="hover:text-brand-deep transition-colors">Ngày bên nhau</a>
          <span className="text-brand-pastel/70">•</span>
          <a href="#gallery" className="hover:text-brand-deep transition-colors">Bộ sưu tập kỷ niệm</a>
          <span className="text-brand-pastel/70">•</span>
          <a href="#thoughts" className="hover:text-brand-deep transition-colors">Lời thương gửi em</a>
        </div>

        {/* Subtle metadata credits */}
        <div className="text-[11px] text-gray-400 font-light tracking-wide flex flex-col items-center justify-center gap-1.5 pt-6 border-t border-brand-pastel/30 max-w-xs mx-auto">
          <span>Hành trình của chúng mình từ {profile.weddingDate}</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[10px] text-brand-deep/80 hover:text-brand-deep hover:underline focus:outline-none cursor-pointer mt-1"
          >
            <span>Quay lên đầu</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>

    </footer>
  );
}
