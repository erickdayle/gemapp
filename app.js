const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(
  express.json({
    verify: (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({ error: "Invalid JSON" });
        throw new Error("Invalid JSON");
      }
    },
  })
);
app.use(express.urlencoded({ extended: true }));

// GEM App webhook for BioTechnique
app.post("/gemapp", (req, res) => {
  const record_id = req.query.record_id;
  const project_id = req.query.project_id;

  console.log("Received webhook call for GEM App");
  console.log(`record_id: ${record_id}`);
  console.log(`project_id: ${project_id}`);

  console.log("Request body:", req.body);

  res.status(200).send("Webhook received");
});

app.all("*", (req, res) => {
  res.status(405).send("Method Not Allowed");
});

app.listen(port, () => {
  console.log(`GEM App webhook listening at http://localhost:${port}`);
});
