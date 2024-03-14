import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";
// import classes from "./NavbarLinksGroup.module.css";
import "./NavbarLinksGroup.css";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text<"a">
      component="a"
      className="link flex justify-center align-center h-10"
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className="control p-4"
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon />
              {/* <Icon style={{ width: rem(18), height: rem(18) }} /> */}
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className="chevron"
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse
          className="border-l-4 border-indigo-500 ml-10 p-3 flex flex-col gap-8"
          in={opened}
        >
          {items}
        </Collapse>
      ) : null}
    </>
  );
}
