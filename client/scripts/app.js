$(document).ready(function() {
    app.fetch();
  // $('#post').on('click', function() {
  //   app.send();
  // });  

    var ourMessage;
    $('#post').on('click', function() {
      ourMessage = $('#field').val();
      ourMessage = app.convertMessage(ourMessage);
      app.send(ourMessage);
    });
    
    $('#clear').on('click', function() {
      app.clearMessages();
    });
    
setInterval(app.fetch, 100);
});

var app = {};
app.init = function() {};
app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  
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
    data: 'order=' + '-createdAt',
    // 'order=-createdAt' 
    // 'where={"playerName":"Sean Plott","cheatMode":false}'
    contentType: 'application/json',
    success: function (data) {
      if (counter === 0) {
        firstID = data.results[0].objectId;
      }
      counter++;
// console.log(counter);
// console.log(firstID);
// console.log(lastID);
      if (data.results[0].objectId !== lastID && data.results[0].objectId !== firstID) {
        $("#chats").append('<div>' + data.results[0].username + ':' + '</div>', '<div>' + data.results[0].text + '</div>');
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
 
app.renderMessage = function() {
     
};

app.convertMessage = function(message, username, roomname) {
  var output = {
  username: 'anon',
  text: message,
  roomname: 'default'
  }
  return output
};

app.clearMessages = function() {
  $('#chats').empty();
}



console.log(newSearch);















