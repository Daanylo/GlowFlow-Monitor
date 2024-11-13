<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/footer.css">
</head>
<body>
    <footer>
        <div class="FooterLogoContainer">
            <img src="../img/logoWhite.png" alt="" class="FooterLogo">
        </div>
        <div class="FooterContentContainer">
            <div class="FooterQuickLinks">
                <h2 class="FooterH2">Quick links</h2>
                <a href="index.php" class="hyperlinksFooter <?php echo $activePage == 'Home' ? 'active' : ''; ?>">Home</a>
                <a href="aboutus.php" class="hyperlinksFooter <?php echo $activePage == 'About' ? 'active' : ''; ?>">About us</a>
                <a href="product.php" class="hyperlinksFooter <?php echo $activePage == 'Product' ? 'active' : ''; ?>">Our product</a>
                <a href="inlog.php">Register</a>
                <a href="contact.php" class="hyperlinksFooter <?php echo $activePage == 'Contact' ? 'active' : ''; ?>">Contact</a>
                <a href="manage.php" class="hyperlinksFooter <?php echo $activePage == 'Manage' ? 'active' : ''; ?>">Manage</a>
            </div>

            <div class="FooterContactContainer">
                <h2 class="FooterH2">Contact</h2>
                <h3>GlowFlow@nogwat.com</h3>
                <h3>Eindhoven</h3>
                <h3 class="PhoneNumber">+31 6 123 456 789</h3>
                <input type="text" placeholder="Email">
                <input type="text" placeholder="Message">
                <button class="SubmitButton">Submit</button>
            </div>
        </div>
        <div class="FooterBottomInfo">
            <div>
                <h2 class="FooterCopyright">Copyright © 2024 GlowFlow</h2>
            </div>
        </div>
    </footer>
</body>
</html>