import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import Item from './Item'
import ExtraComponent from './Component'

import data from '../../Data/extra'

it('renders all the items', () => {
  const wrapper = shallow(<ExtraComponent />)

  const items = wrapper.find(Item)
  expect(items).toHaveLength(data.length)
})
