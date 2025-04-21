import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dragonLogo from '../../assets/logo.png';
import './Login.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('Autenticado') === 'true';
    if (isAuthenticated) {
      navigate('/dragons');
    }
  }, []);

  const processLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.toLowerCase() === 'admin' && password === '1234') {
      localStorage.setItem('Autenticado', 'true');
      navigate('/dragons');
    } else {
      setError('Usuário ou senha inválidos');
    }
    
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={dragonLogo} alt="Logo do Dragão" className="dragon-logo" />
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={processLogin}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
        
      </div>
    </div>
  );
};
