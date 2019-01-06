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

  .level {
    font-weight: 400;
    font-size: 0.8em;
    letter-spacing: 0;
    white-space: nowrap;
    line-height: 1.5rem;
    color: ${props => props.theme.accent};
  }
`

export default class Item extends Component {
  render() {
    return (
      <StyleBase {...this.props}>
        <div className="heading">
          <div className="label">
            {this.props.label} <span className="level">{this.props.level}</span>
          </div>
          <div className="sub-title">{this.props.details}</div>
        </div>
      </StyleBase>
    )
  }
}
