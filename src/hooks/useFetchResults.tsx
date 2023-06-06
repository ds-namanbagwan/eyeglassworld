import { useSearchState } from "@yext/search-headless-react";

interface LocationResult {
  id: string;
 
}

let mapLocations: LocationResult[]=[];
const useFetchResults = () => {
  const locationResults = useSearchState(s => s.vertical.results) || [];
  // const Alternateresult=  useSearchState(s => s.vertical.noResults?.allResultsForVertical.results) || [];

  // const resultsCount:any = useSearchState(s => s.vertical.resultsCount) || 0;
  // const limit:any = useSearchState(s => s.vertical.limit) || 0;
  const offset: number = useSearchState(s => s.vertical.offset) || 0;

  if (offset == 0) {
    mapLocations = [];
  }

  if (locationResults.length > 0) {
    for (let i = 0; i < locationResults.length; i++) {
      const location = locationResults[i];
      // console.log('location',location.id);
      let pushStatus = true;
      if (mapLocations.length > 0) {
        for (let m = 0; m < mapLocations.length; m++) {
          const existLocation = mapLocations[m];
          if (location.id == existLocation.id) {
            pushStatus = false;
          }
        }
      }
      if (pushStatus) {
        mapLocations.push(location);
      }
    }
  }
  // else{    for (let i = 0; i < Alternateresult.length; i++) {
  //     const location = Alternateresult[i];
  //     // console.log('location',location.id);
  //     let pushStatus = true;
  //     if(mapLocations.length > 0){
  //       for (let m = 0; m < mapLocations.length; m++) {
  //         const existLocation = mapLocations[m];
  //         if(location.id == existLocation.id){
  //           pushStatus = false;
  //         }
  //       }
  //     }
  //     if(pushStatus){
  //        mapLocations.push(location);
  //     }    
  //   }
  // }

  const mapLocationsResults = mapLocations;
  // console.log('mapLocationsResults',mapLocationsResults);
  return mapLocationsResults;
};

export default useFetchResults;