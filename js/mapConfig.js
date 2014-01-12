/**
 * @typedef {{
 *  tileSize: number,
 * }}
 */
mapConfig;

/**
 * @typedef {{
 *  name: string,
 *  type: string,
 *  uri: string
 *  zone: string
 * }}
 */
textureDefinition;

/**
 * @typedef {{
 *  name: string,
 *  type: string,
 *  uri: string
 *  igeTexture: IgeTexture
 * }}
 */
igeTextureDefinition;

/**
 * @typedef {Array.<textureDefinition>}
 */
textureMap;