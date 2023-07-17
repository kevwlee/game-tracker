var submitButton = document.querySelector(
  "button[onclick='submitNumberOfTeams()']"
);

var numberOfTeamsInput = document.getElementById("numberOfTeams");
var numberOfTeams;
var teams = [];
var processButton;

function submitNumberOfTeams() {
  var numberOfTeamsSubmitted = parseInt(numberOfTeamsInput.value);
  processButton = document.getElementById("processButton");
  var isValidNumber =
    numberOfTeamsSubmitted > 0 && numberOfTeamsSubmitted <= 32;

  if (!isValidNumber) {
    alert("Please enter a valid number of teams (1-32).");
    return;
  }

  processButton.style.display = "inline-block";
  submitButton.disabled = true;
  numberOfTeamsInput.disabled = true;
  numberOfTeams = numberOfTeamsSubmitted;
  createTeamFields();
}

function createTeamFields() {
  var numberOfTeams = parseInt(document.getElementById("numberOfTeams").value);
  var teamContainer = document.getElementById("teamFieldsContainer");
  container.innerHTML = "";

  for (var i = 0; i < numberOfTeams; i++) {
    var teamDiv = document.createElement("div");

    var teamLabel = document.createElement("label");
    teamLabel.textContent = "Team " + (i + 1) + " Name:";

    var teamInput = document.createElement("input");
    teamInput.type = "text";
    teamInput.name = "teamName";
    teamInput.id = "teamName" + i;
    teamInput.value = i + 1; // create value for testing, so i don't have to always enter manually. Delete if not used anymore

    var playerDiv = document.createElement("div");

    var player1Label = document.createElement("label");
    player1Label.textContent = "Player 1 Name:";

    var player1Input = document.createElement("input");
    player1Input.type = "text";
    player1Input.name = "playerName";
    player1Input.id = "player1Name" + i;
    player1Input.value = i + 1 + "1"; // create value for testing, so i don't have to always enter manually. Delete if not used anymore

    var player2Label = document.createElement("label");
    player2Label.textContent = "Player 2 Name:";

    var player2Input = document.createElement("input");
    player2Input.type = "text";
    player2Input.name = "playerName";
    player2Input.id = "player2Name" + i;
    player2Input.value = i + 1 + "2"; // create value for testing, so i don't have to always enter manually. Delete if not used anymore

    teamDiv.appendChild(teamLabel);
    teamDiv.appendChild(teamInput);

    playerDiv.appendChild(player1Label);
    playerDiv.appendChild(player1Input);
    playerDiv.appendChild(player2Label);
    playerDiv.appendChild(player2Input);

    teamContainer.appendChild(teamDiv);
    teamContainer.appendChild(playerDiv);

    if (i < numberOfTeams - 1) {
      teamContainer.appendChild(document.createElement("br"));
    }
  }

  toggleProcessButton();
}

function toggleProcessButton() {
  var numberOfTeams = parseInt(document.getElementById("numberOfTeams").value);
  var processButton = document.getElementById("processButton");

  if (numberOfTeams > 0) {
    processButton.style.display = "inline-block";
  } else {
    processButton.style.display = "none";
  }
}

function processForm() {
  var numberOfTeams = parseInt(document.getElementById("numberOfTeams").value);

  for (var i = 0; i < numberOfTeams; i++) {
    var teamName = document.getElementById("teamName" + i).value;
    var player1Name = document.getElementById("player1Name" + i).value;
    var player2Name = document.getElementById("player2Name" + i).value;

    var team = {
      teamName: teamName,
      player1Name: player1Name,
      player2Name: player2Name,
      gamesPlayed: 0,
      totalScore: 0,
      player1Group: null,
      player2Group: null,
    };

    teams.push(team);
  }

  console.log("Submitted Teams: ", teams);
  matchMaker(teams);

  processButton.disabled = true;
}

function clearPage() {
  document.getElementById("numberOfTeams").value = "";
  document.getElementById("teamFieldsContainer").innerHTML = "";
  document.getElementById("processButton").style.display = "none";
  submitButton.disabled = false;
  numberOfTeamsInput.disabled = false;
  processButton.disabled = false;
}

function matchMaker(teams) {
  var numberOfMatchesPerRound = Math.ceil((numberOfTeams * 2) / 4);
  var playerArray = [];
  var group = Array.from({ length: numberOfMatchesPerRound }, () => []);
  console.log("group array init: ", group);
  console.log("number of Matches per Round: ", numberOfMatchesPerRound);

  // building array of players
  for (var k = 0; k < teams.length; k++) {
    var player1 = {
      playerName: teams[k].player1Name,
      teamName: teams[k].teamName,
    };
    var player2 = {
      playerName: teams[k].player2Name,
      teamName: teams[k].teamName,
    };

    playerArray.push(player1);
    playerArray.push(player2);
  }

  console.log("playerArray: ", playerArray);

  // putting random player into groups - starting with 1
  var emergencyExit = 0;
  while (playerArray.length > 0) {
    console.log("-----------------------------------------------------");
    if (emergencyExit == 100) {
      return;
    }
    for (var j = 0; j < numberOfMatchesPerRound; j++) {
      if (playerArray.length == 0 || emergencyExit == 100) {
        continue;
      } else {
        var randIndex = getRandomInt(playerArray.length);
        console.log("Grabing this Player: ", playerArray[randIndex]);
        console.log("and opening Group ", randIndex, " to put Player in");
        var hasTeamMate = group[j].some(
          (teamName) => teamName.teamName === playerArray[randIndex].teamName
        );

        console.log(
          "is someone from his team already in this group? - ",
          hasTeamMate
        );
        console.log("player is: ", playerArray[randIndex]);

        if (!hasTeamMate) {
          group[j].push(playerArray[randIndex]);
          console.log(
            "putting player: ",
            playerArray[randIndex],
            " into group: ",
            group[j],
            " and removing him from playerArray"
          );
          playerArray.splice(randIndex, 1);
          console.log("Number of players left in Array: ", playerArray.length);
        } else {
          emergencyExit++;
          console.log("counter for Emergency Exit: ", emergencyExit);
          continue;
          // playerArray.splice(randIndex, 1);
        }
      }
    }
  }
  for (var l = 0; l < group.length; l++) {
    console.log("group ", l + 1, ": ", group[l]);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createGroupContainer(groupArray) {
  var groupDisplayContainer = document.getElementById("groupContainer");
  groupDisplayContainer.innerHTML = "";

  for (var i = 0; i < groupArray.length; i++) {}
}
