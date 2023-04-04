// Atualização do estado #######
// Quando o estado é modificado através de uma ação é necessário renderizamos o mesmo novamente na tela.

// [...]
  const store = Redux.createStore(reducer)
  
  // Diparando com evento
  const btnAdd = document.querySelector('.add')
  btnAdd.addEventListener('click', () => {
    store.dispatch(incrementar())
  })

  function render() {
    const state = store.getState()
    const display = document.querySelector('.display')
    display.innerText = state
    
  }
  render()
  
  // Capturando o valor da state sempre que ocorre um dispatch
  store.subscribe(render)
  
  // Pode haver várias chamadas de subscribe
  store.subscribe(() => {
    console.log('Outro subscribe')
  })


// Unsubscribe #######
// Quando chamado ele finaliza um subscribe 

const unsubscribe = store.subscribe(render)
unsubscribe();

const unsubscribe2 = store.subscribe(() => {
  console.log('Outro subscribe')
})
unsubscribe2();




