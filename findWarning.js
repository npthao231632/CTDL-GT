// file: findWarnings.js

const fs = require('fs').promises;

// Hàm đọc dữ liệu từ file
async function readData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data); // Trả về danh sách sinh viên
  } catch (error) {
    throw new Error(`Lỗi khi đọc file: ${error.message}`);
  }
}

// Hàm xác định mức cảnh cáo dựa trên CPA
function determineWarningLevel(cpa) {
  if (cpa <= 0.5) return 3;
  if (cpa <= 1.0) return 2;
  if (cpa <= 1.5) return 1;
  return 0;
}

// Hàm tổ chức dữ liệu sinh viên bằng hash function
function createStudentHashMap(students) {
  const studentMap = new Map();
  students.forEach(student => {
    const hashKey = hashFunction(student.mssv); // Tạo hash key
    studentMap.set(hashKey, student); // Lưu vào bảng băm
  });
  return studentMap;
}

// Hàm hash đơn giản
function hashFunction(key) {
  // Tính hash từ MSSV (chuyển chuỗi thành số duy nhất)
  return Array.from(key).reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

// Hàm xử lý sinh viên bị cảnh cáo
function filterWarningsWithHashMap(studentMap) {
  const warnings = [];
  studentMap.forEach((student, hashKey) => {
    const warningLevel = determineWarningLevel(student.cpa);
    if (warningLevel > 0) {
      warnings.push({
        mssv: student.mssv,
        name: student.name,
        warningLevel: warningLevel,
      });
    }
  });
  return warnings;
}

// Hàm chính để tìm sinh viên bị cảnh cáo
async function findWarning(filePath) {
  try {
    const students = await readData(filePath);

    // Tạo bảng băm từ danh sách sinh viên
    const studentMap = createStudentHashMap(students);

    // Lọc danh sách sinh viên bị cảnh cáo
    const warnings = filterWarningsWithHashMap(studentMap);

    // Xuất kết quả
    if (warnings.length === 0) {
      console.log("Không có sinh viên nào bị cảnh cáo.");
    } else {
      console.log("Danh sách sinh viên bị cảnh cáo:");
      warnings.forEach(warning =>
        console.log(`${warning.mssv} - ${warning.name} - Mức cảnh cáo: ${warning.warningLevel}`)
      );
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error.message);
  }
}

// Xuất hàm findWarning để sử dụng ở nơi khác
module.exports = findWarning;
