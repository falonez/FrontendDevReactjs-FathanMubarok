import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailRestaurant from '../pages/DetailRestaurant';
import Home from '../pages/Home';
import './index.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/detail/:id" element={<DetailRestaurant/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
