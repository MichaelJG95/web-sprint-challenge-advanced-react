import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppClass from './AppClass'

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

beforeEach(() => {
  render(<AppClass />)
})

describe('AppClass component', () => {
  test('Renders the coordinates heading', () => {
    const coordinates = screen.queryByText('Coordinates', { exact: false })
    expect(coordinates).toBeVisible()
    expect(coordinates).toBeInTheDocument()
  })
  test('Renders the step count heading', () => {
    const steps = screen.queryByText('You moved', { exact: false })
    expect(steps).toBeVisible()
    expect(steps).toBeInTheDocument()
  })
  test('Renders the go left button', () => {
    const leftBtn = screen.queryByText('LEFT')
    expect(leftBtn).toBeVisible()
    expect(leftBtn).toBeInTheDocument()
  })
  test('Renders the go right button', () => {
    const rightBtn = screen.queryByText('RIGHT')
    expect(rightBtn).toBeVisible()
    expect(rightBtn).toBeInTheDocument()
  })
  test('Renders the go up button', () => {
    const upBtn = screen.queryByText('UP')
    expect(upBtn).toBeVisible()
    expect(upBtn).toBeInTheDocument()
  })
  test('Renders the go down button', () => {
    const downBtn = screen.queryByText('DOWN')
    expect(downBtn).toBeVisible()
    expect(downBtn).toBeInTheDocument()
  })
  test('Renders the reset button', () => {
    const resetBtn = screen.queryByText('reset')
    expect(resetBtn).toBeVisible()
    expect(resetBtn).toBeInTheDocument()
  })
  test('Renders the submit button', () => {
    const submitBtn =  document.querySelector('#submit')
    expect(submitBtn).toBeVisible()
    expect(submitBtn).toBeInTheDocument()
  })
  test(" typing on the input results in its value changing to the entered text", () => {
    const input = screen.getByPlaceholderText('type email')
    fireEvent.change(input, { target: { value: "I'm Mike" } })
    expect(input).toHaveValue("I'm Mike")
    fireEvent.change(input, { target: { value: 'cleared' } })
    expect(input).toHaveValue('cleared')
  })
})
