import { registerPlugin } from 'react-filepond';
import ImagePreview from 'filepond-plugin-image-preview';
// import ValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

export { FilePond } from 'react-filepond';

registerPlugin(ImagePreview);
// registerPlugin(ValidateSize);
