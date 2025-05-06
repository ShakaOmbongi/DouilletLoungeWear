document.addEventListener("DOMContentLoaded", function () {
    const signOutBtn = document.getElementById("sign-out");
    if (signOutBtn) {
      signOutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        fetch('/users/logout', { method: 'POST' })
          .then(res => {
            if (res.redirected) {
              window.location.href = res.url;
            } else {
              alert("Failed to sign out.");
            }
          })
          .catch(err => console.error("Logout error:", err));
      });
    }
  });
  