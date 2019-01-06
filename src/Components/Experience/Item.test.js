import React from 'react'
import { mount, shallow } from 'enzyme'
import 'jest-styled-components'

import Item from './Item'

it('renders experience item title', () => {
  const title = 'My title'
  const wrapper = shallow(<Item label={title} />)

  expect(wrapper.text()).toContain(title)
})

it('renders experience item info', () => {
  const info = 'My info'
  const wrapper = shallow(<Item subtitle={info} />)

  expect(wrapper.text()).toContain(info)
})

it('renders experience item year', () => {
  const year = 1337
  const wrapper = shallow(<Item period={year} />)

  const $period = wrapper.find('span.period')

  expect($period.exists()).toBe(true)
  expect($period.text()).toContain(year)
})

it('renders experience item period', () => {
  const period = [1337, '20XX']
  const wrapper = shallow(<Item period={period} />)

  const $period = wrapper.find('span.period')

  expect($period.exists()).toBe(true)
  expect($period.text()).toMatch(
    new RegExp(`${period[0]}\\s+.\\s+${period[1]}`)
  )
})

it("renders experience item's tasks list", () => {
  const tasks = ['Task A', 'Task B']
  const wrapper = shallow(<Item tasks={tasks} />)

  const $tasks = wrapper.find('.item-content ul li')

  expect($tasks).toHaveLength(tasks.length)
})

it('respects the theme', () => {
  const theme = {
    primary: '#FFCC00',
    secondary: '#00FFCC',
    accent: '#CC00FF',
  }

  const props = {
    label: 'My Label',
    subtitle: 'My info',
    period: [1337, '20XX'],
    tasks: ['TaskA', 'TaskB'],
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
    modifier: '.period',
  })

  expect(wrapper).toHaveStyleRule('color', theme.accent, {
    modifier: '.item-content ul li:before',
  })
})
