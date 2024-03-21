import { atom } from "jotai";
import { WatchlistData, watchlistsFromApiAtom } from "./watchlistsState";

const initWatchlistData: WatchlistData = {
  id: -1,
  user: "",
  userId: -1,
  name: "",
  description: "",

  movies: [],
};

export const currentWatchlistindexAtom = atom(0);

// Atom derived from WatchlistData from api and currentWatchlistindexAtom
// Outputs all the data of the related Watchlist
export const currentWatchlistEditDataAtom = atom(async (get) => {
  const watchlistApiData = await get(watchlistsFromApiAtom);
  const currentlyEditingWatchlistIndex = get(currentWatchlistindexAtom);
  const currentWatchlistEditingData = watchlistApiData.find(
    (watchlist: WatchlistData) =>
      watchlist.id === currentlyEditingWatchlistIndex
  );
  return currentWatchlistEditingData ?? initWatchlistData;
});
