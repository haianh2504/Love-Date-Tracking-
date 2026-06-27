import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, Edit3, Save, X, Sparkles } from 'lucide-react';
import { CoupleProfile } from '../types';

interface HeroProps {
  profile: CoupleProfile;
  onUpdateProfile: (newProfile: CoupleProfile) => void;
  isLoggedIn?: boolean;
}

export default function Hero({ profile, onUpdateProfile, isLoggedIn }: HeroProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<CoupleProfile>(profile);
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; scale: number; duration: number }[]>([]);

  // Keep state synced
  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  // Sinh hiệu ứng bóng bóng tim bay ngập tràn lãng mạn hơn, tăng số lượng và phân bố kích thước
  useEffect(() => {
    const list = Array.from({ length: 36 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Phần trăm chiều rộng màn hình
      delay: Math.random() * 12, // Trễ ngẫu nhiên giây tăng để trải qua mượt mà
      scale: 0.65 + Math.random() * 0.9, // Tăng kích thước trung bình của tim bóng bẩy
      duration: 11 + Math.random() * 16 // Tốc độ trôi dạt thư thái bồng bềnh
    }));
    setHearts(list);
  }, []);

  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  // Hàm định vị định dạng Ngày Tháng Tiếng Việt tuyệt đẹp
  const getReadableWeddingDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return `Ngày ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <header className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#FFF0F4] via-[#FFF9FA] to-[#FFF0F4] px-4 py-16">
      
      {/* Các trái tim dạt bay lơ lửng (Giữ nguyên motion cho hiệu ứng lặp liên tục) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: '105vh', opacity: 0, scale: h.scale }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.85, 0.65, 0],
              x: ['0px', `${Math.sin(h.id) * 45}px`, `-${Math.cos(h.id) * 25}px`, `${Math.sin(h.id * 1.5) * 15}px`, '0px']
            }}
            transition={{
              duration: h.duration,
              repeat: Infinity,
              delay: h.delay,
              ease: 'easeInOut'
            }}
            className="absolute text-brand-pastel/60"
            style={{ left: `${h.left}%` }}
          >
            <Heart className="fill-current text-brand-accent/30" style={{ width: `${26 * h.scale}px`, height: `${26 * h.scale}px` }} />
          </motion.div>
        ))}
      </div>

      {/* Chi tiết trang trí đường viền lượn hoa văn vàng nhạt */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full border border-brand-pastel/30 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full border border-brand-pastel/30 pointer-events-none" />
      
      {/* Vùng chứa nội dung Hero (Áp dụng GSAP) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Ruy băng rực rỡ cách điệu nhịp đập tim */}
        <div
          className="flex items-center justify-center gap-2 mb-6 text-brand-accent gsap-reveal-scale"
        >
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-accent" />
          <Heart className="w-5 h-5 fill-brand-pastel animate-pulse" />
          <Heart className="w-6 h-6 fill-brand-accent text-brand-accent pulse-gently" />
          <Heart className="w-5 h-5 fill-brand-pastel animate-pulse" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-accent" />
        </div>

        {/* Tên hai người yêu nhau hoa mỹ */}
        <h1
          className="font-serif text-5xl md:text-7xl text-brand-dark leading-normal tracking-wide mb-4 select-none font-medium gsap-reveal-up"
        >
          {profile.partner1} <span className="text-brand-accent font-light italic text-4xl md:text-6xl mx-2">&</span> {profile.partner2}
        </h1>

        {/* Tiêu đề Chúc Mừng Kỷ Niệm */}
        <h2
          className="font-serif italic text-2xl md:text-4xl text-brand-deep tracking-wide font-light mb-6 gsap-reveal-up"
        >
          {profile.anniversaryTitle}
        </h2>

        {/* Châm ngôn lãng mạn phụ đề */}
        <p
          className="max-w-xl mx-auto text-sm md:text-base text-gray-600 font-light tracking-wide leading-relaxed italic mb-8 px-4 gsap-reveal-up"
        >
          &ldquo;{profile.anniversarySubtitle}&rdquo;
        </p>

        {/* Hộp ngày tháng hành trình cưới thiêng liêng */}
        <div
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/75 backdrop-blur-md border border-brand-pastel/40 shadow-sm text-xs md:text-sm font-semibold tracking-wider text-brand-dark uppercase gsap-reveal-scale"
        >
          <Calendar className="w-4 h-4 text-brand-accent" />
          <span>{getReadableWeddingDate(profile.weddingDate)}</span>
        </div>

        {/* Nút tác vụ tùy biến ở chân Hero */}
        <div
          className="mt-12 flex justify-center gap-4 gsap-reveal-up"
        >
          {isLoggedIn && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs rounded-full bg-brand-pastel/30 hover:bg-brand-pastel/60 text-brand-dark/80 transition-all border border-brand-pastel/40 cursor-pointer shadow-xs font-medium"
              id="btn-edit-profile"
            >
              <Edit3 className="w-3.5 h-3.5 text-brand-deep" />
              <span>Tùy Chỉnh Sự Kiện</span>
            </button>
          )}

          <a
            href="#countdown"
            className="flex items-center gap-2 px-4 py-2 text-xs rounded-full bg-white/50 hover:bg-white text-brand-dark/80 transition-all border border-gray-200 cursor-pointer shadow-xs font-medium"
          >
            <span>Đếm Ngày Bên Nhau</span>
            <span className="text-xs">↓</span>
          </a>
        </div>

      </div>

      {/* Dialog tùy chính thông tin hồ sơ tình yêu (Giữ nguyên AnimatePresence cho modal) */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden text-left border border-brand-pastel/50"
              id="edit-profile-modal"
            >
              <div className="px-6 py-4 bg-brand-pastel/40 border-b border-brand-pastel/60 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-deep animate-pulse" />
                  <h3 className="font-serif font-semibold text-lg text-brand-dark">Cấu Hình Hành Trình Yêu Thương</h3>
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-full hover:bg-white text-gray-400 hover:text-brand-dark transition-all cursor-pointer"
                  id="btn-close-edit-modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Tên Bạn Nam (Anh)</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm"
                      value={editedProfile.partner1}
                      onChange={(e) => setEditedProfile({ ...editedProfile, partner1: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Tên Bạn Nữ (Em)</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm"
                      value={editedProfile.partner2}
                      onChange={(e) => setEditedProfile({ ...editedProfile, partner2: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Ngày Bắt Đầu Yêu / Ngày Cưới</label>
                  <input
                    type="date"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-mono"
                    value={editedProfile.weddingDate}
                    onChange={(e) => setEditedProfile({ ...editedProfile, weddingDate: e.target.value })}
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Hệ thống sẽ đồng bộ hóa lại toàn bộ thời gian đếm ngược chính xác.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Tiêu Đề Lớn</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-serif"
                    value={editedProfile.anniversaryTitle}
                    onChange={(e) => setEditedProfile({ ...editedProfile, anniversaryTitle: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Lời Đề Từ Lãng Mạn</label>
                  <textarea
                    rows={2}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-200 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm"
                    value={editedProfile.anniversarySubtitle}
                    onChange={(e) => setEditedProfile({ ...editedProfile, anniversarySubtitle: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Câu Trích Dẫn Ý Nghĩa</label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm italic"
                    value={editedProfile.quote}
                    onChange={(e) => setEditedProfile({ ...editedProfile, quote: e.target.value })}
                  />
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 border border-gray-200 text-xs font-medium cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-brand-accent text-white hover:bg-brand-deep cursor-pointer text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                  id="btn-save-profile"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu Hồ Sơ</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </header>
  );
}