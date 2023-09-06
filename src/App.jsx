import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css'
import '../src/Assets/Css/Page.css'
import './App.css'

const Header = lazy(() => import('./Components/Header'))
const Footer = lazy(() => import('./Components/Footer'))
const Home = lazy(() => import('./Components/Pages/Home'))
const AboutUs = lazy(() => import('./Components/Pages/AboutUs'))
const Catalog = lazy(() => import('./Components/Pages/Catalog'))
const ContactUs = lazy(() => import('./Components/Pages/ContactUs'))
const PrivacyPolicy = lazy(() => import('./Components/Pages/PrivacyPolicy'))
const GiveAwayRules = lazy(() => import('./Components/Pages/GiveAwayRules'))
const RefundPolicy = lazy(() => import('./Components/Pages/RefundPolicy'))
const Search = lazy(() => import('./Components/Pages/Search'))
const Tos = lazy(() => import('./Components/Pages/Tos'))
const Error = lazy(() => import('./Components/Error'))
const Product = lazy(() => import('./Components/Product'))
const Cart = lazy(() => import('./Components/Cart'))

function App() {
  return (
    <div className='App'>
      <Suspense fallback={''}>
        <Header />

        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/aboutus' element={<AboutUs />}></Route>
          <Route exact path='/catalog' element={<Catalog />}></Route>
          <Route exact path='/contactus' element={<ContactUs />}></Route>
          <Route exact path='/privacypolicy' element={<PrivacyPolicy />}></Route>
          <Route exact path='/refundpolicy' element={<RefundPolicy />}></Route>
          <Route exact path='/giveawayrules' element={<GiveAwayRules />}></Route>
          <Route exact path='/search' element={<Search />}></Route>
          <Route exact path='/tos' element={<Tos />}></Route>
          <Route exact path='/cart' element={<Cart />}></Route>
          <Route exact path='/product/:id' element={<Product />}></Route>
          <Route path='*' exact={true} element={<Error />}></Route>
        </Routes>
        <ToastContainer />

        <Footer />
      </Suspense>
    </div>
  )
}

export default App
