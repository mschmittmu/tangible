import {
  addAccountDetail,
  disconnectAccountDetail,
  getAccountDetail,
  removeAccountDetail,
} from '../../utility/account.storage'

const account = getAccountDetail() ? getAccountDetail() : null
const handleAccount = (state = account, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      state = action.payload
      addAccountDetail(action.payload)
      return state
    case 'DELETE_ACCOUNT':
      state = null
      removeAccountDetail()
      return state
    case 'DISCONNECT_ACCOUNT':
      disconnectAccountDetail()
      return { ...state, status: 'disconnected' }
    default:
      return state
  }
}
export default handleAccount
