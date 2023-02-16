<?php

if ( class_exists( 'QuadLayers\\WP_Plugin_Table_Links\\Load' ) ) {
	new \QuadLayers\WP_Plugin_Table_Links\Load(
		QLXXX_PLUGIN_FILE,
		array(
			array(
				'text' => esc_html__( 'Support', 'plugin-init' ),
				'url'  => QLXXX_SUPPORT_URL,
			),
			array(
				'text' => esc_html__( 'Premium', 'plugin-init' ),
				'url'  => QLXXX_PURCHASE_URL,
			),
			array(
				'place' => 'row_meta',
				'text'  => esc_html__( 'Support', 'plugin-init' ),
				'url'   => QLXXX_SUPPORT_URL,
			),
			array(
				'place' => 'row_meta',
				'text'  => esc_html__( 'Premium', 'plugin-init' ),
				'url'   => QLXXX_PURCHASE_URL,
			),
		)
	);
}
