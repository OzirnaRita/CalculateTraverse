let pointX2 = document.getElementById('pointX2');
let pointY2 = document.getElementById('pointY2');
let lastPointX2 = document.getElementById('lastPointX2');
let lastPointY2 = document.getElementById('lastPointY2');
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

let fields, secondFormFields;
let minFields = document.querySelectorAll('.cornerMin');
let secFields = document.querySelectorAll('.cornerSec');
let table = document.getElementById('table');
let rows = table.getElementsByTagName('tr');

let classValue = document.getElementById('classAccuracy').value;

document.addEventListener('click', cornerMin)

if (form) {
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

function selectCornerOrPoints() {
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
  }
}

function selectLastCornerOrPoints() {
  if (document.getElementById("lastCorner").checked) {
    lastCornerBlock.style.display = 'block';
    lastPointCoordinates.style.display = 'none';
    lastPointX2.required = false;
    lastPointY2.required = false;
    lastCornerDegrDirect.required = true;
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
    /*const data = formToJSON(form.elements);
    console.log(data)
    console.log(JSON.stringify(data))


    let url="https://kizv.gov.ua/post.php";

        fetch(url,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          //'Access-Control-Allow-Origin': 'https://kizv.gov.ua/post.php',
         'Content-Type':'application/x-www-form-urlencoded'
         //'Access-Control-Allow-Credentials': true}
        }
      })
      .then(response => console.log(response))
      
       //form.style.display = "none";
        //secondForm.style.display = "block";
        */
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

  let alpha = document.getElementById('firstAlpha');
  let lastAlpha = document.getElementById('lastAlpha');


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

    cornerSec = afterMinPoint.toFixed(3)
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

// secondForm.addEventListener('submit', (e) => {
//   e.preventDefault();
// console.log(event);
//   if (event.target.id == 'sideOfTraverseButton') {
//     add();
//     secondForm.reset();
//   } else {
//     addLastCorner();
//     secondForm.reset();
//     document.getElementById('sideOfTraverseButton').disabled = true;
//     document.getElementById('lastBetaCorner').disabled = true;
//     secondForm.reset();
//     //calculateResults();
//   }
// });


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

    let lastBeta = betaCells[betaCells.length - 1];

    if (lastBeta.cells[1].firstChild == null) {
      writeDegr(degr, min, sec, lastBeta.cells[1]);
      document.getElementById('lastBetaCorner').removeAttribute("disabled");
    } else {
      let afterBetaLines = document.querySelectorAll('.afterBeta');
      let lastAfterBeta = afterBetaLines[afterBetaLines.length - 1];

      lastAfterBeta.insertAdjacentHTML('afterend', '<tr class="addBeta betaLine"><td></td><td></td><td class="fBeta"></td><td></td><td colspan="10"></td><td></td><td></td></tr>');
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

  lastBeta.insertAdjacentHTML('afterend', '<tr class="afterBeta"><td colspan="4"></td><td></td><td class="measureLength"><td class="measureDistance"></td><td class="gammaCorner"></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>')
  let measureLengths = document.querySelectorAll('.measureLength');
  let lastmeasureLength = measureLengths[measureLengths.length - 1];
  let measureDistance = document.querySelectorAll('.measureDistance');
  let lastMeasureDistance = measureDistance[measureDistance.length - 1];
  let gammaCorners = document.querySelectorAll('.gammaCorner');
  let lastGammaCorner = gammaCorners[gammaCorners.length - 1];

  if (document.getElementById("measureDistance").selected) {

    lastMeasureDistance.innerHTML = length;

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
    lastmeasureLength.innerHTML = degrees != 0 ? length.toFixed(3) : length;

  } else {
    lastmeasureLength.innerHTML = Number(length).toFixed(3);
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
console.log(minFields)
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
  // if (classValue == '2') {
  //   document.getElementById('length').setAttribute('min', 0.12);
  //   document.getElementById('length').setAttribute('max', 0.80);
  // } else if (classValue == '3') {
  //   document.getElementById('length').setAttribute('min', 0.08);
  //   document.getElementById('length').setAttribute('max', 0.50);
  // } else if (classValue == '4') {
  //   document.getElementById('length').setAttribute('min', 0.25);
  //   document.getElementById('length').setAttribute('max', 3.0);
  // } else {
  //   if (builtValue == '1') {
  //     document.getElementById('length').setAttribute('min', 0.2);
  //     document.getElementById('length').setAttribute('max', 1);
  //   } else {
  //     document.getElementById('length').setAttribute('min', 0.4);
  //     document.getElementById('length').setAttribute('max', 1.5);
  //   }
  // }
  if (classValue == '2') {
    document.getElementById('length').setAttribute('min', 120);
    document.getElementById('length').setAttribute('max', 800);
  } else if (classValue == '3') {
    document.getElementById('length').setAttribute('min', 80);
    document.getElementById('length').setAttribute('max', 500);
  } else if (classValue == '4') {
    document.getElementById('length').setAttribute('min', 250);
    document.getElementById('length').setAttribute('max', 3000);
  } else {
    if (builtValue == '1') {
      document.getElementById('length').setAttribute('min', 200);
      document.getElementById('length').setAttribute('max', 1000);
    } else {
      document.getElementById('length').setAttribute('min', 400);
      document.getElementById('length').setAttribute('max', 1500);
    }
  }
}

function calcMeasureCorners() {
  let degSum = 0;
  let minSum = 0;
  let secSum = 0;

  let lastBeta = document.getElementById('addLastBeta').cells[1].textContent;
  let res = transDegr(lastBeta);
  let betas = document.querySelectorAll('.addBeta');

  betas.forEach(elem => {
    let corner = transDegr(elem.cells[1].textContent);
    degSum += Number(corner.deg);
    minSum += Number(corner.min);
    secSum += Number(corner.sec);
  })

  degSum += Number(res.deg);
  minSum += Number(res.min);
  secSum += Number(res.sec);

  if (secSum >= 60) {
    minSum += Math.trunc(secSum / 60);
    if (Math.trunc(secSum / 60) == secSum / 60) {
      secSum = '';
    } else {
      secSum = Math.round((secSum / 60 - Math.trunc(secSum / 60)) * 60);
    }
  }

  if (minSum >= 60) {
    degSum += Math.trunc(minSum / 60);
    if (Math.trunc(minSum / 60) == minSum / 60) {
      if (secSum !== '') {
        minSum = 0;
      } else {
        minSum = '';
      }
    } else {
      if (secSum == 0) {
        minSum = ((minSum / 60 - Math.trunc(minSum / 60)) * 60).toFixed(1);
      } else {
        minSum = Math.round((minSum / 60 - Math.trunc(minSum / 60)) * 60);
      }
    }
  }
  writeDegr(degSum, minSum, secSum, document.getElementById('calcCornSum'));
}

function transDegr(string) {
  let str = string.split('°');
  let deg = str.shift();
  str = str.toString().split("'");
  let min = str.shift();
  str = str.toString().split('"');
  let sec = str.shift();
  return {
    deg,
    min,
    sec
  };
}

function calcTeorCorners() {
  let countBetas = document.querySelectorAll('.betaLine').length;
  let resCorn = document.getElementById('calcCornSum');
  let teorCornSum = document.getElementById('teorCornSum');
  let res = transDegr(resCorn.textContent);
  let fBeta;

  let sumTeorIn = 180 * (countBetas - 2);
  let sumTeorOut = 180 * (countBetas + 2);

  if (res.deg == sumTeorIn || res.deg == (sumTeorIn - 1)) {
    teorCornSum.innerHTML = sumTeorIn + '&deg;'
  } else if (res.deg == sumTeorOut || res.deg == (sumTeorOut - 1)) {
    teorCornSum.innerHTML = sumTeorOut + '&deg;'
  } else {
    alert('Невірно введені кути, розрахунок неможливий')
  }

  if (res.deg == sumTeorIn || res.deg == sumTeorOut) {
    if ((res.min.length == 0 || res.min == 0) && (res.sec.length == 0 || res.sec == 0)) {
      fBeta = 0;
    } else if (res.min > 0 && (res.sec.length == 0 || res.sec == 0)) {
      fBeta = '+' + res.min + "'";
    } else if (res.min >= 0 && res.sec > 0) {
      fBeta = '+' + res.min + "'" + res.sec + '"';
    }
  } else if (res.deg == (sumTeorIn - 1) || res.deg == (sumTeorOut - 1)) {
    if ((res.min.length == 0 || res.min == 0) && (res.sec.length == 0 || res.sec == 0)) {
      fBeta = '-' + 1 + '&deg;'; // ask
    } else if (res.min > 0 && (res.sec.length == 0 || res.sec == 0)) {
      fBeta = '-' + (60 - res.min) + "'";
    } else if (res.min >= 0 && res.sec > 0) {
      fBeta = '-' + (59 - res.min) + "'" + (60 - res.sec) + '"';
    }
  }
  document.getElementById('fBeta').innerHTML = fBeta;
  //fBetaValid(fBeta, countBetas);
  shareFBeta(fBeta, countBetas);
}

function fBetaValid(x, countBetas) {

  x = x.toString().slice(1);
  let res = transDegr('0°' + x);
  let control;
  if (classValue == '1') {
    control = 1 * Math.sqrt(countBetas);
    value = Number(res.min) + Number(res.sec / 60);
  } else if (classValue == '2') {
    control = 10 * Math.sqrt(countBetas);
    value = Number(res.min * 60) + Number(res.sec);
  } else if (classValue == '3') {
    control = 20 * Math.sqrt(countBetas);
    value = Number(res.min * 60) + Number(res.sec);
  } else {
    control = 5 * Math.sqrt(countBetas);
    value = Number(res.min * 60) + Number(res.sec);
  }
  console.log(value)
  console.log(control)
  if (value > control) {
    alert("Кутова нев`язка більша за допустиму, розрахунок зупинено")
  } else {
    // shareFBeta(x);
  }
}

function shareFBeta(x, countBetas) {
  let distances = document.querySelectorAll('.measureLength');
  let distList = [];
  distances.forEach(elem => {
    distList.push(elem.textContent);
  })

  let minDistance = Math.min(...distList);

  distances.forEach(elem => {
    if (elem.textContent == minDistance) {
      elem.classList.add('minLength');
    }
  })

  x = x.toString().slice(1);
  let res = transDegr('0°' + x);
  let sum = (Number(res.min) * 60 + Number(res.sec))
  let d = sum / countBetas;
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
      let res = Number(value.split('"').shift()) + ((sum - (Math.trunc(d) * countBetas)) / elements.length);
      elem.parentElement.nextElementSibling.children[2].innerHTML = res + '"';
    })
  }
}