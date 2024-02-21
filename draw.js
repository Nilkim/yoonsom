function drawCanvas(inputWidth) {
    var canvas = document.getElementById("myCanvas");
    if (!canvas) return;

    var inputWidth = parseFloat(inputWidth); // 사용자 입력 가로 값
    var heightRatio = 2400; // 사각형의 높이 가정 값
    var ratio = inputWidth / heightRatio; // 가로 대 세로 비율

    var containerWidth = document.getElementById('container').offsetWidth * 0.5; // 컨테이너 가로 폭의 절반
    var canvasWidth, canvasHeight;

    // 가로가 세로보다 길 경우와 세로가 가로보다 길 경우에 대한 처리
    if (ratio > 1) { // 가로가 더 긴 경우
        canvasWidth = containerWidth;
        canvasHeight = canvasWidth / ratio;
    } else { // 세로가 더 긴 경우 또는 정사각형
        canvasHeight = containerWidth; // 캔버스 높이를 가로 길이에 맞춤
        canvasWidth = canvasHeight * ratio; // 전체 비율에 맞춰 가로 길이 조정
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 사각형 그리기
    var padding = 20;
    var rectWidth = canvas.width - (padding * 2);
    var rectHeight = canvas.height - (padding * 2);
    var startX = padding;
    var startY = padding;

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
    var lubaWidth = 80; // 루바의 가로 길이
    var numberOfLubas = Math.floor(rectWidth / lubaWidth); // 캔버스에 들어갈 수 있는 루바의 최대 개수
    var lubaHeight = 20; // 루바의 높이

    for (var i = 0; i < numberOfLubas; i++) {
        ctx.fillStyle = '#964B00'; // 루바의 색상 설정
        ctx.fillRect(startX + i * lubaWidth, startY + rectHeight - lubaHeight, lubaWidth, lubaHeight);
    }
}
