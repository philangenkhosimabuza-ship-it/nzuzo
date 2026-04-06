<?php
// Database connection
$servername = "localhost";
$username   = "root";        // change to your DB username
$password   = "";            // change to your DB password
$dbname     = "nzuza_careers";  // change to your DB name

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect form data
$fullname = $_POST['fullname'];
$email    = $_POST['email'];
$phone    = $_POST['phone'];
$position = $_POST['position'];
$message  = $_POST['message'];

// Handle file upload
$targetDir = "uploads/";
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}
$cvName = basename($_FILES["cv"]["name"]);
$targetFile = $targetDir . time() . "_" . $cvName;

if (move_uploaded_file($_FILES["cv"]["tmp_name"], $targetFile)) {
    // Insert into database
    $sql = "INSERT INTO applications (fullname, email, phone, position, message, cv_path) 
            VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $fullname, $email, $phone, $position, $message, $targetFile);

    if ($stmt->execute()) {
        echo "Application submitted successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Error uploading CV.";
}

$conn->close();
?>