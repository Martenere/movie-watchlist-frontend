import {
  Container,
  Flex,
  InputBase,
  Pill,
  RangeSlider,
  Space,
  TextInput,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  initialSearchProp,
  searchInputAtom,
  searchInputProps,
} from "../../../../state/movieSearchState";
import { useDebouncedValue } from "@mantine/hooks";

const movieNames = [
  "The Shawshank Redemption",
  "The Godfather",
  "Inception",
  "Forrest Gump",
  "The Matrix",
  "Shrek",
  "Shrek 2",
  "Shrek 3",
];

const half = (2024 - 1900) / 2 + 1900;
const marks = [
  { value: 1900, label: "1900" },
  { value: half, label: half },
  { value: 2024, label: "2024" },
];

export default function MoviePageSearchBar() {
  // Form control
  const [value, setValue] = useState(initialSearchProp);
  const [_, setSearchInputAtom] = useAtom(searchInputAtom);

  // Debounce user input data
  const [debouncedSearchValue, __]: readonly [searchInputProps, () => void] =
    useDebouncedValue(value, 300);

  // Set searchstring when debounce value is changed, to limit requests to server
  useEffect(() => {
    //console.log("debounced: ", debouncedSearchValue.title);
    setSearchInputAtom(debouncedSearchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  //  Set value of form
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, title: event.target.value });
  };

  const pills = movieNames.map((movieName, index) => (
    <Pill
      key={index}
      onClick={() => setValue({ ...value, title: movieName })}
      className="cursor-pointer hover:outline outline-gray-500 h-fit w-fit px-6"
    >
      {movieName}
    </Pill>
  ));

  return (
    <Container className="bg-gray-600 p-5 pb-10 px-10 border-2 border-gray-500 rounded-md">
      <TextInput
        className="w-90%"
        placeholder="Search for movie, actor etc..."
        size="lg"
        label="Search"
        value={value.title}
        name="title"
        onChange={handleInput}
      />
      <Space h="sm" />
      {/* <div className="bg-gray-800 p-6 pt-3 pb-6">
        <label>
          Year
          <Space h="sm" />
          <RangeSlider
            className="max-w-[200px]"
            minRange={2}
            min={1900}
            max={2024}
            step={1}
            marks={marks}
            defaultValue={[1900, 2024]}
          />
        </label>
      </div> */}
      <Space h="xl" />
      <Pill.Group>
        <center className="w-full  gap-2 justify-start flex flex-wrap">
          {pills}
        </center>
      </Pill.Group>
    </Container>
  );
}
