<?php
$message = '';

if (isset($_FILES['file'])) {
    $uploadDir = 'uploads/';
    $filename = basename($_FILES['file']['name']);
    $uploadFile = $uploadDir . $filename;


        if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
            $message = "Archivo subido con éxito: <a href='$uploadFile' target='_blank'>$uploadFile</a>";
        } else {
            $message = "¡Error al subir el archivo!";
        }

} else {
    $message = "No se ha enviado ningún archivo.";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Subida de Archivo - ProjectDrive</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 2em;
            background-color: #f9f9f9;
            color: #333;
        }
        .container {
            background: #fff;
            padding: 2em;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            max-width: 500px;
            margin: auto;
            text-align: center;
        }
        a.button {
            display: inline-block;
            margin-top: 1.5em;
            padding: 0.7em 1.5em;
            background-color: #2e86de;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }
        a.button:hover {
            background-color: #1b4f72;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2><?php echo $message; ?></h2>
        <a href="index.php" class="button">Volver a ProjectDrive</a>
    </div>
</body>
</html>
