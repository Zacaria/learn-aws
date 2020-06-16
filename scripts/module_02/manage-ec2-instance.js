// Imports
// TODO: Import the aws-sdk
const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1'})


// Declare local variables
const ec2 = new AWS.EC2()

function listInstances () {
  return new Promise((resolve, reject) => {
    ec2.describeInstances({}, (err, data) => {
      if(err) return reject(err)
      resolve(data.Reservations.reduce((i, r) => {
        return i.concat(r.Instances)
      }, []))
      
    })
  })
}

function terminateInstance (instanceId) {
  const params = {
    InstanceIds: [ instanceId ]
  }
  return new Promise((resolve, reject) => {
    ec2.terminateInstances(params, (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })
}

// listInstances()
// .then(data => console.log(data))
terminateInstance('i-07318294853fb37e4')
.then(data => console.log(data))
