// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const apiG = new AWS.APIGateway()
const apiId = 'gateway id found in console'

createDeployment(apiId, 'prod')
.then(data => console.log(data))

function createDeployment (apiId, stageName) {
  const params = {
    restApiId: apiId,
    stageName: stageName,
  }

  return new Promise((resolve, reject) => {
    apiG.createDeployment(params, (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })
}
