import { Menu, Button, rem } from '@mantine/core';
import {
    IconTrash,
} from '@tabler/icons-react';
import moreOptions from "../../../assets/moreOptions.svg"

import { useAtom } from 'jotai';
import { isDeletModalActiveAtom, isEditModalActiveAtom } from './MoreOptionsAtoms';




export default function MoreOptionsMenus({watchlist}) {
    const [isEditFormActive, setIsEditFormActive] = useAtom(isEditModalActiveAtom)
    const [isDeleteFormActive, setIsDeleteFormActive] = useAtom(isDeletModalActiveAtom)
    
    
  return (
    <Menu shadow="md" width={200} position='bottom-end' >
      <Menu.Target>
        <Button className="bg-teal-300 rounded-full p-1"><img src={moreOptions} alt="More options" className="w-7 h-7" /></Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Edit</Menu.Label>
        <Menu.Item onClick={()=>setIsEditFormActive(!isEditFormActive)}>Edit</Menu.Item>
        <Menu.Divider />
        
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item color="red" onClick={()=>setIsDeleteFormActive(!isDeleteFormActive)}>Delete</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}