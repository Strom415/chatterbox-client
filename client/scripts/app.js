$(function() {
  $('body').on('click', function() {
    app.fetch();
  });
  $('#post').on('click', function() {
    app.send();
  });  
});

var app = {};
var messageData = [];
app.init = function() {};
  
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
  
app.fetch = function() {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    // data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      $("#chats").append('<div>' + data.results[0].username + ':' + '</div>', '<div>' + data.results[0].text + '</div>');
      console.log(data);    
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};  
  
app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  
app.renderMessage = function() {
     
};