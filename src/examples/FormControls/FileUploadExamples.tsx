import { useState } from 'react';
import { FileUpload } from '../../components/FormControls/FileUpload';

export function FileUploadExamples() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [multipleFiles, setMultipleFiles] = useState<FileList | null>(null);
  const [acceptedFileError, setAcceptedFileError] = useState('');

  function handleAcceptedFileChange(files: FileList | null) {
    const file = files?.[0];

    if (!file) {
      setAcceptedFileError('');
      return;
    }

    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();

    const isAllowed = allowedExtensions.some((extension) =>
      fileName.endsWith(extension),
    );

    setAcceptedFileError(
      isAllowed ? '' : 'Please select a PDF, DOC, or DOCX file.',
    );
  }

  return (
    <div>
      <h2>File Upload Examples</h2>

      <section>
        <h3>Basic File Upload</h3>

        <FileUpload
          label="Upload a document"
          name="document"
          onChange={setSelectedFiles}
        />

        {selectedFiles && selectedFiles.length > 0 && (
          <p>
            Selected file: <strong>{selectedFiles[0].name}</strong>
          </p>
        )}
      </section>

      <section>
        <h3>Multiple Files</h3>

        <FileUpload
          label="Upload documents"
          name="documents"
          multiple
          helperText="You can select multiple files."
          onChange={setMultipleFiles}
        />

        {multipleFiles && multipleFiles.length > 0 && (
          <div>
            <p>
              Selected files: <strong>{multipleFiles.length}</strong>
            </p>

            <ul>
              {Array.from(multipleFiles).map((file) => (
                <li key={`${file.name}-${file.lastModified}`}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section>
        <h3>Accepted File Types</h3>

        <FileUpload
          label="Upload a document"
          name="accepted-document"
          accept=".pdf,.doc,.docx"
          helperText="Accepted formats: PDF, DOC, and DOCX."
          errorMessage={acceptedFileError}
          onChange={handleAcceptedFileChange}
        />
      </section>

      <section>
        <h3>Required File Upload</h3>

        <FileUpload
          label="Upload your resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          required
          helperText="Please upload your resume."
        />
      </section>

      <section>
        <h3>Disabled File Upload</h3>

        <FileUpload
          label="Upload a document"
          name="disabled-document"
          disabled
          helperText="File uploads are currently unavailable."
        />
      </section>
    </div>
  );
}
