import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.iso639_1}>{language.name}</li>;
        })}
      </ul>
      <img width="200" src={country.flag} alt="Flag of: {country.name}" />
      <WeatherInfo city={country.capital} />
    </div>
  );
};

export default CountryInfo;
