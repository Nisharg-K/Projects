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

    const scorePopup = document.getElementById("scorePopup");
    const scoreMessage = document.getElementById("scoreMessage");
    const closeBtn = document.getElementById("closePopup");

    function checkWinner(moves) {
        return winningCombinations.some(combination => 
            combination.every(id => moves.includes(id))
        );
    }

    function showPopup(winner) {
        scoreMessage.innerText = `${winner} Wins!`;
        scorePopup.classList.add("show");
    }

    function closePopup() {
        scorePopup.classList.remove("show");
    }

    closeBtn.addEventListener("click", closePopup);

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (box.innerText === "") {
                if (xturn) {
                    box.innerText = "X";
                    xmoves.push(box.id);
                    if (checkWinner(xmoves)) {
                        showPopup("Player X");
                        boxes.forEach(box => box.disabled = true); // Disable all boxes
                    }
                    xturn = false;
                } else {
                    box.innerText = "O";
                    ymoves.push(box.id);
                    if (checkWinner(ymoves)) {
                        showPopup("Player O");
                        boxes.forEach(box => box.disabled = true); // Disable all boxes
                    }
                    xturn = true;
                }
                box.disabled = true;
            }
        });
    });

    reset.addEventListener("click", () => {
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
