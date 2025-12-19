import "./drag-and-drop-file.css";
import PropTypes from "prop-types";
import cloudUpload from "./images/cloud-upload_15.png"


DragAndDropFile.propTypes = {
    setFunction: PropTypes.func,
    targetUrl: PropTypes.string,
    loading: PropTypes.bool
};

export default function DragAndDropFile(
    {
        setFunction,
        targetUrl,
        loading
    }
) {

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = async (event) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];

        if (file) {
            await setFunction(
                file,
                targetUrl
            );
        }
    };

    const handleChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            await setFunction(
                file,
                targetUrl
            );
        }
    };

    return (
        <div
            className={"drag-n-drop-file-content"}
            onDragOver={!loading ? handleDragOver : null}
            onDrop={!loading ? handleDrop : null}
        >
            <label
                className={"drag-n-drop-file-content__title-zone"}
                htmlFor={"input-file"}
            >
                <img
                    src={cloudUpload}
                    alt={"Imagem ilustrativa de upload"}
                />
                <p>
                    Escolha Sua Image
                </p>
            </label>
            <input
                type={"file"}
                accept={".jpeg, .jpg, .png"}
                value={""}
                id={"input-file"}
                onChange={handleChange}
                disabled={loading}
            />
        </div>
    );
}

