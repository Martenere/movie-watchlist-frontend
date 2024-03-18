import { useAtom } from "jotai";

import { watchlistsFromApiAtom } from "../../../state/watchlistsState";
import WatchlistItem, {
  WatchlistItemProps,
} from "../../Watchlist/WatchlistItem";
import { Divider } from "@mantine/core";

export default function WatchlistsList() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [watchlists, _]: [WatchlistItemProps[], Function] = useAtom(
    watchlistsFromApiAtom
  );

  return (
    <div>
      {watchlists.map((w) => (
        <>
          <Divider my="md" />
          <WatchlistItem key={w.id} {...w} />
        </>
      ))}
    </div>
  );
}
