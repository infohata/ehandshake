
function makeRequest() {
  var myaccount = document.getElementById("myaccount").value;
  var youraccount = document.getElementById("youraccount").value;

  var mygroup= 0;
  var mysubject ="trevor crowd";
  var myaccount = "trevor";
  var youraccount="kaeuouji";
  makeTrustRequestAsync(myaccount, youraccount, mygroup, mysubject);
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

function addGroup() {


      document.getElementById("userMessage").innerHTML = "Group Added";
      document.getElementById("uMessage").classList.add("alert-info");
    document.getElementById("uMessage").classList.remove("alert-danager");


}


async function makeTrustRequestAsync( myaccount,youraccount, mygroup, mysubject) {
    // asynchroniously retreive the contract

    let t_group_id = 3; // get it from group list if it is group creator; or ask from user input;
      try {
          let trustgroup_creation = await contract.shakehands({
              "from": myaccount,
              "to": youraccount,
              "group_id": mygroup,
              "subject": mysubject
          }, options);

//trevorlee
      document.getElementById("userMessage").innerHTML = "Added";
      document.getElementById("uMessage").classList.add("alert-info");
      document.getElementById("uMessage").classList.remove("alert-danger");




      } catch(e) {
          if (typeof e === 'string') e = JSON.parse(e);
          console.log("error:", e);
      }
}




function populatePendingRequests(pendingRequests) {
  sel = document.getElementById("selectPending");
  sel.innerHTML = "";

  for(var i = 0; i < versions.length; i++) {
      var opt = document.createElement('option');
      opt.appendChild( document.createTextNode(versions[i]) );
      opt.value = versions[i];
      sel.appendChild(opt);
  }

}

function makeCheck() {
  var myaccount = document.getElementById("myaccountcheck").value;
  var groupid = document.getElementById("groupid").value;

  checkTrustRequest(myaccount, groupid);

}

function pendingRequests() {

  var mypendingRequests = getPendingRequests(myaccount);
  populatePendingRequests(mypendingRequests);
}




function makeTrustRequest(myaccount, youraccount, mygroup, mysubject) {

  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "/api/shakehands", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("sender=" +myaccount + "&" + "receiver="
  +youraccount + "&" + "trust_group_id=" + mygroup + "&" + "subject=" + mysubject);

  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status ==200){
       var data = JSON.parse(this.response);
       if (data.message == "Trust Done") {
             document.getElementById("userMessage").innerHTML = data.message;
             document.getElementById("uMessage").classList.add("alert-danger");
             document.getElementById("uMessage").classList.remove("alert-info");

         } else {
             document.getElementById("userMessage").innerHTML = data.message;
             document.getElementById("uMessage").classList.add("alert-info");
             document.getElementById("uMessage").classList.remove("alert-danger");
        }
    }
  };
}


function getPendingRequests(myaccount, youraccount, mygroup, mysubject) {

  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "/api/pendingrequests", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("sender=" +myaccount + "&" + "receiver="
  +youraccount + "&" + "trust_group_id=" + mygroup + "&" + "subject=" + mysubject);

  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status ==200){
       var data = JSON.parse(this.response);
       var arrayLength = data.doc.length;
       var contractHashes=[arrayLength];
       for (var i=0; i<arrayLength; i++) {
         contracvatHashes[i]=data.doc[i].Hash;
       }
       populateContracts(contractHashes);
    }
  };
}



async function checkTrustRequest(myaccount, groupId) {

  console.log(myaccount)
  console.log(groupId)

  let t_from = myaccount;
  let hs_acc = 'hands';

  // pulling data from trust table on who the user trusts
  try {

    // pulling data from trust table on who trusts the user
    let trustByGroup = await eos.getTableRows({
        "json": true,
        "code": hs_acc,
        "scope": hs_acc,
        "table": 'trust',
        "index_position": 4,
        "key_type": 'i64',
        "lower_bound": groupId,
        "upper_bound": groupId + 1,
        "limit": 0
    });

    console.log(trustByGroup.rows);

if (trustByGroup.rows.length>0) {
    document.getElementById("userMessage").innerHTML = "Confirmed";
    document.getElementById("uMessage").classList.add("alert-info");
  document.getElementById("uMessage").classList.remove("alert-danager");
} else {
  document.getElementById("userMessage").innerHTML = "NOT confirmed";
  document.getElementById("uMessage").classList.add("alert-danger");
document.getElementById("uMessage").classList.remove("alert-info");
}

  } catch(e) {
    if (typeof e === 'string') e = JSON.parse(e);
      console.log("error:", e);
  }

  };


window.onload = function() {
//    document.getElementById("source").value = exampleSource;



  //////////
};
