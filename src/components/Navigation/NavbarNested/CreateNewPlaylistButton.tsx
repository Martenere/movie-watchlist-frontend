import { Checkbox, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { isCreateModalActiveAtom } from "../../pages/DetailedView/MoreOptionsAtoms";

const linkItem = {
  label: "Create new watchlist",
  link: "/create-new-watchlist",
  icon: IconPlus,
};

export default function CreateNewPlaylistButton() {
  const [, setIsCreateFormActive] = useAtom(isCreateModalActiveAtom);

  const handleClick = async (e) => {
    e.preventDefault();
    setIsCreateFormActive(true);
  };

  return (
    <div
      key={linkItem.label}
      className=" rounded-xl bg-green-700 link -outline-offset-2 flex justify-between items-center hover:bg-green-800 hover:outline-watchlist-green hover:outline hover:outline-2 hover:text-black  hover:shadow-green-950 hover:shadow-inner"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Text
        component="a"
        fw={600}
        className="  flex grow justify-start p-3  items-center text-ml h-12 hover:text-black"
      >
        {linkItem.label}
      </Text>
      <Checkbox
        className="ml-7 shadow-green-600 "
        icon={linkItem.icon}
        defaultChecked={true}
        readOnly={true}
        size="md"
        color="green.4"
      />
    </div>
  );
}
