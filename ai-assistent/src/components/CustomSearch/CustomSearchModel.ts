import type { BrandingService } from "@vertigis/web/branding/BrandingService";
import type { ComponentModelProperties, PropertyDefs, } from "@vertigis/web/models";
import { ComponentModelBase, serializable } from "@vertigis/web/models";
import { inject, FrameworkServiceType } from "@vertigis/web/services";

interface CustomSearchModelProperties extends ComponentModelProperties {
    searchLayer1?: string;
}

@serializable
export default class CustomSearchModel extends ComponentModelBase<CustomSearchModelProperties> {
    /**
     * Service for accessing branding-related functionality and data.
     * 
     * Injected via the `FrameworkServiceType.BRANDING` token. This service may be
     * undefined if branding is not configured or available in the current context.
     */
    @inject(FrameworkServiceType.BRANDING)
    brandingService: BrandingService | undefined;
    searchLayer1: string = "";


    // This method defines how the model will be serialized and deserialized into
    // an app item. Overrite it to include a new property.
    protected override _getSerializableProperties(): PropertyDefs<CustomSearchModelProperties> {
        const props = super._getSerializableProperties();

        return {
            ...props,
            searchLayer1: {
                serializeModes: ["initial"],
                default: "AI",
            },
        };
    }
}
