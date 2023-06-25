function CountryCard(props) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={props.country.flags.png} alt="" />
      </div>
      <div className="card-text">
        <h3>{props.country.name.common}</h3>
        <p>
          <strong>Population:</strong>
          {" " +
            props.country.population
              .toLocaleString(undefined, { useGrouping: false })
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </p>
        <p>
          <strong>Region:</strong>
          {" " + props.country.region}
        </p>
        <p>
          <strong>Capital:</strong>
          {" " + props.country.capital}
        </p>
      </div>
    </div>
  );
}

export default CountryCard;
