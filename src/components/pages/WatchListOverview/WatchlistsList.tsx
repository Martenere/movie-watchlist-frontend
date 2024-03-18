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

  if (!watchlists) {
    return (
      <div>
        <p>Couldn't load watchlists</p>
      </div>
    );
  }

  return (
    <div>
      {watchlists.map((w) => (
        <div key={w.id}>
          <Divider my="md" />
          <WatchlistItem {...w} />
        </div>
      ))}
    </div>
  );
}
