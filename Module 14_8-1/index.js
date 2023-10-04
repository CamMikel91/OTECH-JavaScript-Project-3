const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

mongoose.connect('mongodb://127.0.0.1/StudentDB')
  .then(() => console.log('Connected to MongoDB...\n'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const studentSchema = mongoose.Schema({
  StudentID: {type: Number, required: true},
  FirstName: {type: String, required: true},
  LastName: {type: String, required: true},
  Phone: {type: String, required: true, minlength: 12, maxlength: 12},
  StudentStartDate: {type: Date, required: true},
  Certificates: {type: [String], required: true, enum: ['Information Technology', 'Graphics and Design', 'Web Development', 'Software Development']},
  ClassRoomNumber: {type: String, required: true},
  ClassTitle: {type: String, required: true},
  ClassTimes: {type: [Number], required: true, validate: {
      validator: function (array) {
        return array.length > 0;
      },
      message: 'ClassTimes array must have at least one number'
    }},
  ProgressScheduled: Number,
  ProgressCompleted: {type: Number, required: function () {
      return this.ProgressScheduled;
    }},
  ProgressPercent: {type: Number, required: function () {
      return this.ProgressScheduled;
    }}
});

const Student = mongoose.model('Student', studentSchema);

const schema = Joi.object({
  StudentID: Joi.number().required(),
  FirstName: Joi.string().required(),
  LastName: Joi.string().required(),
  Phone: Joi.string().required().min(12).max(12),
  StudentStartDate: Joi.date().required(),
  Certificates: Joi.array().required().items(Joi.string().valid('Information Technology', 'Graphics and Design', 'Web Development', 'Software Development')),
  ClassRoomNumber: Joi.string().required(),
  ClassTitle: Joi.string().required(),
  ClassTimes: Joi.array().required().items(Joi.number().min(1)),
  ProgressScheduled: Joi.number(),
  ProgressCompleted: Joi.number().when('ProgressScheduled', {
      is: true,
      then: Joi.required()
  }),
  ProgressPercent: Joi.number().when('ProgressScheduled', {
      is: true,
      then: Joi.required()
  })
});

async function importStudents() {
  const students = require('./student-data.json');
  for (student in students) {
    delete students[student]._id;
    const { error, value } = schema.validate(students[student]);
    if (error) {
      console.log(error);
    } else {
      const student = new Student(value);
      try {
        await student.save();
        console.log(`${student.StudentID}: ${student.FirstName} ${student.LastName} successfully imported`);
      } catch (ex) {
        console.log(ex.message);
      }
    }
  }
}

async function createStudent() {
  const student = {
    StudentID: 8,
    FirstName: 'John',
    LastName: 'Doe',
    Phone: '555-555-5555',
    StudentStartDate: '2020-01-01',
    Certificates: ['Information Technology', 'Graphics and Design'],
    ClassRoomNumber: 'A',
    ClassTitle: 'Intro to Programming',
    ClassTimes: [1, 2, 3],
    ProgressScheduled: 10,
    ProgressCompleted: 5,
    ProgressPercent: 50
  };

  const { error, value } = schema.validate(student);
  if (error) {
    console.log(error.message);
  } else {
    const student = new Student(value);
    try {
      const result = await student.save();
      console.log('Student successfully created: ');
      console.log(result);
    } catch (ex) {
      console.log(ex.message);
    }
  }
}

importStudents()
.then(createStudent);