/* RESOURCES.html */
class Die {
	constructor(sides, numOf, mod) {
		this.sides = sides;
		this.numOf = numOf;
		this.mod = mod;
	}
	
	rollSelf() {
		let result = 0, each = 0, eachResult = new Array(this.numOf);
		for (let i = 0; i < this.numOf; i++) {
			each = (Math.floor(Math.random() * this.sides)) + 1;
			eachResult[i] = each;
			result += each;
		}
		
		result += this.mod;
		eachResult.push(result);
		return eachResult;
	}
}

function showTable(ev, tableName) {
	let i, tableDiv, activeButton;

	// Set all switchables hidden
	tableDiv = document.getElementsByClassName("switchable");
	for (i = 0; i < tableDiv.length; i++) {
		tableDiv[i].style.display = "none";
	}

	// Remove 'selected' from current button
	activeButton = document.getElementsByClassName("minibar-button");
	for (i = 0; i < activeButton.length; i++) {
		activeButton[i].className = activeButton[i].className.replace(" selected", "");
	}

	// Show correct switchable and make current selected
	document.getElementById(tableName).style.display = "block";
	ev.currentTarget.className += " selected";
}

function filterClassesById(els, identifier) {
	for (let x = 0; x < els.length; x++) {
	if (els[x].id === identifier)
		return els[x];
	}
	
	return null;
}

function rollDice() {
	const resultColumn = document.getElementsByClassName("result");
	let i, el;
	
	// Assign dice
	let dice = [
		null, // d2
		null, // d4
		null, // d6
		null, // d8
		null, // d10
		null, // d12
		null, // d20
		null  // d100
	];
	
	let x = 0;
	for (i = 2; i <= 100; i = i + 2) {
		if (i > 12 && i !== 20 && i !== 100) {
			continue;
		}
		
		const sides = i;
		const numOf = (document.getElementsByClassName("die-num d" + i)[0]).value || 1;
		const mod = document.getElementsByClassName("die-mod d" + i)[0].value || 0;
		dice[x] = new Die(sides, numOf, mod);
		x++;
	}
	
	// Append results
	for (i = 0; i < dice.length; i++) {
		let id = "d" + dice[i].sides;
		let h = dice[i].rollSelf();
		el = filterClassesById(resultColumn, id);
		el.innerHTML = "Total: " + h[h.length - 1] 
		if (h.length > 1) {
			el += "<br />Each roll: " + h.slice(0, -1);
		}
	}
}