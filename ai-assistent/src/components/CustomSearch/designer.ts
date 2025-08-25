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

import type CustomSearchModel from "./CustomSearchModel";

export interface CustomSearchSettings extends ComponentModelDesignerSettings {
    searchLayer1: string;
}

export type SettingsMap = DesignerSettings<CustomSearchSettings>;

export const applySettings: ApplyDesignerSettingsCallback<
    CustomSearchModel,
    SettingsMap
> = async (args) => {
    const { model, settings } = args;
    await applyComponentModelDesignerSettings(args);
    model.assignProperties(settings);
};

export const getSettings: GetDesignerSettingsCallback<
    CustomSearchModel,
    SettingsMap
> = async (args) => {
    const { model } = args;
    const { searchLayer1 } = model;
    return {
        ...(await getComponentModelDesignerSettings(args)),
        searchLayer1
    };
};

export const getSettingsSchema: GetDesignerSettingsSchemaCallback<
    CustomSearchModel,
    SettingsMap
> = async (args) => {
    const baseSchema = await getComponentModelDesignerSettingsSchema(args);
    (baseSchema.settings[0].settings as Setting<CustomSearchSettings>[]) = (
        baseSchema.settings[0].settings as Setting<CustomSearchSettings>[]
    ).concat([
        {
            id: "searchLayer1",
            type: "text",
            description: "Zoeklaag 1",
            displayName: "Zoeklaag 1",
        }
    ]);
    const schema: SettingsSchema<CustomSearchSettings> = {
        ...baseSchema,
        settings: [...baseSchema.settings],
    };
    return schema;
};
