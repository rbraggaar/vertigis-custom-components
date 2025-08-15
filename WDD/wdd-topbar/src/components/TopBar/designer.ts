import type {
    ComponentModelDesignerSettings,
    DesignerSettings,
    ApplyDesignerSettingsCallback,
    GetDesignerSettingsCallback,
    GetDesignerSettingsSchemaCallback,
    Setting,
    SettingsSchema,
} from "@vertigis/web/designer";
import {
    applyComponentModelDesignerSettings,
    getComponentModelDesignerSettings,
    getComponentModelDesignerSettingsSchema,
} from "@vertigis/web/designer";

import type TopBarModel from "./TopBarModel";

export interface TopbarSettings extends ComponentModelDesignerSettings {
    viewerTitle: string;
}

export type SettingsMap = DesignerSettings<TopbarSettings>;

export const applySettings: ApplyDesignerSettingsCallback<
    TopBarModel,
    SettingsMap
> = async (args) => {
    const { model, settings } = args;
    await applyComponentModelDesignerSettings(args);
    model.assignProperties(settings);
};

export const getSettings: GetDesignerSettingsCallback<
    TopBarModel,
    SettingsMap
> = async (args) => {
    const { model } = args;
    const { viewerTitle} = model;
    return {
        ...(await getComponentModelDesignerSettings(args)),
        viewerTitle
    };
};

export const getSettingsSchema: GetDesignerSettingsSchemaCallback<
    TopBarModel,
    SettingsMap
> = async (args) => {
    const baseSchema = await getComponentModelDesignerSettingsSchema(args);
    (baseSchema.settings[0].settings as Setting<TopbarSettings>[]) = (
        baseSchema.settings[0].settings as Setting<TopbarSettings>[]
    ).concat([
        {
            id: "viewerTitle",
            type: "text",
            description: "Naam van de viewer",
            displayName: "Titel in bovenbalk",
        }
    ]);
    const schema: SettingsSchema<TopbarSettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
