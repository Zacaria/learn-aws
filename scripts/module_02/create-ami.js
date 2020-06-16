// Imports
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'})

// TODO: Configure region
const ec2 = new AWS.EC2()

// Declare local variables
// TODO: Create an ec2 object

createImage('i-07318294853fb37e4', 'hamsterImage')
.then(() => console.log('Complete'))

function createImage (seedInstanceId, imageName) {
  const params = {
    InstanceId: seedInstanceId,
    Name: imageName
  }

  return new Promise((resolve, reject) => {
    ec2.createImage(params, (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })
}
