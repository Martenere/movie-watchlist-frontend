import { useAtom } from "jotai";
import { currentWatchlistEdit } from "../../../state/CurrentlyEditingState";
import { useEffect } from "react";
import WatchlistItem from "../../Watchlist/WatchlistItem";
import { Space, Text, Title } from "@mantine/core";
import MoreOptionsMenus from "./MoreOptionsMenu";
import { isDeletModalActiveAtom, isEditModalActiveAtom } from "./MoreOptionsAtoms";
import EditWatchlistModal from "./EditWatchlistModal";
import DeleteWatchlistModal from "./DeleteWatchlistModal";

export default function WatchlistDetailedView(){
    const [selectedWatchlist] = useAtom(currentWatchlistEdit)
    const [isEditFormActive] = useAtom(isEditModalActiveAtom)
    const [isDeleteFormActive] = useAtom(isDeletModalActiveAtom)

    useEffect(() => {},[selectedWatchlist])
    
    return (
        <>
        <div className="flex flex-row justify-between ">
            <div>
            <Title className="text-gray-300" order={1}>
                {selectedWatchlist.name}
            </Title>
            <Text className="text-gray-600">{selectedWatchlist.description}</Text>
            <Text className="text-gray-600">{selectedWatchlist.user}</Text> <Space h="xl" />
            </div>
            <MoreOptionsMenus watchlist={selectedWatchlist}/>
            {/* TODO Remove modal props and replace with atoms when merged with main */}
            {isEditFormActive && <EditWatchlistModal {...selectedWatchlist}/>}
            {isDeleteFormActive && <DeleteWatchlistModal {...selectedWatchlist}/>}
        </div>
        <WatchlistItem {...selectedWatchlist} />
        </>
    )
}