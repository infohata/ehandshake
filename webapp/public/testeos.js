
const Eos = require('eosjs');

const config = {
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true,
    // mainNet bp endpoint
    httpEndpoint: 'http://10.20.11.163:8888',
    // mainNet chainId
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
};

const eos = Eos(config);

console.log(Eos);

eos.getAccount('trevor')
    .then(result => console.log(result))
    .catch(error => console.error(error));

eos.getAccount('kaeuouji')
    .then(result => console.log(result))
    .catch(error => console.error(error));

eos.getCurrencyBalance('eosio.token', 'kaeuouji', 'EOS')
    .then(result => console.log(result))
    .catch(error => console.error(error));

eos.getCurrencyBalance('eosio.token', 'trevor', 'EOS')
    .then(result => console.log(result))
    .catch(error => console.error(error));

options = {
  authorization: 'trevor@active',
  broadcast: true,
  sign: true
}

eos.transfer('trevor', 'kaeuouji', '5.0000 SYS', '', options);

