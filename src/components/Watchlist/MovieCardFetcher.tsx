import { Atom, atom, useAtom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import { MovieCard, MovieCardProps } from "../pages/MovieSearchPage/MovieCard";
import { transformMovieData } from "../pages/MovieSearchPage/MovieCardList";
import { Grid } from "@mantine/core";

export default function MovieCardFetcher({ MovieIdAtom }: typeof atom) {
  const [movieId, __]: [number, Function] = useAtom(MovieIdAtom);
  const [movieData, setMovieData] = useState();

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
      .then((json) => {
        console.log(json), setMovieData(transformMovieData(json));
      })
      .catch((err) => console.error("error:" + err));
  };

  useEffect(() => getMovieByID(movieId), []);

  if (!movieData) {
    return <p>loading</p>;
  }
  return (
    <Grid.Col span={3} key={movieId}>
      <MovieCard {...movieData} />
    </Grid.Col>
  );
}
