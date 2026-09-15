import { useState } from 'react';
import { FileUpload } from '../../components/FormControls/FileUpload';

export function FileUploadExamples() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [multipleFiles, setMultipleFiles] = useState<FileList | null>(null);
  const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
  const [sizeLimitedFile, setSizeLimitedFile] = useState<FileList | null>(null);
  const [limitedFiles, setLimitedFiles] = useState<FileList | null>(null);
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
      <h3>Examples</h3>

      <section>
        <h4>Basic File Upload</h4>

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
        <h4>Multiple Files</h4>

        <FileUpload
          label="Upload documents"
          name="documents"
          multiple
          showClearButton
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
        <h4>Maximum File Count</h4>

        <FileUpload
          label="Upload documents"
          name="limited-documents"
          multiple
          maxFileCount={2}
          helperText="You can select a maximum of 2 files."
          onChange={setLimitedFiles}
        />

        {limitedFiles && limitedFiles.length > 0 && (
          <div>
            <p>
              Selected files: <strong>{limitedFiles.length}</strong>
            </p>

            <ul>
              {Array.from(limitedFiles).map((file) => (
                <li key={`${file.name}-${file.lastModified}`}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section>
        <h4>Drag and Drop File Upload</h4>

        <FileUpload
          label="Upload files"
          name="dropzone-files"
          variant="dropzone"
          multiple
          maxFileCount={2}
          helperText="Drag and drop files here, or use the file picker. Maximum of 2 files"
          onChange={setDroppedFiles}
        />

        {droppedFiles && droppedFiles.length > 0 && (
          <div>
            <p>
              Selected files: <strong>{droppedFiles.length}</strong>
            </p>

            <ul>
              {Array.from(droppedFiles).map((file) => (
                <li key={`${file.name}-${file.lastModified}`}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section>
        <h4>Accepted File Types</h4>

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
        <h4>File Size Validation</h4>

        <FileUpload
          label="Upload a document"
          name="size-limited-document"
          // maxFileSize={5 * 1024 * 1024}
          maxFileSize={1024}
          helperText="Maximum file size: 5 MB."
          onChange={setSizeLimitedFile}
        />

        {sizeLimitedFile && sizeLimitedFile.length > 0 && (
          <p>
            Selected file: <strong>{sizeLimitedFile[0].name}</strong>
          </p>
        )}
      </section>

      <section>
        <h4>Required File Upload</h4>

        <FileUpload
          label="Upload your resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          required
          helperText="Please upload your resume."
        />
      </section>

      <section>
        <h4>Disabled File Upload</h4>

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
