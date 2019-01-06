import React, { Component } from 'react'
import styled from 'styled-components'

const StyleBase = styled.article`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    font-size: 1.1em;
    letter-spacing: 1px;
    line-height: 1.25rem;
    color: ${props => props.theme.primary};
  }

  .sub-title {
    font-size: 0.9em;
    line-height: 1.25rem;
    text-transform: uppercase;
    color: ${props => props.theme.secondary};
  }
`

export default class Item extends Component {
  render() {
    return (
      <StyleBase {...this.props}>
        <div className="heading">
          <div className="label">{this.props.label}</div>
          <div className="sub-title">{this.props.details}</div>
        </div>
      </StyleBase>
    )
  }
}
