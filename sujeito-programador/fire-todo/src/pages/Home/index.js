import { useState } from "react";
import './home.css';
import { Link, useNavigate } from "react-router-dom";

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Home(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', { replace: true } );
      })
      .catch(() => {

      });

    }else{
      alert('preencher campos')
    }
  }

    return(
      <div className="home-container">
        <h1>Lista de Tarefas</h1>
        <span>Gerencie sua agenda de forma fácil.</span>

        <form className="form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="digite seu e-mail"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <input
            autoComplete="false"
            type="password"
            placeholder="digite a senha"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

          <button type="submit">Acessar</button>
        </form>
        <Link className="button-link" to='/register'>
          Não possui uma conta? Cadastre-se
        </Link>
      </div>
    )
  }