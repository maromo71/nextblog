import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router'
import Header from '../../components/Header';
import { Container, Input, Label } from 'reactstrap';
import Footer from '../../components/Footer';


const Register = () => {

  const router = useRouter();

  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');

  const [notify, setNotification] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (password !== passConf) {
      setNotification('Password and password confirmation does not match')

      setTimeout(() => {
        setNotification('')
      }, 2000)

      setPassword('');
      setPassConf('');
      return null;

    }

    fire.auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message)
      });

    router.push("/")
  }

  return (
    <div>
      <Header />
      <Container>


       

        {notify}
        <Container style={{ width: '60%', margin: '0 auto', alignContent: 'center' }}>
        <h2>Criando novo usuário</h2>
          <form onSubmit={handleLogin}>
            <Label for="username">Email</Label>
            <Input type="text" value={userName} onChange={({ target }) => setUsername(target.value)} />
            <br />
            <Label for="password">Senha</Label>
            <Input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            <br />
            <Label for="password">Confirmação da Senha</Label>
            <Input type="password" value={passConf} onChange={({ target }) => setPassConf(target.value)} />
            <br />
            <button className="btn btn-primary" type="submit">Cadastrar</button>
          </form>
        </Container>
      </Container>
      <Footer/>
    </div>
  )
}

export default Register