var question;

$( document ).ready(function() {
    console.log( "ready!" );
    
    var cards = {
      "cards" : [
        {
          "title" : "Card 1",
          "question" : "This is the first question",
          "type" : "tf",
          "options" : [
            "true",
            "false"
          ]
        },
        {
          "title" : "Card 2",
          "question" : "This is the second question",
          "type" : "multi",
          "options" : [
            "Strongly Agree",
            "Somewhat Agree",
            "Neutral",
            "Somewhat Disagree",
            "Strongly Disagree"
          ]
        },
        {
          "title" : "Card 3",
          "question" : "This is the second question",
          "type" : "multi",
          "options" : [
            "Strongly Agree",
            "Somewhat Agree",
            "Neutral",
            "Somewhat Disagree",
            "Strongly Disagree",
            "No Opinion"
          ]
        }
      ]
    };
    
    for (c in cards["cards"]){
    	
    	var card = cards["cards"][c]
    	console.log(card);
    	var appendCard = '<li data-array = "'+c+'" data-options = "'+card.options.length+'" class="question">'+
    	    				'<div class = "title">'+card.title+'</div>'+
    	    				'<div class="question">'+card.question+'</div>'+
    	    			'</li>';
    	$("#tinderslide ul").append(appendCard);
    	
    }
    
    
    
    $("#tinderslide").jTinder({
    	// dislike callback
        onDislike: function (item) {
    	    // set the status text
            $('#status').html('Dislike image ' + (item.index()+1));
        },
    	// like callback
        onLike: function (item) {
    	    // set the status text
            $('#status').html('Like image ' + (item.index()+1));
        },
        renderPane: function(item){
        	console.log($(item).data('array')	);
        	drawPie($(item).data('array'))
        },
    	animationRevertSpeed: 200,
    	animationSpeed: 400,
    	threshold: 1,
    	likeSelector: '.like',
    	dislikeSelector: '.dislike'
    });
    
    function drawPie(key){
    	question = cards.cards[key];
    	var options = cards.cards[key].options;
    	var colors = ['#ff6633','#ffcc00','#99cc33','#339966','#0033cc','#0099cc'];
    	
    	//console.log(options);
    	//alert($(".wrap").width());
    	//alert(-1*(($(".wrap").width()*5)/2));
    	$("#pieChart").css("width",$(".wrap").width()*5);
    	$("#pieChart").css("height",$(".wrap").width()*5);
    	$("#pieChart").css("left",(-1*(($(".wrap").width()*5)/2))+$(".wrap").width()/2);
		$("#pieChart").css("top",(-1*(($(".wrap").width()*5)/2))+$(".wrap").width());
  	
    	var optionSize = 240/options.length;
    	//console.log(optionSize);
    	var pieSlice = [];
    	var count = 0;
    	for (o in options){
    		pieSlice.push({ title: options[o], value : (optionSize/360)*100,  color: colors[count]});
    		count++;
    	}
    	pieSlice.push({ title: "", value : 33.33,  color: "white"});
    	//console.log(pieSlice);
    	$("#pieChart").empty();
    	$("#pieChart").drawPieChart(pieSlice,{animation:false});
    	
    	
    }	
    /**
     * Set button action to trigger jTinder like & dislike.
     */
    $('.actions .like, .actions .dislike').click(function(e){
    	e.preventDefault();
    	$("#tinderslide").jTinder($(this).attr('class'));
    });
    
       
});

