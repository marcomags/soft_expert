<?php 
require_once("Config.php");

class Category{

    /**  
     * Method to read categories
     * @return json 
     */ 
    public function read($id = null){
        try {
            $db = (new Connect())->getInstance();

            //Query
            if($id > 0){
                $stmt = $db->prepare("SELECT * FROM public.categories WHERE id = " . $id . " ORDER BY public.categories.id DESC");
            }
            else{
                $stmt = $db->prepare("SELECT * FROM public.categories ORDER BY public.categories.id DESC");
            }
            
            $stmt->execute();
            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return json_encode($response);

        } catch (\Throwable $th) {
            return json_encode(['status' => 'error', 'message' => $th->getMessage()]);
        }
    }

    /**  
     * Method to create categories
     * @param array $data
     * @return json 
     */ 
    public function create($data){
        try {
            $db = (new Connect())->getInstance();

            //Query
            $stmt = $db->prepare("INSERT INTO public.categories (name, tax) VALUES ('" . $data['name'] . "', '" . $data['tax'] . "')");
            $response = $stmt->execute();

            //Treatment of response
            if ($response){
                die(json_encode(['status' => 'success', 'message' => 'Category inserted successfully.']));
            }
            else{
                die(json_encode(['status' => 'error', 'message' => 'Category not inserted. Try again.']));
            }

        } catch (\Throwable $th) {
            die(json_encode(['status' => 'error', 'message' => 'Oops! We had a problem inserting the category.']));
        }
    }

    /**  
     * Method to delete categories
     * @param array $data
     * @return json 
     */ 
    public function delete($category_id){
        $db = (new Connect())->getInstance();

        //Check if $category_id is numeric
        if(!$category_id > 0){
            throw new Exception("Category ID is required.");
        }

        try {
            $stmt = $db->prepare("DELETE FROM public.categories WHERE id = " . $category_id);
            $response = $stmt->execute();

            if ($response){
                return json_encode(['status' => 'success', 'message' => 'Category deleted successfully.']);
            }
            else{
                return json_encode(['status' => 'error', 'message' => 'Category not deleted. Try again.']);
            }
        } catch (\Throwable $th) {
            return json_encode(['status' => 'error', 'message' => $th->getMessage()]);
        }
        
    }
}

?>