import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
} from "@mantine/core";
import "./MovieCard.css";
import { useAtom } from "jotai";
import { currentWatchlistEdit } from "../../../state/CurrentlyEditingState";
import { BASE_URL } from "../../../../utils/globalVariables";
import { triggerRefetchAtom } from "../../../state/watchlistsState";

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
  const [selectedWatchlist] = useAtom(currentWatchlistEdit);
  const [, triggerWatchlistRefetch] = useAtom(triggerRefetchAtom);

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
    if (selectedWatchlist.movies.includes(id)) {
      await removeMovieFromWatchlists();
    } else {
      await addMovieToWatchlists();
    }
    triggerWatchlistRefetch();
  };

  const buttonText = (): string => {
    if (selectedWatchlist.id === -1) {
      return "Select a playlist";
    }

    if (selectedWatchlist.movies.includes(id)) {
      return "Delete from watchlist";
    }

    return "Add to watchlist";
  };

  return (
    <Card withBorder radius="md" p="md" className="card">
      <Card.Section>
        <Image className="max-h-44 " src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className="section" mt="md">
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

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }} onClick={handleButtonClick}>
          {buttonText()}
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className="like" stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
