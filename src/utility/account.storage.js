export const addAccountDetail = (account) => {
  try {
    localStorage.setItem('account_address', JSON.stringify(account))
    return true
  } catch (err) {
    return false
  }
}

export const removeAccountDetail = () => {
  try {
    localStorage.removeItem('account_address')
    return true
  } catch (err) {
    return false
  }
}

export const disconnectAccountDetail = () => {
  try {
    const account = JSON.parse(localStorage.getItem('account_address'))
    localStorage.setItem(
      'account_address',
      JSON.stringify({ account: account['account'], status: 'disconnected' })
    )
    return true
  } catch (err) {
    return false
  }
}

export const getAccountDetail = () => {
  try {
    if (localStorage.getItem('account_address')) {
      return JSON.parse(localStorage.getItem('account_address'))
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}
