document.addEventListener("DOMContentLoaded", () => {
    /* --- Theme Toggle Logic --- */
    const btn = document.getElementById("theme-toggle");
    const body = document.body;
    
    const updateBtnText = () => { 
        if (btn) {
            btn.textContent = body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode"; 
        }
    };

    // Check local storage on load
    if (localStorage.getItem("theme") === "light") { 
        body.classList.remove("dark-mode"); 
    }
    
    updateBtnText();

    if (btn) {
        btn.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
            updateBtnText();
        });
    }

    /* --- Web3Forms AJAX Submission --- */
    const form = document.getElementById('form');
    const result = document.getElementById('result');

    // Only run this if the form exists on the current page (Contact Page)
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            result.innerHTML = "Sending...";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Message sent successfully!";
                    result.style.color = "green";
                    form.reset();
                } else {
                    result.innerHTML = json.message;
                    result.style.color = "red";
                }
            })
            .catch(error => {
                result.innerHTML = "Something went wrong!";
                result.style.color = "red";
            });
        });
    }
});