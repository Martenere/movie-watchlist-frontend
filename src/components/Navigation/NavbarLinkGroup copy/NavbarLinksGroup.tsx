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
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import "./NavbarLinksGroup.css";
import React from "react";
import { useNavigate } from "react-router-dom";

interface LinksGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link: string;
  links: { label: string; link: string; icon: unknown }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
}: LinksGroupProps) {
  const nav = useNavigate();
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = links.map((linkItem) => (
    <div
      key={linkItem.label}
      className=" flex justify-between items-center bg-red-500"
    >
      <Text
        component="a"
        fw={600}
        className=" link-text flex grow justify-start p-3 rounded-md items-center text-ml h-12"
        onClick={(e) => {
          e.preventDefault();
          nav(linkItem.link);
        }}
        style={{ cursor: "pointer" }}
      >
        {linkItem.label}
      </Text>
      <Checkbox
        className="ml-7"
        icon={linkItem.icon}
        defaultChecked
        size="md"
      />
    </div>
  ));

  const handleClick = () => {
    if (hasLinks) setOpened((o) => !o);
    else console.log(link);
  };

  return (
    <>
      <UnstyledButton<"a"> onClick={handleClick} className="control">
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
        {items}
      </Collapse>
    </>
  );
}
