import { Modal, Button, TextInput, Group, Box } from "@mantine/core";
import { useState } from "react";
import { BASE_URL } from "../../../../utils/globalVariables";
import { triggerWatchlistsRefetchAtom } from "../../../state/watchlistsState";
import { useAtom } from "jotai";
import { isCreateModalActiveAtom } from "./MoreOptionsAtoms";

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
        <Box maw={340} mx="auto">
          <form onSubmit={handleSubmit}>
            <TextInput
              withAsterisk
              label="Name"
              name="name"
              placeholder="Enter a name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
            />
            <TextInput
              label="Description"
              name="description"
              placeholder="Enter a description"
              value={formData.description}
              onChange={handleChange}
              autoComplete="off"
            />

            <Group justify="flex-end" mt="md">
              <Button
                className="disabled:bg-slate-500 bg-green-500"
                type="submit"
                disabled={formData.name.length < 1}
              >
                Create
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
}
