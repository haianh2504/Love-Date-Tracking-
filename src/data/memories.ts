import { GalleryPhoto, CoupleProfile } from '../types';

export const INITIAL_PROFILE: CoupleProfile = {
  partner1: 'Quang Huy',
  partner2: 'Mai Chi',
  weddingDate: '2021-06-25', // Ngày kỷ niệm bắt đầu hành trình yêu nhau
  anniversaryTitle: 'Kỷ Niệm Hành Trình Yêu Thương',
  anniversarySubtitle: 'Mỗi ngày trôi qua bên em là một cuộc phiêu lưu ngọt ngào nhất của cuộc đời anh.',
  quote: 'Trăm năm không dài khi ta bên nhau.',
  letterText: `Thương gửi Mai Chi yêu dấu,

Khi nhìn lại ngày hai tâm hồn ta cùng hòa làm một, anh luôn cảm thấy diệu kỳ trước cách cuộc sống của chúng mình đã dịu dàng gắn kết cùng nhau. Suốt những tháng ngày qua, em đã trở thành tiếng cười vang trong những buổi chiều yên ả, là hơi ấm vỗ về giữa những ngày đông lạnh giá, và là người tri kỷ tin cậy nhất mà anh có thể sẻ chia trong mỗi bước chân cuộc đời.

Từng khoảnh khắc, từng bức ảnh nhỏ nâng niu trên trang album này là một chương của cuộc hành trình phiêu lưu phi thường nhất—cuộc phiêu lưu mà anh sẽ chẳng bao giờ đánh đổi bằng bất cứ điều gì trên thế giới này. Từ những buổi hẹn hò cà phê đầu tiên còn ngập ngừng e thẹn, cho đến những hành trình sải cánh ở những vùng đất mới, mỗi khung hình đều gìn giữ trọn vẹn nhịp đập trái tim của câu chuyện chúng mình. Em đã dạy anh biết thế nào là sự nhẫn nại, nét dịu hiền và lòng bao dung, và trong đôi mắt trong trẻo của em, anh đã tìm thấy mái ấm yên bình nhất mà anh hằng kiếm tìm.

Cảm ơn em vì sự dịu dàng vô bờ bến, vì nụ cười rạng rỡ luôn sưởi ấm những ngày mây mù u tối trong lòng anh, và vì tình yêu đong đầy mà em luôn dành trọn cho anh. Trang web này là một món quà nhỏ tôn vinh tình yêu của chúng mình—một cuốn lưu bút kỹ thuật số vĩnh cửu ôm trọn những nụ cười, những cột mốc thiêng liêng, và những vũ điệu giản dị vụn vặt mỗi ngày khiến cho cuộc đời ta thêm muôn phần trọn vẹn.

Anh yêu em nhiều hơn sau mỗi bình minh thức giấc, và hứa sẽ mãi nắm chặt tay em qua mọi chương đời còn chưa viết tiếp ở phía trước.

Yêu em mãi mãi,
Quang Huy`
};

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    description: 'Ngày chung đôi ngọt ngào, cùng trao nhau những lời hẹn ước thiêng liêng',
    location: 'Nhà nguyện Rosewood',
    date: 'Tháng 6, 2021',
    category: 'Đám Cưới'
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    description: 'Nắm chặt tay nhau dạo bước giữa những đồng cỏ mùa hè ngập tràn nắng vàng',
    location: 'Thung lũng Tuscany',
    date: 'Tháng 8, 2021',
    category: 'Chuyến Đi'
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1529636798458-921a4a6621c7?auto=format&fit=crop&w=800&q=80',
    description: 'Ngắm hoàng hôn buông lơi, dạo bước bình yên dọc bãi biển vắng rì rào sóng vỗ',
    location: 'Bờ biển Malibu',
    date: 'Tháng 10, 2021',
    category: 'Chuyến Đi'
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    description: 'Trốn những cơn mưa thu bất chợt trong quán cà phê ấm cúng quen thuộc của chúng mình',
    location: 'Tiệm Cà Phê Roasted Bean',
    date: 'Tháng 9, 2018',
    category: 'Ngày Thường'
  },
  {
    id: 'photo-5',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    description: 'Dạo bước dưới những chiếc lá phong vàng rực rực rỡ của những ngày thu dịu mát',
    location: 'Công viên Central Park',
    date: 'Tháng 10, 2018',
    category: 'Ngày Thường'
  },
  {
    id: 'photo-6',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    description: 'Trái tim rộn ràng thắp sáng pháo hoa đêm Giáng Sinh, khoảnh khắc anh ngỏ lời cầu hôn em',
    location: 'Quảng trường Ánh Sáng',
    date: 'Tháng 12, 2020',
    category: 'Ngày Thường'
  },
  {
    id: 'photo-7',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Trao nhau cặp nhẫn cưới giản dị trên nền những đóa hồng trắng tinh khôi',
    location: 'Nhà nguyện Rosewood',
    date: 'Tháng 6, 2021',
    category: 'Đám Cưới'
  },
  {
    id: 'photo-8',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    description: 'Vũ điệu hồi hộp đầu tiên của hai đứa dưới những chiếc đèn lồng lung linh ngoài vườn',
    location: 'Nhà kính Garden Greenhouse',
    date: 'Tháng 6, 2021',
    category: 'Đám Cưới'
  },
  {
    id: 'photo-9',
    url: 'https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21a?auto=format&fit=crop&w=800&q=80',
    description: 'Sáng Chủ Nhật lười biếng ngập tràn tiếng cười, cùng nhau làm những chiếc bánh ngọt thơm lừng',
    location: 'Căn hộ nhỏ đầu tiên của hai đứa',
    date: 'Tháng 11, 2021',
    category: 'Ngày Thường'
  },
  {
    id: 'photo-10',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    description: 'Chuyến du lịch nước ngoài đầu tiên cùng nhau khám phá Paris hoa lệ đầy lãng mạn',
    location: 'Đồi tháp Eiffel',
    date: 'Tháng 4, 2022',
    category: 'Chuyến Đi'
  },
  {
    id: 'photo-11',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    description: 'Cùng cắm trại dưới trời sao lấp lánh, sưởi ấm tay bên ánh lửa hồng lập lòe',
    location: 'Trang trại Yosemite',
    date: 'Tháng 7, 2022',
    category: 'Chuyến Đi'
  },
  {
    id: 'photo-12',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    description: 'Vẽ một hình trái tim nguệch ngoạc trên cát ướt trước khi sóng xô bãi biển xóa nhòa',
    location: 'Cầu cảng Santa Monica',
    date: 'Tháng 9, 2022',
    category: 'Ngày Thường'
  },
  {
    id: 'photo-13',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    description: 'Tận hưởng ly cacao nóng hổi bên nhau trong những chiếc áo len đôi ấm áp',
    location: 'Ngôi nhà gỗ mộc mạc',
    date: 'Tháng 12, 2022',
    category: 'Ngày Thường'
  },
  {
    id: 'photo-14',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    description: 'Che chung chiếc ô màu vàng nhỏ bé dạo bước bình yên dưới cơn mưa rào lãng mạn',
    location: 'Khu phố cổ Brick Lane',
    date: 'Tháng 3, 2023',
    category: 'Ngày Thường'
  },
  {
    id: 'photo-15',
    url: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
    description: 'Cùng nhau ăn kẹo bông gòn khổng lồ và ngắm thành phố từ vòng quay mặt trời lung linh',
    location: 'Hội chợ mùa hè nhộn nhịp',
    date: 'Tháng 8, 2023',
    category: 'Ngày Thường'
  },
  {
    id: 'photo-16',
    url: 'https://images.unsplash.com/photo-1542550371427-311e1b0427cc?auto=format&fit=crop&w=800&q=80',
    description: 'Nhâm nhi tách trà hoa cúc ấm nồng, quấn chung chiếc khăn len sọc đỏ rực rỡ',
    location: 'Quảng trường cổ kính',
    date: 'Tháng 1, 2024',
    category: 'Ngày Thường'
  },
  {
    id: 'photo-17',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Trốn xa những ồn ào vội vã để sưởi mình dưới cái nắng vàng rực rỡ bãi biển cát trắng',
    location: 'Bờ biển resort Phuket',
    date: 'Tháng 5, 2024',
    category: 'Chuyến Đi'
  },
  {
    id: 'photo-18',
    url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80',
    description: 'Trải nghiệm đua xe đạp vui nhộn xuống những dốc đồi hoa thơ mộng bạt ngàn',
    location: 'Đồi hoa mộng mơ Sa Pa',
    date: 'Tháng 9, 2024',
    category: 'Chuyến Đi'
  },
  {
    id: 'photo-19',
    url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80',
    description: 'Cùng làm bếp lấm lem bột để nướng chiếc bánh dâu tây đầu tiên tặng sinh nhật em',
    location: 'Căn bếp ngọt ngào',
    date: 'Tháng 2, 2025',
    category: 'Ngày Thường'
  },
  {
    id: 'photo-20',
    url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80',
    description: 'Thức dậy từ sớm đón bình minh tuyệt đẹp sau đêm leo núi rét căm căm cùng nhau',
    location: 'Đỉnh núi mờ sương Đà Lạt',
    date: 'Tháng 6, 2025',
    category: 'Chuyến Đi'
  }
];
