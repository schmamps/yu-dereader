<?php
$url = $_SERVER['REQUEST_URI'];
$base = dirname(__FILE__);
$doc = ($url === '/') ? '/404' : $url;
$path = $base . $doc;
$ext =  array_slice(explode('.', $path), -1)[0];



function gray() {
    return[
        'iVBORw0KGgoAAAANSUhEUgAAACAAAABACAQAAADRh70lAAAAK0lEQVR42u3MMREAAAgE',
        'ID+50TWEmwcBSE+dRCAQCAQCgUAgEAgEAsH3YAG/G1/BhhLG4gAAAABJRU5ErkJggg=='
    ];
}

function red() {
    return [
        'iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAALElEQVR42u3QAQEAAAgC',
        'oFru9BoiTGAvuSm2AgQIECBAgAABAgQIECBAQJ8HrvEv0TxIF5QAAAAASUVORK5CYII='
    ];
}

function png($url) {
    header('Content-Type: image/png');

    $content = (strstr($url, 'lastever.png')) ? red() : gray();

    print base64_decode(implode('', $content));
}

header(sprintf(
    'X-Whatver: %s, %s, %s',
    var_export($url, TRUE),
    var_export($path, TRUE),
    var_export($url === '/lastever.png', TRUE)
));


if (file_exists($path)) {
    header('Content-Type: text/' . $ext);
    include($path);
}
else if (substr($url, -4) === '.png') {
    png($url);
}
else {
    header('Status: 404');
    echo <<<'html'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Not Found</title>
</head>
<body>
    <h1>Not Found</h1>
    <ul>
        <li><a href="comic3154.html">comic 3154</a></li>
    </ul>
</body>
</html>
html;
}
