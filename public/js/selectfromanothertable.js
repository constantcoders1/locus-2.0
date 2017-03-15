$(document).ready(function() {



  // call the function that starts the process
  // this should happend shortly after document ready.
  getTeachers();
  

  
  
// associate the input field with a variable
  var teacherSelect = $("#teacher-input");




  signUpForm.on("submit", function(event) {
//  do what you need to do on submit button click
// change your form name to the correct form.


  });



  // this is the function that starts the process
  // that was called at the top
  function getTeachers() {
    // get all the values you need from the table
    $.get("/api/teachers", renderTeacherList)
  }


  function renderTeacherList(data) {
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createTeacherRow(data[i]));
    }
    teacherSelect.empty();    //empty any existing values
    console.log(rowsToAdd);
    console.log(teacherSelect);
    teacherSelect.append(rowsToAdd);   // add the new row to the selection option
    teacherSelect.val();     // select is ready for the user to select a value
  }

  // Creates the author options in the dropdown
  function createTeacherRow(teacher) {
    
    // start an option for a select field
    var listOption = $("<option>");
  
  // this is the value to store in your table
    listOption.attr("value", teacher.id);

    // this is what you show the user
    listOption.text(teacher.username + " - from: " + teacher.school + " with the email:  " + teacher.email);
    return listOption;
  }

  

});
