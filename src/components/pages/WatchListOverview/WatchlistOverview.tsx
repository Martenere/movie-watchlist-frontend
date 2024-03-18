import { Suspense } from "react";
import WatchlistsList from "./WatchlistsList";

export default function WatchlistOverview() {
  return (
    <Suspense fallback={<p>Loading watchlists...</p>}>
      <WatchlistsList />
    </Suspense>
  );
}
