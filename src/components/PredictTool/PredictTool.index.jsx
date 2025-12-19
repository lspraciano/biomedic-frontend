import "./predict-tool.css";
import "./predict-tool-media-queries.css";
import ModelMetricCardIndex from "../../components/ModelMetricCard/ModelMetricCard.index.jsx";
import SampleImagesCarousel from "../../components/SampleImagesCarousel/SampleImagesCarousel.index.jsx";
import DragAndDropFile from "../../components/DragAndDropFile/DragAndDropFile.index.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress, MenuItem, Select} from "@mui/material";
import {Link} from "react-router-dom";
import PropTypes, {object} from "prop-types";
import {
    predictImage,
    resetPredictToolState,
    setImageDisplayed,
    setPredictToolState
} from "../../redux/component/predictToolSlice.js";


PredictTool.propTypes = {
    modelsData: PropTypes.arrayOf(object),
};

export default function PredictTool(
    {
        modelsData
    }
) {
    const predictToolState = useSelector(
        store => store.predictToolState
    );

    const dispatch = useDispatch();

    useEffect(() => {
            async function myFunc() {
                if (modelsData.length > 0) {

                    await setImageToBeDisplayed(
                        modelsData[0].sampleImageList[0],
                        modelsData[0].targetUrl,
                    );
                }
            }

            myFunc()
                .catch(console.error);

            return () => {
                dispatch(
                    resetPredictToolState()
                );
            };
        },
        []
    );

    const setImageToBeDisplayed = async (input, endpointUrl) => {

        let file;
        let previewUrl;

        if (input instanceof File) {
            file = input;
            previewUrl = URL.createObjectURL(file);
        } else {
            previewUrl = input;

            const response = await fetch(input);
            const blob = await response.blob();
            file = new File([blob], "sample.jpg", {type: blob.type});
        }

        dispatch(setImageDisplayed(previewUrl));

        dispatch(
            predictImage({
                file,
                endpointTarget: endpointUrl
            })
        );
    };


    const handleSelectChange = async (event) => {
        const modeTarget = parseInt(event.target.value);

        await dispatch(
            setPredictToolState(
                {
                    currentModelId: modeTarget,
                    displayedImage: "",
                    detections: {},
                }
            )
        );

        await setImageToBeDisplayed(
            modelsData[modeTarget].sampleImageList[0],
            modelsData[modeTarget].targetUrl
        );
    }


    return (
        <main
            className={"predict-tool-content"}
        >
            <div
                className={"predict-tool-content__header-zone"}
            >
                <div
                    className={"header-zone__model-name"}
                >
                    <Select
                        labelId="model-name__simple-select-label"
                        id="model-name__simple-select"
                        value={predictToolState.currentModelId}
                        onChange={handleSelectChange}
                        disabled={predictToolState.loading}
                    >
                        {
                            modelsData.map(
                                (item, index) => {
                                    return <MenuItem
                                        value={index}
                                        key={index}
                                    >
                                        {item.modelName}
                                    </MenuItem>
                                }
                            )
                        }
                    </Select>

                    <p>
                        {modelsData[predictToolState.currentModelId].modelDescription}
                    </p>
                </div>
                <div
                    className={"header-zone__model-infos"}
                >
                    {
                        modelsData[predictToolState.currentModelId].metrics.map(
                            (item, index) => {
                                return <ModelMetricCardIndex
                                    metricName={item["name"]}
                                    metricResult={item["value"]}
                                    key={index}
                                />
                            }
                        )
                    }
                </div>
            </div>
            <div
                className={"predict-tool-content__body-zone"}
            >
                <a
                    className={"body-zone__result-zone"}
                    href={predictToolState.displayedImage} download="image.jpg"
                >
                    {
                        predictToolState.loading ?
                            <CircularProgress color="inherit"/>
                            :

                            <img
                                className={"zone__result-zone__image"}
                                src={predictToolState.displayedImage}
                                alt={"imagem de células sanguíneas de um esfregaço"}
                            />

                    }
                </a>
                <div
                    className={"body-zone__options-zone"}
                >
                    <div
                        className={"options-zone__loader-image"}
                    >
                        <DragAndDropFile
                            setFunction={setImageToBeDisplayed}
                            targetUrl={modelsData[predictToolState.currentModelId].targetUrl}
                            loading={predictToolState.loading}
                        />
                    </div>
                    <div
                        className={"options-zone__images-sample"}
                    >
                        {
                            predictToolState.currentModelId === 1 ?
                                <p>
                                    Clique
                                    <Link
                                        to={"https://histologyguide.com/slideview/MH-033hr-blood-smear/07-slide-1.html?x=6734&y=6689&z=100.0"}
                                        target={"_blank"}
                                    >
                                        aqui
                                    </Link>
                                    para acessar uma lâmina escaneada e obtenha suas próprias imagens ou use
                                    as imagens abaixo clicando nelas.
                                </p>
                                :
                                <p>
                                    Clique nas Imagens Abaixo para Testar o Modelo
                                </p>
                        }
                        <SampleImagesCarousel
                            imagesList={modelsData[predictToolState.currentModelId].sampleImageList}
                            setFunction={setImageToBeDisplayed}
                            targetUrl={modelsData[predictToolState.currentModelId].targetUrl}
                            loading={predictToolState.loading}
                        />
                    </div>
                </div>
            </div>
            <div
                className={"predict-tool-content__footer-zone"}
            >
                <p>
                    Detections: {
                    JSON.stringify(
                        predictToolState.detections
                    ).replace(
                        /\\/g,
                        ""
                    )
                }
                </p>
            </div>
        </main>
    )
}