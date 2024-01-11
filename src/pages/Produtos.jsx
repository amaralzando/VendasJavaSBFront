import React, { useEffect, useState } from "react";
import Api from "../services/ApiProduto";
import LoadingIndicator from "../components/LoadingIndicator";
import Container from "../components/Container";
import { Button, Modal } from "react-bootstrap";

import FotoTeste from "../assets/FotoTeste.jpg";

const Produtos = () => {
    const [isModalVisible, setIsModalVisible] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [produtosAll, setProdutosAll] = useState([]);
    const [putProdutos, setPutProdutos] = useState({})
    const [postProdutos, setPostProdutos] = useState({})
    
    useEffect(() => {
        setIsLoading(true)
        Api.listarProdutosGetAll()
            .then((res) => setProdutosAll(res.data))
            .finally(() => setIsLoading(false))
    }, []);

    const handleModalProduct = (produto) => {
        setPutProdutos(produto)
        setIsModalVisible("EditarProduto")
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
        Api.cadastrarProduto(postProdutos)
            .then(res => {
                setProdutosAll([...produtosAll, res.data]);
            }).finally(() => {
                setIsLoading(false)
                setIsModalVisible(null)
                setPostProdutos(null)
            });
    }   

    const handlePutProduct = () => {
        setIsLoading(true)
        debugger
        Api.cadastrarProduto(putProdutos)
        .then(res => {
            setProdutosAll((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === putProdutos.id ? { ...product, ...putProdutos } : product
                )
            );
        }).finally(() => {
            setIsLoading(false)
            setPutProdutos(null)
            setIsModalVisible(null)
        });
    }

    const handleDeleteProduct = (id) => {
        setIsLoading(true)
        Api.deleteProduto(id)
            .then(res => {
                setProdutosAll((prevProducts) =>
                    prevProducts.filter((Product) => Product.id !== id)
                );
            }).finally(() => {
                setIsLoading(false)
                setIsModalVisible(null)
            });
    }

    return (
        <Container children={
            <div>
                {isLoading &&  <LoadingIndicator />}
                <div className="mb-4">
                    <p className="text-2xl font-bold">Produtos</p>
                </div>
                <div className="flex space-x-4 mb-4">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsModalVisible("CriarProduto")}>
                        Criar Produto
                    </button>
                </div>
                <div className="grid grid-cols-5 gap-5">
                    {produtosAll.map((produto) => (
                        <div key={produto.id} 
                            className="flex flex-col justify-between w-52 border border-black items-center p-2 bg-white cursor-pointer"
                            onClick={() => handleModalProduct(produto)}
                            >
                                <img src={FotoTeste} alt="Imagem do produto" className="w-full h-auto mb-4" />
                                <div className="text-center space-y-1">
                                    <h2 className="text-lg font-bold">{produto.descricao}</h2>
                                    <p className="text-2xl">{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>
                        </div>
                    ))}
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
                                        <img src={FotoTeste} alt="Imagem do produto" className="w-40" />
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                                            type="file" 
                                            placeholder="Digite o Nome:"
                                            //onChange={(event) => handleEditPostProduct(event)} 
                                            name="descricao" 
                                            //value={FotoTeste}
                                            />
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
                            isModalVisible === "EditarProduto" ?
                                <div>
                                    <Modal.Header>
                                        <Modal.Title className="text-2xl font-bold">
                                            Editar Produto
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <img src={FotoTeste} alt="Imagem do produto" className="w-40" />
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                                            type="file" 
                                            placeholder="Digite o Nome:"
                                            //onChange={(event) => handleEditPostProduct(event)} 
                                            name="descricao" 
                                            //value={FotoTeste}
                                            />
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
                                    <Modal.Footer className="flex justify-between">
                                        <Button variant="danger" onClick={() => handleDeleteProduct(putProdutos.id)}>Deletar</Button>
                                        <div className="space-x-2">
                                            <Button variant="secondary" onClick={() => setIsModalVisible(null)}>Fechar</Button>
                                            <Button variant="primary" onClick={() => handlePutProduct()}>Salvar</Button>
                                        </div>
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