import fs from 'fs';
import path from 'path';
import { URL } from 'url';

export const deleteImageFile = (imageUrl: string) => {
  try {
    const url = new URL(imageUrl);
    const filename = path.basename(url.pathname);

    const fullPath = path.resolve(
      __dirname,
      '../../../public/images',
      filename,
    );

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    } else {
      console.warn(`${filename} not found.`);
    }
  } catch (err) {
    console.error('Error deleting file:', err);
  }
};

// import fs from 'fs';
// import path from 'path';
// import { URL } from 'url';

// export const deleteImageFile = (imageUrl: string) => {
//   try {
//     const url = new URL(imageUrl);
//     const filename = path.basename(url.pathname);

//     const fullPath = path.join(
//       process.cwd(),
//       'public',
//       'images',
//       filename
//     );

//     if (fs.existsSync(fullPath)) {
//       fs.unlinkSync(fullPath);
//       console.log(`Successfully deleted file: ${filename}`);
//     } else {
//       console.warn(`File not found: ${filename}`);
//     }
//   } catch (err) {
//     console.error('Error deleting file:', err);
//   }
// };
