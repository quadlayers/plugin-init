<?php

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	die( -1 );
}

require_once 'lib/models/base.php';
require_once 'lib/models/accounts.php';
require_once 'lib/models/feeds.php';
require_once 'lib/models/settings.php';

if ( ! is_multisite() ) {

	$model_accounts = new QUADLAYERS\TIKTOK\Models\Accounts();
	$model_feeds    = new QUADLAYERS\TIKTOK\Models\Feeds();
	$model_settings = new QUADLAYERS\TIKTOK\Models\Settings();

	$settings = $model_settings->get();

	if ( ! empty( $settings['flush'] ) ) {

		$model_accounts->delete_table();
		$model_feeds->delete_table();
		$model_settings->delete_table();

	}
}
