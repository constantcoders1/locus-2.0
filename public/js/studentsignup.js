$(document).ready(function() {

  getTeachers();
  
  console.log("studentsignup");
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var usernameInput = $("input#username-input");
  var countryInput = $("select#country-input");
  var stateInput = $("input#state-input");
  var cityInput = $("input#city-input");
  // var teacherInput = $("select#teacher-input");

  var teacherSelect = $("#teacher-input");



  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    console.log("signup form student")
    console.log(teacherInput  + teacherInput.val())
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      username: usernameInput.val().trim(),
      // teacher: teacherInput.val(),
      country: countryInput.val(),
      state:  stateInput.val().trim(),
      city: cityInput.val().trim()

    };

    console.log(userData)

    if (!userData.email || !userData.password) {
      return;
    }


    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    console.log("signed up?")
    emailInput.val("");
    passwordInput.val("");
  });

  function getTeachers() {
    $.get("/api/teachers", renderTeacherList)
  }


  function renderTeacherList(data) {
    // if (!data.length) {
    //   window.location.href = "/authors";
    // }
    // $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createTeacherRow(data[i]));
    }
    teacherSelect.empty();
    console.log(rowsToAdd);
    console.log(teacherSelect);
    teacherSelect.append(rowsToAdd);
    teacherSelect.val();
  }

  // Creates the author options in the dropdown
  function createTeacherRow(teacher) {
    var listOption = $("<option>");
    listOption.attr("value", teacher.id);
    listOption.text(teacher.username + " - from: " + teacher.school + " with the email:  " + teacher.email);
    return listOption;
  }

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup/student", userData).then(function(data) {
      // window.location.replace(data);
    }).catch(function(err) {
      console.log(err);
    });
  }

});
