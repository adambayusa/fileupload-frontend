export interface FileData {
  key: string;
  lastModified: string;
  size: number;
  description?: string;
}

export interface FileWithDescription {
  file: File;
  description?: string;
}