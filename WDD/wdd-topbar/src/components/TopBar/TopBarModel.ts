import type { BrandingService } from "@vertigis/web/branding/BrandingService";
import type { ComponentModelProperties, PropertyDefs, } from "@vertigis/web/models";
import { ComponentModelBase, serializable } from "@vertigis/web/models";
import { inject, FrameworkServiceType } from "@vertigis/web/services";

interface TopBarModelProperties extends ComponentModelProperties {
    viewerTitle?: string;
}

@serializable
export default class TopBarModel extends ComponentModelBase<TopBarModelProperties> {
    /**
     * Service for accessing branding-related functionality and data.
     * 
     * Injected via the `FrameworkServiceType.BRANDING` token. This service may be
     * undefined if branding is not configured or available in the current context.
     */
    @inject(FrameworkServiceType.BRANDING)
    brandingService: BrandingService | undefined;
    viewerTitle: string = "";


    // This method defines how the model will be serialized and deserialized into
    // an app item. Overrite it to include a new property.
    protected override _getSerializableProperties(): PropertyDefs<TopBarModelProperties> {
        const props = super._getSerializableProperties();

        return {
            ...props,
            viewerTitle: {
                serializeModes: ["initial"],
                default: "",
            },
        };
    }
}
