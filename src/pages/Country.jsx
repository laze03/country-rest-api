import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Context } from "../Context";
import { Link } from "react-router-dom";

function info(label, value) {
  return (
    <p>
      <strong>{label}:</strong>
      {" " + value}
    </p>
  );
}

function Country() {
  const [countryData, setCountryData] = useState({});
  const { countryName, setCountryName, countryList, setCountryList } =
    useContext(Context);

  useEffect(() => {
    console.log("Country Name: ");
    console.log(countryName);
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => {
        setCountryData(response.data[0]);
      });
  }, [countryName]);

  return (
    countryData.name && (
      <div className="country-page">
        <Link className="link" to="/">
          {" "}
          <AiOutlineArrowLeft /> Back
        </Link>
        <div className="country">
          <div className="country-flag">
            <img src={countryData.flags.png} alt="" />
          </div>
          <div className="country-info">
            <h1>{countryData.name.common}</h1>
            <div className="country-text">
              <div className="country-info-left">
                {info(
                  "Native Name",
                  Object.values(countryData.name.nativeName)[0].common
                )}
                {info(
                  "Population",
                  countryData.population
                    .toLocaleString(undefined, { useGrouping: false })
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                )}
                {info("Region", countryData.region)}
                {info("Sub Region", countryData.subregion)}
                {info("Capital", countryData.capital)}
              </div>
              <div className="country-info-right">
                {countryData.tld &&
                  info("Top Level Domain", countryData.tld[0])}
                {info(
                  "Currencies",
                  Object.values(countryData.currencies)
                    .map((currency) => currency.name)
                    .join(", ")
                )}
                {info(
                  "Languages",
                  Object.values(countryData.languages)
                    .map((language) => language)
                    .join(", ")
                )}
              </div>
            </div>
            {countryData.borders && (
              <div className="country-info-bottom">
                <p>
                  <strong>Border Countries:</strong>
                </p>

                <div className="country-info-bottom-buttons">
                  {countryData.borders.map((border) => {
                    return (
                      <Link
                        key={border}
                        to={`/country}}`}
                        className="link border-button"
                        onClick={(e) => {
                          e.preventDefault();
                          setCountryName(countryList[border]);
                        }}
                      >
                        {countryList[border]}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Country;
