import React, { Component } from 'react'
import Section from '../Section'
import Item from './Item'

export default class Experience extends Component {
  constructor(props) {
    super(props)
    this.state = { data: null }

    import('../../Data/experience').then(module =>
      this.setState({ data: module.default })
    )
  }

  render() {
    if (!this.state.data) return null

    return (
      <Section label="Experience">
        {this.state.data.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </Section>
    )
  }
}
