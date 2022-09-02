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
const returnTimeAmPm = (hours: number, minutes: number | string) => {
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
     let minutes: string | number = now.getMinutes();

     if (minutes < 10) minutes = "0" + minutes;

     let timeAmPm = returnTimeAmPm(hours, minutes);
     return `${dayString}, ${date}-${monthString}-${year}, ${timeAmPm}`;
};
