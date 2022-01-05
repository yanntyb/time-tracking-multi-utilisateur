<?php

namespace Yanntyb\App\Controller;

use RedBeanPHP\R;

class ItemController
{
    public function add(){
        $data = $this->getData();
        $item = R::dispense("item");
        $item->liste_id = $data->listeId;
        $item->name = $data->title;
        $item->timer = 0;
        $item->startedat = date("Y-m-d H:i:s");
        $item->relativeid = $data->id;

        R::store($item);
    }

    public function remove(){
        $data = $this->getData();
        R::trash(R::findOne("item","liste_id = ? AND relativeid = ?", [$data->listeId, $data->id]));
    }

    public function updateTimer(){
        $data = $this->getData();
        $items = $data->child;
        echo "<pre>";
        print_r($items);
        echo "</pre>";
    }


    public function getData(){
        return json_decode(file_get_contents("php://input"));
    }
}