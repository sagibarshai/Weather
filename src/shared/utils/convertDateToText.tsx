export const weekdays = [
     "Sunday",
     "Monday",
     "Tuesday",
     "Wednesday",
     "Thursday",
     "Friday",
     "Saturday",
];
const months = [
     "Jan",
     "Feb",
     "Mar",
     "Apr",
     "May",
     "Jun",
     "Jul",
     "Aug",
     "Sep",
     "Oct",
     "Nov",
     "Dec",
];
const returnTimeAmPm = (hours: number, minutes: number) => {
     if (hours <= 12) return `${hours}:${minutes}am`;
     else {
          hours = hours - 12;
          return `${hours}:${minutes}pm`;
     }
};
export const convertDateToText = () => {
     let now = new Date();
     let day = now.getDay();
     let dayString = weekdays.find((_, index) => index === day); //day
     let monthNumber = now.getMonth();
     let monthString = months.find((_, index) => index === monthNumber); // month
     let date = now.getDate(); // date
     let year = now.getFullYear();
     let hours = now.getHours();
     let minutes = now.getMinutes();
     let minutes2Letters = Number(
          minutes.toString().length === 1 ? "0" + minutes : minutes
     );
     let timeAmPm = returnTimeAmPm(hours, minutes2Letters);
     return `${dayString}, ${date}-${monthString}-${year}, ${timeAmPm}`;
};
