


function Character(name, healthPoints, attackPower, id, healthDiv) {
    this.charName = name;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
    this.id = id;
    this.healthDiv = healthDiv;
}

function Opponent(name, healthPoints, counterAttackPower, healthDiv) {
    this.charName = name;
    this.healthPoints = healthPoints;
    this.counterAttackPower = counterAttackPower;
    this.healthDiv = healthDiv;
}



var game = {
    gameOn: false,
    player: "",
    activeOpponent: "",
    availableOpponents: 4,

    

    gameStart: function(charId, healthDiv) {
        //start the game
        this.gameOn = true;
        console.log(this.gameOn);
        //set the character; add constructor logic; move the image to the battlefield
        if(charId === "dw") {
            this.player = new Character("Dungeon World", 245, 17, charId, healthDiv );
            var charImg = $("#1w").detach();
            charImg.appendTo("#battlefield");
        } else if (charId === "paranoia" ) {
            this.player = new Character("Fate", 520, 9, charId, healthDiv );
            var charImg = $("#2w").detach();
            charImg.appendTo("#battlefield");
        } else if (charId === "fate" ) {
            this.player = new Character("Paranoia", 333, 2, charId, healthDiv );
            var charImg = $("#3w").detach();
            charImg.appendTo("#battlefield");
        } else if (charId === "dnd") {
                this.player = new Character("Dungeons & Dragons", 750, 10, charId, healthDiv );
                var charImg = $("#4w").detach();
            charImg.appendTo("#battlefield");
        }
        console.log(this.player);
        //change the game message to ask player to pick an opponent
        $("#charMessage").text("Choose your opponent.");
        
    },

    setOppponent: function(oppId, healthDiv) {
        //check to make sure the player hasn't clicked themselves.
        if(oppId != this.player.id) {
            //set the active opponent; add constructor logic; move the image to the battlefield
            if(oppId === "dw") {
                this.activeOpponent = new Opponent("Dungeon World", 245, 25, healthDiv);
                var charImg = $("#1w").detach();
               // charImg.appendTo("#battlefield");
            } else if (oppId === "paranoia" ) {
                this.activeOpponent = new Opponent("Paranoia", 520, 35, healthDiv);
                var charImg = $("#2w").detach();
                //charImg.appendTo("#battlefield");
            } else if (oppId === "fate" ) {
                this.activeOpponent = new Opponent("Fate", 333, 50, healthDiv);
                var charImg = $("#3w").detach();
                //charImg.appendTo("#battlefield");
            } else if (oppId === "dnd") {
                    this.activeOpponent = new Opponent("Dungeons & Dragons", 750, 27, healthDiv);
                    var charImg = $("#4w").detach();
                //charImg.appendTo("#battlefield");
        }
        
        }
        charImg.appendTo("#battlefield");
        console.log(this.activeOpponent);
        //change the game message to ready for battle
        $("#charMessage").text("Get ready for battle!");
        //add the attack button
        if(oppId != this.player.id) {
            $("#gameMessage").append("<button id='attack'>attack!</button>");

        }
        
    },  
    //fight!
    combat: function() {
        this.activeOpponent.healthPoints = (this.activeOpponent.healthPoints - this.player.attackPower);
        if(this.activeOpponent.healthPoints >= 0) {
            this.activeOpponent.healthDiv.text(this.activeOpponent.healthPoints);
            this.player.healthPoints = (this.player.healthPoints - this.activeOpponent.counterAttackPower);
            this.player.healthDiv.text(this.player.healthPoints);
            this.player.attackPower = (this.player.attackPower + this.player.attackPower);
        } else {
            this.activeOpponent.healthDiv.text("0");
        }
        
        console.log(this.player.attackPower);
    },

    combatCheck: function() {
        if(this.player.healthPoints <= 0){
            this.activeOpponent = "";
            $("#attack").attr("id", "restart").text("restart");
            $("#charMessage").text("Game Over! Click restart to try again."); 
        } else if((this.activeOpponent <=0) ){

        }
    },

    gameInit: function() {
        this.gameOn = false;
        this.player = "";
        
    },
}

$(document).ready(function(){
    
    //choose the player character
    $(".character").on("click", function(){
        if(game.gameOn === false) {
            var charId = $(this).attr("id");
            var healthDiv = $(`#${$(this).siblings('.hp').attr('id')}`);
            console.log(charId);
            console.log(healthDiv);
            game.gameStart(charId, healthDiv);
            //choose the active opponent
        } else if(game.activeOpponent === "") {
            var oppId = $(this).attr("id");
            var healthDiv = $(`#${$(this).siblings('.hp').attr('id')}`);
            game.setOppponent(oppId, healthDiv);
            
        } 
    })
    //combat clicker
    $(document).on("click", "#attack", function(){
        console.log("attack!")
        game.combat();
        game.combatCheck();
    })

    //restart game
    $(document).on("click", "#restart", function(){
        game.gameInit();
        console.log("resetting", game);
        $("#document").replaceWith(divClone.clone(true));
    })

    var divClone = $("#document").clone(true);
})

