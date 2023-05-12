import './App.css'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { FilterCenterFocus, KeyboardArrowDown, Search } from '@mui/icons-material'
import CountryCard from './components/CountryCard'
import CountryDetails from './components/CountryDetails'
import { dark } from '@mui/material/styles/createPalette'
import data from '../data.json'

function SearchBar({ darkMode, changeRegion, toggleExpanded, menuExpanded, searchKeyword, handleChange }) {


  return (
    <div className="filter">
      <div className="search-icon"><Search style={{ color: darkMode ? 'white' : 'black' }} /></div>
      <input type="text" value={searchKeyword} onChange={handleChange} className={darkMode ? "search-bar dark" : "search-bar"} placeholder='Search for a country...'></input>
      <section className="select">
        <div className={darkMode ? "select-main dark" : "select-main"} onClick={toggleExpanded}>Filter by Region
          <KeyboardArrowDown />
        </div>
        <div className={menuExpanded ? "select-secondary expanded" : "select-secondary"} style={{ backgroundColor: darkMode ? "hsl(209, 23%, 22%)" : "white", color: darkMode ? "white" : "black" }}>
          <div onClick={() => changeRegion('Africa')}>Africa</div>
          <div onClick={() => changeRegion('Americas')}>America</div>
          <div onClick={() => changeRegion('Asia')}>Asia</div>
          <div onClick={() => changeRegion('Europe')}>Europe</div>
          <div onClick={() => changeRegion('Oceania')}>Oceania</div>
          <div className="bold" onClick={() => changeRegion('')}>Clear filter</div>
        </div>
      </section>
    </div>
  )
}

function App() {

  const [filteredData, setFilteredData] = useState(data)
  const [darkMode, setDarkMode] = useState(() => {
    const value = localStorage.getItem("darkmode")
    return value !== null ? JSON.parse(value) : false
  })
  const [region, setRegion] = useState('')
  const [menuExpanded, setMenuExpanded] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')

  useEffect(() => {
    filterCountries()
  }, [region, searchKeyword])

  useEffect(() => {
    localStorage.setItem("darkmode", JSON.stringify(darkMode))
  }, [darkMode])


  function filterCountries() {

    function filterByRegion(region) {
      setFilteredData(data.filter(country => {
        return country.region === region
      }))
    }

    function filterByKeyword(keyword) {
      setFilteredData(data.filter(country => {
        return country.name.toLowerCase().includes(keyword.toLowerCase())
      }))
    }

    function filterByRegionAndKeyword(region, keyword) {
      setFilteredData(data.filter(country => {
        return country.region === region && country.name.toLowerCase().includes(keyword.toLowerCase())
      }))
    }

    if (!region && searchKeyword === '') setFilteredData(data)
    if (region === 'Africa' && searchKeyword === '') filterByRegion('Africa')
    if (region === 'Americas' && searchKeyword === '') filterByRegion('Americas')
    if (region === 'Asia' && searchKeyword === '') filterByRegion('Asia')
    if (region === 'Europe' && searchKeyword === '') filterByRegion('Europe')
    if (region === 'Oceania' && searchKeyword === '') filterByRegion('Oceania')
    if (!region && searchKeyword !== '') filterByKeyword(searchKeyword)
    if (region === 'Africa' && searchKeyword) {
      filterByRegionAndKeyword('Africa', searchKeyword)
    }
    if (region === 'Americas' && searchKeyword) {
      filterByRegionAndKeyword('Americas', searchKeyword)
    }
    if (region === 'Asia' && searchKeyword) {
      filterByRegionAndKeyword('Asia', searchKeyword)
    }
    if (region === 'Europe' && searchKeyword) {
      filterByRegionAndKeyword('Europe', searchKeyword)
    }
    if (region === 'Oceania' && searchKeyword) {
      filterByRegionAndKeyword('Oceania', searchKeyword)
    }

  }


  const countriesEls = filteredData.map((country, index) => {
    return (<CountryCard
      key={index}
      name={country.name}
      population={country.population}
      region={country.region}
      capital={country.capital}
      flag={country.flags.png}
      darkMode={darkMode}
    />)
  })

  function toggleExpanded() {
    setMenuExpanded(oldValue => !oldValue)
  }

  function changeRegion(region) {
    setRegion(region)
    toggleExpanded()
  }

  function toggleDarkMode() {
    setDarkMode(oldValue => !oldValue)
  }

  function handleChange(e) {
    setSearchKeyword(e.target.value)
  }

  return (

    <div className={darkMode ? "main-container dark" : "main-container"}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="container">
        <Routes>
          <Route path="/" element={
            (
              <>
                <SearchBar
                  darkMode={darkMode}
                  changeRegion={changeRegion}
                  menuExpanded={menuExpanded}
                  toggleExpanded={toggleExpanded}
                  searchKeyword={searchKeyword}
                  handleChange={handleChange}
                />
                <div className="countries-container">
                  {filteredData.length > 0 ? countriesEls : <div style={{ fontWeight: '600', gridColumn: 'span 4', color: darkMode ? 'white' : 'black' }}>No results found</div>}
                </div>
              </>
            )
          } />
          <Route path="/:name" element={<CountryDetails
            data={data}
            darkMode={darkMode}
          />} />
        </Routes>
      </div>
    </div>

  )
}

export default App
