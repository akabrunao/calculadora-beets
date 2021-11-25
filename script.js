const teclas = document.querySelector(".teclas")
const visor = document.querySelector(".visor")
const calculadora = document.querySelector(".calculadora")

teclas.addEventListener('click', (e) => {
    if (!e.target.closest("button")) return

    const tecla = e.target
    const valorTecla = tecla.textContent
    const { tipoTecla } = tecla.dataset
    const { tipoTeclaAnterior, memoria } = calculadora.dataset
    const valorVisor = visor.textContent


    if (tipoTecla == "numero") {

        if (valorVisor === '0' || tipoTeclaAnterior === 'operador') {
            if (valorTecla === '00') {
                visor.textContent = '0'
            } else {
                visor.textContent = valorTecla
            }
        } else {
            visor.textContent += valorTecla
        }
    }

    if (tipoTecla == "operador") {
        const operadores = teclas.querySelectorAll("[data-tipo-tecla='operador']")
        operadores.forEach((op) => {
            op.dataset.estado = ''
        })
        tecla.dataset.estado = "selecionado"

        calculadora.dataset.primeiroNumero = valorVisor
        calculadora.dataset.operador = tecla.dataset.tecla
    }

    if (tipoTecla === 'igual') {
        const primeiroNumero = parseFloat(calculadora.dataset.primeiroNumero)
        const operador = calculadora.dataset.operador
        const segundoNumero = parseFloat(valorVisor)

        let resultado
        if (operador === 'somar') {
            resultado = primeiroNumero + segundoNumero
        }
        if (operador === 'subtrair') {
            resultado = primeiroNumero - segundoNumero
        }
        if (operador === 'multiplicar') {
            resultado = primeiroNumero * segundoNumero
        }
        if (operador === 'dividir') {
            resultado = primeiroNumero / segundoNumero
        }

        visor.textContent = resultado
    }

    if (tipoTecla === 'limpar') {
        visor.textContent = '0'
    }

    if (tipoTecla === 'salvar') {
        calculadora.dataset.memoria = valorVisor
    }

    if (tipoTecla === 'recuperar') {
        if (memoria === undefined) {
            visor.textContent = '0'
        } else {
            visor.textContent = memoria
        }
    }
    calculadora.dataset.tipoTeclaAnterior = tipoTecla
})


