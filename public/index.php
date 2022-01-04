<?php

session_start();

require "../vendor/autoload.php";

use Yanntyb\App\Controller\ConnectionController;
use Yanntyb\App\Controller\HomeController;
use Yanntyb\App\Controller\ListeController;
use Yanntyb\App\Model\Classes\Route;
use Yanntyb\App\Model\Classes\Router;
use RedBeanPHP\R;

R::setup("mysql:host=localhost;dbname=timetracking;port=3306", "root", "");

$router = new Router(new Route("home","/",[HomeController::class,"home"]));

/**
 * handle connection form
 */
$router->addRoute("connection", "/connection?", [ConnectionController::class, "connection"]);

/**
 * Liste management
 */
$router->addRoute("addListe","/addList", [ListeController::class, "add"]);
$router->addRoute("removeListe", "/removeList", [ListeController::class, "remove"]);

$router->handleQuery(str_replace("/index.php","",$_SERVER['PHP_SELF']));