/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Menu, X, ArrowUp } from 'lucide-react';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

import { CoupleProfile } from './types';
import { INITIAL_PROFILE } from './data/memories';
import { getFirebaseAuth, googleProvider } from "./firebase";
import { useFirestore } from './hooks/useFirestore';
import { toastSuccess, toastError, toastInfo } from './utils/toast';

// Các thành phần lớn được lazy-load để giảm initial bundle
const Hero = lazy(() => import('./components/Hero'));
const DaysTogetherCounter = lazy(() => import('./components/DaysTogetherCounter'));
const Gallery = lazy(() => import('./components/Gallery'));
const MyThoughtsForYou = lazy(() => import('./components/MyThoughtsForYou'));
const Footer = lazy(() => import('./components/Footer'));

const ALLOWED_EMAILS = [
  "haianh2504077@gmail.com",
  "vungocanhthu1192009@gmail.com" 
];

// Use fixed document ID for couple profile storage
const COUPLE_PROFILE_DOC_ID = 'couple_profile';

export default function App() {
  const [profile, setProfile] = useState<CoupleProfile>(INITIAL_PROFILE);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSavingToFirestore, setIsSavingToFirestore] = useState(false);

  // Initialize Firestore hooks
  const { getProfile: getProfileFromFirestore, saveProfile: saveProfileToFirestore } = useFirestore();

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

  // Đọc trạng thái đăng nhập lưu trong localStorage khi mount (nếu có)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('isLoggedIn');
    if (stored === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Auth state listener (lazy-load auth only in browser)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let unsubscribe: (() => void) | undefined;
    try {
      const auth = getFirebaseAuth();
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        const email = user?.email?.toLowerCase();
        if (user && email && ALLOWED_EMAILS.includes(email)) {
          setIsLoggedIn(true);
          // Load profile from Firestore when user logs in
          try {
            const result = await getProfileFromFirestore(COUPLE_PROFILE_DOC_ID);
            if (result.success && result.data) {
              setProfile(result.data);
              localStorage.setItem('wedding_anniversary_profile', JSON.stringify(result.data));
              toastInfo('✨ Đã tải dữ liệu từ Firestore');
            }
          } catch (err) {
            console.error('Error loading from Firestore:', err);
            // Fallback to localStorage if Firestore fails
          }
        } else {
          setIsLoggedIn(false);
        }
      });
    } catch (err) {
      // Auth not available in this environment yet — ignore
      // console.debug('Auth init skipped:', err);
    }

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [getProfileFromFirestore]);

  // Đồng bộ isLoggedIn vào localStorage để duy trì phiên giữa các reload
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
    } catch (e) {
      // Ignore storage errors (e.g., private mode)
    }
  }, [isLoggedIn]);

  const handleUpdateProfile = async (newProfile: CoupleProfile) => {
    setProfile(newProfile);
    localStorage.setItem('wedding_anniversary_profile', JSON.stringify(newProfile));

    // If logged in, also save to Firestore
    if (isLoggedIn) {
      setIsSavingToFirestore(true);
      try {
        const result = await saveProfileToFirestore(COUPLE_PROFILE_DOC_ID, newProfile);
        if (result.success) {
          toastSuccess('💾 Đã lưu dữ liệu thành công!');
        } else {
          toastError(`Lỗi: ${result.error || 'Không thể lưu dữ liệu'}`);
          console.error('Firestore save failed:', result.error);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        toastError(`Lỗi: ${errorMsg}`);
        console.error('Error saving to Firestore:', err);
      } finally {
        setIsSavingToFirestore(false);
      }
    }
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
        toastSuccess(`Chào mừng ${user.displayName} đã quay trở lại!`);
        // Đánh dấu là đã đăng nhập để hiển thị các nút chỉnh sửa
        setIsLoggedIn(true);
        
      } else {
        // Nếu email không được phép, đăng xuất và thông báo
        await signOut(auth);
        setIsLoggedIn(false);
        toastError("Khu vực riêng tư! Bạn không có quyền truy cập.");
      }
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log("Tiến trình đăng nhập bị hủy.");
      } else {
        console.error("Lỗi xác thực Firebase:", error);
        toastError('Lỗi đăng nhập. Vui lòng thử lại.');
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

          {/* Nút login / logout */}
          {!isLoggedIn ? (
            <button
              onClick={handleGoogleLogin}
              className="inline-flex items-center px-5 py-1 sm:px-6 sm:py-1.5 rounded-full bg-white text-amber-900 border border-pink-200 shadow-sm hover:bg-brand-deep hover:text-white hover:border-brand-deep transition-all text-[9px] sm:text-[10px] font-serif font-semibold uppercase tracking-widest"
            >
              Login
            </button>
          ) : (
            <button
              onClick={async () => {
                try {
                  const auth = getFirebaseAuth();
                  await signOut(auth);
                  setIsLoggedIn(false);
                  toastInfo('👋 Đã đăng xuất thành công');
                } catch (err) {
                  console.error('Logout error:', err);
                  toastError('Lỗi đăng xuất. Vui lòng thử lại.');
                }
              }}
              className="inline-flex items-center px-5 py-1 sm:px-6 sm:py-1.5 rounded-full bg-brand-pastel/40 text-brand-deep border border-brand-accent shadow-sm hover:bg-brand-pastel/60 transition-all text-[9px] sm:text-[10px] font-serif font-semibold uppercase tracking-widest"
            >
              Logout
            </button>
          )}

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
            className="fixed inset-x-0 top-15 z-39 glass-panel shadow-lg border-b border-brand-pastel/30 p-6 flex flex-col gap-4 text-center md:hidden"
          >
            <button onClick={() => scrollToSection('countdown')} className="py-2 text-sm font-semibold text-gray-600 hover:text-brand-deep hover:bg-brand-pastel/10 rounded-xl transition-all cursor-pointer">Ngày bên nhau</button>
            <button onClick={() => scrollToSection('gallery')} className="py-2 text-sm font-semibold text-gray-600 hover:text-brand-deep hover:bg-brand-pastel/10 rounded-xl transition-all cursor-pointer">Bộ sưu tập kỷ niệm</button>
            <button onClick={() => scrollToSection('thoughts')} className="py-2 text-sm font-semibold text-gray-600 hover:text-brand-deep hover:bg-brand-pastel/10 rounded-xl transition-all cursor-pointer">Lời thương gửi em</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Các phần cấu trúc chính */}
      <main>
        <Suspense fallback={<div className="py-24 text-center">Đang tải nội dung...</div>}>
          {/* 1. Phần mở màn đại diện Hero */}
          <Hero profile={profile} onUpdateProfile={handleUpdateProfile} isLoggedIn={isLoggedIn} />

          {/* 2. Phần tự động đếm ngày bên nhau */}
          <DaysTogetherCounter startDateStr={profile.weddingDate} />

          {/* 3. Cuốn lưu bút hình ảnh kỷ niệm */}
          <Gallery isLoggedIn={isLoggedIn} />

          {/* 4. Lá thư gửi thương yêu riêng tư đầy xúc cảm */}
          <MyThoughtsForYou profile={profile} onUpdateProfile={handleUpdateProfile} isLoggedIn={isLoggedIn} />

          {/* 5. Đoạn kết */}
          <Footer profile={profile} />
        </Suspense>
      </main>

      {/* 5. Đoạn kết ấm áp cuối trang */}
      

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
