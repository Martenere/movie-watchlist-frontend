import { AppShell, Burger } from "@mantine/core";
import { NavbarNested } from "./components/Navigation/NavbarNested/NavbarNested";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";

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

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/home" element={<div>home</div>} />
          <Route
            path="/watchlists/:id"
            element={<div>specific watchlist</div>}
          />
          <Route
            path="/search-for-movies"
            element={<div>/search-for-movies</div>}
          />
          <Route
            path="/create-new-watchlist"
            element={<div>/create-new-watchlist</div>}
          />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}
