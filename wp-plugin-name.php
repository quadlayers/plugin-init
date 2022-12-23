<?php

/**
 * Plugin Name:       Wp Plugin Name
 * Plugin URI:        https://quadlayers.com/wp-plugin-name
 * Description:       Description WpPluginName
 * Version:           1.0.0
 * Author:            QuadLayers
 * Author URI:        https://quadlayers.com
 * License:           GPLv3
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       wp-plugin-name
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
* 	Definition globals variables
*/

define( 'QLXXX_PLUGIN_NAME', 'Wp Plugin Name' );
define( 'QLXXX_PLUGIN_VERSION', '1.0.0' );
define( 'QLXXX_PLUGIN_FILE', __FILE__ );
define( 'QLXXX_PLUGIN_DIR', __DIR__ . DIRECTORY_SEPARATOR );
define( 'QLXXX_DOMAIN', 'qlXXX' );
define( 'QLXXX_PREFIX', QLXXX_DOMAIN );
define( 'QLXXX_WORDPRESS_URL', 'https://wordpress.org/plugins/wp-tiktok-feed/' );
define( 'QLXXX_REVIEW_URL', 'https://wordpress.org/support/plugin/wp-tiktok-feed/reviews/?filter=5#new-post' );
define( 'QLXXX_DEMO_URL', 'https://quadlayers.com/tiktok-feed/?utm_source=qlttf_admin' );
define( 'QLXXX_PURCHASE_URL', 'https://quadlayers.com/portfolio/tiktok-feed/?utm_source=qlttf_admin' );
define( 'QLXXX_SUPPORT_URL', 'https://quadlayers.com/account/support/?utm_source=qlttf_admin' );
define( 'QLXXX_DOCUMENTATION_URL', 'https://quadlayers.com/documentation/tiktok-feed/?utm_source=qlttf_admin' );
define( 'QLXXX_DOCUMENTATION_API_URL', 'https://quadlayers.com/documentation/tiktok-feed/api/?utm_source=qlttf_admin' );
define( 'QLXXX_DOCUMENTATION_ACCOUNT_URL', 'https://quadlayers.com/documentation/tiktok-feed/account/?utm_source=qlttf_admin' );
define( 'QLXXX_GROUP_URL', 'https://www.facebook.com/groups/quadlayers' );
define( 'QLXXX_DEVELOPER', false );

define( 'QLXXX_PREMIUM_SELL_SLUG', 'wp-plugin-name-pro' );
define( 'QLXXX_PREMIUM_SELL_NAME', 'Plugin Name Pro' );
define( 'QLXXX_PREMIUM_SELL_URL', 'https://quadlayers.com/wp-plugin-name-pro' );

/**
* 	Load plugin
*/
require_once QLXXX_PLUGIN_DIR . 'lib/load.php';

register_activation_hook(
	QLXXX_PLUGIN_FILE,
	function() {
		do_action( QLXXX_PREFIX . '_activation' );
	}
);
