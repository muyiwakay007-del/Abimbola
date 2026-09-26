import { retailerNames, type RetailerKey } from "@/lib/books";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";


/**
 * Sends the reader to an external retailer (no on-site checkout).
 * Links come from `retailers` in src/content/books.ts.
 */
export function BookPurchaseButton({
  retailer,
  url,
  label,
  variant = "primary",
  size = "md",
  block,
}: {
  retailer: RetailerKey;
  url: string;
  label?: string;
  variant?: "primary" | "accent" | "secondary" | "light";
  size?: "sm" | "md" | "lg";
  block?: boolean;
}) {
  return (
    <Button href={url} external variant={variant} size={size} block={block} pill>
      <Icon name="cart" size={size === "lg" ? 20 : 18} />
      {label ?? (retailer === "other" ? "Buy Now" : `Buy on ${retailerNames[retailer]}`)}
    </Button>
  );
}
