import DataLoader from 'dataloader'

import File from './File'
import User from './User'
import Post from './Post'
import Comment from './Comment'

export const file = new DataLoader(keys => File.batch(keys))
export const user = new DataLoader(keys => User.batch(keys))
export const post = new DataLoader(keys => Post.batch(keys))
export const comment = new DataLoader(keys => Comment.batch(keys))
