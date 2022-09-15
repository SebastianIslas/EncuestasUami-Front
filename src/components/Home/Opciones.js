import React from 'react'
import { Link } from 'react-router-dom'

export default function Opciones() {
  return (
    <>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/">Estadísticas</Link></li>
        <li><Link to="/">UEAs Abiertas</Link></li>
    </>
  )
}
