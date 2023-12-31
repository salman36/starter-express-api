/// creating token and saving in cookie  ///////////
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //   option for cookie
  const cookieExpire = process.env.COOKIE_EXPIRE || 5;
  const options = {
  
      expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
      httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
