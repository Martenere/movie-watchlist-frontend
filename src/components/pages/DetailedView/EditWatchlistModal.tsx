import { Modal, Button, TextInput, Group, Box, Menu } from "@mantine/core";
import { WatchlistItemProps } from "../../Watchlist/WatchlistItem";
import { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "../../../../utils/globalVariables";
import { triggerWatchlistsRefetchAtom } from "../../../state/watchlistsState";
import { useAtom } from "jotai";
import { isEditModalActiveAtom } from "./MoreOptionsAtoms";

export default function EditWatchlistModal({
  id,
  name,
  description,
}: WatchlistItemProps) {
  const INTIAL_FORMDATA = useMemo(
    () => ({ name: name, description: description }),
    [description, name]
  );
  const [formData, setFormData] = useState(INTIAL_FORMDATA);
  const [, refreshWatchlists] = useAtom(triggerWatchlistsRefetchAtom);
  const [isActive, setIsActive] = useAtom(isEditModalActiveAtom);

  const putWatchlistMetaData = async () => {
    const url = `${BASE_URL}/watchlists/${id}`;
    const data = {
      name: formData.name,
      description: formData.description,
    };

    const options = {
      method: "PUT",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await putWatchlistMetaData();
    refreshWatchlists();
  };

  useEffect(() => {
    setFormData(INTIAL_FORMDATA);
  }, [INTIAL_FORMDATA]);

  return (
    <>
      <Modal
        opened={isActive}
        onClose={() => {
          setIsActive(false);
          setFormData(INTIAL_FORMDATA);
        }}
        title="Edit details"
      >
        <Box maw={340} mx="auto">
          <form onSubmit={handleSubmit}>
            <TextInput
              withAsterisk
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextInput
              withAsterisk
              label="Description"
              name="description"
              placeholder="Enter a description"
              value={formData.description}
              onChange={handleChange}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit">Save</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
}
