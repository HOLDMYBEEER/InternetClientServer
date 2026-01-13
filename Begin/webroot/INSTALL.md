\# Server Konfiguration \& Installation



Um die Seite lokal laufen zu lassen, wurde der Apache Server wie folgt konfiguriert:



\## 1. DocumentRoot (in httpd.conf)

Der DocumentRoot muss auf den Ordner webroot zeigen.

Beispiel (mein lokaler Pfad):

DocumentRoot C:/MeinProjekt/InternetClientServer/Begin/webroot



<Directory C:/MeinProjekt/InternetClientServer/Begin/webroot>

&nbsp;   AllowOverride All

&nbsp;   Require all granted

</Directory>



## 2. Projekt-Konfiguration (.htaccess)

Die anderen Servereinstellungen (Charset und Error-Pages) befinden sich in der Datei .htaccess in webroot.

