import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import BannerHome from '../../Assets/Images/bannerhome.webp'
import FEEDBACK_IMG_1 from '../../Assets/Images/testimonial/feedback_1.webp'
import FEEDBACK_IMG_2 from '../../Assets/Images/testimonial/feedback_2.webp'
import FEEDBACK_IMG_3 from '../../Assets/Images/testimonial/feedback_3.webp'
import productsJson from '../../productsJson.js'
function Home() {
  const [products, setProducts] = useState([])
  let ComponentMouted = true

  // Home page product using API
  useEffect(() => {
    const getProducts = async () => {
      if (ComponentMouted) {
        console.log('Hamza', productsJson)
        setProducts(productsJson)
      }
      return () => {
        ComponentMouted = false
      }
    }
    getProducts()
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className='home-banner'>
        <img src={BannerHome} alt='bannerhome' />
      </div>
      <div className='featured-section pt-3'>
        <div className='container-wrap'>
          <h2 className='text-center mb-0'>Featured Products </h2>
          <div className='featured'>
            <div className='featured-row row pt-md-5 pb-md-5 pt-2 pb-4'>
              {products.map((product) => {
                return (
                  <div className='product-fea col-md-3 col-6 pb-2' key={product.id}>
                    <NavLink to={`/product/${product.id}`}>
                      <div className='wraper-prod-img'>
                        <img src={product.images.default} alt={product.title} />
                        <img
                          src={product.hover_images.default}
                          alt={product.title}
                          className='prod-img-hover'
                        />
                      </div>
                      <p className='text-center pt-2 mb-0'>{product.title}</p>
                    </NavLink>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='happy-section'>
        <div className='container-wrap'>
          <h2 className='text-center'>Happy Customers</h2>
          <div className='testimonial'>
            {[
              {
                message: `I’ve bought art from a lot of websites online, and without a doubt Tangible Tokenz is about to take over the market. The quality is incredible and they take less than a minute to hang.
                                As an avid NFT enthusiast and someone who loves having unique art on their walls, the ability to have my koda hanging in my office is perfect. 10/10 you need to get one!!!`,
                name: 'Will Perkins',
                profession: 'COO at Byt.io',
                src: FEEDBACK_IMG_1,
                img: 'feedback_1.webp',
                productId: 40999509065934,
              },
              {
                message: `The build quality is great and it’s a perfect print of my nft. It’s a great conversation starter in the background for my client meetings.`,
                name: 'Kaleb Phillips',
                profession: 'CEO Byt.io',
                src: FEEDBACK_IMG_2,
                img: 'feedback_2.webp',
                productId: 40999393001678,
              },
              {
                message: `I ordered the 24x24 Metal Poster / Portrait, and it is incredibly smooth and super detailed. I needed something of super high quality to represent such a detailed NFT, and TangibleWeb3 did not disappoint. The artwork looks so good on the metal, and the quality is definitely 10/10, top notch. Can’t wait to order more stuff through you guys. Thanks for the prompt shipping and the insane quality. Love mine!`,
                name: 'Satoshi’s Mom',
                profession: 'Created of the STONEYVERSE',
                src: FEEDBACK_IMG_3,
                img: 'feedback_3.webp',
                productId: 41138846007502,
              },
            ].map((feedback) => {
              return (
                <div key={feedback.src} className='testimonial-card'>
                  <img src={feedback.src} alt={feedback.img} />

                  <div className='testimonial-body'>
                    <div className='testimonial-user'>
                      <span>{feedback.name}</span>
                      <div dangerouslySetInnerHTML={{ __html: feedback.profession }} />
                    </div>
                    <div style={{ margin: '5px 0' }}>
                      {[1, 2, 3, 4, 5].map(() => (
                        <i
                          className='fa fa-star'
                          style={{ color: 'orange' }}
                          aria-hidden='true'
                        ></i>
                      ))}
                    </div>
                    <p>{feedback.message}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
