// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const route53 = new AWS.Route53()
const hzName = 'hbfl.havesomecode.io'

createHostedZone(hzName)
.then(data => console.log(data))

function createHostedZone (hzName) {
  const params = {
    Name: hzName,
    CallerReference: `${Date.now()}`,
  }

  return new Promise((resolve, reject) => {
    route53.createHostedZone(params, (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })
}
