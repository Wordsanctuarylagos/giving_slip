document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("givingForm");
  const submitBtn = form.querySelector('button[type="submit"]');
  const confirmationMessage = document.getElementById("confirmationMessage");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwBjZshjDzE7FiQChaAlcVEaB8SqABvWVFgMlL5dXiVXxK-WTD66cqvBebsjg_3P0ZLUQ/exec"; // Replace with your actual Script ID

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const formData = new FormData(form);

    fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((response) => {
        if (response.includes("Success")) {
          confirmationMessage.style.display = "block";
          submitBtn.textContent = "Submitted ✅";
          form.reset();

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Giving Details";
            confirmationMessage.style.display = "none";
          }, 4000);
        } else {
          alert("Submission failed. Please try again.");
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Giving Details";
        }
      })
      .catch((error) => {
        alert("Submission failed. Please check your connection.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Giving Details";
      });
  });
});