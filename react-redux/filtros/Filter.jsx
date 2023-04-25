import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mapColors, changeFilter } from '../store/products'

const Filter = () => {
  
  const colors = useSelector(mapColors)
  const [min, setMin] = React.useState('')
  const [max, setMax] = React.useState('')
  const [selectedColor, setSelectedColor] = React.useState([])
  const dispatch = useDispatch()

  const handleChange = (e) => {
    if (e.target.checked) {
      setSelectedColor((prev) => [ ...prev, e.target.value])
    } else {
      setSelectedColor(() =>  selectedColor.filter((color) => color !== e.target.value ))
    }
  }

  const handleChecked = (color) => {
    return selectedColor.includes(color)
  }

  React.useEffect(() => {
    dispatch(changeFilter({
      name: 'color',
      value: selectedColor
    }))
  }, [selectedColor])
  
  React.useEffect(() => {
    dispatch(changeFilter({
      name: 'prices',
      value: {
        min: +min,
        max: +max,
      }
    }))
  }, [max, min])
  
  return (
    <form>
      <input style={{display: 'block'}}
        id='min'
        type="number"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        placeholder='Min'
        />
      
      <input style={{display: 'block'}}
        id='min'
        type="number"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        placeholder='Max'
      />
      
      {colors?.map((color) => (
        <label key={color}>
          <input 
            type="checkbox" 
            id={color}
            value={color}
            checked={handleChecked(color)}
            onChange={handleChange}
            />
          {color}
        </label>
      ))}
      
    </form>
  )
}

export default Filter