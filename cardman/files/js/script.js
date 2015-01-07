(function(window,$,_) {

	var _data;

	$(document).on("ready",function(){

		ManageSystem();

		return false;

	});

	/* =======================================================================
	ManageSystem
	========================================================================== */
	function ManageSystem() {

		/* =======================================================================
		Constructer
		========================================================================== */
		(function() {

			load();

			$("#list").fadeIn(600);

			rentCard();
			returnCard();

		})();

		/* =======================================================================
		Rent Card
		========================================================================== */
		function rentCard() {

		    $(".alloc-stock").on("click", function() {

		    	alert("Pasmoを借りますか？");

		    	$(this).find("form").submit();
	    	
	    	});

			return false;

		}

		/* =======================================================================
		Return Card
		========================================================================== */
		function returnCard() {


	    	$("#dealloc-stock").on("click", function() {

		    	alert("利用中のPasmoを返しますか？");

		    	$(this).find("form").submit();
	    	
	    	});

			return false;

		}

		/* =======================================================================
		Load
		========================================================================== */
		function load(func) {

			$.ajax({

				type     : "GET",
				dataType : "text",
				cache    : false,
				url      : "/stocks/",
				success  : onSuccess,
				error    : onError

			});

			function onSuccess(data) {

				_.test("Load Success");

				_data = JSON.parse(data);

				if (func) func();

				return false;

			}

			function onError() {

				_.test("Load Error");
				return false;

			}

			return false;

		}


		return false;

	}

	return false;


})(window,jQuery,baseJS);
