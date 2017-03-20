$(document).ready(function() {

  $(".modal").hide()
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var usernameInput = $("input#username-input");


  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    console.log("signupform teacher")
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      username: usernameInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      console.log("no email or password")
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpEducator(userData);
   
   // clear the input fields
    emailInput.val("");
    passwordInput.val("");
    usernameInput.val("");
  });


 $(".modal-close").on("click", function() {
          $(".modal").hide()
  })
  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpEducator(userData) {
    $.post("/api/signup/teacher", userData

      ).then(function(data) {
      
        if(!data.id) {
          console.log()
          throw new Error (data.errors[0].message)
        }


        window.location.href = "/teacher/login.html"
        // go to login window
      
      console.log(data);

        
      // window.location.replace(data);
    }).catch(function(err) {

       if (err != undefined) {
        console.log("err = " + JSON.stringify(err))
          $(".modal-title").text("Error!");
          $(".modal-body").text(err.responseJSON.errors[0].message)
          $(".modal").show();
        }

      
    });
    console.log("end of signUpTeacher")

  }

});
