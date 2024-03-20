import { Flex, Grid, Space, Text, Title } from "@mantine/core";

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
        gap="lg"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        {movies.map((movieId) => (
          // <Grid.Col span={2}>
          <Suspense key={movieId} fallback="Loading Movie...">
            <MovieCardFetcher id={movieId} />
          </Suspense>
          // </Grid.Col>
        ))}
      </Flex>
      {/* <Space h="xl" /> */}
    </>
  );
}
