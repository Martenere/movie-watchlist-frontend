import { Flex } from "@mantine/core";

import MovieCardFetcher from "./MovieCardFetcher";
import { Suspense } from "react";

export interface WatchlistItemProps {
  id: string | number;
  user: string;
  userId: number;
  name: string;
  description: string;

  movies: number[];
}

export default function WatchlistItem({
  // id,
  // user,
  // name,
  // description,
  movies,
}: WatchlistItemProps) {
  if (!movies) {
    return <p>no movies</p>;
  }

  return (
    <>
      <Flex
        mih={50}
        gap="xl"
        justify="start"
        align="flex-start"
        direction="row"
        wrap="wrap"
        className="max-w-7xl justify-self-center"
      >
        {movies.map((movieId) => (
          <Suspense key={movieId} fallback="Loading Movie...">
            <MovieCardFetcher id={movieId} />
          </Suspense>
        ))}
      </Flex>
    </>
  );
}
