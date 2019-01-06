import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import Item from './Item'
import ExperienceComponent from './Component'

import data from '../../Data/experience'

it('renders all the items', () => {
  const wrapper = shallow(<ExperienceComponent />)

  const items = wrapper.find(Item)
  expect(items).toHaveLength(data.length)
})
