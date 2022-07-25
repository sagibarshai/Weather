export const scrollBarHandler = (
     parantId: string,
     list: [] | string[],
     currentIndex: number,

     setIndex: (x: number) => void
) => {
     const scrollElement = document.getElementById(parantId) as HTMLDivElement;
     if (currentIndex <= 0) {
          scrollElement.scrollTop = 0;
     }
     const myElement = document.getElementById(`${currentIndex}`);
     if (myElement) {
          const topPos = myElement.offsetTop;
          scrollElement.scrollTop = topPos;
     }
     if (currentIndex === list.length) {
          scrollElement.scrollTop = 0;
          setIndex(-1);
     }
};
