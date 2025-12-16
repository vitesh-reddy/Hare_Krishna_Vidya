import fileUpload from "express-fileupload";

export default fileUpload({
  limits: { fileSize: 2 * 1024 * 1024 },
  abortOnLimit: true,
  safeFileNames: true,
  preserveExtension: true
});