<?php 
require_once("Config.php");

class Product{

    /**  
     * Method to read products
     * @return json 
     */ 
    public function read($id = null){
        try {
            $db = (new Connect())->getInstance();

            //Query
            if($id > 0){
                $sql = "
                SELECT
                    products.name as name,
                    products.id as id,
                    products.price as price,
                    categories.name as category_name,
                    categories.id as category_id,
                    categories.tax as category_tax
                FROM
                    products
                LEFT JOIN category_product 
                    ON category_product.product_id = products.id
                LEFT JOIN categories
                    ON category_product.category_id = categories.id
                WHERE products.id = " . $id . "
                ORDER BY products.id DESC
                ";
                $stmt = $db->prepare($sql);
            }
            else{
                $sql = "
                SELECT
                    products.name as name,
                    products.id as id,
                    products.price as price,
                    categories.name as category_name,
                    categories.id as category_id,
                    categories.tax as category_tax
                FROM
                    products
                LEFT JOIN category_product 
                    ON category_product.product_id = products.id
                LEFT JOIN categories
                    ON category_product.category_id = categories.id
                ORDER BY products.id DESC
                ";
                $stmt = $db->prepare($sql);
            }
            
            $stmt->execute();
            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($response);

        } catch (\Throwable $th) {
            return json_encode(['status' => 'error', 'message' => $th->getMessage()]);
        }
    }

    /**  
     * Method to create products
     * @param array $data
     * @return json 
     */ 
    public function create($data){
        try {
            $db = (new Connect())->getInstance();
            $response_relationship = false;

            //Query
            $stmt = $db->prepare("INSERT INTO public.products (name, price) VALUES ('" . $data['name'] . "', '" . $data['price'] . "')");
            $response_product = $stmt->execute();

            //Get product ID
            $product_id = $db->lastInsertId(); 

            //Save the relationship between Category and Product
            if($response_product){
                $response_relationship = (new CategoryProduct)->create($data['category_id'], $product_id);
            }

            //Treatment of response
            if ($response_product && $response_relationship){
                die(json_encode(['status' => 'success', 'message' => 'Product inserted successfully.']));
            }
            else{
                $this->delete($product_id);
                die(json_encode(['status' => 'error', 'message' => 'Product not inserted. Try again.']));
            }

        } catch (\Throwable $th) {
            die(json_encode(['status' => 'error', 'message' => 'Oops! We had a problem inserting the product.']));
        }
    }

    /**  
     * Method to delete products
     * @param array $data
     * @return json 
     */ 
    public function delete($product_id){
        $db = (new Connect())->getInstance();

        //Check if $product_id is numeric
        if(!$product_id > 0){
            throw new Exception("Product ID is required.");
        }

        try {
            $stmt = $db->prepare("DELETE FROM public.products WHERE id = " . $product_id);
            $response = $stmt->execute();

            if ($response){
                return json_encode(['status' => 'success', 'message' => 'Product deleted successfully.']);
            }
            else{
                return json_encode(['status' => 'error', 'message' => 'Product not deleted. Try again.']);
            }
        } catch (\Throwable $th) {
            return json_encode(['status' => 'error', 'message' => $th->getMessage()]);
        }
        
    }
}

?>