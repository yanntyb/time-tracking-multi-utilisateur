<?php

namespace Yanntyb\App\Controller;

use RedBeanPHP\R;
use Yanntyb\App\Model\Classes\Entity\User;

class ConnectionController
{
    public function connection(): bool
    {
        $userFound = R::findOne("user","name LIKE ?", [$_POST["name"]]);
        if($userFound->password === $_POST["pass"]){
            $user = (new User())->setName($userFound->name)->setId($userFound->id);
            $_SESSION["user"] = serialize($user);
            header("Location: index.php");
            return true;
        }
        else{
            return false;
        }
    }
}