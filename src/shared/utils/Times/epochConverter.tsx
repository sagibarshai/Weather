const changePmTime = (time: string) => {
     let firstTwoLetters = time[0] + time[1];
     let sumOfTwoLetters: number;
     if (firstTwoLetters.startsWith("0")) sumOfTwoLetters = Number(time[1]);
     else sumOfTwoLetters = Number(firstTwoLetters);
     let returenTime = Number(sumOfTwoLetters + 12).toString();
     for (let i = 0; i < time.length; i++) {
          if (i === 0 || i === 1) continue;
          returenTime += time[i];
     }
     if (time === "12:00") returenTime = "00:00";
     return returenTime;
};
export const epochConverter = (time: number) => {
     const date = new Date(time * 1000).toLocaleString();
     let currentTime: string | string[] = date.split(",")[1];
     currentTime = currentTime.split(" ").toString();
     currentTime = currentTime.split(",");
     let isPm: boolean = currentTime[2] === "PM";
     currentTime = currentTime[1];
     currentTime = currentTime.slice(0, currentTime.length - 3);
     if (currentTime.length === 4) currentTime = "0" + currentTime;
     if (currentTime === "12:00") {
          let checkIfPm = new Date((time - 100) * 1000).toLocaleString();
          if (checkIfPm.includes("PM")) isPm = true;
     }
     if (isPm) currentTime = changePmTime(currentTime);
     return currentTime;
};
