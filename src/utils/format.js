/** Capitalize first letter of every word */
export const capitalizeFirst = (str) =>
  str
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

/** Format number as Indian currency */
export const inr = (n) => Number(n).toLocaleString("en-IN");
