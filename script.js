function speak(text) {

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-GB";
    speech.pitch = 0.5;
    speech.rate = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);

}

function stopListening() {
    if (recognition) {
        recognition.stop();
        document.getElementById("awaiting").textContent = "Listening stopped.";
        document.getElementById("output").textContent = "Speech recognition stopped.";
    }
}

function showHelp() {
    const helpPanel = document.getElementById("help-panel");
    const helpList = document.getElementById("help-list");
    const commands = getHelpCommands();

    helpList.innerHTML = commands.map(cmd => `<li>${cmd}</li>`).join("");
    helpPanel.classList.toggle("visible");
}

function getHelpCommands() {
    switch (gamestate) {
        case "mainmenu":
            return ["Say 'start' to begin the game"];
        case "mainroom":
            return [
                "Say 'go to the computer'",
                "Say 'go to the right room'",
                "Say 'go to the middle door'",
                "Say 'go back'"
            ];
        case "computer":
            return ["Say 'turn on the computer'", "Say 'go back'"];
        case "computer login":
            return ["Say 'log into the computer'"];
        case "ready to log in":
            return ["Say 'yes' to log in"];
        case "logged in":
            return ["Say 'yes' to check your mail"];
        case "bathroom":
            return [
                "Say 'toilet'",
                "Say 'wall'",
                "Say 'shower'",
                "Say 'go back'"
            ];
        case "toilet":
        case "wall":
        case "shower":
            return ["Say 'go back' to return to the bathroom"];
        case "middle door":
            return ["Say 'go to the keypad'", "Say 'go back'"];
        case "keypad":
            return ["Say 'go back'"];
        case "door unlocked":
            return ["Say 'go through the door'", "Say 'go back'"];
        case "game won":
            return ["Say 'exit' to leave the game"];
        case "exited":
            return ["No further commands available"];
        default:
            return ["Use the help button to view available commands."];
    }
}


gamestate = "mainmenu";
previosroom = "main-room-image";

let gotmail = new Audio('audio/effects/got-mail.wav');
let error = new Audio('audio/effects/windows-xp-error-sound.mp3');
let horray = new Audio('audio/effects/horray.mp3');
let yippieeffect = new Audio('audio/effects/yippee-sound-effect.wav');
let computerboot = new Audio('audio/effects/computer-boot.mp3');
let comutershutdown = new Audio('audio/effects/XP-Shutdown-Sound.mp3');
let walkeffect = new Audio('audio/effects/walking-sound-effect.mp3'); 
let dooropen = new Audio('audio/effects/door-open-sound-effect.mp3');
let keyboardeffect = new Audio('audio/effects/keyboard-sound-effect.mp3');
let menuMusic = new Audio('audio/music/menu-music.mp3');
let maintheme = new Audio('audio/music/main-theme.ogg');
let intensemusic = new Audio('audio/music/intense-music.mp3');

menuMusic.loop = true;
menuMusic.play();

maintheme.loop = true;
intensemusic.loop = true;
const canGoBackToMain = [
    "computer",
    "computer login",
    "username correct",
    "username and password correct",
    "ready to log in",
    "logged in",
    "bathroom",
    "middle door"
];

function hideAll() {
    const ids = [
        "menu-image",
        "main-room-image",
        "computer-image",
        "computer-image-login",
        "computer-image-booting",
        "computer-image-mail",
        "bathroom-image",
        "toilet-image",
        "wall-image",
        "shower-image",
        "middle-door-image",
        "keypad-image",
        "computer-mail-01",
        "computer-mail-02",
        "computer-error",
        "celibration",
        "you-win",
        "Yippie"
        
    ];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
}

function stopmusic() {
    menuMusic.pause();
    maintheme.pause();
    intensemusic.pause();
}

hideAll();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

document.getElementById("menu-image").style.display = "block";

function startListening() {

    recognition.start();

    document.getElementById("awaiting").textContent = "awaiting a command.";

    recognition.onresult = function(event) {

const command =
    event.results[0][0].transcript.toLowerCase();

console.log(command);

document.getElementById("awaiting").textContent =
    "You said: " + command;

// Starting the game
if (command.includes("start")) {

    gamestate = "mainroom";

    hideAll();
    stopmusic();

    maintheme.play();
    document.getElementById("main-room-image").style.display = "block";

    speak("Starting the game. You are now in the main room.");
    document.getElementById("output").textContent =
        "You are now in the main room.";
}


// Computer
else if (gamestate === "mainroom" && (command.includes("go to the computer") || command.includes("computer"))) {

    if (gamestate !== "mainroom") {
        speak("The computer is not in this room.");
        return;
    }

    walkeffect.play();

    hideAll();
    document.getElementById("computer-image").style.display = "block";

    speak("Going to the computer. It is off.");
    document.getElementById("output").textContent = "The computer is off.";
        gamestate = "computer";
}

// Turning on the computer
else if (command.includes("turn on the computer") || command.includes("turn on") || command.includes("turn it on")) {

    if (gamestate !== "computer") {
        speak("You are not at the computer.");
        document.getElementById("output").textContent = "You are not at the computer.";
        return;
    }

    hideAll();
    document.getElementById("computer-image-booting").style.display = "block";
    computerboot.play();
    speak("Turning on the computer");
    document.getElementById("output").textContent = "Turning on the computer.";

    setTimeout(() => {

        hideAll();
        document.getElementById("computer-image-login").style.display = "block";

        speak("The computer is now on");
        document.getElementById("output").textContent = "The computer is now on.";
            
            gamestate = "computer login";

    }, 2000);

}
// Logging in
else if (gamestate === "computer login" && (command.includes("log into the computer") || command.includes("log in") || command.includes("login"))) {

    speak("Username?");
    document.getElementById("output").textContent = "Username?";

}

else if (command.includes("leo") && gamestate === "computer login") {
        keyboardeffect.play();
        speak("That may be right.");
        document.getElementById("output").textContent = "That may be right.";
        gamestate = "username correct";
        speak("Password?");
        document.getElementById("output").textContent = "Password?";
    }

else if (command.includes("john") && gamestate === "username correct") {
        keyboardeffect.play();
        speak("That may be right as well.");
        document.getElementById("output").textContent = "That may be right.";
        gamestate = "username and password correct";
        speak("do you want to log in?");
        document.getElementById("output").textContent = "do you want to log in?";
        gamestate = "ready to log in";   
    }

// Logging in and mail
else if (gamestate === "ready to log in" && (command.includes("yes") || command.includes("yeah") || command.includes("log in") || command.includes("login"))) {
        speak("Logging in.");
        document.getElementById("output").textContent = "Logging in.";
        setTimeout(() => {
        hideAll();
        document.getElementById("computer-image-mail").style.display = "block";
        gotmail.play();
        }, 1000);
        setTimeout(() => {
        speak("I am now logged in. Looks like I have some mail. Should I check it?");
        document.getElementById("output").textContent = "I am now logged in. Looks like I have some mail, should I check it?";
        gamestate = "logged in";
        }, 2000);

    }

// Mail
else if (gamestate === "logged in" && (command.includes("yes") || command.includes("yeah"))) {
    speak("I opened the mail.");
    document.getElementById("output").textContent = "I opened the mail.";

        stopmusic();
        intensemusic.play();

    setTimeout(() => {
        speak("The mail reads:");
        document.getElementById("output").textContent = "The mail reads:";
        }, 1000);


    setTimeout(() => {
        speak("If you're reading this ... then I guess you made it far enough to remember who I am. The world's gone to hell. People are vanishing, streets are empty, and the ones who are still out there ... they're not right. The Jollys - that's what they call themselves. I found a file marked with their insignia - the laughing mask. Inside were reports about their 'tests.' They've been experimenting on people who get too close. Detectives, journalists, even families of their victims. That's why me and you got separated, Leo. I think they're planning to finish the job soon - silence me before I piece it all together. I found a manifest from 'Site 12.' It mentions something ...")
        hideAll();
        document.getElementById("computer-mail-01").style.display = "block";
        }, 2000);
    
    setTimeout(() => {
        speak("called 'The Product.' Whatever it is, they're distributing it in the open. If I don't make it out ... Leo, if you find this, finish what I started. I've hidden the way out in the code - the last part's 75. Don't forget that. If you find the first part of the code, Leo, it will allow you through the door to the outside world where you can come and find me. Just be careful, son - the Jollys aren't the only threat once you get out that door. I can't lose anyone else to this sick place with sick people. Especially you. You're the only one I've got left.")
        hideAll();
        document.getElementById("computer-mail-02").style.display = "block";
        }, 47000);
    

    setTimeout(() => {
        intensemusic.pause();
        hideAll();
        document.getElementById("computer-error").style.display = "block";
        error.play();
        }, 86000);
    

    setTimeout(() => {
        speak("The computer errored. and then restarted. I guess that's the end of that.");
        hideAll();
        comutershutdown.play();
        document.getElementById("computer-image").style.display = "block";
        document.getElementById("output").textContent = "The computer errored, and then restarted.";
        }, 90000);

        setTimeout(() => {
        hideAll();
        document.getElementById("computer-image-booting").style.display = "block";
        computerboot.play();           
        }, 94000);

        

        setTimeout(() => {
        hideAll();
        document.getElementById("computer-image-login").style.display = "block"; 
        maintheme.play();          
        }, 96000)

        

    }

            

// bathroom and right room
else if(command.includes("go to the right room") || command.includes("go right") || command.includes("right") && gamestate === "mainroom"){

    walkeffect.play();
    dooropen.play();
    hideAll();
    document.getElementById("bathroom-image").style.display = "block";

    speak("Going to the right room.");
    document.getElementById("output").textContent = "Going to the right room.";

    gamestate = "bathroom";
}
// toilet
else if(command.includes("toilet") && gamestate === "bathroom"){

    walkeffect.play();
    hideAll();
    document.getElementById("toilet-image").style.display = "block";

    speak("Going to the toilet.");
    document.getElementById("output").textContent = "Going to the toilet.";


    gamestate = "toilet";
}
// wall
else if(command.includes("wall") && gamestate === "bathroom"){

    walkeffect.play();
    hideAll();
    document.getElementById("wall-image").style.display = "block";

    speak("Going to the wall.");
    document.getElementById("output").textContent = "Going to the wall.";


    gamestate = "wall";
}
// shower
else if(command.includes("shower") && gamestate === "bathroom"){

    hideAll();
    document.getElementById("shower-image").style.display = "block";

    speak("Going to the shower.");
    document.getElementById("output").textContent = "Going to the shower.";


    gamestate = "shower";
}

// Middle Door
else if(command.includes("go to the middle door") || command.includes("go middle") || command.includes("middle") && gamestate === "mainroom"){
    
    walkeffect.play();
    hideAll();
    document.getElementById("middle-door-image").style.display = "block";

    speak("Going to the middle door.");
    document.getElementById("output").textContent = "Going to the middle door.";

    gamestate = "middle door";

    if (gamestate === "middle door"){
        speak("The middle door is locked. It seems its locked with a code. What could it be?");
    }}
        else if (command.includes("go to the keypad") && command.includes("keypad")){

            walkeffect.play();
            hideAll();
            document.getElementById("keypad-image").style.display = "block";

            speak("Going to the keypad. It is asking for a 4 digit code.");
            document.getElementById("output").textContent = "Going to the keypad. It is asking for a 4 digit code.";
            gamestate = "keypad";
    
        }

    else if (gamestate === "mainroom"){
        speak("You need to be at the middle door to do that.");
        document.getElementById("output").textContent = "You need to be at the middle door to do that.";
    }
    
// Keypad
    else if (gamestate === "keypad"){
        if (command.includes("1 7 7 5") || command.includes("1, 7, 7, 5") || command.includes("1775")){
            speak("That is correct. The door is now unlocked.");
            document.getElementById("output").textContent =  "That is correct. The door is now unlocked.";

            gamestate = "door unlocked"; 
            hideAll();
            document.getElementById("middle-door-image").style.display = "block";
            return;
        }

        else if (command.includes("go back")){
            speak("Going back to the the door.");
            hideAll();
            document.getElementById(previosroom).style.display = "block";
            walkeffect.play();

        }
        else{
            speak("That is incorrect. Try again.");
            document.getElementById("output").textContent = 
            "That is incorrect. Try again.";
        }
    }


// Escape and Win
else if (command.includes("go through the door") || command.includes("go through") || command.includes("escape") || command.includes("open the door") && gamestate === "door unlocked"){
    dooropen.play();
    walkeffect.play();
    document.getElementById("middle-door-image").style.display = "none";
    speak("You go through the door and escape. Congratulations, you win!");
    document.getElementById("output").textContent = "You go through the door and escape. Congratulations, you win!";
    gamestate = "game won";

        setTimeout(() => {
        hideAll();
        stopmusic();
        horray.play();   
        document.getElementById("celibration").style.display = "block";     
        document.getElementById("you-win").style.display = "block"; 
        }, 5000);

        setTimeout(() => {
        document.getElementById("Yippie").style.display = "block"; 
        yippieeffect.play();
        }, 10000);
}

// Exiting after winning
else if (command.includes("exit") && gamestate === "game won"){
        horray.pause();
        yippieeffect.pause();
        speak("Exiting the game. Thanks for playing!");
        document.getElementById("output").textContent = "Exiting the game. Thanks for playing!";

        hideAll();

        setTimeout(() => {
        speak("Yeah thats it. Deal with it.");
        document.getElementById("output").textContent = "Yeah thats it. Deal with it.";


        gamestate = "exited";
        }, 5000);

}


// Going back from rooms
else if (command.includes("go back") && canGoBackToMain.includes(gamestate)){
    walkeffect.play();
    if (gamestate === "bathroom"){
        dooropen.play();
    }
    speak("Going back to the main room.");
    hideAll();
    document.getElementById("main-room-image").style.display = "block";
    gamestate = "mainroom";
    stopmusic();
    maintheme.play();
}


else if (command.includes("go back") && gamestate === "keypad"){
    speak("Going back to the middle door.");
    hideAll();
    document.getElementById("middle-door-image").style.display = "block";
    gamestate = "middle door";
    stopmusic();
    maintheme.play();
}

else if (command.includes("go back") && gamestate === "toilet" || gamestate === "wall" || gamestate === "shower") {

    walkeffect.play();
    speak("Going back to the bathroom.");
    document.getElementById("output").textContent = "Going back to the bathroom.";
    hideAll();
    document.getElementById("bathroom-image").style.display = "block";
    gamestate = "bathroom";
    stopmusic();
    maintheme.play();
}

else if (command.includes("exit")|| command.includes("quit")|| command.includes("leave the game")){
    hideAll();
    stopmusic();
    speak("Exiting the game. Thanks for playing!");
    document.getElementById("output").textContent = "Exiting the game. Thanks for playing!";
    gamestate = "exited";
    setTimeout(() => {
    window.close();}, 5000);
}


// Unrecognised command or no command
else {

    if (gamestate === "mainmenu") {
        speak("Say start to begin the game.");
        document.getElementById("output").textContent =
            "Say start to begin.";
    }

    else if (gamestate === "mainroom") {
        speak("Please say a direction to move.");
        document.getElementById("output").textContent =
            "Please say a direction.";
    }

    else if (gamestate === "computer") {
        speak("Try saying 'turn on the computer.'");
        document.getElementById("output").textContent =
            "Try saying 'turn on the computer.'";
    }

    else if (gamestate === "computer login" || gamestate === "ready to log in" || gamestate === "username correct") {
        speak("I dont think that's right.");
        document.getElementById("output").textContent = "I dont think that's right.";
        setTimeout(() => {
            speak("try saying 'log into the computer.' again.");
            document.getElementById("output").textContent = "try saying 'log into the computer.' again.";
        }, 2000);
    }

    else if (gamestate === "exited") {
        speak("I dont want to talk to you anymore. Go waste your time somewhere else.");
        document.getElementById("output").textContent = "I dont want to talk to you anymore. Go waste your time somewhere else.";
    }

    else {
        speak("Command not recognised.");
        document.getElementById("output").textContent =
            "Command not recognised.";
    }
}

    }

}