import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { decreament, delcart, increament } from '../redux/action/index'
import productsJson from '../productsJson'

const Cart = () => {
  let navigate = useNavigate()
  const state = useSelector((state) => state.handleCart)
  const dispatch = useDispatch()
  const handleclose = (cartitemremove) => {
    dispatch(delcart(cartitemremove))
  }
  const handleincrement = (itemincrement) => {
    // itemincrement = { ...itemincrement, selectedProductDetail: [itemincrement.selectedProductDetail[itemincrement.selectedProductDetail.length - 1]] }
    dispatch(increament({ product: itemincrement, type: 'INC' }))
  }
  const handledecrement = (itemdecrement) => {
    dispatch(decreament(itemdecrement))
  }

  const emptyCart = () => {
    return <tr>Your cart is empty</tr>
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const procedToCheckout = () => {
    const productTypes = {
      mug: ['40999393001678'],
      metalSign: ['41138846007502'],
      apparel: ['41166794653902', '40999509065934', '40992657866958'],
    }

    const getAttrs = (id, detail) => {
      const product = productsJson.find((p) => p.id === id)

      const productType = productTypes.mug.includes(`${product.id}`)
        ? 'mug'
        : productTypes.metalSign.includes(`${product.id}`)
        ? 'metalSign'
        : productTypes.apparel.includes(`${product.id}`)
        ? 'apparel'
        : undefined

      const attrHash = {
        mug: {
          quantity: detail[Object.keys(detail)[0]].quantity,
          color: product.color[detail[Object.keys(detail)[0]].color - 1],
        },
        metalSign: {
          quantity: detail[Object.keys(detail)[0]].quantity,
          size: product.size[detail[Object.keys(detail)[0]].size - 1],
        },
        apparel: {
          quantity: detail[Object.keys(detail)[0]].quantity,
          size: product.size[detail[Object.keys(detail)[0]].size - 1],
          color: product.color[detail[Object.keys(detail)[0]].color - 1],
        },
      }

      return {
        productType,
        ...attrHash[productType],
      }
    }

    const handler = async () => {
      const baseLink = state.reduce(
        (acc, item, index) =>
          (acc += `${index > 0 ? ',' : ''}${item.id}:${item.qty}${
            index === state.length - 1 ? '?data=' : ''
          }`),
        `https://www.tangibletokenz.com/cart/`
      )

      const data = state.map((item) => {
        const attrs = getAttrs(item.id, item.selectedProductDetail)

        return {
          variantid: item.id,
          value: item.selectedImage.url,
          attrs,
        }
      })

      const output = `${baseLink}${JSON.stringify(data)}`

      window.location.href = output
    }

    return (
      <>
        <span style={{ cursor: 'pointer' }} onClick={handler} className='proceed-checkout-btn mb-5'>
          <i className='fa fa-lock' aria-hidden='true'></i>
          <span> Proceed to checkout</span>
        </span>
      </>
    )
  }

  const cartItems = (cartItem) => {
    let cart_items_sizes_details = Object.entries(cartItem.selectedProductDetail).map((sizes) => {
      sizes = sizes[1]
      return (
        <div className='cart-item--thumbnail' key={sizes.id} style={{}}>
          <div className='cart-item-left'>
            <div className='selectedImage'>
              <img src={sizes.cartImage} height='92px' />
              <div>
                {sizes.size && cartItem.size.length > 0 ? (
                  <div>
                    <small style={{ textTransform: 'capitalize' }}>
                      Size :{' '}
                      {cartItem.size &&
                        cartItem.size.length > 0 &&
                        cartItem.size.find((s) => s.id === sizes.size).type}
                    </small>
                    {<small style={{ textTransform: 'capitalize' }}> X {sizes.quantity}</small>}
                  </div>
                ) : (
                  ''
                )}
                {/* {cartItem.selectedSize && cartItem.selectedValue != 0 && cartItem.id !== 41138846007502 ? " / " : " "} */}
                {sizes.color && cartItem.color.length > 0 ? (
                  <div>
                    <small style={{ textTransform: 'capitalize' }}>
                      Color :{' '}
                      {cartItem.color &&
                        cartItem.color.length > 0 &&
                        cartItem.color.find((c) => c.id === sizes.color).color_name}
                    </small>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div>
              <div className='js-qty'>
                <span className='cart_qty'>
                  <button
                    onClick={() => {
                      if (cartItem.selectedProductDetail[sizes.id].quantity > 1) {
                        cartItem.selectedProductDetail[sizes.id].quantity =
                          cartItem.selectedProductDetail[sizes.id].quantity - 1
                      } else {
                        delete cartItem.selectedProductDetail[sizes.id]
                      }
                      handledecrement(cartItem)
                    }}
                    className='entry-holder cartminus'
                  >
                    <i className='fa fa-minus' aria-hidden='true'></i>
                  </button>
                  <p>{cartItem.selectedProductDetail[sizes.id]?.quantity}</p>
                  <button
                    onClick={() => {
                      cartItem.selectedProductDetail[sizes.id].quantity =
                        cartItem.selectedProductDetail[sizes.id].quantity + 1
                      handleincrement(cartItem)
                    }}
                    className='entry-holder cartplus'
                  >
                    <i className='fa fa-plus' aria-hidden='true'></i>
                  </button>
                </span>
                <br />
              </div>
            </div>
            <span className='cart-item-price'>
              ${' '}
              {(cartItem.id === 40999393001678
                ? cartItem.price * sizes.quantity
                : cartItem.size &&
                  cartItem.size.length > 0 &&
                  cartItem.size.find((size) => size.id === sizes.size).price * sizes.quantity
              ).toFixed(2)}
            </span>
            <div>
              <button
                onClick={() => {
                  delete cartItem.selectedProductDetail[sizes.id]
                  handledecrement(cartItem)
                }}
                className='cart__remove'
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )
    })

    return (
      <React.Fragment key={cartItem.id}>
        <tr className='cart__row table__section'>
          <td className='text-center cart-item--title'>
            <span style={{ textTransform: 'uppercase' }}>{cartItem.title}</span>
            {cart_items_sizes_details}
          </td>
        </tr>
      </React.Fragment>
    )
  }

  return (
    <div className='cart-page py-5'>
      <div className='container-wrap'>
        <span className='d-none d-md-block'>{state.length !== 0 && procedToCheckout()}</span>
        <table className='cart-table full text-center'>
          <thead className='cart__row cart__header-labels'>
            {/* <tr className="titlecol"></tr> */}
          </thead>
          <tbody>
            {/* {state.length !== 0 && procedToCheckout()} */}
            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(cartItems)}
          </tbody>
        </table>
        <div className='bottom-cart-info'>
          <div className='cart-row-2'>
            {state.length !== 0 ? (
              <div className='cont-shopping pt-5'>
                <NavLink to='/'>Continue Shopping</NavLink>
              </div>
            ) : (
              <p className='text-center pt-3'>
                <button
                  onClick={() => navigate('/')}
                  className='btn-dark text-center p-10 pt-2 pb-2'
                >
                  Continue shopping
                </button>
              </p>
            )}
            {state.length !== 0 && (
              <div className='total-all pt-2 pt-md-5'>
                Total:{' '}
                <strong>
                  <span className='cart-total'>
                    {' '}
                    $
                    {state
                      .reduce(
                        (sum, i) =>
                          (sum +=
                            i.id === 40999393001678
                              ? Object.entries(i.selectedProductDetail)
                                  .map((details) => details[1])
                                  .reduce((a, b) => a + b.quantity, 0) * i.price
                              : Object.entries(i.selectedProductDetail)
                                  .map((details) => details[1])
                                  .reduce(
                                    (a, b) =>
                                      a + i.size.find((s) => s.id === b.size).price * b.quantity,
                                    0
                                  )),
                        0
                      )
                      .toFixed(2)}
                  </span>
                </strong>
              </div>
            )}
            {state.length !== 0 && procedToCheckout()}
          </div>
          {state.length !== 0 && (
            <p className='cart-cupom-code pb-5 mb-0'>Get Free U.S. Shipping Today!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
