/**
 * @param toCapitalize - String to be capitalized
 * @return First letter of `toCapitalize` in upper case, returns `string`
 */

export const capitalizer = (toCapitalize: string): string => {
  return toCapitalize.charAt(0).toUpperCase() + toCapitalize.slice(1);
};
