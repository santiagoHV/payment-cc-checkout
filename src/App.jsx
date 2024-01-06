import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProductPage from './features/ProductPage'
import HomePage from './features/HomePage'
import { Provider } from 'react-redux'
import store from './store/configureStore'

function App() {
  return (
    <Provider store={store}>
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
