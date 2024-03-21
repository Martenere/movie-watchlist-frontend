import React from "react";
import WatchlistLogo from "../../assets/Watchlist_Logo.webp";
import { Space, Text } from "@mantine/core";
export default function Banner() {
  return (
    <>
      <div className="flex grow items-center justify-center pt-1 overflow-hidden relative">
        <img
          className="rounded-full h-40 mb-4 scale-150 z-0"
          src={WatchlistLogo}
        />
        {/* <Space w="sm" /> */}
        <Text
          size=""
          fw={900}
          className="z-10 relative text-3xl text-watchlist-green"
        >
          ReelReminder
        </Text>
      </div>
    </>
  );
}
