import React, { useEffect, useState } from "react";
import Api from "../services/Api";
import LoadingIndicator from "../components/LoadingIndicator";
import Container from "../components/Container";

const Cliente = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [clientesAll, setClientesAll] = useState([]);
    
    useEffect(() => {
        setIsLoading(true)
        Api.get("clientes")
            .then(res => {
                setClientesAll(res.data)
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false)
            });
    }, []);

    const handleDeleteClient = (idCliente) => {
        setIsLoading(true)
        Api.delete(`clientes/${26}`)
            .then(res => {
                console.log(res)
                console.log(res.message)
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false)
            });
    }

    const handleEditClient = (idCliente) => {
        setIsLoading(true)
        Api.put("clientes/" + idCliente, {
                nome: 'Teste',
                cpf: 12312312312
            })
            .then(res => {
                console.log(res)
                console.log(res.message)
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false)
            });
    }

    return (
        <Container children={
            <div>
                {isLoading &&  <LoadingIndicator />}
                <div>
                    <p>Clientes</p>
                </div>
                <div className="overflow-auto max-h-screen">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Cpf</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"></th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clientesAll.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{cliente.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{cliente.cpf}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                        <button onClick={ () =>handleEditClient(cliente.id)}>Edit</button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                        <button onClick={() => handleDeleteClient(cliente.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        }/>
    );
}

export default Cliente;