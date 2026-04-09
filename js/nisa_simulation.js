'use strict';
{
  function simulate() {
    console.log('NISA 積立シミュレーションを実行');

    const monthly = Number(document.getElementById('monthly').value);
    const startMonth = document.getElementById('startMonth').value;
    const annualRate = Number(document.getElementById('annualRate').value) / 100;
    const years = Number(document.getElementById('years').value);

    // 月単位で計算するので利回りも12分の1にして計算する
    const months = years * 12;
    const monthlyRate = annualRate / 12;

    const maxInvest = 10800000;
    let totalInvest = 0;
    let profit = 0;
    let value = 0;

    const tbody = document.querySelector('#resultTable tbody');
    tbody.innerHTML = '';

    let [year, month] = startMonth.split('-').map(Number);

    for (let i = 0; i < months; i++) {
      // 積立枠の限度額が上限に達した場合は制限する
      totalInvest += monthly;
      if (totalInvest >= maxInvest) {
        totalInvest = maxInvest;
      }
      // 評価額を（積立総額 + これまでの利益） * 利率で出す
      value = (totalInvest + profit) * (1 + monthlyRate);
      // 評価額 - 積立総額で利益を更新する
      profit = value - totalInvest;

      // 小数点を切り捨てておく
      value = Math.floor(value);
      profit = Math.floor(profit);

      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${year}-${String(month).padStart(2, '0')}</td>
      <td>${totalInvest.toLocaleString()}</td>
      <td>${value.toLocaleString()}</td>
      <td>${profit.toLocaleString()}</td>
    `;
      tbody.appendChild(row);

      month++;
      if (month > 12) { month = 1; year++; }
    }
  }

  document.getElementById('simulate').addEventListener('click', simulate);
}