/**
 * Returns the string with the first character upper-case and the rest of the string lower-case.
 *
 * @param input The input
 */
export const capitalize = (input: string): string => (
    input.substr(0, 1).toUpperCase() + input.substr(1).toLowerCase()
);

/**
 * Returns the string, truncated at the specified index. The truncated string will be appended with
 * a suffix (...), if the parameter is true, so the total length will be l + 3.
 *
 * @param input The input
 * @param length The length to truncate at
 * @param suffix Whether to use a suffix
 */
export const truncate = (input: string, length: number | undefined, suffix = false): string => {
    if (length && input.length > length) {
        const truncated = input.substr(0, length);
        return suffix ? `${truncated}...` : truncated;
    }
    return input;
};

/**
 * Unescapes HTML entities such as &uuml;.
 *
 * @param input The input
 */
export const unescapeString = (input: string): string => {
    const element = document.createElement("span");
    element.innerHTML = input;
    return element.innerText;
};

/**
 * Removes all HTML tags from the passed string. If replaceParagraphsWithSpaces is true, between
 * every paragraph, a space will be inserted to prevent multiple words from being concatenated.
 * Returns an empty string if undefined is passed as input.
 *
 * @param input                         The string to sanitize
 * @param replaceParagraphsWithSpaces   Whether spaces should be inserted between paragraphs
 */
export const sanitizeString = (
    input: string | undefined,
    replaceParagraphsWithSpaces = false
): string => {
    const spaced = input && replaceParagraphsWithSpaces
        ? input.replaceAll("</p><p>", "</p> <p>") : input || "";
    return spaced.replaceAll(/<.*?>/g, "");
};

export const splitAddress = (address: string | undefined): string[] => {
    if (!address) {
        return ["Unbekannt"];
    }

    return address.split(",")
        .map(part => part.trim());
}
