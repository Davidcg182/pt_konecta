import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Empleados from './components/empleados/empleados';
import Solicitudes from './components/solicitudes/solicitudes';

function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/empleados' element={<Empleados />} />
        <Route exact path='/solicitudes' element={<Solicitudes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
