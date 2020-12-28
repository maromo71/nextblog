import React, { useState } from 'react';
import { Container } from 'reactstrap';
import styled from '../styles/Home.module.css';

const Footer = (props) => {
    return (
        <div>
            <p className={styled.footer}>Blog desenvolvido em sala de aula pelo Prof. Maromo e Alunos</p>
        </div>
    );
}
export default Footer;