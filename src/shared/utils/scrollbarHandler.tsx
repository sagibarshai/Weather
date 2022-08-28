import { Result } from "../../components/SearchBox";
export const scrollBarHandler = (
     parantId: string,
     list: [] | Result[],
     currentIndex: number,

     setIndex: (x: number) => void
) => {
     const scrollElement = document.getElementById(parantId) as HTMLDivElement;
     if (!scrollElement) return;
     if (currentIndex <= 0) {
          scrollElement.scrollTop = 0;
     }
     const myElement = document.getElementById(`${currentIndex}`);
     if (myElement) {
          const topPos = myElement.offsetTop;
          scrollElement.scrollTop = topPos;
     }
     if (list && currentIndex === list.length) {
          scrollElement.scrollTop = 0;
          setIndex(-1);
     }
};
