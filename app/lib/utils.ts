// Import the 'Revenue' type from the './definition' module
import { Revenue } from "./definition";

// Define a function 'formatCurrency' that takes an 'amount' (in cents) and returns a formatted currency string
export const formatCurrency = (amount: number) => {
  // Convert the 'amount' from cents to dollars and format it as a currency string in USD
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

// Define a function 'formatDateToLocal' that takes a 'dateStr' and an optional 'locale', and returns a formatted date string
export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US" // Default to 'en-US' if 'locale' is not provided
) => {
  // Create a new Date object from the provided 'dateStr'
  const date = new Date(dateStr);

  // Define formatting options for the date (day, month, year)
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  // Create a new Intl.DateTimeFormat instance with the specified 'locale' and 'options'
  const formatter = new Intl.DateTimeFormat(locale, options);

  // Format the 'date' using the created formatter and return the formatted date string
  return formatter.format(date);
};

// Define a function 'generateYAxis' that takes an array of 'Revenue' objects and calculates Y-axis labels and the top label
export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the Y-axis based on the highest revenue record and rounded to the nearest thousand
  const yAxisLabels = [];

  // Find the highest revenue value among all months in the 'revenue' array
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));

  // Round the highest revenue value to the nearest thousand to determine the top label
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  // Generate Y-axis labels in descending order, starting from the top label and decrementing by 1000
  for (let i = topLabel; i >= 0; i -= 1000) {
    // Format each label as a string with dollars and thousands (e.g., '$1k', '$2k', ...)
    yAxisLabels.push(`$${i / 1000}k`);
  }

  // Return an object containing the array of Y-axis labels and the top label value
  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
