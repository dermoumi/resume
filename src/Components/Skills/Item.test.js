import React from 'react'
import { mount, shallow } from 'enzyme'
import 'jest-styled-components'

import Item from './Item'

it('renders extra item title', () => {
  const title = 'My title'
  const wrapper = shallow(<Item label={title} />)

  expect(wrapper.text()).toContain(title)
})

it('renders extra item details', () => {
  const details = 'My details'
  const wrapper = shallow(<Item details={details} />)

  expect(wrapper.text()).toContain(details)
})

it('renders skill item level', () => {
  const level = 'My level'
  const wrapper = shallow(<Item level={level} />)

  expect(wrapper.text()).toContain(level)
})

it('respects the theme', () => {
  const theme = {
    primary: '#FFCC00',
    secondary: '#00FFCC',
    accent: '#CC00FF',
  }

  const props = {
    label: 'My title',
    details: 'My details',
    level: 'My level',
    theme,
  }

  const wrapper = mount(<Item {...props} />)

  expect(wrapper).toHaveStyleRule('color', theme.primary, {
    modifier: '.label',
  })

  expect(wrapper).toHaveStyleRule('color', theme.secondary, {
    modifier: '.sub-title',
  })

  expect(wrapper).toHaveStyleRule('color', theme.accent, {
    modifier: '.level',
  })
})
