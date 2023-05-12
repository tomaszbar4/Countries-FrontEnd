import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { KeyboardBackspace } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function CountryDetails({ data, darkMode }) {

    const { name } = useParams()
    const specificCountryData = data.filter(country => {
        return country.name === name
    })

    { console.log(specificCountryData) }

    return (
        <div>
            <Link to=".."><button className={darkMode ? "back-btn dark" : "back-btn"}><KeyboardBackspace sx={{ fontSize: '1rem' }} />Back</button></Link>
            <div className={darkMode ? "country-description-container dark" : "country-description-container"}>
                <div className="country-description-img-container"><img className="country-description-img" src={specificCountryData[0].flags.svg} /></div>
                <div className="country-description-details"><h1>{name}</h1>
                    <div><span className="bold">Native Name: </span>{specificCountryData[0].nativeName}</div>
                    <div><span className="bold">Population: </span>{specificCountryData[0].population.toLocaleString()}</div>
                    <div><span className="bold">Region: </span>{specificCountryData[0].region}</div>
                    <div><span className="bold">Sub Region: </span>{specificCountryData[0].subregion}</div>
                    <div><span className="bold">Capital: </span>{specificCountryData[0].capital}</div>
                    <div><span className="bold">Top Level Domain: </span>{specificCountryData[0].topLevelDomain}</div>
                    <div className="flex"><span className="bold">Currencies: </span><div>{specificCountryData[0].currencies.map((currency, index) => {
                        return currency.name
                    })}</div></div>
                    <div className="flex"><span className="bold">Languages: </span><div className="language-list">{specificCountryData[0].languages.map((language, index) => {
                        return index === specificCountryData[0].languages.length - 1 ? <span key={index}>{language.name}</span> : <span key={index}>{language.name}, </span>
                    })}</div></div>
                </div>


            </div>
        </div>
    )
}
