var submitButton = document.querySelector(
  "button[onclick='submitNumberOfTeams()']"
);
var numberOfTeamsInput = document.getElementById("numberOfTeams");

function submitNumberOfTeams() {
  var numberOfTeams = parseInt(numberOfTeamsInput.value);
  var processButton = document.getElementById("processButton");

  if (numberOfTeams > 0 && numberOfTeams <= 32) {
    processButton.style.display = "inline-block";
    submitButton.disabled = true;
    createTeamFields();
  } else {
    processButton.style.display = "none";
    submitButton.disabled = false; // Re-enable the submit button
    alert("Please enter a valid number of teams (1-32).");
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    submitNumberOfTeams();
  }
}

numberOfTeamsInput.addEventListener("keypress", handleKeyPress);

function createTeamFields() {
  var numberOfTeams = parseInt(document.getElementById("numberOfTeams").value);
  var container = document.getElementById("teamFieldsContainer");
  container.innerHTML = ""; // Clear any existing fields

  for (var i = 0; i < numberOfTeams; i++) {
    var teamDiv = document.createElement("div");

    var teamLabel = document.createElement("label");
    teamLabel.textContent = "Team " + (i + 1) + " Name:";

    var teamInput = document.createElement("input");
    teamInput.type = "text";
    teamInput.name = "teamName";
    teamInput.id = "teamName" + i; // Unique ID for team name input

    var playerDiv = document.createElement("div"); // Create a div for player input fields

    var player1Label = document.createElement("label");
    player1Label.textContent = "Player 1 Name:";

    var player1Input = document.createElement("input");
    player1Input.type = "text";
    player1Input.name = "playerName";
    player1Input.id = "player1Name" + i; // Unique ID for player 1 name input

    var player2Label = document.createElement("label");
    player2Label.textContent = "Player 2 Name:";

    var player2Input = document.createElement("input");
    player2Input.type = "text";
    player2Input.name = "playerName";
    player2Input.id = "player2Name" + i; // Unique ID for player 2 name input

    teamDiv.appendChild(teamLabel);
    teamDiv.appendChild(teamInput);

    playerDiv.appendChild(player1Label);
    playerDiv.appendChild(player1Input);
    playerDiv.appendChild(player2Label);
    playerDiv.appendChild(player2Input);

    container.appendChild(teamDiv);
    container.appendChild(playerDiv);

    if (i < numberOfTeams - 1) {
      container.appendChild(document.createElement("br")); // Add a blank line
    }
  }

  toggleProcessButton(); // Call the function to show/hide the button
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

// Example function to access and process the values
function processForm() {
  var numberOfTeams = parseInt(document.getElementById("numberOfTeams").value);

  for (var i = 0; i < numberOfTeams; i++) {
    var teamName = document.getElementById("teamName" + i).value;
    var player1Name = document.getElementById("player1Name" + i).value;
    var player2Name = document.getElementById("player2Name" + i).value;

    // Perform logic or processing with the values
    console.log("Team Name:", teamName);
    console.log("Player 1 Name:", player1Name);
    console.log("Player 2 Name:", player2Name);
  }
}

function clearPage() {
  document.getElementById("numberOfTeams").value = "";
  document.getElementById("teamFieldsContainer").innerHTML = "";
  document.getElementById("processButton").style.display = "none";
  submitButton.disabled = false;
}
