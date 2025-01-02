// Import thư viện File System để làm việc với tệp
const fs = require('fs');

// Hàm để tạo số nguyên ngẫu nhiên trong một khoảng
function getRandomInt(min, max) {
  if (min > max) throw new Error("Giá trị min không thể lớn hơn max");
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hàm để tạo tên UTF-8 ngẫu nhiên
function getRandomName() {
  const firstNames = ["An", "Bình", "Chi", "Dũng", "Em", "Phong", "Hoa", "Lâm", "Minh", "Ngọc"];
  const lastNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ"];
  const middleNames = ["Văn", "Thị", "Thanh", "Quang", "Minh", "Phương", "Hữu", "Gia", "Khánh", "Anh"];

  const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
  const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
  const middleName = middleNames[getRandomInt(0, middleNames.length - 1)];

  return `${lastName} ${middleName} ${firstName}`;
}

// Hàm để tạo giá trị CPA ngẫu nhiên (ví dụ: từ 0.0 đến 4.0)
function getRandomCPA() {
  return parseFloat((Math.random() * 4).toFixed(2)); // Giữ lại 2 chữ số thập phân
}

// Hàm để tính mức cảnh cáo dựa trên CPA
function getWarningLevel(cpa) {
  if (cpa <= 0.5) return 3;
  if (cpa <= 1.0) return 2;
  if (cpa <= 1.5) return 1;
  return 0; // Giá trị mặc định nếu CPA lớn hơn 1.5
}

// Hàm để tạo mã sinh viên từ các khoảng cụ thể, đảm bảo không trùng
function getUniqueStudentIds(count) {
  const ranges = [
    { min: 20191000, max: 20193000 },
    { min: 20201000, max: 20203000 },
    { min: 20231000, max: 20235000 },
  ];

  const totalCapacity = ranges.reduce((sum, range) => sum + (range.max - range.min + 1), 0);
  if (count > totalCapacity) throw new Error("Yêu cầu số lượng quá lớn so với phạm vi mã sinh viên!");

  const uniqueIds = new Set();
  while (uniqueIds.size < count) {
    const selectedRange = ranges[getRandomInt(0, ranges.length - 1)];
    const id = getRandomInt(selectedRange.min, selectedRange.max);
    uniqueIds.add(id);
  }

  return Array.from(uniqueIds).sort((a, b) => a - b); // Chuyển sang mảng và sắp xếp tăng dần
}

// Hàm để tạo danh sách dữ liệu sinh viên
function createStudentData(count) {
  const studentIds = getUniqueStudentIds(count);
  const students = studentIds.map(mssv => {
    const cpa = getRandomCPA();
    return {
      mssv,
      name: getRandomName(),
      cpa,
      warningLevel: getWarningLevel(cpa),
    };
  });

  // Kiểm tra số lượng kết quả để đảm bảo không có lỗi
  if (students.length !== count) {
    throw new Error("Số lượng sinh viên tạo ra không khớp với yêu cầu!");
  }

  return students;
}

// Tạo dữ liệu sinh viên và lưu vào tệp JSON
try {
  const studentData = createStudentData(8000); // Tạo dữ liệu cho 8000 sinh viên
  fs.writeFileSync('datastudent.json', JSON.stringify(studentData, null, 2));
  console.log('Dữ liệu đã được tạo và lưu vào datastudent.json');
} catch (error) {
  console.error('Lỗi khi tạo hoặc lưu dữ liệu:', error.message);
}
