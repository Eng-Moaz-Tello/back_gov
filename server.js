// import express from "express";
// import multer from "multer";
// import fs from "fs";
// import axios from "axios";
// import cors from "cors";

// const app = express();

// app.use(cors());

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     const ext = file.originalname.split(".").pop();
//     cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });
// const upload = multer({ storage });

// app.get("/done", (req, res) => res.send("Server is running"));

// app.post("/upload", upload.array("files"), async (req, res) => {
//   try {
//     const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyQFa0BNPgmV4OAXZkjlXbIKciHtRkUMReo8bRIhY60TLFodw9zlKzELlUZBUJ9Pbtl/exec"; // رابط السكريبت

//     const results = [];

//     for (const file of req.files) {
//       const fileBase64 = fs.readFileSync(file.path, { encoding: "base64" });

//       const response = await axios.post(WEB_APP_URL, {
//         file: fileBase64,
//         filename: file.originalname,
//         mimeType: file.mimetype
//       }, {
//         headers: { "Content-Type": "application/json" }
//       });

//       results.push(response.data);

//       fs.unlinkSync(file.path);
//     }

//     res.json({ status: "success", files: results });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ status: "error", error: err.message });
//   }
// });

// app.listen(3001, () => console.log("Server running on port 3001"));

import express from "express";
import multer from "multer";
import axios from "axios";
import cors from "cors";

const app = express();


app.use(cors());


const storage = multer.memoryStorage();
const upload = multer({ storage });


app.get("/done", (req, res) => res.send("Server is running"));


app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const WEB_APP_URL =
      "https://script.google.com/macros/s/AKfycbyQFa0BNPgmV4OAXZkjlXbIKciHtRkUMReo8bRIhY60TLFodw9zlKzELlUZBUJ9Pbtl/exec";

    const results = [];

    for (const file of req.files) {

      const fileBase64 = file.buffer.toString("base64");

      const response = await axios.post(
        WEB_APP_URL,
        {
          file: fileBase64,
          filename: file.originalname,
          mimeType: file.mimetype,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      results.push(response.data);
    }

    res.json({ status: "success", files: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
