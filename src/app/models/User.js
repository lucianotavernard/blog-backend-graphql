import Sequelize, { Model } from 'sequelize'
import { hashSync, compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'

import authConfig from '../../config/auth'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    this.addHook('beforeSave', user => {
      if (user.password) user.password_hash = hashSync(user.password, 8)
    })

    return this
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' })
  }

  checkPassword(password) {
    return compareSync(password, this.password_hash)
  }

  generateToken() {
    const { secret } = authConfig

    return jwt.sign({ id: this.id }, secret)
  }
}

export default User
