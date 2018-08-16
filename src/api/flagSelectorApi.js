import flagData from '../resources/continents.json';

export const getContinents = () => {
  return flagData.map(cont => ({"name": cont.continent, "isSelected": false}));
};

export const getCountriesForContinent = (continentName) => {
  console.log("getCountriesForContinent -> ", continentName);
  return (
    flagData.filter( count => count.continent === continentName )
              .map(d => d.countries
                .map( country => { country.isSelected = false; return country;})
              )[0]
  )
}
