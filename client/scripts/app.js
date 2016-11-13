var app = {};

var newFetch;
var oldFetch = [];
var roomsAvailable = {};
var current, person;
var friends = {};


app.init = function() {

};

app.findRooms = function(messArray) {
  for (var i = 0; i < messArray.length; i++) {
    roomsAvailable[messArray[i].roomname] = messArray[i].roomname;
  }
  var temp = '';
  var all = '<option value="allrooms">All Rooms</option>';
  $('#roomSelect').append(all);
  for (var rooms in roomsAvailable) { 
    if (rooms === 'null' || rooms === 'undefined' || rooms === '') {
      delete rooms;
    } else {
      temp = '<option value="' + rooms + '">' + rooms + '</option>';
      $('#roomSelect').append(temp);      
    }
  }

};

app.send = function(message) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.dataConvert = function(str) {
  return str.slice(5, 10) + ' @ ' + str.slice(11, 16);
};

/*app.renderMessage = function(message) {
  var current = $('#roomSelect').val();
  console.log('test');
  if (current === 'allrooms') {
    $('#chats').append('<div class="username">' + app.dataConvert(message.updatedAt) + ' ' + message.username + ': ' + message.text + '</div>');
  } else if (message.roomname === current) {
    $('#chats').append('<div class="username">' + app.dataConvert(message.updatedAt) + ' ' + message.username + ': ' + message.text + '</div>');
  }
};*/


app.renderMessagepre = function(message) {
  //$('#chats').prepend('<div class="username">' + app.dataConvert(message.updatedAt) + ' ' + message.username + ': ' + message.text + '</div>');
  current = $('#roomSelect').val();

  if (current === 'allrooms') {
    $('#chats').prepend('<div class="username">' + app.dataConvert(message.updatedAt) + ' ' + '<span class="person">' + message.username + '</span>: ' + message.text + '</div>');
  } else if (message.roomname === current) {
    $('#chats').prepend('<div class="username">' + app.dataConvert(message.updatedAt) + ' ' + message.username + ': ' + message.text + '</div>');
  }
};




app.reduceMess = function (oldMess, newMess, roomsStr) {
  
  if (oldMess.length === 0) {
    oldFetch = newFetch;
    return newFetch;
  } else {
    var time = oldMess[0].updatedAt;
    var user = oldMess[0].username;
    var lastestMess = [];

    for (var i = 0; i < newMess.length; i ++) {
      if (time === newMess[i].updatedAt && user === newMess[i].username) {
        lastestMess = newMess.slice(0, i);
        console.log(lastestMess);
      }
    }
    oldFetch = newFetch;
    return lastestMess;
  }

};

app.parseRender = function (arrChat) {
  /*var username, message, time;
  if (oldFetch.length === 0) {
    console.log('test');
    for ( var i = 0; i < arrChat.length; i++ ) {
      app.renderMessage(arrChat[i]);
    } 
  } else {*/
    for ( var i = arrChat.length - 1; i >= 0; i-- ) {
      app.renderMessagepre(arrChat[i]);
    }
  //}


};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function (data) {
      newFetch = data.results;
      app.parseRender(app.reduceMess(oldFetch, newFetch));
      console.log('chatterbox: Messages received');
      $('#roomSelect').empty();
      app.findRooms(oldFetch);
      $('#roomSelect').val(current);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });

};



app.server = 'https://api.parse.com/1/classes/messages';

app.clearMessages = function() {
  $('#chats').empty();
};



app.renderRoom = function(roomname) {
  $('#roomSelect').append('<div class="room">' + roomname + '</div>');
};

app.handleUsernameClick = function() {

};

app.handleSubmit = function (text) { // form data from button execution.
  
  var text = $('#message').val();

  var message = {
    'username': currentUser,
    'text': text,
    'roomname': 'DD'
  };

  app.send(message);
  // after submitting message, delete message after.
  $('#message').val('');
  /*data = $('input').val();
  var information = {
    'username': 'test',
    'text': data,
    'roomname': 'testroom'
  };
  information.text = data;
  app.send(information);*/
};

app.switchRooms = function(roomString) {
  for (var i = 0; i < oldFetch.length; i++) {

  }
};

$(document).ready(function() {
  app.fetch();
  $('#main').on('click', '.username', function () {
    app.handleUsernameClick();  
  });

  $('#update').on('click', function () {
    app.fetch();  
  });
   
  $('#send').on('click', function () {
    app.handleSubmit();
  });
  
  $('.user').html('Logged in as ' + '<i><strong>' + currentUser + '</strong></i>');
  
  $('#roomSelect').on('change', function() {
    current = $(this).val();
    oldFetch = [];
    $('#chats').empty();
    app.fetch();
    // $('#roomSelect').val(current);
    // $('#chats').empty();
    //   for (var i = 0; i < oldFetch.length; i++) {
    //     if (oldFetch[i].roomname === )
    //   }
  });

  $('body').on('click', '.person', function() {
    currPerson = $(this).text();

    if (friends[currPerson] === undefined) {
      friends[currPerson] = currPerson;
      $('.friendslist').append('<p class="friends ' + currPerson + '">' + currPerson + '</p>');
    }
  });
  $('body').on('click', '.friends', function() {
    console.log('test');
  });

});
