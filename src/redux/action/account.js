export const add_account = (account) => {
  return {
    type: 'ADD_ACCOUNT',
    payload: account,
  }
}

export const delete_account = () => {
  return {
    type: 'DELETE_ACCOUNT',
  }
}

export const disconnect_account = () => {
  return {
    type: 'DISCONNECT_ACCOUNT',
  }
}
