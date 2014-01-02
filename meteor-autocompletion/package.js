Package.describe({
    summary: "Input autocompletion using data from Meteor collections"
});

Package.on_use(function (api) {
    api.use('jquery-ui', 'client');

    api.export('AutoCompletion', 'client');

    api.add_files([
        'autocompletion.js',
        'css/jquery-ui-smoothness/images/ui-bg_flat_0_aaaaaa_40x100.png',
        'css/jquery-ui-smoothness/images/ui-bg_flat_75_ffffff_40x100.png',
        'css/jquery-ui-smoothness/images/ui-bg_glass_55_fbf9ee_1x400.png',
        'css/jquery-ui-smoothness/images/ui-bg_glass_65_ffffff_1x400.png',
        'css/jquery-ui-smoothness/images/ui-bg_glass_75_dadada_1x400.png',
        'css/jquery-ui-smoothness/images/ui-bg_glass_75_e6e6e6_1x400.png',
        'css/jquery-ui-smoothness/images/ui-bg_glass_95_fef1ec_1x400.png',
        'css/jquery-ui-smoothness/images/ui-bg_highlight-soft_75_cccccc_1x100.png',
        'css/jquery-ui-smoothness/images/ui-icons_222222_256x240.png',
        'css/jquery-ui-smoothness/images/ui-icons_2e83ff_256x240.png',
        'css/jquery-ui-smoothness/images/ui-icons_454545_256x240.png',
        'css/jquery-ui-smoothness/images/ui-icons_888888_256x240.png',
        'css/jquery-ui-smoothness/images/ui-icons_cd0a0a_256x240.png',
        'css/jquery-ui-smoothness/jquery-ui-1.9.2.custom.css'
    ], 'client');

});
