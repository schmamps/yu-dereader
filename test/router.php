<?php
function numeric($str) {
    return intval(preg_replace('/[^\d]/', '', $str));
}

class Handler {
    function __construct($url) {
        $this->url = $url;
        $this->pathname = parse_url($url)['path'];
        $this->page_format = $this->build_path('comic%s.html');
    }

    function _arr_key_or($arr, $key, $or = FALSE) {
        return (array_key_exists($key, $arr)) ? $arr[$key] : $or;
    }

    function build_path($path) {
        return sprintf('%s/%s', dirname(__FILE__), $path);
    }

    function page_path($var) {
        $path = sprintf('comic%s.html', $var);
        return $this->build_path($path);
    }

    function _status($opts) {
        $status = $this->_arr_key_or($opts, 'status', '200 OK');

        header('Status: ' . $status);
    }

    function _type($opts) {
        $prov = 'text/' . $this->_arr_key_or($opts, 'type', 'html');
        $type = preg_replace('/.+\/(.+\/.+)/', '$1', $prov);

        header('Content-Type: ' . $type);
    }

    function _data($data) {
        echo $data;
    }

    function _serve($data, $opts = []) {
        $this->_status($opts);
        $this->_type($opts);
        $this->_data($data);
    }

    function not_found($html = '') {
        $this->_serve($html, ['status' => '404 Not Found']);
    }
}

class Index extends Handler {
    function __construct($url) {
        parent::__construct($url);
        $this->title = 'Not Found';
        $this->status = '404 ' + $this->title;

        if (preg_match('/\/\?*.*/', $url)) {
            $this->status = 200;
            $this->title = 'Index';
        }
    }

    function get_page_ids() {
        $glob = $this->page_path('*');
        $paths = glob($glob);
        $ids = array_map('numeric', glob($glob));
        rsort($ids);

        return $ids;
    }

    function get_page($id) {
        return ['text' => $id, 'href' => sprintf('?comic=%s', $id)];
    }

    function list_page($page) {
        $format = "<li><a href=\"/index.php%s\">%s</a></li>\n";
        extract($page);

        return sprintf($format, $href, $text);
    }

    function list_pages() {
        $list = $this->list_page(['text' => 'latest', 'href' => '']);

        foreach ($this->get_page_ids() as $id) {
            $page = $this->get_page($id);
            $list .= $this->list_page($page);
        }

        return $list;
    }

    function serve() {
        $opts = ['status' => $this->status];
        $items = $this->list_pages();
        $html = <<<html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>$this->title</title>
    </head>
    <body>
        <h1>$this->title</h1>
        <ul>
$items
        </ul>
    </body>
</html>
html;

        $this->_serve($html, $opts);
    }
}

class Page extends Handler {
    function __init() {
        $test_id = numeric($this->url);
        $test_path = $this->page_path($test_id);

        if (file_exists($test_path)) {
            $this->id = $test_id;
            $this->path = $test_path;
        }
        else {
            $this->id = 3154;
            $this->path = $this->page_path($this->id);
        }

        $this->original = sprintf('/comics/comics2-%s.png', $this->id);
    }

    function _get_src($rather) {
        // HEY, it's not perfect!
        return ($rather) ? 'lastever.png' : $this->original;
    }

    function _biwrbr() {
        $key = 'butiwouldratherbereading';
        return $this->_arr_key_or($_GET, $key);
    }

    function _declare_style() {
        $fmt = ' style="background: transparent url(%s) no-repeat 0 0;"';

        return sprintf($fmt, $this->original);
    }

    function _get_style() {
        return ($this->_biwrbr()) ? $this->_declare_style() : '';
    }

    function __construct($url) {
        parent::__construct($url);
        $this->__init();

        $rather = $this->_biwrbr();
        $this->src = $this->_get_src($rather);
        $this->style = $this->_get_style($rather);
    }

    function serve() {
        $html = file_get_contents($this->path);
        $html = str_replace('{{src}}', $this->src, $html);
        $html = str_replace('{{style}}', $this->style, $html);

        $this->_serve($html);
    }
}

class Stylesheet extends Handler {
    function __construct($url) {
        parent::__construct($url);
        $this->path = $this->build_path($this->pathname);
    }

    function serve() {
        $contents = '';
        $opts = [];

        if (file_exists($this->path)) {
            $contents = file_get_contents($this->path);
            $opts['type'] = 'css';
        }
        else {
            $this->not_found();
        }

        $this->_serve($contents, $opts);
    }
}

class Image extends Handler {
    // TODO: random PNGs?
    function __construct($url) {
        parent::__construct($url);
        $this->is_comic = strstr($url, 'comics2');
    }

    function serve() {
        $images = [];
        $images[] = [
            'iVBORw0KGgoAAAANSUhEUgAAACAAAABACA',
            'QAAADRh70lAAAAK0lEQVR42u3MMREAAAgE',
            'ID+50TWEmwcBSE+dRCAQCAQCgUAgEAgEAs',
            'H3YAG/G1/BhhLG4gAAAABJRU5ErkJggg=='];
        $images[] = [  // red
            'iVBORw0KGgoAAAANSUhEUgAAABYAAAAPCAYAAADgbT9oAAAAHUlEQVR42m',
            'P839Dwn4EGgHHU4FGDRw0eNXhYGgwAmo4s8hSG+JAAAAAASUVORK5CYII='];
        $images[] = [  // green
            'iVBORw0KGgoAAAANSUhEUgAAABYAAAAPCAYAAADgbT9oAAAAHUlEQVR42m',
            'Ns+N/wn4EGgHHU4FGDRw0eNXhYGgwAkx0s8vMnm3EAAAAASUVORK5CYII='];
        $images[] = [  // blue
            'iVBORw0KGgoAAAANSUhEUgAAABYAAAAPCAYAAADgbT9oAAAAHUlEQVR42m',
            'NsaPj/n4EGgHHU4FGDRw0eNXhYGgwAi6ws8u7ldH4AAAAASUVORK5CYII='];
        $images[] = [  // blue green
            'iVBORw0KGgoAAAANSUhEUgAAABYAAAAPCAYAAADgbT9oAAAAHUlEQVR42m',
            'Ns+P//PwMNAOOowaMGjxo8avCwNBgAME00Y/16gMoAAAAASUVORK5CYII='];
        $images[] = [ // blue red
            'iVBORw0KGgoAAAANSUhEUgAAABYAAAAPCAYAAADgbT9oAAAAHUlEQVR42m',
            'P83/D/PwMNAOOowaMGjxo8avCwNBgAN740Y7LTXzgAAAAASUVORK5CYII='];

        $idx = ($this->is_comic) ? 0 : mt_rand(2, count($images)) - 1;
        $data = base64_decode(implode('', $images[$idx]));

        $this->_serve($data, ['type' => 'image/png']);
    }
}

function get_handler() {
    $url = $_SERVER['REQUEST_URI'];
    $path = parse_url($url)['path'];
    $ext = substr($url, -4);

    if (substr($url, 0, 6) === '/index') { return new Page($url); }
    if ($ext === '.png') { return new Image($url); }
    if ($ext === '.css') { return new Stylesheet($url); }
    return new Index($url);
}

$handler = get_handler();
$handler->serve();
