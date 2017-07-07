<?php
$url = $_SERVER['REQUEST_URI'];
$base = dirname(__FILE__);
$doc = ($url === '/') ? '/404' : $url;
$path = $base . $doc;
$ext =  array_slice(explode('.', $path), -1)[0];

if (file_exists($path)) {
    header('Content-Type: text/' . $ext);
    include($path);
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
