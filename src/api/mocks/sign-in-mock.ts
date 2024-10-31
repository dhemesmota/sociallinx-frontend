import { rest } from 'msw'

import { SignInBody } from '../sign-in'

export const signInMock = rest.post<SignInBody>(
  '/authenticate',
  async (req, res, ctx) => {
    const { email } = await req.json()

    if (email === 'dhemes.mota@gmail.com') {
      return res(
        ctx.status(200),
        ctx.cookie('auth', 'sample-jwt'), // Use ctx.cookie para definir cookies
      )
    }

    return res(ctx.status(401))
  },
)
