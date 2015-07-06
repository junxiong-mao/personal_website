$.ajax({
	url: "http://ip-api.com/json",
	dataType: 'JSON',
	success: function(result) {
		if (result.status) {
			$('.visit-ip').text(result.query);
			$('.visit-country').text(result.country);
			$('.visit-city').text(result.city);
			$('.visit-org').text(result.org);
		} else {
			var text = 'unknown';
			$('.visit-ip').text(unknown);
			$('.visit-country').text(unknown);
			$('.visit-city').text(unknown);
			$('.visit-org').text(unknown);
		}
	}
})