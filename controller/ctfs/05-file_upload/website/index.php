<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>ProjectDrive – Gestión de Archivos</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 2em;
            background-color: #f9f9f9;
            color: #333;
        }
        h1 {
            color: #444;
            margin-bottom: 1.5em;
        }
        form {
            margin-bottom: 2em;
            padding: 1em;
            background: #fff;
            border: 1px solid #ddd;
            display: inline-block;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        input[type="file"] {
            margin-bottom: 1em;
            cursor: pointer;
        }
        input[type="submit"] {
            cursor: pointer;
            background-color: #2e86de;
            color: white;
            border: none;
            padding: 0.6em 1.2em;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }
        input[type="submit"]:hover {
            background-color: #1b4f72;
        }
        .gallery {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        .image {
            border: 1px solid #ccc;
            padding: 12px;
            background: #fff;
            width: 260px; /* más ancho */
            height: 280px; /* más alto */
            text-align: center;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .image img {
            max-width: 100%;
            max-height: 180px;
            margin-bottom: 1em;
            border-radius: 4px;
            object-fit: contain;
        }
        .image p {
            font-size: 1em;
            margin: 0;
            word-break: break-word;
            color: #2c3e50;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <h1>ProjectDrive – Gestión de Archivos</h1>

    <form action="upload.php" method="POST" enctype="multipart/form-data">
        <label>Selecciona una imagen o archivo:</label><br>
        <input type="file" name="file" required><br>
        <input type="submit" value="Subir archivo">
    </form>

    <div class="gallery">
        <?php
        $files = scandir('uploads');
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..' && $file !== '.htaccess') {
                $path = "uploads/$file";
                echo '<div class="image">';
                if (preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $file)) {
                    echo "<img src='$path' alt='$file'>";
                } else {
                    echo "<p>[Archivo]</p>";
                }
                echo "<p><a href='$path' target='_blank'>$file</a></p>";
                echo '</div>';
            }
        }
        ?>
    </div>
</body>
</html>
