import { AppShell, Burger } from "@mantine/core";
import { NavbarNested } from "./components/Navigation/NavbarNested/NavbarNested";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MovieSearchPage from "./components/pages/MovieSearchPage/MovieSearchPage";
import WatchlistOverview from "./components/pages/WatchListOverview/WatchlistOverview";

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

      <AppShell.Main className="bg-gray-700">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<WatchlistOverview />} />
          <Route
            path="/watchlists/:id"
            element={<div>specific watchlist</div>}
          />
          <Route path="/search-for-movies" element={<MovieSearchPage />} />
          <Route
            path="/create-new-watchlist"
            element={<div>/create-new-watchlist</div>}
          />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}
