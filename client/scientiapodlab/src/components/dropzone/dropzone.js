import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { baseStyle, focusedStyle, rejectStyle } from "./dropzoneStyles";
import { Typography } from "@mui/material";
import { Alert } from "@mui/material";
import styles from "./dropzone.module.css";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";

function Dropzone({
  type = "audio",
  placeholder = "Arrasta ou clica para importares o teu ficheiro",
  secondaryPlaceholder,
  acceptedFile,
  onDrop,
  onReset,
}) {
  // Define accepted files
  const [acceptedFilesFormat, setAcceptedFilesFormat] = useState({
    "audio/mp3": [".mp3"],
  });

  // Disable or enable dropzone
  const [dropzoneDisabled, setDropzoneDisabled] = useState(false);

  useEffect(() => {
    if (type === "image") {
      setAcceptedFilesFormat({
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
      });
    }

    if (acceptedFile) {
      setDropzoneDisabled(true);
    } else {
      setDropzoneDisabled(false);
    }
  }, [type, acceptedFile]);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: acceptedFilesFormat,
    disabled: dropzoneDisabled,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? focusedStyle : {}),
      ...(isFocused ? focusedStyle : {}),
      ...(acceptedFile ? focusedStyle : {}),
      ...(fileRejections.length >= 1 ? rejectStyle : {}),
    }),
    [isFocused, isDragActive, fileRejections, acceptedFile]
  );

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />

        {acceptedFile ? (
          <>
            {type === "image" && (
              <div className={styles.image_accepted}>
                <img
                  alt={"Preview do ficheiro " + acceptedFile.file.name}
                  src={acceptedFile.preview}
                  // Revoke data uri after image is loaded
                  onLoad={() => {
                    URL.revokeObjectURL(acceptedFile.preview);
                  }}
                />
                <button className={styles.image_remove} onClick={onReset}>
                  <RemoveIcon fontSize="small" sx={{ color: "#fff" }} />
                </button>
              </div>
            )}
            {type === "audio" && (
              <div className={styles.audio_accepted}>
                <div className={styles.audio_row}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#343A40", textAlign: "center" }}
                  >
                    {acceptedFile.name}
                  </Typography>

                  <div onClick={onReset} style={{ cursor: "pointer" }}>
                    <CloseIcon
                      sx={{ color: "rgb(255, 0 , 0)" }}
                      fontSize="small"
                    />
                  </div>
                </div>
                <div className={styles.alert}>
                  <Alert severity="success">
                    O ficheiro {acceptedFile.name} foi carregado!
                  </Alert>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {isDragActive ? (
              <div className={styles.dropzone_placeholder}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: "#343A40",
                    textAlign: "center",
                  }}
                >
                  Podes largar aqui o teu ficheiro! Nós tratamos dele!
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: "#343A4040",
                    textAlign: "center",
                  }}
                >
                  {secondaryPlaceholder}
                </Typography>
              </div>
            ) : (
              <div className={styles.dropzone_placeholder}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: "#343A40",
                    textAlign: "center",
                  }}
                >
                  {placeholder}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: "#343A4040",
                    textAlign: "center",
                  }}
                >
                  {secondaryPlaceholder}
                </Typography>
              </div>
            )}

            {fileRejections.length >= 1 && (
              <div className={styles.alert}>
                <Alert severity="error">
                  O formato do ficheiro {fileRejections[0].file.name} não é
                  suportado!
                </Alert>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Dropzone;
