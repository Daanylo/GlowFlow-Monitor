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

      const result = await response.json();

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      // Wacht tot de minimale laadtijd is verstreken
      await new Promise(resolve => setTimeout(resolve, remainingTime));

      if (result.success) {
          window.location.href = "/monitor"; // Succesvolle login
      } else {
          alert(result.message);
      }
  } catch (error) {
      console.error("Error:", error);
      alert("Een fout is opgetreden. Probeer het later opnieuw.");
  } finally {
      // Herstel UI na afronding
      loader.style.display = "none";
      pageOverlay.style.display = "none"; // Verberg de overlay
      loginButton.style.display = "block";
  }

});
