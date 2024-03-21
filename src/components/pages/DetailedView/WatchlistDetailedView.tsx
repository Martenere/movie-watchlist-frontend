import { useAtom } from "jotai";
import { currentWatchlistEditDataAtom } from "../../../state/CurrentlyEditingState";
import { useEffect } from "react";
import WatchlistItem from "../../Watchlist/WatchlistItem";
import { Space, Text, Title } from "@mantine/core";
import MoreOptionsMenus from "./MoreOptionsMenu";
import {
  isDeletModalActiveAtom,
  isEditModalActiveAtom,
} from "./MoreOptionsAtoms";
import EditWatchlistModal from "./EditWatchlistModal";
import DeleteWatchlistModal from "./DeleteWatchlistModal";

export default function WatchlistDetailedView() {
  const [selectedWatchlist] = useAtom(currentWatchlistEditDataAtom);
  const [isEditFormActive] = useAtom(isEditModalActiveAtom);
  const [isDeleteFormActive] = useAtom(isDeletModalActiveAtom);

  useEffect(() => {}, [selectedWatchlist]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between p-6 bg-gray-800 rounded-lg shadow-md">
        <div>
          <Title className="text-2xl text-gray-100 font-semibold mb-2">
            {selectedWatchlist.name}
          </Title>
          <Text className="text-base text-gray-300 mb-4">
            {selectedWatchlist.description}
          </Text>
          <Text className="text-sm text-gray-400">
            Created by: {selectedWatchlist.user}
          </Text>
          <div className="mt-4">
            {/* Assuming you want to display the number of items in the watchlist */}
            <Text className="text-sm text-gray-400">
              Number of items: {selectedWatchlist.movies?.length || 0}
            </Text>
          </div>
        </div>
        <div className="flex-shrink-0">
          <MoreOptionsMenus watchlist={selectedWatchlist} />
        </div>
      </div>
      {isEditFormActive && <EditWatchlistModal {...selectedWatchlist} />}
      {isDeleteFormActive && <DeleteWatchlistModal {...selectedWatchlist} />}
      <div className="mt-6">
        <WatchlistItem {...selectedWatchlist} />
      </div>
    </>
  );
}
