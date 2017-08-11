'use strict';

$("select").change(function(event){
    event.preventDefault();
    createFilters();
});


function resetForm() {
 	console.log('resetting ...');
    $('#energy_level').prop('selectedIndex', 2);
}

function createFilters() {

	let energy = $( "#energy_level" ).val();
	let sex = $( "#sex" ).val();
	let size = $( "#size" ).val();
	
	let filterObj = {
		energy: energy,
		sex: sex, 
		size: size
	};

	let filters = [energy, sex, size];

	let activeFilters = [];

	for (let i = 0; i < filters.length; i++ ) {
		if (filters[i]) {
			activeFilters.push(filters[i]);
		};
	}

	console.log("Active", activeFilters);

	filterResults(filterObj, activeFilters);
}

function filterResults(filterObj, activeFilters) {

	let table = $("#dog-table");
	let tr = $("tr");

	for (let i = 1; i < tr.length; i++) {

		let energy_td = tr[i].getElementsByTagName("td")[2];
		let sex_td = tr[i].getElementsByTagName("td")[3];
		let size_td = tr[i].getElementsByTagName("td")[4];

		let numMatchFilters = 0;

		console.log(energy_td);

		if (energy_td) { 
			if (filterObj.energy === energy_td.innerHTML) {
				// energy_td.attr('class', 'active' );
				numMatchFilters++;
			}
		}

		if (sex_td) {
			if (filterObj.sex === sex_td.innerHTML) {
				// sex_td.attr('class', 'active' );
				numMatchFilters++;
			}
		}

		if (size_td) {
			if (filterObj.size === size_td.innerHTML) {
				// size_td.attr('class', 'active' );
				numMatchFilters++;
			}
		}
		console.log('match filter number', numMatchFilters);
		console.log('match filter number', activeFilters.length);

		if (numMatchFilters === activeFilters.length) {
		    tr[i].style.display = "";
		} else {
		    tr[i].style.display = "none";
		};
	}

	// ********* Working sort for one filter
	// let input = $( "#energy_level").val();
	// console.log(input);
	// let filter = input.toUpperCase();

	// let table = $("#dog-table");
	// let tr = $("tr");

	// for (let i = 0; i < tr.length; i++) {
	// let td = tr[i].getElementsByTagName("td")[2];
	// console.log(td);
	// if (td) {
	// 	if (td.innerHTML.toUpperCase() === filter) {
	// 	    tr[i].style.display = "";
	// 	  } else {
	// 	    tr[i].style.display = "none";
	// 	  }
	// 	} 
	// }

};