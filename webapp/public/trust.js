
const Eos = require('eosjs');

const config = {
    expireInSeconds: 60,
    keyProvider: ['5KXBRhhdMH7DprM38GKTgMHwUybFXdKCrKbZdV4K7QoaKWwJ5xX','5JKmtoCStk6eBupdxiFBpAcw9G4W4sST9GUfHdske1Kue8o6in3'],
    broadcast: true,
    debug: false,
    sign: true,
    // mainNet bp endpoint
    httpEndpoint: 'http://10.20.11.163:8888',
    // mainNet chainId
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
};

const eos = Eos(config);

// console.log(Eos);

options = {
  authorization: 'trevor@active',
  broadcast: true,
  sign: true
}

function upperBound(account_name) {
    let last = account_name.slice(-1);
    switch (last) {
        case '5':
            last = 'a';
            break;
        case '.':
            last = '1';
            break;
        case 'z':
            last = 'z1';
            break;
        default:
            last = String.fromCharCode(last.charCodeAt(0) + 1);
    }
    return account_name.slice(0, -1)+last;
}

let hs_acc = 'hands';

// create trust group
(async function () {
    // asynchroniously retreive the contract
    let contract = await eos.contract(hs_acc, options);
    // get the data from DOM from within async function
    let tg_subject = 'trevor crowd';
    let tg_creator = 'trevor';
    let tg_created_at = 1537656200;
    try {
        let trustgroup_creation = await contract.newtrustgrp({
            "subject": tg_subject,
            "creator": tg_creator,
            "created_at": tg_created_at
        }, options);
    } catch(e) {
        if (typeof e === 'string') e = JSON.parse(e);
        console.log("error:", e);
    }
    // pulling data from trust group table
    let trust_groups = await eos.getTableRows({
        "json": true,
        "code": hs_acc,
        "scope": hs_acc,
        "table": 'trustgroup',
        "index_position": 2,
        "key_type": 'name',
        "lower_bound": tg_creator,
        "upper_bound": upperBound(tg_creator),
        "limit": 0
    });
    // get the data from DOM from within async function
    let t_subject = tg_subject; // get it from created group list; or ask from user input;
    let t_from = tg_creator;
    let t_to = "codum";
    let t_group_id = 20; // get it from group list if it is group creator; or ask from user input;
    try {
        let trustgroup_creation = await contract.shakehands({
            "from": t_from,
            "to": t_to,
            "group_id": t_group_id,
            "subject": t_subject
        }, options);
    } catch(e) {
        if (typeof e === 'string') e = JSON.parse(e);
        console.log("error:", e);
    }
    // pulling data from trust table on who the user trusts
    let trusted_by = await eos.getTableRows({
        "json": true,
        "code": hs_acc,
        "scope": hs_acc,
        "table": 'trust',
        "index_position": 2,
        "key_type": 'name',
        "lower_bound": t_from,
        "upper_bound": upperBound(t_from),
        "limit": 0
    });
    console.log("TRUSTED BY:", trusted_by);
    // pulling data from trust table on who trusts the user
    let trusting = await eos.getTableRows({
        "json": true,
        "code": hs_acc,
        "scope": hs_acc,
        "table": 'trust',
        "index_position": 3,
        "key_type": 'name',
        "lower_bound": t_from,
        "upper_bound": upperBound(t_from),
        "limit": 0
    });
    console.log("TRUSTING:", trusting);
})();
