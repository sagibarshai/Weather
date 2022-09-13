import { SearchResult } from "../../../components/SearchBox/types";

type Action = "+" | "-";

export const scrollBarHandlerYAxis = (
     parantId: string,
     list: [] | SearchResult[],
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
export const scrollBarHandlerXAxis = (
     parantId: string,
     currentId: string,
     action: Action
) => {
     const scrollElement = document.getElementById(parantId) as HTMLDivElement;
     const myElement = document.getElementById(`${currentId}`);
     if (myElement) {
          const leftPos = myElement.offsetWidth;
          if (action === "+") scrollElement.scrollLeft += leftPos;
          else if (action === "-") scrollElement.scrollLeft -= leftPos;
     }
};
