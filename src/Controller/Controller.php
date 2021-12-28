<?php

namespace Yanntyb\App\Controller;

/**
 * Every controller that need to render a view should extend this class
 */
class Controller
{
    public function render(string $view, string $title, $var = null) {
        ob_start();
        require_once $_SERVER["DOCUMENT_ROOT"] . "/../View/$view.view.php";
        $html = ob_get_clean();
        require_once $_SERVER["DOCUMENT_ROOT"] . "/../View/_partials/base.view.php";
    }

    public function log(string $message, array $value){

    }
}