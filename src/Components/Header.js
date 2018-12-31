import React, { Component } from 'react'
import styled from 'styled-components'
import data from '../Data/header'

const StyleBase = styled.header`
  display: flex;
  flex-flow: column;
  justify-content: center;

  @media screen {
    min-height: calc(100vh - 100px);
    margin-bottom: 32px;
  }

  .mugshot {
    max-width: 230px;
    height: auto;

    .st {
      stroke: ${props => props.theme.fg};
    }
  }

  h1 {
    margin-top: 18px;
    margin-bottom: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: ${props => props.theme.primary};
  }

  h2 {
    margin-top: 4px;
    margin-bottom: 18px;
    text-transform: uppercase;
    font-weight: 400;
  }

  .profile {
    margin-bottom: 18px;
    line-height: 1.25em;
  }

  .meta {
    line-height: 1.5em;

    a {
      color: ${props => props.theme.fg};
    }

    > div:before {
      font-family: 'icomoon';
      margin-right: 10px;
      color: ${props => props.theme.accent};
    }

    .email:before {
      content: '\\e904';
    }

    .github:before {
      content: '\\e901';
    }

    .address:before {
      content: '\\e905';
    }
  }
`

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = { mugshot: null }

    import('./Mugshot').then(module =>
      this.setState({ mugshot: module.default })
    )
  }

  render() {
    const Mugshot = this.state.mugshot
    return (
      <StyleBase>
        {Mugshot && <Mugshot className="mugshot" followCursor />}
        <h1>{data.fullName}</h1>
        <h2>{data.title}</h2>
        <div className="profile">
          {data.profile.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <div className="meta">
          <div className="email">
            <a href={`mailto:${data.email}`}>{data.email}</a>
          </div>
          <div className="github">
            <a href={`//${data.github}`}>{data.github}</a>
          </div>
          <div className="address">{data.address}</div>
        </div>
      </StyleBase>
    )
  }
}
