import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import DiagramBlock from "./DiagramBlock";
import LogoBlock from "./LogoBlock";
import LayoutRowBlock from "./LayoutRowBlock";
import SpacerBlock from "./SpacerBlock";
import FooterBlock from "./FooterBlock";

// Add further block types as needed.
export const BLOCK_REGISTRY = {
  text: TextBlock,
  image: ImageBlock,
  diagram: DiagramBlock,
  logo: LogoBlock,
  "layout-row": LayoutRowBlock,
  spacer: SpacerBlock,
  footer: FooterBlock,
  // Support other blocks (list, platform-card, badges, etc.) as the app expands.
};

/**
 * PUBLIC_INTERFACE
 * Given a block 'type', returns the corresponding React Component from the registry.
 * @param type {string}
 * @returns {Component|null}
 */
export function getBlockComponent(type) {
  return BLOCK_REGISTRY[type] || null;
}
