import { Grid, Space, Text, Title } from "@mantine/core";

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

  if(!movies){
    return (<p>no movies</p>)
  }
  
  return (
    <>

      <Grid dir="col">
        {movies.map((movieId) => (
          <Suspense key={movieId} fallback="Loading Movie...">
            <MovieCardFetcher id={movieId} />
          </Suspense>
        ))}
      </Grid>
      {/* <Space h="xl" /> */}
    </>
  );
}
