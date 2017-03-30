(function($) {
  var socket = io();
  var typingTimer;
  var doneTypingInterval = 5000;
  var animationSpeed = 500;
  var escapeKey = 13;

  function doneTyping() {
    socket.emit('user is not typing');
  }

  $('.submit').submit(function() {
    var messageValue = $('.js-submit-input').val();

    if(messageValue == '') return false;

    socket.emit('user is not typing');
    socket.emit('chat message', messageValue);
    $('.js-submit-input').val('');
    typingTimer = setTimeout(doneTyping, doneTypingInterval);

    return false;
  });

  $('.js-submit-input').on('keyup', function() {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if(keycode == escapeKey) return;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
    socket.emit('user is typing');
  });

  $('.js-submit-input').on('keydown', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if(keycode == escapeKey) return;
    clearTimeout(typingTimer);
  });

  socket.on('chat message', function(message) {
    $('.js-messages').append($('<li class="message__item">').text(message));
    $('html, body').animate({
      scrollTop: 0
    }, animationSpeed);
  });

  socket.on('user is typing', function() {
    $('.user-is-typing').addClass('active');
  });

  socket.on('user is not typing', function() {
    $('.user-is-typing').removeClass('active');
  });
})(jQuery);
