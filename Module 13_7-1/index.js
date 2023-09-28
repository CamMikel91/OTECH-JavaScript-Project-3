const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/otech-assignments') // connect to mongodb
    .then(() => console.log('Connected to MongoDB...\n'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const studentSchema = new mongoose.Schema({
    StudentID: Number,
    FirstName: String,
    LastName: String,
    Phone: String,
    StudentStartDate: String,
    Certificates: [String],
    ClassRoomNumber: String,
    ClassTitle: String,
    ClassTimes: [Number],
    ProgressScheduled: Number,
    ProgressCompleted: Number,
    ProgressPercent: Number,
});

const Student = mongoose.model('Student', studentSchema);


// Query 1: Find all students in ClassRoomNumber: BU-158, sort by LastName, and display FirstName, LastName, and ClassTitle
async function query1() {
    return await Student
        .find({ClassRoomNumber: 'BU-158'})
        .sort({LastName: 1})
        .select({FirstName: 1, LastName: 1, ClassTitle: 1, _id: 0});
}
async function runQuery1() {
    const students = await query1();
    console.log('--------------- Start of Query 1 ----------------- ')
    console.log('Students in ClassRoomNumber: BU-158, sorted by LastName, and display FirstName, LastName, and ClassTitle')
    console.log(students);
    console.log('--------------- End of Query 1 ----------------- ')
}
runQuery1();

// Query 2: Select all of the students that have the number 123 in their phone number.
async function query2() {
    return await Student
.find({Phone: /.*123.*/});
}
async function runQuery2() {
    const students = await query2();
    console.log('--------------- Start of Query 2 ----------------- ')
    console.log('Students that have the number 123 in their phone number.')
    console.log(students);
    console.log('--------------- End of Query 2 ----------------- ')
}
runQuery2();

// Query 3: Select all of the students who have 80% progress or lower and order by Progress Percent.
async function query3() {
    return await Student
        .find({ProgressPercent: {$lte: 80}})
        .sort({ProgressPercent: 1});
}
async function runQuery3() {
    const students = await query3();
    console.log('--------------- Start of Query 3 ----------------- ');
    console.log('Students who have 80% progress or lower, ordered by Progress Percent.');
    console.log(students);
    console.log('--------------- End of Query 3 ----------------- ');
}
runQuery3();

// Query 4: Get all of the students who are enrolled in a class that is at 9 or 10. Include The student name, Class name, and room number for each result.
async function query4() {
    return await Student
        .find({ClassTimes: {$in: [9, 10]}})
        .sort({LastName: 1})
        .select({FirstName: 1, LastName: 1, ClassTitle: 1, ClassRoomNumber: 1, _id: 0});
}
async function runQuery4() {
    const students = await query4();
    console.log('--------------- Start of Query 4 ----------------- ');
    console.log('Students enrolled in a class that is at 9 or 10, including The student name, Class name, and room number for each result.');
    console.log(students);
    console.log('--------------- End of Query 4 ----------------- ');
}
runQuery4();