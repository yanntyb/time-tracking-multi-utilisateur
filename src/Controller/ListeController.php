<?php

namespace Yanntyb\App\Controller;

use RedBeanPHP\R;

class ListeController
{
    public function add(){
        $data = $this->getData();
        $liste = R::dispense("liste");
        $liste->name = $data->title;
        $liste->startedat = date("Y-m-d"); ;
        $liste->user_id = (unserialize($_SESSION["user"]))->getId();

        $id = R::store($liste);
        dump($id);
    }

    public function remove(){
        $data = $this->getData();
        R::trash("liste",$data->id);
    }

    public function getData(){
        return json_decode(file_get_contents("php://input"));
    }
}