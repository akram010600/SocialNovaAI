import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Posts from "../pages/Posts";

import MainLayout from "../layouts/MainLayout";


function AppRoutes(){

    return (

        <BrowserRouter>

            <Routes>


                <Route 
                    path="/"
                    element={
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    }
                />


                <Route
                    path="/posts"
                    element={
                        <MainLayout>
                            <Posts />
                        </MainLayout>
                    }
                />


            </Routes>

        </BrowserRouter>

    );

}


export default AppRoutes;