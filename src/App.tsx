import { AppShell, Burger } from "@mantine/core";
import { NavbarNested } from "./components/Navigation/NavbarNested/NavbarNested";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MovieSearchPage from "./components/pages/MovieSearchPage/MovieSearchPage";
import WatchlistOverview from "./components/pages/WatchListOverview/WatchlistOverview";
import { Suspense } from "react";
import WatchlistDetailedView from "./components/pages/DetailedView/WatchlistDetailedView";
import ReelLogo from "./components/ReelLogo";

export default function app() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      // header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="lg" />
        {/* <Banner /> */}
      </AppShell.Header>

      <AppShell.Navbar p="0">
        <Suspense>
          <NavbarNested />
        </Suspense>
      </AppShell.Navbar>

      <AppShell.Main className="bg-gray-700">
        <Suspense>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<WatchlistOverview />} />
            <Route path="/watchlists/:id" element={<WatchlistDetailedView />} />
            <Route path="/search-for-movies" element={<MovieSearchPage />} />
          </Routes>{" "}
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}
