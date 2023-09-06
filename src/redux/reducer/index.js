import { combineReducers } from 'redux'
import handleAccount from './handleAccount'
import handleCart from './handleCart'
import handleNfts from './handleNfts'

const rootReducers = combineReducers({
  handleCart,
  handleAccount,
  handleNfts,
})
export default rootReducers
