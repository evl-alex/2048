<?php
include 'config.php';


?>

<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>2048</title>
    <link href="style.css" type="text/css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <section class="header">
            <div class="welcome"><h2>Hello, <span id="userName">User</span></h2></div>
            <div class="controls">
                <button name="newGame"><span>new game</span></button>
                <button name="saveGame"><span>save</span></button>
                <button name="loadGame"><span>load</span></button>
            </div>
            <div class="scores">
                <div class="highscore">
                    <p>Score</p>
                    <p id="currentScore" class="score">0</p>
                </div>
                <div class="highscore">
                    <p>Your best</p>
                    <p id="personalBestScore" class="score">0</p>
                </div>
                <div class="highscore">
                    <p>Best known</p>
                    <p id="bestScore" class="score">0</p>
                </div>
            </div>
        </section>
        <section class="playField">
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td class="n2"></td>
                        <td class="n4"></td>
                        <td class="n8"></td>
                    </tr>
                    <tr>
                        <td class="n16"></td>
                        <td class="n32"></td>
                        <td class="n64"></td>
                        <td class="n128"></td>
                    </tr>
                    <tr>
                        <td class="n256"></td>
                        <td class="n1024"></td>
                        <td class="n2048"></td>
                        <td class="n512"></td>
                    </tr>
                    <tr>
                        <td class="n512"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
    <script src="js.js"></script>
</body>
</html>