export type GameCategory = 'PC' | 'Console' | 'VR' | 'Mobile';
export type Amenity =
  | 'High-Speed WiFi'
  | 'AC'
  | 'Food Menu'
  | 'Cold Drinks'
  | 'Premium Headsets'
  | 'Webcam'
  | 'Parking'
  | 'Private Rooms'
  | 'Tournaments'
  | '24/7 Open'
  | 'Snack Bar'
  | 'Live Streaming Setup';

export interface CafePlan {
  name: string;
  duration: string;
  price: number;
  highlight?: boolean;
}

export interface CafeReview {
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Cafe {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  city: string;
  area: string;
  address: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  isOpen: boolean;
  openUntil: string;
  image: string;
  gallery: string[];
  categories: GameCategory[];
  amenities: Amenity[];
  totalSeats: number;
  availableSeats: number;
  about: string;
  hours: { day: string; time: string }[];
  phone: string;
  maps: string;
  plans: CafePlan[];
  reviews: CafeReview[];
  featured?: boolean;
}

export const cafes: Cafe[] = [
  {
    id: '1',
    slug: 'neon-arena-mumbai',
    name: 'Neon Arena',
    tagline: 'Mumbai\'s Premier Esports & Gaming Lounge',
    city: 'Mumbai',
    area: 'Andheri West',
    address: '42, Veera Desai Road, Andheri West, Mumbai – 400053',
    rating: 4.8,
    reviewCount: 312,
    pricePerHour: 60,
    isOpen: true,
    openUntil: '12:00 AM',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Console', 'VR'],
    amenities: ['High-Speed WiFi', 'AC', 'Food Menu', 'Cold Drinks', 'Premium Headsets', 'Private Rooms', 'Tournaments', 'Live Streaming Setup'],
    totalSeats: 45,
    availableSeats: 12,
    about:
      'Neon Arena is Mumbai\'s largest dedicated esports lounge — 45 high-end gaming rigs, a PlayStation 5 console zone, and India\'s first in-cafe VR arena. Every seat comes with a 240 Hz monitor, mechanical keyboard, and DPI-adjustable gaming mouse. The snack bar runs until closing, and our weekly Friday-night tournaments with prize pools draw squads from across the city.',
    hours: [
      { day: 'Mon – Thu', time: '10:00 AM – 12:00 AM' },
      { day: 'Fri – Sat', time: '10:00 AM – 2:00 AM' },
      { day: 'Sunday', time: '11:00 AM – 11:00 PM' },
    ],
    phone: '+91 98200 11234',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 60 },
      { name: 'Afternoon Pack', duration: '3 hrs', price: 150, highlight: true },
      { name: 'Day Pass', duration: '8 hrs', price: 350 },
      { name: 'Monthly Unlimited', duration: '30 days', price: 2499 },
    ],
    reviews: [
      { author: 'Rohan M.', avatar: 'R', rating: 5, comment: 'Best setup in the city. 240Hz monitors, mechanical keyboards — feels like a pro esports arena.', date: 'Jul 2026' },
      { author: 'Priya S.', avatar: 'P', rating: 5, comment: 'The VR section is insane! Staff is super helpful and the food is actually good.', date: 'Jun 2026' },
      { author: 'Arjun K.', avatar: 'A', rating: 4, comment: 'Great place for squad sessions. Wish the parking was a bit larger.', date: 'May 2026' },
    ],
    featured: true,
  },
  {
    id: '2',
    slug: 'pixel-den-bangalore',
    name: 'Pixel Den',
    tagline: 'Bengaluru\'s Chill Gaming Hangout',
    city: 'Bangalore',
    area: 'Koramangala',
    address: 'No. 7, 80 Feet Rd, Koramangala 4th Block, Bengaluru – 560034',
    rating: 4.6,
    reviewCount: 218,
    pricePerHour: 50,
    isOpen: true,
    openUntil: '11:00 PM',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Console'],
    amenities: ['High-Speed WiFi', 'AC', 'Food Menu', 'Cold Drinks', 'Premium Headsets', 'Tournaments', 'Snack Bar'],
    totalSeats: 30,
    availableSeats: 8,
    about:
      'Pixel Den in Koramangala is the go-to spot for Bengaluru\'s gaming community. Thirty high-performance PCs, a dedicated console corner with PS5 and Xbox Series X, and a menu of loaded burgers and iced coffee that rivals any standalone café. Regular community tournaments and a Discord-linked leaderboard keep the competition alive.',
    hours: [
      { day: 'Mon – Fri', time: '11:00 AM – 11:00 PM' },
      { day: 'Sat – Sun', time: '10:00 AM – 12:00 AM' },
    ],
    phone: '+91 80400 22345',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 50 },
      { name: 'Combo Pack', duration: '3 hrs', price: 130, highlight: true },
      { name: 'Day Pass', duration: '8 hrs', price: 300 },
      { name: 'Monthly Unlimited', duration: '30 days', price: 1999 },
    ],
    reviews: [
      { author: 'Kavya T.', avatar: 'K', rating: 5, comment: 'Love the vibe here. The burger + gaming combo is unbeatable.', date: 'Jul 2026' },
      { author: 'Dev P.', avatar: 'D', rating: 4, comment: 'Consistent performance on all PCs. Great for ranked sessions.', date: 'Jun 2026' },
    ],
    featured: true,
  },
  {
    id: '3',
    slug: 'hyper-hub-delhi',
    name: 'Hyper Hub',
    tagline: 'Delhi\'s 24/7 Gaming & Esports Centre',
    city: 'Delhi',
    area: 'Rajouri Garden',
    address: 'J-Block Market, Rajouri Garden, New Delhi – 110027',
    rating: 4.5,
    reviewCount: 189,
    pricePerHour: 45,
    isOpen: true,
    openUntil: '24/7',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Console', 'Mobile'],
    amenities: ['High-Speed WiFi', 'AC', 'Cold Drinks', 'Premium Headsets', '24/7 Open', 'Parking', 'Snack Bar'],
    totalSeats: 38,
    availableSeats: 15,
    about:
      'Hyper Hub never sleeps. Open round the clock every day of the year, it\'s Delhi\'s home for late-night grinders and weekend warriors alike. Thirty-eight gaming stations, a dedicated mobile gaming zone, and two private rooms for squad sessions make it the most versatile esports centre in the capital.',
    hours: [{ day: 'Every Day', time: '24 Hours' }],
    phone: '+91 98110 33456',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 45 },
      { name: 'Night Pack', duration: '4 hrs', price: 150, highlight: true },
      { name: 'Day Pass', duration: '12 hrs', price: 350 },
      { name: 'Monthly Unlimited', duration: '30 days', price: 1799 },
    ],
    reviews: [
      { author: 'Sahil R.', avatar: 'S', rating: 5, comment: 'Only place open at 3 AM! Lifesaver for night-owl gamers.', date: 'Jul 2026' },
      { author: 'Ananya B.', avatar: 'A', rating: 4, comment: 'Great value, the private rooms are a nice touch for squads.', date: 'May 2026' },
    ],
    featured: true,
  },
  {
    id: '4',
    slug: 'circuit-breaker-hyderabad',
    name: 'Circuit Breaker',
    tagline: 'Hyderabad\'s Premium Gaming Lounge',
    city: 'Hyderabad',
    area: 'Madhapur',
    address: '8-2-120, Road No. 2, HITEC City, Madhapur, Hyderabad – 500081',
    rating: 4.7,
    reviewCount: 145,
    pricePerHour: 55,
    isOpen: false,
    openUntil: 'Opens 10 AM',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'VR'],
    amenities: ['High-Speed WiFi', 'AC', 'Food Menu', 'Cold Drinks', 'Premium Headsets', 'Private Rooms', 'Live Streaming Setup'],
    totalSeats: 28,
    availableSeats: 0,
    about:
      'Circuit Breaker is HITEC City\'s slickest gaming lounge, designed for Hyderabad\'s thriving tech-worker gaming community. Each PC features an RTX 4080, and the VR pod lineup includes the latest headsets. Ideal for after-work squad sessions and weekend mini-tournaments.',
    hours: [
      { day: 'Mon – Fri', time: '10:00 AM – 11:00 PM' },
      { day: 'Sat – Sun', time: '9:00 AM – 1:00 AM' },
    ],
    phone: '+91 94400 44567',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 55 },
      { name: 'Power Pack', duration: '3 hrs', price: 140, highlight: true },
      { name: 'Day Pass', duration: '8 hrs', price: 330 },
    ],
    reviews: [
      { author: 'Vikram N.', avatar: 'V', rating: 5, comment: 'RTX 4080 machines are butter smooth. The VR section is a must-try.', date: 'Jun 2026' },
      { author: 'Shreya P.', avatar: 'S', rating: 4, comment: 'Great ambience and fast internet. Slightly pricey but worth it.', date: 'Apr 2026' },
    ],
    featured: true,
  },
  {
    id: '5',
    slug: 'respawn-zone-pune',
    name: 'Respawn Zone',
    tagline: 'Pune\'s Friendliest Gaming Café',
    city: 'Pune',
    area: 'Kothrud',
    address: 'Shop 3, Paud Rd, Kothrud, Pune – 411038',
    rating: 4.4,
    reviewCount: 97,
    pricePerHour: 40,
    isOpen: true,
    openUntil: '10:00 PM',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Console'],
    amenities: ['High-Speed WiFi', 'AC', 'Cold Drinks', 'Snack Bar', 'Premium Headsets'],
    totalSeats: 20,
    availableSeats: 6,
    about:
      'Respawn Zone is Pune\'s most welcoming gaming café — whether you\'re a pro or picking up a controller for the first time. Budget-friendly pricing, a well-maintained fleet of 20 PCs, and consoles including PS5 and Switch make it perfect for students and casual gamers.',
    hours: [
      { day: 'Mon – Fri', time: '12:00 PM – 10:00 PM' },
      { day: 'Sat – Sun', time: '10:00 AM – 11:00 PM' },
    ],
    phone: '+91 95000 55678',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 40 },
      { name: 'Student Pack', duration: '3 hrs', price: 100, highlight: true },
      { name: 'Weekend Day Pass', duration: '8 hrs', price: 270 },
    ],
    reviews: [
      { author: 'Omkar D.', avatar: 'O', rating: 4, comment: 'Super affordable and good machines. Best budget gaming spot in Pune.', date: 'Jul 2026' },
    ],
    featured: false,
  },
  {
    id: '6',
    slug: 'laserzone-chennai',
    name: 'LaserZone Gaming',
    tagline: 'Chennai\'s Esports & VR Destination',
    city: 'Chennai',
    area: 'Anna Nagar',
    address: 'Plot 9, 2nd Avenue, Anna Nagar, Chennai – 600040',
    rating: 4.5,
    reviewCount: 134,
    pricePerHour: 50,
    isOpen: true,
    openUntil: '11:00 PM',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'VR', 'Console'],
    amenities: ['High-Speed WiFi', 'AC', 'Food Menu', 'Cold Drinks', 'Premium Headsets', 'Tournaments', 'Private Rooms'],
    totalSeats: 32,
    availableSeats: 9,
    about:
      'LaserZone Gaming brings Chennai a full esports experience — tournament-grade PCs, a VR room with rotating titles, and private gaming booths for small squads. Monthly ranked ladders with cash prizes attract the city\'s top competitive players.',
    hours: [
      { day: 'Mon – Fri', time: '11:00 AM – 11:00 PM' },
      { day: 'Sat – Sun', time: '10:00 AM – 12:00 AM' },
    ],
    phone: '+91 98400 66789',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 50 },
      { name: 'Combo Pack', duration: '3 hrs', price: 130, highlight: true },
      { name: 'Day Pass', duration: '8 hrs', price: 310 },
      { name: 'Monthly Unlimited', duration: '30 days', price: 1999 },
    ],
    reviews: [
      { author: 'Karthik S.', avatar: 'K', rating: 5, comment: 'The tournament vibe here is real. Cash prizes every month!', date: 'Jun 2026' },
      { author: 'Meena R.', avatar: 'M', rating: 4, comment: 'Great for groups. The VR games selection is excellent.', date: 'May 2026' },
    ],
    featured: false,
  },
  {
    id: '7',
    slug: 'bit-lounge-kolkata',
    name: 'Bit Lounge',
    tagline: 'Kolkata\'s Cultural Gaming Café',
    city: 'Kolkata',
    area: 'Salt Lake',
    address: 'Sector V, Block EP, Salt Lake City, Kolkata – 700091',
    rating: 4.3,
    reviewCount: 88,
    pricePerHour: 35,
    isOpen: true,
    openUntil: '10:00 PM',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Mobile'],
    amenities: ['High-Speed WiFi', 'AC', 'Snack Bar', 'Cold Drinks', 'Premium Headsets'],
    totalSeats: 22,
    availableSeats: 10,
    about:
      'Bit Lounge blends the warmth of Kolkata\'s café culture with a serious gaming setup. Affordable per-hour rates, great tea and snacks, and a welcoming crew make it the ideal hangout for students from the Salt Lake tech campuses.',
    hours: [
      { day: 'Mon – Fri', time: '12:00 PM – 10:00 PM' },
      { day: 'Sat – Sun', time: '11:00 AM – 11:00 PM' },
    ],
    phone: '+91 98300 77890',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 35 },
      { name: 'Gamer Pack', duration: '3 hrs', price: 90, highlight: true },
      { name: 'Day Pass', duration: '8 hrs', price: 240 },
    ],
    reviews: [
      { author: 'Saikat G.', avatar: 'S', rating: 4, comment: 'Good value for Salt Lake. Comfortable seats and fast internet.', date: 'Jun 2026' },
    ],
    featured: false,
  },
  {
    id: '8',
    slug: 'overclocked-jaipur',
    name: 'Overclocked',
    tagline: 'Jaipur\'s Rising Esports Arena',
    city: 'Jaipur',
    area: 'Vaishali Nagar',
    address: 'A-12, Vaishali Nagar Main Road, Jaipur – 302021',
    rating: 4.6,
    reviewCount: 76,
    pricePerHour: 40,
    isOpen: false,
    openUntil: 'Opens 11 AM',
    image: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Console'],
    amenities: ['High-Speed WiFi', 'AC', 'Food Menu', 'Cold Drinks', 'Tournaments', 'Private Rooms', 'Parking'],
    totalSeats: 25,
    availableSeats: 0,
    about:
      'Overclocked has quickly become Jaipur\'s most talked-about gaming spot. Private rooms with dual-monitor setups, a spicy snack menu, and hosted weekend BGMI and Valorant tournaments with local prizes bring hundreds of players through the door every week.',
    hours: [
      { day: 'Mon – Fri', time: '11:00 AM – 11:00 PM' },
      { day: 'Sat – Sun', time: '10:00 AM – 1:00 AM' },
    ],
    phone: '+91 98290 88901',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 40 },
      { name: 'Warrior Pack', duration: '3 hrs', price: 105, highlight: true },
      { name: 'Day Pass', duration: '8 hrs', price: 280 },
    ],
    reviews: [
      { author: 'Harshit M.', avatar: 'H', rating: 5, comment: 'Best gaming café in Jaipur hands down. Tournament every weekend!', date: 'Jul 2026' },
      { author: 'Riya S.', avatar: 'R', rating: 4, comment: 'Private rooms are clean and well-equipped. Worth the price.', date: 'Jun 2026' },
    ],
    featured: false,
  },
];

export const CITIES = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Jaipur'];
export const CATEGORIES: GameCategory[] = ['PC', 'Console', 'VR', 'Mobile'];

export function searchCafes(query: string, city?: string, category?: GameCategory): Cafe[] {
  const q = query.toLowerCase().trim();
  return cafes.filter((c) => {
    const matchesQuery =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.area.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q);
    const matchesCity = !city || c.city === city;
    const matchesCategory = !category || c.categories.includes(category);
    return matchesQuery && matchesCity && matchesCategory;
  });
}

export function getCafeBySlug(slug: string): Cafe | undefined {
  return cafes.find((c) => c.slug === slug);
}

export function getFeaturedCafes(): Cafe[] {
  return cafes.filter((c) => c.featured);
}
