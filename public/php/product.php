<?php
    $activePage = 'Product';
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <!-- test -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../img/favicon.png">
    <title>GlowFlow • Product</title>
    <link rel="stylesheet" href="../css/style.css">
    <script src="../java/main.js"></script>

    <style>
        .content { display: none; }
    </style>
</head>
<body>
    <?php include 'navbar.php'; ?>
    <?php include 'pageup.php'; ?>

    <div class="product-container">
        <h3 onclick="toggleContent('sensoren')">Bewegingssensoren<img src="../img/ArrowDown.png" alt="" class="ArrowDropdown"></h3>
        <div id="sensoren" class="content">
            <p>De GlowFlow-lampen zijn uitgerust met geavanceerde tijdsgebonden bewegingssensoren...</p>
        </div>

        <h3 onclick="toggleContent('led')">Energiezuinige LED-Verlichting<img src="../img/ArrowDown.png" alt="" class="ArrowDropdown"></h3>
        <div id="led" class="content">
            <p>De verlichting in GlowFlow bestaat uit LED-lampen die niet alleen energiezuinig zijn...</p>
        </div>

        <h3 onclick="toggleContent('werking')">Gedetailleerde Beschrijving van de Werking en Voordelen<img src="../img/ArrowDown.png" alt="" class="ArrowDropdown"></h3>
        <div id="werking" class="content">
            <p>GlowFlow is zo ontworpen dat de verlichting alleen actief is wanneer dat noodzakelijk is...</p>
        </div>

        <h3 onclick="toggleContent('voordelen')">Voordelen van GlowFlow<img src="../img/ArrowDown.png" alt="" class="ArrowDropdown"></h3>
        <div id="voordelen" class="content">
            <ul>
                <li><strong>Energiebesparing:</strong> Door het energieverbruik met wel 90% te verminderen...</li>
                <li><strong>Duurzaamheid:</strong> Minder energiegebruik betekent een lagere CO₂-uitstoot...</li>
                <li><strong>Minder Lichtvervuiling:</strong> Doordat de lampen alleen branden wanneer het nodig is...</li>
                <li><strong>Lange Levensduur en Lage Onderhoudskosten:</strong> De LED-verlichting en robuuste sensoren...</li>
            </ul>
        </div>

        <h2>Mogelijke Gebruiksscenario’s</h2>
        <div class="usage-scenarios">
            <ul>
                <li><strong>Voetgangers en Fietsers in Woonwijken:</strong> In rustige woonwijken detecteert GlowFlow beweging van voetgangers en fietsers, waardoor straatverlichting alleen brandt als iemand in de buurt is.</li>
                <li><strong>Parkeerterreinen:</strong> Ideaal voor parkeerterreinen waar lampen 's nachts vaak onnodig blijven branden.</li>
                <li><strong>Drukke Stadsstraten:</strong> In stadscentra kunnen GlowFlow-lampen tijdens piekuren continu branden en daarna alleen bij beweging.</li>
                <li><strong>Industrie- en Bedrijventerreinen:</strong> Verlichting activeert alleen wanneer er beweging is, wat energiebesparing en veiligheid bevordert.</li>
                <li><strong>Schoolcampussen en Sportvelden:</strong> Verlichting wordt geactiveerd bij aanwezigheid van studenten of sporters.</li>
                <li><strong>Openbare Parken:</strong> In parken verlicht GlowFlow paden alleen wanneer er wandelaars of joggers zijn.</li>
                <li><strong>Bushaltes en Transportplekken:</strong> Verlichting wordt geactiveerd wanneer passagiers wachten, vooral op afgelegen haltes.</li>
                <li><strong>Tunnels en Onderdoorgangen:</strong> Verlichting schakelt in bij detectie van beweging, wat energie en kosten bespaart.</li>
                <li><strong>Wandel- en Fietspaden in Natuurgebieden:</strong> Verlicht alleen de paden waar wandelaars of fietsers zich bevinden.</li>
                <li><strong>Ziekenhuis- en Zorgcampussen:</strong> Verlichting past zich automatisch aan op basis van activiteit.</li>
                <li><strong>Evenemententerreinen:</strong> Verlichting activeert tijdens gebruik en dimt buiten evenementtijden.</li>
                <li><strong>Snelwegen:</strong> Verlichting schakelt in bij verkeersactiviteit, ideaal voor afgelegen snelwegen.</li>
            </ul>
        </div>
    </div>

    <script>

    </script>

    <?php include 'footer.php'; ?>
</body>
</html>
