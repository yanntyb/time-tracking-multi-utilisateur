<?php

namespace Yanntyb\App\Controller;


use RedBeanPHP\R;
use Yanntyb\App\Model\Classes\Entity\Item;
use Yanntyb\App\Model\Classes\Entity\Liste;
use Yanntyb\App\Model\Classes\Entity\User;

class HomeController extends Controller
{

    /**
     * Check if an user is connected
     * @return bool|User
     */
    public function connected(): bool|User
    {
        if(isset($_SESSION["user"])){
            $user = unserialize($_SESSION["user"]);
            if($user instanceof User){
                return $user;
            }
            return false;
        }
        return false;
    }

    public function home(){
        $user = $this->connected();
        if($user){
            $listesDb = R::find("liste","user_id = " . $user->getId());
            $listes = [];
            foreach($listesDb as $liste){
                $itemDb = R::find("item", "liste_id = " . $liste->id);
                $items = [];
                foreach($itemDb as $item){
                    $items[] = (new Item())
                        ->setId($item->id)
                        ->setName($item->name)
                        ->setStartedAt($item->startedat)
                        ->setTimer($item->timer)
                        ->setListeId($liste->id)
                        ;
                }
                $listes[] = (new Liste())
                    ->setId($liste->id)
                    ->setName($liste->name)
                    ->setItems($items)
                ;
            }
            $var["listes"] = $listes;
            $this->render("Home/home","Home", $var);
        }
        else{
            $this->render("Home/connection","Connection");
        }
    }
}