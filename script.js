function calculateDogAge() {
  const name = document.getElementById('dogName').value || "你的狗狗";
  const dob = new Date(document.getElementById('dob').value);
  const size = document.getElementById('size').value;

  if (!dob.getTime()) {
    alert("請輸入正確的出生日期！");
    return;
  }

  // 計算狗狗實際年齡
  const today = new Date();
  let dogAge = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) dogAge--;

  // 依據體型換算人類年齡
  let humanAge;
  if (size === "small") {
    humanAge = 16 * Math.log(dogAge) + 31;
  } else if (size === "medium") {
    humanAge = 14 * Math.log(dogAge) + 32;
  } else { // large
    humanAge = 12 * Math.log(dogAge) + 34;
  }

  humanAge = humanAge < 0 ? 0 : Math.round(humanAge);

  // 顯示結果
  const resultText = `
    <strong>${name}的狗狗年齡：</strong> ${dogAge} 歲<br>
    <strong>換算成人類年齡：</strong> ${humanAge} 歲
  `;
  document.getElementById('result').innerHTML = resultText;

  // 儲存到 localStorage
  localStorage.setItem('lastResult', JSON.stringify({
    name: name,
    dob: document.getElementById('dob').value,
    size: size,
    dogAge: dogAge,
    humanAge: humanAge
  }));
}

// 頁面載入時，顯示上一次運算結果
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
  }
});

