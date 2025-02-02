/*********************
 *  MERGE SORT
 * No processo de ordenação, esse algoritmo "desmonta" o vetor original contendo N elementos até obter N vetores
 * de apenas um elemento cada um.
 * Em seguida, usando a técnica de mesclagem (merge), "remonta" o vetor, dessa vez com os elementos já em ordem
 * 
 */

 let comps, divisoes, juncoes // comparações, divisões e junções

function mergeSort(vetor) {

    // Desmontando um vetor que deve ter pelo menos 2 elementos
    if(vetor.length > 1) {
        // Dividindo o vetor em 2
        const meio = Math.floor(vetor.length / 2)
        // Criando duas variáveis vetor esquerdo e vetor direito
        // slice() fatia um vetor, copiando os elementos desde a posição inicial informada (inclusive)
        // até a posição final (exclusive). Ou seja, abaixo o 0 entra e o meio não
        let vetEsq = vetor.slice(0, meio)
        // Caso o segundo parâmetro de slice() seja omitido, serão copiados os elementos
        // desde a posição inicial até a posição final
        let vetDir = vetor.slice(meio)
        divisoes++ // Nesse algoritmo acima estamos dividindo os vetores

        // console.log({vetEsq, vetDir}) está comentado para o teste do vetor de nomes que tem muitos nomes

        // Função para juntar novamente os vetores desmontados acima
        function mesclar(vetEsq, vetDir) {
        let pEsq = 0, pDir = 0, vetRes = [] // pEsq e pDir fazem o papel das setas na explicação do diagrama do prof
        while(pEsq < vetEsq.length && pDir < vetDir.length) { // Enquanto as setas estiverem dentro do comprimento do vetor
            if(vetEsq[pEsq] < vetDir[pDir]) { // Se a posição da seta no vetor esquerda for menor que a posição da seta no vetor direita
                vetRes.push(vetEsq[pEsq]) // Puxar o valor no vetor da esquerda na posição da seta para o vetor vazio
                pEsq++ // Mover a seta para a direita
            }
            else {
                vetRes.push(vetDir[pDir])
                pDir++
            }
            comps++ // Na parte if(vetEsq[pEsq] < vetDir[pDir]) é uma comparação
        }
        // Descobrir de qual lado sobrou
        let sobra
        // Verificando se sobrou na esquerda
        if(pEsq < pDir) sobra = vetEsq.slice(pEsq) // Se sobrar mais valores depois da seta esquerda, mas a seta direita já terminou, juntamos todo o restante da seta esquerda no vetRes
        // Se sobrar na direita
        else sobra = vetDir.slice(pDir) // Se sobrar mais valores depois da seta direita, mas a seta esquerda já terminou, juntamos todo o restante da seta direita no vetRes

        // Retorna vetor de resultados + sobra
        return [...vetRes, ...sobra] // os ... significam desestruturação. Juntamos o que já tinhamos no vetRes com a sobra
    }

    // Chamadas recursivas à função
        vetEsq = mergeSort(vetEsq)
        vetDir = mergeSort(vetDir)

        const vetFinal = mesclar(vetEsq, vetDir)
        juncoes++
        // console.log ({vetFinal}) está comentado para o teste do vetor de nomes que tem muitos nomes
        return vetFinal
    }
    return vetor // Vetor de 1 elemento, não modificado, condição de saída
} // A função mesclar está dentro da função mergeSort

// comps = 0, divisoes = 0, juncoes = 0
// let nums = [7, 4, 9, 0, 6, 1, 8, 2, 5, 3]
// let nums = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
// let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// let numsOrd = mergeSort(nums)
// console.log({numsOrd})
// console.log({comps, divisoes, juncoes})

import { nomes } from './includes/100-mil-nomes.mjs'

comps = 0, divisoes = 0, juncoes = 0
console.time('Ordenando nomes...')
const nomesOrd = mergeSort(nomes)
console.timeEnd('Ordenando nomes...')
let memoria = process.memoryUsage().heapUsed / 1024 / 1024
console.log('DEPOIS:', nomesOrd)
console.log({comps, divisoes, juncoes, memoria})