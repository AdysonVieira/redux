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