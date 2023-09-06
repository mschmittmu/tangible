const nfts = []
const uploadedNfts = []
const handleUploadedNfts = (state = { nfts, uploadedNfts }, action) => {
  switch (action.type) {
    case 'ADD_NFTS':
      const nfts = action.payload
      return {
        ...state,
        nfts: [...state.nfts, nfts],
      }
    case 'UPLOADED_NFTS':
      const uploadedNfts = action.payload
      return {
        ...state,
        uploadedNfts: [...state.uploadedNfts, uploadedNfts],
      }
    case 'DELETE_NFTS':
      return {
        ...state,
        nfts: [],
        uploadedNfts: [],
      }
    default:
      return state
  }
}
export default handleUploadedNfts
