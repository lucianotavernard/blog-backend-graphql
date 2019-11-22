import * as jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-core'
import { promisify } from 'util'

import authConfig from '../../config/auth'

export default async (resolve, root, args, context, info) => {
  const authHeader = context.headers.authorization

  if (!authHeader) return resolve(root, args, context, info)

  const [, token] = authHeader.split(' ')

  try {
    const { secret } = authConfig
    const decoded = await promisify(jwt.verify)(token, secret)

    context.user = decoded
  } catch (e) {
    return new AuthenticationError('Not authorised')
  }

  return resolve(root, args, context, info)
}
