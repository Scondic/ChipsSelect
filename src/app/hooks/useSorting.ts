import { useMemo } from "react";

export interface UseSortingProps {
  data: any;
  field: string;
  sortBy: string;
}

export const useSorting = ({ data, field, sortBy }: UseSortingProps) => {
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
