import User from '../../models/User'

export default {
  Mutation: {
    createSession: async (parent, args) => {
      const { email, password } = args

      const user = await User.findOne({ where: { email } })

      if (!user) throw Error('Incorrect email or password.')

      if (!user.checkPassword(password))
        throw Error('Incorrect email or password.')

      return user.generateToken()
    },
  },
}
