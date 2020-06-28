// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const route53 = new AWS.Route53()
const hzId = 'result of create route 53 hostedzone.js'

createRecordSet(hzId)
.then(data => console.log(data))

function createRecordSet (hzId) {
  // TODO: Create params const
  const params = {
    HostedZoneId: hzId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: 'hbfl.havesomecode.io',
            Type: 'A',
            AliasTarget: {
              DNSName: 'loadbalancer dns name',
              EvaluteTargetHealth: false,
              HostedZoneId: 'Z35SXDOTRQ7X7K' // load-balancer is on us-east-1
            }
          }
        }
      ]
    }
  }
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/elb.html

  return new Promise((resolve, reject) => {
    route53.changeResourceRecordSets(params, (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })
}
