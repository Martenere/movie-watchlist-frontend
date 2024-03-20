import { useAtom } from "jotai";

import { watchlistsFromApiAtom } from "../../../state/watchlistsState";
import { WatchlistItemProps } from "../../Watchlist/WatchlistItem";
import { Divider } from "@mantine/core";
import WatchlistItemCard from "./WatchlistItemCard";

export default function WatchlistsList() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [watchlists]: [WatchlistItemProps[], Function] = useAtom(
    watchlistsFromApiAtom
  );

  console.log("watchlists", watchlists);

  if (!watchlists) {
    return (
      <div>
        <p>Couldn't load watchlists</p>
      </div>
    );
  }

  return (
    <div>
      {watchlists.map((watchlist) => (
        <div key={watchlist.id}>
          <WatchlistItemCard watchlist={watchlist} />
          <Divider my="md" />
        </div>
      ))}
    </div>
  );
}
