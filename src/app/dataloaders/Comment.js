import Comment from '../models/Comment'

class CommentLoader {
  async batch(keys, info = {}) {
    const comments = await Comment.findAll({
      where: { post_id: [...keys] },
    })

    return keys.map(
      key => comments.filter(comment => comment.post_id === key) || []
    )
  }
}

export default new CommentLoader()
