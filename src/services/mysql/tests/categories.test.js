require('dotenv').config()

const test = require('ava')
const { connection, errorHandler } = require('./setup')

const categories = require('../categories')({ connection, errorHandler })

const create = () => categories.save('category-test')

test.beforeEach(t => connection.query('TRUNCATE TABLE categories'))
test.after.always(t => connection.query('TRUNCATE TABLE categories'))

test('Category Create', async t => {
  const result = await create()
  t.is(result.category.name, 'category-test')
})

test('Categories List', async t => {
  await create()

  const list = await categories.all()

  t.is(list.categories.length, 1)
  t.is(list.categories[0].name, 'category-test')
})

test('Category Update', async t => {
  await create()

  const result = await categories.update(1, 'category-test-updated')

  t.is(result.category.name, 'category-test-updated')
  t.is(result.affectedRows, 1)
})

test('Category Delete', async t => {
  await create()

  const result = await categories.del(1)

  t.is(result.affectedRows, 1)
})
