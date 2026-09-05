import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { Link } from 'wouter';
import {
  MapPin, Star, Users, Clock, Phone, ArrowLeft, CheckCircle2, Wifi,
  Wind, UtensilsCrossed, Headphones, Zap, Trophy, Shield, Monitor,
  ChevronRight, ExternalLink, MessageCircle, Gamepad2, X
} from 'lucide-react';
import { CafeCard } from '@/components/site/CafeCard';
import type { Cafe } from '@/lib/cafes';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { useDocumentMeta } from '@/hooks/use-document-meta';
import NotFound from '@/pages/not-found';
import { DEFAULT_CAFE_IMAGE, fetchLiveCafe, getLiveDevice, liveSnapshotToCafe, type LiveCafeSnapshot } from '@/lib/live-cafes';

// ── Station helpers ────────────────────────────────────────────────────────────
type StationType = string;
interface Station { id: number; label: string; available: boolean; occupiedUntil: string | null }

function stationKey(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function formatOccupiedUntil(value: string | null) {
  if (!value) return 'Occupied now';
  const date = new Date(value);
  if (!Number.isNaN(date.getTime()) && /[T-]/.test(value)) {
    return `Until ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  }
  const text = value.replace(/^until\s+/i, '').trim();
  return text ? `Until ${text}` : 'Occupied now';
}

function formatHour(value: string) {
  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?$/);
  if (!match) return value;
  const hour = Number(match[1]);
  const minute = match[2] ?? '00';
  if (hour > 23) return value;
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${suffix}`;
}

function formatDuration(minutes: number) {
  if (!Number.isFinite(minutes) || minutes <= 0) return 'Session';
  if (minutes % 60 === 0) {
    const hours = minutes / 60;
    return `${hours} hr${hours === 1 ? '' : 's'}`;
  }
  return `${minutes} min`;
}

function expandOpeningHours(rows: Array<{ day: string; time: string }>) {
  if (rows.length !== 1) return rows;
  const row = rows[0];
  const match = row.time.match(/^(.+?):\s*(.+?)\s*\|\s*Sunday:\s*(.+)$/i);
  if (match) {
    const days = match[1].split(',').map((day) => day.trim()).filter(Boolean);
    return [...days.map((day) => ({ day, time: match[2] })), { day: 'Sunday', time: match[3] }];
  }
  if (/every\s*day|everyday/i.test(row.day)) {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => ({ day, time: row.time }));
  }
  return rows;
}

const STEAM_APP_IDS: Record<string, string> = {
  'cs2': '730', 'counter-strike 2': '730', 'gta v': '271590', 'grand theft auto v': '271590',
  'apex legends': '1172470', 'tekken 8': '1778820', 'god of war': '1593500', 'beat saber': '620980',
  'warzone': '1962663', 'call of duty: warzone': '1962663', 'rocket league': '252950', 'forza horizon 5': '1551360',
  'elden ring': '1245620', 'pubg': '578080', 'pubg: battlegrounds': '578080', 'dota 2': '570',
  'overwatch 2': '2357570', 'cyberpunk 2077': '1091500', 'resident evil 4': '2050650', 'spider-man 2': '2651280',
  'marvels spider-man 2': '2651280', 'marvel’s spider-man 2': '2651280', 'marvels spider man 2': '2651280',
  'half-life: alyx': '546560', 'half life alyx': '546560', 'superhot vr': '617830', 'job simulator': '448280',
  'pavlov vr': '555160', 'blade & sorcery': '629730', 'blade and sorcery': '629730',
  'the walking dead: saints & sinners': '916840', 'the walking dead saints and sinners': '916840',
  'moss': '846470', 'arizona sunshine': '342180', 'population: one': '691260', 'population one': '691260',
  'among us vr': '1849900',   'boneworks': '823500', 'bonelab': '1592190', 'phasmophobia vr': '739630',
  'the witcher 3': '292030', 'hogwarts legacy': '990080', 'monster hunter wilds': '2246340',
  'monster hunter: world': '582010', 'dark souls iii': '374320', 'sekiro: shadows die twice': '814380',
  'baldur\'s gate 3': '1086940', 'divinity: original sin 2': '435150', 'the elder scrolls v: skyrim': '489830',
  'fallout 4': '377160', 'terraria': '105600', 'stardew valley': '413150', 'hades': '1145360',
  'hades ii': '1145350', 'palworld': '1623730', 'sons of the forest': '1326470', 'rust': '252490',
  'dayz': '221100', 'project zomboid': '108600', 'ark: survival evolved': '346110', '7 days to die': '251570',
  'dead by daylight': '381210', 'left 4 dead 2': '550', 'world war z': '699130', 'world war 3': '674940', 'payday 2': '218620',
  'rainbow six siege': '359550', 'tom clancy\'s rainbow six siege': '359550', 'the finals': '2073850',
  'destiny 2': '1085660', 'halo infinite': '1240440', 'battlefield 2042': '1517290', 'battlefield v': '1238810',
  'pubg mobile': '578080', 'fall guys': '1097150', 'among us': '945360',
  'gang beasts': '285900', 'human fall flat': '477160', 'cuphead': '268910', 'it takes two': '1426210',
  'a way out': '1222700', 'overcooked! 2': '728880', 'phasmophobia': '739630', 'content warning': '2881650',
  'lies of p': '1627720', 'black myth: wukong': '2358720', 'dragon ball: sparking! zero': '1790600',
  'street fighter 6': '1364780', 'tekken 7': '389730', 'mortal kombat 11': '976310', 'mortal kombat 1': '1971870',
  'guilty gear -strive-': '1384160', 'the king of fighters xv': '1498570', 'wwe 2k24': '2315690',
  'ea sports fc 25': '2669320', 'fifa 23': '1811260', 'efootball 2025': '1665460', 'nba 2k25': '2878980',
  'assetto corsa': '244210', 'beamng.drive': '284160', 'dirt rally 2.0': '690790', 'the crew motorfest': '2698940',
  'need for speed heat': '1222680', 'trackmania': '2225070', 'wreckfest': '228380', 'carx drift racing online': '635260',
  'league of legends': '20590', 'smite 2': '2437170', 'deadlock': '1422450',
  'teamfight tactics': '1298060', 'marvel rivals': '2767030', 'paladins': '444090', 'splitgate 2': '2003260',
  'garena free fire': '1234567', 'minecraft': '1672970', 'roblox': '431960', 'osu!': '578080',
};

const LOCAL_GAME_ARTWORK: Record<string, string> = {
  valorant: '/valorant-game-art.png',
};

function steamPosterUrl(name: string) {
  const normalizedName = name.trim().toLowerCase();
  if (LOCAL_GAME_ARTWORK[normalizedName]) return LOCAL_GAME_ARTWORK[normalizedName];
  const id = STEAM_APP_IDS[normalizedName];
  return id ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/library_600x900_2x.jpg` : null;
}

function fallbackPosterUrl(name: string) {
  const safeName = name.trim().slice(0, 42).replace(/[&<>]/g, '');
  const hue = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="hsl(${hue} 65% 28%)"/><stop offset="1" stop-color="#0b0b12"/></linearGradient></defs><rect width="600" height="900" fill="url(#g)"/><circle cx="470" cy="160" r="180" fill="rgba(255,255,255,.10)"/><path d="M80 710h440" stroke="rgba(255,255,255,.24)" stroke-width="3"/><text x="80" y="770" fill="#fff" font-family="Arial,sans-serif" font-size="38" font-weight="700">${safeName}</text><text x="80" y="820" fill="rgba(255,255,255,.65)" font-family="Arial,sans-serif" font-size="18" letter-spacing="4">AIRAVOTO GAME</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const SINGLE_PLAYER_GAMES = new Set(['god of war', 'gta v', 'the witcher 3', 'elden ring', 'resident evil 4', 'cyberpunk 2077', 'hogwarts legacy', 'spider-man 2']);

function GameArtwork({ name }: { name: string }) {
  const [imageUrl, setImageUrl] = useState(steamPosterUrl(name));
  const [fallbackTried, setFallbackTried] = useState(false);
  useEffect(() => {
    if (imageUrl || fallbackTried) return;
    setFallbackTried(true);
    const controller = new AbortController();
    fetch(`https://airavotoheadcli.onrender.com/api/directory/game-image?name=${encodeURIComponent(name)}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => data?.url ? setImageUrl(String(data.url)) : fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(`${name} video game`)}&gsrnamespace=0&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=300&format=json&origin=*`, { signal: controller.signal }).then((response) => response.json()).then((wikiData) => {
        const page = Object.values(wikiData?.query?.pages ?? {})[0] as { thumbnail?: { source?: string } } | undefined;
        setImageUrl(page?.thumbnail?.source || fallbackPosterUrl(name));
      }))
      .catch(() => setImageUrl(fallbackPosterUrl(name)));
    return () => controller.abort();
  }, [name, imageUrl, fallbackTried]);
  const resolvedImageUrl = imageUrl || fallbackPosterUrl(name);
  return <img src={resolvedImageUrl} alt={`${name} game artwork`} loading="lazy" className="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-110" onError={() => { setImageUrl(fallbackPosterUrl(name)); }} />;
}

function sameCategory(left: string, right: string) {
  const normalizedLeft = left.trim().toLowerCase();
  const normalizedRight = right.trim().toLowerCase();
  return normalizedLeft === normalizedRight || normalizedLeft === 'all gaming' || normalizedRight === 'all gaming';
}

function dedupeStations(stations: Station[]) {
  const merged = new Map<string, Station>();
  for (const station of stations) {
    const key = stationKey(station.label) || `station${station.id}`;
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, station);
      continue;
    }

    // If duplicate records exist, keep the occupied record because it is the safer live state.
    if (existing.available && !station.available) {
      merged.set(key, station);
    } else if (!existing.occupiedUntil && station.occupiedUntil) {
      merged.set(key, { ...existing, occupiedUntil: station.occupiedUntil });
    }
  }
  return Array.from(merged.values()).sort((a, b) => {
    const aNumber = Number(a.label.match(/\d+/)?.[0] ?? a.id);
    const bNumber = Number(b.label.match(/\d+/)?.[0] ?? b.id);
    return aNumber - bNumber || a.label.localeCompare(b.label);
  });
}

function buildStations(type: StationType, total: number, avail: number, seed: number): Station[] {
  const indices = Array.from({ length: total }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = (seed * (i + 7) * 31 + 17) % (i + 1);
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const freeSet = new Set(indices.slice(0, avail));
  const times = ['12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '4:00', '5:30', '6:00', '7:00'];
  return Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    label: `${type} ${i + 1}`,
    available: freeSet.has(i),
    occupiedUntil: freeSet.has(i) ? null : times[(seed + i * 3) % times.length] + ' PM',
  }));
}

const amenityIconMap: Record<string, React.ElementType> = {
  'High-Speed WiFi': Wifi,
  'AC': Wind,
  'Food Menu': UtensilsCrossed,
  'Full Food Menu': UtensilsCrossed,
  'Snack Bar': UtensilsCrossed,
  'Cold Drinks': UtensilsCrossed,
  'Premium Headsets': Headphones,
  'Private Rooms': Shield,
  'Tournaments': Trophy,
  'Live Streaming Setup': Monitor,
  '24/7 Open': Clock,
  'Webcam': Monitor,
  'Parking': CheckCircle2,
};

function StarRow({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const s = size === 'lg' ? 'size-5' : 'size-3.5';
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${s} ${i <= Math.round(rating) ? 'fill-[oklch(0.80_0.14_60)] text-[oklch(0.80_0.14_60)]' : 'fill-muted text-muted'}`}
        />
      ))}
    </span>
  );
}

export default function CafeDetail() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const [stationModal, setStationModal] = useState<StationType | null>(null);
  const [liveSnapshot, setLiveSnapshot] = useState<LiveCafeSnapshot | null>(null);
  const [liveError, setLiveError] = useState(false);
  const [liveLoading, setLiveLoading] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [gameTab, setGameTab] = useState('PC');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!slug) {
        if (!cancelled) setLiveLoading(false);
        return;
      }
      if (!cancelled) setLiveLoading(true);
      try {
        const snapshot = await fetchLiveCafe(slug);
        if (!cancelled) {
          setLiveSnapshot(snapshot);
          setLiveError(false);
        }
      } catch {
        if (!cancelled) setLiveError(true);
      } finally {
        if (!cancelled) setLiveLoading(false);
      }
    };
    load();
    const interval = window.setInterval(load, 15_000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [slug]);

  const cafe = liveSnapshot ? liveSnapshotToCafe(liveSnapshot) : undefined;
  const displayFoodItems = cafe?.foodItems?.length
    ? cafe.foodItems
    : ((liveSnapshot?.metadata?.foodItems ?? liveSnapshot?.metadata?.food_items ?? []) as Array<{ name?: string; title?: string; itemName?: string; price?: number | string; category?: string }>);
  const hasConsole = cafe?.categories.includes('Console') ?? false;
  const livePc = getLiveDevice(liveSnapshot, 'PC');
  const livePs5 = getLiveDevice(liveSnapshot, 'PS5');
  const otherLiveDevices = liveSnapshot?.devices.filter((device) => device.type !== 'PC' && device.type !== 'PS5') ?? [];
  const pcTotal    = livePc?.total ?? (hasConsole ? Math.round((cafe?.totalSeats ?? 0) * 0.65) : (cafe?.totalSeats ?? 0));
  const ps5Total   = livePs5?.total ?? (hasConsole ? (cafe?.totalSeats ?? 0) - pcTotal : 0);
  const pcAvail    = livePc?.available ?? (hasConsole ? Math.round((cafe?.availableSeats ?? 0) * 0.65) : (cafe?.availableSeats ?? 0));
  const ps5Avail   = livePs5?.available ?? (hasConsole ? Math.max(0, (cafe?.availableSeats ?? 0) - pcAvail) : 0);
  const seed       = parseInt(cafe?.id ?? '1', 10) || 1;
  const pcStations  = livePc?.seats.length ? dedupeStations(livePc.seats.map((seat, index) => ({ id: index + 1, label: seat.label, available: seat.available, occupiedUntil: seat.occupiedUntil ?? null }))) : buildStations('PC', pcTotal, pcAvail, seed);
  const ps5Stations = livePs5?.seats.length ? dedupeStations(livePs5.seats.map((seat, index) => ({ id: index + 1, label: seat.label, available: seat.available, occupiedUntil: seat.occupiedUntil ?? null }))) : buildStations('PS5', ps5Total, ps5Avail, seed + 50);
  const selectedDevice = stationModal ? liveSnapshot?.devices.find((device) => device.type === stationModal) : null;
  const modalStations = stationModal === 'PC'
    ? pcStations
    : stationModal === 'PS5'
      ? ps5Stations
      : (selectedDevice?.seats ?? []).map((seat, index) => ({ id: index + 1, label: seat.label, available: seat.available, occupiedUntil: seat.occupiedUntil ?? null }));
  const modalAvail = stationModal === 'PC' ? pcAvail : stationModal === 'PS5' ? ps5Avail : (selectedDevice?.available ?? 0);
  const modalTotal = stationModal === 'PC' ? pcTotal : stationModal === 'PS5' ? ps5Total : (selectedDevice?.total ?? 0);
  const isLive = liveSnapshot?.status === 'online' && !liveSnapshot.is_stale;
  const happyHours = cafe?.happyHours ?? [];
  const happyHourPricing = cafe?.happyHourPricing ?? [];
  const hasHappyHourData = happyHours.length > 0 || happyHourPricing.length > 0;
  const openingHours = expandOpeningHours(cafe?.hours ?? []);
  const allGames = cafe?.gameTags?.length ? cafe.gameTags : (cafe?.games ?? []).map((name) => ({ name, platform: 'PC' }));
  const preferredCategoryOrder = ['PC', 'PC Gaming', 'PS5', 'Console Gaming', 'Single Player', 'Multiplayer'];
  const detectedGameCategories = Array.from(new Set(allGames.map((game) => game.platform.trim()).filter(Boolean))).sort((left, right) => {
    const leftIndex = preferredCategoryOrder.findIndex((item) => left.toLowerCase().includes(item.toLowerCase()));
    const rightIndex = preferredCategoryOrder.findIndex((item) => right.toLowerCase().includes(item.toLowerCase()));
    return (leftIndex < 0 ? 100 : leftIndex) - (rightIndex < 0 ? 100 : rightIndex) || left.localeCompare(right);
  });
  const gameCategories = detectedGameCategories.length ? detectedGameCategories : ['All'];
  const activeGameTab = gameCategories.includes(gameTab) ? gameTab : (gameCategories[0] || 'All');
  const filteredGames = activeGameTab === 'All' ? allGames : allGames.filter((game) => {
    const platform = game.platform.toLowerCase();
    const selected = activeGameTab.toLowerCase();
    return platform === selected || platform.includes(selected) || (selected.includes('pc') && platform === 'game') || (selected.includes('single') && SINGLE_PLAYER_GAMES.has(game.name.toLowerCase()));
  });
  const gamesForTab = filteredGames.length ? filteredGames : allGames;

  useDocumentMeta({
    title: cafe ? `${cafe.name} — ${cafe.area}, ${cafe.city} | Airavoto Cafe` : 'Café Not Found',
    description: cafe?.tagline ?? '',
    image: cafe?.image,
  });

  if (!cafe && liveLoading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <section className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-5 py-24 text-center">
          <div>
            <div className="mx-auto mb-5 size-8 animate-spin rounded-full border-2 border-border border-t-foreground" />
            <h1 className="text-2xl font-bold">Loading café availability</h1>
            <p className="mt-2 text-sm text-muted-foreground">Connecting to the live Airavoto café server…</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!cafe) return <NotFound />;

  const related: Cafe[] = [];

  // ── Reusable sub-components ────────────────────────────────────────────────
  const StationBoxes = () => (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Live availability</p>
        <span className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide ${isLive ? 'text-[oklch(0.72_0.18_150)]' : 'text-muted-foreground'}`}>
          <span className={`size-1.5 rounded-full ${isLive ? 'bg-[oklch(0.72_0.18_150)] animate-pulse' : 'bg-muted-foreground'}`} />
          {isLive ? 'Updated live' : liveError ? 'Live data unavailable' : 'Waiting for POS'}
        </span>
      </div>
      <div className={`grid gap-3 ${hasConsole || otherLiveDevices.length > 0 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      <button
        onClick={() => setStationModal('PC')}
        className="group rounded-2xl border border-border/60 bg-card p-4 text-left transition-all hover:border-[oklch(0.55_0.18_265/0.6)] hover:bg-[oklch(0.18_0.04_265/0.4)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[oklch(0.22_0.06_265/0.5)] text-[oklch(0.75_0.14_265)]">
            <Monitor className="size-4" />
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-wide ${pcAvail > 0 ? 'text-[oklch(0.72_0.18_150)]' : 'text-[oklch(0.60_0.14_25)]'}`}>
            {pcAvail > 0 ? 'Available' : 'Full'}
          </span>
        </div>
        <p className="text-xs font-semibold text-muted-foreground">PC</p>
        <p className="mt-0.5 text-2xl font-extrabold text-foreground">
          {pcAvail}<span className="text-sm font-normal text-muted-foreground">/{pcTotal}</span>
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
          <div className="h-full rounded-full transition-all" style={{ width: `${(pcAvail / pcTotal) * 100}%`, background: pcAvail > 3 ? 'oklch(0.72 0.18 150)' : pcAvail > 0 ? 'oklch(0.72 0.18 60)' : 'oklch(0.60 0.18 25)' }} />
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground group-hover:text-foreground">Tap to see stations →</p>
      </button>

      {hasConsole && (
        <button
          onClick={() => setStationModal('PS5')}
          className="group rounded-2xl border border-border/60 bg-card p-4 text-left transition-all hover:border-[oklch(0.55_0.18_265/0.6)] hover:bg-[oklch(0.18_0.04_265/0.4)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[oklch(0.22_0.06_265/0.5)] text-[oklch(0.75_0.14_265)]">
              <Gamepad2 className="size-4" />
            </span>
            <span className={`text-[10px] font-semibold uppercase tracking-wide ${ps5Avail > 0 ? 'text-[oklch(0.72_0.18_150)]' : 'text-[oklch(0.60_0.14_25)]'}`}>
              {ps5Avail > 0 ? 'Available' : 'Full'}
            </span>
          </div>
          <p className="text-xs font-semibold text-muted-foreground">PS5</p>
          <p className="mt-0.5 text-2xl font-extrabold text-foreground">
            {ps5Avail}<span className="text-sm font-normal text-muted-foreground">/{ps5Total}</span>
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
            <div className="h-full rounded-full transition-all" style={{ width: ps5Total > 0 ? `${(ps5Avail / ps5Total) * 100}%` : '0%', background: ps5Avail > 2 ? 'oklch(0.72 0.18 150)' : ps5Avail > 0 ? 'oklch(0.72 0.18 60)' : 'oklch(0.60 0.18 25)' }} />
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground group-hover:text-foreground">Tap to see stations →</p>
        </button>
      )}
      {otherLiveDevices.map((device) => (
        <button key={device.type} onClick={() => setStationModal(device.type)} className="group rounded-2xl border border-border/60 bg-card p-4 text-left transition-all hover:border-[oklch(0.55_0.18_265/0.6)] hover:bg-[oklch(0.18_0.04_265/0.4)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[oklch(0.22_0.06_265/0.5)] text-[oklch(0.75_0.14_265)]">
              <Headphones className="size-4" />
            </span>
            <span className={`text-[10px] font-semibold uppercase tracking-wide ${device.available > 0 ? 'text-[oklch(0.72_0.18_150)]' : 'text-[oklch(0.60_0.14_25)]'}`}>
              {device.available > 0 ? 'Available' : 'Full'}
            </span>
          </div>
          <p className="text-xs font-semibold text-muted-foreground">{device.type}</p>
          <p className="mt-0.5 text-2xl font-extrabold text-foreground">
            {device.available}<span className="text-sm font-normal text-muted-foreground">/{device.total}</span>
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
            <div className="h-full rounded-full transition-all" style={{ width: device.total > 0 ? `${(device.available / device.total) * 100}%` : '0%', background: device.available > 0 ? 'oklch(0.72 0.18 150)' : 'oklch(0.60 0.18 25)' }} />
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground group-hover:text-foreground">Tap to see stations →</p>
        </button>
      ))}
      </div>
    </div>
  );

  const LocationCard = () => (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <h3 className="mb-3 text-sm font-bold">Location</h3>
      <div className="mb-3 overflow-hidden rounded-xl border border-border/40">
        <iframe
          title="Map"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(cafe.address)}&output=embed&z=15`}
          width="100%"
          height="160"
          style={{ border: 0, display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{cafe.address}</p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[oklch(0.72_0.12_265)] transition-opacity hover:opacity-80"
      >
        Open in Google Maps <ExternalLink className="size-3" />
      </a>
    </div>
  );

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground lg:pb-0">
      {/* Navbar — hidden on mobile */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="relative h-56 w-full overflow-hidden sm:h-80 lg:h-96">
        <img src={cafe.image} alt={cafe.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = DEFAULT_CAFE_IMAGE; }} className="h-full w-full object-cover shadow-[0_14px_40px_oklch(0_0_0/0.45)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.14_0_0/0.4)] via-transparent to-[oklch(0.14_0_0/0.92)]" />
        {/* Back button — stays at the top on both mobile and desktop */}
        <Link
          href="/cafes"
          className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 lg:size-auto lg:gap-1.5 lg:border lg:px-4 lg:py-2 lg:text-sm lg:font-medium"
        >
          <ArrowLeft className="size-4" />
          <span className="hidden lg:inline">All Cafes</span>
        </Link>

        {/* Café identity overlay — same styling, repositioned inside hero */}
        <div className="absolute inset-x-4 bottom-12 z-10 sm:inset-x-5 sm:bottom-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">{cafe.name}</h1>
              <p className="mt-0.5 text-xs text-white/75 sm:text-sm">{cafe.tagline}</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-white/75 sm:mt-3 sm:text-sm">
                <MapPin className="size-3.5 shrink-0" />
                <span className="truncate">{cafe.address}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                {cafe.categories.map((cat) => (
                  <span key={cat} className="rounded-full border border-white/25 bg-black/30 px-2.5 py-0.5 text-[11px] font-medium text-white/85 backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs">
                    {cat} Gaming
                  </span>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2 text-white">
              <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm ${
                cafe.isOpen
                  ? 'bg-[oklch(0.20_0.06_150/0.8)] text-[oklch(0.78_0.18_150)]'
                  : 'bg-[oklch(0.20_0.06_25/0.8)] text-[oklch(0.72_0.18_25)]'
              }`}>
                <span className={`size-1.5 rounded-full ${cafe.isOpen ? 'bg-[oklch(0.72_0.18_150)]' : 'bg-[oklch(0.60_0.18_25)]'}`} />
                {cafe.isOpen ? `Open · ${cafe.openUntil}` : cafe.openUntil}
              </span>
              <div className="flex items-center gap-1.5">
                <StarRow rating={cafe.rating} size="lg" />
                <span className="text-base font-bold sm:text-xl">{cafe.rating}</span>
                <span className="text-xs text-white/70 sm:text-sm">({cafe.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking marquee — across the bottom edge of the hero */}
        <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-y border-primary/30 bg-primary/10 py-2.5 text-primary" role="note">
          <div className="booking-marquee-track flex items-center gap-10 whitespace-nowrap px-4 text-xs font-extrabold uppercase tracking-wide sm:text-sm">
            <span className="flex items-center gap-2"><Phone className="size-4" /> To book a seat, please contact the gaming café owner by phone or WhatsApp.</span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-2"><MessageCircle className="size-4" /> To book a seat, please contact the gaming café owner by phone or WhatsApp.</span>
            <span aria-hidden="true">•</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-5">
        {/* ── Main layout ───────────────────────────────────────── */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* ── Left content ────────────────────────────────────── */}
          <div className="min-w-0 flex-1 space-y-8 sm:space-y-10">

            {/* About */}
            <section>
              <h2 className="mb-2 text-base font-bold sm:mb-3 sm:text-lg">About {cafe.name}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{cafe.about}</p>
            </section>

            {/* Station boxes — mobile only */}
            <section className="lg:hidden">
              <h2 className="mb-3 text-base font-bold">Station Availability</h2>
              <StationBoxes />
            </section>

            {/* Games */}
            <section>
              <div className="mb-3 flex items-end justify-between gap-3 sm:mb-4"><div><h2 className="text-base font-bold sm:text-lg">Games Available</h2><p className="mt-1 text-xs text-muted-foreground">Choose your next session</p></div><span className="rounded-full border border-border/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{cafe.games.length} titles</span></div>
              <div className="relative mb-4">
                <div className="flex gap-2 overflow-x-auto rounded-2xl border border-border/60 bg-muted/20 p-1.5 pr-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {gameCategories.map((tab) => <button key={tab} type="button" onClick={() => setGameTab(tab)} className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all ${activeGameTab === tab ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>{tab}</button>)}
                </div>
                <div className="pointer-events-none absolute right-0 top-0 h-full w-12 rounded-r-2xl bg-gradient-to-l from-background via-background/70 to-transparent" />
              </div>
              <div className="relative">
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 pr-10 [scrollbar-color:theme(colors.primary.DEFAULT)_transparent]">
                {gamesForTab.map((game) => (
                  <div
                    key={`${game.platform}-${game.name}`}
                    className="group relative flex min-h-[76px] min-w-[220px] snap-start items-center gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card px-3 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md sm:min-w-[260px] sm:px-4"
                  >
                    <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/30 bg-primary/10 text-primary shadow-inner sm:size-16"><Gamepad2 className="size-6" /><GameArtwork name={game.name} /></div>
                    <div className="min-w-0"><div className="truncate text-sm font-bold text-foreground sm:text-base">{game.name}</div><div className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground"><Gamepad2 className="size-3" />{game.platform}</div></div>
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute right-0 top-0 h-full w-14 rounded-r-2xl bg-gradient-to-l from-background via-background/75 to-transparent" />
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">Amenities</h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {cafe.amenities.map((amenity) => {
                  const Icon = amenityIconMap[amenity] ?? CheckCircle2;
                  return (
                    <div key={amenity} className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[oklch(0.22_0.06_265/0.4)] text-[oklch(0.78_0.12_265)] sm:size-8">
                        <Icon className="size-3.5 sm:size-4" />
                      </span>
                      <span className="text-[11px] font-medium text-foreground sm:text-xs">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Food menu from the café's live POS configuration */}
            {displayFoodItems.length > 0 && (
              <section className="border-y border-border/60 py-6 sm:py-8">
                <h2 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">Food Menu</h2>
                <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                  {displayFoodItems.map((item, index) => (
                    <div key={`${item.name || item.title || item.itemName || 'item'}-${index}`} className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card px-4 py-3 shadow-[0_4px_16px_oklch(0_0_0/0.18)]">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-foreground">{item.name || item.title || item.itemName || 'Menu item'}</div>
                      </div>
                      {item.price !== undefined && item.price !== null && <span className="shrink-0 text-sm font-bold text-[oklch(0.78_0.12_265)]">₹{item.price}</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {cafe.gallery.length > 1 && (
              <section>
                <h2 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">Gallery</h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                  {cafe.gallery.map((src, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border/60">
                      <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Pricing */}
            <section>
              <h2 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">Pricing Plans</h2>
              {cafe.priceVisible === false && <p className="mb-3 text-xs text-muted-foreground">Price hidden. Please contact the café for the current rate.</p>}
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                {cafe.plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative flex items-center justify-between rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4 ${
                      plan.highlight
                        ? 'border-[oklch(0.45_0.08_265/0.7)] bg-[oklch(0.20_0.06_265/0.4)]'
                        : 'border-border/60 bg-card'
                    }`}
                  >
                    {plan.highlight && (
                      <span className="absolute -top-2.5 left-4 rounded-full bg-[oklch(0.55_0.12_265)] px-3 py-0.5 text-[10px] font-bold text-white">
                        Best Value
                      </span>
                    )}
                    <div>
                      <div className="text-sm font-bold text-foreground">{plan.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{plan.duration}</div>
                    </div>
                    <span className={`text-xl font-extrabold text-foreground ${plan.priceVisible === false ? 'blur-[5px] select-none' : ''}`}>₹{plan.priceVisible === false ? 0 : plan.price}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Happy-hour pricing */}
            {hasHappyHourData && (
              <section>
                <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
                  <div>
                    <h2 className="text-base font-bold sm:text-lg">Happy-hour pricing</h2>
                    <p className="mt-1 text-xs text-muted-foreground">Special rates configured by this café.</p>
                    {happyHourPricing.some((plan) => plan.priceVisible === false) && <p className="mt-1 text-xs text-muted-foreground">Price hidden. Please contact the café for the current rate.</p>}
                  </div>
                  <Clock className="mt-0.5 size-5 shrink-0 text-[oklch(0.80_0.14_60)]" />
                </div>
                {happyHours.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {happyHours.map((happyHour) => (
                      <span
                        key={`${happyHour.category}-${happyHour.startTime}-${happyHour.endTime}`}
                        className="rounded-full border border-[oklch(0.45_0.12_60/0.55)] bg-[oklch(0.24_0.08_60/0.3)] px-3 py-1.5 text-xs font-medium text-[oklch(0.88_0.13_60)]"
                      >
                        {happyHour.category}: {formatHour(happyHour.startTime)}–{formatHour(happyHour.endTime)}
                      </span>
                    ))}
                  </div>
                )}
                {happyHourPricing.length > 0 ? (
                  <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                    {happyHourPricing.map((plan) => {
                      const schedule = happyHours.find((happyHour) => sameCategory(happyHour.category, plan.category));
                      return (
                        <div key={`${plan.category}-${plan.duration}-${plan.personCount}`} className="flex items-center justify-between rounded-2xl border border-[oklch(0.45_0.12_60/0.45)] bg-[oklch(0.20_0.07_60/0.2)] px-4 py-3.5 sm:px-5 sm:py-4">
                          <div>
                            <div className="text-sm font-bold text-foreground">{plan.category}</div>
                            <div className="mt-0.5 text-xs text-muted-foreground">
                              {formatDuration(plan.duration)}{plan.personCount > 1 ? ` · ${plan.personCount} players` : ''}
                            </div>
                            {schedule && (
                              <div className="mt-1 text-[11px] text-[oklch(0.80_0.13_60)]">
                                {formatHour(schedule.startTime)}–{formatHour(schedule.endTime)}
                              </div>
                            )}
                          </div>
                          <span className={`text-xl font-extrabold text-foreground ${plan.priceVisible === false ? 'blur-[5px] select-none' : ''}`}>₹{plan.priceVisible === false ? 0 : plan.price}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm text-muted-foreground">
                    Happy-hour times are available; ask the café for the current rate.
                  </div>
                )}
              </section>
            )}

            {/* Hours */}
            <section>
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[oklch(0.78_0.16_60/0.14)] text-[oklch(0.84_0.15_60)]"><Clock className="size-4" /></div>
                <div><h2 className="text-base font-bold sm:text-lg">Opening Hours</h2><p className="text-xs text-muted-foreground">Plan your next gaming session</p></div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-[0_12px_35px_oklch(0.12_0.04_280/0.18)]">
                {openingHours.length > 0 ? openingHours.map(({ day, time }, i) => (
                  <div
                    key={day}
                    className={`group flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-primary/5 sm:px-5 sm:py-3.5 ${i !== 0 ? 'border-t border-border/40' : ''}`}
                  >
                    <span className="flex items-center gap-2.5 font-medium text-foreground"><span className="size-1.5 rounded-full bg-[oklch(0.78_0.16_60)] opacity-70 transition-opacity group-hover:opacity-100" />{day}</span>
                    <span className="rounded-full bg-muted/60 px-3 py-1 text-right text-xs font-semibold text-foreground sm:text-sm">{time}</span>
                  </div>
                )) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground sm:px-5 sm:py-3.5">Hours not available</div>
                )}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
                <h2 className="text-base font-bold sm:text-lg">Reviews</h2>
                <button onClick={() => { setRatingSubmitted(false); setSelectedRating(0); setRatingOpen(true); }} className="rounded-full border border-[oklch(0.45_0.12_60/0.6)] bg-[oklch(0.24_0.08_60/0.25)] px-3 py-1.5 text-xs font-semibold text-[oklch(0.88_0.13_60)] transition-colors hover:bg-[oklch(0.28_0.10_60/0.4)]">
                  Rate this café · 5★
                </button>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {cafe.reviews.map((rev) => (
                  <div key={rev.author} className="rounded-2xl border border-border/60 bg-card p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[oklch(0.28_0.06_265)] text-sm font-bold text-[oklch(0.82_0.14_265)] sm:size-9">
                        {rev.avatar}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="text-sm font-semibold">{rev.author}</span>
                          <span className="text-xs text-muted-foreground">{rev.date}</span>
                        </div>
                        <StarRow rating={rev.rating} />
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{rev.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Location — mobile only */}
            <section className="lg:hidden">
              <h2 className="mb-3 text-base font-bold">Location</h2>
              <LocationCard />
            </section>
          </div>

          {/* ── Right sidebar — desktop only ─────────────────────── */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-5">
              <StationBoxes />

              {/* Price + CTA */}
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <p className="text-xs text-muted-foreground">Starting from</p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className={`text-3xl font-extrabold text-foreground ${cafe.priceVisible === false ? 'blur-[5px] select-none' : ''}`}>₹{cafe.priceVisible === false ? 0 : cafe.pricePerHour}</span>
                  <span className="text-sm text-muted-foreground">/ hour</span>
                </div>
                <div className="mt-4 space-y-2">
                  <a
                    href={`tel:${cafe.phone}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Phone className="size-4" /> Call to Book
                  </a>
                  <a
                    href={`https://wa.me/${cafe.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <MessageCircle className="size-4" /> WhatsApp
                  </a>
                </div>
              </div>

              <LocationCard />
            </div>
          </aside>
        </div>

        {/* ── Related cafes ─────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <div className="mb-5 flex items-center justify-between sm:mb-6">
              <h2 className="text-lg font-bold sm:text-xl">More Cafes You May Like</h2>
              <Link href="/cafes" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                View all <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-4 grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {related.map((c) => (
                <CafeCard key={c.id} cafe={c} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />

      {/* ── Mobile sticky booking bar ─────────────────────────── */}
      <nav className="fixed inset-x-0 bottom-0 z-[60] border-t border-border/60 bg-[oklch(0.08_0_0/0.98)] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_28px_oklch(0_0_0/0.35)] backdrop-blur-xl lg:hidden" aria-label="Café actions">
        <div className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2">
          <div className="min-w-0 text-center">
            <p className="text-[10px] font-medium text-muted-foreground">Starting price</p>
            <p className={`truncate text-base font-extrabold leading-tight text-foreground ${cafe.priceVisible === false ? 'blur-[5px] select-none' : ''}`}>₹{cafe.priceVisible === false ? 0 : cafe.pricePerHour}<span className="text-xs font-normal text-muted-foreground">/hr</span></p>
          </div>
          <a
            href={`tel:${cafe.phone}`}
            className="flex min-h-12 items-center justify-center gap-1 rounded-xl border border-border px-1.5 py-2.5 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="size-4" /> Phone
          </a>
          <a
            href={`https://wa.me/${cafe.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-1 rounded-xl bg-primary px-1.5 py-2.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-4" /> WhatsApp Contact
          </a>
        </div>
      </nav>

      {/* ── Station modal ─────────────────────────────────────── */}
      {stationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4 sm:px-5" onClick={() => setStationModal(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border/60 bg-[oklch(0.13_0.02_265)] p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-[oklch(0.22_0.06_265/0.5)] text-[oklch(0.75_0.14_265)]">
                  {stationModal === 'PC' ? <Monitor className="size-5" /> : stationModal === 'PS5' ? <Gamepad2 className="size-5" /> : <Headphones className="size-5" />}
                </span>
                <div>
                  <h3 className="font-bold">{stationModal} Stations</h3>
                  <p className="text-xs text-muted-foreground">{modalAvail} of {modalTotal} available right now</p>
                </div>
              </div>
              <button onClick={() => setStationModal(null)} className="flex size-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>

            <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[oklch(0.72_0.18_150)]" /> Available</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[oklch(0.55_0.16_25)]" /> Occupied</span>
            </div>

            <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
              {modalStations.map((s) => (
                <div
                  key={s.id}
                  className={`rounded-xl border p-3 text-center ${
                    s.available
                      ? 'border-[oklch(0.55_0.18_150/0.5)] bg-[oklch(0.18_0.06_150/0.25)]'
                      : 'border-[oklch(0.55_0.16_25/0.45)] bg-[oklch(0.18_0.04_25/0.22)]'
                  }`}
                >
                  <p className={`text-sm font-bold ${s.available ? 'text-[oklch(0.80_0.16_150)]' : 'text-foreground'}`}>{s.label}</p>
                  {s.available ? (
                    <p className="mt-1 text-[10px] font-medium text-[oklch(0.72_0.18_150)]">Available now</p>
                  ) : (
                    <p className="mt-1 text-[10px] font-medium leading-tight text-[oklch(0.78_0.14_25)]">{formatOccupiedUntil(s.occupiedUntil)}</p>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">Call the cafe to reserve a specific station</p>
          </div>
        </div>
      )}

      {ratingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setRatingOpen(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-sm rounded-3xl border border-border/60 bg-[oklch(0.13_0.02_265)] p-6 text-center shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setRatingOpen(false)} className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
            {ratingSubmitted ? (
              <>
                <div className="mb-3 text-4xl text-[oklch(0.84_0.15_60)]">{'★'.repeat(selectedRating)}<span className="text-muted-foreground/40">{'★'.repeat(5 - selectedRating)}</span></div>
                <h3 className="text-lg font-bold">Thanks for your rating</h3>
                <p className="mt-2 text-sm text-muted-foreground">Your {selectedRating}-star feedback was recorded.</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold">Rate {cafe.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">How was your experience?</p>
                <div className="mt-5 flex justify-center gap-1" role="radiogroup" aria-label="Choose a rating from one to five stars">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} onClick={() => setSelectedRating(rating)} className={`rounded-lg px-1 text-3xl transition-transform hover:scale-110 ${rating <= selectedRating ? 'text-[oklch(0.84_0.15_60)]' : 'text-muted-foreground/40'}`} aria-label={`${rating} star${rating === 1 ? '' : 's'}`} aria-pressed={selectedRating === rating}>★</button>
                  ))}
                </div>
                <button disabled={!selectedRating} onClick={() => setRatingSubmitted(true)} className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40">Submit rating</button>
                <p className="mt-2 text-xs text-muted-foreground">Choose 1–5 stars, then submit</p>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
