require('dotenv').config()

const test = require('ava')
const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })

const create = () => users.save('user@test.com', '123456')

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

test('User Create', async t => {
  const result = await create()
  t.is(result.user.email, 'user@test.com')
})

test('Users List', async t => {
  await create()

  const list = await users.all()

  t.is(list.users.length, 1)
  t.is(list.users[0].email, 'user@test.com')
})

test('User Update', async t => {
  await create()

  const result = await users.update(1, '12345678')

  t.is(result.user.id, 1)
  t.is(result.affectedRows, 1)
})

test('User Delete', async t => {
  await create()

  const result = await users.del(1)

  t.is(result.affectedRows, 1)
})
