import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import products from '../productsJson.js'

const SearchBar = () => {
  let navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = () => {
    navigate('/search')
  }

  const matchingProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='templateContainer'>
      <div className='searchInput_Container'>
        <form onSubmit={handleSubmit} className='search-top'>
          <input
            id='searchInput'
            className='px-2 py-2'
            type='text'
            value={searchTerm}
            placeholder='Search: Hoodies, Mugs, etc...'
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}
          />
          <button type='submit' className='btn btn-dark'>
            <i className='fa fa-search' aria-hidden='true'></i>
          </button>
        </form>
      </div>
      {searchTerm && (
        <div className='template_Container result-search-show'>
          <div className='show-search'>
            <div className='template'>
              {matchingProducts.map((product, index) => (
                <div
                  key={product.id}
                  className='search-wrapp-result'
                  style={{ marginBottom: index === matchingProducts.length - 1 ? 0 : 10 }}
                >
                  <img src={product.images.default} alt='' />
                  <div className='search-info'>
                    <Link to={`/product/${product.id}`} onClick={() => setSearchTerm('')}>
                      <h3>{product.title}</h3>
                    </Link>
                    <p className='price'>${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
