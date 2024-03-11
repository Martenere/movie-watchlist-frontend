import { Group, Code, ScrollArea, rem, AppShell, Burger } from "@mantine/core";
import { NavbarNested } from "./components/NavbarNested/NavbarNested";
import { useDidUpdate, useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";

export default function app() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="0">
        <NavbarNested />
      </AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
