import bcrypt from "bcrypt";

export default app => {
  app.get("/", (req, res) => {
    console.log("-- / (health)");
    res.status(200).json({ status: "ok" });
  });

  app.get(app.restPath + "/ping", (req, res) => {
    console.log("-- /ping");
    res.status(200).json({ status: "ok" });
  });

  app.get(app.restPath + "/test", async (req, res) => {
    console.log("-- /test");
    const hash = await bcrypt.hash("password", 10);

    res.status(200).json({ hash });
  });

  return (req, res, next) => {
    next();
  };
};
