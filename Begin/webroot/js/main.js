// Nur zum Test
//alert("Willkommen");

// Notiz für mich zum Lernen:
// Es wird gewartet, bis die Seite komplett geladen ist, bevor Skript ausgeführt wird.
// Das verhindert Fehler, falls HTML-Elemente noch nicht da(geladen) sind.
document.addEventListener("DOMContentLoaded", function() {

  /* ==============================================
     ESA 2: Teil 1 Diashow
     3 Fotos im Wechsel von 2 Sekunden
     ============================================== */
  
  // 1. Das Bild-Element ansprechen und holen
  var slideshowImage = document.getElementById("slideshow");

  // Zur Sicherheit prüfen, ob Bild auf der Seite existiert
  if (slideshowImage) {
    // 2. Die Pfade zu den Bildern in einem Array speichern
    var images = [
      "./images/biene1.jpg",
      "./images/biene2.jpg",
      "./images/biene3.jpg"
    ];

    var currentImageIndex = 0; // Startet beim ersten Bild weil Index 0

    // 3. Funktion, die das Bild wechselt
    function changeImage() {
      // Index erhöhen
      currentImageIndex++;

      // Wenn am Ende angekommen, fängt er wieder von vorne an
      if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
      }

      // Das src-Attribut des HTML-Bildes ändern
      slideshowImage.src = images[currentImageIndex];
    }

    // 4. Wechsel alle 2000 Millisekunden (2 Sekunden)
    setInterval(changeImage, 2000);
  }


  /* ==============================================
     ESA 2: Teil 2 Kommentare einblenden
     Nach Klick auf Link
     ============================================== */

  // Alle Links holen, die Klasse 'comment-link' haben
  var commentLinks = document.querySelectorAll(".comment-link");

  // Für jeden Link eine "Klick-Überwachung" hinzufügen
  commentLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
      event.preventDefault(); // Verhindert, dass der Browser beim Klick nach oben springt

      // Suche das nächste Element mit der Klasse "comment-section"
      // "this" ist der Link, der geklickt wurde.
      // parentNode ist das <p> um den Link.
      // nextElementSibling ist das Element danach (die comment-section).
      var commentSection = this.parentNode.nextElementSibling;

      // Klasse "visible" an- oder ausschalten
      // In CSS haben ich: .comment-section.visible { display: block; }
      if (commentSection.classList.contains("visible")) {
        commentSection.classList.remove("visible");
        this.innerText = "Kommentar schreiben"; // Text ändern
      } else {
        commentSection.classList.add("visible");
        this.innerText = "Kommentar verbergen"; // Text ändern
      }
    });
  });


  /* ==============================================
     ESA 2: Teil 3 Buchstaben-Zähler
     500 Zeichen Limit und Restanzeige
     ============================================== */

  // Alle Textareas auf der Seite holen
  var textareas = document.querySelectorAll("textarea");
  var maxChars = 500; // Das Limit

  // Für jede Textarea...
  textareas.forEach(function(textarea) {
    
    // ... auf jede Eingabe lauschen (Tippen, Löschen, Einfügen)
    textarea.addEventListener("input", function() {
      
      // Wie lang ist der aktuelle Text?
      var currentLength = this.value.length;
      
      // Wie viele Zeichen sind noch übrig?
      var remaining = maxChars - currentLength;

      // Das Ausgabefeld finden (1 Element nach der Textarea)
      var counterDisplay = this.nextElementSibling;

      // Text aktualisieren
      counterDisplay.innerText = remaining + " Zeichen übrig";

      // Spielerei, Farbe ändern, wenn Buchstaben ausgehen
      if (remaining < 50) {
        counterDisplay.style.color = "red";
      } else {
        counterDisplay.style.color = "#666";
      }
    });
  });

  /* ==============================================
     Aufgabe 3 - Woche 9 (b): AJAX / JSON
     Daten nachladen ohne Seiten-Reload
     ============================================== */

  var loadBtn = document.getElementById("load-facts-btn");
  var wissenBereich = document.getElementById("wissen-bereich");

  // Prüfen, ob der Button existiert (damit es auf anderen Seiten keine Fehler gibt)
  if (loadBtn) {
    loadBtn.addEventListener("click", function() {
      
      // Feedback für den User: Button kurz deaktivieren und Text ändern
      loadBtn.innerText = "Lade Daten...";
      loadBtn.disabled = true;

      // 1. Die Anfrage an den Server senden (fetch)
      fetch('bienen_fakten.json')
        .then(function(response) {
          // 2. Prüfen, ob die Datei gefunden wurde (Status 200 OK)
          if (!response.ok) {
            throw new Error("Netzwerk-Fehler: " + response.status);
          }
          // 3. Antwort als JSON interpretieren
          return response.json();
        })
        .then(function(data) {
          // 4. Die Daten verarbeiten
          
          // Bereich leeren (damit wir nicht immer mehr anhängen, falls man mehrmals klickt)
          // Wenn du willst, dass sie sich stapeln, entferne diese Zeile:
          wissenBereich.innerHTML = ""; 

          // Durch die Fakten-Liste aus dem JSON laufen
          data.fakten.forEach(function(fakt) {
            
            // Neue HTML-Elemente bauen
            var div = document.createElement("div");
            div.className = "fakt-box"; // Klasse für CSS
            
            var h3 = document.createElement("h3");
            h3.innerText = fakt.titel;
            
            var p = document.createElement("p");
            p.innerText = fakt.text;
            
            // Zusammenfügen
            div.appendChild(h3);
            div.appendChild(p);
            
            // In die Seite einfügen
            wissenBereich.appendChild(div);
          });

          // Button wieder normal machen
          loadBtn.innerText = "Wissen aktualisiert!";
          loadBtn.disabled = false;
        })
        .catch(function(error) {
          // Fehlerbehandlung, falls z.B. der Server nicht läuft
          console.error("Fehler beim Laden:", error);
          wissenBereich.innerHTML = "<p style='color:red;'>Fehler beim Laden der Daten. Läuft der Server?</p>";
          loadBtn.innerText = "Fehler";
          loadBtn.disabled = false;
        });
    });
  }
});