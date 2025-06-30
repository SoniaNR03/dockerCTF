<?php
$products = json_decode(file_get_contents('stock.json'), true);

$prices = [];
foreach ($products as $item => $stock) {
    $prices[$item] = rand(20, 100);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>CTF-6</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 40px;
            color: #333;
        }
        h1 {
            text-align: center;
            color: #2c3e50;
        }
        .product {
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .product h2 {
            margin-top: 0;
            color: #34495e;
        }
        .product p {
            margin: 5px 0;
        }
        .product form {
            margin-top: 10px;
        }
        .buy-button {
            padding: 8px 16px;
            background-color: #2980b9;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .buy-button:hover {
            background-color: #1c5980;
        }
        .out-of-stock {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>🛒 Bienvenido a RUT Store</h1>
    <?php foreach ($products as $item => $stock): ?>
        <div class="product">
            <h2><?= ucfirst($item) ?></h2>
            <p><strong>Precio:</strong> $<?= $prices[$item] ?></p>
            <p><strong>Stock disponible:</strong> <?= $stock ?></p>

            <?php if ($stock > 0): ?>
                <form action="buy.php" method="POST">
                    <input type="hidden" name="item" value="<?= $item ?>">
                    <input type="submit" class="buy-button" value="Comprar <?= ucfirst($item) ?>">
                </form>
            <?php else: ?>
                <p class="out-of-stock">Producto agotado</p>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
</body>
</html>
