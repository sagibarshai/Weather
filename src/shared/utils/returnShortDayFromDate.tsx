import { weekdays } from "./convertDateToText";
const shortWeekdays = weekdays.map((day) => day.slice(0, 3));
export const returnShortDayFromDate = (date: Date) => {
     const day = new Date(date).getDay();
     const shortDayString = shortWeekdays.find((_, index) => index === day);
     return shortDayString;
};
