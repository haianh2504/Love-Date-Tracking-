import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Edit3, Save, X, RefreshCw } from 'lucide-react';
import { CoupleProfile } from '../types';

interface MyThoughtsForYouProps {
  profile: CoupleProfile;
  onUpdateProfile: (newProfile: CoupleProfile) => void;
  isLoggedIn?: boolean;
}

export default function MyThoughtsForYou({ profile, onUpdateProfile, isLoggedIn }: MyThoughtsForYouProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLetter, setEditedLetter] = useState(profile.letterText || '');

  const handleSave = () => {
    onUpdateProfile({
      ...profile,
      letterText: editedLetter
    });
    setIsEditing(false);
  };

  const handleReset = () => {
    if (confirm('Bạn có muốn khôi phục về lá thư tình ngọt ngào mặc định ban đầu không?')) {
      const defaultText = `Thương gửi Mai Chi yêu dấu,

Khi nhìn lại ngày hai tâm hồn ta cùng hòa làm một, anh luôn cảm thấy diệu kỳ trước cách cuộc sống của chúng mình đã dịu dàng gắn kết cùng nhau. Suốt những tháng ngày qua, em đã trở thành tiếng cười vang trong những buổi chiều yên ả, là hơi ấm vỗ về giữa những ngày đông lạnh giá, và là người tri kỷ tin cậy nhất mà anh có thể sẻ chia trong mỗi bước chân cuộc đời.

Từng khoảnh khắc, từng bức ảnh nhỏ nâng niu trên trang album này là một chương của cuộc hành trình phiêu lưu phi thường nhất—cuộc phiêu lưu mà anh sẽ chẳng bao giờ đánh đổi bằng bất cứ điều gì trên thế giới này. Từ những buổi hẹn hò cà phê đầu tiên còn ngập ngừng e thẹn, cho đến những hành trình sải cánh ở những vùng đất mới, mỗi khung hình đều gìn giữ trọn vẹn nhịp đập trái tim của câu chuyện chúng mình. Em đã dạy anh biết thế nào là sự nhẫn nại, nét dịu hiền và lòng bao dung, và trong đôi mắt trong trẻo của em, anh đã tìm thấy mái ấm yên bình nhất mà anh hằng kiếm tìm.

Cảm ơn em vì sự dịu dàng vô bờ bến, vì nụ cười rạng rỡ luôn sưởi ấm những ngày mây mù u tối trong lòng anh, và vì tình yêu đong đầy mà em luôn dành trọn cho anh. Trang web này là một món quà nhỏ tôn vinh tình yêu của chúng mình—a permanent digital scrapbook of our frozen giggles, big milestones, và những vũ điệu giản dị vụn vặt mỗi ngày khiến cho cuộc đời ta thêm muôn phần trọn vẹn.

Anh yêu em nhiều hơn sau mỗi bình minh thức giấc, và hứa sẽ mãi nắm chặt tay em qua mọi chương đời còn chưa viết tiếp ở phía trước.

Yêu em mãi mãi,
Quang Huy`;
      setEditedLetter(defaultText);
      onUpdateProfile({
        ...profile,
        letterText: defaultText
      });
    }
  };

  // Convert letter text into paragraphs safely
  const paragraphs = (profile.letterText || '').split('\n').filter(p => p.trim() !== '');

  return (
    <section id="thoughts" className="py-24 bg-gradient-to-tr from-[#FFF5F7] via-white to-[#FFF0F4] relative px-4 overflow-hidden">
      
      {/* Sao lấp lánh / đốm sáng bay lơ lửng */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-brand-pastel/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-brand-pastel/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Caption Header */}
        <div className="text-center mb-12 gsap-reveal-up">
          <span className="font-cursive text-3xl md:text-4xl text-brand-accent block mb-2">Lời Thương Sâu Kín</span>
          <h2 className="font-serif text-3.5xl md:text-5xl text-brand-dark tracking-wide font-medium">
            Lời Muốn Nói Với Em
          </h2>
          <div className="h-0.5 w-20 bg-brand-accent/40 mx-auto my-3" />
        </div>

        {/* Khung bức thư tinh tế với hiệu ứng kính mờ và chuyển động nhẹ */}
        <div
          className="relative bg-white/75 backdrop-blur-md border border-brand-pastel/40 p-8 md:p-14 rounded-3xl shadow-sm tracking-wide leading-relaxed italic gsap-reveal-scale"
        >
          {/* Con dấu sáp niêm phong bằng biểu tượng trái tim dễ thương */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center shadow-md border-2 border-white select-none pointer-events-none text-white"
            >
              <Heart className="w-5 h-5 fill-current" />
            </motion.div>
          </div>

          {/* Nội dung chi tiết thư */}
          <div className="text-left font-sans text-gray-700 space-y-6 md:text-lg leading-loose md:leading-extra-loose mt-4">
            
            {paragraphs.map((para, i) => {
              // Định dạng đặc biệt cho Tiêu đề Thư (nhập đề)
              if (i === 0 && (para.startsWith('To') || para.startsWith('Thương') || para.startsWith('Gửi'))) {
                return (
                  <p key={i} className="text-xl md:text-2xl font-semibold text-brand-dark font-cursive tracking-wide mb-6">
                    {para}
                  </p>
                );
              }
              
              // Định dạng đặc biệt cho Chữ Ký / Đoạn kết thư
              const isSignature = para.startsWith('Forever') || para.startsWith('Yêu') || para.startsWith('Thương') || para.indexOf('Huy') > -1 || paragraphs.length - 1 === i;
              if (isSignature) {
                return (
                  <p key={i} className="text-right pt-6 text-brand-deep font-cursive text-2xl md:text-3.5xl tracking-wide select-none">
                    {para}
                  </p>
                );
              }

              return (
                <p key={i} className="font-light tracking-wide pl-2 md:pl-4 border-l-2 border-brand-pastel/30">
                  {para}
                </p>
              );
            })}

          </div>

          {/* Thanh chức năng bên dưới */}
          <div className="mt-12 pt-6 border-t border-brand-pastel/20 flex items-center justify-between gap-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setEditedLetter(profile.letterText || '');
                    setIsEditing(true);
                  }}
                  className="flex items-center gap-1.5 px-4.5 py-2 text-xs rounded-full bg-brand-pastel/30 hover:bg-brand-pastel/50 text-brand-dark/90 transition-all border border-brand-pastel/40 cursor-pointer shadow-xs font-semibold"
                >
                  <Edit3 className="w-3.5 h-3.5 text-brand-deep" />
                  <span>Chỉnh Sửa Lời Thư</span>
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-brand-dark transition-all cursor-pointer hover:underline"
                  title="Khôi phục thư tình ngọt ngào nguyên bản"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Thư Mặc Định</span>
                </button>
              </>
            ) : (
              <div />
            )}

          </div>

        </div>

      </div>

      {/* Hộp thoại chỉnh sửa thư (Dialog) */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden text-left border border-brand-pastel/50"
            >
              <div className="px-6 py-4 bg-brand-pastel/30 border-b border-brand-pastel/60 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-deep animate-pulse" />
                  <h3 className="font-serif font-semibold text-lg text-brand-dark">Chỉnh Sửa Bức Thư Tình</h3>
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-full hover:bg-white text-gray-400 hover:text-brand-dark transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Nội dung tình thư từ đáy lòng</label>
                <textarea
                  rows={14}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-sans leading-relaxed"
                  value={editedLetter}
                  onChange={(e) => setEditedLetter(e.target.value)}
                  placeholder="Thương gửi... hãy viết những tâm sự lãng mạn gửi tới tình yêu của bạn..."
                />
                <p className="text-[11px] text-gray-400 mt-2">Mẹo: Sử dụng dòng trống giữa các đoạn văn để bức thư được dàn trang thoáng đãng, lãng mạn hơn.</p>
              </div>

              <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 border border-gray-200 text-xs font-semibold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-brand-accent text-white hover:bg-brand-deep cursor-pointer text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                  id="btn-save-letter"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Cập Nhật &amp; Lưu Thư</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}