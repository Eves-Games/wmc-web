export function formatDateTime(epochDate: number) {
  const date = new Date(epochDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString(undefined, options);
}
