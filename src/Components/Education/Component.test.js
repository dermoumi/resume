import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import Item from './Item'
import EducationComponent from './Component'

import data from '../../Data/education'

it('renders all the items', () => {
  const wrapper = shallow(<EducationComponent />)

  const items = wrapper.find(Item)
  expect(items).toHaveLength(data.length)
})
