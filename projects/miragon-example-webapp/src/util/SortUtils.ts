export const sortBy = <T>(values: T[] | undefined, extract: (value: T) => number): T[] => {
    return values?.slice().sort((a, b) => extract(a) - extract(b)) || [];
};

export const sortByString = <T>(values: T[] | undefined, extract: (value: T) => string): T[] => {
    return values?.slice().sort((a, b) => extract(a).localeCompare(extract(b))) || [];
};
