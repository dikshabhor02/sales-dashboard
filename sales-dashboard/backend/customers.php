<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require_once "db.php";

$stmt = $conn->prepare(
    "SELECT id, name FROM customers ORDER BY name"
);

$stmt->execute();

$customers = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($customers);

?>