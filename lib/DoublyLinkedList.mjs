/*
ESTRUTURA DE DADOS LISTA DUPLAMENTE ENCADEADA
- A lista encadeada é uma estrutura de dados formada por unidades
de informação chamadas nodos ou nós.
- Cada nodo da lista encadeada tem três partes: uma, que armazena a
informação; a segunda, que guarda o endereço do nodo anterior; e a terceira que guarda o endereço do próximo nodo da sequência
- A qualquer momento, temos um conhecimento apenas limitado de onde
se encontram todos os nodos da lista. Sabemos apenas onde está o
primeiro e o último nodo da sequência. Os nodos intermediários precisam
ser encontrados partindo-se do primeiro e percorrendo a sequência
*/

class Node {
    constructor(val) {
        this.data = val // Valor armazenado
        this.prev = null // Ponteiro para o nodo anterior
        this.next = null // Ponteiro para o nodo seguinte
    }
}

export class DoublyLinkedList {

    #head // Primeiro nodo
    #tail // Último nodo
    #count // Quantidade de nodos

    constructor() {
        this.#head = null
        this.#tail = null
        this.#count = 0
    }

    // Dada uma posição, retorna o nodo naquela posição
    #findNode(pos) {
        let node = null

        // Posição se encontra na primeira metade da lista
        if(pos < this.#count / 2) {
            node = this.#head
            for(let i = 0; i < pos; i++) node = node.next
        }
        // Posição se encontra na segunda metade da lista
        else {
            node = this.#tail
            for(let i = this.#count - 1; i > pos; i--) node = node.prev
        }
        return node
    }

    get empty() {
        return this.#count === 0
    }

    insert(pos, val) {

        const node = new Node(val)

        // 1° caso: com a lista vazia adionando o primeiro elemento
        if(this.empty) {
            this.#head = node // ele é o head
            this.#tail = node // e também é o tail por só termos 1 elemento
        }
        // 2° caso: inserção no início da lista
        else if(pos === 0) {
            node.next = this.#head
            this.#head.prev = node
            this.#head = node
        }
        // 3° caso: inserção no final da lista
        else if(pos >= this.#count) {
            this.#tail.next = node
            node.prev = this.#tail
            this.#tail = node
        }
        // 4° caso: inserção em posição intermediária
        else {
            let nodePos = this.#findNode(pos)
            let before = nodePos.prev
            before.next = node // O nodo anterior a posição passa a apontar para o novo nodo
            node.prev = before // O novo nodo aponta de volta para o anterior
            node.next = nodePos // o novo nodo passa a apontar para o nodo que ocupava a posição
            nodePos.prev = node
        }
        this.#count++
    }          

    print() {
        let output = '( '
        let node = this.#head
        for(let i = 0; i < this.#count; i++) {
            output += `[${i}]: ${node.data}`
            if(node.next) output += ' <-> '
            node = node.next
        }
        return output + ` ) count: ${this.#count}`
    }
    printReverse() {
        let output = '( '
        let node = this.#tail
        for(let i = this.#count - 1; i >= 0; i--) {
            output += `[${i}]: ${node.data}`
            if(node.prev) output += ' <-> '
            node = node.prev
        }
        return output + ` ) count: ${this.#count}`
    }
}

const lista = new DoublyLinkedList()
console.log(lista.print())

lista.insert(0, 'Odorico') // Primeiro nodo (lista vazia)
console.log(lista.print())
console.log(lista.printReverse())

lista.insert(1, 'Gercina') // Inserção no final
console.log(lista.print())
console.log(lista.printReverse())

lista.insert(0, 'Temístocles') // Inserção no final
console.log(lista.print())
console.log(lista.printReverse())