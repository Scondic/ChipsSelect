import { useMemo } from "react";

export const useSorting = (data: any, field: string, sortBy: string) => {
  const sortedOptions = useMemo(
    () =>
      data.filter((item: any) => {
        if (sortBy === "") {
          return item;
        } else if (item[field].toLowerCase().includes(sortBy.toLowerCase())) {
          return item;
        }
      }),
    [data, field, sortBy]
  );

  return { sortedOptions };
};
