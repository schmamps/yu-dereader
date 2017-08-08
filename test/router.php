<?php
spl_autoload_register(function($name) {
    $path = sprintf('%s/php/%s.php', dirname(__FILE__), $name);

    require_once($path);
});

function handle() {
    $parsed = parse_url($_SERVER['REQUEST_URI']);
    $path = $parsed['path'];
    $base = dirname(__FILE__);

    switch (substr($path, -4)) {
        case '.png':
            $handler = new Image($base);
            break;
        case '.php':
            $handler = new Page($base);
            break;
        default:
            $handler = new Redirect();
    }

    $handler->serve($path);
}

handle();
