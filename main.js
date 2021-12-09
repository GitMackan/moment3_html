"use strict";

// Skapa variabel från html-element
let coursesEl = document.getElementById("courses");
let addBtnEl = document.getElementById("addBtn");
let courseNameEl = document.getElementById("cName");
let courseCodeEl = document.getElementById("code");
let termEl = document.getElementById("term");
let progEl = document.getElementById("prog");
let coursePlanEl = document.getElementById("cPlan");

// Händelsehanterare
window.addEventListener('load', getCourses);
addBtnEl.addEventListener('click', addCourse);

// Funktion för att hämta kurser
function getCourses () {
    coursesEl.innerHTML = "";
    // Gör fetch-anrop till API
    fetch('http://localhost:3000/courses')
    .then(response => response.json())
    .then(data => {
        data.forEach(course => {
            // Skriv ut till DOM
            coursesEl.innerHTML +=
            `<tr>
                <td class='courseName'> ${course.courseName}</td><td class="courseCode"> ${course.courseCode}</td><td class="term">${course.term}</td><td class="prog">${course.progression}</td><td class="coursePlan"><a href='${course.coursePlan}'>Webblänk</a></td><td><button class='btn' id="delete${course._id}" onClick="deleteCourse('${course._id}')">Ta bort</button></td>
            </tr>`
        })
    })
}

// Funktion för att ta bort kurs
function deleteCourse (id) {
    // Fetch-anrop med DELETE-metod
    fetch('http://localhost:3000/courses/' + id, {
        method: 'DELETE',
    })
    .then(data => {
        // Hämta kurser igen för att uppdatera lista
        getCourses();
    })
    // Hantera felmeddelande
    .catch(error => {
        console.log('Error: ', error);
    })
}

// Funktion för att lägga till kurs till databas
function addCourse() {
    // Skapa variabler utifrån värden från inputfält
    let courseName = courseNameEl.value;
    let courseCode = courseCodeEl.value;
    let term = termEl.value;
    let prog = progEl.value;
    let coursePlan = coursePlanEl.value;
    let course = {"courseName": courseName, "courseCode": courseCode, "term": term, "progression": prog, "coursePlan": coursePlan};

    // Fetch-anrop med POST-metod
    fetch('http://localhost:3000/courses', {
    method: 'POST',
    // Gör om objekt till JSON och skicka med i anropet
    body: JSON.stringify(course),
    headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        // Återställ listan
        getCourses();
        courseNameEl.value = "";
        courseCodeEl.value = "";
        termEl.value = "";
        progEl.value = "";
        coursePlanEl.value = "";
    })
    // Hantera felmeddelande
    .catch(error => {
        console.log('Error ', error);
    })
}
