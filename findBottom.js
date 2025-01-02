const fs = require('fs').promises;

// Hàm tìm Bottom N sinh viên (GPA thấp nhất)
async function findBottomN(bottomN) {
    try {
        // Đọc dữ liệu từ file datastudent.json
        const data = await fs.readFile('datastudent.json', 'utf8');

        // Chuyển dữ liệu từ JSON sang mảng sinh viên
        const students = JSON.parse(data);

        // Sắp xếp sinh viên theo GPA tăng dần
        const sortedStudents = students.sort((a, b) => a.cpa - b.cpa);

        // Lấy Bottom N sinh viên
        const bottomStudents = sortedStudents.slice(0, bottomN);

        // In kết quả
        console.log(`\nBottom ${bottomN} sinh viên có GPA thấp nhất:`);
        bottomStudents.forEach(sv => {
            console.log(`MSSV: ${sv.mssv}, Tên: ${sv.ten}, GPA: ${sv.cpa}`);
        });
    } catch (err) {
        console.error("Không thể đọc file:", err);
    }
}

// Xuất hàm để sử dụng ở tệp khác
module.exports = findBottomN;
