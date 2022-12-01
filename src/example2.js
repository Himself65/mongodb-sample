const { MongoClient } = require('mongodb')

// Connection URL
const url = 'mongodb+srv://himself65:btUKsPmErEm0MyAv@cluster0.stwlj.mongodb.net'
const client = new MongoClient(url)

// Database Name
const dbName = 'sample_airbnb'

async function main () {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')
  const db = client.db(dbName)
  const collection = db.collection('listingsAndReviews')
  console.log('size of documents', await collection.countDocuments())

  const result = await collection.find({
    bedrooms: 1,
    beds: {
      $lt: 2
    }
  }).toArray()
  console.log('result', result.length)

  const result2 = await collection.find({
    amenities: {
      $in: ["Dishwasher"]
    }
  }).toArray()

  console.log('result2', result2.length)
}

main().then().finally(() => client.close())
