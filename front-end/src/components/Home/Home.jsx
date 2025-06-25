import { Link } from "react-router-dom"
function Home(){
  return(
    <div>
        <h1>Bienvenido al Gestor de Tareas</h1>
        <p>Organiza tus tareas de manera eficiente y aumenta tu productividad con nuestra aplicación </p>
        <button><Link to={"/register"}>Comenzar</Link></button>
    </div>
  )

}
export default Home