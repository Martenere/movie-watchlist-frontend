import { useAtom } from "jotai";
import WatchlistItem from "../../Watchlist/WatchlistItem";
import { currentWatchlistEdit } from "../../../state/CurrentlyEditingState";
import { useEffect } from "react";
import EditWatchlistModal from "./EditWatchlistModal";

export default function WatchlistDetailedView(){
    const [selectedWatchlist] = useAtom(currentWatchlistEdit)

    useEffect(() => {},[selectedWatchlist])
    
    return (
        <>
        <EditWatchlistModal {...selectedWatchlist}/>
        <WatchlistItem {...selectedWatchlist} />
        </>
    )
}