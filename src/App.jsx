import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Movies from './pages/Movies';
import Authors from './pages/Authors';


export default function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/authors" element={<Authors />} />
      </Routes>
    </div>
  )
}