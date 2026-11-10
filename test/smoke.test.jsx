import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import App from '../src/App.jsx'

const ROUTES = ["/"]
const CONTACT = ROUTES.includes('/contact') ? '/contact' : '/'

test.each(ROUTES)('renders %s', (path) => {
  window.history.pushState({}, '', path)
  const { container } = render(<App />)
  expect(container.querySelector('h1, h2')?.textContent).toBeTruthy()
})

test('the form reports success only after the endpoint accepted it', async () => {
  vi.stubEnv('VITE_FORM_ENDPOINT', 'https://forms.example/f/1')
  const fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
  vi.stubGlobal('fetch', fetch)
  window.history.pushState({}, '', CONTACT)
  const { container } = render(<App />)
  const form = container.querySelector('form')
  fireEvent.change(form.querySelector('[name=name]'), { target: { value: 'Ada' } })
  fireEvent.change(form.querySelector('[name=email]'), { target: { value: 'ada@example.com' } })
  fireEvent.submit(form)
  expect(await screen.findByRole('alert')).toBeTruthy()
  expect(screen.queryByText('Thank you!')).toBeNull()
  fetch.mockResolvedValue({ ok: true })
  fireEvent.submit(form)
  expect(await screen.findByText('Thank you!')).toBeTruthy()
  expect(fetch).toHaveBeenLastCalledWith('https://forms.example/f/1', expect.objectContaining({ method: 'POST' }))
})
