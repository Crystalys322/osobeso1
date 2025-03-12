document.addEventListener('DOMContentLoaded', () => {

    // Crear la lluvia de corazones
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '💖';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 2 + 2}s`;  // Duración aleatoria entre 2 y 4 segundos
        document.querySelector('.heart-rain').appendChild(heart);

        // Eliminar el corazón después de que termine la animación
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }

    // Generar corazones a intervalos aleatorios
    setInterval(createHeart, 300);
});







//CODIGO DE ANIMACIÓN DE LA IMAGEN 

document.addEventListener("DOMContentLoaded", function () {
    const puzzleContainer = document.getElementById("puzzle-container");
    const imagePath = "Imagenes/parejaplaya.jpg"; // Ruta de la imagen
    const gridSize = 3;
    const pieceSize = 100;

    let pieces = [];
    let selectedPiece = null;
    let movingPiece = null;
    let allFlipped = false;

    // Crear las piezas del rompecabezas
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const piece = document.createElement("div");
            piece.classList.add("puzzle-piece", "flipped");
            piece.dataset.position = `${row}-${col}`;

            const pieceFront = document.createElement("div");
            pieceFront.classList.add("piece-front");
            pieceFront.style.backgroundImage = `url(${imagePath})`;
            pieceFront.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;

            const pieceBack = document.createElement("div");
            pieceBack.classList.add("piece-back");

            piece.appendChild(pieceFront);
            piece.appendChild(pieceBack);

            piece.addEventListener("click", function () {
                if (!allFlipped && piece.classList.contains("flipped")) {
                    piece.classList.remove("flipped");
                    checkAllFlipped();
                }
            });

            // Eventos táctiles en móviles
            piece.addEventListener("touchstart", touchStart);
            piece.addEventListener("touchmove", touchMove);
            piece.addEventListener("touchend", touchEnd);

            // Eventos de arrastrar en PC
            piece.setAttribute("draggable", "true");
            piece.addEventListener("dragstart", dragStart);
            piece.addEventListener("dragover", dragOver);
            piece.addEventListener("drop", drop);

            pieces.push(piece);
        }
    }

    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach(piece => puzzleContainer.appendChild(piece));

    function checkAllFlipped() {
        const flippedPieces = document.querySelectorAll(".puzzle-piece.flipped").length;
        if (flippedPieces === 0) {
            allFlipped = true;
            mostrarModal(); // Mostrar modal al completar el rompecabezas
        }
    }

    function dragStart(event) {
        if (!allFlipped) return;
        selectedPiece = event.target;
        selectedPiece.classList.add("selected");
        event.dataTransfer.setData("text/plain", selectedPiece.dataset.position);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        if (!allFlipped) return;
        const targetPiece = event.target.closest(".puzzle-piece");
        if (!targetPiece || selectedPiece === targetPiece) return;
        swapPieces(selectedPiece, targetPiece);
        selectedPiece.classList.remove("selected");
    }

    function touchStart(event) {
        if (!allFlipped) return;
        selectedPiece = event.target.closest(".puzzle-piece");
        if (selectedPiece) {
            selectedPiece.classList.add("selected");
            movingPiece = selectedPiece.cloneNode(true);
            movingPiece.style.position = "absolute";
            movingPiece.style.zIndex = "1000";
            movingPiece.style.pointerEvents = "none";
            movingPiece.style.opacity = "0.7";
            movingPiece.classList.add("moving");
            document.body.appendChild(movingPiece);
        }
    }

    function touchMove(event) {
        if (!movingPiece) return;
        event.preventDefault();

        const touch = event.touches[0];
        movingPiece.style.left = `${touch.clientX - pieceSize / 2}px`;
        movingPiece.style.top = `${touch.clientY - pieceSize / 2}px`;
    }

    function touchEnd(event) {
        if (!selectedPiece || !movingPiece) return;

        const touch = event.changedTouches[0];
        document.body.removeChild(movingPiece);
        movingPiece = null;

        const targetPiece = document.elementFromPoint(touch.clientX, touch.clientY);
        if (targetPiece && targetPiece.classList.contains("puzzle-piece") && targetPiece !== selectedPiece) {
            swapPieces(selectedPiece, targetPiece);
        }

        selectedPiece.classList.remove("selected");
        selectedPiece = null;
        checkWin();
    }

    function swapPieces(piece1, piece2) {
        const parent = piece1.parentNode;
        const temp = document.createElement("div");

        parent.insertBefore(temp, piece1);
        parent.insertBefore(piece1, piece2);
        parent.insertBefore(piece2, temp);
        parent.removeChild(temp);
    }

    function checkWin() {
        const allCorrect = pieces.every((piece, index) => {
            return piece.dataset.position === `${Math.floor(index / gridSize)}-${index % gridSize}`;
        });

        if (allCorrect) {
            mostrarModal();
        }
    }

    // **Modal mejorado para dispositivos móviles**
    function mostrarModal() {
        const modal = document.getElementById("congratulationsModal");
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";  // Evitar desplazamiento
    }

    document.getElementById("cerrarModal").addEventListener("click", function () {
        cerrarModal();
    });

    window.addEventListener("click", function (event) {
        const modal = document.getElementById("congratulationsModal");
        if (event.target === modal) {
            cerrarModal();
        }
    });

    function cerrarModal() {
        const modal = document.getElementById("congratulationsModal");
        modal.style.display = "none";
        document.body.style.overflow = "auto";  // Restaurar desplazamiento
    }
});




document.getElementById('finalImage').classList.add('mostrar');






















// CODIGO DE LA MUSICA
document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playMusic');
    const audio = document.getElementById('backgroundMusic');

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playButton.textContent = "⏸️ Pausar Música";
        } else {
            audio.pause();
            playButton.textContent = "🎵 Reproducir Música";
        }
    });
});
