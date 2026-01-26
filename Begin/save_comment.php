<?php
/* Zusatzaufgabe Kommentare speichern mit PHP.
   Zweck: Formulardaten in einer JSON-Datei speichern.
*/

// Prüfung ob Formular abgeschickt wurde (Sicherheitsstandard)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Daten empfangen bzw holen
    // Text und en Artikelnamen aus dem Formular holen
    $kommentar_text = isset($_POST['mein_kommentar']) ? $_POST['mein_kommentar'] : '';
    $artikel_name   = isset($_POST['artikel_name']) ? $_POST['artikel_name'] : 'Unbekannt';

    // Validierung & Sicherheit 
    // trim() entfernt Leerzeichen am Anfang/Ende.
    // htmlspecialchars() verhindert Code-Injection, 
    // bzw. Einschleusung von bösen HTML/JS-Code.
    $kommentar_text = htmlspecialchars(trim($kommentar_text));
    $artikel_name   = htmlspecialchars(trim($artikel_name));

    // Nur speichern, wenn wirklich Text enthalten ist.
    if (!empty($kommentar_text)) {

        // Datei-Handling
        $datei_pfad = 'kommentare_daten.json';

        // Versuchen, die aktuelle Liste zu laden, falls sie schon existiert
        $aktuelle_daten = [];
        if (file_exists($datei_pfad)) {
            $json_inhalt = file_get_contents($datei_pfad);
            $aktuelle_daten = json_decode($json_inhalt, true); // true macht daraus ein Array
            
            // Falls die Datei leer oder kaputt war, starte mit leerem Array
            if (!is_array($aktuelle_daten)) {
                $aktuelle_daten = [];
            }
        }

        // Neuen Eintrag bauen
        $neuer_eintrag = [
            'artikel'   => $artikel_name,
            'text'      => $kommentar_text,
            'datum'     => date('d.m.Y H:i') // Aktuelles Datum und Uhrzeit
        ];

        // Den neuen Eintrag an die Liste anhängen
        $aktuelle_daten[] = $neuer_eintrag;

        // Zurück in JSON umwandeln und speichern
        // JSON_PRETTY_PRINT sorgt dafür, dass die Datei lesbar bleibt
        $neues_json = json_encode($aktuelle_daten, JSON_PRETTY_PRINT);
        
        // In die Datei schreiben
        file_put_contents($datei_pfad, $neues_json);
    }
    
    // 7. Nutzer zurück zur Startseite schicken damit er nicht auf einer weißen Seite landet
    header("Location: index.html");
    exit();

} else {
    // Falls jemand die Datei direkt aufruft ohne Formular
    echo "Fehler: Kein Formular gesendet.";
}
?>