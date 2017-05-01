// This is middleware for restrictng routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {


	console.log(req.user)
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }

  console.log('--------------------')
  console.log('-------------HIT LINE 12 isAuthenticated.js-------')
  console.log('--------------------')
  // If the user isnt' logged in, redirect them to the login page
  return res.redirect("/");
};


