import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  pill?: boolean;
  block?: boolean;
  className?: string;
};

type AsLink = Common & {
  href: string;
  /** Opens in a new tab with safe rel attributes. Defaults to true for http(s) links. */
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
};

type AsButton = Common & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
};

export function buttonClass({ variant = "primary", size = "md", pill = false, block = false, className }: Omit<Common, "children">) {
  return [styles.btn, styles[variant], styles[size], pill && styles.pill, block && styles.block, className].filter(Boolean).join(" ");
}

/** The site's button. Renders a Next <Link>, an external <a>, or a <button>. */
export function Button(props: AsLink | AsButton) {
  const cls = buttonClass(props);
  if (props.href !== undefined) {
    const { href, external, children, onClick } = props;
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a className={cls} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} aria-label={props["aria-label"]}>
          {children}
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      );
    }
    return (
      <Link className={cls} href={href} onClick={onClick} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }
  const { type = "button", disabled, onClick, children } = props;
  return (
    <button className={cls} type={type} disabled={disabled} onClick={onClick} aria-label={props["aria-label"]}>
      {children}
    </button>
  );
}
