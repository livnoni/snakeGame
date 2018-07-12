//create Tabulator on DOM element with id "score-table"
$("#score-table").tabulator({
    // height:100, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    layout:"fitColumns", //fit columns to width of table (optional)
    rowFormatter:function(row){
        if(row.getData().id == 1){
            row.getElement().css({"background-color":"#75df12"});
        }
        else if(row.getData().id <= 10){
            row.getElement().css({"background-color":"#dfd465"});
        }
        else {
            row.getElement().css({"background-color":"#df767a"});
        }
    },
    columns:[ //Define Table Columns
        {title:"Rate", field:"id", width:30, align:"center"},
        {title:"Name", field:"name"},
        {title:"Score", field:"score"},
        {title:"mark", field:"mark", align:"left", formatter:"progress"},
    ]
});

function onGameOver(data) {
    var username = prompt("Please enter your name:", "your name");
    if (username == null || username == "") {
        console.log("User cancelled the prompt.")
    } else {
        if(username == "your name") username = "Unknown Player";
        console.log("username=",username);
        console.log("data=",Object.assign(data,{name:username}));

        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${config.nodeServerAddress}/sendScore`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

    }





    if (confirm("Do you want to play again ?")) {
        var game = new Game(config.soundPath, new Snake());
        console.log("game=\n"+JSON.stringify(game));
        game.startGame();

    } else {

    }
}

////////////////////////////////////////////////////////////
///////////////////////RUN-GAME/////////////////////////////
////////////////////////////////////////////////////////////

var game = new Game(config.soundPath, new Snake());
console.log("game=\n"+JSON.stringify(game));
game.startGame();