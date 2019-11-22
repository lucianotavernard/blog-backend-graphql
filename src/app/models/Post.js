import Sequelize, { Model } from 'sequelize'

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        content: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file' })
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

export default Post
