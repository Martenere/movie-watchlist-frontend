import { atom } from "jotai";

const watchlistUrlAtom = atom("http://localhost:3000/watchlists");

export const watchlistsFromApiAtom = atom(async (get) => {
  return getWatchlistDataFromApi(get(watchlistUrlAtom));
});

async function getWatchlistDataFromApi(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error when fetching watchlist: ", error);
  }
}
