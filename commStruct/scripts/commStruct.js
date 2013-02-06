(function (window) {	
  "use strict";	
  	
  function commStruct() {	
    console.log("Starting...");	
    gapi.hangout.onApiReady.add(this.onApiReady.bind(this));
  }	
    //-------------------- VARS -------------------------	
		var totalTime;		// glabal var - how long user has been connected
		var SpeakTime;		// global var - how long user has spoken for total
		var userData;		// global object - hold all keey users data. to be updated regularly
		var userDataPos;	// golbal var - marks the position that the local users data is stored in "userData"		
		var refreshUserList = 1000; // refresh rate of main display
 
	//-------------------- Listeners -------------------------
 
	// start of script setup
	commStruct.prototype.onApiReady = function (event) {	
		if (event.isApiReady === true) {			// on ready
			console.log("API Ready");	
	  
			
		startSystem();
		console.log("list");
		listUsers();							// list users
		}	
		totalTime = 1;
		

		//var tTimer = setInterval(function() {userTimer()},1000);			// setup connection timer
		
		//var uTimer = setInterval(function() {updateTimer()},1000);			// setup update timer

		var dTimer = setInterval(function() {listUsers()},refreshUserList);	// setup refresh rate of user display
  };	
  	
	//-------------------- Functions -------------------------
 	
	// on new user joining - refresh display
	function startSystem(){
		console.log("user data initilisation");	
		var newUser = { };															// create new user data object
		newUser.id = gapi.hangout.getLocalParticipantId();							// fill with data
		newUser.name = gapi.hangout.getLocalParticipant().person.displayName;
		newUser.hasMic = gapi.hangout.getLocalParticipant().person.hasMicrophone;
		newUser.connectionLength = "1";
		newUser.commLength = "0";
		userDataPos = addNewItemToSharedList("userData",-1,JSON.stringify(newUser));
		console.log("user data complete");
	};	
  	
	// display list of partisipants with relivant time stats
	function listUsers() {	
		var div, ul, tr, i, l, e1, e2, e3;		
		ul = document.createElement("table");	
		l = userData.users.length;
		for (i = 0; i < l; i++) {						// loop through all users in data array and display in table format
			tr = document.createElement("tr");
			e1 = document.createElement("td");	
			e1.innerHTML = userData.users[i].name;
			tr.appendChild(e1);
			e2 = document.createElement("td");	
			e2.innerHTML = displayTimerString(userData.users[i].connectionLength);
			tr.appendChild(e2);
			e3 = document.createElement("td");	
			e3.innerHTML = displayTimerString(userData.users[i].commLength);
			tr.appendChild(e3);
			ul.appendChild(tr);	
		}	
		div = document.getElementById("userList");
		div.innerHTML = "";		
		div.appendChild(ul);	
		console.log("Displayed"); 
  };
  
	/* Displays an enterd second count in time format
	- rawTime : number of seconds
	- return : string "00:00:00" format */
	function displayTimerString(rawTime){
		var hours, minutes, seconds;
		hours = parseInt(rawTime / 3600);				// Mod to get hours
		rawTime %= 3600;								// get remaineder
		minutes = parseInt(rawTime / 60);				// Mod to get mins
		rawTime %= 60;									// get remainder
		seconds = rawTime;								// remainder = secs
		if (seconds < 10) { seconds = "0" + seconds;};	// add leading 0s
		if (minutes < 10) { minutes = "0" + minutes;};
		if (hours < 10) { hours = "0" + hours;};
		
		
		return hours + ":" + minutes + ":" + seconds;	// return in time format string
	}
  
	// timer function called on interval incrimenting counter each time
	function userTimer() {
		totalTime = totalTime + 1 ;
	}
	
	// sends updates from local user to shared state
	function updateTimer() {
		var userDataString = gapi.hangout.data.getValue("userData");
		userData = eval( "(" + userDataString + ")");						// convert to JS object
		console.log(userData);
		userData.users[userDataPos].connectionLength = totalTime;
		gapi.hangout.data.setValue("userData" , JSON.stringify(userData));	// return JSON string of object
	}
	
  	
  var commStruct = new commStruct();	
}(window));