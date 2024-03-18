import { Grid, Space, Text, Title } from "@mantine/core";
import React, { Suspense } from "react";
import { MovieCard } from "../pages/MovieSearchPage/MovieCard";
import { atom } from "jotai";
import MovieCardFetcher from "./MovieCardFetcher";

export interface WatchlistItemProps {
  id: string | number;
  userId: number;
  name: string;
  description: string;

  movies: number[];
}

export default function WatchlistItem({
  id,
  user,
  name,
  description,
  movies,
}: WatchlistItemProps) {
  const movieAtoms = movies.map((movieId) => atom(movieId));

  return (
    <div className="bg-gray-900 p-4 rounded-md">
      <Title className="text-gray-300" order={1}>
        {name}
      </Title>
      <Text className="text-gray-600">{description}</Text> <Space h="xl" />
      <Grid dir="col">
        {movieAtoms.map((MovieIdAtom) => (
          <Suspense fallback="Loading Movie...">
            <MovieCardFetcher MovieIdAtom={MovieIdAtom} />
          </Suspense>
        ))}
      </Grid>
      <Space h="xl" />
    </div>
  );
}
