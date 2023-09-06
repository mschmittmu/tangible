import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Alert, Modal, Tooltip } from 'antd'
import { Spinner } from 'react-bootstrap'

const SelectNftImageModal = ({
  product,
  isModalVisible,
  handleCancel,
  selectedImage,
  filteredNftImages,
  selectedThumb,
  selectedValue,
  selectedSize,
  addToCartLoading,
  account_address,
  addProduct,
  hasLoadMore,
  selectedImageFunc,
  handleLoadMore,
  metamaskWindow,
  connectWalletHandler,
  handleNftImageBox,
  setselectedImage,
  containerRef,
  ThumbnailChange,
  isFilteredMaxedOut,
}) => {
  const walletIsNotConnected = !account_address || account_address.status === 'disconnected'
  const hasNfts = filteredNftImages.length > 0

  return (
    <Modal open={isModalVisible} onCancel={handleCancel} className='cart-popup'>
      <div className='row'>
        <div className='col-md-6 left-popup-sec'>
          {product ? (
            <div id='product-overview' className='size-elements edit-img'>
              {selectedThumb == '1' && selectedValue == '0' ? (
                <img src={product.images.default} alt='ShirtBlack' />
              ) : (
                ''
              )}
              {product.thumbnails.map((res) => {
                return res.id === selectedValue ? (
                  <div key={res.id}>
                    <img src={res.url.default} alt='ShirtBlack' />
                  </div>
                ) : null
              })}
              {/* Edit image */}
              {selectedImage ? (
                product.id === 41138846007502 ? (
                  <div
                    className='container-select-img text-center default-style'
                    style={{
                      position: 'absolute',
                      overflow: 'hidden',
                      width: `${product.size.find((s) => s.id == selectedValue)?.json_width}%`,
                      left: `${product.size.find((s) => s.id == selectedValue)?.json_left}%`,
                      top: `${product.size.find((s) => s.id == selectedValue)?.json_top}%`,
                      height: `${product.size.find((s) => s.id == selectedValue)?.json_height}%`,
                      transform: `rotate(${
                        product.size.find((s) => s.id == selectedValue)?.json_transformRotate
                      }deg)`,
                    }}
                  >
                    {['svg', 'svg+xml'].includes(selectedImage.media_type) ? (
                      <object 
                      style={{
                        position: 'absolute',
                        left: selectedValue === 3 ? '-6%' : '.5px',
                        top: 0,
                        width: selectedValue === 3 ? '150%' : '110%'
                      }}
                        data={selectedImage?.image_url ? selectedImage.image_url : selectedImage}
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
                          left: selectedValue === 3 ? '-6%' : '.5px',
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
          ) : (
            ''
          )}
        </div>
        <div className='col-md-6 right-popup-sec mt-4 mt-md-0 px-md-0 px-2 pb-md-0 pb-4'>
          <div className='modal-right-side'>
            <div className='button-on-dark d-flex'>
              <div className='fileadd-box' data-rk>
                {walletIsNotConnected ? (
                  <ConnectButton showBalance={false} />
                ) : (
                  <div
                    className='btn btn-primary btn-dark select-btn'
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    Select a NFT from your wallet below
                  </div>
                )}
              </div>
              {selectedImage && (
                <button
                  className='btn btn-primary btn-dark close-controls'
                  onClick={(e) => setselectedImage()}
                >
                  X
                </button>
              )}
            </div>

            {!walletIsNotConnected && !hasNfts && (
              <Alert
                type='error'
                message='There are no NFTs in this wallet. Please connect a different wallet with NFTs.'
              />
            )}
            {!walletIsNotConnected && hasNfts && (
              <div
                ref={containerRef}
                id='nft-images-container'
                className='thumbnail-imgs nft-images row d-flex box-select-img'
              >
                {filteredNftImages.map((res) => (
                  <div className='modal_thum' key={res.id}>
                    <p
                      className='col mb-0 px-1 px-md-2 py-2'
                      onClick={() => selectedImageFunc(res)}
                    >
                      <input
                        type='radio'
                        name='image'
                        defaultChecked={
                          (selectedImage?.image_url &&
                            selectedImage?.image_url === res.image_url) ||
                          selectedImage === res.image_url
                        }
                        value={res.id}
                      />
                      {['svg', 'svg+xml'].includes(res.media_type) ? (
                        <object
                          alt={res.id}
                          data={res.cache_file_url ? res.cache_file_url : res.image_url}
                        />
                      ) : (
                        <img
                          src={res.cache_file_url ? res.cache_file_url : res.image_url}
                          alt={res.id}
                        />
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {!walletIsNotConnected && (hasLoadMore || !isFilteredMaxedOut) && (
              <>
                <div className='upload-nft-btn-wrapper'>
                  <button
                    className='btn btn-primary btn-dark select-btn'
                    onClick={async () => {
                      handleLoadMore()
                    }}
                  >
                    Load More
                  </button>
                </div>
              </>
            )}

            <div className='product-thumbnails'>
              <div className='option-name pt-2'></div>
              {product ? (
                <div className='thumbnail-imgs thumbnail-imgs-examples row d-flex pt-3 pb-3'>
                  {product.thumbnails.map((res, id) => {
                    return (
                      <div className='modal_thum' key={res.id}>
                        <p
                          className='col mb-0 px-1 px-md-2'
                          onChange={() => ThumbnailChange(res.id)}
                        >
                          <Tooltip
                            title={
                              product.id === 41138846007502
                                ? product?.size[id]?.type
                                : product.title
                            }
                          >
                            <input
                              type='radio'
                              name='image'
                              defaultChecked={selectedThumb === res.id}
                              value={res.id}
                            />
                            <img
                              style={
                                product.id === 41138846007502 && selectedThumb === 1
                                  ? selectedThumb === res.id
                                    ? { border: '3px solid #000' }
                                    : { border: '3px solid #fff' }
                                  : selectedValue === res.id
                                  ? { border: '3px solid #000' }
                                  : { border: '3px solid #fff' }
                              }
                              src={res.url.default}
                              alt={product.title}
                              key={res.id}
                            />
                          </Tooltip>
                        </p>
                      </div>
                    )
                  })}
                </div>
              ) : (
                ''
              )}
              <button
                disabled={addToCartLoading}
                className='btn btn-primary personalize cartpopup-button mt-4 mt-md-0'
                type='submit'
                onClick={() => addProduct(product)}
              >
                {addToCartLoading && (
                  <>
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                    &nbsp;
                  </>
                )}
                <span>
                  $
                  {selectedSize && product
                    ? product.size.find((size) => size.id === selectedSize).price
                    : product.price}
                </span>
                - ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SelectNftImageModal
