var app = {};

app.init = function() {

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

app.renderMessage = function(message) {
  $('#chats').append('<div class="username">' + app.dataConvert(message.updatedAt) + ' ' + message.username + ': ' + message.text + '</div>');
};

app.parseRender = function (arrChat) {
  var username, message, time;
  for ( var i = 0; i < arrChat.results.length; i++ ) {
    app.renderMessage(arrChat.results[i]);
  }


};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function (data) {
      app.parseRender(data);
      console.log('chatterbox: Messages received');
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

app.handleSubmit = function (text){ // form data from button execution.
  
  var text = $('#message').val();

  var message = {
    'username': 'shawndrost',
    'text': text,
    'roomname': '4chan'
  };

  app.send(message);
  /*data = $('input').val();
  var information = {
    'username': 'test',
    'text': data,
    'roomname': 'testroom'
  };
  information.text = data;
  app.send(information);*/
};


$(document).ready(function() {
  $('#main').on('click', '.username', function () {
    app.handleUsernameClick();  
  });
   
  $('#send').on('click', function () {
    app.handleSubmit();
  });
  app.fetch();
  

});
setInterval(app.fetch, 1500);
setInterval(app.)