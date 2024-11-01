jQuery(document).ready(function($) {

	//run if insertion divs exist
	if ($('.tutor_pricing_form').length>0) {
		
		//extract localized vars
		var stylePath=$.parseJSON(tutor_pricing_var.stylePath);

		//load stylesheet
		var cssId = 'tutor_pricing_css';
		if (!document.getElementById(cssId)) {
		    var head  = document.getElementsByTagName('head')[0];
		    var stylelink  = document.createElement('link');
		    stylelink.id   = cssId;
		    stylelink.rel  = 'stylesheet';
		    stylelink.type = 'text/css';
		    stylelink.href = stylePath;
		    head.appendChild(stylelink);
		}
		//load fonts
		var cssId = 'tutor_pricing_css_font1';
		if (!document.getElementById(cssId)) {
		    var head  = document.getElementsByTagName('head')[0];
		    var stylelink  = document.createElement('link');
		    stylelink.id   = cssId;
		    stylelink.rel  = 'stylesheet';
		    stylelink.type = 'text/css';
		    stylelink.href = 'https://fonts.googleapis.com/css?family=Oswald';
		    head.appendChild(stylelink);
		}
		var cssId = 'tutor_pricing_css_font2';
		if (!document.getElementById(cssId)) {
		    var head  = document.getElementsByTagName('head')[0];
		    var stylelink  = document.createElement('link');
		    stylelink.id   = cssId;
		    stylelink.rel  = 'stylesheet';
		    stylelink.type = 'text/css';
		    stylelink.href = 'https://fonts.googleapis.com/css?family=Quattrocento';
		    head.appendChild(stylelink);
		}
				
		function populate_calculator_form(zipcode,tech,age,years_exp,cert,highest_ed,confidence) {
			var sel1ed=(highest_ed=="HS" ? ' selected':'');
			var sel2ed=(highest_ed=="Some_BS" ? ' selected':'');
			var sel3ed=(highest_ed=="BS" ? ' selected':'');
			var sel4ed=(highest_ed=="MS" ? ' selected':'');
			var sel5ed=(highest_ed=="PROF" ? ' selected':'');
			var sel1exp=(years_exp=="0" ? ' selected':'');
			var sel2exp=(years_exp=="1" ? ' selected':'');
			var sel3exp=(years_exp=="2" ? ' selected':'');
			var sel4exp=(years_exp=="4" ? ' selected':'');
			var sel5exp=(years_exp=="8" ? ' selected':'');
			var sel1conf=(confidence=="Standard" ? ' selected':'');
			var sel2conf=(confidence=="90" ? ' selected':'');
			var sel3conf=(confidence=="95" ? ' selected':'');
			var sel1tech=(tech=="1" ? ' selected':'');
			var sel2tech=(tech=="0" ? ' selected':'');
			var sel1cert=(cert=="1" ? ' selected':'');
			var sel2cert=(cert=="0" ? ' selected':'');
			var calculator_form=
				'<h2 id="tpw_title">Tutor Pricing Calculator</h2>'+
				'<div id="tpw_description"><p><b>How much are tutors charging near you?</b></div>'+ 
				'<form id="tutor_pricing_input_form" name="tutor_pricing_input_form" method="get" action="">'+
				'<input type="text" name="tpw_zipcode" id="tpw_zipcode" placeholder="Zipcode" value="'+zipcode+'">'+
				'<p class="tpw_form_details_toggle">More Details+</p>'+
				'<div class="tpw_form_details">'+
				'<select name="tpw_highest_ed" id="tpw_highest_ed">'+
				'<option value="">Tutor\'s Highest Level of Education</option>'+
				'<option value="HS"'+sel1ed+'>High School</option>'+
				'<option value="Some_BS"'+sel2ed+'>Some Bachelor\'s</option>'+
				'<option value="BS"'+sel3ed+'>Bachelor\'s</option>'+
				'<option value="MS"'+sel4ed+'>Master\'s</option>'+
				'<option value="PROF"'+sel5ed+'>PhD, MD, or JD</option>'+
				'</select>'+
				'<select name="tpw_years_exp" id="tpw_years_exp">'+
				'<option value="">Years of Tutoring Experience</option>'+
				'<option value="0"'+sel1exp+'>0</option>'+
				'<option value="1"'+sel2exp+'>1</option>'+
				'<option value="2"'+sel3exp+'>2</option>'+
				'<option value="4"'+sel4exp+'>4</option>'+
				'<option value="8"'+sel5exp+'>8</option>'+
				'</select>'+
				'<select name="tpw_tech" id="tpw_tech">'+
				'<option value="">Subjects Offered</option>'+
				'<option value="1"'+sel1tech+'>Math and Science</option>'+
				'<option value="0"'+sel2tech+'>Non-Technical Only</option>'+
				'</select>'+
				'<select name="tpw_cert" id="tpw_cert">'+
				'<option value="">Certified</option>'+
				'<option value="1"'+sel1cert+'>Yes</option>'+
				'<option value="0"'+sel2cert+'>No</option>'+
				'</select>'+
				'<input type="text" name="tpw_age" id="tpw_age" placeholder="Tutor Age" value="'+age+'">'+
				'<select name="tpw_confidence" id="tpw_confidence">'+
				'<option value="">Confidence Interval</option>'+
				'<option value="Standard"'+sel1conf+'>Standard</option>'+
				'<option value="90"'+sel2conf+'>90%</option>'+
				'<option value="95"'+sel3conf+'>95%</option>'+
				'</select>'+
				'</div>'+
				'<p class="tpw_form_details_toggle_off">Less Details-</p>'+
				'<input type="submit" class="tpw_submit_form call_to_action" name="tpw_submit_form" id="tpw_submit_form" value="Calculate">'+
				'<div class="tpw_knowro_signature"><a href="https://www.theknowledgeroundtable.com/">Powered by <img src="https://www.theknowledgeroundtable.com/wp-content/themes/intuition/images/KR-logo-web-compact.png" height="20" alt="Knowledge Roundtable | Free Tutoring Marketplace"></a></div>'+
				'</form>';
			return calculator_form;
		}	

		var zipcode='';
		var tech='';
		var age='';
		var years_exp='';
		var cert='';
		var highest_ed='';
		var confidence='';
		var calculator_form=populate_calculator_form(zipcode,tech,age,years_exp,cert,highest_ed,confidence);
		$('.tutor_pricing_form').append(calculator_form);

		$('.tutor_pricing_form').on("click",".tpw_form_details_toggle",function(e){
			var tpw_index=$('.tutor_pricing_form').index($(this).parent().parent());
			$('.tutor_pricing_form').eq(tpw_index).find('.tpw_form_details').toggle();
			$('.tutor_pricing_form').eq(tpw_index).find('.tpw_form_details_toggle').toggle();
			$('.tutor_pricing_form').eq(tpw_index).find('.tpw_form_details_toggle_off').toggle();
		});
		$('.tutor_pricing_form').on("click",".tpw_form_details_toggle_off",function(e){
			var tpw_index=$('.tutor_pricing_form').index($(this).parent().parent());
			$('.tutor_pricing_form').eq(tpw_index).find('.tpw_form_details').toggle();
			$('.tutor_pricing_form').eq(tpw_index).find('.tpw_form_details_toggle').toggle();
			$('.tutor_pricing_form').eq(tpw_index).find('.tpw_form_details_toggle_off').toggle();
		});
		
		$('.tutor_pricing_form').on("click","#tpw_submit_form",function(e){
			var tpw_index=$('.tutor_pricing_form').index($(this).parent().parent());
			e.preventDefault();

			var params = {};
			params['zipcode'] = $('.tutor_pricing_form').eq(tpw_index).find('#tpw_zipcode').val();
			params['tech'] = $('.tutor_pricing_form').eq(tpw_index).find('#tpw_tech').val();
			params['age'] = $('.tutor_pricing_form').eq(tpw_index).find('#tpw_age').val();
			params['years_exp'] = $('.tutor_pricing_form').eq(tpw_index).find('#tpw_years_exp').val();
			params['cert'] = $('.tutor_pricing_form').eq(tpw_index).find('#tpw_cert').val();
			params['highest_ed'] = $('.tutor_pricing_form').eq(tpw_index).find('#tpw_highest_ed').val();
			params['confidence'] = $('.tutor_pricing_form').eq(tpw_index).find('#tpw_confidence').val();
			$.ajax({
				url: "https://www.theknowledgeroundtable.com/api/tutor-pricing/results.php",
				jsonp: "callback",
				dataType: "jsonp",
				data: params,
				success: function( results ) {

					if(results['results']!==false) {
						var expectation=results['results']['expectation'];
						var ci_lower=results['results']['confidence_interval']['lower'];
						var ci_upper=results['results']['confidence_interval']['upper'];
						var result_text='<div class="tpw_result_container"><div class="tpw_expectation">$'+expectation+'</div><img class="tpw_pricing_range" src="https://www.theknowledgeroundtable.com/images/tutor_pricing_range.png"><div class="tpw_range_container"><div class="tpw_ci_lower">$'+ci_lower+'</div><div class="tpw_typical">Typical</div><div class="tpw_ci_upper">$'+ci_upper+'</div><div style="clear:both;"></div></div></div>';
						
					} else { //error
						var result_text='<div class="tpw_result_container">There was an error.</div>';
					}
						
					if($('.tutor_pricing_form').eq(tpw_index).find('.tpw_result_container').length){
						$('.tutor_pricing_form').eq(tpw_index).find('.tpw_result_container').replaceWith(result_text);
					} else {
						$('.tutor_pricing_form').eq(tpw_index).find('#tpw_description').after(result_text);
					}
						
				}, 
				error: function(XHR, textStatus, errorThrown) {
					console.log("Error: " + textStatus);
					console.log("Error: " + errorThrown);
					console.log(XHR.responseJSON);
				}
			});
		});
	}
});