import User from '../../models/User'
import * as loaders from '../../dataloaders'

import { authenticated, getFields } from '../../../util'

export default {
  User: {
    avatar: (parent, args, ctx, info) => loaders.file.load(parent.file_id),
  },

  Query: {
    me: (parent, args, ctx, info) => loaders.user.load(ctx.user.id),
    user: (parent, args, ctx, info) => loaders.user.load(args.id),
    users: (parent, args, ctx, info) => {
      const attributes = getFields(info)
      return User.findAll({ attributes })
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const { name, email, password } = args.input

      const user = await User.findOne({ where: { email } })

      if (user) throw Error('User already exists.')

      return User.create({ name, email, password })
    },

    updateUser: authenticated(async (parent, args, ctx) => {
      const { email, oldPassword } = args.input

      const user = await User.findByPk(ctx.user.id)

      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email } })

        if (userExists) throw Error('User already exists.')
      }

      if (oldPassword && !user.checkPassword(oldPassword))
        throw Error('Password does not match.')

      await user.update(args.input)

      return User.findByPk(ctx.user.id)
    }),
  },
}
