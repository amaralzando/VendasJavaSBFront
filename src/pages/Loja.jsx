import React, { useEffect, useState } from "react";
import Api from "../services/ApiProduto";
import LoadingIndicator from "../components/LoadingIndicator";
import Container from "../components/Container";
import { Button, Modal } from "react-bootstrap";
import Carrinho from "../assets/gifs/Carrinho.gif";
import setaD from "../assets/png/setaD.png";
import setaE from "../assets/png/setaE.png";

import FotoTeste from "../assets/png/FotoTeste.jpg";

const Loja = () => {
    const [isModalVisible, setIsModalVisible] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [produtosAll, setProdutosAll] = useState([]);
    const [total, setTotal] = useState(0);
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);
    //const [quantidade, setQuantidade] = useState(1);
    
    useEffect(() => {
        setIsLoading(true)
        Api.listarProdutosGetAll()
            .then((res) => setProdutosAll(res.data))
            .finally(() => setIsLoading(false))
    }, []);

    const adicionarCarrinho = async (produto) => {
        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000)); 
            setProdutosCarrinho((prevProdutos) => [...prevProdutos, { produto: produto, quantidade: 1 }]);
        } catch (error) {
            console.error("Erro ao adicionar ao carrinho", error);
        } finally {
            setIsLoading(false);
        }
    };

    const editarCarrinho = (item, d) => {
        const existente = produtosCarrinho.find((item) => item.produto === item.produto.id);
        
        if (existente) {
            console.log(item.quantidade)
            if(item.quantidade >= 1){
                if(d === "D") {
                    setProdutosCarrinho((prevProdutos) => {
                        return prevProdutos.map((item) =>
                            item.produto === item.produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
                        );
                    });
                }
                if(item.quantidade > 1 && d === "E") {
                    setProdutosCarrinho((prevProdutos) => {
                        return prevProdutos.map((item) =>
                            item.produto === item.produto.id ? { ...item, quantidade: item.quantidade - 1 } : item
                        );
                    });
                }
            } 
        }
    };

    const calcularTotal = () => {
        return produtosCarrinho.reduce((total, item) => {
            const produto = produtosAll.find((p) => p.id === item.produto.id);
            return total + (produto.preco * item.quantidade)
        }, 0);
    };

    const criarPedido = () => {
        const pedido = {
            cliente: 2,
            total: calcularTotal(),
            items: produtosCarrinho.map((item) => ({ produto: item.produto.id, quantidade: item.quantidade })),
        };

        console.log(pedido)
        // Aqui você pode realizar o POST para o backend usando a API
        // Api.criarPedido(pedido)
        //     .then((res) => {
        //         console.log("Pedido criado com sucesso!", res.data);
        //         // Lógica após o sucesso do POST
        //     })
        //     .catch((error) => {
        //         console.error("Erro ao criar o pedido", error);
        //         // Lógica em caso de erro no POST
        //     });
    };

    return (
        <Container children={
            <div>
                {isLoading &&  <LoadingIndicator />}
                <div className="flex justify-between mb-4">
                    <p className="text-4xl font-bold">Loja</p>
                    <img className="" 
                        src={Carrinho} alt="Carrinho" 
                        onClick={() => setIsModalVisible("VerCarrinho")}
                        />
                </div>
                <div className="grid grid-cols-5 gap-5">
                    {produtosAll.map((produto) => (
                        <div key={produto.id} 
                            className="flex flex-col justify-between w-52 border border-black items-center p-2 bg-white cursor-pointer space-y-2"
                            >
                                <img src={FotoTeste} alt="Imagem do produto" className="w-full h-auto mb-4" />
                                <div className="text-center space-y-1">
                                    <h2 className="text-lg font-bold">{produto.descricao}</h2>
                                    <p className="text-2xl">{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>
                                <div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => adicionarCarrinho(produto)}>Adicionar ao carrinho</button>
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
                            isModalVisible === "VerCarrinho" ?
                                <div>
                                    <Modal.Header>
                                        <Modal.Title className="text-2xl font-bold">
                                            Carrinho
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className=" space-y-2">
                                            {produtosCarrinho.map((item) => (
                                                <div key={item.produto.id} 
                                                    className="flex flex-row justify-between w-auto border border-black items-center p-2 bg-white cursor-pointer space-y-2"
                                                    >
                                                        <img src={FotoTeste} alt="Imagem do produto" className="w-28 mb-4" />
                                                        <div className="text-center space-y-1">
                                                            <h2 className="text-lg font-bold">{item.produto.descricao}</h2>
                                                            <p className="text-2xl">{item.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-center items-center space-x-2">
                                                                <img src={setaE} alt="Diminuir quantidade" width={20}
                                                                    onClick={() => editarCarrinho(item, "E")} />
                                                                <input type="text" value={item.quantidade} className="w-8" />
                                                                <img src={setaD} alt="Aumentar quantidade" width={20}
                                                                    onClick={() => editarCarrinho(item, "D")} />
                                                            </div>
                                                        </div>
                                                </div>
                                            ))}
                                            <div>
                                                <o>Total: {calcularTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</o>
                                            </div>
                                        </div>    
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setIsModalVisible(null)}>Fechar</Button>
                                        <Button variant="primary" onClick={() => criarPedido()}>Salvar</Button>
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

export default Loja;