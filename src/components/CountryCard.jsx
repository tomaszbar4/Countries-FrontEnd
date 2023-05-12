import React from 'react'
import { Link } from 'react-router-dom'

export default function CountryCard({ darkMode, name, population, region, capital, flag }) {
    return (
        <Link to={name}>
            <div className="country-card-item">
                <img src={flag} />
                <div className={darkMode ? "country-details dark" : "country-details"}>
                    <h2 className="bold">{name}</h2>
                    <p><span className="semibold">Population:</span> {population.toLocaleString()}</p>
                    <p><span className="semibold">Region:</span> {region}</p>
                    <p><span className="semibold">Capital:</span> {capital}</p>
                </div>
            </div>
        </Link>
    )
}
