const fs = require('fs');
const path = require('path');

const deleteImageFile = (imagePath) => {
  if (!imagePath || !imagePath.startsWith('/uploads/')) return;
  
  const filename = imagePath.split('/uploads/')[1];
  const filePath = path.join(__dirname, '../uploads', filename);
  
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting image file: ${filePath}`, err.message);
    }
  });
};

module.exports = {
  deleteImageFile
};
