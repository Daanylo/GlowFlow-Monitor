<?php
    $activePage = 'Contact';
?>


<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../img/favicon.png">
    <title>GlowFlow • Contact</title>
    <link rel="stylesheet" href="../css/style.css">
    <script src="../java/main.js"></script>
</head>
<body>
    <?php include 'navbar.php'; ?>
    <?php include 'pageup.php'; ?>

    <div class="contactPageContainer">
        <div class="contact-form-section">
            <h2>Contactformulier</h2>
            <form action="verzend_formulier.php" method="post" class="contact-form">
                <div class="ContactFormName">
                    <input type="text" id="subject" name="subject" required placeholder="First name" />
                    <input type="text" id="subject" name="subject" required placeholder="Last name" />
                </div>
                
                <input type="email" id="email" name="email" required placeholder="Email" />
                <input type="tel" id="phone" name="phone" required placeholder="Phone number" pattern="[0-9]{10}" title="Voer een geldig telefoonnummer in." />

                <textarea id="message" name="message" rows="4" maxlength="500" placeholder="Message" required></textarea>

                <button type="submit">Send</button>
            </form>
        </div>

        <div class="faq-section">
            <h2>FAQ</h2>

            <div class="faq-item">
                <input type="checkbox" id="faq1" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq1">
                    <div class="Faq-QuestionContainer">
                        Wat is GlowFlow en hoe werkt het systeem?
                    </div>
                </label>
                <div id="faq1-content" class="faq-answer">
                    GlowFlow is een innovatief straatverlichtingssysteem dat werkt op basis van bewegingssensoren. Het activeert de verlichting alleen als er beweging wordt gedetecteerd, wat energie bespaart en lichtvervuiling vermindert.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq2" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq2">
                    <div class="Faq-QuestionContainer">
                        Hoeveel energie kan ik besparen met GlowFlow?
                    </div>
                </label>
                <div id="faq2-content" class="faq-answer">
                    Het systeem kan het energieverbruik met 70-90% verlagen, afhankelijk van de drukte en het aantal uren dat de verlichting normaal gesproken aan zou staan.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq3" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq3">
                    <div class="Faq-QuestionContainer">
                        Waarom zou ik GlowFlow kiezen in plaats van een standaard LED-verlichtingssysteem?
                    </div>
                </label>
                <div id="faq3-content" class="faq-answer">
                    Hoewel LED-lampen energiezuinig zijn, blijven ze vaak onnodig aan. GlowFlow gaat een stap verder door de verlichting alleen aan te zetten bij daadwerkelijke beweging, wat nog meer energie bespaart.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq4" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq4">
                    <div class="Faq-QuestionContainer">
                        Kan GlowFlow worden geïnstalleerd op bestaande straatverlichting?
                    </div>
                </label>
                <div id="faq4-content" class="faq-answer">
                    Ja, GlowFlow is ontworpen om compatibel te zijn met bestaande verlichtingsinfrastructuren, wat installatie eenvoudiger en kosteneffectiever maakt.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq5" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq5">
                    <div class="Faq-QuestionContainer">
                        Welke voordelen biedt GlowFlow op het gebied van duurzaamheid?
                    </div>
                </label>
                <div id="faq5-content" class="faq-answer">
                    Door minder energie te verbruiken, draagt GlowFlow bij aan een lagere CO₂-uitstoot en een vermindering van lichtvervuiling. Dit bevordert de leefbaarheid en helpt gemeenten en bedrijven bij hun duurzaamheidsdoelen.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq6" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq6">
                    <div class="Faq-QuestionContainer">
                        Voor welke locaties is GlowFlow het meest geschikt?
                    </div>
                </label>
                <div id="faq6-content" class="faq-answer">
                    GlowFlow is ideaal voor locaties met wisselende drukte, zoals woonwijken, fietspaden, parkeerterreinen en industrieterreinen waar het licht vaak onnodig blijft branden.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq7" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq7">
                    <div class="Faq-QuestionContainer">
                        Hoe verloopt het onderhoud van het GlowFlow-systeem?
                    </div>
                </label>
                <div id="faq7-content" class="faq-answer">
                    Het systeem vereist minimaal onderhoud en biedt via het dashboard een overzicht van de onderhoudsstatus. Sensoren en lampen worden regelmatig gecontroleerd en kunnen gemakkelijk worden vervangen.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq8" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq8">
                    <div class="Faq-QuestionContainer">
                        Hoe kan ik de instellingen aanpassen, zoals gevoeligheid en tijdschema’s?
                    </div>
                </label>
                <div id="faq8-content" class="faq-answer">
                    Via de GlowFlow-webapplicatie kan de beheerder de gevoeligheid van de bewegingssensoren en de tijdsinstellingen eenvoudig aanpassen. Dit kan op afstand via een beveiligd dashboard.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq9" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq9">
                    <div class="Faq-QuestionContainer">
                        Hoe veilig is het systeem tegen inbraak of hacking?
                    </div>
                </label>
                <div id="faq9-content" class="faq-answer">
                    GlowFlow maakt gebruik van geavanceerde beveiligingsmaatregelen, zoals encryptie en authenticatie. Dit voorkomt ongeoorloofde toegang en beschermt de gegevens van het systeem.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq10" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq10">
                    <div class="Faq-QuestionContainer">
                        Is GlowFlow geschikt voor afgelegen of landelijke gebieden?
                    </div>
                </label>
                <div id="faq10-content" class="faq-answer">
                    Ja, GlowFlow kan ook in minder drukbevolkte gebieden worden ingezet. De bewegingssensoren activeren verlichting wanneer dat nodig is, wat ideaal is voor locaties waar weinig verkeer is.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq11" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq11">
                    <div class="Faq-QuestionContainer">
                        Hoeveel kost de installatie en wat zijn de terugverdientijden?
                    </div>
                </label>
                <div id="faq11-content" class="faq-answer">
                    De kosten variëren per locatie en schaalgrootte, maar dankzij de aanzienlijke energiebesparing verdient GlowFlow zichzelf meestal binnen enkele jaren terug.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq12" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq12">
                    <div class="Faq-QuestionContainer">
                        Zijn er subsidies beschikbaar voor de installatie van GlowFlow?
                    </div>
                </label>
                <div id="faq12-content" class="faq-answer">
                    Verschillende overheden bieden subsidies voor energiebesparende projecten. Wij helpen graag bij het zoeken naar subsidiemogelijkheden voor de installatie van GlowFlow.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq13" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq13">
                    <div class="Faq-QuestionContainer">
                        Wat gebeurt er als de sensor niet werkt of de verbinding wordt verbroken?
                    </div>
                </label>
                <div id="faq13-content" class="faq-answer">
                    Als een sensor of verbinding tijdelijk uitvalt, schakelt GlowFlow over naar een vooraf ingesteld verlichtingsschema om te zorgen dat de verlichting in noodsituaties blijft werken.
                </div>
            </div>
            <div class="faq-item">
                <input type="checkbox" id="faq14" class="faq-checkbox" onclick="toggleDropdown(this)">
                <label class="faq-question" for="faq14">
                    <div class="Faq-QuestionContainer">
                        Hoe kan ik GlowFlow aanschaffen en implementeren?
                    </div>
                </label>
                <div id="faq14-content" class="faq-answer">
                    Neem contact met ons op via het contactformulier op de website voor een consultatie. We helpen graag bij het plannen van een implementatiestrategie die het best bij uw locatie en doelen past.
                </div>
            </div>
        </div>
    </div>
    
    <?php include 'footer.php'; ?>
</body>
</html>