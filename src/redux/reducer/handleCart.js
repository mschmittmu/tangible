import { addItem, getCart } from '../../utility/cart.storage'

const cart = getCart() ? getCart() : []
const handleCart = (state = cart, action) => {
  let product = action.payload
  switch (action.type) {
    case 'ADDITEM':
      //   check if product is already exist
      let type = ''
      let exit
      if (product.product) {
        type = product.type
        product = product.product
        exit = state.find((x) => x.id === product.id)
      } else {
        exit = state.find((x) => x.id === product.id)
      }

      if (exit) {
        // incraese the quantity
        let result
        if (type === 'INC') {
          result = state.map((x) => {
            return x.id === product.id ? { ...x, qty: x.qty + 1 } : x
          })
        } else {
          result = state.map((x) => {
            let newProjectDetails = Object.entries(product.selectedProductDetail).map(
              (details) => details[1]
            )[0]

            let matched = false
            if (x.selectedProductDetail) {
              for (let i = 0; i < Object.entries(x.selectedProductDetail).length; i++) {
                let details = Object.entries(x.selectedProductDetail)[i]
                if (product.id === 40999393001678) {
                  if (
                    details[1]['url'] === newProjectDetails.url &&
                    details[1]['color'] === newProjectDetails.color
                  ) {
                    matched = true
                    x.selectedProductDetail[details[0]] = {
                      ...details[1],
                      quantity: details[1].quantity + 1,
                    }
                    break
                  } else {
                    matched = false
                  }
                } else if (product.id === 41138846007502) {
                  if (
                    details[1]['url'] === newProjectDetails.url &&
                    details[1]['size'] === newProjectDetails.size
                  ) {
                    matched = true
                    x.selectedProductDetail[details[0]] = {
                      ...details[1],
                      quantity: details[1].quantity + 1,
                    }
                    break
                  } else {
                    matched = false
                  }
                } else {
                  if (
                    details[1]['url'] === newProjectDetails.url &&
                    details[1]['size'] === newProjectDetails.size &&
                    details[1]['color'] === newProjectDetails.color
                  ) {
                    matched = true
                    x.selectedProductDetail[details[0]] = {
                      ...details[1],
                      quantity: details[1].quantity + 1,
                    }
                    break
                  } else {
                    matched = false
                  }
                }
              }
            }
            return x.id === product.id
              ? {
                  ...x,
                  qty: x.qty + product.qty,
                  selectedProductDetail: x.selectedProductDetail
                    ? matched
                      ? x.selectedProductDetail
                      : { ...x.selectedProductDetail, ...product.selectedProductDetail }
                    : product.selectedProductDetail,
                }
              : x
          })
        }
        addItem(result)
        return result
      } else {
        const product = action.payload
        let result = [
          ...state,
          {
            ...product,
            qty: product.qty ? product.qty : 1,
          },
        ]
        addItem(result)
        return result
      }
      break

    case 'DELITEM':
      const exit1 = state.find((x) => x.id === product.id)
      if (exit1.selectedProductDetail && Object.entries(exit1.selectedProductDetail).length === 0) {
        let result = state.filter((x) => x.id !== exit1.id)
        addItem(result)
        return result
      } else {
        let result = state.map((x) => (x.id === product.id ? { ...x, qty: x.qty - 1 } : x))
        addItem(result)
        return result
      }
      break
    case 'REMOVE_ITEM':
      const item = state.find((x) => x.id === product.id)
      if (item) {
        let result = state.filter((x) => x.id !== item.id)
        addItem(result)
        return result
      }

    default:
      return state
      break
  }
}
export default handleCart
