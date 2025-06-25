import {Link, NavLink } from "react-router-dom"

function Nav() {
return(
<nav>
    <h1><Link to='/'>Gestor de Tareas</Link></h1>
    <ul>
    <li><NavLink to='/'>Inicio</NavLink></li>
    <li><NavLink to='/Tasks'>Tareas</NavLink></li>
    </ul>
</nav>)
}

export default Nav