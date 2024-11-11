document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to /monitor if login is successful
        window.location.href = "/monitor";
      } else {
        // Show an alert if there’s an error
        alert(result.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again later.");
    }
  });