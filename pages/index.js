import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import CreatePost from '../components/CreatePost';
import Link from 'next/link';
import Header from '../components/Header';
import { Jumbotron, Container, ListGroup, ListGroupItem } from 'reactstrap';
import { useRouter } from 'next/router'
import Footer from '../components/Footer';


const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })

  useEffect(() => {
    fire.firestore()
      .collection('nextblog')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
      });
  }, []);

  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        setNotification('Logoff efetuado com sucesso')
        setTimeout(() => {
          setNotification('')
        }, 1000)
      });
  }

  return (
    <div>
      <Header />
      <Head>
        <title>Blog App</title>
      </Head>
      <Container>
        {notification}
        {!loggedIn
          ?
          <div>
            <Link href="/users/register">
              <button style={{margin: '10px'}} className="btn btn-success">Registrar </button>
            </Link> 
            <Link href="/users/login">
              <button style={{margin: '10px'}} className="btn btn-primary"> Efetuar Login</button>
            </Link>
            <hr />
          </div>
          :
          <div>
            <Container>
              <button className="btn btn-danger" onClick={handleLogout}>Efetuar Logout</button>
            </Container>
            <hr />
          </div>
        }
        <Container style={{padding: '0px 0px 30px 10px', backgroundColor: '#eeeeee', borderRadius: '5px'}}>
          <h2>Últimos Posts</h2>
          <ListGroup style={{maxWidth: '50%', margin: '0 auto', textAlign: 'center'}}>
            {blogs.map(blog =>
              <ListGroupItem key={blog.id}>
                <Link href="/blog/[id]" as={'/blog/' + blog.id}>
                  <a  itemProp="hello">{blog.title}</a>
                </Link>
              </ListGroupItem>
            )}
          </ListGroup>
        </Container>
        
        {loggedIn && <CreatePost />}
      
      </Container>
      <Footer/>
    </div>
  )
}

export default Home;