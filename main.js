const readlineSync = require('readline-sync');
const listStudents = require('./modules/list');
const findStudent = require('./modules/find');
const modifyCpa = require('./modules/modify');
const findTop = require('./modules/findTop');
const findBottom = require('./modules/findBottom');
const findWarning = require('./modules/findWarning');
const countCpaRange = require('./modules/count');
const countSuspensionStudents = require('./modules/countSuspension');

async function main() {
    console.log('--- Hệ thống Quản lý Sinh viên ---');
    console.log('Các lệnh:');
    console.log('1. list');
    console.log('2. find <mssv>');
    console.log('3. modify cpa <mssv> <newCpa>');
    console.log('4. findTop <n>');
    console.log('5. findBottom <n>');
    console.log('6. findWarning');
    console.log('7. count <a> <b>');
    console.log('8. countSuspension');

    const input = readlineSync.question('Nhap lenh: ');concon
    const [command, ...args] = input.split(' ');

    switch (command) {
        case 'list':
            await listStudents();
            break;
        case 'find':
            await findStudent(args[0]);
            break;
        case 'modify':
            if (args[0] === 'cpa') await modifyCpa(args[1], args[2]);
            break;
        case 'findTop':
            await findTop(parseInt(args[0]));
            break;
        case 'findBottom':
            await findBottom(parseInt(args[0]));
            break;
        case 'findWarning':
            await findWarning();
            break;
        case 'count':
            await countCpaRange(parseFloat(args[0]), parseFloat(args[1]));
            break;
        case 'countSuspension':
            await countSuspensionStudents();
            break;
        default:
            console.log('Lệnh không hợp lệ!');
    }

    main(); // Gọi lại main để tiếp tục nhận lệnh
}
main();
