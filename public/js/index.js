var message;
var willBegin = 0;
var points = 0;
var points1 = 0;
var points2 = 0;


//start time counter
var timeCounter = 0;

function myTimer() {
  var d = new Date();
  timeCounter = timeCounter + 1;
    //console.log(timeCounter);
    //console.log(d.toLocaleTimeString());
    // document.getElementById("demo").innerHTML = d.toLocaleTimeString();
  }
var myVar=setInterval(function () {myTimer();}, 10);




function init() {

  var serverBaseUrl = document.domain;

  /* 
   On client init, try to connect to the socket.IO server.
   Note we don't specify a port since we set up our server
   to run on port 8080
  */
  var socket = io.connect(serverBaseUrl);

  //We'll save our session ID in a variable for later
  var sessionId = '';

  //numer of users
  var numUsers = 0;

  //Helper function to update the participants' list
  function updateParticipants(participants) {
   $('#participants').html('');
   for (var i = 0; i < participants.length; i++) {
      $('#participants').append('<span id="' + participants[i].id + '">' +
        participants[i].name + ' ' + (participants[i].id === sessionId ? '(You)' : '') + '<br /></span>');
        numUsers = participants.length;
        console.log(numUsers);
        //console.log(participants[0].id + " is player 1");
        //console.log(participants[1].id + " is player 2");
    }
  }

  /*
 When the client successfully connects to the server, an
 event "connect" is emitted. Let's get the session ID and
 log it. Also, let the socket.IO server there's a new user
 with a session ID and a name. We'll emit the "newUser" event
 for that. 
  */
  socket.on('connect', function () {
    sessionId = socket.io.engine.id;
    console.log('Connected ' + sessionId);
    socket.emit('newUser', {id: sessionId, name: $('#name').val()});
  });

  /*
 When the server emits the "newConnection" event, we'll reset
 the participants section and display the connected clients. 
 Note we are assigning the sessionId as the span ID.
  */
  socket.on('newConnection', function (data) {    
    updateParticipants(data.participants);
  });

  //ready socket - made by sarah
 

  socket.on('countDown',function(data) {
    console.log("working");
  });

  /*
 When the server emits the "userDisconnected" event, we'll
 remove the span element from the participants element
  */
  socket.on('userDisconnected', function(data) {
    $('#' + data.id).remove();
  });

  /*
 When the server fires the "nameChanged" event, it means we
 must update the span with the given ID accordingly
  */
  socket.on('nameChanged', function (data) {
    //console.log("notice to everyone");
    $("#messages").css("display", "none");
    $("#numberThree").css("display", "");

    function thirdNum() {
      $("#numberThree").css("display", "");
    }

    function secondNum() {
      $("#numberThree").css("display", "none");
      $("#numberTwo").css("display", "");
    }

    function firstNum() {
      $("#numberTwo").css("display", "none");
      $("#numberOne").css("display", "");
    }

    function zeroNum() {
      $("#numberOne").css("display", "none");
      $("#questionOne").css("display", "");
      playMP3();
    }


    //countdown
    setTimeout(function(){ thirdNum(); }, 500);
    setTimeout(function(){ secondNum(); }, 1500);
    setTimeout(function(){ firstNum(); }, 2500);
    setTimeout(function(){ zeroNum(); }, 3500);

    //$('#' + data.id).html(data.name + ' ' + (data.id === sessionId ? '(You)' : '') + '<br />');
  });



// QUESTION NUMBER ONE



//QUESTION 1
$('#q1_correct').click(function(data) {
  // socket.emit('questionOne', {id: sessionId, name: name});
   //socket.emit('question_one', {id: sessionId, name: name});
   socket.emit('question one correct');
});

$('#q1_wrong1').click(function() {
  document.getElementById("q1_wrong1").style.background="red";
  document.getElementById("q1_correct").style.background="green";
  document.getElementById("sentence1fr_green").style.display="";
  document.getElementById("sentence1fr_2").style.display="none";
  document.getElementById("sentence1en_green").style.display="";
  document.getElementById("sentence1en_2").style.display="none";
  timeDelay = window.setTimeout(delay_1, 2000);
  points1 = points;
});

$('#q1_wrong2').click(function() {
  document.getElementById("q1_wrong2").style.background="red";
  document.getElementById("q1_correct").style.background="green";
  document.getElementById("sentence1fr_green").style.display="";
  document.getElementById("sentence1fr_2").style.display="none";
  document.getElementById("sentence1en_green").style.display="";
  document.getElementById("sentence1en_2").style.display="none";
  timeDelay = window.setTimeout(delay_1, 2000);
  points1 = points;
});

$('#q1_wrong3').click(function() {
  document.getElementById("q1_wrong3").style.background="red";
  document.getElementById("q1_correct").style.background="green";
  document.getElementById("sentence1fr_green").style.display="";
  document.getElementById("sentence1fr_2").style.display="none";
  document.getElementById("sentence1en_green").style.display="";
  document.getElementById("sentence1en_2").style.display="none";
  timeDelay = window.setTimeout(delay_1, 2000);
  points1 = points;
});


// socket question1 - responses
socket.on('question one answered', function (data) {
  console.log("ANOTHER notice to everyone");
  //changes correct answer to green
  document.getElementById("q1_correct").style.background="green";
  document.getElementById("sentence1fr_green").style.display="";
  document.getElementById("sentence1fr_2").style.display="none";
  document.getElementById("sentence1en_green").style.display="";
  document.getElementById("sentence1en_2").style.display="none";
  //delays a second so you can see the correct answer
  //timeDelay = window.setTimeout(delay_1, 2000);
  //socket.emit('question1', {id: sessionId, name: name});
  //console.log("Question ONE");
  points1 = points + 50;
  //console.log("your points: " + points1);
});






  /*
 When receiving a new chat message with the "incomingMessage" event,
 we'll prepend it to the messages section
  */
  socket.on('incomingMessage', function (data) {
    var message = data.message;
    //var name = data.name;
    // $('#messages').append('<p>' + message + '</p>');
    // $('#messageForm').css("display", "none");
    // $('#imReady').css("display", "");
    // $('#letsPlay').click(function () {
    //   socket.emit('start', message);
    // });
  });

  socket.on('startOut', function(data) {
    console.log("This is happening? Users: " + numUsers);
    $('#messages').css("display", "none");

      // if ((numUsers == 2) && ())

  });

  /*
 Log an error if unable to connect to server
  */
  socket.on('error', function (reason) {
    console.log('Unable to connect to server', reason);
  });

  /*
 "sendMessage" will do a simple ajax POST call to our server with
 whatever message we have in our textarea
  */
  function sendMessage() {
    var outgoingMessage = $('#outgoingMessage').val();
    var name = $('#name').val();
    $.ajax({
      url:  '/message',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({message: outgoingMessage, name: name})

    });

    $('#messages').append('<p> Hello ' + outgoingMessage + '</p>');
    $('#messageForm').css("display", "none");
    $('#imReady').css("display", "");
    $('#letsPlay').click(function () {
      socket.emit('start', outgoingMessage);
      //console.log("ogmessage = " + outgoingMessage);
       
    });
  }





  /*
 If user presses Enter key on textarea, call sendMessage if there
 is something to share
  */
  function outgoingMessageKeyDown(event) {
    if (event.which == 13) {
      event.preventDefault();
      if ($('#outgoingMessage').val().trim().length <= 0) {
        return;
      }
      sendMessage();
      $('#outgoingMessage').val('');
      console.log("send");
    }
  }

  /*
 Helper function to disable/enable Send button
  */
  function outgoingMessageKeyUp() {
    var outgoingMessageValue = $('#send').val();
    $('#send').attr('disabled', (outgoingMessageValue.trim()).length > 0 ? false : true);
  }

  /*
 When a user updates his/her name, let the server know by
 emitting the "nameChange" event
  */


  // function nameFocusOut() {
  //   var name = $('#name').val();
  //   socket.emit('nameChange', {id: sessionId, name: name});
  // }

  $('#startButton').click(function () {
      //console.log("START BUTTON NOW!");
      socket.emit('nameChange', {id: sessionId, name: name});
      // socket.emit('start', outgoingMessage);
      //console.log("ogmessage = " + outgoingMessage);
       
    });



  function nameFocusOut() {
    var name = $('#name').val();
    socket.emit('nameChange', {id: sessionId, name: name});
  }

  /* Elements setup */
  $('#outgoingMessage').on('keydown', outgoingMessageKeyDown);
  $('#outgoingMessage').on('keyup', outgoingMessageKeyUp);
  $('#name').on('focusout', nameFocusOut);
  $('#send').on('click', sendMessage);

}

//mp3s
function playMP3(){
document.getElementById("mp3").play();
}


$(document).on('ready', init);



