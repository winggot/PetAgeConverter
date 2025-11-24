function calculateDogAge() {
  const name = document.getElementById('dogName').value || "你的狗狗";
  const dobInput = document.getElementById('dob').value;
  const size = document.getElementById('size').value;

  if (!dobInput) {
    alert("請輸入出生日期！");
    return;
  }

  const dob = new Date(dobInput);
  if (isNaN(dob.getTime())) {
    alert("請輸入正確的出生日期！");
    return;
  }

  const today = new Date();
  let dogAge = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) dogAge--;

  let ageForCalc = dogAge < 1 ? 1 : dogAge;

  let humanAge;
  if (size === "small") humanAge = 16 * Math.log(ageForCalc) + 31;
  else if (size === "medium") humanAge = 14 * Math.log(ageForCalc) + 32;
  else humanAge = 12 * Math.log(ageForCalc) + 34;

  humanAge = humanAge < 0 ? 0 : Math.round(humanAge);

  const resultText = `
    <strong>${name}的狗狗年齡：</strong> ${dogAge} 歲<br>
    <strong>換算成人類年齡：</strong> ${humanAge} 歲
  `;
  document.getElementById('result').innerHTML = resultText;

  localStorage.setItem('lastResult', JSON.stringify({
    name,
    dob: dobInput,
    size,
    dogAge,
    humanAge
  }));

  document.getElementById('loadMsg').innerText = "✅ 計算完成，結果已儲存！";
}

function clearLastResult() {
  localStorage.removeItem('lastResult');
  document.getElementById('dogName').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('size').value = 'small';
  document.getElementById('result').innerHTML = '';
  document.getElementById('loadMsg').innerText = "❌ 上次結果已清除";
}

window.addEventListener('load', () => {
  const lastResult = JSON.parse(localStorage.getItem('lastResult'));
  if (lastResult) {
    document.getElementById('dogName').value = lastResult.name;
    document.getElementById('dob').value = lastResult.dob;
    document.getElementById('size').value = lastResult.size;
    document.getElementById('result').innerHTML = `
      <strong>${lastResult.name}的狗狗年齡：</strong> ${lastResult.dogAge} 歲<br>
      <strong>換算成人類年齡：</strong> ${lastResult.humanAge} 歲
    `;
    document.getElementById('loadMsg').innerText = "ℹ️ 已載入上次結果！";
  }
});
