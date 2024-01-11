import Api from "./Api";

const ApiProduto = {

    listarProdutosGetAll: () => {
        return Api.get("produtos")
        .then(res => res)
        .catch((err) => {
            console.log(err);
        })
    },

    produtosPorId: () => {
        return Api.get("produtos")
        .then(res => res)
        .catch((err) => {
            console.log(err);
        })
    },

    cadastrarProduto: (produto) => {
        debugger
        console.log(produto)
        return Api.post("produtos", produto)
        .then(res => res)
        .catch((err) => {
            console.log(err);
        })
    },

    editarProduto: (produto) => {
        debugger
        return Api.put(`produtos/${produto.id}`, {
            descricao: produto.descricao,
            preco: produto.preco
        })
        .then(res => res)
        .catch((err) => console.log(err))
    },

    deleteProduto: (id) => {
        debugger
        return Api.delete(`produtos/${id}`)
        .then(res => res)
        .catch((err) => console.log(err))
    }

}

export default ApiProduto;
