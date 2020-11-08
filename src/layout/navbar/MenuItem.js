import React from 'react'
import styles from './MenuItem.module.css'
import { Link } from 'react-router-dom'


const MenuItem = ({ to, children }) => {
    return (
        <li className={styles.item}>
            <Link to={to}>
                {children}
            </Link>
        </li>
    )
}

export default MenuItem
