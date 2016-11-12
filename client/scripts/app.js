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

app.fetch = function() {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function (data) {
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

app.renderMessage = function(message) {
  $('#chats').append('<a href = "#"><div class="username">' + ':' + message.username + ':' + message.text + '</div></a>');
};

app.renderRoom = function(roomname) {
  $('#roomSelect').append('<div class="room">' + roomname + '</div>');
};

app.handleUsernameClick = function() {

};

app.handleSubmit = function () {

};


$(document).ready(function() {
  $('#main').on('click', '.username', function () {
    app.handleUsernameClick();  
  });

  $('#send .submit').on('submit', function () {
    app.handleSubmit();
  });

});