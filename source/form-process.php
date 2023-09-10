<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "jjeeteam@gmail.com";
    $subject = "JJEE Games Contact Form Submission";
    $name = $_POST["name"];
    $email = $_POST["email"];
    $msg_subject = $_POST["msg_subject"];
    $message = $_POST["message"];

    // Create the email message
    $email_message = "Name: " . $name . "\n";
    $email_message .= "Email: " . $email . "\n";
    $email_message .= "Subject: " . $msg_subject . "\n";
    $email_message .= "Message:\n" . $message;

    $headers = "From: " . $email;

    // Send the email
    if (mail($to, $subject, $email_message, $headers)) {
        echo "success"; // Send "success" back to your JavaScript function if the email was sent successfully
    } else {
        echo "error"; // Send "error" back to your JavaScript function if there was an issue sending the email
    }
} else {
    echo "Invalid request"; // Handle invalid requests
}
?>