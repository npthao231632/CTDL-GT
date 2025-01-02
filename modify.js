const fs = require('fs').promises;


async function modifyCpa(mssv, newCpa) {
  try {
    const data = await fs.readFile('src/dataStudent_01-1.json', 'utf-8');
    const students = JSON.parse(data);


    // Chuyển danh sách sinh viên thành bảng băm
    const studentMap = {};
    students.forEach(student => {
      studentMap[String(student.mssv)] = student;
    });


    if (studentMap[mssv]) {
      studentMap[mssv].cpa = parseFloat(newCpa); // Cập nhật CPA
      // Chuyển lại thành danh sách để ghi file
      const updatedStudents = Object.values(studentMap);
      await fs.writeFile('src/dataStudent_01-1.json', JSON.stringify(updatedStudents, null, 2));
      console.log(`Đã cập nhật CPA cho MSSV ${mssv}`);
    } else {
      console.log(`Không tìm thấy sinh viên với MSSV ${mssv}`);
    }
  } catch (error) {
    console.error('Lỗi:', error.message);
  }
}
module.exports = modifyCpa;