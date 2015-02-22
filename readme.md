# Bobby Larson - Cloudinary

## OVERVIEW
The application uses two basic directives, the FileSelector and the Cropper.

The **FileSelector** needs to be added only once in the index.html. A FileSelector's input field is also passed to the Cloudinary Jquery plugin that uses it for upload.

```
<file-selector 
	url="url"
	thumbnail-height="<CUSTOM>"
	thumbnail-width="<CUSTOM>"
	max-height="<CUSTOM>"
	max-width="<CUSTOM>">
</file-selector>
```

A **Cropper** can be added as many times as desired as long as each is given a unique id.

```
<cropper
	url="url"
	id="<UNIQUE>"
	canvas-width="<CUSTOM>"
	canvas-height="<CUSTOM>"
	cropper-height="<CUSTOM>"
	cropper-width="<CUSTOM>">
</cropper>
```

## WORKFLOW

Once a valid file is selected from the local filesystem, it is immediately uploaded by Cloduniary Jquery Plugin. The application listens to the "cloudinarydone" event for a successful upload. Once the "cloudinarydone" event is fired, it adds a thumbnail and populates the Croppers with the selected image for cropping. Every time a cropper is moved, an event is fired with the crop coordinates to the root controller. The root controller keeps track of each Cropper's crop coordinates by it's ID. The submit button can be used to send the crop coordinates back to the server.