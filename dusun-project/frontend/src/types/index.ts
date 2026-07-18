export interface News {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image?: string | null;
  published_at?: string | null;
}

export interface GalleryItem {
  id: number;
  image_url: string;
  caption?: string | null;
  category?: string | null;
  created_at?: string | null;
}

export interface Video {
  id: number;
  title: string;
  youtube_id: string;
  description?: string | null;
}

export interface Statistik {
  id: number;
  key: string;
  label: string;
  value: string;
  unit?: string | null;
}

export interface PerangkatDesa {
  id: number;
  name: string;
  position: string;
  photo_url?: string | null;
  order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role_in_kkn?: string | null;
  photo_url?: string | null;
  dedication_message?: string | null;
  order: number;
}

export type TimelineType = "besar" | "individu";

export interface TimelineEntry {
  id: number;
  type: TimelineType;
  title: string;
  description?: string | null;
  date_or_period?: string | null;
  related_team_member_id?: number | null;
}

export interface LocationPoint {
  id: number;
  name: string;
  category: string;
  lat: string;
  lng: string;
  description?: string | null;
  icon?: string | null;
}
