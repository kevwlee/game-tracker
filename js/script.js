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
  teamContainer.innerHTML = "";

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
  document.getElementById("groupDisplayContainer").innerHTML = "";
  document.getElementById("processButton").style.display = "none";

  submitButton.disabled = false;
  numberOfTeamsInput.disabled = false;
  processButton.disabled = false;
  teams = [];
}

function matchMaker(teams) {
  var numGroups = Math.ceil((numberOfTeams * 2) / 4);
  var allPlayers = [];
  var backupPlayerArray = [];
  var currentGroupToFillIndex = 0;
  var groups = Array.from({ length: numGroups }, () => []);
  console.log("group array init: ", groups);
  console.log("number of groups: ", numGroups);

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

    allPlayers.push(player1);
    allPlayers.push(player2);
  }

  backupPlayerArray = [...allPlayers];

  console.log("allPlayers: ", allPlayers.length);
  console.log("backupPlayerArray: ", backupPlayerArray);

  // putting random player into groups - starting with 1
  let limitTracker = -1;
  const limit = allPlayers.length * numGroups;

  while (allPlayers.length > 0) {
    limitTracker++;

    if (currentGroupToFillIndex >= numGroups) {
      currentGroupToFillIndex = 0;
    }
    const currentGroup = groups[currentGroupToFillIndex];

    if (currentGroup.length < 4) {
      // if the latest created group has less than maxPlayersPerGroup
      // add a Player to latest created Group
      const randomPlayerIndex = Math.floor(Math.random() * allPlayers.length);
      const { teamName, name } = allPlayers[randomPlayerIndex];
      const hasGroupThisPlayerWithThisTeamName = !!currentGroup.find(
        (player) => {
          return player.teamName === teamName;
        }
      );

      if (hasGroupThisPlayerWithThisTeamName) {
        if (limitTracker >= limit) {
          // we're in an infinite loop – log relevant info for debugging and break out of it!
          console.log(
            `::hasGroupThisPlayerWithThisTeamName::
          teamId: "${teamName}"
          name: "${name}"
          `,
            allPlayers
          );
          //        break;
          allPlayers = [...backupPlayerArray];
          groups = [...new Array(numGroups)].map((i) => []);
          limitTracker = -1;
          console.log(
            "----------------erasing variables to start from scratch-----------------"
          );
        }

        continue;
      }

      const [randomPlayer] = allPlayers.splice(randomPlayerIndex, 1);
      currentGroup.push(randomPlayer);
    }

    currentGroupToFillIndex++;
  }
  createGroupContainer(groups);
  backupPlayerArray = [];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createGroupContainer(groupArray) {
  console.log("Creating Space for the Groups...");
  var groupDisplayContainer = document.getElementById("groupDisplayContainer");
  groupDisplayContainer.innerHTML = "";

  console.log("entering loop for creating the lists...");
  for (var i = 0; i < groupArray.length; i++) {
    console.log("creating DIV for Group ", i + 1);
    var groupDiv = document.createElement("div");
    groupDiv.classList.add("group-container");

    var groupLabel = document.createElement("label");
    groupLabel.textContent = "Group " + (i + 1) + ":";

    var groupList = document.createElement("ul");
    console.log("creating list Items...");

    for (var j = 0; j < groupArray[i].length; j++) {
      console.log("Picking following Player: ", groupArray[i][j].playerName);
      var player = document.createElement("li");
      player.innerHTML =
        groupArray[i][j].playerName +
        " (Team: " +
        groupArray[i][j].teamName +
        ")";
      console.log("appending player: ", player);
      groupList.appendChild(player);
    }

    console.log("List for this group looks like this: ", groupList);
    console.log("creating of group List done. Appending child");

    groupDiv.appendChild(groupLabel);
    groupDiv.appendChild(groupList);
    groupDisplayContainer.appendChild(groupDiv);
  }
}
