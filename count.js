const fs = require('fs').promises;

function hashCpaRange(student) {
  return `range_${Math.floor(student.cpa / 10)}`;
}

// Hàm đếm số lượng sinh viên có CPA nằm trong khoảng [a, b]
async function countCpaRange(a, b) {
  const data = await fs.readFile('src/dataStudent.json', 'utf-8');
  const students = JSON.parse(data);

  const hashMap = new Map();

  for (const student of students) {
    if (student.cpa >= a && student.cpa <= b) {
      const hashKey = hashCpaRange(student);
      if (!hashMap.has(hashKey)) {
        hashMap.set(hashKey, []);
      }
      hashMap.get(hashKey).push(student);
    }
  }

  // Tính tổng số sinh viên trong khoảng
  let totalCount = 0;
  for (const studentsInRange of hashMap.values()) {
    totalCount += studentsInRange.length;
  }

  console.log(`Số sinh viên có CPA trong khoảng [${a}, ${b}]: ${totalCount}`);
}

module.exports = countCpaRange;
