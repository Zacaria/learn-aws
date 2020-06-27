const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const autoScaling = new AWS.AutoScaling()

const lcName = 'hamsterLC'
const roleName = 'hamsterLCRole'
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

helpers.createIamRole(roleName)
.then(profileArn => createLaunchConfiguration(lcName, profileArn))
.then(data => console.log(data))
.catch(err => console.log(err))

function createLaunchConfiguration (lcName, profileArn) {
  const params = {
    IamInstanceProfile: profileArn,
    ImageId: 'ami-0e13c23764ee51019',
    InstanceType: 't2.micro',
    LaunchConfigurationName: lcName,
    KeyName: keyName,
    SecurityGroups: [
      sgName,
    ],
    UserData: 'IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9yeWFubXVyYWthbWkvaGJmbC5naXQgL2hvbWUvYml0bmFtaS9oYmZsCnN1ZG8gY2hvd24gLVIgYml0bmFtaTogL2hvbWUvYml0bmFtaS9oYmZsCmNkIC9ob21lL2JpdG5hbWkvaGJmbApzdWRvIG5wbSBpCnN1ZG8gbnBtIHJ1biBzdGFydAo=',
  }

  return new Promise((resolve, reject) => {
    autoScaling.createLaunchConfiguration(params, (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })
}
