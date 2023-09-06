export const add_nfts = (nfts) => {
  return {
    type: 'ADD_NFTS',
    payload: nfts,
  }
}

export const upload_nfts = (uploadedNfts) => {
  return {
    type: 'UPLOADED_NFTS',
    payload: uploadedNfts,
  }
}

export const delete_nfts = () => {
  return {
    type: 'DELETE_NFTS',
  }
}
