/**
 * Create Alert
 */
const createAlert = (message, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between">${message}
            <button class="btn-close" data-bs-dismiss="alert"></button>
        </p>`;
};

/**
 * Number Check
 */
const isNumber = (num) => {
  const pattern = /^[0-9]{6}$/;
  return pattern.test(num);
};

/**
 * Send Data To Local Storage
 */

const sendData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Get Data To Local Storage
 */

const getData = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return [];
};

/**
 * Time Ago Fucntion
 */
const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - date) / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else {
    const weeks = Math.floor(seconds / 604800);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }
};

/**
 * Create Random ID
 */

const generateRandomStringUniqueId = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

/**
 * Calculate GPA And Grade
 */

const calculateGpaGrade = (mark) => {
  let gpa;
  let grade;

  if (mark >= 0 && mark < 33) {
    grade = "F";
    gpa = 0;
  } else if (mark >= 33 && mark < 40) {
    grade = "D";
    gpa = 1;
  } else if (mark >= 40 && mark < 50) {
    grade = "C";
    gpa = 2;
  } else if (mark >= 50 && mark < 60) {
    grade = "B";
    gpa = 3;
  } else if (mark >= 60 && mark < 70) {
    grade = "A-";
    gpa = 3.5;
  } else if (mark >= 70 && mark < 80) {
    grade = "A";
    gpa = 4;
  } else if (mark >= 80 && mark <= 100) {
    grade = "A+";
    gpa = 5;
  } else {
    grade = "Invalid";
    gpa = "Invalid";
  }

  return {
    grade,
    gpa,
  };
};

/**
 * Check Pass Or Fail And calculate Final CGPA GRADE
 */

const calFinalResult = (mark) => {
  let cgpa;
  let result;

  let totalgpa =
    calculateGpaGrade(mark.bangla).gpa +
    calculateGpaGrade(mark.english).gpa +
    calculateGpaGrade(mark.math).gpa +
    calculateGpaGrade(mark.science).gpa +
    calculateGpaGrade(mark.social_science).gpa +
    calculateGpaGrade(mark.religion).gpa;

  cgpa = totalgpa / 6;

  if (
    mark.bangla >= 33 &&
    mark.english >= 33 &&
    mark.math >= 33 &&
    mark.science >= 33 &&
    mark.social_science >= 33 &&
    mark.religion >= 33
  ) {
    if (cgpa >= 1 && cgpa < 2) {
      result = "D";
    } else if (cgpa >= 2 && cgpa < 3) {
      result = "C";
    } else if (cgpa >= 3 && cgpa < 3.5) {
      result = "B";
    } else if (cgpa >= 3.5 && cgpa < 4) {
      result = "A-";
    } else if (cgpa >= 4 && cgpa < 5) {
      result = "A";
    } else if (cgpa >= 5) {
      result = "A+";
    }

    return {
      result,
      cgpa,
    };
  } else {
    return {
      cgpa: cgpa,
      result: "F",
    };
  }
};
