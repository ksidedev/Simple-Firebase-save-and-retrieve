//Reference to the database
var myDataRef = new Firebase('https://saveimage-41a4b.firebaseio.com/');
var dt = new Date();
var savedTime = ' @' + dt.getHours() + ":" + dt.getMinutes();

// var savedTime = Firebase.ServerValue.TIMESTAMP;
$('.js-submit').on('click',function() {
      	var name = $('#nameInput').val();
      	var time = savedTime;
      	var text = $('.message').text();
      	myDataRef.push({name: name, time: time, text: text}); //Save data into firebase database
      	$('#messageInput, #timeInput').val('');
});

//Callback to notify us when message arrives

// refer to chile level of the added values to database
myDataRef.on('child_added', function(snapshot) {

  	//Call message to display on page
  	var message = snapshot.val();
  	console.log(message.time);
	displayChatMessage(message.name, message.time, message.text);;
});


// refer to the base level of the added values to database
myDataRef.on('value', function(snapshot) {
	var totalEntries = snapshot.numChildren();
	$('.total').text(totalEntries);

	if(totalEntries > 1) {
		$('.total-text').text(' messages in total');
	}
});


//Actually display message on page
function displayChatMessage(name, time, text) {

    $('<div class="new-group col-xs-12"><div/>').html('<div class="col-xs-12 uploaded-image"><img src=' + text + '>' 
    	+ '<span class="timespan">' + time + '</span></div>')
    	.prepend($('<em class="col-xs-12"><em/>')
    	.text(name+': '))
    	.appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};