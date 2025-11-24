// script.js

// 🐶 主邏輯：按下按鈕時呼叫
function calculateDogAge() {
  const name = document.getElementById("dogName").value.trim();
  const dob = document.getElementById("dob").value;
  const size = document.getElementById("size").value;
  const result = document.getElementById("result");

  // 清空結果
  result.innerHTML = "";

  // ➤ 基本檢查
  if (!dob) {
    result.innerHTML = `<p style="color:crimson;">請輸入出生日期</p>`;
    return;
  }

  // ➤ 計算實際年齡（以年為單位）
  const birthDate = new Date(dob);
  const today = new Date();

  const diffMs = today - birthDate;
  const ageYears = diffMs / (1000 * 60 * 60 * 24 * 365.25); // 以年為單位

  if (ageYears < 0) {
    result.innerHTML = `<p style="color:crimson;">出生日期不能是未來！</p>`;
    return;
  }

  // ➤ 換算成「人類年齡」
  const humanAge = convertToHumanAge(ageYears, size);

  // ➤ 顯示結果
  const dogNameDisplay = name ? `${name} 的` : "你的狗狗";

  result.innerHTML = `
    <div class="result-box">
      <h3>🐕 ${dogNameDisplay} 年齡計算結果</h3>
      <p>實際年齡：約 <strong>${ageYears.toFixed(1)}</strong> 歲</p>
      <p>換算成人類年齡：約 <strong>${humanAge}</strong> 歲</p>
    </div>
  `;
}

// 🧠 年齡換算邏輯（依體型）
function convertToHumanAge(age, size) {
  // 參考：UCSD 甲基化研究 + AVMA 體型影響
  // 數值使用常見簡化版（方便前端使用）
  if (age <= 0) return 0;

  let baseHuman;

  // 第一階段：前 2 年共通
  if (age <= 1) {
    baseHuman = 15 * age; // 第一年 = 15 人歲
  } else if (age <= 2) {
    baseHuman = 15 + (age - 1) * 9; // 第二年 = +9 人歲
  } else {
    // 第三年之後依體型差異
    let extraRate;
    switch (size) {
      case "small":
        extraRate = 4; // 小型犬走慢
        break;
      case "medium":
        extraRate = 5;
        break;
      case "large":
        extraRate = 6; // 大型犬老化較快
        break;
    }

    baseHuman = 15 + 9 + (age - 2) * extraRate;
  }

  return Math.round(baseHuman);
}

// ✔ 讓 Enter 也能觸發計算（UX 加強）
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") calculateDogAge();
});
