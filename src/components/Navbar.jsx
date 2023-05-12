import React from 'react'
import { DarkMode } from '@mui/icons-material'

export default function Navbar({ darkMode, toggleDarkMode }) {
    return (
        <nav className={darkMode ? "navbar dark" : "navbar"}>
            <ul className="nav-menu">
                <li className="nav-menu-item bold">Where in the world?</li>
                <li className="nav-menu-item" onClick={toggleDarkMode}>
                    <span><DarkMode /></span>
                    Dark Mode
                </li>
            </ul>
        </nav>
    )
}
