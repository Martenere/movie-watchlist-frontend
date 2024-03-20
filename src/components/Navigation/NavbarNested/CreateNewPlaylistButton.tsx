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
      className="link  flex justify-between items-center hover:bg-green-950 hover:outline-emerald-900 hover:outline hover:outline-2"
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
        defaultChecked={true}
        readOnly={true}
        color="green"
        size="md"
      />
    </div>
  );
}
