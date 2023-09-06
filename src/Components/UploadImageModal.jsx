import { Modal, Tooltip } from 'antd'
import { Spinner } from 'react-bootstrap'

const UploadImageModal = ({
  product,
  showUploadModal,
  setShowUploadModal,
  selectedImage,
  uploadedNfts,
  selectedThumb,
  selectedValue,
  selectedSize,
  addToCartLoading,
  addProduct,
  selectedImageFunc,
  setselectedImage,
  containerRef,
  ThumbnailChange,
  handleNftFileChange,
  nftUploadLoading,
  handleUploadFileClick,
  nftUpload,
}) => {
  return (
    <Modal open={showUploadModal} onCancel={() => setShowUploadModal(false)} className='cart-popup'>
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

                      width: `${product.size.find((s) => s.id == selectedValue)?.json_width}%`,
                      left: `${product.size.find((s) => s.id == selectedValue)?.json_left}%`,
                      top: `${product.size.find((s) => s.id == selectedValue)?.json_top}%`,
                      height: `${product.size.find((s) => s.id == selectedValue)?.json_height}%`,
                      transform: `rotate(${
                        product.size.find((s) => s.id == selectedValue)?.json_transformRotate
                      }deg)`,
                    }}
                  >
                    <img src={selectedImage?.image_url ? selectedImage.image_url : selectedImage} />
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
                    <img src={selectedImage?.image_url ? selectedImage.image_url : selectedImage} />
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
              <div className='fileadd-box'>
                <input
                  ref={nftUpload}
                  onChange={handleNftFileChange}
                  type='file'
                  accept='.jpg,.jpeg, .png, ,gif'
                  hidden
                  style={{ display: 'none' }}
                />
                <button
                  disabled={nftUploadLoading}
                  onClick={handleUploadFileClick}
                  className='btn btn-primary btn-dark select-btn'
                >
                  {nftUploadLoading && (
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
                  Upload NFT
                </button>
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
            <div
              ref={containerRef}
              id='nft-images-container'
              className='thumbnail-imgs nft-images row d-flex box-select-img'
            >
              {uploadedNfts.length > 0
                ? uploadedNfts.map((res) => {
                    return (
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
                          <img
                            src={res.cache_file_url ? res.cache_file_url : res.image_url}
                            alt={res.id}
                          />
                        </p>
                      </div>
                    )
                  })
                : ''}
            </div>

            <div className='product-thumbnails'>
              <div className='option-name pt-2'></div>
              {product ? (
                <div className='thumbnail-imgs row d-flex pt-3 pb-3'>
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

export default UploadImageModal
