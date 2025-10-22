import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Register from "./Pages/register";
import Login from "./Pages/login";
import Header from "./Components/Header/header";

function App(){

    return (
        <BrowserRouter>
            < Header />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    );

}

export default App;

