
$(document).ready(function() {
	let dob = $('#dob').html();

	let dobFormat = $.format.date(dob, "dd/MM/yyyy");

	$('#dob').html(dobFormat);


	function calculateBday() {
		dob = new Date(dob);

		var today = new Date();
		var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
		$('#age').html(age+' year old');
	}

	calculateBday();

});
