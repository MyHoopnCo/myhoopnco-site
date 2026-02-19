const ctaForm = document.getElementById("cta-form");
const message = document.getElementById("message");

ctaForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    message.innerText = "Please enter a valid email.";
    message.style.color = "red";
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbwXBm62VWog2tXTAidiv_hWTtTHTHbfeoBsnKEcB-NFCyBbbQJWbWWbbeGuCVAyxHYN/exec", {
    method: "POST",
    body: JSON.stringify({ email }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.result === "success") {
      message.innerText = "You're on the list!";
      message.style.color = "green";
      ctaForm.reset();
    } 
    else if (data.result === "duplicate") {
      message.innerText = "You're already on the list.";
      message.style.color = "orange";
    } 
    else {
      message.innerText = "Something went wrong.";
      message.style.color = "red";
    }
  })
  .catch(() => {
    message.innerText = "Server error. Try again.";
    message.style.color = "red";
  });
});