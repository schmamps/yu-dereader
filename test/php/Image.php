<?php
require_once('BaseHandler.php');

class Image extends BaseHandler {
    use Content, Composition, Data;

    // TODO: random PNGs?
    function __construct($root) {
        parent::__construct($root);
        $this->init_content('image/png');
        $this->init_data($root);
    }

    protected function get_chunk($data) {
        return get_object_vars($data->images);
    }

    protected function join_items($segments) {
        return implode('', $segments);
    }

    protected function serve_image($data) {
        $serve = $this->compose('.join_items', 'base64_decode', '.send');

        $serve($data);
    }

    protected function _get_image_key($images) {
        $all = array_keys($images);
        shuffle($all);

        do {
            $key = array_shift($all);
        } while ($key == 'comic');

        return $key;
    }

    protected function get_image_key($images, $url) {
        $is_comic = strstr($url, 'comic2');

        return ($is_comic) ? 'comic' : $this->_get_image_key($images);
    }

    function serve($url) {
        $images = $this->get_data('.get_chunk');
        $key = $this->get_image_key($images, $url);

        $this->serve_image($images[$key]);
    }
}
