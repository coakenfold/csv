import { useDropzone } from "react-dropzone";

function DragAndDrop({ updateFiles }) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "text/csv",
  });

  const files = acceptedFiles.map((file) => {
    file.text().then((text) => {
      console.log({ csv: text });
      updateFiles(text);
    });

    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.csv text files will be accepted)</em>
      </div>
      <aside>
        {files.length > 0 && (
          <>
            <h4>Files</h4>
            <ul>{files}</ul>
          </>
        )}
        {fileRejectionItems.length > 0 && (
          <>
            <h4>Rejected files</h4>
            <ul>{fileRejectionItems}</ul>
          </>
        )}
      </aside>
    </section>
  );
}

export default DragAndDrop;
