$(document).ready(function() {


  // student login are almost identical - need to know which table student or educator

  $(".modal").hide()
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");


  // When the form is submitted, we validate there's an email and password entered
 
  loginForm.on("submit", function(event) {
  
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form

    // prepend email with S* so we know it is a student
    
    loginStudent("S*"+userData.email, userData.password);

  });

   $(".modal-close").on("click", function() {
          $(".modal").hide()
  })

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
 
 function loginStudent(email, password, source) {
    console.log("email = "+ email)
    $.post("/api/login/student", {
      email: email,
      password: password,
    }).then(function(data) {
      console.log("then:  " + JSON.stringify(data))
      
      // go to the student's page based on the student's id 
      window.location.href = " /student/view/" + data.id

     
    }).catch(function(err) {
      console.log("catch:  " + JSON.stringify(err))
       $(".modal-title").text("Error!");
      if (err.readyState == 4) {
        $(".modal-body").text("Unauthorized user.  Please check your login.")
      } else {
        $(".modal-body").text(JSON.stringify(err))
      }
      $(".modal").show();
    });
  }
});