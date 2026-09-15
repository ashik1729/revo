export type DesignVariant = "v1" | "v2";

/** Build-time variant. Set DESIGN_VARIANT=v2 when building the compare deploy. */
export function getDesignVariant(): DesignVariant {
  return process.env.DESIGN_VARIANT === "v2" ? "v2" : "v1";
}
