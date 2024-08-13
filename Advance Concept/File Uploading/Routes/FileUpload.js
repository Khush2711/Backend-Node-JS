const express = require("express");
const router = express.Router();
const { localFileUpload, imageUpload, videoUpload, imageUploadAndReducer } = require("../Controller/fileUpload");

router.post('/localFileUpload', localFileUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);
router.post('/imageUploadAndReducer', imageUploadAndReducer);

module.exports = router;