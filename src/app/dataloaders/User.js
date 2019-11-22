import User from '../models/User'

class UserLoader {
  async batch(keys, info = {}) {
    const users = await User.findAll({ where: { id: [...keys] } })

    return keys.map(key => users.find(user => user.id === key) || null)
  }
}

export default new UserLoader()
