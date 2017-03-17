$(document).ready(function() {

$(".modal").hide()
getProjects();
  
  console.log("studentsignup");
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var usernameInput = $("input#username-input");
  var countryInput = $("select#country-input");
  var countryInput = $("select#project-input");
  var stateInput = $("input#state-input");
  var cityInput = $("input#city-input");


  var projectSelect = $("#project-input");


  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    console.log("signup form student")
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      username: usernameInput.val().trim(),
      country: countryInput.val(),
      state:  stateInput.val().trim(),
      city: cityInput.val().trim(),
    };
    console.log("going to check email & pw")
    if (!userData.email || !userData.password) {
      return;
    }

    
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    // the line below only executes on a successful sign up
    console.log("signed up?")
    // window.location.href = "/student/login.html"
    
  });

  $(".modal-close").on("click", function() {
          $(".modal").hide()
  });
  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors

  // *****  errors sometimes show up in then and sometimes in err ******* //
  
  function signUpUser(userData) {
    
    $.post("/api/signup/student", userData, function(dataSuccess, textStatus){
      // console.log("dataSuccess = "+ dataSuccess);
      // console.log("textStatus = "+ textStatus);
    }).then(
      function(data) {
        // console.log("data - " + JSON.stringify(data));
        if (!data.id) {
          console.log()
          throw new Error(data.errors[0].message)
          // $(".modal-title").text("Warning!");
          // $(".modal-body").text(data.message)
          // console.log(data.status);
          // $(".modal").show();
        }
        // function postToMultiTable()

        // INSERT INTO StudentToProjects (ProjectId, StudentId) VALUES (1,1);



       // window.location.replace="/student/login"
       window.location.href = "/login/student"


       console.log(data)
        // alert(data.errors[0].message)
      
    }).catch(function(err) {

        $(".modal-title").text("Error!");
        $(".modal-body").text(err.responseJSON.errors[0].message)
        $(".modal").show();
      // console.log("is this from sequelize?" + err);
    });
  }



  function getProjects() {
    // get all the values you need from the table
    $.get("allProjects", renderProjectsList)
  }

  
   function renderProjectsList(data) {
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createProjectRow(data[i]));
    }
    projectSelect.empty();    //empty any existing values
    console.log(rowsToAdd);
    console.log(projectSelect);
    projectSelect.append(rowsToAdd);   // add the new row to the selection option
    projectSelect.val();     // select is ready for the user to select a value
  }


});
