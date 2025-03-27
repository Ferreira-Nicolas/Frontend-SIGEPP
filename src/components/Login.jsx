import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Alterado de useHistory para useNavigate
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();  // Usando useNavigate para redirecionamento

  // Função para lidar com o envio do formulário e login
  const handleLogin = (e) => {
    e.preventDefault();  // Previne o comportamento padrão do formulário

    if (username === '' || password === '') {
      setError('Por favor, preencha todos os campos!');
    } else {
      // Simulação de verificação de login
      if (username === 'nick' && password === '123456') {
        navigate('/home');  // Redireciona para /home ao fazer login
      } else {
        setError('Login ou senha incorretos!');  // Mostra erro caso as credenciais sejam inválidas
      }
    }
  };

  return (
    <section className="login">
      <form onSubmit={handleLogin} className="login-form"> {/* Alterei para chamar handleLogin no submit */}
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

        <button type="submit" className="login-btn">Entrar</button> {/* Agora chama handleLogin */}
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe o erro se houver */}
      </form>
      <div className="login-banner"></div>
    </section>
  );
};

export default Login;
