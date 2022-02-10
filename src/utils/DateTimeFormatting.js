const today = Date.now();
const y = new Date();
const yesterday = y.setDate(y.getDate() - 1);

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const formattedToday = dateTimeFormatter.formatToParts(today);
const formattedYesterday = dateTimeFormatter.formatToParts(yesterday);

export const dateTime = (date) => {
  let text = "";
  date = dateTimeFormatter.formatToParts(date);
  if (
    date[0].value === formattedToday[0].value &&
    date[2].value === formattedToday[2].value &&
    date[4].value === formattedToday[4].value
  ) {
    text = "today at ";
  } else if (
    date[0].value === formattedYesterday[0].value &&
    date[2].value === formattedYesterday[2].value &&
    date[4].value === formattedYesterday[4].value
  ) {
    text = "yesterday at ";
  } else {
    text = `${date[0].value}/${date[2].value}/${date[4].value} `;
  }

  return (
    <div>
      {`${text}${date[6].value.replace(/^0(?:0:0?)?/, "")}${date[7].value}${
        date[8].value
      } ${date[10].value}`}
    </div>
  );
};
