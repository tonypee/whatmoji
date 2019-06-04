export default app => {
  app.get("/", (req, res) => {
    console.log("-- / (health)");
    res.status(200).json({ status: "ok" });
  });

  return (req, res, next) => {
    next();
  };
};
