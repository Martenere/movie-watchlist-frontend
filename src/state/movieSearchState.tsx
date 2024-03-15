import { atom } from "jotai";

export interface searchInputProps {
  title: string;
  page: number;
  year: number | null;
}
export const initialSearchProp: searchInputProps = {
  title: "",
  page: 1,
  year: null,
};

export const searchInputAtom = atom(initialSearchProp);

export const movieSearchResultAtom = atom(async (get) => {
  const url = convertSearchPropToTmdbUrl(get(searchInputAtom));
  console.log(url);
  return searchTMDB(url);
});

async function searchTMDB(url: string) {
  // Example query url: "https://api.themoviedb.org/3/search/movie?query=star%20wars&include_adult=false&language=en-US&page=1";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDVmOTk5ZDhjZTgyMTFkN2M2ZDQzMWNlNjcwYzI1MCIsInN1YiI6IjY1ZWViMGI3ZjVjYjIxMDE0ODQ0ZDFlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.73F7Db20Mau02rhJayIOKbmeaYlBdy74nKWW8M86ZrM",
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
    return data.results;
  } catch (err) {
    console.error("error:" + err);
  }
}
function convertSearchPropToTmdbUrl(searchProps: searchInputProps) {
  const baseUrl = "https://api.themoviedb.org/3/search/movie";
  const encodedMovieTitle = encodeURIComponent(searchProps.title);
  const url = `${baseUrl}?query=${encodedMovieTitle}&include_adult=false&language=en-US&page=${searchProps.page}`;
  return url;
}
