import { Modal, Button, TextInput, Group, Box, Textarea} from "@mantine/core";
import { useState } from "react";
import { BASE_URL } from "../../../../utils/globalVariables";
import { triggerWatchlistsRefetchAtom } from "../../../state/watchlistsState";
import { useAtom } from "jotai";
import { isCreateModalActiveAtom } from "./MoreOptionsAtoms";
import WatchlistMetaDataForm from "./WatchlistMetaDataForm";

export default function CreateWatchlistModal() {
  const INTIAL_FORMDATA = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(INTIAL_FORMDATA);
  const [, refreshWatchlists] = useAtom(triggerWatchlistsRefetchAtom);
  const [isActive, setIsActive] = useAtom(isCreateModalActiveAtom);

  const postWatchlist = async () => {
    const url = `${BASE_URL}/watchlists`;
    const data = {
      name: formData.name,
      description: formData.description,
      userID: 0,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    await fetch(url, options);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postWatchlist();
    refreshWatchlists();
    setIsActive(false);
    setFormData(INTIAL_FORMDATA);
  };

  return (
    <>
      <Modal
        opened={isActive}
        onClose={() => {
          setIsActive(false);
          setFormData(INTIAL_FORMDATA);
        }}
        title="Create watchlist"
      >
<WatchlistMetaDataForm handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} sendButtonText={'Create'}/>
      </Modal>
    </>
  );
}
