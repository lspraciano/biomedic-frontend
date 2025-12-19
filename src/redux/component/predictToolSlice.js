import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosRequester} from "../../requests/axiosClients.js";

const initialState = {
    loading: false,
    currentModelId: 0,
    displayedImage: "",
    detections: {},
}

export const predictImage = createAsyncThunk(
    "predictTool/predictImage",
    async (
        {
            file,
            endpointTarget
        },
        {
            rejectWithValue
        }
    ) => {


        const formData = new FormData();
        formData.append('file', file);

        const config = {
            headers: {
                'accept': 'image/jpeg',
            },
            responseType: 'blob',
            timeout: 60000,
        };

        try {

            const response = await axiosRequester().post(
                endpointTarget,
                formData,
                config,
            )

            const image_data = URL.createObjectURL(response.data);
            const detections = response.headers["detections"];

            return {image_data, detections}

        } catch (error) {
            return rejectWithValue(
                error.response.data
            );
        }
    }
)

export const predictToolSlice = createSlice({
        name: "predictTool",
        initialState,
        reducers: {
            resetPredictToolState: () => {
                return {
                    ...initialState
                };
            },
            setImageDisplayed: (
                state,
                action
            ) => {
                return {
                    ...state,
                    displayedImage: action.payload
                }
            },
            setPredictToolState: (
                state,
                action
            ) => {
                return {
                    ...state,
                    ...action.payload
                }
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(
                    predictImage.pending, state => {
                        state.loading = true;
                    }
                )
                .addCase(
                    predictImage.fulfilled, (
                        state,
                        action
                    ) => {
                        state.detections = action.payload["detections"]
                        state.displayedImage = action.payload["image_data"];
                        state.loading = false;
                    }
                )
                .addCase(
                    predictImage.rejected, (
                        state,
                        action
                    ) => {
                        state.loading = false;
                        console.log(action);
                    }
                )
        },
    }
)

export const {
    setImageDisplayed,
    setPredictToolState,
    resetPredictToolState,
} = predictToolSlice.actions;
export default predictToolSlice.reducer