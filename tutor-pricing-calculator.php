<?php
/*
Plugin Name: Tutor Pricing Calculator
Plugin URI: https://www.theknowledgeroundtable.com/tutor-pricing-calculator-wordpress-plugin/
Description: How much do tutors charge near you? This app will answer that question for you and all your site visitors. An econometric regression model trained on data from thousands of tutors works behind the scenes to deliver custom pricing info based on user location and a small number of user inputs. The model was codeveloped by Jared Rand, founder of The Knowledge Roundtable, Tyler Hansen, PhD candidate in Economics at UMass Amherst, and David Krevitt of WithCoach.com.  
Author: The Knowledge Roundtable
Version: 1.0
Author URI: https://www.theknowledgeroundtable.com
*/

add_action( 'admin_menu', 'add_tutor_pricing_calculator_menu' );
function add_tutor_pricing_calculator_menu() {
	add_options_page( 'Tutor Calculator', 'Tutor Calculator', 'manage_options', 'tutor_pricing', 'tutor_pricing_plugin_page');
}
function tutor_pricing_plugin_page() {
	?>
	<div class="wrap">
	<h2>Tutor Pricing Calculator</h2>
	<p><b>How much do tutors charge near you? This app will answer that question for you and all your site visitors.</b></p>
	<p>An econometric regression model trained on data from thousands of tutors works behind the scenes to deliver custom pricing info based on user location and a small number of user inputs.</p>
	<p>The model was codeveloped by <a href="https://www.theknowledgeroundtable.com/tutors/jared-rand/">Jared Rand</a>, founder of The Knowledge Roundtable, <a href="https://www.linkedin.com/in/tyler-hansen-b6087726">Tyler Hansen</a>, PhD candidate in Economics at UMass Amherst, and <a href="https://dkrevitt.withcoach.com/">David Krevitt</a> of WithCoach.com.</p>
	<h3>Shortcode</h3>
	<p><strong>[tutor_pricing_calculator]</strong> - Use this shortcode in posts, pages, or widgets to display the simple interactive form.</p>
	<h3>Widget</h3>
	<p>The <strong>Tutor Pricing Widget</strong> adds the simple interactive form to your sidebar or other widget areas.</p>
	</div>
	<?
}
//Shortcode
function tutor_pricing_calculator_shortcode() {
	wp_enqueue_script( 'tutor_pricing_render', plugins_url().'/tutor-pricing-calculator/js/tutor_pricing_form_render.js', array('jquery') );
	$stylePath=plugins_url().'/tutor-pricing-calculator/css/tutor_pricing_calculator_default.css';
	wp_localize_script( 
		'tutor_pricing_render', 
		'tutor_pricing_var',
		array( 'stylePath' => json_encode($stylePath) ) 
	);
	$container='<div class="tutor_pricing_form" id="tutor_pricing_form_shortcode"></div>';
	return $container;
}
add_shortcode( 'tutor_pricing_calculator', 'tutor_pricing_calculator_shortcode' );

//Widget
class tutor_pricing_widget extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	function __construct() {
		parent::__construct(
			'tutor_pricing_widget', // Base ID
			'Tutor Pricing Widget', // Name
			array( 'description' => 'Add a tutor pricing interactive form.' ) // Args
		);
	}

	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget() {
		wp_enqueue_script( 'tutor_pricing_render', plugins_url().'/tutor-pricing-calculator/js/tutor_pricing_form_render.js', array('jquery') );
		$stylePath=plugins_url().'/tutor-pricing-calculator/css/tutor_pricing_calculator_default.css';
		wp_localize_script( 
			'tutor_pricing_render', 
			'tutor_pricing_var',
			array( 'stylePath' => json_encode($stylePath) ) 
		);
		$container='<div class="sidebar_widget"><div class="tutor_pricing_form" id="tutor_pricing_form_widget"></div></div>';
		echo $container;
	}

	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form() {

	}

	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update() {
	}

}
add_action('widgets_init',
     create_function('', 'return register_widget("tutor_pricing_widget");')
);
?>