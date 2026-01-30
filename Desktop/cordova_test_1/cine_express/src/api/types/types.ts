export type ShowImage = {
  medium?: string | null;
  original?: string | null;
};

export type ShowRating = {
  average?: number | null;
};

export type Show = {
  id: number;
  name: string;
  image?: ShowImage | null;
  rating?: ShowRating | null;
  genres?: string[] | null;
};

export type SearchResult = {
  show: Show;
};