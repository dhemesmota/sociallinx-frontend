import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib/react-query'

import { SignIn } from './sign-in'

describe('Sign In', () => {
  it('should set default email input value if email is present on search params', () => {
    const wrapper = render(
      <>
        <SignIn />
      </>,
      {
        wrapper: ({ children }) => (
          <HelmetProvider>
            <MemoryRouter initialEntries={['/sign-in?email=johndoe@mail.com']}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          </HelmetProvider>
        ),
      },
    )

    const emailInput = wrapper.getByLabelText('E-mail') as HTMLInputElement

    expect(emailInput.value).toEqual('johndoe@mail.com')
  })

  it('should render sign in form', () => {
    const wrapper = render(
      <>
        <SignIn />
      </>,
      {
        wrapper: ({ children }) => (
          <HelmetProvider>
            <MemoryRouter>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          </HelmetProvider>
        ),
      },
    )

    const emailInput = wrapper.getByLabelText('E-mail') as HTMLInputElement
    const passwordInput = wrapper.getByLabelText('Senha') as HTMLInputElement
    const submitButton = wrapper.getByRole('button', {
      name: 'Entrar',
    })

    expect(emailInput.value).toEqual('')
    expect(passwordInput.type).toEqual('password')
    expect(submitButton).toEqual(expect.any(HTMLButtonElement))
  })
})
