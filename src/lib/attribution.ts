const STORAGE_KEY = 'idm_attribution';

const TRACKED_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
] as const;

export interface Attribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  fbclid: string | null;
  gclid: string | null;
  referrer: string | null;
  landing_page: string | null;
}

type StoredAttribution = Partial<Record<(typeof TRACKED_PARAMS)[number] | 'referrer' | 'landing_page', string>>;

const readStorage = (): StoredAttribution => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

/**
 * Persists first-touch UTM/click-id params so attribution survives even if
 * the user browses the SPA before converting and the query string is lost.
 */
export const captureAttribution = (): void => {
  if (typeof window === 'undefined') return;

  const query = new URLSearchParams(window.location.search);
  const stored = readStorage();
  const next: StoredAttribution = { ...stored };

  for (const key of TRACKED_PARAMS) {
    const value = query.get(key);
    if (value) next[key] = value;
  }

  if (!next.landing_page) next.landing_page = window.location.href;
  if (!next.referrer) next.referrer = document.referrer || undefined;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage indisponível (modo privado, etc.) — segue sem persistir
  }
};

export const getAttribution = (): Attribution => {
  const query = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const stored = readStorage();

  const pick = (key: (typeof TRACKED_PARAMS)[number]) => query?.get(key) || stored[key] || null;

  return {
    utm_source: pick('utm_source'),
    utm_medium: pick('utm_medium'),
    utm_campaign: pick('utm_campaign'),
    utm_content: pick('utm_content'),
    utm_term: pick('utm_term'),
    fbclid: pick('fbclid'),
    gclid: pick('gclid'),
    referrer: stored.referrer || (typeof document !== 'undefined' ? document.referrer : null) || null,
    landing_page: stored.landing_page || (typeof window !== 'undefined' ? window.location.href : null),
  };
};

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};
