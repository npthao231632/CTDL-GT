//SV ĐÌNH CHỈ 
const fs = require('fs').promises;


// Cấu trúc sinh viên
class Student {
  constructor(mssv, name, cpa) {
    this.mssv = mssv; // Mã số sinh viên
    this.name = name; // Tên sinh viên
    this.cpa = cpa;   // CPA (Cumulative Point Average)
  }
}


// Danh sách sinh viên (cấu trúc dữ liệu)
class StudentList {
  constructor() {
    this.students = [];
  }


  // Thêm sinh viên vào danh sách
  addStudent(student) {
    this.students.push(student);
  }


  // Tìm sinh viên bị đình chỉ
  findSuspensionStudents(currentYear, currentMonth) {
    const suspensionStudents = [];
    this.students.forEach(student => {
      const admissionYear = Math.floor(Number(student.mssv) / 10000);
      const yearsElapsed = currentYear - admissionYear;


      if (yearsElapsed > 5 && student.cpa < 0.5) {
        suspensionStudents.push(student);
      }
    });
    return suspensionStudents;
  }
}


// Hàm chính
async function countSuspensionStudents() {
  try {
    // Đọc dữ liệu từ file
    const data = await fs.readFile('datastudent.json', 'utf-8');
    const studentsData = JSON.parse(data);


    // Tạo danh sách sinh viên
    const studentList = new StudentList();


    // Thêm sinh viên vào danh sách
    studentsData.forEach(data => {
      const student = new Student(data.mssv, data.name, data.cpa);
      studentList.addStudent(student);
    });


    // Ngày hiện tại (mm/yyyy)
    const currentDate = "12/2024";
    const [currentMonth, currentYear] = currentDate.split("/").map(Number);


    // Tìm sinh viên bị đình chỉ
    const suspensionStudents = studentList.findSuspensionStudents(currentYear, currentMonth);


    console.log(`Tổng số sinh viên bị đình chỉ: ${suspensionStudents.length}`);
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error.message);
  }
}


module.exports = countSuspensionStudents;