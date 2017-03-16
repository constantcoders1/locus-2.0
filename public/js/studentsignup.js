$(document).ready(function() {

$(".modal").hide()
  
  console.log("studentsignup");
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var usernameInput = $("input#username-input");
  var countryInput = $("select#country-input");
  var stateInput = $("input#state-input");
  var cityInput = $("input#city-input");


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
  })
  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors

  // *****  errors sometimes show up in then and sometimes in err ******* //
  
  function signUpUser(userData) {
    $.post("/api/signup/student", userData).then(
      function(data) {
        // console.log("data - " + JSON.stringify(data));
        if (data != null) {
          $(".modal-title").text("Warning!");
          $(".modal-body").text(data.errors[0].message)
          $(".modal").show();
        }
       
        // alert(data.errors[0].message)
      
    }).catch(function(err) {
  
       if (err != undefined) {
        console.log("err = " + JSON.stringify(err))
          $(".modal-title").text("Error!");
          $(".modal-body").text(err.errors[0].message)
          $(".modal").show();
        }
      // console.log("is this from sequelize?" + err);
    });
  }

});
