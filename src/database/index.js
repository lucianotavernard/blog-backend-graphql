import Sequelize from 'sequelize'

import File from '../app/models/File'
import User from '../app/models/User'
import Post from '../app/models/Post'
import Comment from '../app/models/Comment'

import databaseConfig from '../config/database'

const models = [File, User, Post, Comment]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
