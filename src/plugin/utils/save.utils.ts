const filename: string = 'post.md';

export const save = ({blob}: {blob: Blob}) => {
  if ('showSaveFilePicker' in window) {
    return exportNativeFileSystem(blob);
  }

  return download({blob, filename});
};

const exportNativeFileSystem = async (blob: Blob) => {
  const fileHandle: FileSystemFileHandle = await getNewFileHandle({filename});

  if (!fileHandle) {
    throw new Error('Cannot access filesystem');
  }

  await writeFile(fileHandle, blob);
};

const getNewFileHandle = ({filename}: {filename: string}): Promise<FileSystemFileHandle> => {
  const opts: SaveFilePickerOptions = {
    suggestedName: filename,
    types: [
      {
        description: 'Markdown file',
        accept: {
          'text/plain': ['.md']
        }
      }
    ]
  };

  return showSaveFilePicker(opts);
};

const writeFile = async (fileHandle: FileSystemFileHandle, blob: Blob) => {
  const writer = await fileHandle.createWritable();
  await writer.write(blob);
  await writer.close();
};

const download = ({filename, blob}: {filename: string | undefined; blob: Blob}) => {
  const a: HTMLAnchorElement = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);

  const url: string = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = `${filename || 'export'}.ddg`;

  a.click();

  window.URL.revokeObjectURL(url);
  a.parentElement?.removeChild(a);
};
