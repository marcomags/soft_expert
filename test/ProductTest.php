<?php

class ProductTest extends PHPUnit\Framework\TestCase{

    public function testProductCreate(){

        //Arrange
        $product = $this->createStub(Product::class);

        //Assertions
        $this->assertIsObject($product);
    }
}

?>