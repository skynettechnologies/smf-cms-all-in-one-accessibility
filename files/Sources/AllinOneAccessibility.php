<?php
/**
 * @package All in One Accessibility®
 * @author  Skynet Technologies USA LLC
 * @license GPL
 */

if (!defined('SMF'))
    die('Hacking attempt...');

/**
 * Hook: integrate_load_theme
 * Adds CSS/JS resources in <head>
 */
function aioa_add_header()
{
    global $context, $settings;

    $context['html_headers'] .= '
		<link rel="stylesheet" type="text/css" href="' . $settings['default_theme_url'] . '/css/style.css" />
		<script src="' . $settings['default_theme_url'] . '/scripts/allinoneaccessibility.js"></script>';
}

/**
 * Hook: integrate_buffer
 * Inserts the widget container before </body>
 */
function aioa_add_footer($buffer)
{
    global $modSettings;

    if (!empty($modSettings['aioa_enabled'])) {
        $widget = '<div id="aioa_widget" class="aioa-widget"></div>';
        $buffer = str_ireplace('</body>', $widget . "\n</body>", $buffer);
    }
    return $buffer;
}

/**
 * Hook: integrate_admin_areas
 * Adds entry in Admin → Configuration → Modification Settings
 */
function aioa_add_admin_area(&$admin_areas)
{
    global $txt;
    $admin_areas['config']['areas']['modsettings']['subsections']['aioa'] = array($txt['mods_cat_allinoneaccessibility']);
}

/**
 * Hook: integrate_modify_modifications
 * Registers settings
 */
function aioa_add_mod_settings($return_config = false)
{
    global $txt, $scripturl, $context, $settings, $sc, $modSettings;

    // Load language strings
    loadLanguage('Modifications');

    $config_vars = array(
        // Extended settings
        array('desc', 'aioa_note',
            'label' => '<b>NOTE:</b> Currently, All in One Accessibility is dedicated to enhancing accessibility specifically for websites and online stores.'
        ),
        array(
            'desc',
            'aioa_upgrade_msg',
            'label' => '<p id="license_key_msg" class="upgrade-note">
                    Please <a href="https://ada.skynettechnologies.us/trial-subscription?website=" target="_blank">Upgrade</a>
                    to paid version of All in One Accessibility® Pro.
                </p>'
        ),
        array('text', 'color', 'size' => 7, 'subtext' => 'You can customize the ADA Widget color. For example: FF5733'),
        array('check', 'is_widget_custom_position'),

        // Custom Widget Position Radios
        array('select', 'position', array(
            'top_left' => 'Top Left',
            'top_center' => 'Top Center',
            'top_right' => 'Top Right',
            'bottom_left' => 'Bottom Left',
            'bottom_center' => 'Bottom Center',
            'bottom_right' => 'Bottom Right',
            'middle_left' => 'Middle Left',
            'middle_right' => 'Middle Right',
        )),

        // Custom Position Options
        array('int', 'aioa_custom_position_horizontal', 'min' => 0, 'max' => 250),
        array('select', 'aioa_custom_position_horizontal_type', array('left' => 'To the Left', 'right' => 'To the Right')),
        array('int', 'aioa_custom_position_vertical', 'min' => 0, 'max' => 250),
        array('select', 'aioa_custom_position_vertical_type', array('top' => 'To the Top', 'bottom' => 'To the Bottom')),

        array('select', 'widget_size', 'subtext' => 'It only works on desktop view.', array(
            '0' => 'Regular Size',
            '1' => 'Oversize',
        )),
        array('select', 'icon_type', array(
            'aioa-icon-type-1'  => 'Type 1',
            'aioa-icon-type-2'  => 'Type 2',
            'aioa-icon-type-3'  => 'Type 3',
            'aioa-icon-type-4'  => 'Type 4',
            'aioa-icon-type-5'  => 'Type 5',
            'aioa-icon-type-6'  => 'Type 6',
            'aioa-icon-type-7'  => 'Type 7',
            'aioa-icon-type-8'  => 'Type 8',
            'aioa-icon-type-9'  => 'Type 9',
            'aioa-icon-type-10' => 'Type 10',
            'aioa-icon-type-11' => 'Type 11',
            'aioa-icon-type-12' => 'Type 12',
            'aioa-icon-type-13' => 'Type 13',
            'aioa-icon-type-14' => 'Type 14',
            'aioa-icon-type-15' => 'Type 15',
            'aioa-icon-type-16' => 'Type 16',
            'aioa-icon-type-17' => 'Type 17',
            'aioa-icon-type-18' => 'Type 18',
            'aioa-icon-type-19' => 'Type 19',
            'aioa-icon-type-20' => 'Type 20',
            'aioa-icon-type-21' => 'Type 21',
            'aioa-icon-type-22' => 'Type 22',
            'aioa-icon-type-23' => 'Type 23',
            'aioa-icon-type-24' => 'Type 24',
            'aioa-icon-type-25' => 'Type 25',
            'aioa-icon-type-26' => 'Type 26',
            'aioa-icon-type-27' => 'Type 27',
            'aioa-icon-type-28' => 'Type 28',
            'aioa-icon-type-29' => 'Type 29',
        )),
        array('check', 'is_widget_custom_size'),
        array('int', 'widget_icon_size_custom', 'min' => 20, 'max' => 150, 'subtext' => '20 - 150px are permitted values'),
        array('select', 'icon_size', array(
            'aioa-big-icon' => 'Big',
            'aioa-medium-icon' => 'Medium',
            'aioa-default-icon' => 'Default',
            'aioa-small-icon' => 'Small',
            'aioa-extra-small-icon' => 'Extra Small',
        )),
    );

    if ($return_config)
        return $config_vars;

    if (isset($_GET['save'])) {
        checkSession();
        saveDBSettings($config_vars);
        writeLog();
        redirectexit('action=admin;area=modsettings;sa=aioa');
    }
    $context['post_url'] = $scripturl . '?action=admin;area=modsettings;save;sa=aioa';
    $context['settings_title'] = $txt['mods_cat_allinoneaccessibility'];

    prepareDBSettingContext($config_vars);
}
