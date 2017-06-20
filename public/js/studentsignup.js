$(document).ready(function() {

  var marker;
  var markers = [];
  var pos = {lat: 40.5012257, lng: -74.5252189};


  $(".modal").hide()

   getProjects();

   initMap();



    google.maps.event.addListener(map, 'click', function(event) {
      for (i=0; i<markers.length; i++){
          markers[i].setMap(null)
      }
      markers=[];
      placeMarker(event.latLng);
    });


  console.log("studentsignup");
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var usernameInput = $("input#username-input");
  var projectInput = $("select#project-input");


  var projectSelect = $("#project-input");
 

  signUpForm.on("submit", function(event) {
    console.log("signup form student")
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      username: usernameInput.val().trim(),
      latitude: markers[0].position.lat(),
      longitude: markers[0].position.lng(),
    };


    var projectForStudent = projectInput.val()
    console.log("project id = " + projectForStudent)

    if (!userData.email || !userData.password) {
      return;
    }

    
    // If we have an email and password, run the signUpUser function
    signUpUser(userData, projectForStudent);
   
    
  });

  $(".modal-close").on("click", function() {
          $(".modal").hide()
  });
  
  function signUpUser(userData, projForStu) {


    $.post("/api/signup/student", userData)
    .then(function(data) {
       // this is to work around errors sometimes show up the here instead of err
       // the error of duplicate emails would show up in the .then instead or err
        if (!data.id) {
          console.log()
          throw new Error(data.errors[0].message)
      
        }
        // run the post to add the student to the project
        addStuToProj(projForStu, data.id)

       // go to the login pages
        window.location.href = "/student/login.html"
    
      
    }).catch(function(err) {
        // if there is an error during sign up us the modal to show it
        $(".modal-title").text("Error!");
        $(".modal-body").text(err.responseJSON.errors[0].message)
        $(".modal").show();
    
    });
  }



function addStuToProj(Proj, Stu){
      // what the post needs to do
        // INSERT INTO StudentToProjects (ProjectId, StudentId) VALUES (1,1);
    console.log("Proj = "+ Proj + " Stu = " + Stu)
    var projInfo = {
        ProjId: Proj,
        StuId: Stu,
    }
  
    $.post("/api/studentAndProject", projInfo)
    .then(function(data) {
        console.log("added student to project data = "+ JSON.stringify(data))
     
    });
}


// The next 3 functions are used to populate the select list of projects in the HTML form
// This allows the student to sign up for an existing project.
    function renderProjectsList(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createProjectRow(data[i]));
        }
        projectSelect.empty();    //empty any existing values
        projectSelect.append(rowsToAdd);   // add the new row to the selection option
        projectSelect.val();     // select is ready for the user to select a value
    }

    function createProjectRow(project) {
        var listOption = $("<option>");
        listOption.attr("value", project.id);
        listOption.text(project.name + " - " + project.tagLine);  
        return listOption;
    }

    function getProjects() {
        // get all the values you need from the table
        $.get("/api/projects", renderProjectsList)
   }



  function placeMarker(location) {

      var marker = new google.maps.Marker({
        position: location,
        map: map,
        type: "nearby",
        animation: google.maps.Animation.DROP
      });
      markers.push(marker);

    }  // end of placeMarker function


    function initMap() {

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
             var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          });
          console.log(pos)
        }

        map = new google.maps.Map(document.getElementById('gmap'), {
          center: pos,
          zoom: 10
        });

        placeMarker(pos)

      }

});
