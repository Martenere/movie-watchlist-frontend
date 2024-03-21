import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  Space,
} from "@mantine/core";
import "./MovieCard.css";
import { useAtom } from "jotai";
import { currentWatchlistEditDataAtom } from "../../../state/CurrentlyEditingState";
import { BASE_URL } from "../../../../utils/globalVariables";
import {
  WatchlistData,
  triggerWatchlistsRefetchAtom,
} from "../../../state/watchlistsState";

export interface MovieCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  country: string;
  badges: { emoji: string; label: string }[];
}

export function MovieCard({
  id,
  image,
  title,
  description,
  country,
  badges,
}: MovieCardProps) {
  const [selectedWatchlist] = useAtom(currentWatchlistEditDataAtom);
  const [, triggerWatchlistRefetch] = useAtom(triggerWatchlistsRefetchAtom);
  const [watchlistData]: [WatchlistData, never] = useAtom(
    currentWatchlistEditDataAtom
  );
  const movieIsInWatchlist: boolean = selectedWatchlist.movies.includes(id);

  const features = badges.map((badge) => (
    <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
      {badge.label}
    </Badge>
  ));

  const addMovieToWatchlists = async () => {
    const url = `${BASE_URL}/watchlists/${selectedWatchlist.id}/movies/add`;
    const data = {
      movieId: id,
      movieName: title,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    await fetch(url, options);
  };

  const removeMovieFromWatchlists = async () => {
    const url = `${BASE_URL}/watchlists/${selectedWatchlist.id}/movies/remove`;
    const data = {
      movieId: id,
      //TODO remove movieName from delete payload in API
      movieName: title,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    await fetch(url, options);
  };

  const handleButtonClick = async () => {
    if (movieIsInWatchlist) {
      await removeMovieFromWatchlists();
    } else {
      await addMovieToWatchlists();
    }
    triggerWatchlistRefetch();
  };

  const buttonText: () => [string, string] = () => {
    if (selectedWatchlist.id === -1) {
      return ["Select a playlist", ""];
    }

    if (movieIsInWatchlist) {
      return ["Remove from ", watchlistData.name];
    }

    return ["Add to ", watchlistData.name];
  };

  const cardClasses: string = movieIsInWatchlist
    ? "card outline-watchlist-green outline outline-2"
    : "card";

  const buttonClasses: string = movieIsInWatchlist
    ? "in-watch-list hover:outline hover:outline-1 hover:outline-red-800"
    : "border-watchlist-green hover:bg-watchlist-green ";

  return (
    <Card withBorder radius="md" p="md" className={`${cardClasses}`}>
      <Card.Section>
        <Image className="max-h-72" src={image} alt={title} />
      </Card.Section>

      <Card.Section
        className="section overflow-hidden max-h-40 min-h-40 text-ellipsis flex flex-col"
        mt="md"
      >
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm" variant="light">
            {country}
          </Badge>
        </Group>
        <Text lineClamp={5} fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className="section">
        <Text mt="md" className="label" c="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group gap={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="xs" className="flex" style={{ maxWidth: "100%" }}>
        <Button
          id="movie-card-button"
          className={`${buttonClasses} min-h-20`}
          radius="md"
          style={{ flex: 1 }}
          onClick={handleButtonClick}
        >
          <div className="whitespace-normal flex-grow">
            <Text size="xs">{buttonText()[0]}</Text>
            {buttonText()[1] && <Text fw={700}>'{buttonText()[1]}'</Text>}
          </div>
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className="like" stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
