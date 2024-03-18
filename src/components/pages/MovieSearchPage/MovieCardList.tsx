import { useAtom } from "jotai";

import { movieSearchResultAtom } from "../../../state/movieSearchState";
import { MovieCard, MovieCardProps } from "./MovieCard";
import { ApiMovieData } from "./MovieSearchPage";
import { Grid } from "@mantine/core";

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

export default function MovieCardList() {
  const [tmdbSearchResults, _setTmdbSearchResults] = useAtom(
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
      {!hasSearchResults && (
        <div className="flex grow  justify-center items-center h-full">
          <p className="text-6xl text-center">Begin typing to find movies</p>
        </div>
      )}
      <Grid>
        {movieCardData.map((props: MovieCardProps) => (
          <Grid.Col span={3}>
            <MovieCard {...props} />
          </Grid.Col>
        ))}
      </Grid>{" "}
    </>
  );
}
