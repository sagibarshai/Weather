import { useState, useEffect } from "react";
export const useFilteredSearch = (
     list: any[] | [],
     searchInput: string,
     fileds: string[]
) => {
     const [filteredSearch, setFilteredSearch] = useState<any[] | []>([]);
     useEffect(() => {
          let returnedArray = [];
          if (searchInput === "") {
               returnedArray = list;
          } else {
               for (let item of list) {
                    if (fileds.length > 0) {
                         for (let filed of fileds) {
                              if (
                                   item[filed]
                                        .toLowerCase()
                                        .includes(searchInput.toLowerCase())
                              ) {
                                   returnedArray.push(item);
                                   break;
                              } else continue;
                         }
                    } else {
                         if (
                              item
                                   .toLowerCase()
                                   .includes(searchInput.toLowerCase())
                         ) {
                              returnedArray.push(item);
                         } else continue;
                    }
               }
          }
          setFilteredSearch(returnedArray);
     }, [list, searchInput]);
     return filteredSearch;
};
