<?php

namespace Yanntyb\App\Model\Classes;
use PDO;
use PDOException;



class DB
{

    private string $host = "localhost";
    private string $db = "mirage-merge";
    private string $user = "amrq8237";
    private string $password = "88*NPu!!X2qu";

    private static ?PDO $dbInstance = null;

    public function __construct() {
        try{
            $this->init();
            self::$dbInstance = new PDO("mysql:host={$this->host};dbname=amrq8237_{$this->db};charset=utf8", $this->user, $this->password);
            self::$dbInstance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //to avoid getting 2 times the same result
            self::$dbInstance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }
        catch(PDOException $exception){
            echo "impossible de se connecter<br>";
            echo $exception->getMessage();
        }

    }

    public static function getInstance(): ?PDO {
        if(is_null(self::$dbInstance)){
            new self();
        }
        return self::$dbInstance;
    }

    private function init(){
        include('configDB.php');
        $this->host = DBHOST;
        $this->db = DBNAME;
        $this->user = DBUSER;
        $this->password = DBPWD;
    }
}