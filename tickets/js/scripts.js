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
];

tickets.reasonsBanned = {
  "vague" : "Things are never what they seem. By saying this we are assuming too much about the current state of the project. If you know more, say more. If you don't then go and find out.",
  "presuming scope" : "This word places presuppositions onto the scope of a ticket. Explain what should happen and how. Don't dwell on presumed difficulty."
}

tickets.test = function(ticket) {
  for ( i = 0; i < tickets.bannedWords.length; i++ ) {
    word = tickets.bannedWords[i];
    ticket = ticket.replace(word['word'], '<span class="tipped label label-danger" title="'+tickets.reasonsBanned[word['reason']]+'">'+word['word']+"</span>", "gi");
  }
  return ticket;
};

$(function() {
  $('#test').on('click', function() {
    if ($(this).hasClass('visible')) {
      var value = $('#ticket').val();
      $('#ticket').fadeOut();
      $('#resolution').html(tickets.test(value)).fadeIn();
      $(this).toggleClass('visible');
      $(this).text('Run another test');
      $('.tipped').tooltip();
    } else {
      $('#resolution').fadeOut();
      $('#ticket').fadeIn();
      $(this).toggleClass('visible');
      $(this).text('Does it suck?');
    }
  });
});