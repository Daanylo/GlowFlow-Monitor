document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  const loader = document.querySelector(".loader");
  const loginButton = document.getElementById("login-button");
  const pageOverlay = document.getElementById("page-overlay");

  // Maak de loader en overlay zichtbaar
  loader.style.display = "block";
  pageOverlay.style.display = "block";

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const minLoadTime = 2500; // Minimaal 2 seconden laden
  const startTime = Date.now();
  try {
    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const contentType = response.headers.get("Content-Type");
    console.log("Response Content-Type:", contentType);

    if (!response.ok) {
        console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
        alert("Inloggen is mislukt. Controleer uw gegevens.");
        return;
    }

    // Probeer alleen te parsen als het JSON is
    if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        console.log("Parsed JSON:", result);

        if (result.success) {
            window.location.href = "/monitor";
        } else {
            alert(result.message);
        }
    } else {
        const responseText = await response.text();
        console.error("Non-JSON Response:", responseText);
        alert("Ongeldig antwoord van de server.");
    }
} catch (error) {
    console.error("Error:", error);
    alert("Een fout is opgetreden. Probeer het later opnieuw.");
}

});
