// Handle single checkbox
uiCheckboxesCheck = function (checkbox){
	if($(checkbox).prop('checked')) { 
		$(checkbox).parent().addClass("checked");
	}
	else {
		$(checkbox).parent().removeClass("checked");
	}
};

uiCheckboxesInit=function(scope){
	scope.find('.checkbox input[type="checkbox"]').each(function(){ //finding all checkboxes
		uiCheckboxesCheck($(this));//run function to see if checkboxes are checked or not
		$(this).change(function(){ //for each time checkbox is changed rerun function
			uiCheckboxesCheck($(this));
		});
	});
};

uiInit=function(scope){ //runs functions on body;
	uiCheckboxesInit(scope);
};

$(document).ready(function() {
	uiInit($('body'));
});