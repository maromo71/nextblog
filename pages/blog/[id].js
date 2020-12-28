import fire from '../../config/fire-config';
import Link from 'next/link'
import Header from '../../components/Header';
import { Container, Button } from 'reactstrap';
import Footer from '../../components/Footer';

const Blog = (props) => {

  return (
    <div>
      <Header />
      <Container>
        <Container style={{maxWidth: '70%'}}>
        <h4>{props.title}</h4>
        <p>
          <strong>Conteúdo do post:</strong><br />
          {props.content}
        </p>
        <Link href="/">
          <Button color="primary">Voltar</Button>
        </Link>
        </Container>
      </Container>
      <Footer/>
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.firestore()
    .collection('nextblog')
    .doc(query.id)
    .get()
    .then(result => {
      content['title'] = result.data().title;
      content['content'] = result.data().content;
    });

  return {
    props: {
      title: content.title,
      content: content.content,
    }
  }
}

export default Blog