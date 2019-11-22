import Post from '../../models/Post'
import Comment from '../../models/Comment'

import * as loaders from '../../dataloaders'

import { authenticated, getFields } from '../../../util'

export default {
  Comment: {
    user: (parent, args, ctx, info) => loaders.user.load(parent.user_id),
    post: (parent, args, ctx, info) => loaders.post.load(parent.post_id),
  },

  Query: {
    comment: authenticated((parent, args, ctx, info) => {
      const attributes = getFields(info)
      return Comment.findByPk(args.id, { attributes })
    }),
    comments: authenticated((parent, args, ctx, info) => {
      const attributes = getFields(info)
      return Comment.findAll({ where: { post_id: args.postId }, attributes })
    }),
  },

  Mutation: {
    createComment: authenticated(async (parent, args, ctx) => {
      const { postId } = args.input

      const postExists = await Post.findByPk(postId)

      if (!postExists) throw Error('Post not found')

      return Comment.create({
        user_id: ctx.user.id,
        post_id: postId,
        ...args.input,
      })
    }),
  },
}
