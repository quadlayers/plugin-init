<?php

namespace QuadLayers\WP_Notice_Plugin_Required;

if ( class_exists( 'QuadLayers\\WP_Notice_Plugin_Required\\Load' ) ) {
	new \QuadLayers\WP_Notice_Plugin_Required\Load(
		QLXXX_PLUGIN_NAME,
		array(
			array(
				'slug' => 'woocommerce',
				'name' => 'WooCommerce',
			),
			array(
				'slug' => 'emailoctopus',
				'name' => 'Email Marketing by EmailOctopus',
			),
		)
	);
}
