class Efeito{
    #id;
    #nome;

    constructor(id, nome){
        this.#id = id;
        this.#nome = nome;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get nome(){
        return this.#nome;
    }

    set nome(nome){
        this.#nome = nome;
    }
}