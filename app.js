// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("./conn/conn");
// const path = require("path");
// const auth = require("./routes/auth");
// const list = require("./routes/list");
// app.use(express.json());
// app.use(cors());
// const multer = require('multer');
// const User = require("./models/user")
// const PORT = process.env.PORT || 1000
// app.use("/api/v1", auth);
// app.use("/api/v2", list);
// app.use(express.static('uploads'))


// app.get('/', async (req, res) => {
//   	res.send("backend api run....");
// });

// app.get('/userall', async (req, res) => {
// 	let data = await User.find()
// 	res.send(data);
// });

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, 'uploads');
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
// 	}
// });

// const upload = multer({ storage: storage });

// app.post('/upload',upload.single('file'), async (req, res) => {
// 	let data = await User.create({image: req.file.filename})
// 	res.send(data)
// })

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.listen(1000, () => {
//  	console.log(`Server Started on port ${PORT}`);
// });


const express = require("express");
const app = express();
const cors = require("cors");
require("./conn/conn");
const path = require("path");
const auth = require("./routes/auth");
const list = require("./routes/list");
app.use(express.json());
app.use(cors());
const multer = require('multer');
const User = require("./models/user")
const PORT = process.env.PORT || 1000
app.use("/api/v1", auth);
app.use("/api/v2", list);
app.use(express.static('uploads'))

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/'); // Directory where uploaded files will be stored
	},
	filename: function (req, file, cb) {
	  cb(null, file.originalname); // Keep original file name
	}
  });
  
  const upload = multer({ storage: storage });
  
  // Handle image upload
  app.post('/upload', upload.single('image'), (req, res) => {
	// Return the uploaded image filename
	res.json({ image: req.file.filename });
  });
  
  // Serve uploaded images statically
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
  // Start the server
  app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
  });