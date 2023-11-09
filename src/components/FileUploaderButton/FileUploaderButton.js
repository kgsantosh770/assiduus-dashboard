import { useTheme, Button } from "@mui/material"
import { useRef } from "react";

const FileUploaderButton = (props) => {
    const theme = useTheme();
    const hiddenFileInput = useRef(null);

    return (
        <>
            <Button
                sx={{
                    color: theme.palette.primary.main,
                    background: '#e8eefd',
                    '@media (max-width:992px)': {
                        fontSize: '0.7rem',
                    },
                }}
                onClick={() => hiddenFileInput.current.click()}
            >
                {props.btnName}
            </Button>
            <input
                type="file"
                ref={hiddenFileInput}
                style={{ display: 'none' }}
            />
        </>

    )
}

export default FileUploaderButton