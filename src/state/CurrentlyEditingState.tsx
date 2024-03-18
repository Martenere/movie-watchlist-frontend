import { atom } from "jotai";
import { watchlistData } from "./watchlistsState";

const initWatchlistData: watchlistData = {
  id: -1,
  user: "",
  userId: -1,
  name: "",
  description: "",

  movies: [],
};
export const currentWatchlistEdit = atom<watchlistData>(initWatchlistData);
