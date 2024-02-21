function drawCanvas(inputWidth) {
    var canvas = document.getElementById("myCanvas");
    if (!canvas) return; // 캔버스가 없으면 종료

   
    var containerWidth = document.getElementById('container').offsetWidth * 0.5; // 컨테이너의 가로 폭의 절반
    var heightRatio = 2400; // 가정된 높이
    var width = parseFloat(inputWidth); // 사용자 입력 가로 값
    var canvasHeight = containerWidth * (heightRatio / width); // 캔버스 높이 계산


    canvas.width = containerWidth;
    canvas.height = containerHeight; //> containerWidth ? containerHeight : canvasWidth; // 캔버스 높이 조정

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 클리어

    // 사각형 그리기 시작점 조정
    var startX = 0; // 중앙 정렬을 위해 시작점 조정
    var startY = (canvas.height - canvasHeight) / 2;
    var rectWidth = canvas.width; // 사각형 너비를 캔버스 너비와 동일하게 조정
    var rectHeight = canvasHeight; // 사각형 높이를 계산된 높이로 설정

    // 사각형 그리기
    ctx.beginPath();
    ctx.rect(startX, startY, rectWidth, rectHeight);
    ctx.stroke();

    // 사선 그리기, 사선 길이 조절
    var lineLength = 90; // 사선 길이
    // 사선 그리기 로직은 그대로 유지하되, 시작점을 조정하여 중앙에 위치하도록 함
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
