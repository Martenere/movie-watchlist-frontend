import { Text } from "@mantine/core";
import WatchlistLogo from "../assets/Watchlist_Logo.webp";

export default function ReelLogo (){
    return(
    <div className="flex items-center justify-center pt-1 overflow-hidden">
      <div className="bg-[#000d14] -ml-11 -mr-12 rounded-full">
      
        <img
          className=" h-52 w-full mb-4 scale-90 z-0"
          src={WatchlistLogo}
        />
      </div>
        {/* <Space w="sm" /> */}
        <Text
          size=""
          fw={800}
          className="z-10 relative text-2xl text-watchlist-green"
        >
          ReelReminder
        </Text>
      </div>)
}