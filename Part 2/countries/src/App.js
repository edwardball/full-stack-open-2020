import axios from "axios";
import { useEffect, useState } from "react";
import CountryInfo from "./components/CountryInfo";
import CountryList from "./components/CountryList";

function App() {
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [currentCountry, setCurrentCountry] = useState({});

  const handleCountryInput = (e) => {
    setCountrySearchTerm(e.target.value);
    let filteredCountries = filterCountryList(countryList, e.target.value);
    if (filteredCountries.length === 1) {
      if (filteredCountries[0].alpha2Code != currentCountry.alpha2Code) {
        axios
          .get(
            `https://restcountries.eu/rest/v2/alpha/${filteredCountries[0].alpha2Code}`
          )
          .then((response) => setCurrentCountry(response.data));
      }
    } else {
      setCurrentCountry({});
    }
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log(response.data);
      setCountryList(response.data);
    });
  }, []);

  const filterCountryList = (countries, searchTerm) => {
    return countries.filter((country) => {
      return country.name.toLowerCase().includes(searchTerm);
    });
  };

  let filteredCountries = filterCountryList(countryList, countrySearchTerm);

  const handleCountryClick = (country) => {
    setCurrentCountry(country);
  };

  if (typeof currentCountry.alpha2Code !== "undefined") {
    return (
      <div>
        <input onChange={handleCountryInput} type="text" />
        <CountryList
          handleCountryClick={handleCountryClick}
          countries={filteredCountries}
        />
        <CountryInfo country={currentCountry} />
      </div>
    );
  } else {
    return (
      <div>
        <input onChange={handleCountryInput} type="text" />
        <CountryList
          handleCountryClick={handleCountryClick}
          countries={filteredCountries}
        />
      </div>
    );
  }
}

export default App;
