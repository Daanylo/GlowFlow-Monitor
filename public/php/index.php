<?php
    $activePage = 'Home';
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../img/favicon.png">
    <title>GlowFlow • Home</title>
    <link rel="stylesheet" href="../css/style.css">
    <script src="../java/main.js"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
</head>
<body>
    <?php include 'navbar.php'; ?>
    <?php include 'pageup.php'; ?>

    <div class="swiper mySwiper">
        <div class="swiper-wrapper">
        <div class="swiper-slide">
            <div class="SwiperImageContainer">
                <img src="../img/Swiperimg.jpg" alt="" class="SwiperImage">
                <div class="SwiperImageGradient"></div>
            </div>
        </div>
        <div class="swiper-slide">
            <div class="SwiperImageContainer">
                <img src="../img/HomeImage.jpg" alt="" class="SwiperImage">
                <div class="SwiperImageGradient"></div>
            </div>
        </div>
        <div class="swiper-slide">
            <div class="SwiperImageContainer">
                <img src="../img/swiperImage.jpg" alt="" class="SwiperImage">
                <div class="SwiperImageGradient"></div>
            </div>
        </div>
        </div>
        <div class="HomeImageText">
            <h2 class="DiscoverText">Discover</h2>
            <h2 class="GlowFlowText">GlowFlow</h2>
            <h3>Duurzame, slimme straatverlichting die energie bespaart door enkel te verlichten wanneer nodig</h3>
            <a href="contact.php" class="HomeimageButton">Contact us</a>
            <a href="product.php" class="HomeimageButton">Our idea</a>
        </div>
    </div>
        <div class="swiper-pagination"></div>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <script>
        var swiper = new Swiper(".mySwiper", {
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        });
    </script>

    <div class="CountingNumbers">
        <div class="OutsideContainer">
            <img src="../img/projects.png" alt="" class="CountingNumbersimage">
            <div class="CountingNumberContainer">
                <h2 data-target="800" class="CountingNumber">0</h2>
                <h3>+</h3>
            </div>
            <h3 class="NumbersKind">Projects</h3>
        </div>
        <div>
            <img src="../img/best.png" alt="" class="CountingNumbersimage">
            <div class="CountingNumberContainer">
                <h3>#</h3>
                <h2 data-target="1" class="CountingNumber">0</h2>
            </div>
            <h3 class="NumbersKind">Europe</h3>
        </div>
        <div class="OutsideContainer">
            <img src="../img/worldwide.png" alt="" class="CountingNumbersimage">
            <div class="CountingNumberContainer">
                <h2 data-target="20" class="CountingNumber">0</h2>
                <h3>+</h3>
            </div>
            <h3 class="NumbersKind">Countries</h3>
        </div>
    </div>

    <div class="ImagesContainer">
        <img src="../img/ImageTwo.svg" alt="">
        <img src="../img/image.svg" alt="">
    </div>

    <div class="ProductHomeContainer">
        <img src="../img/SensorImg.png" alt="" class="SensorImage">
        <p>GlowFlow is ontworpen als een slimme, energie-efficiënte oplossing voor straatverlichting. Door innovatieve technologie zoals bewegingssensoren en energiezuinige LED-verlichting in te zetten, maakt GlowFlow het mogelijk om straatlampen alleen te activeren wanneer er daadwerkelijk beweging wordt gedetecteerd. Deze technologie biedt aanzienlijke voordelen op het gebied van energiebesparing, duurzaamheid, en gebruiksvriendelijkheid.</p>
        <p>De GlowFlow-lampen zijn uitgerust met geavanceerde tijdsgebonden bewegingssensoren. Deze sensoren detecteren beweging van voetgangers, fietsers en voertuigen binnen een bepaalde radius. Wanneer beweging wordt gedetecteerd, stuurt de sensor een signaal naar de LED-verlichting, die vervolgens inschakelt om de weg veilig te verlichten.</p>
        <a href="product.php" class="MoreInfoButton">Details</a>
    </div>

    <div class="faq-section">
        <h2>FAQ</h2>
        <div class="faq-item">
            <input type="checkbox" id="faq1" class="faq-checkbox" onclick="toggleDropdown(this)">
            <label class="faq-question" for="faq1">
                Wat is GlowFlow en hoe werkt het systeem?
            </label>
            <div id="faq1-content" class="faq-answer">
                GlowFlow is een innovatief straatverlichtingssysteem dat werkt op basis van bewegingssensoren. Het activeert de verlichting alleen als er beweging wordt gedetecteerd, wat energie bespaart en lichtvervuiling vermindert.
            </div>
        </div>
        <div class="faq-item">
            <input type="checkbox" id="faq2" class="faq-checkbox" onclick="toggleDropdown(this)">
            <label class="faq-question" for="faq2">
                Hoeveel energie kan ik besparen met GlowFlow?
            </label>
            <div id="faq2-content" class="faq-answer">
                Het systeem kan het energieverbruik met 70-90% verlagen, afhankelijk van de drukte en het aantal uren dat de verlichting normaal gesproken aan zou staan.
            </div>
        </div>
        <div class="faq-item">
            <input type="checkbox" id="faq3" class="faq-checkbox" onclick="toggleDropdown(this)">
            <label class="faq-question" for="faq3">
                Waarom zou ik GlowFlow kiezen in plaats van een standaard LED-verlichtingssysteem?
            </label>
            <div id="faq3-content" class="faq-answer">
                Hoewel LED-lampen energiezuinig zijn, blijven ze vaak onnodig aan. GlowFlow gaat een stap verder door de verlichting alleen aan te zetten bij daadwerkelijke beweging, wat nog meer energie bespaart.
            </div>
        </div>
        <div class="faq-item">
            <input type="checkbox" id="faq4" class="faq-checkbox" onclick="toggleDropdown(this)">
            <label class="faq-question" for="faq4">
                Kan GlowFlow worden geïnstalleerd op bestaande straatverlichting?
            </label>
            <div id="faq4-content" class="faq-answer">
                Ja, GlowFlow is ontworpen om compatibel te zijn met bestaande verlichtingsinfrastructuren, wat installatie eenvoudiger en kosteneffectiever maakt.
            </div>
        </div>
        <div class="faq-item">
            <input type="checkbox" id="faq5" class="faq-checkbox" onclick="toggleDropdown(this)">
            <label class="faq-question" for="faq5">
                Kan GlowFlow worden geïnstalleerd op bestaande straatverlichting?
            </label>
            <div id="faq5-content" class="faq-answer">
                Ja, GlowFlow is ontworpen om compatibel te zijn met bestaande verlichtingsinfrastructuren, wat installatie eenvoudiger en kosteneffectiever maakt.
            </div>
        </div>
    </div>
    <?php include 'footer.php'; ?>
</body>
</html>
