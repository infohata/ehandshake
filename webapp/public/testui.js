
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

  var mygroup="tba";
  var mysubject ="mysubject"
  checkTrustRequest(myaccount, youraccount, mygroup, mysubject);
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



function checkTrustRequest(myaccount, youraccount, mygroup, mysubject) {

  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "/api/checktrust", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("sender=" +myaccount + "&" + "receiver="
  +youraccount + "&" + "trust_group_id=" + mygroup + "&" + "subject=" + mysubject);


  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status ==200){
       var data = JSON.parse(this.response);
       if (data.message != "Trusted") {
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







window.onload = function() {
//    document.getElementById("source").value = exampleSource;



  //////////
};
