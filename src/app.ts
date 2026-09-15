// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";
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

//criampps (instanciamos) um novo jogador chamado hero com 10 de saude e nivel 1
let player1: Player = new Player("Hero", 100, 5);

app.get("/player", (req: Request, res: Response) => {
    res.json({
        message: "Informações do Jogador",
        player:player1,
    });
});

app.post("/player/attack", (req: Request, res: Response) => {
    const attackMessage = player1.attack();
    res.json({
        message: attackMessage,
    });
});

// Rota POST para o jogador receber dano
// Q
app.post("/player/take-damage", (req: Request, res: Response) => {
    const { damage } = req.body;
    const damageMessage = player1.takeDamage(damage);
    // Retorna uma resosta JSON com a mensagem do dano
    //para o cliente que fez a requisição
    res.json({
        //Retorna a mensagem do dano recebido
        action: damageMessage,
        // Retorna a saude atual do jogador
        currentHealth: player1.health,
        // Retorna o nível do jogador
        currentLevel: player1.level 
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