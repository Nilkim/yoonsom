function drawCanvas(inputWidth) {
    var canvas = document.getElementById("myCanvas");
    if (!canvas) return;

    // 캔버스 초기화를 위해 기존 캔버스 내용을 지웁니다.
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    setTimeout(() => {
        var inputWidth = parseFloat(inputWidth);
        if (!inputWidth) return;

        var heightRatio = 1800;
        var ratio = inputWidth / heightRatio;

        var containerWidth = document.getElementById('container').offsetWidth * 0.7;
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

            ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#778899';
    ctx.lineWidth = 0.2;
    
    // 뚫린사각형 그리기
    var padding = 20;
    var rectWidth = canvas.width - (padding * 2);
    var rectHeight = canvas.height - (padding * 2);
    var startX = padding;
    var startY = padding;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, startY + rectHeight);
    ctx.moveTo(startX + rectWidth, startY + rectHeight);
    ctx.lineTo(startX + rectWidth, startY);
    ctx.stroke();

    // 사선 그리기
    var lineLength = 100; // 사선 길이
    ctx.beginPath();
    ctx.moveTo(startX + rectWidth, startY + rectHeight);
    ctx.lineTo(startX + rectWidth + lineLength, startY + rectHeight + lineLength);
    ctx.moveTo(startX, startY + rectHeight);
    ctx.lineTo(startX - lineLength, startY + rectHeight + lineLength);
    ctx.stroke();

        // 루바와 몰딩을 그리는 부분입니다.
        drawLubasAndMoldings(ctx, inputWidth, canvasWidth, canvasHeight, heightRatio);
    }, 0);
}

function drawLubasAndMoldings(ctx, inputWidth, canvasWidth, canvasHeight, heightRatio) {
    var padding = 20;
    var rectWidth = canvasWidth - (padding * 2);
    var rectHeight = canvasHeight - (padding * 2);
    var startX = padding;
    var startY = padding;

    // 루바 그리기 설정...
    var lubaRealWidth = 80;
    var lubaHeight = rectHeight * (1000 / heightRatio);
    var numberOfLubas = Math.floor(inputWidth / lubaRealWidth);
    var lubaWidth = rectWidth * (lubaRealWidth / inputWidth);

    // 몰딩 그리기 설정...
    var moldingWidthReal = 1200;
    var moldingHeightReal = 40;
    var moldingWidth = rectWidth * (moldingWidthReal / inputWidth);
    var moldingHeight = rectHeight * (moldingHeightReal / heightRatio);
    var totalMoldingWidth = 0;
    var numberOfMoldings = Math.floor(inputWidth / moldingWidthReal);
    var totalElements = numberOfLubas + numberOfMoldings;
    var delayPerElement = 3000 / totalElements; // 전체 그리는 시간을 요소의 총 개수로 나눔

    // 루바 그리기...
    for (let i = 0; i < numberOfLubas; i++) {
        setTimeout(() => {
            ctx.fillStyle = '#cc9933';
            ctx.fillRect(startX + i * lubaWidth, startY + rectHeight - lubaHeight, lubaWidth, lubaHeight);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(startX + i * lubaWidth, startY + rectHeight - lubaHeight, lubaWidth, lubaHeight);
        }, delayPerElement * i);
    }

    // 몰딩 그리기...
    for (let i = 0; i < numberOfMoldings; i++) {
        setTimeout(() => {
            ctx.fillStyle = '#cc6633';
            ctx.fillRect(startX + i * moldingWidth, startY, moldingWidth, moldingHeight);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(startX + i * moldingWidth, startY, moldingWidth, moldingHeight);
        }, delayPerElement * (numberOfLubas + i));
    }
}
