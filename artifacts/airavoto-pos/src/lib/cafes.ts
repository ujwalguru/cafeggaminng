export type GameCategory = 'PC' | 'Console' | 'VR' | 'Mobile';
export type Amenity =
  | 'High-Speed WiFi'
  | 'AC'
  | 'Full Food Menu'
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
  priceVisible?: boolean;
}

export interface CafeHappyHour {
  category: string;
  startTime: string;
  endTime: string;
  enabled: boolean;
}

export interface CafeHappyHourPricing {
  category: string;
  duration: number;
  price: number;
  personCount: number;
  priceVisible?: boolean;
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
  priceVisible?: boolean;
  isOpen: boolean;
  openUntil: string;
  /** Short hours string shown on cards, e.g. "10:00–02:00" */
  hoursDisplay: string;
  image: string;
  gallery: string[];
  categories: GameCategory[];
  amenities: Amenity[];
  totalSeats: number;
  availableSeats: number;
  about: string;
  hours: { day: string; time: string }[];
  happyHours?: CafeHappyHour[];
  happyHourPricing?: CafeHappyHourPricing[];
  phone: string;
  maps: string;
  plans: CafePlan[];
  reviews: CafeReview[];
  games: string[];
  gameTags?: Array<{ name: string; platform: string }>;
  foodItems?: Array<{ name?: string; title?: string; itemName?: string; price?: number | string; category?: string }>;
  featured?: boolean;
}

export const cafes: Cafe[] = [
  // ── New featured cafes (matching screenshots) ──────────────────
  {
    id: '9',
    slug: 'hyperframe-gaming-bangalore',
    name: 'HyperFrame Gaming',
    tagline: 'Bengaluru\'s Highest-Rated Gaming Lounge',
    city: 'Bangalore',
    area: 'Koramangala',
    address: '12, 80 Feet Rd, Koramangala 4th Block, Bengaluru – 560034',
    rating: 4.9,
    reviewCount: 287,
    pricePerHour: 50,
    isOpen: true,
    openUntil: '2:00 AM',
    hoursDisplay: '09:00–02:00',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Console', 'VR'],
    amenities: ['AC', 'High-Speed WiFi', 'Full Food Menu', 'Tournaments', 'Private Rooms', 'Live Streaming Setup'],
    totalSeats: 60,
    availableSeats: 14,
    about: 'HyperFrame Gaming is Bengaluru\'s top-rated esports lounge with 60 ultra-high-performance PCs, a full food menu, and dedicated VR pods. Competitive tournaments run every weekend with cash prizes.',
    hours: [
      { day: 'Mon – Thu', time: '9:00 AM – 2:00 AM' },
      { day: 'Fri – Sun', time: '9:00 AM – 3:00 AM' },
    ],
    phone: '+91 80400 91234',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 50 },
      { name: 'Gamer Pack', duration: '3 hrs', price: 130, highlight: true },
      { name: 'All-Day Pass', duration: '8 hrs', price: 320 },
      { name: 'Monthly Unlimited', duration: '30 days', price: 2199 },
    ],
    reviews: [
      { author: 'Rahul V.', avatar: 'R', rating: 5, comment: 'Best café in Bangalore hands down. RTX 4090 machines, zero lag, and the food is actually good!', date: 'Jul 2026' },
      { author: 'Sneha K.', avatar: 'S', rating: 5, comment: 'The VR section blew my mind. Tournament every Friday night.', date: 'Jun 2026' },
    ],
    games: ['Valorant', 'CS2', 'Warzone', 'GTA V', 'FIFA 25', 'God of War', 'Beat Saber', 'Fortnite'],
    featured: true,
  },
  {
    id: '10',
    slug: 'arena-pro-gaming-mumbai',
    name: 'Arena Pro Gaming',
    tagline: 'Mumbai\'s Premier Esports Arena',
    city: 'Mumbai',
    area: 'Andheri West',
    address: '17, Andheri Industrial Estate, Andheri West, Mumbai – 400058',
    rating: 4.8,
    reviewCount: 341,
    pricePerHour: 60,
    isOpen: true,
    openUntil: '2:00 AM',
    hoursDisplay: '10:00–02:00',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Console'],
    amenities: ['AC', 'High-Speed WiFi', 'Food Menu', 'Cold Drinks', 'Tournaments', 'Private Rooms'],
    totalSeats: 40,
    availableSeats: 9,
    about: 'Arena Pro Gaming is Mumbai\'s dedicated competitive gaming hub. Forty tournament-spec PCs, PS5 consoles, and private booths for squad play. Daily ranked lobbies and monthly open tournaments with prizes.',
    hours: [
      { day: 'Mon – Fri', time: '10:00 AM – 2:00 AM' },
      { day: 'Sat – Sun', time: '9:00 AM – 3:00 AM' },
    ],
    phone: '+91 98200 91234',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 60 },
      { name: 'Arena Pack', duration: '3 hrs', price: 155, highlight: true },
      { name: 'Day Pass', duration: '8 hrs', price: 380 },
      { name: 'Monthly Unlimited', duration: '30 days', price: 2499 },
    ],
    reviews: [
      { author: 'Aryan P.', avatar: 'A', rating: 5, comment: 'Tournament-grade setup. The private rooms for squad games are a game-changer.', date: 'Jul 2026' },
      { author: 'Priya N.', avatar: 'P', rating: 5, comment: '240Hz monitors, fastest internet I\'ve seen in any café. Worth every rupee.', date: 'May 2026' },
    ],
    games: ['Valorant', 'CS2', 'BGMI', 'Apex Legends', 'FIFA 25', 'Tekken 8', 'Fortnite'],
    featured: true,
  },
  {
    id: '11',
    slug: 'neonbit-cyber-cafe-delhi',
    name: 'NeonBit Cyber Cafe',
    tagline: 'Connaught Place\'s Iconic Gaming Spot',
    city: 'Delhi',
    area: 'Connaught Place',
    address: 'Block A, Connaught Place, New Delhi – 110001',
    rating: 4.7,
    reviewCount: 198,
    pricePerHour: 40,
    isOpen: true,
    openUntil: '11:00 PM',
    hoursDisplay: '10:00–23:00',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Mobile'],
    amenities: ['AC', 'High-Speed WiFi', 'Snack Bar', 'Cold Drinks', 'Tournaments'],
    totalSeats: 35,
    availableSeats: 11,
    about: 'NeonBit is Delhi\'s original gaming café, now fully modernised. Affordable rates, consistently fast internet, and central location in Connaught Place make it the default choice for gamers across the NCR.',
    hours: [
      { day: 'Mon – Sun', time: '10:00 AM – 11:00 PM' },
    ],
    phone: '+91 98110 91234',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 40 },
      { name: 'CP Pack', duration: '3 hrs', price: 100, highlight: true },
      { name: 'Day Pass', duration: '8 hrs', price: 260 },
    ],
    reviews: [
      { author: 'Vikram S.', avatar: 'V', rating: 5, comment: 'Best value in CP. Fast WiFi, good PCs, friendly staff.', date: 'Jul 2026' },
    ],
    games: ['BGMI', 'Free Fire', 'CS2', 'GTA V', 'Clash Royale', 'Minecraft'],
    featured: true,
  },
  {
    id: '12',
    slug: 'overload-gaming-hyderabad',
    name: 'Overload Gaming',
    tagline: 'Hyderabad\'s Premier High-FPS Lounge',
    city: 'Hyderabad',
    area: 'Banjara Hills',
    address: 'Road No. 12, Banjara Hills, Hyderabad – 500034',
    rating: 4.6,
    reviewCount: 163,
    pricePerHour: 55,
    isOpen: true,
    openUntil: '12:00 AM',
    hoursDisplay: '10:00–00:00',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Console', 'VR'],
    amenities: ['AC', 'High-Speed WiFi', 'Food Menu', 'Private Rooms', 'Tournaments'],
    totalSeats: 38,
    availableSeats: 7,
    about: 'Overload Gaming brings Hyderabad a premium FPS-focused lounge with RTX 4080 PCs, high-refresh monitors, and a VR bay. Weekly Valorant and CS2 tournaments attract the city\'s top competitive players.',
    hours: [
      { day: 'Mon – Thu', time: '10:00 AM – 12:00 AM' },
      { day: 'Fri – Sun', time: '10:00 AM – 2:00 AM' },
    ],
    phone: '+91 94400 91234',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 55 },
      { name: 'Overload Pack', duration: '3 hrs', price: 140, highlight: true },
      { name: 'Day Pass', duration: '8 hrs', price: 350 },
    ],
    reviews: [
      { author: 'Kiran B.', avatar: 'K', rating: 5, comment: 'RTX 4080 on every seat. The VR section is something else.', date: 'Jun 2026' },
    ],
    games: ['Valorant', 'CS2', 'Apex Legends', 'Warzone', 'FIFA 25', 'Beat Saber'],
    featured: true,
  },

  // ── Original cafes ─────────────────────────────────────────────
  {
    id: '1',
    slug: 'neon-arena-mumbai',
    name: 'Neon Arena',
    tagline: 'Mumbai\'s Largest Esports Lounge',
    city: 'Mumbai',
    area: 'Andheri West',
    address: '42, Veera Desai Road, Andheri West, Mumbai – 400053',
    rating: 4.8,
    reviewCount: 312,
    pricePerHour: 60,
    isOpen: true,
    openUntil: '12:00 AM',
    hoursDisplay: '10:00–00:00',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Console', 'VR'],
    amenities: ['AC', 'High-Speed WiFi', 'Food Menu', 'Cold Drinks', 'Premium Headsets', 'Private Rooms', 'Tournaments', 'Live Streaming Setup'],
    totalSeats: 45,
    availableSeats: 12,
    about: 'Neon Arena is Mumbai\'s largest dedicated esports lounge — 45 high-end gaming rigs, a PS5 console zone, and India\'s first in-cafe VR arena.',
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
      { author: 'Priya S.', avatar: 'P', rating: 5, comment: 'The VR section is insane! Staff is super helpful.', date: 'Jun 2026' },
    ],
    games: ['Valorant', 'CS2', 'GTA V', 'Warzone', 'FIFA 25', 'God of War', 'Beat Saber'],
    featured: true,
  },
  {
    id: '2',
    slug: 'pixel-den-bangalore',
    name: 'Pixel Den',
    tagline: 'Bengaluru\'s Chill Gaming Hangout',
    city: 'Bangalore',
    area: 'Koramangala',
    address: 'No. 7, 80 Feet Rd, Koramangala, Bengaluru – 560034',
    rating: 4.6,
    reviewCount: 218,
    pricePerHour: 50,
    isOpen: true,
    openUntil: '11:00 PM',
    hoursDisplay: '11:00–23:00',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Console'],
    amenities: ['AC', 'High-Speed WiFi', 'Food Menu', 'Cold Drinks', 'Premium Headsets', 'Tournaments', 'Snack Bar'],
    totalSeats: 30,
    availableSeats: 8,
    about: 'Pixel Den in Koramangala is the go-to spot for Bengaluru\'s gaming community with 30 high-performance PCs and PS5/Xbox.',
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
    ],
    reviews: [
      { author: 'Kavya T.', avatar: 'K', rating: 5, comment: 'Love the vibe here.', date: 'Jul 2026' },
    ],
    games: ['Valorant', 'CS2', 'BGMI', 'FIFA 25', 'Tekken 8', 'Minecraft'],
    featured: false,
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
    hoursDisplay: '24 hrs',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'Console', 'Mobile'],
    amenities: ['AC', 'High-Speed WiFi', 'Cold Drinks', 'Premium Headsets', '24/7 Open', 'Parking', 'Snack Bar'],
    totalSeats: 38,
    availableSeats: 15,
    about: 'Hyper Hub never sleeps. Open 24/7, Delhi\'s home for late-night grinders and weekend warriors.',
    hours: [{ day: 'Every Day', time: '24 Hours' }],
    phone: '+91 98110 33456',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 45 },
      { name: 'Night Pack', duration: '4 hrs', price: 150, highlight: true },
      { name: 'Day Pass', duration: '12 hrs', price: 350 },
    ],
    reviews: [
      { author: 'Sahil R.', avatar: 'S', rating: 5, comment: 'Only place open at 3 AM! Lifesaver.', date: 'Jul 2026' },
    ],
    games: ['BGMI', 'Free Fire', 'CS2', 'FIFA 25', 'Fortnite', 'GTA V'],
    featured: false,
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
    hoursDisplay: '10:00–23:00',
    image: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=900&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&q=80&auto=format&fit=crop',
    ],
    categories: ['PC', 'VR'],
    amenities: ['AC', 'High-Speed WiFi', 'Food Menu', 'Cold Drinks', 'Premium Headsets', 'Private Rooms', 'Live Streaming Setup'],
    totalSeats: 28,
    availableSeats: 0,
    about: 'Circuit Breaker is HITEC City\'s slickest gaming lounge with RTX 4080 PCs and a VR pod lineup.',
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
      { author: 'Vikram N.', avatar: 'V', rating: 5, comment: 'RTX 4080 machines are butter smooth.', date: 'Jun 2026' },
    ],
    games: ['Valorant', 'CS2', 'Apex Legends', 'Warzone', 'Beat Saber'],
    featured: false,
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
    hoursDisplay: '12:00–22:00',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80&auto=format&fit=crop',
    gallery: [],
    categories: ['PC', 'Console'],
    amenities: ['AC', 'High-Speed WiFi', 'Cold Drinks', 'Snack Bar', 'Premium Headsets'],
    totalSeats: 20,
    availableSeats: 6,
    about: 'Respawn Zone is Pune\'s most welcoming gaming café — budget-friendly with 20 PCs and PS5/Switch.',
    hours: [
      { day: 'Mon – Fri', time: '12:00 PM – 10:00 PM' },
      { day: 'Sat – Sun', time: '10:00 AM – 11:00 PM' },
    ],
    phone: '+91 95000 55678',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 40 },
      { name: 'Student Pack', duration: '3 hrs', price: 100, highlight: true },
    ],
    reviews: [
      { author: 'Omkar D.', avatar: 'O', rating: 4, comment: 'Super affordable and good machines.', date: 'Jul 2026' },
    ],
    games: ['FIFA 25', 'Tekken 8', 'CS2', 'BGMI', 'Minecraft'],
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
    hoursDisplay: '11:00–23:00',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900&q=80&auto=format&fit=crop',
    gallery: [],
    categories: ['PC', 'VR', 'Console'],
    amenities: ['AC', 'High-Speed WiFi', 'Food Menu', 'Cold Drinks', 'Premium Headsets', 'Tournaments', 'Private Rooms'],
    totalSeats: 32,
    availableSeats: 9,
    about: 'LaserZone Gaming brings Chennai a full esports experience with tournament-grade PCs and a VR room.',
    hours: [
      { day: 'Mon – Fri', time: '11:00 AM – 11:00 PM' },
      { day: 'Sat – Sun', time: '10:00 AM – 12:00 AM' },
    ],
    phone: '+91 98400 66789',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 50 },
      { name: 'Combo Pack', duration: '3 hrs', price: 130, highlight: true },
    ],
    reviews: [
      { author: 'Karthik S.', avatar: 'K', rating: 5, comment: 'Tournament vibe is real. Cash prizes every month!', date: 'Jun 2026' },
    ],
    games: ['Valorant', 'CS2', 'FIFA 25', 'Beat Saber', 'God of War', 'Apex Legends'],
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
    hoursDisplay: '12:00–22:00',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&auto=format&fit=crop',
    gallery: [],
    categories: ['PC', 'Mobile'],
    amenities: ['AC', 'High-Speed WiFi', 'Snack Bar', 'Cold Drinks', 'Premium Headsets'],
    totalSeats: 22,
    availableSeats: 10,
    about: 'Bit Lounge blends Kolkata café culture with a serious gaming setup at unbeatable rates.',
    hours: [
      { day: 'Mon – Fri', time: '12:00 PM – 10:00 PM' },
      { day: 'Sat – Sun', time: '11:00 AM – 11:00 PM' },
    ],
    phone: '+91 98300 77890',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 35 },
      { name: 'Gamer Pack', duration: '3 hrs', price: 90, highlight: true },
    ],
    reviews: [
      { author: 'Saikat G.', avatar: 'S', rating: 4, comment: 'Good value for Salt Lake.', date: 'Jun 2026' },
    ],
    games: ['BGMI', 'Free Fire', 'CS2', 'Minecraft', 'Clash Royale'],
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
    hoursDisplay: '11:00–23:00',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
    gallery: [],
    categories: ['PC', 'Console'],
    amenities: ['AC', 'High-Speed WiFi', 'Food Menu', 'Cold Drinks', 'Tournaments', 'Private Rooms', 'Parking'],
    totalSeats: 25,
    availableSeats: 0,
    about: 'Overclocked quickly became Jaipur\'s most talked-about gaming spot with private rooms and weekend tournaments.',
    hours: [
      { day: 'Mon – Fri', time: '11:00 AM – 11:00 PM' },
      { day: 'Sat – Sun', time: '10:00 AM – 1:00 AM' },
    ],
    phone: '+91 98290 88901',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 40 },
      { name: 'Warrior Pack', duration: '3 hrs', price: 105, highlight: true },
    ],
    reviews: [
      { author: 'Harshit M.', avatar: 'H', rating: 5, comment: 'Best gaming café in Jaipur!', date: 'Jul 2026' },
    ],
    games: ['Valorant', 'CS2', 'FIFA 25', 'Tekken 8', 'GTA V'],
    featured: false,
  },
  {
    id: '13',
    slug: 'pixel-forge-ahmedabad',
    name: 'Pixel Forge',
    tagline: 'Ahmedabad\'s Premier Gaming Arena',
    city: 'Ahmedabad',
    area: 'SG Road',
    address: 'Shop 5, Commerce House, SG Road, Ahmedabad – 380054',
    rating: 4.3,
    reviewCount: 54,
    pricePerHour: 35,
    isOpen: false,
    openUntil: 'Opens 11 AM',
    hoursDisplay: '11:00–22:00',
    image: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=900&q=80&auto=format&fit=crop',
    gallery: [],
    categories: ['PC', 'Console'],
    amenities: ['AC', 'High-Speed WiFi', 'Cold Drinks', 'Snack Bar'],
    totalSeats: 18,
    availableSeats: 0,
    about: 'Pixel Forge is Ahmedabad\'s first dedicated gaming arena, bringing high-performance PCs and consoles to Gujarat\'s gaming community.',
    hours: [
      { day: 'Mon – Fri', time: '11:00 AM – 10:00 PM' },
      { day: 'Sat – Sun', time: '10:00 AM – 11:00 PM' },
    ],
    phone: '+91 97140 00123',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 35 },
      { name: 'Student Pack', duration: '3 hrs', price: 90, highlight: true },
    ],
    reviews: [
      { author: 'Dhruv S.', avatar: 'D', rating: 4, comment: 'Finally a proper gaming café in Ahmedabad!', date: 'Jun 2026' },
    ],
    games: ['CS2', 'FIFA 25', 'BGMI', 'Free Fire'],
    featured: false,
  },
  {
    id: '14',
    slug: 'framelabs-pune',
    name: 'FrameLabs',
    tagline: 'Pune\'s Premium High-Refresh Gaming Hub',
    city: 'Pune',
    area: 'Baner',
    address: 'Baner-Pashan Link Rd, Pune – 411021',
    rating: 4.5,
    reviewCount: 112,
    pricePerHour: 50,
    isOpen: true,
    openUntil: '11:00 PM',
    hoursDisplay: '10:00–23:00',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&q=80&auto=format&fit=crop',
    gallery: [],
    categories: ['PC', 'VR'],
    amenities: ['AC', 'High-Speed WiFi', 'Food Menu', 'Private Rooms', 'Tournaments'],
    totalSeats: 28,
    availableSeats: 5,
    about: 'FrameLabs brings high-refresh-rate competitive gaming to Pune\'s Baner tech corridor.',
    hours: [
      { day: 'Mon – Sun', time: '10:00 AM – 11:00 PM' },
    ],
    phone: '+91 95000 12345',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 50 },
      { name: 'Power Pack', duration: '3 hrs', price: 130, highlight: true },
    ],
    reviews: [
      { author: 'Tejas R.', avatar: 'T', rating: 5, comment: 'Best monitors in Pune. Clean and well-maintained.', date: 'May 2026' },
    ],
    games: ['Valorant', 'CS2', 'Apex Legends', 'Beat Saber', 'Warzone'],
    featured: false,
  },
  {
    id: '15',
    slug: 'cyberspace-chennai',
    name: 'Cyberspace Gaming',
    tagline: 'Chennai\'s Budget Gaming Favourite',
    city: 'Chennai',
    area: 'T. Nagar',
    address: '28, Usman Rd, T. Nagar, Chennai – 600017',
    rating: 4.2,
    reviewCount: 79,
    pricePerHour: 35,
    isOpen: true,
    openUntil: '10:00 PM',
    hoursDisplay: '10:00–22:00',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=900&q=80&auto=format&fit=crop',
    gallery: [],
    categories: ['PC', 'Mobile'],
    amenities: ['AC', 'High-Speed WiFi', 'Cold Drinks', 'Snack Bar'],
    totalSeats: 20,
    availableSeats: 8,
    about: 'Cyberspace Gaming is T. Nagar\'s budget pick for students and casual gamers.',
    hours: [
      { day: 'Mon – Sun', time: '10:00 AM – 10:00 PM' },
    ],
    phone: '+91 98400 23456',
    maps: 'https://maps.google.com',
    plans: [
      { name: 'Quick Session', duration: '1 hr', price: 35 },
      { name: 'Student Pack', duration: '3 hrs', price: 90, highlight: true },
    ],
    reviews: [
      { author: 'Arun M.', avatar: 'A', rating: 4, comment: 'Best bang for buck in T. Nagar.', date: 'Jul 2026' },
    ],
    games: ['BGMI', 'Free Fire', 'CS2', 'Minecraft'],
    featured: false,
  },
];

export const CITIES = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur'];
export const CATEGORIES: GameCategory[] = ['PC', 'Console', 'VR', 'Mobile'];

export function getCafeCountByCity(): Record<string, number> {
  return cafes.reduce((acc, c) => {
    acc[c.city] = (acc[c.city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

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

export function getTopRated(n = 6): Cafe[] {
  return [...cafes].sort((a, b) => b.rating - a.rating).slice(0, n);
}
