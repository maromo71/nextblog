import React, { useState } from 'react';
import { Input, Label, Button } from 'reactstrap';
import fire from '../config/fire-config';
import Header from './Header';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fire.firestore()
      .collection('nextblog')
      .add({
        title: title,
        content: content,
      });

    setTitle('');
    setContent('');

    setNotification('Postagem criada com sucesso');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  return (
    <div>
      <h2>Adicionar no Blog</h2>

      {notification}

      <form onSubmit={handleSubmit}>
        <div>
          <Label for="title">Título</Label>
          <Input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <Label for="content">Conteúdo</Label>
          <Input type="textarea" value={content} onChange={({ target }) => setContent(target.value)} />
        </div>
        <Button style={{ margin: '10px 0px 10px 0px' }} color="primary" type="submit">Salvar</Button>
      </form>
    </div>
  )
}

export default CreatePost;