/**
 * Formats a date string into a more readable format.
 * @param dateString - The date string to be formatted.
 * @param format - The format is for date format pattern
 * @param locales - The formated date convert into specific locales
 * @returns The formatted date string in the format "MMM DD, YYYY".
 */
export const formatDate = (
    dateString: string | number | Date,
    format: Intl.DateTimeFormatOptions,
    locales: string = 'en-US'
): string => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(locales, format);
    return formattedDate.replace(' at ', ' ');
};

/**
* Function to scroll to the top of the given element
* @param element - The DOM element to scroll
*/
export function scrollToTop(element: HTMLElement) {
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}