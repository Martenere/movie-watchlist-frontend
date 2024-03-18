import { Space } from "@mantine/core";
import MoviePageSearchBar from "./MoviePageSearchBar/MoviePageSearchBar";
import { Suspense } from "react";
import MovieCardList from "./MovieCardList";

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

export default function MovieSearchPage() {
  return (
    <>
      <Space h="md" />
      <MoviePageSearchBar />
      <Space h="xl" />

      <Suspense fallback={<p>Loading movies...</p>}>
        <MovieCardList />
      </Suspense>
    </>
  );
}
