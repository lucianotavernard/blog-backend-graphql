import 'dotenv/config'

import './database'

import { resolve } from 'path'
import { GraphQLServer } from 'graphql-yoga'
import { makeExecutableSchema } from 'graphql-tools'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

import authMiddleware from './app/middlewares/auth'

class App {
  constructor() {
    const dirname = resolve(__dirname, 'app', 'graphql')

    this.server = new GraphQLServer({
      schema: makeExecutableSchema({
        typeDefs: mergeTypes(fileLoader(dirname, { recursive: true }), {
          all: true,
        }),
        resolvers: mergeResolvers(
          fileLoader(
            dirname,
            { recursive: true, extensions: ['.js'] },
            {
              all: true,
            }
          )
        ),
      }),
      context: req => req.request,
      middlewares: [authMiddleware],
    })
  }
}

export default new App().server
