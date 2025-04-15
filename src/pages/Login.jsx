import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Estado adicionado para a senha
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Função para lidar com o envio do formulário
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('Por favor, preencha todos os campos!');
    } else {
      // Simulação de verificação de login
      if (username === 'nick' && password === '123456') {
        navigate('/home');
      } else {
        setError('Login ou senha incorretos!');
      }
    }
  };

  return (
    <section className="login">
      <form onSubmit={handleLogin} className="login-form">
        <img src="/src/assets/img/so_logo_sigeep.PNG" alt="LOGO-SIGEPP" className='logo-sigepp' />
        <h2>SIGEPP</h2>
        <div className="input-group group-user">
          <label htmlFor="username">Usuário</label>
          <input
            className="login-input-username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
            required
          />
        </div>

        <div className="input-group group-password">
          <label htmlFor="password">Senha</label>
          <input
            className="login-input-password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit" className="login-btn">Entrar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <div className="login-banner"></div>
    </section>
  );
};

export default Login;
