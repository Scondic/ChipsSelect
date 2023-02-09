import { useMemo } from "react";

export const applySorting = (data: any, sortBy: string) => {
  if (!sortBy) {
    return data;
  }

  return data.filter(({ name }: { name: string }) =>
    name.toLowerCase().includes(sortBy.toLowerCase())
  );
};

export const useSorting = (data: any, sortBy: string) => {
  const sortedOptions = useMemo(
    () => applySorting(data, sortBy),
    [data, sortBy]
  );

  return { sortedOptions };
};
