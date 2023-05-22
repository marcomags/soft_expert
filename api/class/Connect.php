<?php 

class Connect{

    private $host = "localhost";
    private $dbname = "market";
    private $username = "postgres";
    private $password = "1234";

    public function __construct(){

    }

    /**  
     * Method to mount PDO instance
     * @param none
     * @return instance reuturn PDO instance
     */ 
    public function getInstance(){
        try {
            return new PDO('pgsql:host=' . $this->host . ';dbname= ' . $this->dbname, $this->username, $this->password, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        } catch(PDOException $exception) {
            die(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));
        }
        
    }
}
?>