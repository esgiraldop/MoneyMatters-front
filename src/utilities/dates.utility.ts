interface IMonthDict<T> {
  [Key: string]: T;
}

const monthDict: IMonthDict<string> = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export const formatDate = (d: Date): string => {
  const mm = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${monthDict[mm]} ${dd}, ${yyyy}`;
};

export const getFirstAndLastDayOfMonth = (
  date: Date = new Date()
): { startDate: string; endDate: string } => {
  //TODO: implement time zones. For now, i'm ignoring them
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  return {
    startDate: formatDate(firstDay),
    endDate: formatDate(lastDay),
  };
};

export const getCurrentDate = (): string => {
  //TODO: Implement time zones
  var today = new Date();

  return formatDate(today);
};
