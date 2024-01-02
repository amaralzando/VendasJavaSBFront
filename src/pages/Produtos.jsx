import React, { useEffect, useState } from "react";
import Api from "../services/Api";
import LoadingIndicator from "../components/LoadingIndicator";
import Container from "../components/Container";
import { Button, Modal } from "react-bootstrap";

const Produtos = () => {
    const [isModalVisible, setIsModalVisible] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [produtosAll, setProdutosAll] = useState([]);
    const [putProdutos, setPutProdutos] = useState({})
    const [postProdutos, setPostProdutos] = useState({})
    
    useEffect(() => {
        setIsLoading(true)
        Api.get("produtos")
            .then(res => {
                setProdutosAll(res.data)
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false)
            });
    }, []);

    const handleDeleteProduct = (id) => {
        setIsLoading(true)
        Api.delete(`produtos/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setProdutosAll((prevProducts) =>
                        prevProducts.filter((Product) => Product.id !== id)
                    );
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false)
            });
    }

    const handleEditPostProduct = (event) => {
        console.log(event.target.value)
        setPostProdutos({
            ...postProdutos,
            [event.target.name]: event.target.value
        })
    }

    const handleEditProduct = (event) => {
        console.log(event.target.value)
        setPutProdutos({
            ...putProdutos,
            [event.target.name]: event.target.value
        })
    }

    const handlePostProduct = () => {
        setIsLoading(true)
        Api.post("produtos", postProdutos)
        .then(res => {
            setProdutosAll([...produtosAll, res.data]);
        }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false)
                setIsModalVisible(null)
                setPostProdutos(null)
            });
    }

    const handleModalEditar = (produto) => {
        setPutProdutos(produto)
        setIsModalVisible("EditarProduto")
    }

    const handlePutProduct = () => {
        setIsLoading(true)
        console.log(putProdutos)
        Api.put(`produtos/${putProdutos.id}`, {
            descricao: putProdutos.descricao,
            preco: putProdutos.preco
        })
        .then(res => {
            if (res.status === 200) {
                setProdutosAll((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === putProdutos.id ? { ...product, ...putProdutos } : product
                    )
                );
                setIsModalVisible(null);
            }
        }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false)
                setPutProdutos(null)
            });
    }

    return (
        <Container children={
            <div>
                {isLoading &&  <LoadingIndicator />}
                <div className="">
                    <p className="text-2xl font-bold">Produtos</p>
                </div>
                <div className="flex space-x-4 mb-4">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsModalVisible("CriarProduto")}>
                        Criar Produto
                    </button>
                </div>
                <div className="overflow-auto max-h-96">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Descricao</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Preco</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"></th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {produtosAll.map((produto) => (
                                <tr key={produto.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{produto.descricao}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{produto.preco}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" 
                                            onClick={ () => handleModalEditar(produto)}>Edit</button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" 
                                            onClick={() => handleDeleteProduct(produto.id)}>Delete</button>
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
                            isModalVisible === "CriarProduto" ?
                                <div>
                                    <Modal.Header>
                                        <Modal.Title className="text-2xl font-bold">
                                            Criar Produto
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                                            type="text" 
                                            placeholder="Digite o Nome:"
                                            onChange={(event) => handleEditPostProduct(event)} 
                                            name="descricao" 
                                            value={postProdutos.descricao}/>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                                            type="cpf" 
                                            placeholder="Digite o Preco:"
                                            onChange={(event) => handleEditPostProduct(event)} 
                                            name="preco" 
                                            value={postProdutos.preco}/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setIsModalVisible(null)}>Fechar</Button>
                                        <Button variant="primary" onClick={() => handlePostProduct()}>Salvar</Button>
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
                                            placeholder="Digite o Nome:"
                                            onChange={(event) => handleEditProduct(event)} 
                                            name="descricao" 
                                            value={putProdutos.descricao}/>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                                            type="value" 
                                            placeholder="Digite o Preco:"
                                            onChange={(event) => handleEditProduct(event)} 
                                            name="preco" 
                                            value={putProdutos.preco}/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setIsModalVisible(null)}>Fechar</Button>
                                        <Button variant="primary" onClick={() => handlePutProduct()}>Salvar</Button>
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

export default Produtos;