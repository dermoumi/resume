import React from 'react'
import { mount, shallow } from 'enzyme'

import Item from './Item'

describe('Experience section item', () => {
  it('renders title', () => {
    const title = 'My title'
    const wrapper = shallow(<Item label={title} />)

    expect(wrapper.text()).toContain(title)
  })

  it('renders info', () => {
    const info = 'My info'
    const wrapper = shallow(<Item subtitle={info} />)

    expect(wrapper.text()).toContain(info)
  })

  it('renders year', () => {
    const year = 1337
    const wrapper = shallow(<Item period={year} />)

    const $period = wrapper.find('span.period')

    expect($period.exists()).toBe(true)
    expect($period.text()).toContain(year)
  })

  it('renders period', () => {
    const period = [1337, '20XX']
    const wrapper = shallow(<Item period={period} />)

    const $period = wrapper.find('span.period')

    expect($period.exists()).toBe(true)
    expect($period.text()).toMatch(
      new RegExp(`${period[0]}\\s+.\\s+${period[1]}`)
    )
  })

  it('renders tasks list', () => {
    const tasks = ['Task A', 'Task B']
    const wrapper = shallow(<Item tasks={tasks} />)

    const $tasks = wrapper.find('.item-content ul li')

    expect($tasks).toHaveLength(tasks.length)
  })

  it('contains label-level links', () => {
    const href = '//example.com'
    const wrapper = shallow(<Item labelLink={href} />)

    const $labelLink = wrapper.find('.label a')
    expect($labelLink.prop('href')).toEqual(href)
    expect($labelLink.prop('target')).toEqual('_blank')
    expect($labelLink.prop('rel')).toContain('noreferrer')
    expect($labelLink.prop('rel')).toContain('noopener')
  })

  it('contains subtitle-level links', () => {
    const href = '//example.com'
    const wrapper = shallow(<Item subtitleLink={href} />)

    const $subtitleLink = wrapper.find('.sub-title a')
    expect($subtitleLink.prop('href')).toEqual(href)
    expect($subtitleLink.prop('target')).toEqual('_blank')
    expect($subtitleLink.prop('rel')).toContain('noreferrer')
    expect($subtitleLink.prop('rel')).toContain('noopener')
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
    expect(wrapper).toMatchSnapshot()

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
})
