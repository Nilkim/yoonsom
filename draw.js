function drawCanvas(inputWidth) {
    var canvas = document.getElementById("myCanvas");
    if (!canvas) return; // 캔버스가 없으면 종료

    // 컨테이너의 가로 폭의 1/2로 캔버스 크기 조정
    var containerWidth = document.getElementById('container').offsetWidth * 0.5;
    var heightRatio = 2400; // 가정된 높이
    var width = parseFloat(inputWidth); // 사용자 입력 가로 값
    var canvasHeight = containerWidth * (heightRatio / width); // 캔버스 높이 계산

    canvas.width = containerWidth;
    canvas.height = canvasHeight; // 계산된 높이를 캔버스 높이로 설정

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 클리어

    // 사각형 그리기에 여유 공간 추가
    var padding = 20; // 사각형과 캔버스 경계 사이의 패딩
    var rectHeight = canvas.height - padding * 2; // 패딩을 고려한 높이
    var rectWidth = rectHeight * (width / heightRatio); // 패딩을 고려한 너비

    var startX = (canvas.width - rectWidth) / 2;
    var startY = padding; // 상단 패딩을 시작점으로 사용

    ctx.beginPath();
    ctx.rect(startX, startY, rectWidth, rectHeight);
    ctx.stroke();

    // 사선 그리기
    var lineLength = 50; // 사선 길이 증가
    ctx.beginPath();
    // 상단 왼쪽에서 시작하는 사선
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX - lineLength, startY - lineLength);
    // 상단 오른쪽에서 시작하는 사선
    ctx.moveTo(startX + rectWidth, startY);
    ctx.lineTo(startX + rectWidth + lineLength, startY - lineLength);
    // 하단 오른쪽에서 시작하는 사선
    ctx.moveTo(startX + rectWidth, startY + rectHeight);
    ctx.lineTo(startX + rectWidth + lineLength, startY + rectHeight + lineLength);
    // 하단 왼쪽에서 시작하는 사선
    ctx.moveTo(startX, startY + rectHeight);
    ctx.lineTo(startX - lineLength, startY + rectHeight + lineLength);
    ctx.stroke();
}
