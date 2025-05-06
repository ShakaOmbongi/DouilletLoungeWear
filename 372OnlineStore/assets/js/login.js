document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    if (params.get("signup") === "success") {
      const successBox = document.getElementById("signup-success");
      successBox.classList.remove("d-none");
  
      setTimeout(() => {
        successBox.classList.add("d-none");
      }, 5000);
    }
  });
  