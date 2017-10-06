var hisTxt = [];
var curTxt = [];

function buttonClick(val) {
  switch (val) {
    case 'AC':
      curTxt = [];
      hisTxt = [];
      $('#inputTxt').text('0');
      $('#hisTxt').text('0');
      break;
    case 'CE':
      curTxt = [];
      $('#inputTxt').text('0');
      break;
    case '=':
      var t = calculation(curTxt).toString();
      $('#inputTxt').text(t);
      $('#hisTxt').text(t);
      curTxt = [];
      hisTxt = t.split('');
      break;
    default:
      if (curTxt.length === 0) {
        if (val === '+' || val === '-' || val === '*' || val === "/") {
          curTxt = hisTxt.slice();
        }
      }
      curTxt.push(val);
      $('#inputTxt').text(curTxt.join(''));
      break;
  }
}

function calculation(arr) {
  var val = 0;
  var numStr = [];
  var express = [];

  for (var i = 0, n = arr.length; i < n; i++) {
    if (arr[i] === '*' || arr[i] === '/') {
      if (numStr.length !== 0) express.push(parseFloat(numStr.join('')));
      numStr = [];
      express.push(arr[i]);
    } else if (arr[i] === '+' || arr[i] === '-') {
      if (numStr.length !== 0) express.push(parseFloat(numStr.join('')));
      numStr = [arr[i]];
    } else {
      numStr.push(arr[i]);
    }
  }

  if (numStr.length !== 0) express.push(parseFloat(numStr.join('')));

  return evalExpress(express);
}

function evalExpress(arr) {
  var ex;
  var i, n;
  var re = 0;
  for (i = 0, n = arr.length; i < n; i++) {
    if (arr[i] === '*') {
      ex = arr.splice(i-1,3);
      arr.splice(i-1,0,ex[0] * ex[2]);
    }
    if (arr[i] === '/') {
      ex = arr.splice(i-1,3);
      arr.splice(i-1,0,ex[0] / ex[2]);
    }
  }

  for (i = 0, n = arr.length; i < n; i++) {
    re += arr[i];
  }

  return re;
}