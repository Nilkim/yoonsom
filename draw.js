function drawCanvas(inputWidth) {
  var canvas = document.getElementById("myCanvas");
  if (!canvas) return;

  // 캔버스 초기화
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

  var inputWidth = parseFloat(inputWidth); // 사용자 입력 가로 값
  if (!inputWidth) return;

  var heightRatio = 1800; // 사각형의 높이 가정 값
  var ratio = inputWidth / heightRatio; // 가로 대 세로 비율

  var containerWidth = document.getElementById('container').offsetWidth * 0.7; // 컨테이너 가로 폭의 70%
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

  // 뚫린 사각형 그리기
  var padding = 20;
  var rectWidth = canvas.width - (padding * 2);
  var rectHeight = canvas.height - (padding * 2);
  var startX = padding;
  var startY = padding;



  ctx.strokeStyle = '#778899';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX, startY + rectHeight);
  ctx.moveTo(startX, startY + rectHeight);
  ctx.lineTo(startX + rectWidth, startY + rectHeight);
  ctx.moveTo(startX + rectWidth, startY + rectHeight);
  ctx.lineTo(startX + rectWidth, startY);

  ctx.moveTo(startX + canvasWidth / 80, canvasHeight / 4);
  ctx.lineTo(startX + rectWidth - canvasWidth / 80, canvasHeight / 4);
  ctx.stroke();

  ctx.fillText(inputWidth, canvasWidth / 2, canvasHeight / 4);

  // 사선 그리기
  var lineLength = 100; // 사선 길이
  ctx.beginPath();
  ctx.moveTo(startX + rectWidth, startY + rectHeight);
  ctx.lineTo(startX + rectWidth + lineLength, startY + rectHeight + lineLength);
  ctx.moveTo(startX, startY + rectHeight);
  ctx.lineTo(startX - lineLength, startY + rectHeight + lineLength);
  ctx.stroke();

  // 루바와 몰딩 그리기 함수 호출
  drawLubasAndMoldings(ctx, inputWidth, rectWidth, rectHeight, startX, startY, heightRatio);
}

function drawLubasAndMoldings(ctx, inputWidth, rectWidth, rectHeight, startX, startY, heightRatio) {
  // 루바 변수
  var lubaRealWidth = 80; // 루바 실제 가로
  var lubaHeight = rectHeight * (1000 / heightRatio); // 캔버스 상의 루바 세로 길이
  var numberOfLubas = Math.floor(inputWidth / lubaRealWidth); // 필요한 루바 개수 계산
  var lubaWidth = rectWidth * (lubaRealWidth / inputWidth); // 캔버스 상의 루바 가로 길이

  // 몰딩 변수
  var moldingWidthReal = 1200; // 몰딩 실제 가로
  var moldingHeightReal = 40; // 몰딩 실제 높이
  var numberOfMoldings = Math.ceil(inputWidth / moldingWidthReal); // 전체 몰딩 개수
  var totalDrawingElements = numberOfLubas + numberOfMoldings; // 그리는 요소의 총 개수
  var delay = 3000 / totalDrawingElements; // 전체 그리는 시간을 요소의 총 개수로 나눔

  // 루바그리기
  for (let i = 0; i < numberOfLubas; i++) {
    setTimeout(() => {

      ctx.fillStyle = '#cc9933'; // 루바 색상


      ctx.fillRect(startX + i * lubaWidth, startY + rectHeight - lubaHeight, lubaWidth, lubaHeight);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 0.2;
      ctx.strokeRect(startX + i * lubaWidth, startY + rectHeight - lubaHeight, lubaWidth, lubaHeight);
    }, i * delay);
  }
  //필름 그리기
  if (inputWidth % lubaRealWidth != 0) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(startX + rectWidth, startY + rectHeight, -1 * lubaWidth * 12 / 8, -1 * lubaHeight);
  }

  // 몰딩그리기

  for (let i = 0; i < numberOfMoldings; i++) {
    setTimeout(() => {
      var moldingWidth = (i < numberOfMoldings - 1) ? rectWidth * (moldingWidthReal / inputWidth) : rectWidth - (numberOfMoldings - 1) * (rectWidth * (moldingWidthReal / inputWidth));
      ctx.fillStyle = '#cc6633'; // 몰딩 색상
      if (i == numberOfMoldings - 1 && inputWidth % moldingWidthReal != 0) {
        ctx.fillStyle = 'red';
      }

      ctx.fillRect(startX + i * (rectWidth * (moldingWidthReal / inputWidth)), startY + rectHeight - lubaHeight - rectHeight * (moldingHeightReal / heightRatio), moldingWidth, rectHeight * (moldingHeightReal / heightRatio));
      ctx.strokeStyle = 'black';
      ctx.strokeRect(startX + i * (rectWidth * (moldingWidthReal / inputWidth)), startY + rectHeight - lubaHeight - rectHeight * (moldingHeightReal / heightRatio), moldingWidth, rectHeight * (moldingHeightReal / heightRatio));





    }, (numberOfLubas + i) * delay);
  }
}
