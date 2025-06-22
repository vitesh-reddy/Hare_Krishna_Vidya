declare global {
  interface Window {
    Quill: any;
  }
}

declare module 'quill-image-resize-module-react' {
  const ImageResize: any;
  export default ImageResize;
}

export {};
