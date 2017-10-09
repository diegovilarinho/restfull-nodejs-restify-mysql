const db = require('../services/mysql')

const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence')
    next()
  })

  server.get('categories', async (req, res, next) => {
    try {
      res.send(await db.categories().all())
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.post('categories', async (req, res, next) => {
    const { name } = req.params

    try {
      res.send(await db.categories().save(name))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put('categories', async (req, res, next) => {
    const { id, name } = req.params

    try {
      res.send(await db.categories().update(id, name))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del('categories', async (req, res, next) => {
    const { id } = req.params

    try {
      res.send(await db.categories().del(id))
    } catch (error) {
      res.send(error)
    }
    next()
  })
}

module.exports = routes
