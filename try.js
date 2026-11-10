const grades = [
  { name: 'اللغة العربية', value: 92 },
  { name: 'الرياضيات', value: 88 },
  { name: 'العلوم', value: 96 },
  { name: 'البرمجة', value: 90 }
];

const gradesContainer = document.getElementById('grades');
const result = document.getElementById('result');

if (gradesContainer) {
  grades.forEach((grade) => {
    const row = document.createElement('div');
    row.className = 'grade';

    const label = document.createElement('span');
    label.textContent = grade.name;

    const score = document.createElement('span');
    score.className = 'score';
    score.textContent = `${grade.value}/100`;

    row.appendChild(label);
    row.appendChild(score);
    gradesContainer.appendChild(row);
  });
}

if (result) {
  const average = Math.round(grades.reduce((sum, item) => sum + item.value, 0) / grades.length);
  result.textContent = `متوسطك النهائي: ${average} / 100`;
  result.hidden = false;
}
