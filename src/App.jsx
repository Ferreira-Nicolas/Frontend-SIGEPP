import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default App;
