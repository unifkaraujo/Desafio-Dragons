import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { ListaDragoes } from './pages/ListaDragoes/ListaDragoes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        {/* Ao entrar na rota principal, é feito checagem de autenticação */}
        <Route element={<PrivateRoute />}>
          <Route path="/dragons" element={<ListaDragoes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;