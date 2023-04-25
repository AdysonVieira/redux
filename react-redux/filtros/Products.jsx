import React from 'react'
import { useSelector } from 'react-redux'

const filteredColors = (colors) => (products) => {
  return !colors.length || colors.includes(products.color)
}

const filteredPrices = (prices) => (products) => {
  return (!prices.max || products.price <= prices.max) &&
  (!prices.min || products.price >= prices.min)
}

const filteredProducts = (state) => {
  const { data, filters} = state.products
  return data
    .filter(filteredColors(filters.color))
    .filter(filteredPrices(filters.prices))
}

const Products = () => {
  
  const data = useSelector(filteredProducts)

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cor</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        {data?.map(({id, name, color, price}) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{color}</td>
            <td>{price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Products