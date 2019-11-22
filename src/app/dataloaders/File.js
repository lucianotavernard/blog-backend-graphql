import File from '../models/File'

class FileLoader {
  async batch(keys) {
    const files = await File.findAll({
      where: { id: [...keys] },
      attributes: ['id', 'path', 'url'],
    })

    return keys.map(key => files.find(file => file.id === key) || null)
  }
}

export default new FileLoader()
