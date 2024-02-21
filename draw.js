let drawTimer;
let clearTimer;

function drawCanvas(inputWidth) {
    // 현재 진행중인 타이머가 있다면 초기화
    if (drawTimer) clearTimeout(drawTimer);
    if (clearTimer) clearTimeout(clearTimer);

    const canvas = document.getElementById("myCanvas");
    if (!canvas) return;

    const inputWidthParsed = parseFloat(inputWidth); // 사용자 입력 가로 값 파싱
    if (!inputWidthParsed) return;

    const heightRatio = 2400; // 사각형의 높이 가정 값
    const ratio = inputWidthParsed / heightRatio; // 가로 대 세로 비율

    const containerWidth = document.getElementById('container').offsetWidth * 0.5; // 컨테이너 가로 폭의 절반
    let canvasWidth, canvasHeight;

    // 가로가 세로보다 길 경우와 세로가 가로보다 길 경우에 대한 처리
    if (ratio > 1) { // 가로가 더 긴 경우
        canvasWidth = containerWidth;
        canvasHeight = canvasWidth / ratio;
    } else { // 세로가 더 긴 경우 또는 정사각형
        canvasHeight = containerWidth;
        canvasWidth = canvasHeight * ratio;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화

    const padding = 20;
    const rectWidth = canvas.width - (padding * 2);
    const rectHeight = canvas.height - (padding * 2);
    const startX = padding;
    const startY = padding;

    // 사각형 그리기
    ctx.beginPath();
    ctx.rect(startX, startY, rectWidth, rectHeight);
    ctx.stroke();

    // 사선 그리기
    var lineLength = 100; // 사선 길이
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX - lineLength, startY - lineLength);
    ctx.moveTo(startX + rectWidth, startY);
    ctx.lineTo(startX + rectWidth + lineLength, startY - lineLength);
    ctx.moveTo(startX + rectWidth, startY + rectHeight);
    ctx.lineTo(startX + rectWidth + lineLength, startY + rectHeight + lineLength);
    ctx.moveTo(startX, startY + rectHeight);
    ctx.lineTo(startX - lineLength, startY + rectHeight + lineLength);
    ctx.stroke();

    // 루바 그리기
    const numberOfLubas = Math.floor(inputWidthParsed / 80); // 필요한 루바 개수 계산
    const delayPerLuba = 3000 / numberOfLubas; // 루바 하나당 딜레이 시간
    const lubaWidth = 80 * (rectWidth / inputWidthParsed); // 캔버스 상의 루바 가로 길이
    const lubaHeight = 1000 * (rectHeight / heightRatio); // 캔버스 상의 루바 세로 길이

    let i = 0; // 현재 그릴 루바 인덱스
    function drawLuba() {
        if (i < numberOfLubas) {
            ctx.fillStyle = 'brown';
            ctx.fillRect(startX + i * lubaWidth, startY, lubaWidth, lubaHeight);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(startX + i * lubaWidth, startY, lubaWidth, lubaHeight);
            i++;
            drawTimer = setTimeout(drawLuba, delayPerLuba);
        } else {
            // 모든 루바를 그린 후 잠시 대기한 다음 다시 그리기 시작
            i = 0; // 인덱스 초기화
            clearTimer = setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawLuba(); // 다시 그리기 시작
            }, 3000);
        }
    }

    drawLuba(); // 루바 그리기 시작
}
