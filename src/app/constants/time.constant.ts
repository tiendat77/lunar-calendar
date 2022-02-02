import { AlertInput } from '@ionic/core';

function genMonths() {
  const months: AlertInput[] = [];

  for (let i = 1; i <= 12; i++) {
    months.push({
      value: i,
      label: 'Tháng ' + i,
      type: 'radio'
    });
  }

  return months;
}

function genYears() {
  const years: AlertInput[] = [];
  const now = new Date().getFullYear();

  for (let i = now - 100; i <= 2100; i++) {
    years.push({
      value: i,
      label: 'Năm ' + i,
      type: 'radio'
    });
  }

  return years;
}

export const MONTHS: AlertInput[] = genMonths();
export const YEARS: AlertInput[] = genYears();
