<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require_once "db.php";

$stmt = $conn->prepare(
    "SELECT id, product_name, price FROM products ORDER BY product_name"
);

$stmt->execute();

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($products);

?>