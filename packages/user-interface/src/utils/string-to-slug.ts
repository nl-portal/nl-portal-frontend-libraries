export const stringToSlug = (text: string) =>
  text
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters
    .trim() // Trim whitespace from both ends
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase(); // Convert to lowercase
