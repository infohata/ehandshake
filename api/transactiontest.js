
async function transation() {
  const Eos = require('eosjs');

  const config = {
      expireInSeconds: 60,
      broadcast: true,
      keyProvider: ['5KXBRhhdMH7DprM38GKTgMHwUybFXdKCrKbZdV4K7QoaKWwJ5xX','5JKmtoCStk6eBupdxiFBpAcw9G4W4sST9GUfHdske1Kue8o6in3'],
      debug: false,
      sign: true,
      // mainNet bp endpoint
      httpEndpoint: 'http://10.20.11.163:8888',
      // mainNet chainId
      chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  };

  const sender = 'trevor'
  const receiver = 'kaeuouji'

  const eos = Eos(config);

  const moment = require('moment');

  sh = 'shakehands'

  trust = {
    from: sender,
    to: receiver,
    group_id: 1,
    subject: ''
  }

  nt = 'newtrustgrp'
  group = {
    subject : 'subject',
    account_name : 'trevor',
    time: moment(Date.now()).unix()
  }

  result = await eos.transaction(
    {
      // ...headers,
      // context_free_actions: [],
      actions: [
        {
          account: 'hands',
          name: nt,
          authorization: [{
            actor: 'trevor',
            permission: 'active'
          }],
          data:
        }
      ]
    }
  )
  console.log(result)
}

transation()
