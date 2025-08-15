import type { LayoutElementProperties } from "@vertigis/web/components";
import { LayoutElement } from "@vertigis/web/components";
import { UIContext } from "@vertigis/web/ui";
import Typography from "@vertigis/web/ui/Typography";
import { useWatchAndRerender } from "@vertigis/web/ui/hooks";
import { useContext } from "react";
import type { ReactElement } from "react";

import type TopBarModel from "./TopBarModel";
import "./TopBar.css";
import logo from "../../assets/logo wit.png";

const TopBar = (
    props: LayoutElementProperties<TopBarModel>
): ReactElement => {
    const { model } = props;
    console.debug("TopBar model:", model);

    useWatchAndRerender(model, "viewerTitle");
    // Access the commands from the UI context
    // This allows you to use commands like zoomToInitialViewpoint
    const { commands } = useContext(UIContext);

    // Dynamically get the viewer title (set in "Services > Huisstijl > Applicatienaam")
    // const { brandingService } = useContext(UIContext);

    return (
        <LayoutElement {...props} className="header-container">
            <div className="title-container">
                <Typography className="title" variant="h2">
                    {model.viewerTitle || "Waterschap de Dommel"}
                    {/* Fallback title if viewerTitle is not set */}
                    {/* {brandingService.get('applicationName') || 'Waterschap de Dommel'} */}
                </Typography>
            </div>
            <img onClick={async () => {
                // zoom to initial viewpoint on clicking Dommel logo
                await commands.map.zoomToInitialViewpoint.execute({});
            }} src={logo} alt="Dommel Logo" className="logo" width={75} />
        </LayoutElement>
    );
};

export default TopBar;
