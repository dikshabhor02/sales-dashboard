<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require_once "db.php";

$totalSales = $conn->query(
    "SELECT SUM(total_amount) AS total_sales FROM sales"
)->fetch(PDO::FETCH_ASSOC);

$totalOrders = $conn->query(
    "SELECT COUNT(*) AS total_orders FROM sales"
)->fetch(PDO::FETCH_ASSOC);

$totalCustomers = $conn->query(
    "SELECT COUNT(*) AS total_customers FROM customers"
)->fetch(PDO::FETCH_ASSOC);

$totalProducts = $conn->query(
    "SELECT COUNT(*) AS total_products FROM products"
)->fetch(PDO::FETCH_ASSOC);

$result = [
    "total_sales" => $totalSales["total_sales"] ?? 0,
    "total_orders" => $totalOrders["total_orders"],
    "total_customers" => $totalCustomers["total_customers"],
    "total_products" => $totalProducts["total_products"]
];

echo json_encode($result);

?>