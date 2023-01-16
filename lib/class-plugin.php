<?php

namespace QuadLayers\PluginInit;

class Plugin {

	protected static $instance;
	protected static $menu_slug = 'plugin-init';

	private function __construct() {
		/**
		 * Admin
		 */
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		/**
		 * Frontend
		 */
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_scripts' ) );
	}

	public function admin_scripts() {

		if ( ! isset( $_GET['page'] ) || $_GET['page'] !== self::get_menu_slug() ) {
			return;
		}

		$backend = include_once QLXXX_PLUGIN_DIR . 'build/backend/js/index.asset.php';
		wp_enqueue_script( 'plugin-init-backend', plugins_url( 'build/backend/js/index.js', QLXXX_PLUGIN_FILE ), $backend['dependencies'], $backend['version'] );
		wp_enqueue_style( 'plugin-init-backend', plugins_url( 'build/backend/css/style.css', QLXXX_PLUGIN_FILE ), array(), QLXXX_PLUGIN_VERSION );
	}

	public function frontend_scripts() {
		$frontend = include_once QLXXX_PLUGIN_DIR . 'build/frontend/js/index.asset.php';
		wp_enqueue_script( 'plugin-init-frontend', plugins_url( 'build/frontend/js/index.js', QLXXX_PLUGIN_FILE ), $frontend['dependencies'], $frontend['version'] );
		wp_enqueue_style( 'plugin-init-frontend', plugins_url( 'build/frontend/css/style.css', QLXXX_PLUGIN_FILE ), array(), QLXXX_PLUGIN_VERSION );

	}

	public static function get_menu_slug() {
		return self::$menu_slug;
	}

	function add_menu() {
		$menu_slug = self::get_menu_slug();
		add_menu_page(
			QLXXX_PLUGIN_NAME,
			QLXXX_PLUGIN_NAME,
			'edit_posts',
			$menu_slug,
			'__return_null',
			// plugins_url( '/assets/backend/img/tiktok-white.svg', QLXXX_PLUGIN_FILE )
		);
		add_submenu_page(
			$menu_slug,
			esc_html__( 'SubPage 1', 'plugin-init' ),
			esc_html__( 'SubPage 1', 'plugin-init' ),
			'edit_posts',
			$menu_slug,
			'__return_null'
		);
		add_submenu_page(
			$menu_slug,
			esc_html__( 'SubPage 2', 'plugin-init' ),
			esc_html__( 'SubPage 2', 'plugin-init' ),
			'manage_options',
			"{$menu_slug}&tab=accounts",
			'__return_null'
		);

	}

	public static function instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

}

/**
 * TODO: ver si es necesario
 */
function PluginInit() {     // phpcs:ignore WordPress.NamingConventions.ValidFunctionName.FunctionNameInvalid
	return Plugin::instance();
}

PluginInit();
