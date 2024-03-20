import { atom } from "jotai";
import { BASE_URL } from "../../utils/globalVariables";

const watchlistUrlAtom = atom(BASE_URL + "/watchlists");

export interface WatchlistData {
  id: string | number;
  user: string;
  userId: number;
  name: string;
  description: string;
  movies: number[];
}

export interface ApiWatchlistData {
  id: string | number;
  user: string;
  userId: number;
  name: string;
  description: string;
  movieIDs: number[];
}

const translateData = (ApiData: ApiWatchlistData): WatchlistData => {
  return {
    id: ApiData.id,
    user: ApiData.user,
    userId: ApiData.userId,
    name: ApiData.name,
    description: ApiData.description,
    movies: ApiData.movieIDs,
  };
};

export const watchlistsFromApiAtom = atom(async (get) => {
  console.log("wathclistFromApiAtom");
  get(watchlistRefetchAtom);
  const getResult = await getWatchlistDataFromApi(get(watchlistUrlAtom));
  console.log("Get result", getResult);
  return getResult;
});

export const watchlistRefetchAtom = atom(0);
export const triggerWatchlistsRefetchAtom = atom(null, (get, set) => {
  const count = get(watchlistRefetchAtom);
  set(watchlistRefetchAtom, count + 1);
});

async function getWatchlistDataFromApi(url: string) {
  try {
    const res = await fetch(url);
    const returnData = await res.json();
    console.log("Return data", returnData);
    const data = returnData.map(translateData);
    console.log("Data", data);
    return data;
  } catch (error) {
    return [];
    //console.log("Error when fetching watchlist: ", error);
  }
}
