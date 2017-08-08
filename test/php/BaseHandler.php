<?php
class BaseHandler {
    public function __construct() {
        ob_start();
    }

    protected function header($name, $val) {
        $head = sprintf('%s: %s', $name, $val);

        header($head);
    }
}

trait Content {
    protected function init_content($type) {
        $this->type = $type;
    }

    protected function build_path($filename) {
        return sprintf('%s/comics/%s', $this->root, $filename);
    }

    protected function send($data) {
        $this->header('Content-Type', $this->type);
        echo $data;
    }
}

trait Composition {
    protected function ref_self($member) {
        return array($this, $member);
    }

    protected function compose_item($data, $call) {
        $comps = explode('.', $call);
        $func = end($comps);

        return (strstr($call, '.')) ? $this->$func($data) : $func($data);
    }

    protected function compose() {
        $methods = func_get_args();

        return function($initial = NULL) use ($methods) {
            return array_reduce(
                $methods,
                $this->ref_self('compose_item'),
                $initial
            );
        };
    }
}

trait Data {
    protected function init_data($root) {
        $this->root = $root;
    }

    protected function read_data($path) {
        return trim(file_get_contents($path));
    }

    protected function get_data() {
        $compose = $this->ref_self('compose');
        $calls = array_merge(['.read_data', 'json_decode'], func_get_args());
        $load = call_user_func_array($compose, $calls);
        $path = $this->build_path('data.json');

        return $load($path);
    }
}
