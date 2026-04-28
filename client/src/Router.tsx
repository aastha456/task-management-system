import {Route,Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const Router = () => {
    return (
        <Routes>

            <Route index element={<Home/>}/>


            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="*" element={<h1>Not found</h1>}/>


        </Routes>
    )
}

export default Router;