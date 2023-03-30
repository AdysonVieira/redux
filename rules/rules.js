// Regra 1 - Função pura ######## 
// Funções puras retornam sempre o mesmo valor dado um mesmo argumento e não produzem efeitos colaterais. Retornar um mesmo valor significa que os cálculos internos da função não podem depender de números aleatórios, tempo, data e outros dados que possam mudar no futuro. Efeitos colaterais são aqueles que impactam objetos/elementos que não pertencem a função. Exemplo: fetch, setTimeout, manipular dom, modificar objetos/arrays externas e outros.

// Errado
function reducer(state = 0, action) {
  switch (action.type) {
    case 'MODIFICA_WIDTH':
      const box = document.getElementById('box')
      box.style.width = action.payload + 'px'
      return action.payload;
    default: 
      return state;
  }
}

const store = Redux.createStore(reducer)
store.dispatch({ type: 'MODIFICA_WIDTH', payload: 150})
store.getState()



// Correto
$store.dispatch({ type: 'MODIFICA_WIDTH', payload: 150})
$store.getState()
function reducer(state = 0, action) {
  switch (action.type) {
    case 'MODIFICA_WIDTH':
      return action.payload;
      default: 
      return state;
    }
  }
  
const $store = Redux.createStore(reducer)
$store.dispatch({ type: 'MODIFICA_WIDTH', payload: 150})

function render() {
  const state = $store.getState()
  const box = document.getElementById('box')
  box.style.width = state + 'px'
}

$store.subscribe(render);




// Regra 2 - Imutabilidade ######
// A função reducer deve sempre retornar um estado novo, quando este for modificado. Nunca modifique o estado diretamente (ele deve ser imutável). O conceito de mutabilidade interfere principalmente em como lidamos com objetos e arrays.

const initialState = {
  nome: 'Adyson',
  idade: 31,
  sobre: {
    dados: {
      cor: 'azul'
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MUDAR_NOME':
      // retorna um objeto novo
      return { ...state, nome: action.payload };
    default:
      return state
    } 
  }
  
  
  // Immer #######
  // O immer é um pacote que nos fornece uma função na qual podemos utilizar todos os métodos que mutam arrays ou objetos, sem se preocupar com a questão de imutabilidade, pois a função do immer será sempre produzir um novo objeto/array. O mesmo faz parte do pacote Redux Toolkit.
  
  
// Com immer
const obj1 = {nome: 'Adyson', idade: 31};

// cria um objeto novo e modifica o valor de idade.
const obj2 = immer.produce(obj1, (draft) => {
  draft.idade = 32
})

console.log( obj1 === obj2); // false





const reducer = immer.produce((state, action) => {
  switch (action.type) {
    case 'MUDAR_NOME':
      state.nome = action.payload
      break;
    case 'MUDAR_COR':
      state.sobre.dados.cor = action.payload
      break;
    default:
      return state

  }
}, initialState)