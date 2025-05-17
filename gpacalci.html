<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Grade Tracker & GPA Calculator</title>
  <script src="https://cdn.jsdelivr.net/npm/tesseract.js@2.1.5/dist/tesseract.min.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f5f7fa;
    }
    h2, h3 {
      color: #333;
    }
    input, select, textarea, button {
      margin: 5px 5px 10px 0;
      padding: 6px;
      font-size: 14px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 8px;
      border: 1px solid #ccc;
      text-align: left;
    }
    th {
      background-color: #e0e0e0;
    }
    #ocrTextArea {
      width: 100%;
      height: 120px;
      font-family: monospace;
      white-space: pre-wrap;
      background: #f0f0f0;
      margin-top: 10px;
    }
    .instructions {
      background: #d9edf7;
      border: 1px solid #bce8f1;
      padding: 10px;
      margin-bottom: 15px;
      border-radius: 4px;
      color: #31708f;
    }
    button {
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h2>Grade Tracker & GPA Calculator</h2>

  <h3>Add Course Manually</h3>
  <input id="semester" placeholder="Semester (e.g. 01)" />
  <input id="courseCode" placeholder="Course Code (e.g. MA1101)" />
  <input id="courseName" placeholder="Course Name (e.g. Calculus)" />
  <input id="credits" type="number" placeholder="Credits" min="0" />
  <select id="grade">
    <option>S</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
    <option>D</option>
    <option>E</option>
  </select>
  <select id="category">
    <option>Professional</option>
    <option>Science</option>
    <option>Engineering</option>
    <option>Humanities</option>
    <option>Free</option>
    <option>None</option>
  </select>
  <button onclick="addCourse()">Add Course</button>

  <h3>Import Courses from Gradecard Text</h3>
  <div class="instructions">
    Paste your gradecard text here. Format per line:<br>
    <code>Semester CourseCode CourseName Credits Grade</code><br>
    Example:<br>
    <pre>01 AM1100 Engineering Mechanics 10 S<br>01 MA1101 Functions of Several Variables 10 A</pre>
    Grade must be one of: <b>S, A, B, C, D, E, P</b><br>
    Courses with grade P will be ignored in CGPA calculation.
  </div>
  <textarea id="gradecardInput" placeholder="Paste gradecard text here..."></textarea><br>
  <button onclick="parseTextAndAddCourses()">Import from Text</button>

  <h3>Or Upload Gradecard Image for OCR</h3>
  <input type="file" accept="image/*" onchange="handleImageUpload(event)" />
  <textarea id="ocrTextArea" placeholder="OCR result will appear here..." readonly></textarea><br>
  <button onclick="parseTextAndAddCoursesFromOCR()">Import from OCR Text</button>

  <h3>Courses</h3>
  <table>
    <thead>
      <tr>
        <th>Semester</th>
        <th>Course</th>
        <th>Credits</th>
        <th>Grade</th>
        <th>Point</th>
        <th>Category</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="courseTable"></tbody>
  </table>

  <h3>Summary</h3>
  <div id="summary"></div>

<script>
const gradeMap = { S: 10, A: 9, B: 8, C: 7, D: 6, E: 4, P: 0 };
const maxCategoryCredits = {
  Professional: 232,
  Free: 42,
  Science: 102,
  Engineering: 57,
  Humanities: 27
};
let courses = [];

function addCourse() {
  const semester = document.getElementById('semester').value.trim();
  const code = document.getElementById('courseCode').value.trim();
  const name = document.getElementById('courseName').value.trim();
  const credits = parseFloat(document.getElementById('credits').value);
  const grade = document.getElementById('grade').value.trim().toUpperCase();
  const category = document.getElementById('category').value.trim();

  if (!semester || !code || !name || isNaN(credits)) {
    alert("Please fill all course details.");
    return;
  }

  const point = gradeMap[grade] || 0;
  courses.push({ semester, name: `${code} - ${name}`, credits, grade, point, category });
  render();
  clearInputFields();
}

function clearInputFields() {
  document.getElementById('semester').value = '';
  document.getElementById('courseCode').value = '';
  document.getElementById('courseName').value = '';
  document.getElementById('credits').value = '';
}

function parseTextAndAddCourses() {
  const rawText = document.getElementById('gradecardInput').value;
  parseTextHelper(rawText);
}

function parseTextAndAddCoursesFromOCR() {
  const rawText = document.getElementById('ocrTextArea').value;
  parseTextHelper(rawText);
}

function parseTextHelper(rawText) {
  const lines = rawText.split('\n');
  const validGrades = new Set(['S','A','B','C','D','E','P']);
  let importedCount = 0;
  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 4) continue;

    let gradeIndex = -1;
    for(let i = parts.length - 1; i >= 0; i--) {
      const token = parts[i].toUpperCase();
      if(validGrades.has(token)) {
        gradeIndex = i;
        break;
      }
    }
    if (gradeIndex === -1) continue;

    const creditsIndex = gradeIndex - 1;
    if (creditsIndex < 0) continue;

    const grade = parts[gradeIndex].toUpperCase();
    const credits = parseFloat(parts[creditsIndex]);
    if(isNaN(credits)) continue;

    const semester = parts[0];
    const code = parts[1];
    const name = parts.slice(2, creditsIndex).join(' ');
    const point = gradeMap[grade] || 0;
    const category = (grade === 'P') ? 'None' : 'None';

    courses.push({ semester, name: `${code} - ${name}`, credits, grade, point, category });
    importedCount++;
  }
  alert(importedCount + ' courses imported.');
  render();
}

function render() {
  const tbody = document.getElementById('courseTable');
  tbody.innerHTML = '';
  courses.forEach((c, idx) => {
    tbody.innerHTML += `
      <tr>
        <td><input value="${c.semester}" onchange="updateField(${idx}, 'semester', this.value)" /></td>
        <td><input value="${c.name}" onchange="updateField(${idx}, 'name', this.value)" /></td>
        <td><input type="number" value="${c.credits}" onchange="updateField(${idx}, 'credits', parseFloat(this.value))" /></td>
        <td><input value="${c.grade}" onchange="updateGrade(${idx}, this.value)" /></td>
        <td>${c.point.toFixed(1)}</td>
        <td>
          <select onchange="updateCategory(${idx}, this.value)">
            <option ${c.category==='Professional'?'selected':''}>Professional</option>
            <option ${c.category==='Science'?'selected':''}>Science</option>
            <option ${c.category==='Engineering'?'selected':''}>Engineering</option>
            <option ${c.category==='Humanities'?'selected':''}>Humanities</option>
            <option ${c.category==='Free'?'selected':''}>Free</option>
            <option ${c.category==='None'?'selected':''}>None</option>
          </select>
        </td>
        <td><button onclick="removeCourse(${idx})">Remove</button></td>
      </tr>`;
  });

  let totalCredits = 0, totalPoints = 0;
  let categoryCredits = { Professional: 0, Free: 0, Science: 0, Engineering: 0, Humanities: 0 };

  courses.forEach(c => {
    if (c.category !== 'None') {
      totalCredits += c.credits;
      totalPoints += c.credits * c.point;
      if (categoryCredits[c.category] !== undefined) {
        categoryCredits[c.category] += c.credits;
      }
    }
  });

  let summary = '';
  for (const cat in categoryCredits) {
    let extra = '';
    const diff = categoryCredits[cat] - maxCategoryCredits[cat];
    if (cat !== 'Free' && diff > 0) {
      extra = ` <b>(Exceeds max by ${diff.toFixed(1)} credits)</b>`;
    }
    summary += `<div>${cat}: ${categoryCredits[cat].toFixed(1)} credits (max ${maxCategoryCredits[cat]})${extra}</div>`;
  }

  const cgpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  summary += `<div><br><b>Total Credits:</b> ${totalCredits.toFixed(1)}</div>`;
  summary += `<div><b>CGPA:</b> ${cgpa}</div>`;
  document.getElementById('summary').innerHTML = summary;
}

function updateField(index, field, value) {
  courses[index][field] = value;
  render();
}

function updateGrade(index, grade) {
  grade = grade.toUpperCase();
  courses[index].grade = grade;
  courses[index].point = gradeMap[grade] || 0;
  render();
}

function updateCategory(index, value) {
  courses[index].category = value;
  render();
}

function removeCourse(index) {
  courses.splice(index, 1);
  render();
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('ocrTextArea').value = 'Recognizing text...';
    Tesseract.recognize(e.target.result, 'eng', { logger: m => {} })
      .then(({ data: { text } }) => {
        document.getElementById('ocrTextArea').value = text;
      })
      .catch(err => {
        document.getElementById('ocrTextArea').value = 'OCR failed: ' + err.message;
      });
  };
  reader.readAsDataURL(file);
}
</script>
</body>
</html>
