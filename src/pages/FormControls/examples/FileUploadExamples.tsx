import { useRef, useState, useEffect, type RefObject } from 'react';
import {
  FileUpload,
  type FileUploadRef,
} from '../../../components/FormControls/FileUpload';
import { ProgressIndicator } from '../../../components/ContentFeedback/ProgressIndicator';
import { Tabs } from '../../../components/ContentFeedback/Tab';

export function FileUploadExamples() {
  const [acceptedFileError, setAcceptedFileError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);
  const [uploadingExample, setUploadingExample] = useState<string | null>(null);
  const [completedExample, setCompletedExample] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const linearFileUploadRef = useRef<FileUploadRef>(null);
  const multipleFileUploadRef = useRef<FileUploadRef>(null);
  const countFileUploadRef = useRef<FileUploadRef>(null);
  const dropzoneFileUploadRef = useRef<FileUploadRef>(null);
  const acceptedFileUploadRef = useRef<FileUploadRef>(null);
  const sizeFileUploadRef = useRef<FileUploadRef>(null);
  const requiredFileUploadRef = useRef<FileUploadRef>(null);
  const customValidationFileUploadRef = useRef<FileUploadRef>(null);
  const circularFileUploadRef = useRef<FileUploadRef>(null);

  const [errorUploadProgress, setErrorUploadProgress] = useState(0);
  const [isErrorUploading, setIsErrorUploading] = useState(false);
  const [errorUploadFailed, setErrorUploadFailed] = useState(false);
  const [errorUploadCompleted, setErrorUploadCompleted] = useState(false);
  const [errorUploadedFile, setErrorUploadedFile] = useState<File | null>(null);
  const [errorUploadAttempt, setErrorUploadAttempt] = useState(1);

  const errorRecoveryFileUploadRef = useRef<FileUploadRef>(null);

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
      setCompletedExample(null);
      setUploadingExample(null);
      return;
    }

    setUploadedFiles(Array.from(files));
    setUploadProgress(0);
    setCompletedExample(null);
    setUploadingExample(example);
    setIsUploading(true);
  }

  function handleCancelUpload(
    fileUploadRef: React.RefObject<FileUploadRef | null>,
  ) {
    fileUploadRef.current?.clear();

    setIsUploading(false);
    setUploadProgress(0);
    setUploadedFiles(null);
    setUploadingExample(null);
    setCompletedExample(null);
  }

  function renderUploadProgress(
    example: string,
    fileUploadRef: RefObject<FileUploadRef | null>,
    variant: 'linear' | 'circular' = 'linear',
  ) {
    if (uploadingExample !== example || !isUploading) {
      return null;
    }

    return (
      <div>
        <ProgressIndicator
          variant={variant}
          value={uploadProgress}
          label="Upload progress"
          showValue
          colour="info"
        />

        <button type="button" onClick={() => handleCancelUpload(fileUploadRef)}>
          Cancel upload
        </button>
      </div>
    );
  }

  function handleErrorRecoveryUpload(files: FileList | null) {
    const file = files?.[0];

    if (!file) {
      setErrorUploadProgress(0);
      setIsErrorUploading(false);
      setErrorUploadFailed(false);
      setErrorUploadCompleted(false);
      setErrorUploadedFile(null);
      setErrorUploadAttempt(1);
      return;
    }

    setErrorUploadedFile(file);
    setErrorUploadProgress(0);
    setIsErrorUploading(true);
    setErrorUploadFailed(false);
    setErrorUploadCompleted(false);
    setErrorUploadAttempt(1);
  }

  function handleRetryErrorUpload() {
    setErrorUploadProgress(0);
    setErrorUploadFailed(false);
    setErrorUploadCompleted(false);
    setErrorUploadAttempt(2);
    setIsErrorUploading(true);
  }

  function handleCancelErrorUpload() {
    errorRecoveryFileUploadRef.current?.clear();

    setErrorUploadProgress(0);
    setIsErrorUploading(false);
    setErrorUploadFailed(false);
    setErrorUploadCompleted(false);
    setErrorUploadedFile(null);
    setErrorUploadAttempt(1);
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

          switch (uploadingExample) {
            case 'linear':
              linearFileUploadRef.current?.reset();
              break;

            case 'circular':
              circularFileUploadRef.current?.reset();
              break;

            case 'multiple':
              multipleFileUploadRef.current?.reset();
              break;

            case 'count':
              countFileUploadRef.current?.reset();
              break;

            case 'dropzone':
              dropzoneFileUploadRef.current?.reset();
              break;

            case 'accepted':
              acceptedFileUploadRef.current?.reset();
              break;

            case 'size':
              sizeFileUploadRef.current?.reset();
              break;

            case 'required':
              requiredFileUploadRef.current?.reset();
              break;

            case 'custom':
              customValidationFileUploadRef.current?.reset();
              break;
          }

          const files = uploadedFiles;

          if (files && files.length > 0) {
            const fileNames = files.map((file) => file.name).join(', ');

            setUploadStatus(`Upload complete: ${fileNames}`);
          }

          setCompletedExample(uploadingExample);
          setIsUploading(false);
        }

        return nextProgress;
      });
    }, 200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isUploading, uploadingExample, uploadedFiles]);

  useEffect(() => {
    if (!isErrorUploading) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setErrorUploadProgress((currentProgress) => {
        const increment = errorUploadAttempt === 1 ? 10 : 5;
        const nextProgress = Math.min(
          currentProgress + increment,
          errorUploadAttempt === 1 ? 60 : 100,
        );

        if (errorUploadAttempt === 1 && nextProgress === 60) {
          window.clearInterval(intervalId);

          setIsErrorUploading(false);
          setErrorUploadFailed(true);
        }

        if (errorUploadAttempt === 2 && nextProgress === 100) {
          window.clearInterval(intervalId);

          errorRecoveryFileUploadRef.current?.reset();

          setIsErrorUploading(false);
          setErrorUploadCompleted(true);
        }

        return nextProgress;
      });
    }, 200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isErrorUploading, errorUploadAttempt]);

  return (
    <div>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="visually-hidden"
      >
        {uploadStatus}
      </div>
      <h3>Examples</h3>

      <Tabs
        tabs={[
          {
            id: 'progress',
            label: 'Upload Progress',
            content: (
              <div className="stack">
                <div>
                  <h4>Linear Upload Progress</h4>

                  <FileUpload
                    ref={linearFileUploadRef}
                    label="Upload a document"
                    name="linear-document"
                    onChange={(files) => handleUpload(files, 'linear')}
                  />

                  {renderUploadProgress('linear', linearFileUploadRef)}

                  {completedExample === 'linear' &&
                    uploadedFiles &&
                    uploadedFiles.length > 0 && (
                      <p>
                        Upload complete:{' '}
                        <strong>{uploadedFiles[0].name}</strong>
                      </p>
                    )}
                </div>

                <div>
                  <h4>Circular Upload Progress</h4>

                  <FileUpload
                    ref={circularFileUploadRef}
                    label="Upload a document"
                    name="circular-document"
                    onChange={(files) => handleUpload(files, 'circular')}
                  />

                  {renderUploadProgress(
                    'circular',
                    circularFileUploadRef,
                    'circular',
                  )}

                  {completedExample === 'circular' &&
                    uploadedFiles &&
                    uploadedFiles.length > 0 && (
                      <p>
                        Upload complete:{' '}
                        <strong>{uploadedFiles[0].name}</strong>
                      </p>
                    )}
                </div>
              </div>
            ),
          },
          {
            id: 'multiple',
            label: 'Multiple & Limits',
            content: (
              <div className="stack">
                <div>
                  <h4>Multiple Files</h4>

                  <FileUpload
                    ref={multipleFileUploadRef}
                    label="Upload documents"
                    name="documents"
                    multiple
                    helperText="You can select multiple files."
                    onChange={(files) => handleUpload(files, 'multiple')}
                  />

                  {renderUploadProgress('multiple', multipleFileUploadRef)}

                  {completedExample === 'multiple' &&
                    uploadedFiles &&
                    uploadedFiles.length > 0 && (
                      <div>
                        <p>
                          Upload complete:{' '}
                          {uploadedFiles.map((file, index) => (
                            <span key={`${file.name}-${file.lastModified}`}>
                              {index > 0 && ', '}
                              <strong>{file.name}</strong>
                            </span>
                          ))}
                        </p>

                        <ul>
                          {uploadedFiles.map((file) => (
                            <li key={`${file.name}-${file.lastModified}`}>
                              <strong>{file.name}</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>

                <div>
                  <h4>Maximum File Count</h4>

                  <FileUpload
                    ref={countFileUploadRef}
                    label="Upload documents"
                    name="limited-documents"
                    multiple
                    maxFileCount={2}
                    helperText="You can select a maximum of 2 files."
                    onChange={(files) => handleUpload(files, 'count')}
                  />

                  {renderUploadProgress('count', countFileUploadRef)}

                  {completedExample === 'count' &&
                    uploadedFiles &&
                    uploadedFiles.length > 0 && (
                      <>
                        <p>
                          Upload complete:{' '}
                          {uploadedFiles.map((file, index) => (
                            <span key={`${file.name}-${file.lastModified}`}>
                              {index > 0 && ', '}
                              <strong>{file.name}</strong>
                            </span>
                          ))}
                        </p>

                        <ul>
                          {uploadedFiles.map((file) => (
                            <li key={`${file.name}-${file.lastModified}`}>
                              <strong>{file.name}</strong>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                </div>
              </div>
            ),
          },
          {
            id: 'drag-drop',
            label: 'Drag & Drop',
            content: (
              <div className="stack">
                <div>
                  <h4>Drag and Drop File Upload</h4>

                  <FileUpload
                    ref={dropzoneFileUploadRef}
                    label="Upload files"
                    name="dropzone-files"
                    variant="dropzone"
                    multiple
                    maxFileCount={2}
                    helperText="Drag and drop files here, or use the file picker. Maximum of 2 files."
                    onChange={(files) => handleUpload(files, 'dropzone')}
                  />

                  {renderUploadProgress('dropzone', dropzoneFileUploadRef)}

                  {completedExample === 'dropzone' &&
                    uploadedFiles &&
                    uploadedFiles.length > 0 && (
                      <p>
                        Upload complete:{' '}
                        {uploadedFiles.map((file, index) => (
                          <span key={`${file.name}-${file.lastModified}`}>
                            {index > 0 && ', '}
                            <strong>{file.name}</strong>
                          </span>
                        ))}
                      </p>
                    )}
                </div>
              </div>
            ),
          },
          {
            id: 'validation',
            label: 'Validation',
            content: (
              <div className="stack">
                <div>
                  <h4>Accepted File Types</h4>

                  <FileUpload
                    ref={acceptedFileUploadRef}
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

                  {renderUploadProgress('accepted', acceptedFileUploadRef)}

                  {completedExample === 'accepted' &&
                    uploadedFiles &&
                    uploadedFiles.length > 0 && (
                      <p>
                        Upload complete:{' '}
                        <strong>{uploadedFiles[0].name}</strong>
                      </p>
                    )}
                </div>

                <div>
                  <h4>File Size Validation</h4>

                  <FileUpload
                    ref={sizeFileUploadRef}
                    label="Upload a document"
                    name="size-limited-document"
                    maxFileSize={5 * 1024 * 1024}
                    // Test only:
                    // maxFileSize={1024}
                    helperText="Maximum file size: 5MB."
                    onChange={(files) => handleUpload(files, 'size')}
                  />

                  {renderUploadProgress('size', sizeFileUploadRef)}

                  {completedExample === 'size' &&
                    uploadedFiles &&
                    uploadedFiles.length > 0 && (
                      <p>
                        Upload complete:{' '}
                        <strong>{uploadedFiles[0].name}</strong>
                      </p>
                    )}
                </div>

                <div>
                  <h4>Required File Upload</h4>

                  <FileUpload
                    ref={requiredFileUploadRef}
                    label="Upload your resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                    helperText="Please upload your resume."
                    onChange={(files) => handleUpload(files, 'required')}
                  />

                  {renderUploadProgress('required', requiredFileUploadRef)}

                  {completedExample === 'required' &&
                    uploadedFiles &&
                    uploadedFiles.length > 0 && (
                      <p>
                        Upload complete:{' '}
                        <strong>{uploadedFiles[0].name}</strong>
                      </p>
                    )}
                </div>

                <div>
                  <h4>Custom Validation</h4>

                  <FileUpload
                    ref={customValidationFileUploadRef}
                    label="Upload an invoice"
                    name="custom-validation-document"
                    accept=".pdf,.doc,.docx"
                    helperText='The filename must contain "invoice".'
                    validateFiles={(files) => {
                      const file = files[0];

                      if (!file) {
                        return null;
                      }

                      if (!file.name.toLowerCase().includes('invoice')) {
                        return 'The filename must contain "invoice".';
                      }

                      return null;
                    }}
                    onChange={(files) => handleUpload(files, 'custom')}
                  />

                  {renderUploadProgress(
                    'custom',
                    customValidationFileUploadRef,
                  )}

                  {completedExample === 'custom' &&
                    uploadedFiles &&
                    uploadedFiles.length > 0 && (
                      <p>
                        Upload complete:{' '}
                        <strong>{uploadedFiles[0].name}</strong>
                      </p>
                    )}
                </div>
              </div>
            ),
          },
          {
            id: 'error-recovery',
            label: 'Error Recovery',
            content: (
              <div className="stack">
                <div>
                  <h4>Upload Error Recovery</h4>

                  <FileUpload
                    ref={errorRecoveryFileUploadRef}
                    label="Upload a document"
                    name="error-recovery-document"
                    helperText="This example simulates an upload failure at 60%."
                    onChange={handleErrorRecoveryUpload}
                  />

                  {isErrorUploading && (
                    <div>
                      <ProgressIndicator
                        variant="linear"
                        value={errorUploadProgress}
                        label="Upload progress"
                        showValue
                        colour="info"
                      />

                      <button type="button" onClick={handleCancelErrorUpload}>
                        Cancel upload
                      </button>
                    </div>
                  )}

                  {errorUploadFailed && (
                    <div>
                      <p role="alert">
                        Upload failed. The file could not be uploaded. Please
                        try again.
                      </p>

                      <button type="button" onClick={handleRetryErrorUpload}>
                        Retry upload
                      </button>

                      <button type="button" onClick={handleCancelErrorUpload}>
                        Cancel
                      </button>
                    </div>
                  )}

                  {errorUploadCompleted && errorUploadedFile && (
                    <p>
                      Upload complete: <strong>{errorUploadedFile.name}</strong>
                    </p>
                  )}
                </div>
              </div>
            ),
          },
          {
            id: 'disabled',
            label: 'Disabled',
            content: (
              <div className="stack">
                <div>
                  <h4>Disabled File Upload</h4>

                  <FileUpload
                    label="Upload a document"
                    name="disabled-document"
                    disabled
                    helperText="File uploads are currently unavailable."
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
