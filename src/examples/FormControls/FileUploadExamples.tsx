import { useState, useEffect } from 'react';
import { FileUpload } from '../../components/FormControls/FileUpload';
import { ProgressIndicator } from '../../components/ContentFeedback/ProgressIndicator';

export function FileUploadExamples() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [multipleFiles, setMultipleFiles] = useState<FileList | null>(null);
  const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
  const [sizeLimitedFile, setSizeLimitedFile] = useState<FileList | null>(null);
  const [limitedFiles, setLimitedFiles] = useState<FileList | null>(null);
  const [acceptedFileError, setAcceptedFileError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);
  const [uploadingExample, setUploadingExample] = useState<string | null>(null);

  function handleAcceptedFileChange(files: FileList | null): boolean {
    const file = files?.[0];

    if (!file) {
      setAcceptedFileError('');
      return false;
    }

    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();

    const isAllowed = allowedExtensions.some((extension) =>
      fileName.endsWith(extension),
    );

    setAcceptedFileError(
      isAllowed ? '' : 'Please select a PDF, DOC, or DOCX file.',
    );

    return isAllowed;
  }

  function handleUpload(files: FileList | null, example: string) {
    if (!files || files.length === 0) {
      setUploadedFiles(null);
      setUploadProgress(0);
      setIsUploading(false);
      setUploadingExample(null);
      return;
    }

    setUploadedFiles(files);
    setUploadProgress(0);
    setUploadingExample(example);
    setIsUploading(true);
  }

  function handleCancelUpload() {
    setIsUploading(false);
    setUploadProgress(0);
    setUploadedFiles(null);
    setUploadingExample(null);
  }

  function renderUploadProgress(example: string) {
    if (uploadingExample !== example || !isUploading) {
      return null;
    }

    return (
      <div>
        <ProgressIndicator
          variant="linear"
          value={uploadProgress}
          label="Upload progress"
          showValue
          colour="info"
        />

        <button type="button" onClick={handleCancelUpload}>
          Cancel upload
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (!isUploading) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setUploadProgress((currentProgress) => {
        const nextProgress = Math.min(currentProgress + 5, 100);

        if (nextProgress === 100) {
          window.clearInterval(intervalId);
          setIsUploading(false);
        }

        return nextProgress;
      });
    }, 200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isUploading]);

  return (
    <div>
      <h3>Examples</h3>

      <section>
        <h4>Basic File Upload</h4>

        <FileUpload
          label="Upload a document"
          name="document"
          onChange={(files) => {
            setSelectedFiles(files);
            handleUpload(files, 'basic');
          }}
        />

        {selectedFiles && selectedFiles.length > 0 && (
          <p>
            Selected file: <strong>{selectedFiles[0].name}</strong>
          </p>
        )}

        {renderUploadProgress('basic')}

        {uploadingExample === 'basic' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles && (
            <p>
              Upload complete: <strong>{uploadedFiles[0].name}</strong>
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
          onChange={(files) => {
            setMultipleFiles(files);
            handleUpload(files, 'multiple');
          }}
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

        {renderUploadProgress('multiple')}

        {uploadingExample === 'multiple' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles && (
            <p>
              Upload complete: <strong>{uploadedFiles.length} files</strong>
            </p>
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
          onChange={(files) => {
            setLimitedFiles(files);
            handleUpload(files, 'count');
          }}
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

        {renderUploadProgress('count')}

        {uploadingExample === 'count' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles && (
            <p>
              Upload complete: <strong>{uploadedFiles.length} files</strong>
            </p>
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
          helperText="Drag and drop files here, or use the file picker. Maximum of 2 files."
          onChange={(files) => {
            setDroppedFiles(files);
            handleUpload(files, 'dropzone');
          }}
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

        {renderUploadProgress('dropzone')}

        {uploadingExample === 'dropzone' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles && (
            <p>
              Upload complete: <strong>{uploadedFiles.length} files</strong>
            </p>
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
          onChange={(files) => {
            if (handleAcceptedFileChange(files)) {
              handleUpload(files, 'accepted');
            }
          }}
        />

        {renderUploadProgress('accepted')}

        {uploadingExample === 'accepted' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles && (
            <p>
              Upload complete: <strong>{uploadedFiles[0].name}</strong>
            </p>
          )}
      </section>

      <section>
        <h4>File Size Validation</h4>

        <FileUpload
          label="Upload a document"
          name="size-limited-document"
          // maxFileSize={5 * 1024 * 1024}
          maxFileSize={1024}
          helperText="Maximum file size: 1 KB."
          onChange={(files) => {
            setSizeLimitedFile(files);
            handleUpload(files, 'size');
          }}
        />

        {sizeLimitedFile && sizeLimitedFile.length > 0 && (
          <p>
            Selected file: <strong>{sizeLimitedFile[0].name}</strong>
          </p>
        )}

        {renderUploadProgress('size')}

        {uploadingExample === 'size' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles && (
            <p>
              Upload complete: <strong>{uploadedFiles[0].name}</strong>
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
          onChange={(files) => handleUpload(files, 'required')}
        />

        {renderUploadProgress('required')}

        {uploadingExample === 'required' &&
          !isUploading &&
          uploadProgress === 100 &&
          uploadedFiles && (
            <p>
              Upload complete: <strong>{uploadedFiles[0].name}</strong>
            </p>
          )}
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
