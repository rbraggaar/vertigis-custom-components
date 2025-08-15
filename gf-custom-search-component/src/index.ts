import type { LibraryRegistry } from "@vertigis/web/config";
import type { GetDesignerSettingsSchemaArgs } from "@vertigis/web/designer";


import TopBar, { TopBarModel } from "./components/TopBar";
import {
    applySettings,
    getSettings,
    getSettingsSchema,
} from "./components/TopBar/designer";

export default function registerLibrary(registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "geofacta",
        namespace: "geofacta.gxw.topbar",
        getComponentType: () => TopBar,
        getDesignerSettings: (
            args: GetDesignerSettingsSchemaArgs<TopBarModel, "">
        ) => getSettings(args),
        applyDesignerSettings: (args) => applySettings(args),
        getDesignerSettingsSchema: (
            args: GetDesignerSettingsSchemaArgs<TopBarModel, "">
        ) => getSettingsSchema(args),
        itemType: "geofacta",
        title: "Bovenbalk (huisstijl WDD)",
        iconId: "map-3rd-party",
        category: "Geofacta",
    });
    registry.registerModel({
        getModel: (config) => new TopBarModel(config),
        itemType: "geofacta",
    });
}
