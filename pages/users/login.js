import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router'
import Header from '../../components/Header';
import { Input, Label, Button, Container } from 'reactstrap';
import Footer from '../../components/Footer';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    fire.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {

        console.log(err.code, err.message)
        setNotification(err.message)

        setTimeout(() => {
          setNotification('')
        }, 2000)
      })

    setUsername('')
    setPassword('')
    router.push("/")
  }

  return (
    <div>
      <Header />
      <Container>
        <Container style={{ width: '60%', margin: '0 auto', alignContent: 'center' }}>
          <h2>Login</h2>
          {notify}
          <form onSubmit={handleLogin}>
            <Label for="username">Email</Label>
            <Input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
            <br />
            <Label for="password">Senha</Label>
            <Input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            <br />
            <button className="btn btn-primary" type="submit">Login</button>
          </form>
        </Container>
      </Container >
      <Footer/>
    </div >
  )

}

export default Login
