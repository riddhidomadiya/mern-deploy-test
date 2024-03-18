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
const cloudinary = require('cloudinary').v2;
const User = require("./models/user")
const PORT = process.env.PORT || 1000
app.use("/api/v1", auth);
app.use("/api/v2", list);
// app.use(express.static('uploads'))


app.get('/', async (req, res) => {
  	res.send("backend api run on server....000");
});

app.get('/userall', async (req, res) => {
	let data = await User.find()
	res.send(data);
});

// USING CLOUDINARY WITH MULTER
	cloudinary.config({
		cloud_name: 'dj8hzxprn',
		api_key: '196216894535315',
		api_secret: 'dm3AvjtLQCpFEDmsa6cL5AsNMIE'
	});

	const storage = multer.diskStorage({
		filename: function (req, file, cb) {
			cb(null, Date.now() + '-' + file.originalname);
		}
	});

  	const upload = multer({ storage: storage });

	// ONLY IMG UPLOAD CODE
	// app.post('/upload', upload.single('file'), (req, res) => {
	// 	cloudinary.uploader.upload(req.file.path, (error, result) => {
	// 		if (error) {
	// 			console.error(error);
	// 			return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
	// 		} else {
	// 			return res.status(200).json({ imageUrl: result.secure_url });
	// 		}
	// 	});
	// });


	// IMG AND VIDEO BOTH ARE UPLOAD
	app.post('/upload', upload.single('file'), (req, res) => {
		if (!req.file) {
			return res.status(400).json({ error: 'No file uploaded' });
		}
		
		const isImage = req.file.mimetype.startsWith('image');
		const isVideo = req.file.mimetype.startsWith('video');
	
		if (isImage) {
			cloudinary.uploader.upload(req.file.path, (error, result) => {
				if (error) {
					console.error(error);
					return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
				} else {
					return res.status(200).json({ imageUrl: result.secure_url });
				}
			});
		} else if (isVideo) {
			cloudinary.uploader.upload(req.file.path, { resource_type: 'video' }, (error, result) => {
				if (error) {
					console.error(error);
					return res.status(500).json({ error: 'Failed to upload video to Cloudinary' });
				} else {
					return res.status(200).json({ videoUrl: result.secure_url });
				}
			});
		} else {
			return res.status(400).json({ error: 'Unsupported file type' });
		}
	});

  

// USING MULTER
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


app.listen(1000, () => {
 	console.log(`Server Started on port ${PORT}`);
});
