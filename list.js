const fs = require('fs').promises;

// Lớp đại diện cho một sinh viên
class Student {
  constructor(mssv, name) {
    this.mssv = mssv;
    this.name = name;
  }
}

// Lớp quản lý danh sách sinh viên
class StudentManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.students = [];
  }

  // Đọc dữ liệu sinh viên từ file
  async loadStudents() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const studentData = JSON.parse(data);
      this.students = studentData.map(s => new Student(s.mssv, s.name));
    } catch (error) {
      console.error("Lỗi khi đọc dữ liệu sinh viên:", error.message);
    }
  }

  // Lưu dữ liệu sinh viên vào file
  async saveStudents() {
    try {
      const data = JSON.stringify(this.students, null, 2);
      await fs.writeFile(this.filePath, data, 'utf-8');
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu sinh viên:", error.message);
    }
  }

  // Hiển thị danh sách sinh viên
  listStudents() {
    if (this.students.length === 0) {
      console.log("Danh sách sinh viên trống.");
      return;
    }
    console.log("Danh sách sinh viên:");
    this.students.forEach(student => {
      console.log(`${student.mssv} - ${student.name}`);
    });
  }
}

// Xuất lớp StudentManager để sử dụng ở nơi khác
module.exports = StudentManager;
