<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>루바 그리기</title>
    <style>
        #container {
            width: 50%; /* 컨테이너의 가로 크기를 화면의 절반으로 설정 */
            margin: auto; /* 컨테이너를 화면 중앙에 배치 */
        }
        canvas {
            display: block; /* 캔버스를 블록 요소로 설정하여 가로 폭을 컨테이너에 맞춤 */
            margin: 20px auto; /* 캔버스를 위아래로 20px, 좌우 중앙에 배치 */
            background-color: #f0f0f0; /* 캔버스 배경색 설정 */
        }
    </style>
</head>
<body>
    <div id="container">
        <input type="number" id="inputWidth" placeholder="Enter width">
        <button onclick="startDrawing()">Draw Luba</button>
        <canvas id="myCanvas"></canvas>
    </div>

    <script>
        let timer = null; // 타이머 ID를 저장할 변수

        function drawCanvas(inputWidth) {
            clearTimeout(timer); // 이전에 설정된 타이머가 있다면 취소

            const canvas = document.getElementById("myCanvas");
            if (!canvas) return;

            const containerWidth = document.getElementById('container').offsetWidth;
            canvas.width = containerWidth;
            canvas.height = containerWidth; // 캔버스 크기를 컨테이너에 맞춤

            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화

            const heightRatio = 2400;
            const widthRatio = inputWidth / heightRatio;
            const rectWidth = canvas.width * 0.8; // 사각형의 가로 크기
            const rectHeight = rectWidth * widthRatio; // 사각형의 세로 크기
            const startX = (canvas.width - rectWidth) / 2;
            const startY = (canvas.height - rectHeight) / 2;

            // 사각형 그리기
            ctx.beginPath();
            ctx.rect(startX, startY, rectWidth, rectHeight);
            ctx.stroke();

            // 루바 개수 계산
            const numberOfLubas = Math.floor(inputWidth / 80);
            const delayPerLuba = 3000 / numberOfLubas;

            for (let i = 0; i < numberOfLubas; i++) {
                timer = setTimeout(() => {
                    const lubaWidth = rectWidth / numberOfLubas;
                    const lubaHeight = rectHeight; // 루바 세로 길이는 사각형 세로와 동일
                    const lubaX = startX + i * lubaWidth;

                    // 루바 그리기
                    ctx.fillStyle = 'brown';
                    ctx.fillRect(lubaX, startY, lubaWidth, lubaHeight);

                    // 루바 테두리 그리기
                    ctx.strokeStyle = 'black';
                    ctx.strokeRect(lubaX, startY, lubaWidth, lubaHeight);
                }, i * delayPerLuba);
            }

            // 모든 루바를 그린 후 3초 대기하고 다시 그리기
            timer = setTimeout(() => drawCanvas(inputWidth), numberOfLubas * delayPerLuba + 3000);
        }

        function startDrawing() {
            const inputWidth = document.getElementById("inputWidth").value;
            drawCanvas(parseFloat(inputWidth));
        }
    </script>
</body>
</html>
