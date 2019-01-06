import React from 'react'
import { mount, shallow } from 'enzyme'
import 'jest-styled-components'

import Mugshot from './Mugshot'

it('renders the mugshot correctly', () => {
  const wrapper = shallow(<Mugshot />)

  expect(wrapper).toMatchSnapshot()
})

it('moves eyes when cursor moves', () => {
  // Workaround to set custom bonuding client rect
  Element.prototype.getBoundingClientRect = jest.fn(() => {
    return {
      width: 200,
      height: 200,
      top: 10,
      left: 10,
      right: 210,
      bottom: 210,
    }
  })

  // Work around to get ahold of the mousemove callback
  const eventMap = {}
  window.addEventListener = jest.fn((event, cb) => {
    eventMap[event] = cb
  })

  const wrapper = mount(<Mugshot followCursor />)

  // Make sure that the event was set
  const lastCall = window.addEventListener.mock.calls.pop()
  expect(lastCall).toHaveLength(3)
  expect(lastCall[0]).toBe('mousemove')
  expect(eventMap.mousemove).toBeDefined()

  // Simulate the mouse move event
  wrapper.instance().lookAt = jest.fn(wrapper.instance().lookAt)
  const event = { x: 500, y: 600 }
  eventMap.mousemove(event)
  expect(wrapper.instance().lookAt).toHaveBeenCalledWith(event.x, event.y)

  // Check if the values for this particular mouse move match
  expect(Math.round(wrapper.state().leftEyeOffsetX)).toBe(16)
  expect(Math.round(wrapper.state().leftEyeOffsetY)).toBe(7)
  expect(Math.round(wrapper.state().rightEyeOffsetX)).toBe(21)
  expect(Math.round(wrapper.state().rightEyeOffsetY)).toBe(9)
})

it('moves eyes when cursor moves - bis', () => {
  // Workaround to set custom bonuding client rect
  Element.prototype.getBoundingClientRect = jest.fn(() => {
    return {
      width: 200,
      height: 200,
      top: 10,
      left: 10,
      right: 210,
      bottom: 210,
    }
  })

  // Work around to get ahold of the mousemove callback
  const eventMap = {}
  window.addEventListener = jest.fn((event, cb) => {
    eventMap[event] = cb
  })

  const wrapper = mount(<Mugshot followCursor />)

  // Make sure that the event was set
  const lastCall = window.addEventListener.mock.calls.pop()
  expect(lastCall).toHaveLength(3)
  expect(lastCall[0]).toBe('mousemove')
  expect(eventMap.mousemove).toBeDefined()

  // Simulate the mouse move event
  wrapper.instance().lookAt = jest.fn(wrapper.instance().lookAt)
  const event = { x: -500, y: -1000 }
  eventMap.mousemove(event)
  expect(wrapper.instance().lookAt).toHaveBeenCalledWith(event.x, event.y)

  // Check if the values for this particular mouse move match
  expect(Math.round(wrapper.state().leftEyeOffsetX)).toBe(-24)
  expect(Math.round(wrapper.state().leftEyeOffsetY)).toBe(-17)
  expect(Math.round(wrapper.state().rightEyeOffsetX)).toBe(-28)
  expect(Math.round(wrapper.state().rightEyeOffsetY)).toBe(-15)
})

it('does not move eyes when followCursor=false', () => {
  // Work around to get ahold of the mousemove callback
  const eventMap = {}
  window.addEventListener = jest.fn((event, cb) => {
    eventMap[event] = cb
  })

  const wrapper = mount(<Mugshot />)

  // Make sure that the event was set
  const lastCall = window.addEventListener.mock.calls.pop()
  expect(lastCall).toHaveLength(3)
  expect(lastCall[0]).toBe('mousemove')
  expect(eventMap.mousemove).toBeDefined()

  // Simulate the mouse move event
  wrapper.instance().lookAt = jest.fn(wrapper.instance().lookAt)
  const event = { x: 500, y: 600 }
  eventMap.mousemove(event)
  expect(wrapper.instance().lookAt).not.toHaveBeenCalled()

  // Check if the values for this particular mouse move match
  expect(wrapper.state().leftEyeOffsetX).toBe(0)
  expect(wrapper.state().leftEyeOffsetY).toBe(0)
  expect(wrapper.state().rightEyeOffsetX).toBe(0)
  expect(wrapper.state().rightEyeOffsetY).toBe(0)
})

it('unregisters the global event when unmounted', () => {
  const wrapper = shallow(<Mugshot />)
  window.removeEventListener = jest.fn()

  wrapper.unmount()
  const lastCall = window.removeEventListener.mock.calls.pop()
  expect(lastCall).toHaveLength(2)
  expect(lastCall[0]).toBe('mousemove')
})
