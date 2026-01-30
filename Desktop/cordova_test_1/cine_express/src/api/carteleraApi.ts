import { http } from "./http";
import type { SearchResult } from "./types/types";

export async function searchShows(query: string) {
  const res = await http.get<SearchResult[]>("/search/shows", {
    params: { q: query },
  });

  return res.data;
}