document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let reset = document.querySelector(".rstbtn");

    let xturn = true;
    let xmoves = [];
    let ymoves = [];

    const winningCombinations = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7']
    ];

    const winnerPopup = document.getElementById("winnerPopup");
    const winnerText = document.getElementById("winnerText");
    const closeBtn = document.querySelector(".close-btn");

    function checkWinner(moves) {
        return winningCombinations.some(combination => 
            combination.every(id => moves.includes(id))
        );
    }

    function showPopup(winner) {
        winnerText.innerText = `${winner} Wins!`;
        winnerPopup.classList.add("show");
    }

    function closePopup() {
        winnerPopup.classList.remove("show");
        setTimeout(() => {
            winnerPopup.style.display = "none";
        }, 300); // Match this duration with CSS transition
    }

    closeBtn.addEventListener("click", closePopup);

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            console.log("CLICK!", box.id);
            if (xturn) {
                xturn = false;
                box.innerText = "X";
                xmoves.push(box.id);
                console.log("X's Moves:", xmoves);

                if (checkWinner(xmoves)) {
                    showPopup("X");
                    boxes.forEach(box => box.disabled = true); // Disable all boxes
                }
            } else {
                xturn = true;
                box.innerText = "O";
                ymoves.push(box.id);
                console.log("Y's Moves:", ymoves);

                if (checkWinner(ymoves)) {
                    showPopup("O");
                    boxes.forEach(box => box.disabled = true); // Disable all boxes
                }
            }
            box.disabled = true;
        });
    });

    reset.addEventListener("click", () => {
        // Reset the game
        xturn = true;
        xmoves = [];
        ymoves = [];
        boxes.forEach(box => {
            box.innerText = "";
            box.disabled = false;
        });
        closePopup(); // Close the popup on reset
    });
});
