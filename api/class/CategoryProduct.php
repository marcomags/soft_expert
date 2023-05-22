<?php 
require_once("Config.php");

class CategoryProduct{

    public function read(){
        
    }

    /**  
     * Method to create relationship betweeen Category and Product
     * @param array $data
     * @return json 
     */ 
    public function create($category_id, $product_id){
        try {
            $db = (new Connect())->getInstance();

            //Query
            $stmt = $db->prepare("INSERT INTO public.category_product (product_id, category_id) VALUES ('" . $product_id . "', '" . $category_id . "')");
            $response = $stmt->execute();

            //Treatment of response
            return $response ? true : false;

        } catch (\Throwable $th) {
            return false;
        }
    }

    public function delete(){
        
    }
}

?>