import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import Tasks from "./components/Tasks/Tasks"

function App() {
  return (
<BrowserRouter>
<Nav/>
<Routes>
   <Route path="/" element={<Home/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/tasks" element={<Tasks/>}></Route>
</Routes>
</BrowserRouter>
  )
}

export default App
