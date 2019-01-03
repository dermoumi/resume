import React from 'react'
import { shallow, mount } from 'enzyme'
import Item from './Item'

it('renders education item degree', () => {
  const degree = 'My degree'
  const wrapper = shallow(<Item degree={degree} />)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.text()).toContain(degree)
})

it('renders education item info', () => {
  const info = 'My info'
  const wrapper = shallow(<Item info={info} />)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.text()).toContain(info)
})

it('renders education item year', () => {
  const year = 1337
  const wrapper = shallow(<Item period={year} />)

  const periodSpan = wrapper.find('span.period')
  expect(wrapper).toMatchSnapshot()
  expect(periodSpan.exists()).toBe(true)
  expect(periodSpan.text()).toContain(year)
})

it('renders education item period', () => {
  const period = [1337, '20XX']
  const wrapper = shallow(<Item period={period} />)

  const periodSpan = wrapper.find('span.period')
  expect(wrapper).toMatchSnapshot()
  expect(periodSpan.exists()).toBe(true)
  expect(periodSpan.text()).toMatch(
    new RegExp(`${period[0]}\\s+.\\s+${period[1]}`)
  )
})

it('renders all info correctly', () => {
  const props = {
    degree: 'My degree',
    info: 'My info',
    period: [1337, '20XX'],
  }

  const wrapper = mount(<Item {...props} />)
  expect(wrapper).toMatchSnapshot()
})
