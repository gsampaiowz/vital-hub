import axios from "axios";

// Declarar a porta da API
const portaApi = "4466";

// Declarar o ip da máquina
const ipSampaio = "192.168.137.1";
const ipThiago = "194.168.19.142";

// Definir URL padrão
const apiUrllocal = `http://${ipSampaio}:${portaApi}/api`;

// Trazer a configuração do axios
const api = axios.create({
  baseURL: apiUrllocal,
});

export default api;
