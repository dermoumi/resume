import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import style from './style';
import Header from './Components/Header';
import Experience from './Components/Experience/Component';
import Skills from './Components/Skills/Component';
import Education from './Components/Education/Component';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bg};
    min-width: 320px;
  }
`;

const StyleBase = styled.div`
  padding: 16px;
  color: ${props => props.theme.fg};

  @media print {
    display: grid;
    grid-gap: 36px;
    grid-template-columns: 320px 1fr;
    grid-template-rows: auto 1fr;

    .main {
      grid-column: 2;
      grid-row: 1 / -1;
    }
  }
`;

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={style.light}>
        <StyleBase>
          <GlobalStyle />
          <Header />
          <div className="main">
            <Experience />
            <Skills />
            <Education />
          </div>
          <div>
            Hello, Lorem ipsum dolor sit amet
          </div>
        </StyleBase>
      </ThemeProvider>
    );
  }
}
