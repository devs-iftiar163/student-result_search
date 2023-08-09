const searchForm = document.getElementById("search-form");
const mainDiv = document.querySelector(".main-div");
const messageError = document.querySelector(".error_message");
const loader = document.querySelector(".loader");

// Search Data Fetch
searchForm.onsubmit = (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  if (!data.roll || !data.reg) {
    messageError.innerHTML = createAlert("All Fields Are Required");
  } else if (!isNumber(data.roll)) {
    messageError.innerHTML = createAlert("Invalid Roll No");
  } else if (!isNumber(data.reg)) {
    messageError.innerHTML = createAlert("Invalid Registration Number");
  } else {
    loader.style.display = "block";
    setTimeout(function () {
      loader.style.display = "none";
      const getOldData = getData("students");

      const studentResult = getOldData.find(
        (stud) => stud.roll === data.roll && stud.reg === data.reg
      );

      let content;

      if (studentResult) {
        content = `
  
      <div class="card shadow">
                <div class="card-header">
                  <h4>Student Result</h4>
                </div>
                <div class="card-body">
                  <div class="student-img">
                    <img
                      src="${studentResult.photo}"
                      alt=""
                    />
                  </div>
                  <div class="student-info my-3">
                    <table class="table table-striped">
                      <tr>
                        <td>Student Name :</td>
                        <td>${studentResult.name}</td>
                      </tr>
                      <tr>
                        <td>Roll No :</td>
                        <td>${studentResult.roll}</td>
                      </tr>
                      <tr>
                        <td>Registration No :</td>
                        <td>${studentResult.reg}</td>
                      </tr>
                      <tr>
                        <td>CGPA :</td>
                        <td>${calFinalResult({
                          bangla: studentResult.result.bangla,
                          english: studentResult.result.english,
                          math: studentResult.result.math,
                          science: studentResult.result.science,
                          social_science: studentResult.result.social_science,
                          religion: studentResult.result.religion,
                        }).cgpa.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Grade :</td>
                        <td>${
                          calFinalResult({
                            bangla: studentResult.result.bangla,
                            english: studentResult.result.english,
                            math: studentResult.result.math,
                            science: studentResult.result.science,
                            social_science: studentResult.result.social_science,
                            religion: studentResult.result.religion,
                          }).result
                        }</td>
                      </tr>
                      <tr>
                        <td>Status :</td>
                        <td>${
                          calFinalResult({
                            bangla: studentResult.result.bangla,
                            english: studentResult.result.english,
                            math: studentResult.result.math,
                            science: studentResult.result.science,
                            social_science: studentResult.result.social_science,
                            religion: studentResult.result.religion,
                          }).result === "F"
                            ? '<p class="text-danger">Failed</p>'
                            : '<p class="text-success">Passed</p>'
                        }</td>
                      </tr>
                    </table>
                  </div>
                  <!-- Result Table -->
                  <div class="result-head mb-3 my-3 text-center">
                    <h4>Subject Wise Grade/GPA</h4>
                  </div>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Subject Name</th>
                        <th>Marks</th>
                        <th>GPA</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Bangla</td>
                        <td>${studentResult.result.bangla}</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.bangla).gpa
                        }</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.bangla).grade
                        }</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>English</td>
                        <td>${studentResult.result.english}</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.english).gpa
                        }</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.english).grade
                        }</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Mathmetics</td>
                        <td>${studentResult.result.math}</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.math).gpa
                        }</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.math).grade
                        }</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Science</td>
                        <td>${studentResult.result.science}</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.science).gpa
                        }</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.science).grade
                        }</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Social Science</td>
                        <td>${studentResult.result.social_science}</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.social_science)
                            .gpa
                        }</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.social_science)
                            .grade
                        }</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Religion</td>
                        <td>${studentResult.result.religion}</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.religion).gpa
                        }</td>
                        <td>${
                          calculateGpaGrade(studentResult.result.religion).grade
                        }</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
      
      `;
      } else {
        content =
          "<p style='color:red;' class='text-center'>No Result Found</p>";
      }
      mainDiv.innerHTML = content;
      e.target.reset();
    }, 3000);
  }
};
