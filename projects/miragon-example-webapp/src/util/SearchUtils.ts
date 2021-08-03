export const searchCaseInsensitive = (search: string, text: string | undefined): boolean => {
    if (!text) {
        return false;
    }
    return text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
};

export const searchAllCaseInsensitive = (search: string, ...texts: (string | undefined)[]): boolean => (
    !!texts.find(text => searchCaseInsensitive(search, text))
);
