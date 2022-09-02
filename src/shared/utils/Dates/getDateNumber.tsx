export const getDayNumber = (date: string) => {
     let day = new Date(date).getDate().toString();
     let mounth = new Date(date).getMonth().toString();
     if (mounth.length === 1) mounth = "0" + mounth;
     return `${day}.${mounth}`;
};
