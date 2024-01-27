import axios from 'axios';

// Função que trata a requisição para buscar ações com base em uma consulta
export default async (req, res) => {
    try {
        // Obtém a URL da API do ambiente
        let URL = process.env.URL;

        // Faz uma solicitação para obter a lista de ações disponíveis
        const { data: { data: stockList } } = await axios.get(`${URL}/api/fundamentus/available`);

        // Obtém a consulta da requisição
        const { query } = req.query;

        // Verifica se a consulta está presente
        if (!query) {
            return res.status(400).json({ error: 'Query parameter "query" is required' });
        }

        // Converte a consulta para maiúsculas para garantir correspondência insensível a maiúsculas e minúsculas
        const queryUpperCase = query.toUpperCase();

        // Cria um índice de ações para otimizar a filtragem
        const stockIndex = stockList.reduce((index, stock) => {
            index[stock.ticker] = true;
            return index;
        }, {});

        // Filtra as ações com base na consulta e no índice
        const filteredStocks = stockList.filter(stock => (stock.ticker.includes(queryUpperCase) || stock.name.toUpperCase().includes(queryUpperCase)) && stockIndex[stock.ticker]);

        // Responde com as ações filtradas
        res.status(200).json({ data: filteredStocks });
    } catch (error) {
        // Trata erros durante a execução da função

        console.error('Error searching stocks:', error);

        // Verifica o tipo de erro e responde adequadamente
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from the server. Please try again.' });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
        }
    }
};