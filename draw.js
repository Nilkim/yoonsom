function drawCanvas(inputWidth, numberOfLubas) {
    var canvas = document.getElementById("myCanvas");
    if (!canvas) return;

    var containerWidth = document.getElementById('container').offsetWidth * 0.5; // 컨테이너 가로의 절반
    var heightRatio = 2400; // 높이 기준값
    var width = parseFloat(inputWidth); // 사용자 입력 가로 값
    var canvasHeight = containerWidth * (heightRatio / width); // 캔버스 높이 계산

    // 캔버스 높이 조정
    if (width > heightRatio) {
        canvas.width = containerWidth; 
        canvas.height = canvasHeight;
    } else {
        canvas.height = containerWidth; // 가로보다 세로가 긴 경우, 높이를 가로 길이에 맞춤
        canvas.width = canvas.height * (width / heightRatio);
    }

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 사각형 그리기
    var padding = 50;
    var rectHeight = canvas.height - (padding * 2);
    var rectWidth = canvas.width - (padding * 2);

    var startX = padding;
    var startY = padding;

    ctx.beginPath();
    ctx.rect(startX, startY, rectWidth, rectHeight);
    ctx.stroke();

    // 사선 그리기
    var lineLength = 90; // 사선 길이
    ctx.beginPath();
    // 상단 왼쪽에서 시작하는 사선
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX - lineLength, startY - lineLength);
    // 추가적인 사선들...

    ctx.stroke();


    }
}
