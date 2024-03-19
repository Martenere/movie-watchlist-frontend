import { Checkbox, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../utils/globalVariables";
import { useAtom } from "jotai";
import { triggerRefetchAtom } from "../../../state/watchlistsState";

const linkItem = {
  label: "Create new playlist",
  link: "/create-new-watchlist",
  icon: IconPlus,
};

export default function CreateNewPlaylistButton() {
  const nav = useNavigate();
  const [, triggerWatchlistRefetch] = useAtom(triggerRefetchAtom);

  const createNewPlaylist = async () => {
    const url = BASE_URL + "/watchlists";
    const newWatchlistData = {
      name: "New Watchlist (button)",
      description:
        "A new watchlist created from pressing the button in the interface",
      userId: 0,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWatchlistData),
    };
    await fetch(url, options);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await createNewPlaylist();
    triggerWatchlistRefetch();
  };

  return (
    <div
      key={linkItem.label}
      className="link  flex justify-between items-center rounded-md hover:bg-green-950 hover:border-emerald-900 hover:border-2 hover:border-spacing-2"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Text
        component="a"
        fw={600}
        className="  flex grow justify-start p-3  items-center text-ml h-12"
      >
        {linkItem.label}
      </Text>
      <Checkbox
        className="ml-7"
        icon={linkItem.icon}
        checked={true}
        readOnly={true}
        color="green"
        size="md"
      />
    </div>
  );
}
