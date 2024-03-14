import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
  Space,
  Checkbox,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import "./NavbarLinksGroup.css";

interface LinksGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link: string;
  links?: { label: string; link: string; icon: unknown }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <div key={link.label}>
      <div className=" link flex justify-between items-center">
        <Text<"a">
          component="a"
          fw={600}
          className="link-text flex grow justify-start p-3 rounded-md items-center text-ml h-12"
          href={link.link}
          onClick={(event) => event.preventDefault()}
        >
          {link.label}
        </Text>
        <Checkbox className="ml-7" icon={link.icon} defaultChecked size="md" />
      </div>
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
          {hasLinks && (
            <IconChevronRight
              className="chevron mr-3"
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
        <Collapse className=" ml flex flex-col" in={opened}>
          {items}
        </Collapse>
      ) : null}
    </>
  );
}
