<?php
    $activePage = 'Manage';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/luxon@2/build/global/luxon.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="page-wrapper">

      <?php include 'php/navbar.php'; ?>
      <?php include 'php/pageup.php'; ?>

    <div class="LoginLogoContainer">
      <img src="img/logoWhite.png" alt="" class="logo">
    </div>
    <div class="container">
        <div class="SubContainer">

            <form class="signin-form">
              <input type="text" id="username" name="username" placeholder="Username" required>
              <input type="password" id="password" name="password" placeholder="Password" required>

              <button type="submit">Sign in</button>
              <a href="#" class="forgot-password">Forgot password ?</a>
          </form>

          <div class="signup-link">
            <p>Don't have an account yet ? <a href="register.php">Sign up</a></p>
        </div>
    </div>
</div>

    <script src="login.js"></script>
</body>
</html>