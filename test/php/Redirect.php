<?php
require_once('BaseHandler.php');

class Redirect extends BaseHandler {
    public function __construct() {}

    public function serve($_) {
        $this->header('Location', '/index.php');
    }
}
