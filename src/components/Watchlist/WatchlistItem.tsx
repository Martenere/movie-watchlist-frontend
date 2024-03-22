import { Center, Flex } from "@mantine/core";

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
      <Center>
        <Flex
          mih={50}
          gap="xl"
          justify="center"
          align="flex-start"
          direction="row"
          wrap="wrap"
          className="max-w-7xl"
        >
          {movies.map((movieId) => (
            <Suspense key={movieId} fallback="Loading Movie...">
              <MovieCardFetcher id={movieId} />
            </Suspense>
          ))}
        </Flex>
      </Center>
    </>
  );
}
