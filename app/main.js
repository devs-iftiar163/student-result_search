const studentsForm = document.getElementById("students-form");
const message = document.querySelector(".message");
const messageEdit = document.querySelector(".message-edit");
const showStudent = document.querySelector(".show-students");
const singleView = document.getElementById("single-view-data");
const editStuForm = document.getElementById("students-form-edit");
const addResultForm = document.querySelector("#students-form-result");
const addResMessage = document.querySelector(".res_msg");
const editResultForm = document.querySelector("#students-form-marks");
const editmarkMsg = document.querySelector(".mark_msg");

// Show All Students Data

const getStudents = () => {
  const students = getData("students");

  let content = "";

  if (students.length > 0) {
    students.map((student, index) => {
      content += `<tr class="align-middle">
          <td>${index + 1}</td>
          <td>
            <img
              class="student-image"
              src="${student.photo}"
              alt="${student.name}"
            />
          </td>
          <td>${student.name}</td>
          <td>${student.roll}</td>
          <td>${student.reg}</td>
          <td>${timeAgo(student.createdAt)}</td>
          <td>
            ${
              student.result === null
                ? '<button class="btn btn-sm btn-success" data-bs-target="#student-result-info" data-bs-toggle="modal" onclick="addResult(\'' +
                  student.id +
                  "')\">Add Marks</button>"
                : `<button class="btn btn-sm btn-warning" data-bs-target="#student-marks-edit" data-bs-toggle="modal" onclick="editMarks('${student.id}')">View Marks</button>`
            }
            
          </td>
          <td>
            <button class="btn btn-sm btn-info" data-bs-target="#student-single-info" data-bs-toggle="modal" onclick="showStudents('${
              student.roll
            }')">
              <i class="fa-regular fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#student-edit-info" onclick="editStuData('${
              student.id
            }')">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteData('${
              student.roll
            }')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>`;
    });
  } else {
    content = ` <tr>
      <td colspan="8" class="text-center"> No Data Found In Your Database </td>
    </tr> `;
  }

  showStudent.innerHTML = content;
};
getStudents();

// Single Students View

const showStudents = (roll) => {
  const allStudentData = getData("students");
  const singleStudentData = allStudentData.find((data) => data.roll == roll);

  singleView.innerHTML = `<div class="student-image-single text-center">
                            <img
                              src="${singleStudentData.photo}"
                              alt=""
                            />
                          </div>
                          <table class="table table-striped my-5">
                            <tr>
                              <td>Students Name :</td>
                              <td>${singleStudentData.name}</td>
                            </tr>
                            <tr>
                              <td>Roll :</td>
                              <td>${singleStudentData.roll}</td>
                            </tr>
                            <tr>
                              <td>Reg :</td>
                              <td>${singleStudentData.reg}</td>
                            </tr>
                            <tr>
                              <td>Creation Time :</td>
                              <td>${timeAgo(singleStudentData.createdAt)}</td>
                            </tr>
                          </table>`;
};

// Add Result

const addResult = (id) => {
  addResultForm.querySelector('input[name="id"]').value = id;
};

// Result Form Submit

addResultForm.onsubmit = (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  // Validation
  if (
    !data.bangla ||
    !data.english ||
    !data.math ||
    !data.science ||
    !data.social_science ||
    !data.religion
  ) {
    addResMessage.innerHTML = createAlert("All Fields Are Required");
  } else {
    const trimID = data.id.trim();

    const getOldDatas = getData("students");
    getOldDatas[getOldDatas.findIndex((studs) => studs.id === trimID)] = {
      ...getOldDatas[getOldDatas.findIndex((studs) => studs.id === trimID)],
      result: data,
    };

    sendData("students", getOldDatas);

    getStudents();

    e.target.reset();
    addResMessage.innerHTML = createAlert(
      "Result Info Saved Successfully",
      "success"
    );
  }
};

// Edit Students Marks

const editMarks = (id) => {
  const marksData = getData("students");
  const findMarks = marksData.find((studs) => studs.id === id);

  // Read data From Marks Edit
  editResultForm.querySelector('input[name="id"]').value = id;
  editResultForm.querySelector('input[name="bangla"]').value =
    findMarks.result.bangla;
  editResultForm.querySelector('input[name="english"]').value =
    findMarks.result.english;
  editResultForm.querySelector('input[name="math"]').value =
    findMarks.result.math;
  editResultForm.querySelector('input[name="science"]').value =
    findMarks.result.science;
  editResultForm.querySelector('input[name="social_science"]').value =
    findMarks.result.social_science;
  editResultForm.querySelector('input[name="religion"]').value =
    findMarks.result.religion;
};

// Edited Marks Submit

editResultForm.onsubmit = (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  // Validation
  if (
    !data.bangla ||
    !data.english ||
    !data.math ||
    !data.science ||
    !data.social_science ||
    !data.religion
  ) {
    editmarkMsg.innerHTML = createAlert("All Fields Are Required");
  } else {
    const oldStudentsData = getData("students");

    oldStudentsData[
      oldStudentsData.findIndex((studs) => studs.id === data.id)
    ] = {
      ...oldStudentsData[
        oldStudentsData.findIndex((studs) => studs.id === data.id)
      ],
      result: data,
    };
    sendData("students", oldStudentsData);
    getStudents();
    e.target.reset();
  }
};

// Edit Student Data

const editStuData = (id) => {
  const getOldData = getData("students");

  const newData = getOldData.find((edit) => edit.id === id);

  editStuForm.querySelector('input[name = "id"]').value = newData.id;
  editStuForm.querySelector('input[name = "name"]').value = newData.name;
  editStuForm.querySelector('input[name = "roll"]').value = newData.roll;
  editStuForm.querySelector('input[name = "reg"]').value = newData.reg;
  editStuForm.querySelector('input[name = "photo"]').value = newData.photo;
  editStuForm
    .querySelector("img#previosPhoto")
    .setAttribute("src", newData.photo);
};

// Insert New Data

editStuForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  const getOldData = getData("students");

  const originalData = getOldData.find((stud) => stud.id === data.id);

  // Check If the roll number has been changed
  if (originalData.roll !== data.roll) {
    // Roll Prevent Duplicate
    if (getOldData.some((stud) => stud.roll == data.roll)) {
      messageEdit.innerHTML = createAlert("Roll Number Already Exist");
      return;
    }
  }
  // Check If the Reg number has been changed
  if (originalData.reg !== data.reg) {
    // Reg Prevent Duplicate
    if (getOldData.some((stud) => stud.reg == data.reg)) {
      messageEdit.innerHTML = createAlert("Registration Number Already Exist");
      return;
    }
  }

  getOldData[getOldData.findIndex((stud) => stud.id === data.id)] = {
    ...getOldData[getOldData.findIndex((stud) => stud.id === data.id)],
    ...data,
  };
  sendData("students", getOldData);
  getStudents();
};

// Delete Students Data

const deleteData = (roll) => {
  const makeSure = confirm("Are Youre Sure?");

  if (makeSure) {
    const oldStudentsData = getData("students");

    const updateData = oldStudentsData.filter((data) => data.roll != roll);
    sendData("students", updateData);
    getStudents();
  } else {
    alert("Youre Date Is Safe");
  }
};

// Data Catch

studentsForm.onsubmit = (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  //   Validation
  if (!data.name || !data.roll || !data.reg || !data.photo) {
    message.innerHTML = createAlert("All Fields Are Required");
  } else if (!isNumber(data.roll)) {
    message.innerHTML = createAlert("Invalid Roll Number");
  } else if (!isNumber(data.reg)) {
    message.innerHTML = createAlert("Invalid Registration Number");
  } else {
    const oldStudents = getData("students");

    // Roll Prevent Duplicate

    if (oldStudents.some((stud) => stud.roll == data.roll)) {
      message.innerHTML = createAlert("Roll Number Already Exist");
      return;
    }

    // Reg Prevent Duplicate
    if (oldStudents.some((stud) => stud.reg == data.reg)) {
      message.innerHTML = createAlert("Registration Number Already Exist");
      return;
    }

    oldStudents.push({
      ...data,
      result: null,
      createdAt: Date.now(),
      id: generateRandomStringUniqueId(25),
    });
    sendData("students", oldStudents);

    e.target.reset();
    message.innerHTML = createAlert(
      `${data.name}'s Information Saved Successfully`,
      "success"
    );
    getStudents();
  }
};
