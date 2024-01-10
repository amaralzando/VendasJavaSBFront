import React, { useEffect, useState } from "react";
import Api from "../services/Api";
import LoadingIndicator from "../components/LoadingIndicator";
import Container from "../components/Container";
import { Button, Modal } from "react-bootstrap";

const Cliente = () => {
    const [isModalVisible, setIsModalVisible] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [clientesAll, setClientesAll] = useState([]);
    const [putCLiente, setPutCliente] = useState({})
    const [postCliente, setPostCliente] = useState({
        nome: "",
        cpf: ""
    })
    
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
        Api.delete(`clientes/${idCliente}`)
            .then(res => {
                if (res.status === 200) {
                    setClientesAll((prevClients) =>
                        prevClients.filter((client) => client.id !== idCliente)
                    );
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false)
            });
    }

    const handleEditPostClient = (event) => {
        console.log(event.target.value)
        setPostCliente({
            ...postCliente,
            [event.target.name]: event.target.value
        })
    }

    const handleEditClient = (event) => {
        console.log(event.target.value)
        setPutCliente({
            ...putCLiente,
            [event.target.name]: event.target.value
        })
    }

    const handlePostClient = () => {
        setIsLoading(true)
        Api.post("clientes", postCliente)
        .then(res => {
            setClientesAll([...clientesAll, res.data]);
        }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false)
                setIsModalVisible(null)
                setPostCliente(null)
            });
    }

    const handleModalEditar = (cliente) => {
        setPutCliente(cliente)
        setIsModalVisible("EditarUsuario")
    }

    const handlePutClient = () => {
        setIsLoading(true)
        console.log(putCLiente)
        Api.put(`clientes/${putCLiente.id}`, {
            nome: putCLiente.nome,
            cpf: putCLiente.cpf
        })
        .then(res => {
            if (res.status === 200) {
                setClientesAll((prevClients) =>
                    prevClients.map((client) =>
                        client.id === putCLiente.id ? { ...client, ...putCLiente } : client
                    )
                );
                setIsModalVisible(null);
            }
        }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false)
                setPutCliente(null)
            });
    }

    return (
        <Container children={
            <div className="p-6">
                {isLoading &&  <LoadingIndicator />}
                <div className="mb-4">
                    <p className="text-2xl font-bold">Clientes</p>
                </div>
                <div className="flex space-x-4 mb-4">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsModalVisible("CriarUsuario")}>
                        Criar Cliente
                    </button>
                </div>
                <div className="min-h-2/3">
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
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" 
                                            onClick={ () => handleModalEditar(cliente)}>Edit</button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" 
                                            onClick={() => handleDeleteClient(cliente.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal
                    size="lg"
                    centered
                    show={isModalVisible != null}>
                    <div className="p-6">
                        {
                            isModalVisible === "CriarUsuario" ?
                                <div>
                                    <Modal.Header>
                                        <Modal.Title className="text-2xl font-bold">
                                            Criar Produto
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                                            type="text" 
                                            placeholder="Digite o nome:"
                                            onChange={(event) => handleEditPostClient(event)} 
                                            name="nome" 
                                            value={postCliente.nome}/>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                                            type="cpf" 
                                            placeholder="Digite o cpf:"
                                            onChange={(event) => handleEditPostClient(event)} 
                                            name="cpf" 
                                            value={postCliente.cpf}/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setIsModalVisible(null)}>Fechar</Button>
                                        <Button variant="primary" onClick={() => handlePostClient()}>Salvar</Button>
                                    </Modal.Footer>
                                </div>
                            :
                            isModalVisible === "EditarUsuario" ?
                                <div>
                                    <Modal.Header>
                                        <Modal.Title className="text-2xl font-bold">
                                            Editar Produto
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                                            type="text" 
                                            placeholder="Digite o nome:"
                                            onChange={(event) => handleEditClient(event)} 
                                            name="nome" 
                                            value={putCLiente.nome}/>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                                            type="cpf" 
                                            placeholder="Digite o cpf:"
                                            onChange={(event) => handleEditClient(event)} 
                                            name="cpf" 
                                            value={putCLiente.cpf}/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setIsModalVisible(null)}>Fechar</Button>
                                        <Button variant="primary" onClick={() => handlePutClient()}>Salvar</Button>
                                    </Modal.Footer>
                                </div>
                                :
                                null
                        }
                    </div>
                </Modal>
            </div>
        }/>
    );
}

export default Cliente;