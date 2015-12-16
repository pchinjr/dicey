var player1 = { dom: $('.player-1'), health:30, dice: 1};
var player2 = { dom: $('.player-2'), health:30, dice: 1 };

//roll a single die
function rollDie(sides) {
   return(Math.floor(Math.random() * sides));
}

//roll multiple dice
function rollDice(number, sides) {
    var total = 1;
    while(number-- > 0) total += rollDie(sides);
    return total;
}

//gameplay roll
function roll(player) {
    player.dom.find('.currentRoll, .attack, .takeDamage').html( rollDice(player.dice, 6));
}

//attack other player
function attack(player, hit) {
    player.health = player.health - hit;
    player.dom.find('.health').html(player.health);
    checkWinner();
}

//take damage
function takeDamage(player, hit) {
    player.health = player.health - hit;
    player.dom.find('.health').html(player.health);
    player.dice = player.dice + 1;
    player.dom.find('.dice').html(player.dice);
    
}

//check for winner
function checkWinner() {
    if ( parseInt( player1.dom.find('.health').text(), 10) <= 0) {
        $('#winner').html('Player 2 Wins!');
    } else if ( parseInt( player2.dom.find('.health').text(), 10) <= 0) {
        $('#winner').html('Player 1 Wins!');
    } else {
      $('#winner').html('');       
    }
}

//players roll
player1.dom.find(".roll").on( 'click', function() {
    roll(player1); 
});

player2.dom.find(".roll").on( 'click', function() {
    roll(player2); 
});

//players attack
player1.dom.find(".clickAttack").on( 'click', function() {
   attack( player2, parseInt( player1.dom.find('.attack').text(), 10) );
});

player2.dom.find(".clickAttack").on( 'click', function() {
   attack( player1, parseInt( player2.dom.find('.attack').text(), 10) );
});


//take damage
player1.dom.find(".clickTakeDamage").on( 'click', function() {
    takeDamage( player1, parseInt( player1.dom.find('.takeDamage').text(), 10) );
});

player2.dom.find(".clickTakeDamage").on( 'click', function() {
    takeDamage( player2, parseInt( player2.dom.find('.takeDamage').text(), 10) );
});

//start game
//player 2 controls are disabled
//when player 1 attacks enable player 2 controlls
//disable player 1 controlls
//when player 2 attacks enable player 1 controlls