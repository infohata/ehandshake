
function makeRequest() {
  var myaccount = document.getElementById("myaccount").value;
  var youraccount = document.getElementById("youraccount").value;

  var mygroup="tba";
  var mysubject ="mysubject"
  makeTrustRequest(myaccount, youraccount, mygroup, mysubject);
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

window.onload = function() {
//    document.getElementById("source").value = exampleSource;
//////////
};
