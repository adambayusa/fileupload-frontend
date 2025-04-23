type MimeTypeMap = {
  [key: string]: string[];
};

export const ACCEPTED_MIME_TYPES: MimeTypeMap = {
  // Documents
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.oasis.opendocument.text': ['.odt'],
  'application/rtf': ['.rtf'],
  'text/plain': ['.txt'],
  
  // Spreadsheets
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  
  // Presentations
  'application/vnd.ms-powerpoint': ['.ppt', '.pps'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'application/vnd.openxmlformats-officedocument.presentationml.slideshow': ['.ppsx'],
  
  // Images
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/bmp': ['.bmp'],
  'image/tiff': ['.tif', '.tiff'],
  
  // Audio
  'audio/mpeg': ['.mp3'],
  'audio/wav': ['.wav'],
  'audio/aac': ['.aac'],
  'audio/flac': ['.flac'],
  
  // Video
  'video/x-msvideo': ['.avi'],
  'video/quicktime': ['.mov'],
  'video/mp4': ['.mp4'],
  'video/x-ms-wmv': ['.wmv'],
  'video/mpeg': ['.mpeg4'],
  'video/x-flv': ['.flv'],
  
  // Other
  'application/zip': ['.zip'],
  'application/epub+zip': ['.epub'],
  'application/vnd.apple.keynote': ['.key'],
  'application/vnd.google-earth.kml+xml': ['.kml'],
  'application/vnd.google-earth.kmz': ['.kmz'],
  'image/svg+xml': ['.svg', '.svgz']
};

export const ACCEPTED_FILE_EXTENSIONS = Object.values(ACCEPTED_MIME_TYPES).flat();

export const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB