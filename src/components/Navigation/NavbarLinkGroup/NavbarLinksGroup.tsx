import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
  Checkbox,
  Space,
  Divider,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import "./NavbarLinksGroup.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { currentWatchlistEdit } from "../../../state/CurrentlyEditingState";
import { useAtom } from "jotai";

interface LinksGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link: string;
  links: { label: string; link: string; icon: unknown; data: any }[];
  buttons: { label: string; link: string; icon: unknown }[];
  createNewWatchlistButton: JSX.Element;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  buttons,
  links,
  createNewWatchlistButton,
}: LinksGroupProps) {
  const nav = useNavigate();
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [selectedWatchlist, setSelectedWatchlist] =
    useAtom(currentWatchlistEdit);

  const linkItems = links.map((linkItem) => (
    <div
      key={linkItem.label}
      className="link flex justify-between items-center"
    >
      <Text
        component="a"
        fw={600}
        className=" link-text flex grow justify-start p-3 rounded-md items-center text-ml h-12"
        onClick={(e) => {
          //e.preventDefault();
          setSelectedWatchlist(linkItem.data)
          nav(linkItem.link);
        }}
        style={{ cursor: "pointer" }}
      >
        {linkItem.label}
      </Text>
      {/* <Text>{linkItem.data.movies.length}</Text> */}
      <Checkbox
        className="ml-7"
        icon={linkItem.icon}
        checked={selectedWatchlist.id === linkItem.data.id}
        onClick={() => setSelectedWatchlist(linkItem.data)}
        size="md"
      />
    </div>
  ));

  const handleClick = () => {
    setOpened((o) => !o);
  };

  return (
    <>
      <UnstyledButton onClick={handleClick} className="control">
        <Group justify="space-between" gap={0}>
          <Box
            className="link-text"
            style={{ display: "flex", alignItems: "center" }}
          >
            <ThemeIcon variant="light" size="xl">
              <Icon />
              {/* <Icon style={{ width: rem(18), height: rem(18) }} /> */}
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>

          <IconChevronRight
            className="chevron mr-3"
            stroke={1.5}
            style={{
              width: rem(16),
              height: rem(16),
              transform: opened ? "rotate(-90deg)" : "none",
            }}
          />
        </Group>
      </UnstyledButton>

      <Collapse className=" ml flex flex-col" in={opened}>
        {linkItems}
        <Space h="md" />
        <Divider className="mx-12  " />
        <Space h="md" />
        {createNewWatchlistButton}
      </Collapse>
    </>
  );
}
