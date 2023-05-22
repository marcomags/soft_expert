<?php 
require_once("Config.php");

class Login{

    /**  
     * Method to check credential login
     * @param array $data
     * @return json 
     */ 
    public function login($data){
        try {
            $db = (new Connect())->getInstance();
            
            //Query
            $stmt = $db->prepare("SELECT count(*) FROM users WHERE username = '" . $data['username'] . "' AND password = crypt('" . $data['password'] . "', password);");
            $stmt->execute();
            $match = $stmt->fetchColumn(); 

            //Treatment of response
            if (is_numeric($match) && $match == 1){
                die(json_encode(['status' => 'success', 'message' => 'Logged successfully.']));
            }
            else{
                die(json_encode(['status' => 'error', 'message' => 'Username and/or password do not match.']));
            }

        } catch (\Throwable $th) {
            die(json_encode(['status' => 'error', 'message' => 'Oops! We had a problem inserting the product.']));
        }
    }
}

?>