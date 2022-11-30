const { MongoClient } = require('mongodb')

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

// Database Name
const dbName = 'myProject'

async function main () {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')
  const db = client.db(dbName)
  await db.dropCollection('documents')
  const collection = db.collection('documents')

  await collection.insertOne({
    username: 'zeyuyang'
  })
  // you can insert a document (row) with different properties.
  await collection.insertOne({
    username: 'chichanglin',
    age: 21
  })

  const result = await collection.findOne({
    username: 'zeyuyang'
  })
  console.log('result:', result)
  // result: { _id: new ObjectId("6386b6a9928fd8b3c2a1ef36"), username: 'zeyuyang' }

  await collection.findOneAndUpdate({
    username: 'zeyuyang'
  }, {
    $set: {
      age: 21
    }
  })

  const result2 = await collection.findOne({
    username: 'zeyuyang'
  })
  console.log('result2:', result2)
  // result2: {
  //   _id: new ObjectId("6386b7826e9ce2b29846c95a"),
  //   username: 'zeyuyang',
  //   age: 21
  // }
}

main().then().finally(() => client.close())
