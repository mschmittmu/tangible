import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import sitelogo from '../Assets/Images/sitelogo.webp'
import { add_account, delete_account } from '../redux/action/account'
import { addAccountDetail } from '../utility/account.storage'
import './Header.css'
import SearchBar from './SearchBar'

function Header() {
  const [currentAccount, setCurrentAccount] = useState(null)
  const state = useSelector((state) => state.handleCart)
  const account_address = useSelector((state) => state.handleAccount)
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const [showSubmenu, setShowSubmenu] = useState(false)

  useEffect(() => {
    const { ethereum } = window
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts) => {
        //disconnected gives undefined
        //otherwise the new account address
        if (!accounts[0]) {
          dispatch(delete_account())
        } else {
          dispatch(add_account({ account: accounts[0], status: 'connected' }))
          addAccountDetail({ account: accounts[0], status: 'connected' })
        }
      })
    } else {
    }

    setCurrentAccount(account_address)

    console.log('setCurrentAccount', account_address)
  }, [account_address, dispatch, currentAccount])

  const countPorductQuantity = () => {
    return state
      .map((product) => {
        return Object.entries(product.selectedProductDetail)
          .map((detail) => detail[1])
          .reduce((a, b) => a + b.quantity, 0)
      })
      .reduce((a, b) => a + b, 0)
  }
  return (
    <>
      <div className='header_wraper'>
        <div className='topbar shippingbar mb-md-4 pt-3 pb-3'></div>
        <div className='container-wrap'>
          <Navbar collapseOnSelect expand='xl' expanded={expanded}>
            <div className='logo'>
              <Link to='/'>
                <img src={sitelogo} alt='sitelogo' />
              </Link>
            </div>
            <div className='buttons-header d-flex'>
              <SearchBar />
              <ConnectButton showBalance={false} />
            </div>
            <div className='cart'>
              <Link to='/cart'>
                {' '}
                <i className='fa fa-shopping-cart' aria-hidden='true'>
                  <span>{state && state.length > 0 ? countPorductQuantity() : 0}</span>
                </i>
              </Link>
            </div>
            <div className='nav-wraper mt-2 mt-md-5'>
              <Navbar.Toggle
                aria-controls='responsive-navbar-nav'
                id='btnMemu'
                onClick={() => setExpanded(expanded ? false : 'expanded')}
              />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto' onClick={() => setExpanded(false)}>
                  {/* <NavLink to="/" exact="true" activeclassname="active">Home</NavLink> */}
                  <li>
                    <NavLink to='/product/41138846007502' activeclassname='active'>
                      Metal Sign
                    </NavLink>
                  </li>
                  <li
                    className='submenu-has'
                    onMouseOver={() => {
                      // Prevent double-trigger with onClick
                      if (!isTouchDevice()) {
                        setShowSubmenu(true)
                      }
                    }}
                    onMouseOut={() => setShowSubmenu(false)}
                  >
                    <Nav.Link
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setShowSubmenu((x) => !x)
                      }}
                    >
                      Apparel <i className='fa fa-caret-down' aria-hidden='true'></i>
                    </Nav.Link>
                    <ul className='submenus' style={showSubmenu ? { display: 'grid' } : {}}>
                      <NavLink
                        to='/product/41166794653902'
                        activeclassname='active'
                        onClick={() => setShowSubmenu(false)}
                      >
                        T-shirt
                      </NavLink>
                      <NavLink
                        to='/product/40992657866958'
                        activeclassname='active'
                        onClick={() => setShowSubmenu(false)}
                      >
                        hoodie
                      </NavLink>
                      <NavLink
                        to='/product/40999509065934'
                        activeclassname='active'
                        onClick={() => setShowSubmenu(false)}
                      >
                        ladies-t-shirt
                      </NavLink>
                    </ul>
                  </li>
                  <li>
                    <NavLink to='/product/40999393001678' activeclassname='active'>
                      MUG
                    </NavLink>
                  </li>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </div>
      </div>
    </>
  )
}
export default Header

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
}
