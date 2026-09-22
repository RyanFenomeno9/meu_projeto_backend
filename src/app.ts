// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";
//importaa o modulo fs para manipulação de arquivos
import fs from "fs";
//importa a classe player do arquivo Player.ts
import { Player } from "./models/Player.js";

const app: Express = express();

// Midleware para permitir que o servidor entenda requissições com corppo em JSON
app.use(express.json());

// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicaçã
// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

// Define o nome do diretório onde os arquivos serão armazenados
const DATA_FILE = "./data/players.json";

/*
Função para garantir que o diretorio de dados exista antes de salvar os arquivos.
Se o diretório não existir, ele será criado. 
*/

function ensureDataFolderExists() {
    const dataFolder = "./data";
    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder);
    }
}

//chamar a função para garantir que o diretório exista
// antes de qualquer operação de leitura ou escrita de arquivos

ensureDataFolderExists();

//função para salvar os dados do player em um arquivo JSON
function savePlayerState(player: Player) {
    // Converte o objeto player 
    const data = JSON.stringify(player, null, 2);
    fs.writeFileSync(DATA_FILE, data, "utf8");
}

function loadPlayerState(): Player {
    if (fs.existsSync (DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        const PlayerData = JSON.parse(data);

        //ATENÇÃO: JSON.parse() retorna um objeto "puro" (sem os metodos da classe player,)
        //Para que o objeto tenha os métodos da classe player, precisamos criar uma nova instancia da classe PLayer
        //e passar os dados carregados para o construtor.
        return new Player(PlayerData.name, PlayerData.health, PlayerData.level);
    }
    
    //criampps (instanciamos) um novo jogador chamado hero se não existir com 10 de saude e nivel 1
    const newPlayer = new Player("Hero", 100, 5);
    savePlayerState(newPlayer);
    return newPlayer;
}
// Inicializa o player carregando seu estado do arquivo JSON
let player: Player = loadPlayerState();

app.get("/player", (req: Request, res: Response) => {
    res.json({
        message: "Informações do Jogador",
        player:player,
    });
});

app.post("/player/attack", (req: Request, res: Response) => {
    const attackMessage = player.attack();
    res.json({
        message: attackMessage,
    });
});

// Rota POST para o jogador receber dano
// Q
app.post("/player/take-damage", (req: Request, res: Response) => {
    const { damage } = req.body;
    const damageMessage = player.takeDamage(damage);
    //salvar o estado atual do player no arquivo JSON
    savePlayerState(player);
    // Retorna uma resosta JSON com a mensagem do dano
    //para o cliente que fez a requisição
    res.json({
        //Retorna a mensagem do dano recebido
        action: damageMessage,
        // Retorna a saude atual do jogador
        currentHealth: player.health,
        // Retorna o nível do jogador
        currentLevel: player.level 
    });
});

// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
console.log("Rotas disponiveis:");
console.log(`GET http://localhost:${PORT}/player - obter informações do jogador`);
console.log(`POST http://localhost:${PORT}/player/attack - Jogador realiza um ataque`);
console.log(`POST http://localhost:${PORT}/player/take-damage - Jogador recebe dano`);
});