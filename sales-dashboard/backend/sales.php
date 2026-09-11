<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require_once "db.php";

$sql = "
    SELECT 
        sales.id,
        customers.name AS customer_name,
        products.product_name,
        sales.quantity,
        sales.total_amount,
        sales.sale_date
    FROM sales
    JOIN customers ON sales.customer_id = customers.id
    JOIN products ON sales.product_id = products.id
    ORDER BY sales.id DESC
";

$stmt = $conn->prepare($sql);
$stmt->execute();

$sales = $stmt->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");

echo json_encode($sales);

?>