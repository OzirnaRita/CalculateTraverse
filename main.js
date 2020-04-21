let pointX2 = document.getElementById('pointX2');
let pointY2 = document.getElementById('pointY2');
let lastPointX2 = document.getElementById('lastPointX2');
let lastPointY2 = document.getElementById('lastPointY2');
let pointPenultX1 = document.getElementById('pointPenultX1');
let pointPenultY1 = document.getElementById('pointPenultY1');
let cornerDegrDirect = document.getElementById('cornerDegrDirect');
let cornerMinDirect = document.getElementById('cornerMinDirect');
let cornerSecDirect = document.getElementById('cornerSecDirect');
let lastCornerDegrDirect = document.getElementById('lastCornerDegrDirect');
let lastCornerMinDirect = document.getElementById('lastCornerMinDirect');
let lastCornerSecDirect = document.getElementById('lastCornerSecDirect');

let corner = document.getElementById('cornerBlock');
let lastCorner = document.getElementById('lastCornerBlock');
let cornerGamma = document.getElementById('cornerGamma');
let gammaCornerDegr = document.getElementById('gammaCornerDegr');
let secondPointCoordinates = document.getElementById('secondPointCoordinates');
let lastPointCoordinates = document.getElementById('lastPointCoordinates');

let form = document.getElementById('settingsBlock');
let secondForm = document.getElementById('sideOfTraverse');
let firstLengthVal = document.getElementById('firstLengthVal');

let fields, secondFormFields;
let minFields = document.querySelectorAll('.cornerMin');
let secFields = document.querySelectorAll('.cornerSec');
let table = document.getElementById('table');
let rows = table.getElementsByTagName('tr');


let alpha = document.getElementById('firstAlpha');
let lastAlpha = document.getElementById('lastAlpha');
let fBetaSum = document.getElementById('fBeta');
document.addEventListener('click', cornerMin);


if (form) {
  form.addEventListener('click', openOrCloseTraverse);
  form.addEventListener('click', selectTeoStep);
  form.addEventListener('click', selectCornerOrPoints);
  form.addEventListener('click', selectLastCornerOrPoints);
  form.addEventListener('click', lengthOrDistance);
}

function cornerMin() {
  if (document.getElementById('radioMin').checked) {
    minFields.forEach(element => {
      element.style.display = 'inline-block'
    })
    secFields.forEach(element => {
      element.style.display = "none"
    })
  } else if (document.getElementById('radioSec').checked) {
    minFields.forEach(element => {
      element.style.display = 'inline-block'
    })
    secFields.forEach(element => {
      element.style.display = "inline-block"
    })
  } else {
    minFields.forEach(element => {
      element.style.display = 'none'
    })
    secFields.forEach(element => {
      element.style.display = "none"
    })
  }
}

function openOrCloseTraverse() {
  let traverseType = document.getElementById('traverseType').value;
  if (traverseType == '1') {
    document.getElementById('lastCoordinates').style.display = 'none';
    document.getElementById('selectPointOrCorner').style.display = 'none';
    document.getElementById('labForCorn').style.display = 'block';
    document.getElementById('firstLength').style.display = 'block';
    pointPenultX1.required = false;
    pointPenultY1.required = false;
    lastCornerDegrDirect.required = false;
    firstLengthVal.required = true;
  } else {
    document.getElementById('lastCoordinates').style.display = 'block';
    document.getElementById('selectPointOrCorner').style.display = 'block';
    document.getElementById('labForCorn').style.display = 'none';
    document.getElementById('firstLength').style.display = 'none';
    pointPenultX1.required = true;
    pointPenultY1.required = true;
    lastCornerDegrDirect.required = true;
    firstLengthVal.required = false;
  }

}

function selectCornerOrPoints() {
  let traverseType = document.getElementById('traverseType').value;
  if (document.getElementById("corner").checked) {
    cornerBlock.style.display = 'block';
    secondPointCoordinates.style.display = 'none';
    pointX2.required = false;
    pointY2.required = false;
    pointX2.value = '';
    pointY2.value = '';
    pointX2.classList.remove("invalid");
    pointY2.classList.remove("invalid");
    cornerDegrDirect.required = true;
  } else {
    if(traverseType !== '1'){
    cornerBlock.style.display = 'none';
    secondPointCoordinates.style.display = 'block';
    cornerDegrDirect.required = false;
    pointX2.required = true;
    pointY2.required = true;
    cornerDegrDirect.classList.remove("invalid");
    cornerDegrDirect.value = '';
    if (cornerMinDirect.value) {
      cornerMinDirect.value = ''
    };
    if (cornerSecDirect.value) {
      cornerSecDirect.value = ''
    };
  }else{
    cornerBlock.style.display = 'block';
    secondPointCoordinates.style.display = 'none';
    cornerDegrDirect.required = true;
    pointX2.required = false;
    pointY2.required = false;
  }
  }
}

function selectLastCornerOrPoints() {
  let traverseType = document.getElementById('traverseType').value;
  if (document.getElementById("lastCorner").checked) {
    lastCornerBlock.style.display = 'block';
    lastPointCoordinates.style.display = 'none';
    lastPointX2.required = false;
    lastPointY2.required = false;
    if (traverseType !== "1") {
      lastCornerDegrDirect.required = true;
    } else {
      lastCornerDegrDirect.required = false;
    }
    lastPointX2.value = '';
    lastPointY2.value = '';
    lastPointX2.classList.remove("invalid");
    lastPointY2.classList.remove("invalid");
  } else {
    lastCornerBlock.style.display = 'none';
    lastPointCoordinates.style.display = 'block';
    lastCornerDegrDirect.required = false;
    lastCornerDegrDirect.classList.remove("invalid");
    lastPointX2.required = true;
    lastPointY2.required = true;
    lastCornerDegrDirect.value = '';
    if (lastCornerMinDirect.value) {
      lastCornerMinDirect.value = ''
    };
    if (lastCornerSecDirect.value) {
      lastCornerSecDirect.value = ''
    };
  }
}

function selectTeoStep() {
  if (document.getElementById("teoStep").selected) {
    document.getElementById('builtUpBlock').style.display = 'block';
  } else {
    document.getElementById('builtUpBlock').style.display = 'none';
  }
}

function lengthOrDistance() {
  if (document.getElementById("measureDistance").selected) {
    cornerGamma.style.display = 'block';
    gammaCornerDegr.required = true;
  } else {
    cornerGamma.style.display = 'none';
    gammaCornerDegr.required = false;

  }
}

fields = form.querySelectorAll('input');

secondFormFields = secondForm.querySelectorAll('input')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addSettings();
});

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  data[element.name] = element.value;
  return data;
}, {});


function addSettings() {
  validationFunc(fields);
  lengthLimitation();
  if (form.querySelectorAll('.invalid').length == 0) {
    addToTable();
    document.getElementById('sideOfTraverseButton').removeAttribute("disabled");
    document.getElementById('settingsButton').disabled = true;
  }
}

function addToTable() {
  let degr = form.cornerDegrDirect.value;
  let min = form.cornerMinDirect.value;
  let sec = form.cornerSecDirect.value;

  let lastDegr = form.lastCornerDegrDirect.value;
  let lastMin = form.lastCornerMinDirect.value;
  let lastSec = form.lastCornerSecDirect.value;

  let X1 = form.pointX1.value;
  let Y1 = form.pointY1.value;
  let X2 = form.pointX2.value;
  let Y2 = form.pointY2.value;

  let lastX1 = form.pointPenultX1.value;
  let lastY1 = form.pointPenultY1.value;
  let lastX2 = form.lastPointX2.value;
  let lastY2 = form.lastPointY2.value;
  let length = form.firstLengthVal.value;
  let traverseType = document.getElementById('traverseType').value;
  let title = document.getElementById('titleLine');
  if(traverseType !== '1'){

  if (document.getElementById("corner").checked) {
    document.getElementById('firstLine').style.display = 'none';
    document.getElementById('secondPointXCoordinate').innerHTML = X1;
    document.getElementById('secondPointYCoordinate').innerHTML = Y1;

    writeDegr(degr, min, sec, alpha)
  } else {
    document.getElementById('firstLine').style.display = '';
    document.getElementById('firstPointXCoordinate').innerHTML = X1;
    document.getElementById('firstPointYCoordinate').innerHTML = Y1;
    document.getElementById('secondPointXCoordinate').innerHTML = X2;
    document.getElementById('secondPointYCoordinate').innerHTML = Y2;

    alpha.innerHTML = countDegr(X1, Y1, X2, Y2);
  }

  document.getElementById('penultPointXCoordinate').innerHTML = lastX1;
  document.getElementById('penultPointYCoordinate').innerHTML = lastY1;

  if (document.getElementById("lastCorner").checked) {
    document.getElementById('lastLine').style.display = 'none';
    writeDegr(lastDegr, lastMin, lastSec, lastAlpha)
  } else {
    document.getElementById('lastLine').style.display = '';
    document.getElementById('lastPointXCoordinate').innerHTML = lastX2;
    document.getElementById('lastPointYCoordinate').innerHTML = lastY2;

    lastAlpha.innerHTML = countDegr(lastX1, lastY1, lastX2, lastY2);
  }
}else{
  let openTravs = document.querySelectorAll('.openTrav');
  openTravs.forEach(elem =>{
    
   if (elem.parentNode) {
  elem.parentNode.removeChild(elem);
}
  })
  document.getElementById('lastLine').style.display = 'none';
  title.insertAdjacentHTML('afterend', '<tr class="addBeta"><td class="firstValues">Бт2</td><td colspan="13"></td><td class="firstValues xClass" id="secondPointXCoordinate"></td><td class="firstValues yClass" id="secondPointYCoordinate"></td></tr>');
  
  document.getElementById('secondPointXCoordinate').innerHTML = X1;
  document.getElementById('secondPointYCoordinate').innerHTML = Y1;
  let bet = document.querySelector('.addBeta');
  bet.insertAdjacentHTML('afterend', '<tr class="afterBeta" ><td colspan="4"></td><td class="firstValues alphaCorner" id="firstAlpha"></td><td class="measureLength"><td class="measureDistance"></td><td class="gammaCorner"></td><td ></td><td></td><td class="fX"></td><td class="fY"></td><td></td><td></td><td colspan="2"></td></tr>');
  let alpha = document.getElementById('firstAlpha');
  let leng = document.querySelector('.measureLength');
  leng.innerHTML = length;
  writeDegr(degr, min, sec, alpha);
  writeDegr(degr, min, sec, lastAlpha);
  document.getElementById('penultPointXCoordinate').innerHTML = X1;
  document.getElementById('penultPointYCoordinate').innerHTML = Y1;
  let lastBetaName = document.getElementById('addLastBeta').cells[0];
  lastBetaName.innerHTML = 'Бп2';
  let afterBet = document.querySelector('.afterBeta');
  afterBet.insertAdjacentHTML('afterend', '<tr class="addBeta betaLine"><td>т1</td><td></td><td class="fBeta"></td><td  class="correctedCorner"></td><td colspan="10"></td><td class="xClass"></td><td class="yClass"></td></tr>')
}
}

function writeDegr(deg, min, sec, value) {
  if (deg !== '' && min !== '' && sec !== '') {
    value.innerHTML = deg + '&deg;' + min + "'" + sec + '"'
  };
  if (deg !== '' && min !== '' && sec == '') {
    value.innerHTML = deg + '&deg;' + min + "'"
  };
  if (deg !== '' && min == '' && sec == '') {
    value.innerHTML = deg + '&deg;'
  };
}

function countDegr(x, y, x2, y2) {

  deltX = Number(x2) - Number(x);
  deltY = Number(y2) - Number(y);

  radians = Math.atan(deltY / deltX);
  degrees = Math.abs(radians * 180 / Math.PI);

  if (deltX.toString()[0] !== '-' && deltY.toString()[0] !== '-') {
    cornerDegr = degrees;
  } else if (deltX.toString()[0] == '-' && deltY.toString()[0] !== '-') {
    cornerDegr = 180 - degrees;
  } else if (deltX.toString()[0] == '-' && deltY.toString()[0] == '-') {
    cornerDegr = 180 + degrees;
  } else if (deltX.toString()[0] !== '-' && deltY.toString()[0] == '-') {
    cornerDegr = 360 - degrees;
  }

  if (cornerDegr.toString().split('.')[1]) {
    let afterPoint = Number('0' + '.' + (cornerDegr.toString().split('.')[1])) * 60;
    cornerMin = afterPoint.toString().split('.')[0];
    let afterMinPoint = Number('0' + '.' + afterPoint.toString().split('.')[1]) * 60;

    cornerSec = Math.round(afterMinPoint)
    cornerDegr = cornerDegr.toString().split('.')[0] + '&deg;' + cornerMin + "'" + cornerSec + '"'
  } else {
    cornerDegr = cornerDegr + '&deg;';
  }
  length = (Math.sqrt(Math.pow(deltX, 2) + Math.pow(deltY, 2)));
  return cornerDegr;
}

function validationFunc(inp) {
  inp.forEach(element => {

    if (element.required == true) {
      if (element.value.length == 0 || element.value < 0) {
        element.classList.add('invalid');
      }
      element.addEventListener('keyup', function () {
        if (element.value.length == 0 || element.value < 0) {
          element.classList.add('invalid');
        } else if (element.value >= 0) {
          element.classList.remove('invalid');
        }
      })
    }

  })
}

document.getElementById('sideOfTraverseButton').addEventListener('click', function () {
  document.getElementById('length').required = true;
  if (document.getElementById("measureDistance").selected) {
    gammaCornerDegr.required = true;
  } else {
    gammaCornerDegr.required = false;
  }

})
document.getElementById('lastBetaCorner').addEventListener('click', function () {
  document.getElementById('length').required = false;
  gammaCornerDegr.required = false;
})

secondForm.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
  }
})


let btn1 = document.getElementById('sideOfTraverseButton');

if (btn1 != undefined) {
  btn1.addEventListener('click', (e) => {
    e.preventDefault();
    add();
  });
}

let btn2 = document.getElementById('lastBetaCorner');

if (btn2 != undefined) {
  btn2.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('length').classList.remove("invalid");
    document.getElementById('gammaCornerDegr').classList.remove("invalid");
    addLastCorner();
  });
}

function addLastCorner() {
  validationFunc(secondFormFields);
  if (secondForm.querySelectorAll('.invalid').length == 0) {
    //secondForm.action = '#';
    // secondForm.method = 'GET'
    let degr = secondForm.betaCornerDegr.value;
    let min = secondForm.betaCornerMin.value;
    let sec = secondForm.betaCornerSec.value;

    let lastBeta = document.getElementById('addLastBeta').cells[1];
    writeDegr(degr, min, sec, lastBeta)
    document.getElementById('sideOfTraverseButton').disabled = true;
    document.getElementById('lastBetaCorner').disabled = true;
    secondForm.reset();
    secondForm.style.display = "none";
    calcMeasureCorners();
    calcTeorCorners();
  }
}

function add() {
  validationFunc(secondFormFields);
  let degr = secondForm.betaCornerDegr.value;
  let min = secondForm.betaCornerMin.value;
  let sec = secondForm.betaCornerSec.value;

  if (secondForm.querySelectorAll('.invalid').length == 0) {
    //secondForm.action = '#';
    // secondForm.method = 'GET'
    let betaCells = document.querySelectorAll('.addBeta');
    console.log(betaCells)
    let lastBeta = betaCells[betaCells.length - 1];

    if (lastBeta.cells[1].firstChild == null) {
      writeDegr(degr, min, sec, lastBeta.cells[1]);
      document.getElementById('lastBetaCorner').removeAttribute("disabled");
    } else {
      let afterBetaLines = document.querySelectorAll('.afterBeta');
      let lastAfterBeta = afterBetaLines[afterBetaLines.length - 1];

      lastAfterBeta.insertAdjacentHTML('afterend', '<tr class="addBeta betaLine"><td></td><td></td><td class="fBeta"></td><td  class="correctedCorner"></td><td colspan="10"></td><td class="xClass"></td><td class="yClass"></td></tr>');
      betaCells = document.querySelectorAll('.addBeta');
      lastBeta = betaCells[betaCells.length - 1];
      writeDegr(degr, min, sec, lastBeta.cells[1])
      lastBeta.cells[0].innerHTML = 'т' + afterBetaLines.length;

    }
    afterBeta();
    secondForm.reset();
    calcMeasureCorners();
  }
};

function afterBeta() {
  let degrees;
  let length = secondForm.length.value;
  let betaCells = document.querySelectorAll('.addBeta');
  let lastBeta = betaCells[betaCells.length - 1];

  lastBeta.insertAdjacentHTML('afterend', '<tr class="afterBeta"><td colspan="4"></td><td class="alphaCorner"></td><td class="measureLength"></td><td class="measureDistance"></td><td class="gammaCorner"></td><td ></td><td></td><td class="fX"></td><td class="fY"></td><td></td><td></td><td colspan="2"></td></tr>')
  let measureLengths = document.querySelectorAll('.measureLength');
  let lastmeasureLength = measureLengths[measureLengths.length - 1];
  let measureDistance = document.querySelectorAll('.measureDistance');
  let lastMeasureDistance = measureDistance[measureDistance.length - 1];
  let gammaCorners = document.querySelectorAll('.gammaCorner');
  let lastGammaCorner = gammaCorners[gammaCorners.length - 1];

  if (document.getElementById("measureDistance").selected) {

    lastMeasureDistance.innerHTML = Number(length).toFixed(2);

    let gammaDegr = secondForm.gammaCornerDegr.value;
    let gammaMin = secondForm.gammaCornerMin.value;
    let gammaSec = secondForm.gammaCornerSec.value;

    writeDegr(gammaDegr, gammaMin, gammaSec, lastGammaCorner);

    if (gammaDegr.length > 0 && gammaMin.length == 0 && gammaSec.length == 0) {
      degrees = gammaDegr;
    } else if (gammaDegr.length > 0 && gammaMin.length > 0 && gammaSec.length == 0) {
      degrees = Number(gammaDegr) + (gammaMin / 60);
    } else if (gammaDegr.length > 0 && gammaMin.length > 0 && gammaSec.length > 0) {
      degrees = Number(gammaDegr) + ((Number(gammaMin) + gammaSec / 60) / 60)
    }

    degrees = (degrees == undefined) ? 0 : degrees;

    radians = (degrees * Math.PI) / 180;
    length = Math.cos(radians) * length;
    lastmeasureLength.innerHTML = degrees != 0 ? length.toFixed(2) : length;

  } else {
    lastmeasureLength.innerHTML = Number(length).toFixed(2);
  }
}

function prevSiblingFunc(elem, selector) {

  var sibling = elem.previousElementSibling;
  if (!selector) return sibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
};

function nextSiblingFunc(elem, selector) {

  var sibling = elem.nextElementSibling;
  if (!selector) return sibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
};
minFields.forEach(element => {
  element.addEventListener('keyup', function () {
    if (element.value > 0) {
      if (element.id == 'gammaCornerMin') {
        prevSiblingFunc(element, '.cornerDegr').setAttribute('max', 89);
        prevSiblingFunc(element, '.cornerDegr').setAttribute('min', -89);
      } else {
        prevSiblingFunc(element, '.cornerDegr').setAttribute('max', 359);
      }
    } else {
      if (element.id == 'gammaCornerMin') {
        prevSiblingFunc(element, '.cornerDegr').setAttribute('max', 90);
        prevSiblingFunc(element, '.cornerDegr').setAttribute('min', -90);
      } else {
        prevSiblingFunc(element, '.cornerDegr').setAttribute('max', 360);
      }
    }

    if (prevSiblingFunc(element, '.cornerDegr').value == '') {
      prevSiblingFunc(element, '.cornerDegr').value = 0
    }
  })

  element.addEventListener('change', function () {
    if (element.value.length == '' && nextSiblingFunc(element, '.cornerSec.field').value >= 0) {
      element.value = 0;
    }
  })
})

secFields.forEach(element => {
  element.addEventListener('keyup', function () {
    if (element.value > 0) {

      if (element.id == 'gammaCornerSec') {
        prevSiblingFunc(element, '.cornerMin.field').setAttribute('max', 59);
        prevSiblingFunc(element, '.cornerDegr').setAttribute('max', 89);
        prevSiblingFunc(element, '.cornerDegr').setAttribute('min', -89);
      } else {
        prevSiblingFunc(element, '.cornerMin.field').setAttribute('max', 59);
        prevSiblingFunc(element, '.cornerDegr').setAttribute('max', 359);
      }
    } else {
      if (element.id == 'gammaCornerSec') {
        prevSiblingFunc(element, '.cornerMin.field').setAttribute('max', 60);
        if (prevSiblingFunc(element, '.cornerMin.field').value <= 0) {
          prevSiblingFunc(element, '.cornerDegr').setAttribute('max', 90);
          prevSiblingFunc(element, '.cornerDegr').setAttribute('min', -90);
        }
      } else {
        prevSiblingFunc(element, '.cornerMin.field').setAttribute('max', 60);
        if (prevSiblingFunc(element, '.cornerMin.field').value <= 0) {
          prevSiblingFunc(element, '.cornerDegr').setAttribute('max', 360);
        }
      }
    }
    if (prevSiblingFunc(element, '.cornerMin.field').value == '') {
      prevSiblingFunc(element, '.cornerMin.field').value = 0
    }
    if (prevSiblingFunc(element, '.cornerDegr').value == '') {
      prevSiblingFunc(element, '.cornerDegr').value = 0
    }
  })
})

function lengthLimitation() {
  let builtValue = document.getElementById('builtUp').value;
  let length = document.getElementById('length');
  let classValue = document.getElementById('classAccuracy').value;
  if (classValue == '2') {
    length.setAttribute('min', 120);
    length.setAttribute('max', 800);
  } else if (classValue == '3') {
    length.setAttribute('min', 80);
    length.setAttribute('max', 500);
  } else if (classValue == '4') {
    length.setAttribute('min', 250);
    length.setAttribute('max', 3000);
  } else {
    if (builtValue == '1') {
      length.setAttribute('min', 200);
      length.setAttribute('max', 1000);
    } else {
      length.setAttribute('min', 400);
      length.setAttribute('max', 1500);
    }
  }
}

function limitLength(x, y) {
  if (x <= length.value <= y) {
    length.classList.remove('invalid');
  } else {
    length.classList.add('invalid');
  }
}

function calcMeasureCorners() {
  let sum = 0,
    sec;
  let betas = document.querySelectorAll('.addBeta');
  let lastBeta = document.getElementById('addLastBeta').cells[1].textContent;

  betas.forEach(elem => {
    let corner = transDegr(elem.cells[1].textContent);
    sec = fromSecMinDegToSec(corner.deg, corner.min, corner.sec);
    sum += sec;
  })

  if (lastBeta) {
    let res = transDegr(lastBeta);
    sec = fromSecMinDegToSec(res.deg, res.min, res.sec);
    sum += sec;
  }
  let resCorn = fromSecToSecMinDeg(sum);
  writeDegr(resCorn.deg, resCorn.min, resCorn.sec, document.getElementById('calcCornSum'));
}

function transDegr(string) {
  let deg, min, sec;
  if (string.includes('°')) {
    string = string.split('°');
    deg = Number(string.shift());
  } else {
    deg = 0;
  }
  if (string.toString().includes('\'')) {
    string = string.toString().split("'");
    min = Number(string.shift());
  } else {
    min = 0;
  }
  if (string.toString().includes('"')) {
    string = string.toString().split('"');
    sec = Number(string.shift());
  } else {
    sec = 0;
  }
  return {
    deg,
    min,
    sec
  };
}

function calcTeorCorners() {
  let sumTeorIn, sumTeorOut, sum;
  console.log(document.querySelectorAll('.betaLine'));
  let countBetas = document.querySelectorAll('.betaLine').length;
  let resCorn = document.getElementById('calcCornSum');
  let teorCornSum = document.getElementById('teorCornSum');
  let res = transDegr(resCorn.textContent);
  res = fromSecMinDegToSec(res.deg, res.min, res.sec);
  let fBeta;
  let traverseType = document.getElementById('traverseType').value;
  let cornersDirection = document.getElementById('direction').value;
  if (traverseType == '1') {
    sumTeorIn = 648000 * (countBetas - 2);
    sumTeorOut = 648000 * (countBetas + 2);

    if ((sumTeorIn - 3600) < res && res < (sumTeorIn + 3600)) {
      sum = fromSecToSecMinDeg(sumTeorIn);
    } else if ((sumTeorOut - 3600) < res && res < (sumTeorOut + 3600)) {
      sum = fromSecToSecMinDeg(sumTeorOut);
    } else {
      alert('Невірно введені кути, розрахунок неможливий');
    }

  } else if (traverseType == '2') {
    let alphaCorn = transDegr(alpha.textContent);
    alphaCorn = fromSecMinDegToSec(alphaCorn.deg, alphaCorn.min, alphaCorn.sec);
    let lastCorn = transDegr(lastAlpha.textContent);
    lastCorn = fromSecMinDegToSec(lastCorn.deg, lastCorn.min, lastCorn.sec);
    if (cornersDirection == '1') {
      sum = fromSecToSecMinDeg((alphaCorn - lastCorn) + (648000 * countBetas));
    } else if (cornersDirection == '2') {
      sum = fromSecToSecMinDeg((lastCorn - alphaCorn) + (648000 * countBetas));
    }
  }
  writeDegr(sum.deg, sum.min, sum.sec, teorCornSum);

  sum = fromSecMinDegToSec(sum.deg, sum.min, sum.sec);

  fBeta = (res - sum);
  let sign = fBeta.toString().substr(0, 1);

  if (sign == '-') {
    fBeta = fromSecToSecMinDeg(Number(fBeta.toString().slice(1)));
  } else {
    sign = '+';
    fBeta = fromSecToSecMinDeg(fBeta);
  }
  writeDegr(fBeta.deg, fBeta.min, fBeta.sec, fBetaSum);
  fBetaSum.innerHTML = sign + fBetaSum.textContent;

  
  if (fBetaValid(fBeta, countBetas)){
  shareFBeta(fBeta, countBetas, sign);
  }
  //shareFBeta(fBeta, countBetas, sign);
}

function fBetaValid(fBeta, countBetas) {
  fBeta = fromSecMinDegToSec(fBeta.deg, fBeta.min, fBeta.sec);
  let classValue = document.getElementById('classAccuracy').value;
  let controlBeta = document.getElementById('controlBeta');
  let control, res;
  if (classValue == '1') {
    control = (1 * Math.sqrt(countBetas)) * 60;
  } else if (classValue == '2') {
    control = 10 * Math.sqrt(countBetas);
  } else if (classValue == '3') {
    control = 20 * Math.sqrt(countBetas);
  } else {
    control = 5 * Math.sqrt(countBetas);
  }
  let con = fromSecToSecMinDeg(control);
 writeDegr(con.deg, con.min, con.sec, controlBeta)
  if (fBeta > control) {
    alert("Кутова нев`язка більша за допустиму, розрахунок зупинено");
    res = false;
  } else {
    res = true;
  }
  return res;
}

function shareFBeta(fBeta, countBetas, sign) {
  let distances = document.querySelectorAll('.measureLength');
  let distList = [];
  distances.forEach(elem => {
    distList.push(elem.textContent);
  })
  let minDistance = Math.min(...distList);
  let maxDistance = Math.max(...distList);
  distances.forEach(elem => {
    if (elem.textContent == minDistance) {
      elem.classList.add('minLength');
    }
    if (elem.textContent == maxDistance) {
      elem.classList.add('maxLength');
    }
  })
  fBeta = fromSecMinDegToSec(fBeta.deg, fBeta.min, fBeta.sec);
  let d = fBeta / countBetas;
  let fBetas = document.querySelectorAll('.fBeta');
  if ((d - Math.trunc(d)) == 0) {
    fBetas.forEach(element => {
      element.innerHTML = d + '"'
    })
  } else {
    fBetas.forEach(element => {
      element.innerHTML = Math.trunc(d) + '"'
    })
    let elements = document.querySelectorAll('.minLength');
    elements.forEach(elem => {
      let value = elem.parentElement.nextElementSibling.children[2].textContent;
      let res = Number(value.split('"').shift()) + ((fBeta - (Math.trunc(d) * countBetas)) / elements.length);
      elem.parentElement.nextElementSibling.children[2].innerHTML = res + '"';
    })
  }
  fBetas.forEach(elem => {
    if (sign == '-') {
      elem.innerHTML = '+' + elem.textContent;
    } else if (sign == '+') {
      elem.innerHTML = '-' + elem.textContent;
    }
  })
  correctedCorners();
}

function correctedCorners() {
  let lines = document.querySelectorAll('.betaLine');
  lines.forEach(elem => {
    let corn = transDegr(elem.children[1].textContent);
    let sec = fromSecMinDegToSec(corn.deg, corn.min, corn.sec);
    let res = (sec + Number(transDegr(elem.children[2].textContent).sec));
    let sign = res.toString().substr(0, 1);
    if (sign == '-') {
      res = fromSecToSecMinDeg(Number(res.toString().slice(1)));
    } else {
      sign = '';
      res = fromSecToSecMinDeg(res);
    }
    writeDegr(res.deg, res.min, res.sec, elem.children[3]);
    elem.children[3].innerHTML = sign + elem.children[3].textContent;
  })
  calcAlphaCorners();
}

function fromSecToSecMinDeg(res) {
  let sec = Math.round((res / 60 - Math.trunc(res / 60)) * 60);
  let min = Math.round((Math.trunc(res / 60) / 60 - Math.trunc(Math.trunc(res / 60) / 60)) * 60);
  let deg = Math.trunc(Math.trunc(res / 60) / 60);
  return {
    deg,
    min,
    sec
  };
}

function fromSecMinDegToSec(deg, min, sec) {
  if (deg.toString().substr(0, 1) == '-') {
    deg = Number(deg.toString().slice(1));
    sec = -((Number(deg) * 60 + Number(min)) * 60 + Number(sec));
  } else {
    sec = ((Number(deg) * 60 + Number(min)) * 60 + Number(sec));
  }
  return sec;
}

function calcAlphaCorners() {
  let res;
  let corners = document.querySelectorAll('.alphaCorner');
  let cornersDirection = document.getElementById('direction').value;
  let alpha = document.getElementById('lastAlpha');

  corners.forEach(elem => {
    let elemIndex = Array.prototype.slice.call(corners).indexOf(elem);
    let betaCorner = transDegr(elem.parentElement.nextElementSibling.children[3].textContent);

    elem = transDegr(elem.textContent);
    elem = fromSecMinDegToSec(elem.deg, elem.min, elem.sec);

    beta = fromSecMinDegToSec(betaCorner.deg, betaCorner.min, betaCorner.sec);

    if (cornersDirection == '1') {
      res = elem - beta + (648000);
    } else if (cornersDirection == '2') {
      res = elem + beta - (648000);
    }

    if (res > 1296000) {
      res = res - 1296000;
    } else if (res < 0) {
      res = res + 1296000;
    }

    
    if (corners[elemIndex + 1]) {res = fromSecToSecMinDeg(res);
      writeDegr(res.deg, res.min, res.sec, corners[elemIndex + 1]);
    } else {
      alpha = transDegr(alpha.textContent);
      if(res == fromSecMinDegToSec(alpha.deg, alpha.min, alpha.sec)){
        console.log(true)
      }else{
      console.log(false);
    }
  }})
  calculatePerimetr();
}

function calculatePerimetr() {
  let lengths = document.querySelectorAll('.measureLength');
  let sum = 0;
  lengths.forEach(elem => {
    sum += Number(elem.textContent);
  })
  document.getElementById('perimeter').innerHTML = sum.toFixed(2);
  countDeltX();
}

function countDeltX() {
  let lines = document.querySelectorAll('.afterBeta');
  let sumX = 0;
  let sumY = 0;
  lines.forEach(elem => {
    let corn = transDegr(elem.children[1].textContent);
    let degrees = Number(corn.deg) + ((Number(corn.min) + Number(corn.sec) / 60) / 60);
    let radians = (degrees * Math.PI) / 180;
    let length = Number(elem.children[2].textContent)
    deltX = Number((Math.cos(radians) * length).toFixed(2));
    deltY = Number((Math.sin(radians) * length).toFixed(2));
    sumX += deltX;
    sumY += deltY;
    elem.children[5].innerHTML = deltX;
    elem.children[6].innerHTML = deltY;
  })
  let teorX = Number(document.getElementById('penultPointXCoordinate').textContent) - Number(document.getElementById('secondPointXCoordinate').textContent);
  let teorY = Number(document.getElementById('penultPointYCoordinate').textContent) - Number(document.getElementById('secondPointYCoordinate').textContent);

  document.getElementById('sumX').innerHTML = sumX.toFixed(2);
  document.getElementById('sumY').innerHTML = sumY.toFixed(2);
  document.getElementById('teorSumX').innerHTML = teorX.toFixed(2);
  document.getElementById('teorSumY').innerHTML = teorY.toFixed(2);
  let xRes = Number((sumX - teorX).toFixed(2));
  let yRes = Number((sumY - teorY).toFixed(2));
  document.getElementById('sumMinTeorX').innerHTML = xRes;
  document.getElementById('sumMinTeorY').innerHTML = yRes;
  
  document.getElementById('fAbs').innerHTML = fAbs().toFixed(2);
  

  let per = Number(document.getElementById('perimeter').textContent);
  lines.forEach(elem => {
    elem.children[7].innerHTML = -(((xRes / per) * Number(elem.children[2].textContent)).toFixed(2));
    elem.children[8].innerHTML = -(((yRes / per) * Number(elem.children[2].textContent)).toFixed(2));
  })

  let xPractSum = 0;
  let yPractSum = 0;
  let fXs = document.querySelectorAll('.fX');
  let fYs = document.querySelectorAll('.fY');
  fXs.forEach(elem => {
    xPractSum += Number(elem.textContent);
  })
  fYs.forEach(elem => {
    yPractSum += Number(elem.textContent);
  })

  let maxLengths = document.querySelector('.maxLength');
  let minLengths = document.querySelector('.minLength');
  let valueX = maxLengths.parentElement.children[7];
  let valueY = maxLengths.parentElement.children[8];
  let minX = Number(minLengths.parentElement.children[7].textContent);
  let minY = Number(minLengths.parentElement.children[8].textContent);

  if ((xRes + Number(xPractSum.toFixed(2))) > 0) {
    if (Math.abs(minX) > 0) {
      minLengths.parentElement.children[7].innerHTML = (-0.01 + minX).toFixed(2);
    } else {
      maxLengths.parentElement.children[7].innerHTML = (-0.01 + Number(valueX.textContent)).toFixed(2);
    }
  }
  if ((xRes + Number(xPractSum.toFixed(2))) < 0) {
    if (Math.abs(minX) > 0) {
      minLengths.parentElement.children[7].innerHTML = (+0.01 + minX).toFixed(2);
    } else {
      maxLengths.parentElement.children[7].innerHTML = (+0.01 + Number(valueX.textContent)).toFixed(2);
    }
  }
  if ((yRes + Number(yPractSum.toFixed(2))) > 0) {
    if (Math.abs(minY) > 0) {
      minLengths.parentElement.children[8].innerHTML = (-0.01 + minY).toFixed(2);
    } else {
      maxLengths.parentElement.children[8].innerHTML = (-0.01 + Number(valueY.textContent)).toFixed(2);
    }
  }
  if ((yRes + Number(yPractSum.toFixed(2))) < 0) {
    if (Math.abs(minY) > 0) {
      minLengths.parentElement.children[8].innerHTML = (+0.01 + minY).toFixed(2);
    } else {
      maxLengths.parentElement.children[8].innerHTML = (+0.01 + Number(valueY.textContent)).toFixed(2);
    }
  }

  lines.forEach(elem => {
    elem.children[9].innerHTML = (Number(elem.children[5].textContent) + Number(elem.children[7].textContent)).toFixed(2);
    elem.children[10].innerHTML = (Number(elem.children[6].textContent) + Number(elem.children[8].textContent)).toFixed(2);
  })

  let xPoints = document.querySelectorAll('.xClass');
  let yPoints = document.querySelectorAll('.yClass');
  calcPoints(xPoints, 9);
  calcPoints(yPoints, 10);
  fRel();
}

function fAbs(){
  let x = Number(document.getElementById('sumMinTeorX').textContent);
  let y = Number(document.getElementById('sumMinTeorY').textContent);
  let res = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  return res;
}

function fRel(){
  let p = Number(document.getElementById('perimeter').textContent);
  let f = fAbs();
  let res = p/f;
  document.getElementById('fRel').innerHTML = '1' + ':' + Math.round(res);
 
  let classValue = document.getElementById('classAccuracy').value;
  if (classValue == '2') {
    if((1/res) > (1/10000)){
      alert('Відносна помилка ходу перевищує допустиме значення, перевірте правильніть введених даниих та повторіть розрахунок');
    }
  } else if (classValue == '3') {
    if((1/res) > (1/5000)){
      alert('Відносна помилка ходу перевищує допустиме значення, перевірте правильніть введених даниих та повторіть розрахунок');
    }
  } else if (classValue == '4') {
    if((1/res) > (1/25000)){
      alert('Відносна помилка ходу перевищує допустиме значення, перевірте правильніть введених даниих та повторіть розрахунок');
    }
  } else if (classValue == '1'){
    if((1/res) > (1/2000)){
      alert('Відносна помилка ходу перевищує допустиме значення, перевірте правильніть введених даниих та повторіть розрахунок');
    }
  }
}

function calcPoints(el, index) {
  let res;
  el.forEach(elem => {
    let elemIndex = Array.prototype.slice.call(el).indexOf(elem);
    let deltPoint = Number(elem.parentElement.nextElementSibling.children[index].textContent);
    res = (Number(elem.textContent) + deltPoint).toFixed(2)
    if (el[elemIndex + 1]) {
      el[elemIndex + 1].innerHTML = res;
    } else {
      console.log(res);
    }
  })
}