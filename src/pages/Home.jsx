import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import CountryCard from "../components/CountryCard";
import { Context } from "../Context";
import { Link } from "react-router-dom";

function Home() {
  const { countryName, setCountryName, countryList, setCountryList, dark } =
    useContext(Context);
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [colors, setColors] = useState({});

  const [countriesInContinent, setCountriesInContinent] = useState({
    Asia: [],
    Europe: [],
    Africa: [],
    Americas: [],
    Oceania: [],
  });
  useEffect(() => {
    if (!dark) {
      setColors({
        textColor: "hsl(200, 15%, 8%)",
        backgroundColor: "hsl(0, 0%, 98%)",
        inputColor: "hsl(0, 0%, 52%)",
        elementColor: "hsl(0, 0%, 100%)",
      });
    } else {
      setColors({
        textColor: "hsl(0, 0%, 100%)",
        backgroundColor: "hsl(207, 26%, 17%)",
        inputColor: "hsl(209, 23%, 22%)",
        elementColor: "hsl(209, 23%, 22%)",
      });
    }
  }, [dark]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setData(response.data);
        setDisplayedData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const options = data.reduce((acc, country) => {
      acc[country.cca3] = country.name.common;
      return acc;
    }, {});
    setCountryList(options);

    const categorizedCountries = {
      Asia: [],
      Europe: [],
      Africa: [],
      Americas: [],
      Oceania: [],
    };

    data.forEach((country) => {
      const continent = country.region;
      if (categorizedCountries.hasOwnProperty(continent)) {
        categorizedCountries[continent].push(country);
      }
    });
    setCountriesInContinent(categorizedCountries);
  }, [data]);

  return (
    <>
      <div className="header">
        <Select
          className="search-bar"
          options={Object.values(countryList).map((country) => {
            return {
              value: country,
              label: country,
            };
          })}
          placeholder="Search for a country..."
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: colors.elementColor,
              color: "white",
            }),
            option: (styles) => ({
              ...styles,
              backgroundColor: colors.elementColor,
              color: colors.textColor,
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: colors.elementColor,
              color: colors.textColor,
            }),
            placeholder: (styles) => ({
              ...styles,
              color: colors.textColor,
            }),
            input: (styles) => ({
              ...styles,
              color: colors.textColor,
            }),
            singleValue: (styles) => ({
              ...styles,
              color: colors.textColor,
            }),
          }}
          onChange={(e) => {
            axios
              .get(`https://restcountries.com/v3.1/name/${e.value}`)
              .then((response) => {
                setDisplayedData(response.data);
              });
          }}
        />

        <button
          className="all-button"
          onClick={(e) => {
            e.preventDefault();
            setDisplayedData(data);
          }}
        >
          All
        </button>

        <Select
          className="reagion-bar"
          options={Object.keys(countriesInContinent).map((country) => {
            return { value: country, label: country };
          })}
          placeholder="Search for a region..."
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: colors.elementColor,
              color: "white",
            }),
            option: (styles) => ({
              ...styles,
              backgroundColor: colors.elementColor,
              color: colors.textColor,
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: colors.elementColor,
              color: colors.textColor,
            }),
            placeholder: (styles) => ({
              ...styles,
              color: colors.textColor,
            }),
            input: (styles) => ({
              ...styles,
              color: colors.textColor,
            }),
            singleValue: (styles) => ({
              ...styles,
              color: colors.textColor,
            }),
          }}
          onChange={(e) => {
            axios
              .get(`https://restcountries.com/v3.1/region/${e.value}`)
              .then((response) => {
                setDisplayedData(response.data);
              });
          }}
        />
      </div>
      <Link to="/about"></Link>
      <div className="main">
        {displayedData.map((country, index) => {
          return (
            <Link
              key={country.name.common}
              to={`/${"country"}`}
              onClick={() => {
                setCountryName(country.name.common);
              }}
            >
              {" "}
              <CountryCard key={index} country={country} />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Home;
