/**
 * This file contains rather loose declarations for Extended StyleSheets.
 *
 * Writing strict declarations is a tricky (impossible?) task,
 * because EStyleSheet actively operates with dynamic keys:
 * - variables (started with "$...")
 * - media queries (started with "@media...")
 * - underscored output keys (started with "_...")
 *
 * Adding key augmention is tracked here: https://github.com/Microsoft/TypeScript/issues/12754
 */

import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

export = EStyleSheet;

declare namespace EStyleSheet {
  type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
  type Event = "build";

  export function create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>
  ): T;
  export function build<T>(
    rawGlobalVars?: NamedStyles<T> | Record<string, any>
  ): void;
  export function value<T>(expr: any, prop?: string): any;
  export function child<T>(
    styles: NamedStyles<T>,
    styleName: string,
    index: number,
    count: number
  ): NamedStyles<T>;
  export function subscribe(event: Event, listener: () => any): void;
  export function clearCache(): void;

  // inherited from StyleSheet
  export const flatten: typeof StyleSheet.flatten;
  export const setStyleAttributePreprocessor: typeof StyleSheet.setStyleAttributePreprocessor;
  export const hairlineWidth: typeof StyleSheet.hairlineWidth;
  export const absoluteFillObject: typeof StyleSheet.absoluteFillObject;
  export const absoluteFill: typeof StyleSheet.absoluteFill;
}
