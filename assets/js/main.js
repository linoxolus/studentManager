const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const studentsList = $(".students-list");
var pageHeight = document.documentElement.scrollHeight;
var currentIndex = 0;
var students;
var html;

fetch("assets/db/db.json")
    .then((respond) => respond.json())
    .then((data) => {
        students = data;
        renderNext();
    })
    .catch((err) => {
        console.log(err);
    });

function renderNext() {
    for (i = 0; i <= 10; i++) {
        render(currentIndex);
    }
}

function render(index) {
    if (students[index].gender === "Nam") {
        var studentGender = "male";
    } else if (students[index].gender === "Nữ") {
        var studentGender = "female";
    }

    html = `<li class="student">
      <div class="student-item">
          <div class="student-image">
              <img src="./assets/img/${studentGender}.jpg" alt="Male Avatar" class="student-img">
              <span class="image-flag">${students[index].studentId}</span>
          </div>
          <div class="student-info">
              <div class="student-name student-info-item">
                ${students[index].name}
              </div>
              <div class="student-gender student-info-item">
                  ${students[index].gender}
              </div>
              <div class="student-birthday student-info-item">
                  ${students[index].birthDay}
              </div>
              <div class="student-class student-info-item">
                  ${students[index].className}
              </div>
          </div>
      </div>
    </li>`;
    studentsList.innerHTML += html;
    html = 0;
    currentIndex++;
    pageHeight = document.documentElement.scrollHeight;
}

window.addEventListener("scroll", (e) => {
    const scrollY = window.scrollY;
    const triggerPoint = pageHeight - window.innerHeight - 100;

    if(scrollY >= triggerPoint) {
        renderNext();
    }
});
