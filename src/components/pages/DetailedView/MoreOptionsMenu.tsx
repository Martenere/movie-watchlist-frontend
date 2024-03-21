import { Menu, Button, rem} from '@mantine/core';
import moreOptions from "../../../assets/moreOptions.svg"
import { useAtom } from 'jotai';
import { isDeletModalActiveAtom, isEditModalActiveAtom } from './MoreOptionsAtoms';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';





export default function MoreOptionsMenus() {
    const [isEditFormActive, setIsEditFormActive] = useAtom(isEditModalActiveAtom)
    const [isDeleteFormActive, setIsDeleteFormActive] = useAtom(isDeletModalActiveAtom)
    
    
  return (
    <Menu shadow="md" width={200} position='bottom-end' >
      <Menu.Target>
        <Button className="bg-[#1971c2] rounded-full p-1 min-w-fit"><img src={moreOptions} alt="More options" className="w-7 h-7 " /></Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} className='hover:bg-watchlist-green hover:text-black'  onClick={()=>setIsEditFormActive(!isEditFormActive)}>Edit</Menu.Item>
        <Menu.Divider />
        
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />} className='hover:bg-red-600 hover:text-black' color="red" onClick={()=>setIsDeleteFormActive(!isDeleteFormActive)}>Delete</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}