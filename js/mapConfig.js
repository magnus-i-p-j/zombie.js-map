/**
 * @typedef {{
 *  tileSize: number,
 * }}
 */
mapConfig;

/**
 * @typedef {{
 *  type: string,
 *  uri: string
 *  transitional: boolean,
 *  precedence: number
 * }}
 */
textureDefinition;

/**
 * @typedef {{
 *  type: string,
 *  uri: string
 *  transitional: boolean,
 *  precedence: number,
 *  igeTexture: IgeTexture
 * }}
 */
igeTextureDefinition;

/**
 * @typedef {Array.<textureDefinition>}
 */
textureMap;