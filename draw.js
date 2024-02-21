


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
    var lubaRealWidth = 80; // 루바 실제 가로
    var numberOfLubas = Math.floor(inputWidth / lubaRealWidth); // 필요한 루바 개수 계산
    var lubaWidth = rectWidth * (lubaRealWidth / inputWidth); // 캔버스 상의 루바 가로 길이
    var lubaHeight = rectHeight * (1000 / heightRatio); // 캔버스 상의 루바 세로 길이

    for (var i = 0; i < numberOfLubas; i++) {
        // 루바 채우기
        ctx.fillStyle = '#cc9933'; // 루바 색상 변경
        ctx.fillRect(startX + i * lubaWidth, startY + rectHeight - lubaHeight, lubaWidth, lubaHeight);

        // 루바 테두리 그리기
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(startX + i * lubaWidth, startY + rectHeight - lubaHeight, lubaWidth, lubaHeight);
    }
     //몰딩 그리기
    var moldingWidthReal = 1200; // 몰딩 실제 가로
    var moldingHeightReal = 40; // 몰딩 실제 높이
    var moldingWidth = rectWidth * (moldingWidthReal / inputWidth); // 캔버스 상의 몰딩 가로 길이
    var moldingHeight = rectHeight * (moldingHeightReal / heightRatio); // 캔버스 상의 몰딩 높이

    var totalMoldingWidth = 0; // 그려진 몰딩의 총 가로 길이
    var numberOfMoldings = Math.floor(inputWidth / moldingWidthReal); // 전체 몰딩 개수

    ctx.fillStyle = '#cc6633'; // 몰딩 색상 설정

    for (var i = 0; i < numberOfMoldings; i++) {
        if (totalMoldingWidth + moldingWidth > rectWidth) {
            moldingWidth = rectWidth - totalMoldingWidth; // 남은 공간에 맞게 마지막 몰딩 길이 조절
        }
        ctx.fillRect(startX, startY + lubaHeight, moldingWidth, moldingHeight);
        totalMoldingWidth += moldingWidth; // 그려진 몰딩 길이 업데이트
    }

   }

