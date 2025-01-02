//FINDTOP N
const fs = require('fs').promises;


// Hàm tìm Top N sinh viên (GPA cao nhất)
async function findTopN(topN) {
    try {
        // Đọc dữ liệu từ file datastudent.json
        const data = await fs.readFile('datastudent.json', 'utf8');


        // Chuyển dữ liệu từ JSON sang mảng sinh viên
        const students = JSON.parse(data);


        // Sắp xếp sinh viên theo GPA giảm dần
        const sortedStudents = students.sort((a, b) => b.cpa - a.cpa);


        // Lấy Top N sinh viên
        const topStudents = sortedStudents.slice(0, topN);


        // In kết quả
        console.log(`\nTop ${topN} sinh viên có GPA cao nhất:`);
        topStudents.forEach(sv => {
            console.log(`MSSV: ${sv.mssv}, GPA: ${sv.cpa}`);
        });
    } catch (err) {
        console.error("Không thể đọc file:", err);
    }
}


// Xuất hàm để sử dụng ở tệp khác
module.exports = findTopN;