<?php
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

// Check if the question is provided via a POST request
if (isset($_POST['question'])) {
    $question = $_POST['question'];

    // SQL query to retrieve the answer based on the provided question
    $sql = "SELECT answer FROM solved_sudokus WHERE question = ?";

    // Prepare the SQL statement
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $question);

    // Execute the query
    $stmt->execute();

    // Bind the result
    $stmt->bind_result($answer);

    // Fetch the result
    $stmt->fetch();

    // Close the prepared statement
    $stmt->close();

    if ($answer) {
        // Question found; return the answer as JSON
        echo json_encode(array("answer" => $answer));
    } else {
        // Question not found; return a JSON error response
        echo json_encode(array("error" => "not found"));
    }
    
} else {
    // Question not provided in the request
    echo "Question not provided";
}

// Close the database connection
$conn->close();
?>
