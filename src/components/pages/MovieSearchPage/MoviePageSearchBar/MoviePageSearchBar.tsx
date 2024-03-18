import { TextInput } from "@mantine/core";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  initialSearchProp,
  searchInputAtom,
  searchInputProps,
} from "../../../../state/movieSearchState";
import { useDebouncedValue } from "@mantine/hooks";

export default function MoviePageSearchBar() {
  // Form control
  const [value, setValue] = useState(initialSearchProp);
  const [_, setSearchInputAtom] = useAtom(searchInputAtom);

  // Debounce user input data
  const [debouncedSearchValue, __]: readonly [searchInputProps, () => void] =
    useDebouncedValue(value, 300);

  // Set searchstring when debounce value is changed, to limit requests to server
  useEffect(() => {
    console.log("debounced: ", debouncedSearchValue.title);
    setSearchInputAtom(debouncedSearchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  //  Set value of form
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Value: ", event.target.value);
    setValue({ ...value, title: event.target.value });
  };

  return (
    <>
      <TextInput
        className="w-90%"
        placeholder="Search for movie, actor etc..."
        size="lg"
        label="Search"
        value={value.title}
        name="title"
        onChange={handleInput}
      />
    </>
  );
}
