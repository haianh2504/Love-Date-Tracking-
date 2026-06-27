import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, Plus, Trash2, MapPin, Calendar, Camera } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface GalleryProps {
  isLoggedIn?: boolean;
}

export default function Gallery({ isLoggedIn }: GalleryProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  
  // Trạng thái Form thêm ảnh mới
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState('Ngày Thường');

  // Khôi phục dữ liệu từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wedding_anniversary_gallery');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Kiểm tra và cập nhật cấu trúc nếu cần thiết
        if (parsed.length > 0 && !('description' in parsed[0])) {
          setPhotos([]);
        } else {
          setPhotos(parsed);
        }
      } catch {
        setPhotos([]);
      }
    } else {
      setPhotos([]);
    }
  }, []);

  const savePhotos = (updated: GalleryPhoto[]) => {
    setPhotos(updated);
    localStorage.setItem('wedding_anniversary_gallery', JSON.stringify(updated));
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newDescription.trim() || !newLocation.trim() || !newDate.trim()) return;

    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      url: newUrl.trim(),
      description: newDescription.trim(),
      location: newLocation.trim(),
      date: newDate.trim(),
      category: newCategory
    };

    savePhotos([newPhoto, ...photos]);
    setIsAdding(false);
    setNewUrl('');
    setNewDescription('');
    setNewLocation('');
    setNewDate('');
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Không kích hoạt lightbox khi click nút xóa
    if (confirm('Bạn có chắc chắn muốn xóa bức ảnh kỷ niệm này khỏi album?')) {
      const updated = photos.filter(p => p.id !== id);
      savePhotos(updated);
    }
  };

  // Lấy danh sách các danh mục độc nhất
  const rawCategories = Array.from(new Set(photos.map(p => p.category as string))) as string[];
  const categories = ['All', ...rawCategories];

  // Lọc hình ảnh theo danh mục đã chọn
  const filteredPhotos = activeCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  const translateCategory = (cat: string) => {
    if (cat === 'All') return 'Tất cả';
    return cat;
  };

  return (
    <section id="gallery" className="py-24 bg-white/70 relative px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Tiêu đề góc Album ảnh */}
        <div className="text-center mb-12 gsap-reveal-up">
          <span className="font-cursive text-3xl md:text-4xl text-brand-accent block mb-2">Cuốn Album Ấm Áp</span>
          <h2 className="font-serif text-3.5xl md:text-5xl text-brand-dark tracking-wide font-medium">
            Bộ Sưu Tập Kỷ Niệm
          </h2>
          <div className="h-0.5 w-20 bg-brand-accent/40 mx-auto my-3" />
          <p className="text-gray-500 font-light text-xs md:text-sm max-w-lg mx-auto">
            Nơi lưu trữ những nụ cười rạng rỡ, những hành trình ngập tràn nắng vàng, những góc nhỏ bình yên và từng khoảnh khắc ngọt ngào chúng mình đã đi qua.
          </p>
        </div>

        {/* Thanh công cụ định dạng và bộ lọc danh mục */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-brand-pastel/15 p-3 rounded-2xl border border-brand-pastel/30 gsap-reveal-up">
          
          {/* Nút lọc danh mục */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-accent text-white shadow-xs'
                    : 'bg-white/90 text-gray-500 hover:text-brand-deep hover:bg-brand-pastel/20'
                }`}
              >
                {translateCategory(cat)}
              </button>
            ))}
          </div>

          {/* Khung chức năng thêm ảnh / khôi phục */}
          <div className="flex items-center gap-3">
            {/* Chỉ hiện nút Thêm khi đã đăng nhập */}
            {isLoggedIn && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-deep/10 hover:bg-brand-deep/20 text-brand-dark rounded-full text-xs font-semibold cursor-pointer transition-all border border-brand-pastel/40"
                id="btn-add-photo-scrapbook"
              >
                <Plus className="w-3.5 h-3.5 text-brand-deep" />
                <span>Thêm Kỷ Niệm Mới</span>
              </button>
            )}
          </div>

        </div>

        {/* Cuốn album kỷ niệm được dàn trải dọc tinh tế dạng Grid 4 cột trên desktop */}
        <div className="relative w-full max-w-6xl mx-auto py-4">
          
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10 gsap-reveal-stagger-container"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full group relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl bg-white border border-brand-pastel/30 shadow-xs hover:shadow-lg transition-all duration-500 gsap-reveal-stagger-item"
                  onClick={() => setSelectedPhoto(photo)}
                  title="Nhấp để xem hành trình thời gian"
                >
                  {/* Khung cấu trúc ảnh duy trì tỉ lệ hình vuông gọn gàng, dễ nhìn */}
                  <div className="relative w-full aspect-square overflow-hidden bg-brand-base/20 flex flex-col justify-center">
                    <img
                      src={photo.url}
                      alt={photo.description}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover md:group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out select-none"
                      loading="lazy"
                    />

                    {/* Thêm một lớp phủ chuyển màu tối thẫm ở chân ảnh giúp chữ tuyệt đối sắc nét, dễ đọc */}
                    <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/92 via-black/45 to-transparent pointer-events-none" />

                    {/* Icon phóng to thu phóng tinh gọn góc trên bên phải */}
                    <span className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-white/75 backdrop-blur-md p-1.5 sm:p-2 rounded-full text-brand-dark shadow-xs opacity-0 md:group-hover:opacity-100 transition-all duration-300 scale-90 md:group-hover:scale-100 hidden md:inline-flex">
                      <ZoomIn className="w-4 h-4" />
                    </span>

                    {/* Nút hủy bỏ tấm ảnh kỷ niệm góc trên trái (Chỉ hiển thị khi đã đăng nhập) */}
                    {isLoggedIn && (
                      <button
                        onClick={(e) => handleDeletePhoto(photo.id, e)}
                        className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-red-50/90 hover:bg-red-500 hover:text-white backdrop-blur-md p-1.5 sm:p-2 rounded-full text-red-500 shadow-xs opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                        title="Xóa kỷ niệm này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Thẻ ghi chú nhãn danh mục lửng lơ */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 px-2.5 py-0.5 bg-brand-base/85 backdrop-blur-md text-[8px] sm:text-[9px] font-bold text-brand-deep uppercase tracking-widest rounded-md border border-brand-pastel/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      {photo.category}
                    </div>

                    {/* Nội dung ký hiệu câu văn lãng mạn lơ lửng góc trái bên dưới */}
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 md:p-5 flex flex-col justify-end text-left text-white select-none pointer-events-none max-h-[45%] bg-gradient-to-t from-black/95 via-black/40 to-transparent pb-3 sm:pb-4 md:pb-5">
                      {/* Tiêu đề Chữ Tình / Lời tâm tư đầy cảm xúc */}
                      <h4 className="font-serif italic text-[11px] sm:text-xs md:text-sm lg:text-[15px] font-light text-white leading-snug drop-shadow-sm mb-1 sm:mb-1.5 max-w-[95%] transition-colors duration-300 group-hover:text-brand-pastel line-clamp-2">
                        &ldquo;{photo.description}&rdquo;
                      </h4>

                      {/* Địa điểm và Thời gian / Ngày kỷ niệm */}
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[8px] sm:text-[9px] md:text-xs text-white/85 font-mono tracking-wide font-light">
                        <span className="flex items-center gap-1 font-medium bg-white/15 px-1.5 py-0.5 rounded-sm md:rounded-md backdrop-blur-xs">
                          {photo.location}
                        </span>
                        {photo.location && photo.date && <span className="opacity-60">•</span>}
                        <span className="opacity-90">{photo.date}</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Trạng thái trống nếu chưa có ảnh nào */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-brand-pastel/10 rounded-3xl border border-dashed border-brand-pastel/80">
            <Camera className="w-12 h-12 text-brand-pastel mx-auto mb-3" />
            <p className="text-gray-500 font-serif">Chưa có bức ảnh kỷ niệm nào trong danh mục này.</p>
            {isLoggedIn && (
              <p className="text-xs text-gray-400 mt-1">Hãy nhấp vào &ldquo;Thêm Kỷ Niệm Mới&rdquo; ở trên để đăng tải bức ảnh đầu tiên!</p>
            )}
          </div>
        )}

        {/* Modal Thêm Ảnh Kỷ Niệm */}
        <AnimatePresence>
          {isAdding && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden text-left border border-brand-pastel/50"
              >
                <div className="px-6 py-4 bg-brand-pastel/30 border-b border-brand-pastel/60 flex justify-between items-center">
                  <h3 className="font-serif font-bold text-md text-brand-dark flex items-center gap-1.5">
                    <Camera className="w-5 h-5 text-brand-deep" />
                    <span>Đăng Tải Thẻ Ảnh Kỷ Niệm Mới</span>
                  </h3>
                  <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-brand-dark cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddPhoto} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Đường dẫn hình ảnh (URL)</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/40 font-mono text-xs"
                      placeholder="Ví dụ: https://images.unsplash.com/photo-abc..."
                      required
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Cung cấp đường dẫn ảnh trực tuyến công khai (Unsplash, Imgur, v.v.)</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mô tả ngắn về kỷ niệm</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                      placeholder="Ví dụ: Ngày dạo mát dưới tiếng lá rơi phong đỏ"
                      required
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Địa điểm</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                        placeholder="Ví dụ: Đà Lạt, Lâm Đồng"
                        required
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Thời gian / Ngày</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                        placeholder="Ví dụ: Tháng 6, 2025"
                        required
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Danh mục phân loại</label>
                    <select
                      className="w-full px-3 py-2 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    >
                      <option value="Đám Cưới">Đám Cưới</option>
                      <option value="Ngày Thường">Ngày Thường</option>
                      <option value="Chuyến Đi">Chuyến Đi</option>
                    </select>
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-4 py-2 text-xs hover:bg-gray-100 border border-gray-200 rounded-lg cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold bg-brand-accent text-white hover:bg-brand-deep rounded-lg cursor-pointer shadow-sm"
                      id="btn-confirm-add-photo"
                    >
                      <span>Thêm Vào Album</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Bản phóng to Lightbox khi click thẻ ảnh */}
        <AnimatePresence>
          {selectedPhoto && (
            <div 
              className="fixed inset-0 z-50 bg-brand-dark/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl flex flex-col items-center bg-white shadow-2xl p-3"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Nút đóng */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-all cursor-pointer z-35"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Ảnh hiển thị phóng to */}
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.description}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] max-w-full object-contain select-none rounded-lg"
                />

                {/* Nhãn Polaroid ghi chú đi kèm bên dưới */}
                <div className="w-full bg-white p-5 text-left border-t border-brand-pastel/20 mt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block px-2.5 py-0.5 bg-brand-pastel text-brand-dark font-medium text-[10px] uppercase tracking-wider rounded-md">
                      {selectedPhoto.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium font-mono">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                        <span>{selectedPhoto.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                        <span>{selectedPhoto.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-serif italic text-md md:text-lg text-brand-dark leading-relaxed font-light">
                    &ldquo;{selectedPhoto.description}&rdquo;
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}