// Numer indeksu: 77433 

document.addEventListener("DOMContentLoaded", function() {
    
    // Zmiana motywu 
    const themeBtn = document.getElementById("themeBtn");
    const themeStyle = document.getElementById("theme-style");

    themeBtn.addEventListener("click", function() {
        if (themeStyle.getAttribute("href") === "green.css") {
            themeStyle.setAttribute("href", "red.css");
            themeBtn.textContent = "Zmień na zielony motyw";
        } else {
            themeStyle.setAttribute("href", "green.css");
            themeBtn.textContent = "Zmień na czerwony motyw";
        }
    });

    // Ukrywanie sekcji
    const toggleBtn = document.getElementById("toggleBtn");
    const doswiadczenieTresc = document.getElementById("doswiadczenie-tresc");

    toggleBtn.addEventListener("click", function() {
        if (doswiadczenieTresc.style.display === "none") {
            doswiadczenieTresc.style.display = "block";
        } else {
            doswiadczenieTresc.style.display = "none";
        }
    });

    // Walidacja formularza
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function(e) {
        // Blokujemy domyślne wysłanie formularza 
        e.preventDefault();

        // Czyszczenie poprzednich błędów
        document.querySelectorAll(".error-msg").forEach(el => {
            el.style.display = "none";
            el.textContent = "";
        });
        document.querySelectorAll("input, textarea").forEach(el => el.classList.remove("input-error"));
        document.getElementById("form-success").style.display = "none";

        let isValid = true;

        // Pobranie wartości pól
        const imie = document.getElementById("imie");
        const nazwisko = document.getElementById("nazwisko");
        const email = document.getElementById("email");
        const wiadomosc = document.getElementById("wiadomosc");

        // Wyrażenia regularne
        const hasNumberRegex = /\d/; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Podstawowa walidacja email

        // Walidacja Imię
        if (imie.value.trim() === "") {
            showError(imie, "error-imie", "Pole Imię jest wymagane.");
            isValid = false;
        } else if (hasNumberRegex.test(imie.value)) {
            showError(imie, "error-imie", "Imię nie może zawierać cyfr.");
            isValid = false;
        }

        // Walidacja Nazwisko
        if (nazwisko.value.trim() === "") {
            showError(nazwisko, "error-nazwisko", "Pole Nazwisko jest wymagane.");
            isValid = false;
        } else if (hasNumberRegex.test(nazwisko.value)) {
            showError(nazwisko, "error-nazwisko", "Nazwisko nie może zawierać cyfr.");
            isValid = false;
        }

        // Walidacja E-mail
        if (email.value.trim() === "") {
            showError(email, "error-email", "Pole E-mail jest wymagane.");
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, "error-email", "Podaj poprawny adres e-mail (np. jan@kowalski.pl).");
            isValid = false;
        }

        // Walidacja Wiadomości
        if (wiadomosc.value.trim() === "") {
            showError(wiadomosc, "error-wiadomosc", "Pole Wiadomość jest wymagane.");
            isValid = false;
        }

        // Jeśli wszystko jest OK - pokaż sukces
        if (isValid) {
            document.getElementById("form-success").style.display = "block";
            contactForm.reset(); 
        }
    });

    // Funkcja pomocnicza do wyświetlania błędów
    function showError(inputElement, errorElementId, message) {
        inputElement.classList.add("input-error");
        const errorElement = document.getElementById(errorElementId);
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

});
