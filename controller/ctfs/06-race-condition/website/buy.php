<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['item'])) {
    $item = $_POST['item'];
    $file = 'stock.json';
    $flagFile = __DIR__ . '/flag.txt';


    $stocks = json_decode(file_get_contents($file), true);


    usleep(rand(100000, 300000));

    if (!isset($stocks[$item])) {
        echo "Producto inválido.";
        exit;
    }


    $stocks[$item] = $stocks[$item] - 1;
    file_put_contents($file, json_encode($stocks));
    echo "Has comprado: $item<br>";

    if ($stocks[$item] < 0 && file_exists($flagFile)) {
        $flag = trim(file_get_contents($flagFile));
        echo "<pre>🚩 $flag</pre>";
    }

    echo '<a href="/">Volver a la tienda</a>';
} else {
    header("Location: /");
}

