// Currying ########
// Uma função curried permite passarmos um argumento por vez ao invés de todos de uma vez.

function somar(a, b, c) {
  return a + b + c
}
somar(2, 5, 10)

function somar_(a) {
  return (b) => {
    return (c) => {
      return a + b + c
    }
  }
}

// ou const somar_(a) => (b) => (c) => a + b + c
console.log(somar_(2)(5)(10));



// Uso real, facilitando a composição de funções
const li = Array.from(document.querySelectorAll('li'));

const getElementAttr = (key) => {
  return (el) => {
    return el.getAttribute(key)
  }
}

const _getElementAttr = (key) => (el) => el.getAttribute(key)

const getAttrDataSlide = getElementAttr('data-slide')
const getAttrId = getElementAttr('id')

const dataSlideList = li.map(getAttrDataSlide)
const idList = li.map(getAttrId)