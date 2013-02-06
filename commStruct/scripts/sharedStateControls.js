
/* Remove Genralised value system
	- listName : target shared list variable name (int ommited)
	- targetElement : Element number to remove from list */
	function removeItemFromSharedList(listName,targetElement){
		var noItems, i, j;
		noItems = gapi.hangout.data.getValue(listName) || "0";										// get the list length
		j = targetElement;	
		for ( i = targetElement; i < noItems; i++) {
			j++;																					// j in loop always is i + 1
			gapi.hangout.data.setValue(listName + i, gapi.hangout.data.getValue(listName + j));		// save data in pos j into i
		}
		gapi.hangout.data.clearValue(listName + j);													// removes top variable holder
		gapi.hangout.data.setValue(listName, (parseInt(noItems, 10) - 1).toString());				// saves list length -1 to shared state
	};
	
	/* Remove Genralised value system
	- listName : target shared list variable name (int ommited)
	- targetLocation : Element number to remove from list
	- entryValue OPTIONAL : value to save in new list element */
	function addNewItemToSharedList (listName,targetLocation,entryValue){	
		var noItems, i, j;
		noItems = gapi.hangout.data.getValue(listName) || "0"; 									// get current number of list items
		noItems = (parseInt(noItems, 10) + 1).toString();                						// add 1 to value and convert to string 
		gapi.hangout.data.setValue(listName, noItems);											// Commits new item value
		j = noItems;
		for ( i = noItems; i > targetLocation; i--) {											// loop down moving element values up
			j--;																				// j in loop always is i + 1
			gapi.hangout.data.setValue(listName + i, gapi.hangout.data.getValue(listName + j));	// save data in pos j into i
		}
		//if(!entryValue){ var entryValue = "List item " + targetLocation;};						// TESTING if no Value to enter, defult to blank
		if(!entryValue){ var entryValue = "";};						
		gapi.hangout.data.setValue(listName + targetLocation, entryValue); 						// create textvalue for list item					
		console.log("LIST OBJECT " + noItems + " Created with value ");
	};