import { unique } from '@devoxa/flocky'
import { Tooltip } from 'antd'
import axios from 'axios'
import html2canvas from 'html2canvas'
import { useEffect,useMemo,useRef,useState } from 'react'
import 'react-image-gallery/styles/css/image-gallery.css'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import '../Assets/Css/product.css'
import securepartners from '../Assets/Images/secure-partners.png'
import jsonImage from '../productsJson.js'
import { addcart } from '../redux/action/index'
import { upload_nfts } from '../redux/action/nfts'
import SelectNftImageModal from './SelectNftImageModal'
import UploadImageModal from './UploadImageModal'

function Product() {
  // window.localStorage.clear();
  const wagmiAccount = useAccount()
  let navigate = useNavigate()
  const containerRef = useRef(null)
  const [nftFetchLoop, setNftFetchLoop] = useState(1)
  const [incrementPage, setIncrementPage] = useState(0)
  const [nftUploadLoading, setNftUploadLoading] = useState(false)
  const nftUpload = useRef(null)
  const { id } = useParams()
  const [product, setProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [show, setShow] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [nftimages, setNftImages] = useState('')
  const [endCursor, setEndCursor] = useState(false)
  const [selectedImage, setselectedImage] = useState('')
  const [onlyOnce, setOnlyOnce] = useState(false)
  const [addToCartLoading, setAddToCartLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { nfts } = useSelector((state) => state.handleNfts)
  const { uploadedNfts } = useSelector((state) => state.handleNfts)
  const [filteredNftImages, setFilteredNftImages] = useState([])
  const dispatch = useDispatch()
  const [uploadClicked, setUploadClicked] = useState(false)
  const [metamaskWindow, setMetamaskWindow] = useState(null)
  const [currentAccount, setCurrentAccount] = useState(null)

  // HACK So i dont have to rewrite everything without TS
  const account_address = useMemo(() => {
    return {
      account: wagmiAccount.address,
      status: wagmiAccount.isConnected ? 'connected' : 'disconnected',
    }
  }, [wagmiAccount.address, wagmiAccount.isConnected])

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString
    if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1])
    else byteString = unescape(dataURI.split(',')[1])

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], { type: mimeString })
  }

  const addProduct = (product) => {
    let blob
    let cartURL
    let url

    if (!selectedImage) {
      toast.error('Please select NFT')
      return
    }

    setAddToCartLoading(true)
    html2canvas(document.getElementById('product-overview'), {
      useCORS: true,
      logging: true,
      letterRendering: 1,
      allowTaint: true,
    })
      .then(async (canvas) => {
        blob = dataURItoBlob(canvas.toDataURL('image/png'))
        cartURL = canvas.toDataURL('image/png')
        let image = new File([blob], product.title, { type: blob.type })
        let fd = new FormData()
        fd.append('file', image, image.type)

        try {
          console.timeEnd('time')

          if (uploadClicked === true) {
            let response = await axios.post('https://api.tangibleweb3.com/api/file/upload', fd)
            url = `https://api.tangibleweb3.com${response.data.data}`
          }
          let selectedProductDetail = {}
          let selectedNftImage =
            selectedImage && selectedImage.image_url ? selectedImage : { selectedImage }
          selectedProductDetail[`${Date.now()}`] = {
            id: Date.now(),
            size: selectedSize,
            color: selectedValue,
            ...selectedNftImage,
            cartImage: cartURL,
            quantity,
          }
          product.selectedProductDetail = product.selectedProductDetail
            ? { ...product.selectedProductDetail, selectedProductDetail }
            : selectedProductDetail

          if (uploadClicked === true) {
            setProduct({
              ...product,
              qty: quantity,
              selectedSize,
              selectedValue,
              selectedThumb,
              selectedImage,
              cartImage: url,
            })
            dispatch(
              addcart({
                ...product,
                qty: quantity,
                selectedSize,
                selectedValue,
                selectedThumb,
                selectedImage,
                cartImage: url,
              })
            )
          } else {
            setProduct({
              ...product,
              qty: quantity,
              selectedSize,
              selectedValue,
              selectedThumb,
              selectedImage,
              cartImage: cartURL,
            })
            dispatch(
              addcart({
                ...product,
                qty: quantity,
                selectedSize,
                selectedValue,
                selectedThumb,
                selectedImage,
                cartImage: cartURL,
              })
            )
          }
          if (uploadClicked === true) {
            if (product) {
              setAddToCartLoading(false)
              navigate('/cart')
            }
          } else {
            setAddToCartLoading(false)
            navigate('/cart')
          }
        } catch (err) {
          toast.error(err.message)
          setAddToCartLoading(false)
          console.log(err)
        }
      })
      .catch((err) => {
        toast.error('Something went wrong! Please try again later')
        setAddToCartLoading(false)
      })
  }
  const getProduct = async () => {
    let data
    for (let i = 0; i < jsonImage.length; i++) {
      if (jsonImage[i].id == id) {
        data = jsonImage[i]
        switch (data.id) {
          case 40999393001678:
            data = {
              ...data,
              cartStyle: {
                transform: 'translate(-14%, -60%)',
              },
            }
            break
          case 41138846007502:
            data.size = data.size.map((size) => {
              let style
              switch (size.id) {
                case 1:
                  style = {
                    json_width: 35,
                    json_height: 35,
                    json_left: 45,
                    json_top: 12,
                  }
                  break
                case 2:
                  style = {
                    json_width: 45,
                    json_height: 43,
                    json_left: 40,
                    json_top: 10,
                  }
                  break
                case 3:
                  style = {
                    json_width: 44,
                    json_height: 54.1,
                    json_left: 40,
                    json_top: 10,
                  }
                  break
                case 4:
                  style = {
                    json_width: 55,
                    json_height: 54.2,
                    json_left: 35,
                    json_top: 10,
                  }
                  break
              }
              return {
                ...size,
                ...style,
                json_transformRotate: 0,
              }
            })
            data = {
              ...data,
              cartStyle: {
                transform: 'translate(32%, -106%)',
              },
            }
            break
          case 41166794653902:
            data = {
              ...data,
              cartStyle: {
                transform: 'translate(-1%, -81%)',
                width: 30,
              },
            }
            break
          case 40999509065934:
            data = {
              ...data,
              cartStyle: {
                transform: 'translate(-16%, -112%)',
                width: 25,
              },
            }
            break
          case 40992657866958:
            data = {
              ...data,
              cartStyle: {
                width: 25,
                transform: 'translate(10%, -36%) rotate(-13deg)',
              },
            }
            break
        }
      }
    }
    setProduct(data)
  }

  useEffect(() => {
    if (!account_address || (account_address && account_address.status === 'disconnected')) {
      setNftFetchLoop(0)
      setNftImages('')
      setFilteredNftImages([])
    }

    setUploadClicked(false)
    setselectedSize(1)
    getProduct()
  }, [id, account_address, dispatch])

  const fetchNFTs = async () => {
    try {
      await _fetchNFTs()
    } catch (err) {
      toast.error('Error while fetching NFTs. Please try again later.')
    }
  }

  const _fetchNFTs = async () => {
    // Check if the wallet is connected, and exit out if not
    if (!account_address || account_address.status === 'disconnected') {
      return toast.warning('Please connect a wallet first!')
    }
    const address = account_address.account

    // Load the current page of NFTs
    const nfts = await getNftsByAddress(address, endCursor)

    console.info(nfts, 'nfts')

    // Check if the wallet has any NFTs, and exit out if not
    if (!endCursor && nfts.data.length === 0) {
      return toast.error(
        'There are no NFTs in this wallet. Please connect a different wallet with NFTs.'
      )
    }

    // Format the NFTs like the existing state expects
    const formattedNfts = nfts.data.map((nft) => ({
      id: nft.id,
      image_url: nft.mediaUrl,
      token_id: nft.token_id,
      cache_file_url: nft.mediaUrl,
      media_type: nft.mediaType
    }))

    // Copy the NFTs into the state
    setNftImages((prev) => {
      const next = [...(prev || []), ...formattedNfts]
      return unique(next, (x) => x.id)
    })
    setEndCursor(nfts.pageInfo.endCursor)
  }

  useEffect(() => {
    setNftImages((prevNftImags) => {
      if (prevNftImags && prevNftImags.length > 0) {
        let newNftImages = [...prevNftImags, ...nfts]
        let result = Object.values(
          newNftImages.reduce((acc, cur) => Object.assign(acc, { [cur.token_id]: cur }), {})
        )
        return result
      } else {
        return [...nfts]
      }
    })
  }, [nfts])

  const fixURL = (url) => {
    if (url?.startsWith('ipfs')) {
      if (url.startsWith('ipfs://ipfs/')) {
        let splitData1 = url?.split('ipfs://ipfs/')[1]
        return 'https://ipfs.io/ipfs/' + splitData1
      }
      let splitData = url?.split('ipfs://')[1]

      return 'https://ipfs.io/ipfs/' + splitData
    } else {
      return url + '?format=json'
    }
  }

  // increament deacrement counter
  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  useEffect(() => {
    const { ethereum } = window

    console.log('this should bhe active', account_address)
    // Check if MetaMask is installed on user's browser
    if (window.ethereum) {
      setMetamaskWindow(true)
    }
    if (account_address && account_address.status === 'connected') fetchNFTs()

    setselectedImage()
    if (id === '40999393001678') {
      setselectedSize(0)
    } else {
      setselectedSize(1)
    }
    if (id === '41138846007502') {
      setselectedValue(1)
      setselectedthumb(1)
    } else {
      setselectedValue(1)
    }
  }, [id, account_address, dispatch])

  const [selectedSize, setselectedSize] = useState(1)
  const [selectedValue, setselectedValue] = useState('')
  const [selectedThumb, setselectedthumb] = useState(0)

  function ColorChange(id) {
    setselectedValue(id)
  }

  function ThumbnailChange(id) {
    setselectedValue(id)
    if (product.id === 41138846007502) {
      setselectedSize(id)
    }
    handleThumbnailStyle(id)
    if (id === '41138846007502') {
      setselectedthumb(1)
    } else {
      setselectedthumb(0)
    }
  }

  function handleThumbnailStyle(id) {
    let cartStyle

    switch (id) {
      case 1:
        cartStyle = {
          transform: 'translate(32%, -106%)',
        }
        break
      case 2:
        cartStyle = {
          transform: 'translate(27%, -93%)',
          height: 44,
        }
        break
      case 3:
        cartStyle = {
          transform: 'translate(26%, -74%)',
          height: 55,
        }
        break
      case 4:
        cartStyle = {
          transform: 'translate(20%, -74%)',
          width: 55,
          height: 55,
        }
        break
    }
    if (product.id === 41138846007502) {
      setProduct((prevProductState) => {
        return {
          ...prevProductState,
          cartStyle: cartStyle,
        }
      })
    }
  }

  function selectedImageFunc(url) {
    if (url.upload) {
      setselectedImage({ image_url: url.cache_file_url, url: url.image_url, media_type: url.media_type })
    } else if (url.cache_file_url) {
      setselectedImage({ url: url.image_url, image_url: url.cache_file_url, media_type: url.media_type })
    } else {
      setselectedImage({ url: url.image_url, image_url: url.image_url, media_type: url.media_type })
    }
  }

  const handleSelectedSize = (id) => {
    setselectedSize(id)
    if (product.id === 41138846007502) {
      ThumbnailChange(product.thumbnails.find((thm) => thm.id == id).id)
    }
  }

  const handleNftFileChange = async (event) => {
    try {
      if (event.target.files && event.target.files[0]) {
        setNftUploadLoading(true)
        let image_url = URL.createObjectURL(event.target.files[0])
        let image = event.target.files[0]
        let fd = new FormData()
        fd.append('file', image, image.type)
        let response = await axios.post('https://api.tangibleweb3.com/api/file/upload', fd)
        if (response.status === 200) {
          let url = `https://api.tangibleweb3.com${response.data.data}`
          setselectedImage({ image_url, url })

          dispatch(
            upload_nfts({
              id: nftimages.length + 1,
              image_url: url,
              token_id: Date.now(),
              cache_file_url: image_url,
              upload: true,
            })
          )
          // setNftImages((prevNftImages) => {
          // 	return [...prevNftImages, { id: prevNftImages.length + 1, image_url: url, token_id: Date.now(), cache_file_url: image_url, upload:true}];
          // });
          setNftUploadLoading(false)

          if (selectedValue == '0') {
            setselectedValue(1)
          }
          handleThumbnailStyle(selectedSize)
          getProduct()
        } else {
          toast.error('Error Uploading nft. Please try again laer')
          setNftUploadLoading(false)
        }
      }
    } catch (err) {
      console.log(err)
      toast.error('Error Uploading nft. Please try again laer')
      setNftUploadLoading(false)
    }
  }

  const handleUploadFileClick = (event) => {
    setUploadClicked(true)
    nftUpload.current.click()
  }

  // const loadNftOnScroll = useCallback(() => {
  //   const element = document.getElementById('nft-images-container')
  //   if (element.scrollHeight - element.scrollTop === element.clientHeight) {
  //     setFilteredNftImages((prevImages) => {
  //       let nftImagesDiff = nftimages.length - prevImages.length
  //       let sliceEndIndex = nftImagesDiff < 10 ? nftImagesDiff : 10
  //       if (nftimages.slice(prevImages.length, prevImages.length + sliceEndIndex).length > 0) {
  //         let newNftImages = [
  //           ...prevImages,
  //           ...nftimages.slice(prevImages.length, prevImages.length + sliceEndIndex),
  //         ]
  //         return newNftImages
  //       } else {
  //         return prevImages
  //       }
  //     })
  //   }
  // }, [nftimages])

  const handleNftImageBox = () => {
    let container = document.getElementById('nft-images-container')
    container.style.boxShadow = '0px 0px 4px transparent'
    if (show && container) {
      container.style.boxShadow = '0px 0px 4px transparent'
    } else {
      container.style.boxShadow = '0px 0px 4px #ccc'
    }
  }

  useEffect(() => {
    if (filteredNftImages.length > 0) {
      setFilteredNftImages((prevImages) => {
        let nftImagesDiff = nftimages.length - prevImages.length
        let sliceEndIndex = nftImagesDiff < 10 ? nftImagesDiff : 10
        if (nftimages.slice(prevImages.length, prevImages.length + sliceEndIndex).length > 0) {
          let newNftImages = [
            ...prevImages,
            ...nftimages.slice(prevImages.length, prevImages.length + sliceEndIndex),
          ]
          return newNftImages
        } else {
          return prevImages
        }
      })
    } else {
      setFilteredNftImages([...nftimages.slice(0, 10)])
    }
  }, [nftimages])

  const handleLoadMore = async () => {
    await fetchNFTs()
  }
  return (
    <div className='single-product-sec pt-5 pb-5'>
      <div className='container-wrap'>
        <div className='product-row row'>
          {product ? (
            <div className='col-md-6'>
              <div id='product-overview' className='single-photo-product pb-4'>
                {selectedThumb == '1' && selectedValue == '0' ? (
                  <img src={product.images.default} alt='ShirtBlack' />
                ) : (
                  ''
                )}
                {product.thumbnails.map((res) => {
                  if (res.id === selectedValue) {
                    return (
                      <div key={res.id}>
                        {res.id === selectedValue ? (
                          <img src={res.url.default} alt='ShirtBlack' />
                        ) : null}
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
                {selectedImage ? (
                  product.id === 41138846007502 ? (
                    <div
                      className='container-select-img text-center default-style'
                      style={{
                        position: 'absolute',
                        background: 'green',
                        overflow: 'hidden',
                        width: `${product.size.find((s) => s.id == selectedValue)?.json_width}%`,
                        left: `${product.size.find((s) => s.id == selectedValue)?.json_left}%`,
                        top: `${product.size.find((s) => s.id == selectedValue)?.json_top - 1}%`,
                        height: `${product.size.find((s) => s.id == selectedValue)?.json_height}%`,
                        transform: `rotate(${
                          product.size.find((s) => s.id == selectedValue)?.json_transformRotate
                        }deg)`,
                      }}
                    >
                     {['svg', 'svg+xml'].includes(selectedImage.media_type) ? (
                        <object
                          data={selectedImage?.image_url ? selectedImage.image_url : selectedImage}
                          style={{
                            position: 'absolute',
                            left: selectedValue === 3 ? '-24px' : 0,
                            top: 0,
                            width: selectedValue === 3 ? '150%' : '110%'
                          }}
                        />
                      ) : (
                        <img
                          src={selectedImage?.image_url ? selectedImage.image_url : selectedImage}
                        />
                      )}
                    </div>
                  ) : (
                    
                    <div
                      className='container-select-img text-center'
                      style={{
                        position: 'absolute',
                        width: `${product.json_width}%`,
                        left: `${product.json_left}%`,
                        top: `${product.json_top}%`,
                        height: `${product.json_height}%`,
                        transform: `rotate(${product.json_transformRotate}deg)`,
                      }}
                    > 
                    {['svg', 'svg+xml'].includes(selectedImage.media_type) ? (
                        <object
                          data={selectedImage?.image_url ? selectedImage.image_url : selectedImage}
                          style={{
                            position: 'absolute',
                            left: selectedValue === 3 ? '-24px' : 0,
                            top: 0,
                            width: selectedValue === 3 ? '150%' : '110%'
                          }}
                        />
                      ) : (
                        <img
                          src={selectedImage?.image_url ? selectedImage.image_url : selectedImage}
                        />
                      )}
                    </div>
                  )
                ) : (
                  ''
                )}
              </div>
              <div className='thumbnail-imgs thumbnail-imgs-examples row d-flex gx-2 gy-2'>
                {product.thumbnails.map((res) => {
                  return (
                    <div key={res.id}>
                      <p
                        className={`${
                          product.id === 41138846007502 && selectedThumb === 1
                            ? selectedThumb === res.id
                              ? 'selected-thumbnail'
                              : ''
                            : selectedValue === res.id
                            ? 'selected-thumbnail'
                            : ''
                        } col`}
                        onChange={() => ThumbnailChange(res.id)}
                      >
                        <input
                          type='radio'
                          name='image'
                          defaultChecked={selectedThumb === res.id}
                          value={res.id}
                        />
                        <img src={res.url.default} alt={product.title} key={res.id} />
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            ''
          )}
          <div className='prodcut-description col-md-6'>
            <h2>
              <b>{product.title}</b>
            </h2>
            <h2 className='product-price pb-4'>
              $
              {product && product?.size.length && selectedSize !== ''
                ? product.size.find((size) => size.id === selectedSize)?.price
                : product.price}
            </h2>
            <div className='product-inn-details'>
              {product.size && product.size.length ? (
                <div className='size pt-3'>
                  <label className='size-lable bold-txt'>Size</label>
                  <div className='size-container'>
                    {product ? (
                      <div className='size-elements'>
                        {product.size.map((res) => {
                          return (
                            <div
                              className='size-element'
                              key={res.id}
                              onChange={() => handleSelectedSize(res.id)}
                            >
                              <input
                                defaultChecked={selectedSize === res.id}
                                type='radio'
                                name='size'
                                value={res.id}
                              />
                              <label htmlFor={res.type}>{res.type}</label>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ) : (
                ''
              )}
              {product.color && product.id != 41138846007502 ? (
                <div className='color pt-3'>
                  <label className='color-lable bold-txt'>Color</label>
                  <div className='color-container'>
                    <div className='color-elements'>
                      {product ? (
                        <div className='size-elements colors-size-elements'>
                          {product.color.map((res) => {
                            return (
                              <div
                                className='color-element'
                                onChange={() => ColorChange(res.id)}
                                key={res.id}
                              >
                                <Tooltip title={res.color_name}>
                                  <input
                                    defaultChecked={selectedValue === res.id}
                                    type='radio'
                                    name='color'
                                    value={res.id}
                                  />
                                  <label
                                    htmlFor={res.color_name}
                                    className={
                                      selectedValue === res.id
                                        ? `checked_label ${res.color_name}`
                                        : res.color_name
                                    }
                                  ></label>
                                </Tooltip>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className='quantity pt-3'>
                <label className='color-lable bold-txt'>Quantity</label>
                <div className='productarea'>
                  <button className='productminus' onClick={() => handleQuantity('dec')}>
                    <i className='fa fa-minus' aria-hidden='true'></i>
                  </button>

                  <span className='product-detail-amount product__quat'>{quantity}</span>
                  <button className='productplus' onClick={() => handleQuantity('inc')}>
                    <i className='fa fa-plus' aria-hidden='true'></i>
                  </button>
                </div>
              </div>
            </div>
            <button className='btn btn-primary personalize my-4' type='submit' onClick={showModal}>
              Select From Wallet
            </button>

            {/* <div style={{ textAlign: 'center' }}>OR</div>
            <button
              onClick={() => {
                setShowUploadModal(true)
              }}
              className='btn btn-primary personalize my-4'
            >
              Upload NFT
            </button> */}

            <img src={securepartners} alt='securepartners' className='securepartners' />
            <div className='productDescription'>
              <br></br>
              <p>
                You’re going to look awesome with your new Tangible Web3 gear! Bring your favorite
                NFT art to life and show it off to the world. Most importantly, treat yourself for
                once! You deserve this.
              </p>
              Possible side effects of wearing this include:
              <br></br>
              <ol>
                <li>Making other NFT holders jealous of your incredible Tangible gear.</li>
                <li>Wanting to HODL your NFT in real life.</li>
                <li>You may feel a bit incomplete by not also getting the other items we offer!</li>
              </ol>
              <strong>More reasons to get our stuff:</strong>
              <br></br>
              <br></br>
              <p>
                <strong>Unique Designs:</strong> We only print wallet verified NFTs. Your Tangible
                gear will be just as unique as your NFT.
              </p>
              <p>
                <strong>Quality:</strong> We know you value your NFT and the community it
                represents. So we only use the best of the best when printing your NFT so that you
                can be proud to HODL!
              </p>
              <p>
                <strong>Packaged with care:</strong> Every order is packaged to ensure it keeps its
                quality all the way to your front door. Making sure what you bought is exactly what
                you get.
              </p>
              <p>
                <strong>Support a small business:</strong> We’re a small family-owned business based
                in Missouri. We work hard to deliver high-quality products and service to our
                customers that they can be proud of!
              </p>
            </div>
            <SelectNftImageModal
              product={product}
              isModalVisible={isModalVisible}
              handleCancel={handleCancel}
              selectedImage={selectedImage}
              filteredNftImages={filteredNftImages}
              selectedThumb={selectedThumb}
              selectedValue={selectedValue}
              selectedSize={selectedSize}
              addToCartLoading={addToCartLoading}
              account_address={account_address}
              addProduct={addProduct}
              isFilteredMaxedOut={nftimages.length === filteredNftImages.length}
              hasLoadMore={!!endCursor}
              selectedImageFunc={selectedImageFunc}
              handleLoadMore={handleLoadMore}
              metamaskWindow={metamaskWindow}
              handleNftImageBox={handleNftImageBox}
              setselectedImage={setselectedImage}
              containerRef={containerRef}
              ThumbnailChange={ThumbnailChange}
            />
            {console.log(uploadedNfts, nfts)}
            <UploadImageModal
              product={product}
              showUploadModal={showUploadModal}
              setShowUploadModal={setShowUploadModal}
              selectedImage={selectedImage}
              uploadedNfts={uploadedNfts}
              selectedThumb={selectedThumb}
              selectedValue={selectedValue}
              selectedSize={selectedSize}
              addToCartLoading={addToCartLoading}
              account_address={account_address}
              addProduct={addProduct}
              show={show}
              selectedImageFunc={selectedImageFunc}
              setselectedImage={setselectedImage}
              containerRef={containerRef}
              ThumbnailChange={ThumbnailChange}
              handleNftFileChange={handleNftFileChange}
              nftUploadLoading={nftUploadLoading}
              handleUploadFileClick={handleUploadFileClick}
              nftUpload={nftUpload}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

async function getNftsByAddress(address, _after) {
  console.log('getNftsByAddress', { address, after: _after })

  const API_KEY = `b5a00bb3-27e6-4c50-a95b-cae450d617a9`
  const after = _after ? `?after=${_after}` : ''
  const url = `https://nft-api-edge-proxy.byt.workers.dev/v1/${API_KEY}/eth-mainnet/listWalletNfts/${address}${after}`
  const response = await fetch(url)
  return response.json()
}

export default Product