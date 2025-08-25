import type { LibraryRegistry } from "@vertigis/web/config";
import type { GetDesignerSettingsSchemaArgs } from "@vertigis/web/designer";


import CustomSearch, { CustomSearchModel } from "./components/CustomSearch";
import {
    applySettings,
    getSettings,
    getSettingsSchema,
} from "./components/CustomSearch/designer";

export default function registerLibrary(registry: LibraryRegistry): void {
    registry.registerComponent({
        name: "custom-search",
        namespace: "geofacta.gxw.custom-search",
        getComponentType: () => CustomSearch,
        getDesignerSettings: (
            args: GetDesignerSettingsSchemaArgs<CustomSearchModel, "">
        ) => getSettings(args),
        applyDesignerSettings: (args) => applySettings(args),
        getDesignerSettingsSchema: (
            args: GetDesignerSettingsSchemaArgs<CustomSearchModel, "">
        ) => getSettingsSchema(args),
        itemType: "custom-search-model",
        title: "Zoekfunctie",
        iconId: "map-3rd-party",
        category: "Geofacta",
    });
    registry.registerModel({
        getModel: (config) => new CustomSearchModel(config),
        itemType: "custom-search-model",
    });
}
