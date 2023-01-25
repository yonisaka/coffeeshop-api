const path = require("path");

const UploadController = () => {
  const upload = (req, res) => {
    let file, filename, uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    file = req.files.file;
    filename = new Date().getTime() + "." + file.name.split(".").pop();
    uploadPath = path.resolve() + "/storage/images/" + filename;

    file.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({
        message: "File uploaded successfully",
        filename: filename,
      });
    });
  };

  return {
    upload,
  };
};

module.exports = UploadController;
