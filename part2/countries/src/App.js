import React, { useEffect, useState } from 'react'
import axios from "axios"

const Country = ({ country }) => {
  const weatherApiKey = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})
  const hook = () => {
    axios.get(`http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${country.capital}`)
      .then(response => setWeather(response.data.current))
  }
  useEffect(hook, [])

  const weatherIcons = weather.weather_icons || []

  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width={100} alt={`${country.name} flag`}></img>
      <h3>Weather in {country.capital}</h3>
      <div><b>Temperature: </b>{weather.temperature || ""}</div>
      {weatherIcons.map(icon => <img src={icon} key={icon} alt={icon} />)}
      <div><b>Wind: </b>{weather.wind_speed || ""} mph direction {weather.wind_dir || ""}</div>
    </div>
  )
}

const App = () => {
  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => setCountries(response.data))
  }
  useEffect(hook, [])

  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const searchQueryChange = event => setSearchQuery(event.target.value)

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()))

  let searchResults = "Too many matches, specify another filter"

  if (filteredCountries.length === 1) {
    const [country] = filteredCountries
    searchResults = <Country country={country} />
  } else if (filteredCountries.length < 10) {
    searchResults = filteredCountries.map(country =>
      <div key={country.name}>
        {country.name}
        <button onClick={() => setSearchQuery(country.name)}>Show</button>
      </div>
    )
  }

  return (
    <div>
      <div>Find countries: <input value={searchQuery} onChange={searchQueryChange} /></div>
      {searchResults}
    </div>
  )
}

export default App
