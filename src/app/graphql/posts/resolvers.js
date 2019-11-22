import Post from '../../models/Post'
import * as loaders from '../../dataloaders'

import { authenticated, getFields } from '../../../util'

export default {
  Post: {
    user: (parent, args, ctx, info) => loaders.user.load(parent.user_id),
    comments: (parent, args, ctx, info) => loaders.comment.load(parent.id),
  },

  Query: {
    post: authenticated((parent, args, ctx, info) => {
      const attributes = getFields(info)
      return Post.findByPk(args.id, { attributes })
    }),
    posts: authenticated((parent, args, ctx, info) => {
      const attributes = getFields(info)
      return Post.findAll({ attributes })
    }),
  },

  Mutation: {
    createPost: authenticated((parent, args, ctx) =>
      Post.create({ user_id: ctx.user.id, ...args.input })
    ),
  },
}
