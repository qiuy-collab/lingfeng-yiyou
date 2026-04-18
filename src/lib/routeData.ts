export const routeData = {
  '1': {
    title: { zh: '广州历史文化深度游', en: 'Guangzhou History & Culture Deep Dive' },
    cover: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=80&w=1920',
    duration: { zh: '3天2夜', en: '3 Days 2 Nights' },
    location: { zh: '广州', en: 'Guangzhou' },
    price: 1999,
    rating: 4.9,
    reviews: 128,
    highlights: { zh: '探索千年商都，感受岭南建筑之美，品尝地道粤菜', en: 'Explore the millennium-old commercial capital, experience Lingnan architecture, taste authentic Cantonese cuisine' },
    itinerary: [
      {
        day: 1,
        title: { zh: '西关风情·老广州记忆', en: 'Xiguan Style · Old Guangzhou Memories' },
        spots: [
          { name: { zh: '陈家祠', en: 'Chen Clan Academy' }, time: '09:00-11:00', desc: { zh: '岭南建筑瑰宝，精美的木雕、石雕、砖雕艺术', en: 'Gem of Lingnan architecture with exquisite wood, stone, and brick carvings' } },
          { name: { zh: '沙面岛', en: 'Shamian Island' }, time: '14:00-16:00', desc: { zh: '欧式建筑群，中西文化交融的历史见证', en: 'European architecture complex, witness of East-West cultural fusion' } },
          { name: { zh: '上下九步行街', en: 'Shangxiajiu Pedestrian Street' }, time: '16:30-19:00', desc: { zh: '老广州商业街，品尝传统小吃', en: 'Historic commercial street for traditional snacks' } },
        ],
      },
      {
        day: 2,
        title: { zh: '现代广州·活力都市', en: 'Modern Guangzhou · Vibrant City' },
        spots: [
          { name: { zh: '广州塔', en: 'Canton Tower' }, time: '09:00-11:30', desc: { zh: '登顶小蛮腰，俯瞰珠江两岸美景', en: 'Ascend the tower for panoramic views of the Pearl River' } },
          { name: { zh: '珠江新城', en: 'Zhujiang New Town' }, time: '14:00-16:00', desc: { zh: 'CBD核心区，现代都市风光', en: 'Core CBD area with modern cityscapes' } },
          { name: { zh: '珠江夜游', en: 'Pearl River Night Cruise' }, time: '19:00-21:00', desc: { zh: '乘船游览珠江，欣赏两岸夜景', en: 'Boat cruise along the Pearl River with stunning night views' } },
        ],
      },
      {
        day: 3,
        title: { zh: '文化寻根·岭南精粹', en: 'Cultural Roots · Essence of Lingnan' },
        spots: [
          { name: { zh: '西汉南越王博物馆', en: 'Museum of the Nanyue King' }, time: '09:00-11:30', desc: { zh: '探索两千年前南越国历史', en: 'Explore the history of Nanyue Kingdom from 2000 years ago' } },
          { name: { zh: '北京路步行街', en: 'Beijing Road Pedestrian Street' }, time: '14:00-17:00', desc: { zh: '千年古道遗址，购物美食一条街', en: 'Ancient road ruins with shopping and dining options' } },
        ],
      },
    ],
    includes: {
      zh: ['专业导游全程陪同', '景点门票', '当地交通', '2晚四星酒店住宿', '每日早餐', '行程规划'],
      en: ['Professional guide throughout', 'Attraction tickets', 'Local transportation', '2 nights 4-star hotel', 'Daily breakfast', 'Itinerary planning'],
    },
    excludes: {
      zh: ['往返大交通', '个人消费', '午餐晚餐'],
      en: ['Round-trip transportation', 'Personal expenses', 'Lunch and dinner'],
    },
  },
  '2': {
    title: { zh: '潮汕美食文化之旅', en: 'Chaoshan Culinary Adventure' },
    cover: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1920',
    duration: { zh: '4天3夜', en: '4 Days 3 Nights' },
    location: { zh: '潮州·汕头', en: 'Chaozhou · Shantou' },
    price: 2599,
    rating: 4.8,
    reviews: 89,
    highlights: { zh: '品尝正宗潮汕美食，体验工夫茶文化，探索潮州古城', en: 'Taste authentic Chaoshan cuisine, experience Kung Fu tea culture, explore Chaozhou ancient town' },
    itinerary: [
      {
        day: 1,
        title: { zh: '抵达汕头·海滨风情', en: 'Arrival in Shantou · Coastal Charm' },
        spots: [
          { name: { zh: '汕头小公园', en: 'Shantou Small Park' }, time: '14:00-16:00', desc: { zh: '民国建筑群，感受老汕头风情', en: 'Republican-era architecture complex' } },
          { name: { zh: '牛肉火锅', en: 'Beef Hotpot Dinner' }, time: '18:00-20:00', desc: { zh: '正宗潮汕牛肉火锅，鲜嫩多汁', en: 'Authentic Chaoshan beef hotpot' } },
        ],
      },
      {
        day: 2,
        title: { zh: '潮州古城·千年文化', en: 'Chaozhou Ancient Town · Millennium Culture' },
        spots: [
          { name: { zh: '广济桥', en: 'Guangji Bridge' }, time: '09:00-10:30', desc: { zh: '中国四大古桥之一，启闭式浮桥奇观', en: "One of China's four ancient bridges" } },
          { name: { zh: '潮州古城', en: 'Chaozhou Ancient Town' }, time: '10:30-12:00', desc: { zh: '保存完好的古城风貌', en: 'Well-preserved ancient town' } },
          { name: { zh: '工夫茶体验', en: 'Kung Fu Tea Experience' }, time: '15:00-17:00', desc: { zh: '学习潮汕工夫茶冲泡技艺', en: 'Learn Chaoshan Kung Fu tea brewing' } },
        ],
      },
      {
        day: 3,
        title: { zh: '南澳岛·海岛风光', en: 'Nanao Island · Island Scenery' },
        spots: [
          { name: { zh: '南澳大桥', en: 'Nanao Bridge' }, time: '09:00-10:00', desc: { zh: '跨海大桥壮丽景色', en: 'Magnificent cross-sea bridge views' } },
          { name: { zh: '青澳湾', en: 'Qingao Bay' }, time: '10:30-16:00', desc: { zh: '清澈海水，金色沙滩', en: 'Crystal clear water, golden beach' } },
        ],
      },
      {
        day: 4,
        title: { zh: '返程·满载而归', en: 'Departure · Full of Memories' },
        spots: [
          { name: { zh: '潮汕特产采购', en: 'Local Products Shopping' }, time: '09:00-11:00', desc: { zh: '牛肉丸、单丛茶等特产', en: 'Beef balls, Dancong tea, and more' } },
        ],
      },
    ],
    includes: {
      zh: ['专业导游全程陪同', '景点门票', '当地交通', '3晚四星酒店住宿', '每日早餐', '牛肉火锅盛宴'],
      en: ['Professional guide throughout', 'Attraction tickets', 'Local transportation', '3 nights 4-star hotel', 'Daily breakfast', 'Beef hotpot feast'],
    },
    excludes: {
      zh: ['往返大交通', '个人消费', '部分餐食'],
      en: ['Round-trip transportation', 'Personal expenses', 'Some meals'],
    },
  },
}

export type RouteId = keyof typeof routeData
