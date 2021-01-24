const CountryList = ({ countries, handleCountryClick }) => {
  if (countries.length > 10) {
    return <p>Please be more specific</p>;
  } else if (countries.length === 0) {
    return <p>Enter a term to search for countries:</p>;
  } else if (countries.length === 1) {
    return <p></p>;
  } else {
    return (
      <ul>
        {countries.map((country) => {
          return (
            <li key={country.alpha2Code}>
              {country.name}
              <button onClick={() => handleCountryClick(country)}>Show</button>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default CountryList;
