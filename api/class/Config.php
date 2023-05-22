<?php
/**
 * Simple autoloader
 */
class Config
{
    /**  
     * Static method to initiate the application
     * @param none
     * @return bool 
     */ 
    public static function init()
    {
        
    }

    /**  
     * Static method to load files, like "autoload"
     * @param none
     * @return bool 
     */ 
    public static function autoLoad()
    {
        spl_autoload_register(function ($class) {
            $file = __DIR__ . '/' . str_replace('\\', DIRECTORY_SEPARATOR, $class).'.php';
            if (file_exists($file)) {
                require $file;
                return true;
            }
            return false;
        });
    }

    /**  
     * Static method to format json response
     * @param none
     * @return bool 
     */ 
    public static function headerConfig(){
        //CORS
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST');
        header("Access-Control-Allow-Headers: *");

        header("Content-Type: application/json");
    }
}

//Methods call
Config::init();
Config::headerConfig();
Config::autoLoad();
?>