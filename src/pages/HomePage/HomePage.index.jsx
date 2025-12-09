import "./home-page.css";
import "./home-page-media-queries.css";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BasicTemplatePage from "../../components/BasicTemplatePage/BasicTemplatePage.index.jsx";

export default function HomePage() {
    return (
        <BasicTemplatePage>
            <main
                className={"home-page-content"}
            >
                <div
                    className={"home-page-content__title-zone"}
                >
                    <h1>
                        IA & SAÚDE
                    </h1>
                </div>
                <div
                    className={"home-page-content__describe-zone"}
                >
                    <p>
                        Seja muito bem-vindo ao nosso site. Antes de enviar imagens
                        para a nossa inteligência artificial, é importante lembrar
                        que nosso principal objetivo é demonstrar possíveis áreas
                        de atuação da IA na saúde. No entanto, é fundamental ressaltar
                        que essa aplicação não possui relevância clínica e que foi treinada
                        com limitações, o que prejudica o desempenho dela.

                    </p>
                </div>
                <div
                    className={"home-page-content__button-zone"}
                >
                    <Link to={"/predict"}>
                        <Button
                            variant="contained"
                            endIcon={<ThumbUpIcon/>}
                        >
                            Iniciar
                        </Button>
                    </Link>
                </div>
            </main>
        </BasicTemplatePage>
    );
}