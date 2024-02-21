function drawCanvas(inputWidth) {
    var canvas = document.getElementById("myCanvas");
    if (!canvas) return;

    var inputWidth = parseFloat(inputWidth); // 사용자 입력 가로 값
    if (!inputWidth) return;

    var heightRatio = 2400; // 사각형의 높이 가정 값
    var ratio = inputWidth / heightRatio; // 가로 대 세로 비율

    var containerWidth = document.getElementById('container').offsetWidth * 0.5; // 컨테이너 가로 폭의 절반
    var canvasWidth, canvasHeight;

    if (ratio > 1) { // 가로가 더 긴 경우
        canvasWidth = containerWidth;
        canvasHeight = canvasWidth / ratio;
    } else { // 세로가 더 긴 경우 또는 정사각형
        canvasHeight = containerWidth;
        canvasWidth = canvasHeight * ratio;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var ctx = canvas.getContext("2d");

    // 루바 그리기를 위한 준비
    var lubaRealWidth = 80; // 루바 실제 가로
    var numberOfLubas = Math.floor(inputWidth / lubaRealWidth); // 필요한 루바 개수 계산
    var delayPerLuba = 3000 / numberOfLubas; // 루바 하나당 딜레이 시간

    function drawLubas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
        var padding = 20;
        var rectWidth = canvas.width - (padding * 2);
        var rectHeight = canvas.height - (padding * 2);
        var startX = padding;
        var startY = padding;
        var lubaWidth = rectWidth * (lubaRealWidth / inputWidth); // 캔버스 상의 루바 가로 길이
        var lubaHeight = rectHeight * (1000 / heightRatio); // 캔버스 상의 루바 세로 길이

        // 사각형 그리기
        ctx.beginPath();
        ctx.rect(startX, startY, rectWidth, rectHeight);
        ctx.stroke();

        // 루바를 순차적으로 그리기
        function drawLuba(i) {
            if (i < numberOfLubas) {
                ctx.fillStyle = 'brown'; // 루바 채우기 색상
                ctx.fillRect(startX + i * lubaWidth, startY + rectHeight - lubaHeight, lubaWidth, lubaHeight);
                ctx.strokeStyle = 'black'; // 루바 테두리 색상
                ctx.strokeRect(startX + i * lubaWidth, startY + rectHeight - lubaHeight, lubaWidth, lubaHeight);
                setTimeout(() => drawLuba(i + 1), delayPerLuba); // 다음 루바 그리기
            } else {
                setTimeout(drawLubas, 3000); // 모든 루바를 다 그린 후 3초 멈춤
            }
        }

        drawLuba(0); // 루바 그리기 시작
    }

    drawLubas(); // 루바 그리기 함수 호출
}
