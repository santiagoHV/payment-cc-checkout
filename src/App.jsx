import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import HomePage from './features/HomePage'
import ProductPage from './features/ProductPage'
import Navbar from './components/common/Navbar'


function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
