$(document).ready(function () {
	/*
	ФИКСИКИ МОДАЛЬНЫХ ФОРМ
	-решают проблему перезагрузки страниц при
	-отправки формы
	*/
	$('#signin_form').submit(function (e) {
		e.preventDefault();

		
		$('#signin_modal').modal('hide');
	})
	$('#signup_form').submit(function (e) {
		e.preventDefault();

		$('#signup_form').modal('hide');
	})
});
