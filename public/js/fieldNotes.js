$(document).ready(function() {

  example_post1 = {
    title: "title1",
    student_id: "student_id1",
    doclink: "doclink1",
    doctype: "doctype1",
    docdesc: "docdesc1"
  }

  example_post2 = {
    title: "title2",
    student_id: "student_id2",
    doclink: "doclink2",
    doctype: "doctype2",
    docdesc: "docdesc2",
  }

// This function constructs a post's HTML
  function createNewRow(post) {
    var newPost = $("<div>");
    var newPostHeading = $("<h3>");
    newPostHeading.html("title: " + post.title + "<br> author id: " + post.student_id);

    var newPostBody = $("<p>")
    newPostBody.html("link: " + post.doclink + "<br> type: " + post.doctype + "<br> description: "  + post.docdesc);

    newPost.append(newPostHeading)
    newPost.append(newPostBody)

    return newPost;
  }

// placeholder for a get request that grabs all posts 
  var all_posts = [example_post1, example_post2]

  for (i in all_posts){
    $("#allPosts").append(createNewRow(all_posts[i]))
  }

// placeholder for a get request that grabs user's posts
  var my_posts = [example_post1, example_post2]

  for (i in my_posts){
    $("#myPosts").append(createNewRow(my_posts[i]))
  }
// placeholder for a get request that grabs user's region's posts
  var my_region_posts = [example_post1, example_post2]

  for (i in my_region_posts){
    $("#myRegionPosts").append(createNewRow(my_region_posts[i]))
  }


});