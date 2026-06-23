/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Menu, X, ArrowUp } from 'lucide-react';
import { CoupleProfile } from './types';
import { INITIAL_PROFILE } from './data/memories';

// Các thành phần cấu phần đã mô-đun hóa
import Hero from './components/Hero';
import DaysTogetherCounter from './components/DaysTogetherCounter';
import Gallery from './components/Gallery';
import MyThoughtsForYou from './components/MyThoughtsForYou';
import Footer from './components/Footer';

// Import Firebase Authentication functions
import { signInWithPopup, signOut } from "firebase/auth";
import { getFirebaseAuth, googleProvider } from "./firebase";

const ALLOWED_EMAILS = [
  "haianh2504077@gmail.com",
  "vungocanhthu1192009@gmail.com" 
];


// ranh giới
export default function App() {
  const [profile, setProfile] = useState<CoupleProfile>(INITIAL_PROFILE);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Khôi phục hồ sơ lưu niệm từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wedding_anniversary_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Khử lỗi mất dữ liệu nếu lưu vết phiên bản cũ
        if (!parsed.letterText && INITIAL_PROFILE.letterText) {
          parsed.letterText = INITIAL_PROFILE.letterText;
        }
        setProfile(parsed);
      } catch {
        setProfile(INITIAL_PROFILE);
      }
    } else {
      setProfile(INITIAL_PROFILE);
    }
    
    // Màn hình chờ bắt đầu dịu dàng
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Lắng nghe thao tác cuộn để đổi phong cách thanh công cụ
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpdateProfile = (newProfile: CoupleProfile) => {
    setProfile(newProfile);
    localStorage.setItem('wedding_anniversary_profile', JSON.stringify(newProfile));
  };

  const getInitials = () => {
    const p1 = profile.partner1 ? profile.partner1.charAt(0) : 'H';
    const p2 = profile.partner2 ? profile.partner2.charAt(0) : 'C';
    return `${p1} & ${p2}`;
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  // xử lý đăng nhập Google với Firebase Authentication
  const handleGoogleLogin = async () => {
    try {
      // Mở cửa sổ popup chọn tài khoản Google
      const auth = getFirebaseAuth();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userEmail = user.email?.toLowerCase();

      // Backend Logic: Kiểm tra phân quyền
      if (userEmail && ALLOWED_EMAILS.includes(userEmail)) {
        console.log("Xác thực thành công. Xin chào:", user.displayName);
        alert(`Chào mừng ${user.displayName} đã quay trở lại không gian của chúng mình!`);
        // Đánh dấu là đã đăng nhập để hiển thị các nút chỉnh sửa
        setIsLoggedIn(true);
        
      } else {
        // Nếu email không được phép, đăng xuất và thông báo
        await signOut(auth);
        setIsLoggedIn(false);
        alert("Khu vực riêng tư! Bạn không có quyền truy cập.");
      }
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log("Tiến trình đăng nhập bị hủy.");
      } else {
        console.error("Lỗi xác thực Firebase:", error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-brand-base text-brand-dark overflow-hidden relative">

      {/* Màn hình Pre-loader Intro đầy lãng mạn */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-[#FEF3F6] flex flex-col justify-center items-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-brand-accent mb-4 cursor-pointer"
            >
              <Heart className="w-16 h-16 fill-brand-accent drop-shadow-md" />
            </motion.div>
            
            <h2 className="font-cursive text-4xl text-brand-dark mb-1 select-none">
              Viết nên câu chuyện tình...
            </h2>
            <p className="text-xs text-gray-400 font-light tracking-widest uppercase">
              {profile.partner1} &amp; {profile.partner2}
            </p>

            <div className="mt-8 flex gap-1 items-center justify-center">
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce delay-200" />
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce delay-150" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thanh công cụ định vị dán mờ thủy tinh */}
      <nav className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-md py-3 shadow-xs border-b border-brand-pastel/30' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo / Chữ viết tắt */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 font-cursive text-2xl md:text-3xl text-brand-dark tracking-wide font-medium hover:text-brand-deep transition-colors select-none cursor-pointer"
          >
            <Heart className="w-5 h-5 text-brand-accent fill-brand-accent animate-pulse" />
            <span>{getInitials()}</span>
          </button>

          {/* Các nút liên kết điều hướng trên Desktop */}
          <div className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-gray-500">
            <button onClick={() => scrollToSection('countdown')} className="hover:text-brand-deep cursor-pointer transition-colors">Ngày bên nhau</button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-brand-deep cursor-pointer transition-colors">Bộ sưu tập kỷ niệm</button>
            <button onClick={() => scrollToSection('thoughts')} className="hover:text-brand-deep cursor-pointer transition-colors">Lời thương gửi em</button>
          </div>

          {/* Nút login */}
          <button
            onClick={handleGoogleLogin}
            className="inline-flex items-center px-5 py-1 sm:px-6 sm:py-1.5 rounded-full bg-white text-amber-900 border border-pink-200 shadow-sm hover:bg-brand-deep hover:text-white hover:border-brand-deep transition-all text-[9px] sm:text-[10px] font-serif font-semibold uppercase tracking-widest"
          >
            Login
          </button>

          {/* Biểu tượng thực đơn nhỏ cho Mobile */}
          <div className="flex items-center">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-full hover:bg-brand-pastel/30 text-brand-dark transition-all cursor-pointer"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Thực đơn di động ngăn ké mờ */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[60px] z-39 glass-panel shadow-lg border-b border-brand-pastel/30 p-6 flex flex-col gap-4 text-center md:hidden"
          >
            <button onClick={() => scrollToSection('countdown')} className="py-2 text-sm font-semibold text-gray-600 hover:text-brand-deep hover:bg-brand-pastel/10 rounded-xl transition-all cursor-pointer">Ngày bên nhau</button>
            <button onClick={() => scrollToSection('gallery')} className="py-2 text-sm font-semibold text-gray-600 hover:text-brand-deep hover:bg-brand-pastel/10 rounded-xl transition-all cursor-pointer">Bộ sưu tập kỷ niệm</button>
            <button onClick={() => scrollToSection('thoughts')} className="py-2 text-sm font-semibold text-gray-600 hover:text-brand-deep hover:bg-brand-pastel/10 rounded-xl transition-all cursor-pointer">Lời thương gửi em</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Các phần cấu trúc chính */}
      <main>
        
        {/* 1. Phần mở màn đại diện Hero */}
        <Hero profile={profile} onUpdateProfile={handleUpdateProfile} isLoggedIn={isLoggedIn} />

        {/* 2. Phần tự động đếm ngày bên nhau */}
        <DaysTogetherCounter startDateStr={profile.weddingDate} />

        {/* 3. Cuốn lưu bút hình ảnh kỷ niệm */}
        <Gallery isLoggedIn={isLoggedIn} />

        {/* 4. Lá thư gửi thương yêu riêng tư đầy xúc cảm */}
        <MyThoughtsForYou profile={profile} onUpdateProfile={handleUpdateProfile} isLoggedIn={isLoggedIn} />

      </main>

      {/* 5. Đoạn kết ấm áp cuối trang */}
      <Footer profile={profile} />

      {/* Nút quay lại đầu trang lơ lửng */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-45 bg-white p-3 rounded-full shadow-md text-brand-accent hover:text-brand-deep border border-brand-pastel hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Quay lên đầu"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
