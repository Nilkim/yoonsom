function drawCanvas(inputWidth) {
    var canvas = document.getElementById("myCanvas");
    if (!canvas) return;

    var containerWidth = document.getElementById('container').offsetWidth * 0.5; // 컨테이너의 가로 폭의 절반
    var heightRatio = 2400; // 가정된 높이
    var width = parseFloat(inputWidth); // 사용자 입력 가로 값
    var canvasHeight = containerWidth * (heightRatio / width); // 캔버스 높이 계산

    canvas.width = containerWidth;
    canvas.height = canvasHeight;

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 사각형 그리기
    var padding = 50; // 사각형 주위에 추가할 패딩
    var rectHeight = canvas.height - (padding * 2); // 패딩을 고려한 사각형 높이
    var rectWidth = canvas.width - (padding * 2); // 패딩을 고려한 사각형 너비

    var startX = padding;
    var startY = padding;

    ctx.beginPath();
    ctx.rect(startX, startY, rectWidth, rectHeight);
    ctx.stroke();

    // 사선 그리기
    var lineLength = 90; // 사선 길이를 3배 더 길게 조절
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
}
