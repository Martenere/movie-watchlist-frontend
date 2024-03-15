import { useAtom } from "jotai";
import { movieSearchResultAtom } from "../../../state/movieSearchState";
import { MovieCard, MovieCardProps } from "./MovieCard";
import { Grid, Space } from "@mantine/core";
import MoviePageSearchBar from "./MoviePageSearchBar/MoviePageSearchBar";

const api_movie_data_mock = {
  adult: false,
  backdrop_path: "/4qCqAdHcNKeAHcK8tJ8wNJZa9cx.jpg",
  genre_ids: [12, 28, 878],
  id: 11,
  original_language: "en",
  original_title: "Star Wars",
  overview:
    "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
  popularity: 137.764,
  poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  release_date: "1977-05-25",
  title: "Star Wars",
  video: false,
  vote_average: 8.205,
  vote_count: 19768,
};
export interface ApiMovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
function transformMovieData(data: ApiMovieData): MovieCardProps {
  return {
    image: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    title: data.title,
    description: data.overview,
    country: data.original_language.toUpperCase(),
    badges: [
      { emoji: "⭐", label: data.vote_average.toString() },
      {
        emoji: "📅",
        label: new Date(data.release_date).getFullYear().toString(),
      },
    ],
  };
}

export default function MovieSearchPage() {
  const [tmdbSearchResults, setTmdbSearchResulst] = useAtom(
    movieSearchResultAtom
  );
  const hasSearchResults =
    Array.isArray(tmdbSearchResults) && tmdbSearchResults.length > 0;

  let movieCardData: MovieCardProps[] = [];
  if (Array.isArray(tmdbSearchResults)) {
    movieCardData = tmdbSearchResults.map((d: ApiMovieData) =>
      transformMovieData(d)
    );
  }

  return (
    <>
      <Space h="md" />
      <MoviePageSearchBar />
      <Space h="xl" />
      {!hasSearchResults && (
        <div className="flex grow  justify-center items-center h-full">
          <p className="text-6xl text-center">Begin typing to find movies</p>
        </div>
      )}
      {hasSearchResults && (
        <Grid>
          {movieCardData.map((props: MovieCardProps) => (
            <Grid.Col span={3}>
              <MovieCard {...props} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </>
  );
}
