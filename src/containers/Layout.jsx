import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Layout() {
    return (
        <div className="flex flex-col w-screen h-screen">
            <div className="h-1/12 flex flex-row bg-Nav px-10 py-2 place-items-center"> 
                <div className="w-28 ml-8">
                    <Link to="/"><img src={Logo} alt="Logo" /></Link>
                </div>
                <div className="flex flex-row place-items-center justify-center space-x-5 text-xl mr-8">
                    <Link className="hover:bg-Primary p-2 rounded-xl font-bold" to="/clientes">Clientes</Link>
                    <Link className="hover:bg-Primary p-2 rounded-xl font-bold" to="/produtos">Produtos</Link>      
                    <Link className="hover:bg-Primary p-2 rounded-xl font-bold" to="/pedidos">Pedidos</Link>
                    <Link className="hover:bg-Primary p-2 rounded-xl font-bold" to="/itempedido">ItemPedido</Link>
                </div> 
            </div>
            {/* ----------------Outlet----------------------- */}
            <div className="h-full bg-pink-50"> 
                <Outlet /> 
            </div>
            {/* ----------------Footer------------------------- */}
            <div className="h-1/12 bg-Primary w-full text-center px-10 py-2 text-white"> 
                <p>GrupoGbi</p>
            </div>
        </div>
    )
}
