$(document).ready(function() {

  var ourMessage;
  $('#post').on('click', function() {
    ourMessage = $('#field').val();
    ourMessage = app.convertMessage(ourMessage, app.username);
    app.send(ourMessage);
  });
    
  $('#clear').on('click', function() {
    app.clearMessages();
  });
    
  setInterval(app.fetch, 500);
});

var app = {
  init: function() {},
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  username: window.location.search.substr(10),
  roomnames: []
};
 
app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
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

var lastID = null;
var firstID = null;
var counter = 0;

app.fetch = function() {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {order: '-createdAt'},
    // 'order=-createdAt' 
    // 'where={"playerName":"Sean Plott","cheatMode":false}'
    contentType: 'application/json',
    success: function (data) {
      if (counter === 0) {
        firstID = data.results[0].objectId;
      }
      counter++;

      if (data.results[0].objectId !== lastID && data.results[0].objectId !== firstID) {
        app.renderMessage(data);
        lastID = data.results[0].objectId;
      }
      
      // console.log(data);    
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};  
 
app.renderMessage = function(data) {
  $("#chats").append('<div class="chat">' + data.results[0].username + ':' + '</div>', '<div class="chat">' + data.results[0].text + '</div>');     
};

app.convertMessage = function(message, username, roomname) {
  var output = {
    username: username,
    text: message,
    roomname: 'default'
  }
  return output
};

app.clearMessages = function() {
  $('#chats').empty();
}

app.renderRoom = function(roomname) {
  console.log('new room');
  $('#roomSelect').append($('<option/>').val(roomname).text(roomname));
}