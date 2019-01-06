import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import Item from './Item'
import SkillsComponent from './Component'

import data from '../../Data/skills'

it('renders all the items', () => {
  const wrapper = shallow(<SkillsComponent />)

  const items = wrapper.find(Item)
  expect(items).toHaveLength(data.length)
})
