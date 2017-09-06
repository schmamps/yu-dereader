<?php
require_once('BaseHandler.php');

class Page extends BaseHandler {
    use Content, Composition, Data;

    function __construct($root) {
        parent::__construct();
        $this->init_content('text/html; charset=utf-8');
        $this->init_data($root);
    }

    protected function query_string($key, $default = FALSE) {
        $exists = array_key_exists($key, $_GET);

        return ($exists) ? $_GET[$key] : $default;
    }

    protected function create_attr($name, $val_var, $val_format = '%s') {
        $val = sprintf($val_format, $val_var);

        return sprintf('%s="%s"', $name, $val);
    }

    protected function reduce_item($pages, $item) {
        $pages[] = array_merge(
            get_object_vars($item),
            ['comic' => $item->comic]
        );

        return $pages;
    }

    protected function reduce_data($data) {
        return array_reduce($data->pages, $this->ref_self('reduce_item'), []);
    }

    protected function sort_item($a, $b) {
        return $b['comic'] - $a['comic'];
    }

    protected function sort_data($pages) {
        usort($pages, $this->ref_self('sort_item'));

        return $pages;
    }

    protected function get_page_spec() {
        $requested = $this->query_string('comic', 0);

        return max(0, intval($requested));
    }

    protected function get_current_index($pages) {
        $idx = 0;
        $max = count($pages);
        $spec = $this->get_page_spec();

        while ($idx < $max && $pages[$idx]['comic'] != $spec) {
            $idx++;
        }

        return $idx % $max;
    }

    protected function create_href($id) {
        return $this->create_attr('href', $id, '/index.php?comic=%s');
    }

    protected function get_index_href($pages, $idx) {
        $exists = array_key_exists($idx, $pages);

        if ($exists) {
            return $this->create_href($pages[$idx]['comic']);
        }

        return $this->create_attr('href', 'futurecomic.php');
    }

    protected function get_initial() {
        $all =  $this->get_data('.reduce_data', '.sort_data');
        $idx = $this->get_current_index($all);

        return array_merge(
            $all[$idx],
            ['prev' => $this->get_index_href($all, $idx + 1)],
            ['next' => $this->get_index_href($all, $idx - 1)]
        );
    }

    protected function get_original($page) {
        $page['original'] = sprintf('/comics/comic2-%s.png', $page['img']);

        return $page;
    }

    protected function get_post($page) {
        $filename = sprintf('%s.html', $page['post']);
        $page['post'] = $this->build_path($filename);

        return $page;
    }

    protected function get_rather($page) {
        $key = 'butiwouldratherbereading';
        $page['rather'] = array_key_exists($key, $_GET);

        return $page;
    }

    protected function get_src($page) {
        // NOT perfect
        $url = ($page['rather']) ? '/xkcd.png' : $page['original'];
        $page['src'] = $this->create_attr('src', $url);

        return $page;
    }

    function _get_style($original) {
        $format = 'background: transparent url(%s) no-repeat 0 0;';

        return $this->create_attr('style', $original, $format);
    }

    protected function get_style($page) {
        extract($page);
        $page['style'] = ($rather) ? $this->_get_style($original) : '';

        return $page;
    }

    protected function get_class($page) {
        $class = ($page['rather']) ? '' : $this->create_attr('class', 'comic');
        $page['class'] = $class;

        return $page;
    }

    protected function get_funky($page) {
        return json_decode(json_encode($page));
    }

    protected function get_page() {
        $get = $this->compose(
            '.get_initial',
            '.get_original',
            '.get_post',
            '.get_rather',
            '.get_src',
            '.get_style',
            '.get_class',
            '.get_funky'
        );

        return $get();
    }

    function load_template() {
        $page = $this->get_page();
        $path = $this->build_path('template.php');

        include($path);

        return ob_get_clean();
    }

    function serve($url) {
        $html = $this->load_template();

        $this->send($html);
    }
}
