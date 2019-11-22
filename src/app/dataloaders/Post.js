import Post from '../models/Post'

class PostLoader {
  async batch(keys, info = {}) {
    const posts = await Post.findAll({ where: { id: [...keys] } })

    return keys.map(key => posts.find(post => post.id === key) || null)
  }
}

export default new PostLoader()
