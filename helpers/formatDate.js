const { compareAsc, format } = require("date-fns");
function FormatDate(date) {
  console.log(date, "date");
  let data = date.split("-");
  let valueDate = format(new Date(data[2], data[1], data[0]), "yyyy-MM-dd");
  console.log(valueDate);
  return valueDate;
}

module.exports = { FormatDate };
