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

export interface MovieCardProps {
  image: string;
  title: string;
  description: string;
  country: string;
  badges: { emoji: string; label: string }[];
}

export function MovieCard({
  image,
  title,
  description,
  country,
  badges,
}: MovieCardProps) {
  //   const { image, title, description, country, badges } = mockdata;
  const features = badges.map((badge) => (
    <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
      {badge.label}
    </Badge>
  ));

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
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className="like" stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
