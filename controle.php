<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Database connection details
    $host = "localhost";
    $user = "root";
    $password = "";
    $database = "sudokudb";

    // Establish a connection to the MySQL database
    $conn = new mysqli($host, $user, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Retrieve data from the JavaScript POST request
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);

    $question = $user['question'];
    $answer = $user['answer'];

    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO `solved_sudokus` (`question`, `answer`, `date`) VALUES (?, ?, current_timestamp())");
    $stmt->bind_param("ss", $question, $answer);

    // Set the values of the parameters and execute the statement
    $question = $user['question'];
    $answer = $user['answer'];
    
    if ($stmt->execute()) {
        $response = array("message" => "Data inserted successfully");
        echo json_encode($response);
    } else {
        $response = array("message" => "Error: " . $stmt->error);
        echo json_encode($response);
    }

    $stmt->close();
    $conn->close();
}
?>
