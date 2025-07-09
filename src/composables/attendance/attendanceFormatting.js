export const formatDateToCustomString = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return " - - - ";
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .replace(",", "")
    .replace(/^(\w+)\s(\d+)\s(\d+)/, "$1. $2, $3");
};

export const formatFullname = (row) => {
  const cap = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const first = cap(row.firstname || "No Firstname");
  const middle = row.middlename ? `${cap(row.middlename).charAt(0)}.` : "";
  const last = cap(row.lastname || "No Lastname");
  return `${first} ${middle} ${last}`;
};
