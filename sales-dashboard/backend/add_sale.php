<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$customer_id = $data["customer_id"];
$product_id = $data["product_id"];
$quantity = $data["quantity"];
$sale_date = $data["sale_date"];

// Get product price
$stmt = $conn->prepare(
    "SELECT price FROM products WHERE id = ?"
);

$stmt->execute([$product_id]);

$product = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$product) {
    echo json_encode([
        "success" => false,
        "message" => "Product not found"
    ]);
    exit;
}

// Calculate total amount
$total_amount = $product["price"] * $quantity;

// Insert sale
$stmt = $conn->prepare(
    "INSERT INTO sales 
    (customer_id, product_id, quantity, total_amount, sale_date)
    VALUES (?, ?, ?, ?, ?)"
);

$stmt->execute([
    $customer_id,
    $product_id,
    $quantity,
    $total_amount,
    $sale_date
]);

echo json_encode([
    "success" => true,
    "message" => "Sale added successfully",
    "total_amount" => $total_amount
]);

?>