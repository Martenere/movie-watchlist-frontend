import { useEffect, useState } from "react";
import { MovieCard, MovieCardProps } from "../pages/MovieSearchPage/MovieCard";

import { Grid } from "@mantine/core";
import { transformMovieData } from "../pages/MovieSearchPage/MovieCardList";

export default function MovieCardFetcher({ id }) {
  const [movieData, setMovieData]: [MovieCardProps | undefined, Function] =
    useState();

  const getMovieByID = (id: number) => {
    const url = "https://api.themoviedb.org/3/movie/" + id + "?language=en-US";
    const tmdb_api_read_key = import.meta.env.VITE_TMDB_API_READ_KEY;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + tmdb_api_read_key,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setMovieData({...transformMovieData(data)});
      });
      
  };

  useEffect(() => getMovieByID(id), [id]);  

  if (!movieData) {
    return <p>loading</p>;
  }

  return (
    <Grid.Col span={3}>
      <MovieCard {...movieData} />
    </Grid.Col>
  );
}
