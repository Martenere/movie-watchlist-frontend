import { Modal, Button, TextInput, Group, Box, Menu } from '@mantine/core';
import { WatchlistItemProps } from "../../Watchlist/WatchlistItem";
import { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "../../../../utils/globalVariables";
import { triggerWatchlistsRefetchAtom } from "../../../state/watchlistsState";
import { useAtom } from "jotai";
import { isDeletModalActiveAtom} from "./MoreOptionsAtoms";
import { useNavigate } from 'react-router-dom';

export default function DeleteWatchlistModal( {
  id,
  name,
}: WatchlistItemProps){
    const INTIAL_FORMDATA = useMemo(() => ({name: ""}) , [name])
    const [formData, setFormData] = useState(INTIAL_FORMDATA)
    const [,refreshWatchlists] = useAtom(triggerWatchlistsRefetchAtom)
    const [isActive, setIsActive] = useAtom(isDeletModalActiveAtom)
    const navigate = useNavigate()

    let formError = false

    const deleteWatchlistMetaData = async () =>{
        const url = `${BASE_URL}/watchlists/${id}`;
        const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        };

        await fetch(url, options);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData,[name]: value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      if(formData.name === name){
        await deleteWatchlistMetaData()
        .then((res) => {
          console.log(res);
          setIsActive(false)
          navigate("/")})
        .catch(()=>console.log("error"));
        refreshWatchlists()
      } else{
        formError = true
        console.log("Changed form error", formError); 
      }
    }

    useEffect(() => {setFormData(INTIAL_FORMDATA)},[INTIAL_FORMDATA])

  return (
    <>
      <Modal opened={isActive} onClose={()=>{
        setIsActive(false)
        setFormData(INTIAL_FORMDATA)
        }} 
        title={`Delete: ${name}`}>
        <Box maw={340} mx="auto">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Enter the name of the playlist to delete"
              name="name"
              placeholder={name}
              onChange={handleChange}
              autoComplete='off'
            />
            <Group justify="flex-end" mt="md">
              <Button className='disabled:bg-slate-500 bg-red-700' type="submit" disabled={formData.name !== name}>Delete</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
}