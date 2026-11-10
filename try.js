const grades = [
  { name: { ar: 'اللغة العربية', en: 'Arabic' }, value: 92 },
  { name: { ar: 'الرياضيات', en: 'Mathematics' }, value: 88 },
  { name: { ar: 'العلوم', en: 'Science' }, value: 96 },
  { name: { ar: 'البرمجة', en: 'Programming' }, value: 90 }
];

const translations = {
  ar: {
    brand: 'مساحتي التعليمية',
    eyebrow: 'ملخص الأداء',
    title: 'نتائجي الدراسية',
    subtitle: 'كل إنجاز يبدأ بخطوة. إليك نظرة سريعة على درجاتك وتقدمك.',
    average: 'المتوسط العام',
    outOf: 'من 100',
    subjects: 'المواد الدراسية',
    subjectCount: (count) => `${count} مواد`,
    footer: 'درجات تجريبية — يمكنك تعديلها في ملف try.js'
  },
  en: {
    brand: 'My Learning Space',
    eyebrow: 'YOUR PERFORMANCE',
    title: 'My grades',
    subtitle: 'Every achievement starts with a step. Here is a quick look at your grades and progress.',
    average: 'Overall average',
    outOf: 'out of 100',
    subjects: 'Subjects',
    subjectCount: (count) => `${count} subjects`,
    footer: 'Sample grades — you can edit them in try.js'
  }
};

const gradesContainer = document.getElementById('grades');
let currentLanguage = 'ar';

function renderGrades(language) {
  if (!gradesContainer) return;

  const fragment = document.createDocumentFragment();
  grades.forEach((grade) => {
    const article = document.createElement('article');
    article.className = 'grade';

    const top = document.createElement('div');
    top.className = 'grade-top';
    const name = document.createElement('span');
    name.className = 'grade-name';
    name.textContent = grade.name[language];
    const score = document.createElement('span');
    score.className = 'grade-score';
    score.append(document.createTextNode(String(grade.value) + ' '));
    const maximum = document.createElement('span');
    maximum.textContent = '/ 100';
    score.appendChild(maximum);
    top.append(name, score);

    const track = document.createElement('div');
    track.className = 'track';
    track.setAttribute('aria-hidden', 'true');
    const fill = document.createElement('div');
    fill.className = 'fill';
    fill.style.width = `${grade.value}%`;
    track.appendChild(fill);
    article.append(top, track);
    fragment.appendChild(article);
  });
  gradesContainer.replaceChildren(fragment);
}

function setLanguage(language) {
  if (!translations[language]) return;
  currentLanguage = language;
  const text = translations[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('brand-name').textContent = text.brand;
  document.getElementById('eyebrow').textContent = text.eyebrow;
  document.getElementById('page-title').textContent = text.title;
  document.getElementById('subtitle').textContent = text.subtitle;
  document.getElementById('average-label').textContent = text.average;
  document.getElementById('out-of').textContent = text.outOf;
  document.getElementById('grades-title').textContent = text.subjects;
  document.getElementById('grades-count').textContent = text.subjectCount(grades.length);
  document.getElementById('footer-text').textContent = text.footer;
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
  renderGrades(language);
}

const average = Math.round(grades.reduce((sum, grade) => sum + grade.value, 0) / grades.length);
const averageScore = document.getElementById('average-score');
if (averageScore) averageScore.textContent = String(average);

document.querySelectorAll('[data-language]').forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});

setLanguage(currentLanguage);
