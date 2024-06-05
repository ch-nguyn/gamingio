module.exports = (res, accToken, refToken) => {
  res.cookie("accessToken", accToken, {
    expires: new Date(
      Date.now() +  5 * 60 * 1000
    ),
    // secure:true,
  });
  res.cookie("refreshToken", refToken, {
    expires: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
    // secure:true,
  });
};
