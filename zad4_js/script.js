// Numer indeksu: 77433 

document.addEventListener("DOMContentLoaded", function() {
    
    // Zmiana motywu poprzez zmianę pliku CSS
    const themeBtn = document.getElementById("themeBtn");
    const themeStyle = document.getElementById("theme-style");

    themeBtn.addEventListener("click", function() {
        // Sprawdzamy, jaki plik CSS jest obecnie podpięty
        if (themeStyle.getAttribute("href") === "green.css") {
            // Zmieniamy na czerwony
            themeStyle.setAttribute("href", "red.css");
            themeBtn.textContent = "Zmień na zielony motyw";
        } else {
            // Wracamy do zielonego
            themeStyle.setAttribute("href", "green.css");
            themeBtn.textContent = "Zmień na czerwony motyw";
        }
    });

    // Ukrywanie i pokazywanie sekcji Doświadczenie
    const toggleBtn = document.getElementById("toggleBtn");
    const doswiadczenieTresc = document.getElementById("doswiadczenie-tresc");

    toggleBtn.addEventListener("click", function() {
        // Zmiana stylu display na "none" lub włącz go z powrotem
        if (doswiadczenieTresc.style.display === "none") {
            doswiadczenieTresc.style.display = "block";
        } else {
            doswiadczenieTresc.style.display = "none";
        }
    });

});
