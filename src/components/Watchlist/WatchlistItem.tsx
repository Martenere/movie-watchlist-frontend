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
  console.log("watchlist movies", movies);
  if(!movies){
    return (<p>no movies</p>)
  }
  
  
  return (
    <div className="bg-gray-900 p-4 rounded-md">
      <Title className="text-gray-300" order={1}>
        {name}
      </Title>
      <Text className="text-gray-600">{description}</Text>
      <Text className="text-gray-600">{user}</Text> <Space h="xl" />
      <Grid dir="col">
        {movies.map((movieId) => (
          <Suspense key={movieId} fallback="Loading Movie...">
            <MovieCardFetcher id={movieId} />
          </Suspense>
        ))}
      </Grid>
      <Space h="xl" />
    </div>
  );
}
