
function makeRequest() {
  var myaccount = document.getElementById("myaccount").value;
  var youraccount = document.getElementById("youraccount").value;

  var mygroup= 3;
  var mysubject ="trevor crowd";
  makeTrustRequestAsync(myaccount, youraccount, mygroup, mysubject);
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
  var myaccount = document.getElementById("myaccount").value;
  var youraccount = document.getElementById("youraccount").value;

  checkTrustRequest(myaccount, youraccount);

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



async function checkTrustRequest(youraccount, youraccount) {

  let t_from = myaccount;
  let t_to = youraccount;

  // pulling data from trust table on who the user trusts
  try {
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
        "key_type": 'i64',
        "lower_bound": group_id,
        "upper_bound": group_id+1,
        "limit": 0
    });
    console.log("TRUSTING:", trusting);

  } catch(e) {
    if (typeof e === 'string') e = JSON.parse(e);
    console.log("error:", e);
  }

  xhttp.onreadystatechange = function(){
             document.getElementById("userMessage").innerHTML = data.message;
             document.getElementById("uMessage").classList.add("alert-danger");
             document.getElementById("uMessage").classList.remove("alert-info");
    }
  };
}


window.onload = function() {
//    document.getElementById("source").value = exampleSource;



  //////////
};
