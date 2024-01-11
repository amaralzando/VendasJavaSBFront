import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../assets/png/logo.png";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen">
            <header className="flex items-center bg-navy-500 px-10 py-2 text-black"> 
                <div className="w-12 ml-8">
                    <Link to="/"><img src={Logo} alt="Logo" /></Link>
                </div>
                <nav className="flex flex-row justify-center space-x-5 text-xl ml-auto">
                    <Link className="hover:bg-blue-500 p-2 rounded-xl font-bold" to="/clientes">Clientes</Link>
                    <Link className="hover:bg-blue-500 p-2 rounded-xl font-bold" to="/produtos">Produtos</Link>      
                    <Link className="hover:bg-blue-500 p-2 rounded-xl font-bold" to="/loja">Loja</Link>
                    <Link className="hover:bg-blue-500 p-2 rounded-xl font-bold" to="/pedidos">Pedidos</Link>
                </nav> 
            </header>
            {/* ----------------Outlet----------------------- */}
            <main className="flex-grow bg-white"> 
                <Outlet /> 
            </main>
            {/* ----------------Footer------------------------- */}
            <footer className="bg-blue-500 text-center px-10 py-2 text-white"> 
                <p>GrupoGbi</p>
            </footer>
        </div>
    )
}