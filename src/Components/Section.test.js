import React from 'react'
import { mount, shallow } from 'enzyme'
import 'jest-styled-components'

import Section from './Section'

it('renders the section label', () => {
  const label = 'My label'
  const wrapper = shallow(<Section label={label} />)

  expect(wrapper.text()).toContain(label)
})

it('renders the section content', () => {
  const contentText = 'My content text'
  const content = <div>{contentText}</div>
  const wrapper = shallow(<Section>{content}</Section>)

  expect(wrapper.text()).toContain(contentText)
})

it('respects the theme', () => {
  const theme = {
    primary: '#FFCC00',
  }

  const props = {
    label: 'My title',
    children: <div>Content</div>,
    theme,
  }

  const wrapper = mount(<Section {...props} />)

  expect(wrapper).toHaveStyleRule('color', theme.primary, {
    modifier: 'h3',
  })

  expect(wrapper).toHaveStyleRule('color', theme.primary, {
    modifier: 'a',
  })
})
