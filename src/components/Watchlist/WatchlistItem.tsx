import { Flex, Grid, SimpleGrid, Space, Text, Title, rem } from "@mantine/core";

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
  id,
  user,
  name,
  description,
  movies,
}: WatchlistItemProps) {
  if (!movies) {
    return <p>no movies</p>;
  }

  return (
    <>
      <Flex
        mih={50}
        // bg="rgba(0, 0, 0, .3)"
        gap="xl"
        justify="space-between"
        align="flex-start"
        direction="row"
        wrap="wrap"
        className="max-w-7xl"
      >
        {/* <SimpleGrid
        cols={{ base: 3, sm: 2, lg: 4 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      > */}
        {movies.map((movieId) => (
          <Suspense key={movieId} fallback="Loading Movie...">
            <MovieCardFetcher id={movieId} />
          </Suspense>
        ))}
        {/* </SimpleGrid> */}
      </Flex>
      {/* <Space h="xl" /> */}
    </>
  );
}
