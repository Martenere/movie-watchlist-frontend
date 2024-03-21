import { Group, Box, ThemeIcon, UnstyledButton } from "@mantine/core";

import "./NavbarLinks.css";
import { useLocation, useNavigate } from "react-router-dom";

interface NavbarLinkProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link: string;
}

export function NavbarLink({ icon: Icon, label, link }: NavbarLinkProps) {
  const location = useLocation()
  const nav = useNavigate();

  const isUrlMatching = location.pathname.includes(link)

  const handleClick = () => {
    // console.log(link);
    nav(link);
  };

  return (
    <>
      <UnstyledButton<"a"> onClick={handleClick} className={`control rounded-md ${isUrlMatching ? 'bg-slate-700': ''}`}>
        <Group justify="space-between" gap={0}>
          <Box
            className="link-text"
            style={{ display: "flex", alignItems: "center" }}
          >
            <ThemeIcon variant="light" size="xl">
              <Icon />
              {/* <Icon style={{ width: rem(18), height: rem(18) }} /> */}
            </ThemeIcon>
            <Box ml="md" style={{fontSize:'20px', fontWeight: 700}} >{label}</Box>
          </Box>
        </Group>
      </UnstyledButton>
    </>
  );
}
