import React, { useEffect, useState } from "react";
import Api from "../services/Api";
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
                <div className="grid grid-cols-4 gap-5">
                    {produtosAll.map((produto) => (
                        <div key={produto.id} 
                            className="flex flex-col justify-between w-40 border border-black items-center">
                                <img src={FotoTeste} alt="Imagem do produto" className="w-full h-auto" />
                                <div className="flex flex-col items-center">
                                    <h2 className="text-18 font-bold">{produto.descricao}</h2>
                                    <p className="text-16">{produto.preco}</p>
                                    <button>Comprar</button>
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