'use strict';
{
  function simulate() {
    console.log('NISA 積立シミュレーションを実行');

    const monthly = Number(document.getElementById('monthly').value);
    const startMonth = document.getElementById('startMonth').value;
    const annualRate = Number(document.getElementById('annualRate').value) / 100;
    const years = Number(document.getElementById('years').value);

    const months = years * 12;
    const monthlyRate = annualRate / 12;

    let totalInvest = 0;
    let value = 0;

    const tbody = document.querySelector('#resultTable tbody');
    tbody.innerHTML = '';

    let [year, month] = startMonth.split('-').map(Number);

    for (let i = 0; i < months; i++) {
      totalInvest += monthly;
      value = (value + monthly) * (1 + monthlyRate);

      const profit = value - totalInvest;

      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${year}-${String(month).padStart(2, '0')}</td>
      <td>${totalInvest.toLocaleString()}</td>
      <td>${value.toFixed(0).toLocaleString()}</td>
      <td>${profit.toFixed(0).toLocaleString()}</td>
    `;
      tbody.appendChild(row);

      month++;
      if (month > 12) { month = 1; year++; }
    }
  }

  document.getElementById('simulate').addEventListener('click', simulate);
}