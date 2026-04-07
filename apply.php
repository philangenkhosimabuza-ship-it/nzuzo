<?php


header('Content-Type: application/json');
echo json_encode(["status" => "success", "message" => "Application received"]);



error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli("localhost", "root", "", "nzuza_careers");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $fullname = $_POST['fullname'] ?? '';
    $email    = $_POST['email'] ?? '';
    $phone    = $_POST['phone'] ?? '';
    $position = $_POST['position'] ?? '';
    $message  = $_POST['message'] ?? '';

    $targetDir = "uploads/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    if (isset($_FILES["cv"]) && $_FILES["cv"]["error"] == 0) {

        $cvName = basename($_FILES["cv"]["name"]);
        $targetFile = $targetDir . time() . "_" . $cvName;

        if (move_uploaded_file($_FILES["cv"]["tmp_name"], $targetFile)) {

            $stmt = $conn->prepare(
                "INSERT INTO applications (full_name, email, phone, position, message, cv_file) 
                 VALUES (?, ?, ?, ?, ?, ?)"
            );

            $stmt->bind_param("ssssss", $fullname, $email, $phone, $position, $message, $targetFile);

            if ($stmt->execute()) {
                echo "Application submitted successfully!";
            } else {
                echo "Database Error: " . $stmt->error;
            }

            $stmt->close();

        } else {
            echo "Error moving uploaded file.";
        }

    } else {
        echo "File upload error.";
    }
}

$conn->close();
?>