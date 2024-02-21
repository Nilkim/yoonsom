function drawCanvas(inputWidth) {
    var canvas = document.getElementById("myCanvas");
    if (!canvas) return;

    var inputWidth = parseFloat(inputWidth); 
    var heightRatio = 2400; 
    var ratio = inputWidth / heightRatio; 

    var containerWidth = document.getElementById('container').offsetWidth * 0.5;
    var canvasWidth, canvasHeight;

    if (ratio > 1) {
        canvasWidth = containerWidth;
        canvasHeight = canvasWidth / ratio;
    } else {
        canvasHeight = containerWidth;
        canvasWidth = canvasHeight * ratio;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var ctx = canvas.getContext("2d");

    // 사각형 및 사선 그리기 로직 (여기서는 생략)

    // 루바 그리기 로직
    var lubaWidth = 80;
    var numberOfLubas = Math.floor((canvas.width - 2 * 20) / lubaWidth);
    var lubaHeight = 20;
    var startX = 20;
    var startY = canvas.height - 20 - lubaHeight; // 사각형의 하단에 루바를 그리기 위한 시작 Y 좌표

    function drawLuba(index) {
        if (index < numberOfLubas) {
            ctx.fillStyle = '#964B00';
            ctx.fillRect(startX + index * lubaWidth, startY, lubaWidth, lubaHeight);
            setTimeout(() => drawLuba(index + 1), 1000); // 다음 루바 그리기를 1초 후에 실행
        }
    }

    drawLuba(0); // 첫 번째 루바부터 그리기 시작
}
