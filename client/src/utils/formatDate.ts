const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Formats an ISO 8601 date string into a human-readable format.
 * @param {string} isoDate - The ISO 8601 formatted date string (e.g., "2024-06-24T04:10:25.286Z").
 * @returns {string} The formatted date string in the format "day month, year" (e.g., "24 June, 2024").
 */

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export default formatDate;
