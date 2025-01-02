

const fs = require('fs').promises;


function binarySearch(array, key) {
  let left = 0;
  let right = array.length - 1;


  while (left <= right) {
    const mid = Math.floor((left + right) / 2);


    if (array[mid].mssv === key) {
      return array[mid];
    } else if (array[mid].mssv < key) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }


  return null;
}


async function findStudent(mssv) {
  const data = await fs.readFile('src/datastudent.json', 'utf-8');
  const students = JSON.parse(data);


  students.sort((a, b) => a.mssv - b.mssv);


  const student = binarySearch(students, Number(mssv));


  if (student) {
    console.log(`${student.mssv} "${student.name}" CPA: ${student.cpa} Warning Level: ${student.warningLevel}`);
  } else {
    console.log('Sinh viên không tồn tại.');
  }
}


module.exports = findStudent;




