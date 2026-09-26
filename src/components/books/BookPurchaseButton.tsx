import type { Retailer } from "@/content/books";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const retailerNames: Record<Retailer, string> = {
  amazon: "Amazon",
  "barnes-noble": "Barnes & Noble",
  "apple-books": "Apple Books",
  bookshop: "Bookshop.org",
  other: "the retailer",
};

/**
 * Sends the reader to an external retailer (no on-site checkout).
 * Add retailers in src/content/books.ts → purchaseLinks.
 */
export function BookPurchaseButton({
  retailer,
  url,
  label,
  variant = "primary",
  size = "md",
  block,
}: {
  retailer: Retailer;
  url: string;
  label?: string;
  variant?: "primary" | "accent" | "secondary" | "light";
  size?: "sm" | "md" | "lg";
  block?: boolean;
}) {
  return (
    <Button href={url} external variant={variant} size={size} block={block} pill>
      <Icon name="cart" size={size === "lg" ? 20 : 18} />
      {label ?? `Buy on ${retailerNames[retailer]}`}
    </Button>
  );
}
