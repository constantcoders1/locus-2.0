$(document).ready(function() {

  $(".modal").hide()
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
 
 console.log("teacher login")

  // When the form is submitted, we validate there's an email and password entered


  // pass a hidden variable to know if we are logging in a student or teacher
  // we need to know which table we are looking in for the email/pw a


  loginForm.on("submit", function(event) {
    console.log("teacher login submit")
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    loginTeacher("E*"+userData.email, userData.password);
    
  
  });

    $(".modal-close").on("click", function() {
          $(".modal").hide()
  })


  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
 
 function loginTeacher(email, password) {
    $.post("/api/login/teacher", {
      email: email,
      password: password,

    }).then(function(data) {
      console.log("then:  " + data)
      console.log("should route to next page here")
      window.location.href = "/teacher/educatorview"

   }).catch(function(err) {
      // console.log("catch:  " + JSON.stringify(err))
       $(".modal-title").text("Error!");
      if (err.readyState == 4) {
        $(".modal-body").text("Unauthorized user.  Please check your login.")
      } else {
        $(".modal-body").text("Oops, something went wrong please try again")
      }
      $(".modal").show();
    });
  }
});