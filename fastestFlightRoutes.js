let flightAtAirports = [2, 1, 2, 3, 1];
let firstFlight =
  flightAtAirports.length > 0
    ? { units: flightAtAirports[0], position: 0 }
    : [];
let initialFlightsRoutes = [[firstFlight]]; //Initial flight route

if (flightAtAirports.length === 0) console.log("No flights found");
else if (flightAtAirports.length === 1)
  console.log("You are already at the destination");
else getRoutesFromLastAirport(initialFlightsRoutes);

//Recursive function to get possible routes from the last airport plane
//Initially the 'flightRoutes' will be the first flight route [[2]]; bases on example [2, 1, 2, 3, 1];
//Find the possible routes from 2 i.e. [[2,1],[2,2]]
//Again find the possible routes from 'plane 1 via route [2,1]' and 'plane 2 via route [2,2]'
//     -> [[2,1,2], [2,2,3], [2,2,1]]
//     -> Since the destination airport is reached print the route [2,2,1]
function getRoutesFromLastAirport(flightRoutes) {
  let newRoutes = [];
  let isDestination = false; //check if the destination airport is reached

  flightRoutes.forEach((flightRoute) => {
    //For every flight route [2,1] [2,2]
    let lastFlightDetails = flightRoute[flightRoute.length - 1]; //Get the last flight info from the route -> 1 for [2,1] and 2 for [2,2]

    for (
      let unitsTravelled = 1;
      unitsTravelled <= lastFlightDetails.units && unitsTravelled > 0;
      unitsTravelled++
    ) {
      let newRoute = new Array(...flightRoute);
      newRoute.push({
        units: flightAtAirports[lastFlightDetails.position + unitsTravelled],
        position: lastFlightDetails.position + unitsTravelled,
      });
      newRoutes.push(newRoute); //New route for [2,1] and [2,2] will be [2,1,2] [2,2,3] [2,2,1]

      //Check if the destination airport
      if (
        lastFlightDetails.position + unitsTravelled ===
        flightAtAirports.length - 1
      ) {
        isDestination = true;
        console.log(
          "Fastest route is -> ",
          newRoute.map((flightDetail) => flightDetail.units)
        );
        break;
      }
    }
  });
  if (newRoutes.length === 0)
    //If no routes are possible
    return console.log("Unable to reach the destination via any route");
  if (isDestination === false) getRoutesFromLastAirport(newRoutes); //If the destination airport is not reached then continue to find the route
}

//Run the code using terminal command -> node fastestFlightRoutes.js
