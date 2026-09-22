// A palavra "class" define que estamos criando um molde.
// A palavra "export" permite que esse arquivo seja usado por outros arquivos (como o appp.ts).

export class Player {
    public name: string; // O nome do jogador (texto)
    public health: number; // A saude do jogador (número)
    public level: number; // O nível do jogador (número)

    // Construtores (O construtor é um método especial que executado automaticamente quando a classe é instanciada uma única vez)
    constructor(name: string, health: number = 100, level: number = 1) {
        // A palavra "this" faz referência aealth: própria classe, ou seja
        // "Pegue o atrributo 'name' da classe Player e atribua o valor do parametro 'name' a ele

        this.name = name;
        this.health = health;
        this.level = level;
    }

    // Métodos (Comportamentos da classe)
    // Métodos são as funções que a classe ppode executras, ou seja, sao os comportamentos da classe
    public attack(): string {
        const damage = this.level * 10;
        return `${this.name} atacou e causou ${damage} de dano`;
    }
    //O método de take damage
    public takeDamage(amount: number): string {
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
            return `${this.name} foi derrotado!!!!!`;
        }

        return `${this.name} recebeu ${amount} de dano e agora tem ${this.health} de saúde.`;
    }


    public takeHealth(amount: number): string {
        this.health += amount;
        if (this.health >= 100) {
            this.health = 100;
            return `${this.name} atingiu a health máxima!!!!!`;
        }

        return `${this.name} recebeu ${amount} de health e agora tem ${this.health} de saúde.`;
    }

    public upLevel(amount: number): string {
        this.level += amount;

        return `${this.name} recebeu ${amount} de level e agora tem ${this.health} de nível.`;
    }

}