function toISO(dmaDate) {
  return dmaDate.split("/").reverse().join("-");
}

function formatTaskDate(date) {
  return new Date(date)
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");
}

export { toISO, formatTaskDate };
