import { Outlet } from "react-router-dom"
import { Footer } from "../Ui/Footer"
import { Header } from "../Ui/Header"

export const AppLayout = () =>{
    return(
        <>
        <Header/>
         <Outlet/>
        <Footer/>
        </>
    )
}