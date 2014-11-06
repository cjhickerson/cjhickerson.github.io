// Does my ticket suck?
var tickets = {};
tickets.bannedWords = [
  {
    word: "likely",
    reason: "vague"
  },
  {
    word: "probably",
    reason: "vague"
  },
  {
    word: "usually",
    reason: "vague"
  },
  {
    word: "generally",
    reason: "vague"
  },
  {
    word: "just",
    reason: "presuming scope"
  },
  {
    word: "simple",
    reason: "presuming scope"
  },
  {
    word: "obvious",
    reason: "nothing is obvious"
  }
];

tickets.reasonsBanned = {
  'vague' : "Things are never what they seem. By saying this we are assuming too much about the current state of the project. If you know more, say more. If you don't then go and find out.",
  'presuming scope' : "This word places presuppositions onto the scope of a ticket. Explain what should happen and how. Don't dwell on presumed difficulty.",
  'nothing is obviuos' : "Nothing is obvious. Ever. Explain exactly what you want to happen."
}

tickets.test = function(ticket) {
  for ( i = 0; i < tickets.bannedWords.length; i++ ) {
    word = tickets.bannedWords[i];
    ticket = ticket.replace(word['word'], '<span class="tipped label label-danger" data-toggle="popover" tabindex="0" data-container="body" data-trigger="hover" data-content="'+tickets.reasonsBanned[word['reason']]+'">'+word['word']+"</span>", "gi");
  }
  return ticket;
};

$(function() {
  $.getJSON('/tickets/bannedWords.json', function(data) {
    tickets.bannedWords = data.bannedWords;
    tickets.reasonsBanned = data.reasonsBanned;
  });
  
  $('#test').on('click', function() {
    if ($(this).hasClass('visible')) {
      var value = $('#ticket').val();
      $('#ticket').fadeOut();
      $('#resolution').html(tickets.test(value)).fadeIn();
      $(this).toggleClass('visible');
      $(this).text('Run another test');
      $('.tipped').popover();
    } else {
      $('#resolution').fadeOut();
      $('#ticket').fadeIn();
      $(this).toggleClass('visible');
      $(this).text('Does it suck?');
    }
  });
});