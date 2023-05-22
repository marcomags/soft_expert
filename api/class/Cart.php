<?php 
require_once("Config.php");

class Cart{

    /**  
     * Method to read cart by session ID
     * @return json 
     */ 
    public function getBySession($session_id){
        try {
            $db = (new Connect())->getInstance();

            //Query
            $sql = "SELECT * FROM public.cart WHERE session_id = '" . $session_id . "' ORDER BY id DESC";
            $stmt = $db->prepare($sql);
            
            $stmt->execute();
            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($response);

        } catch (\Throwable $th) {
            return json_encode(['status' => 'error', 'message' => $th->getMessage()]);
        }
    }

    /**  
     * Method to request quantity of cart
     * @return json 
     */ 
    public function getQty($session_id){
        try {
            $db = (new Connect())->getInstance();
            
            //Query            
            $sql = "SELECT count(*) FROM public.cart WHERE session_id = '" .  $session_id . "'";
            $stmt = $db->prepare($sql);
            
            $stmt->execute();
            $response = $stmt->fetch(PDO::FETCH_ASSOC);
            
            return $response;

        } catch (\Throwable $th) {
            return json_encode(['status' => 'error', 'message' => $th->getMessage()]);
        }
    }

    /**  
     * Method to read cart by product ID
     * @return json 
     */ 
    public function getByProductId($product_id, $session_id, $array = false){
        try {
            $db = (new Connect())->getInstance();
            
            //Query            
            $sql = "SELECT * FROM public.cart WHERE product_id = " . $product_id . " AND session_id = '" .  $session_id . "'";
            $stmt = $db->prepare($sql);
            
            $stmt->execute();
            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return $array === true ? $response : json_encode($response);

        } catch (\Throwable $th) {
            return json_encode(['status' => 'error', 'message' => $th->getMessage()]);
        }
    }

    /**  
     * Method to add products to cart
     * @param array $data
     * @return json 
     */ 
    public function create($data){
        try {
            $db = (new Connect())->getInstance();
            
            //Check if the product already exists
            $product_cart = $this->getByProductId($data['product_id'], $data['session_id'], true);

            //If not exist, add row in DB
            if(count($product_cart) == 0){
                //Query
                $stmt = $db->prepare("INSERT INTO public.cart (
                        product_name, 
                        product_price, 
                        product_id,
                        category_name, 
                        category_tax, 
                        qty, 
                        session_id) 
                        VALUES (
                        '" . $data['product_name'] . "', 
                        '" . $data['product_price'] . "',
                        '" . $data['product_id'] . "',
                        '" . $data['category_name'] . "',
                        '" . $data['category_tax'] . "',
                        1,
                        '" . $data['session_id'] . "'
                    )");
                $response = $stmt->execute();
            }
            //Else, increment quantity
            else{
                //Query
                $stmt = $db->prepare("UPDATE public.cart SET qty=qty+1 WHERE product_id = " . $data['product_id'] . " AND session_id = '" . $data['session_id'] . "'");
                $response = $stmt->execute();
            } 

            //Treatment of response
            if ($response){
                die(json_encode(['status' => 'success', 'message' => 'Product added to cart successfully.']));
            }
            else{
                die(json_encode(['status' => 'error', 'message' => 'Product not added to cart. Try again.']));
            }

        } catch (\Throwable $th) {
            die(json_encode(['status' => 'error', 'message' => 'Oops! We had a problem.']));
        }
    }

    /**  
     * Method to change quantity in cart
     * @param array $data
     * @return json 
     */ 
    public function changeQty($data){
        try {
            $db = (new Connect())->getInstance();
            
            //Query
            $sql = "UPDATE public.cart SET qty=" . $data['qty'] . " WHERE id = " . $data['id'];
            $stmt = $db->prepare($sql);
            $response = $stmt->execute();

            //Treatment of response
            if ($response){
                die(json_encode(['status' => 'success', 'message' => 'Product added to cart successfully.']));
            }
            else{
                die(json_encode(['status' => 'error', 'message' => 'Product not added to cart. Try again.']));
            }

        } catch (\Throwable $th) {
            die(json_encode(['status' => 'error', 'message' => 'Oops! We had a problem.']));
        }
    }

    /**  
     * Method to delete products
     * @param array $data
     * @return json 
     */ 
    public function delete($id){
        $db = (new Connect())->getInstance();

        //Check if cart ID is valid
        if(!$id > 0){
            throw new Exception("ID cart is required.");
        }

        try {
            $stmt = $db->prepare("DELETE FROM public.cart WHERE id = " . $id);
            $response = $stmt->execute();

            if ($response){
                return json_encode(['status' => 'success', 'message' => 'Item cart deleted successfully.']);
            }
            else{
                return json_encode(['status' => 'error', 'message' => 'Item cart not deleted. Try again.']);
            }
        } catch (\Throwable $th) {
            return json_encode(['status' => 'error', 'message' => $th->getMessage()]);
        }
        
    }

    /**  
     * Method to save the sale
     * @param array $data
     * @return json 
     */ 
    public function saveSale($data){
        try {
            $db = (new Connect())->getInstance();
            
            //Query
            $stmt = $db->prepare("INSERT INTO public.sale (
                    total_price, 
                    total_tax, 
                    session_id) 
                    VALUES (
                    '" . $data['total_price'] . "', 
                    '" . $data['total_tax'] . "',
                    '" . $data['session_id'] . "'
                )");
            $response = $stmt->execute();

            //Treatment of response
            if ($response){
                die(json_encode(['status' => 'success', 'message' => 'Sale save successfully.']));
            }
            else{
                die(json_encode(['status' => 'error', 'message' => 'Sale not save. Try again.']));
            }

        } catch (\Throwable $th) {
            die(json_encode(['status' => 'error', 'message' => 'Oops! We had a problem.']));
        }
    }
}

?>