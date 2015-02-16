# Bobby Larson - Cloudinary

## OVERVIEW
This application uses **npm** and **browserify** for dependency management and build. For strictly front-end dependencies, **bower** is used.

All the JavaScript required is defined in the **lib** folder. Running the command **npm run build** uses browserify to package all the JavaScript files into a single file **/static/bundle.js**. This file is included in index.html along with jquery and jquery-ui.

## COMPONENTS

The application has the following components:

- **FileSelector**:		(/lib/fileSelector.js) Select a file from the local file system and populates a thumbnail. 
						It also triggers a **img-selected** event that is used to populate all the **Cropper**(s)
- **Cropper**:			(/lib/cropper.js) Consists of a canvas element to display the image to be cropper and a 
						draggable div representing the crop area. The image is reset everytime a new image is selected by the FileSelector

Note: the file **lib/browser.js** is simply an entry point for the browserify. It defines an **initialize** function that sets up a FileSelector and Cropper(s) and call the function too.