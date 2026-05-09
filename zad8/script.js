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
        e.preventDefault();

        document.querySelectorAll(".error-msg").forEach(el => {
            el.style.display = "none";
            el.textContent = "";
        });
        document.querySelectorAll("input, textarea").forEach(el => el.classList.remove("input-error"));
        document.getElementById("form-success").style.display = "none";

        let isValid = true;

        const imie = document.getElementById("imie");
        const nazwisko = document.getElementById("nazwisko");
        const email = document.getElementById("email");
        const wiadomosc = document.getElementById("wiadomosc");

        const hasNumberRegex = /\d/; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        if (imie.value.trim() === "") {
            showError(imie, "error-imie", "Pole Imię jest wymagane.");
            isValid = false;
        } else if (hasNumberRegex.test(imie.value)) {
            showError(imie, "error-imie", "Imię nie może zawierać cyfr.");
            isValid = false;
        }

        if (nazwisko.value.trim() === "") {
            showError(nazwisko, "error-nazwisko", "Pole Nazwisko jest wymagane.");
            isValid = false;
        } else if (hasNumberRegex.test(nazwisko.value)) {
            showError(nazwisko, "error-nazwisko", "Nazwisko nie może zawierać cyfr.");
            isValid = false;
        }

        if (email.value.trim() === "") {
            showError(email, "error-email", "Pole E-mail jest wymagane.");
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, "error-email", "Podaj poprawny adres e-mail (np. jan@kowalski.pl).");
            isValid = false;
        }

        if (wiadomosc.value.trim() === "") {
            showError(wiadomosc, "error-wiadomosc", "Pole Wiadomość jest wymagane.");
            isValid = false;
        }

        // zad8 Wysłanie danych do backendu 
        if (isValid) {
            // Zbieramy dane z formularza do obiektu
            const formData = {
                imie: imie.value,
                nazwisko: nazwisko.value,
                email: email.value,
                wiadomosc: wiadomosc.value
            };

            const endpointURL = 'https://formspree.io/f/mvzlwlwq'; 

            // Zmiana tekstu przycisku na czas wysyłania 
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = "Wysyłanie...";

            // Wysłanie danych za pomocą fetch
            fetch(endpointURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    // Potwierdzenie poprawnego wysłania danych
                    const successMsg = document.getElementById("form-success");
                    successMsg.textContent = "Wiadomość została wysłana na serwer pomyślnie!";
                    successMsg.style.display = "block";
                    contactForm.reset(); 
                } else {
                    alert("Wystąpił błąd przy wysyłaniu formularza.");
                }
            })
            .catch(error => {
                console.error("Błąd połączenia z serwerem:", error);
                alert("Błąd połączenia z serwerem. Sprawdź konsolę.");
            })
            .finally(() => {
                submitBtn.textContent = "Wyślij wiadomość";
            });
        }
    });

    function showError(inputElement, errorElementId, message) {
        inputElement.classList.add("input-error");
        const errorElement = document.getElementById(errorElementId);
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    // Pobieranie danych z pliku JSON 
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Wystąpił problem z pobraniem pliku JSON.');
            }
            return response.json();
        })
        .then(data => {
            // Budowanie listy Umiejętności
            const umiejetnosciList = document.getElementById("umiejetnosci-list");
            data.umiejetnosci.forEach(umiejetnosc => {
                const li = document.createElement("li");
                li.textContent = umiejetnosc;
                umiejetnosciList.appendChild(li);
            });

            // Budowanie listy Projektów
            const projektyList = document.getElementById("projekty-list");
            data.projekty.forEach(projekt => {
                const li = document.createElement("li");
                // Używamy innerHTML, żeby renderować tagi <strong>
                li.innerHTML = `<strong>${projekt.tytul}</strong> - ${projekt.opis}`;
                projektyList.appendChild(li);
            });
        })
        .catch(error => console.error("Błąd fetch:", error));

    // Notatki
    const noteInput = document.getElementById('noteInput');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesList = document.getElementById('notesList');

    // Funkcja pobierająca dane z Local Storage
    function getNotes() {
        const notes = localStorage.getItem('mojeNotatki_Zadanie7');
        return notes ? JSON.parse(notes) : [];
    }

    // Funkcja zapisująca dane do Local Storage
    function saveNotes(notes) {
        localStorage.setItem('mojeNotatki_Zadanie7', JSON.stringify(notes));
    }

    // Funkcja renderująca listę notatek na stronie
    function renderNotes() {
        notesList.innerHTML = ''; 
        const notes = getNotes();
        
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.className = 'note-item';
            
            const span = document.createElement('span');
            span.textContent = note;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Usuń';
            deleteBtn.className = 'delete-btn';
            
            // Usunięcie po kliknięciu
            deleteBtn.addEventListener('click', function() {
                deleteNote(index);
            });
            
            li.appendChild(span);
            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    }

    // Dodanie nowej notatki po kliknięciu przycisku "Dodaj"
    addNoteBtn.addEventListener('click', function() {
        const newNote = noteInput.value.trim();
        if (newNote !== '') {
            const notes = getNotes();
            notes.push(newNote);    
            saveNotes(notes);       
            noteInput.value = '';   
            renderNotes();          
        }
    });

    // Funkcja usuwająca notatkę z tablicy
    function deleteNote(index) {
        const notes = getNotes();
        notes.splice(index, 1); 
        saveNotes(notes);
        renderNotes();
    }

    // Wywołanie renderowania notatek przy ładowaniu strony
    renderNotes();

});
