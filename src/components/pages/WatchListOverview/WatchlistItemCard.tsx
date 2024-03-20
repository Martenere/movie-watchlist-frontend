import { Space, Text, Title } from "@mantine/core";
import WatchlistItem from "../../Watchlist/WatchlistItem";

export interface WatchlistItemProps {
  id: string | number;
  user: string;
  userId: number;
  name: string;
  description: string;

  movies: number[];
}

export default function WatchlistItemCard({ watchlist }) {
  const { name, description, user } = watchlist;

  return (
    <div className="bg-gray-900 p-4 rounded-md">
      <Title className="text-gray-300" order={1}>
        {name}
      </Title>
      <Text className="text-gray-600">{description}</Text>
      <Text className="text-gray-600">{user}</Text> <Space h="xl" />
      <WatchlistItem {...watchlist} />
      <Space h="xl" />
    </div>
  );
}
