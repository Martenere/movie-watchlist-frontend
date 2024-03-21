import {
  Center,
  Container,
  Divider,
  Group,
  Space,
  Text,
  Title,
} from "@mantine/core";
import WatchlistItem from "../../Watchlist/WatchlistItem";

export interface WatchlistItemProps {
  id: string | number;
  user: string;
  userId: number;
  name: string;
  description: string;

  movies: number[];
}

interface WatchlistItemCardProps {
  watchlist: WatchlistItemProps;
}

export default function WatchlistItemCard({
  watchlist,
}: WatchlistItemCardProps) {
  const { name, description, user, movies } = watchlist;

  return (
    <>
      <Container className="bg-zinc-900 px-9 pt-9 pb-9 rounded-md max-w-fit flex-grow">
        <Group justify="space-between">
          <h1 className="text-gray-300 text-5xl">{name}</h1>{" "}
          <Text className="font-mono text-sm text-opacity-40">
            Created by: {user}
          </Text>
        </Group>
        <Space h="md" />
        <Divider className="mx-2" />
        <Space h="md" />
        <div></div>
        <Space h="md" /> <Space h="sm" />
        <Center>
          <div>
            <Title className="text-gray-300 opacity-50" order={5}>
              Description:
            </Title>
            <Space h="sm" />

            <div className="bg-zinc-700 border-4 border-zinc-100 rounded-md p-4 max-w-xl min-w-96 ">
              <p className="text-zinc-950 leading-relaxed font-mono text-lg opacity-80">
                {description}
              </p>
            </div>
          </div>
        </Center>
        <Space h="xl" />
        <Space h="xl" />
        <Text className="font-mono text-sm text-opacity-40">
          This watchlist contains {movies.length} movies:
        </Text>
        <Space h="md" />{" "}
        <Center className="flex flex-grow">
          <WatchlistItem {...watchlist} />
        </Center>
      </Container>
    </>
  );
}
