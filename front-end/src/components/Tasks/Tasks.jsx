import { Link } from "react-router-dom"
const Tasks = ({}) =>{
return(
    <div>
        {/* <p>{task.name}</p> */}
        <button><Link to={'/TasksDetail'}>Ver mas</Link></button>
    </div>
)
}
export default Tasks 