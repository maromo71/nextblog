import React, { useState } from 'react';
import fire from '../config/fire-config';
import {
    Collapse,
    Container,
    Jumbotron,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavbarText
} from 'reactstrap';

var email = '';

fire.auth().onAuthStateChanged((user) => {
    if (user) {
        email = user.email;
        console.log(user.email);
    } else {
        email = '';
    }
});

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Maromo's Blog</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                    </Nav>
                    <NavbarText>{email === '' ? 'Usuário Desconhecido' : email}</NavbarText>
                </Collapse>
            </Navbar>
            <Jumbotron fluid>
                <Container fluid>
                    <h2 className="display-4">Blog - Exemplo em Next.Js</h2>
                    <p className="lead">Blog desenvolvido em aula pelo professor Maromo.</p>
                </Container>
            </Jumbotron>
        </div>
    );
}

export default Header;