export const addItem = (item) => {
  try {
    sessionStorage.setItem('cart', JSON.stringify(item))
  } catch (err) {
    return false
  }
}

export const getCart = () => {
  try {
    return JSON.parse(sessionStorage.getItem('cart'))
  } catch (err) {
    return false
  }
}

export const deleteItem = () => {
  try {
    sessionStorage.removeItem('cart')
    return true
  } catch (err) {
    return false
  }
}
