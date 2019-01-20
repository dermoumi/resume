import React, { Component, Suspense } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import style from './style'
import Header from './Components/Header'
import Menu from './Components/Menu'

const Experience = React.lazy(() => import('./Components/Experience/Component'))
const Skills = React.lazy(() => import('./Components/Skills/Component'))
const Education = React.lazy(() => import('./Components/Education/Component'))
const Extra = React.lazy(() => import('./Components/Extra/Component'))

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bg};
    min-width: 320px;
  }

  @media print {
    @page {
      margin: 0 0rem;
      size: auto;
    }

    body {
      background-color: transparent;
      box-sizing: border-box;
    }
  }
`

const StyleBase = styled.div`
  padding: 16px;
  color: ${props => props.theme.fg};

  .side {
    margin-top: 38px;
  }

  @media print {
    width: 1024px;
    display: grid;
    grid-gap: 68px;
    grid-template-columns: 320px 1fr;
    grid-template-rows: auto 1fr;
    padding: 6rem 3.2rem;

    .main {
      grid-column: 2;
      grid-row: 1 / -1;
    }

    .side {
      margin-top: 0;
    }
  }
`

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={style.light}>
        <StyleBase>
          <GlobalStyle />
          <Menu pdfLink={process.env.REACT_APP_PDF} />
          <Header />
          <div className="main">
            <Suspense fallback="">
              <Experience />
            </Suspense>
            <Suspense fallback="">
              <Skills />
            </Suspense>
          </div>
          <div className="side">
            <Suspense fallback="">
              <Education />
            </Suspense>
            <Suspense fallback="">
              <Extra />
            </Suspense>
          </div>
        </StyleBase>
      </ThemeProvider>
    )
  }
}
