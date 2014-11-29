/**
 * @typedef {{
 *  tileSize: number,
 * }}
 */
mapConfig;

/**
 * @typedef {{
 *  uri: string,
 *  weight: number
 * }}
 */
textureVariation;

/**
 * @typedef {{
 *  name: string,
 *  type: string,
 *  uri: string
 *  zone: string,
 *  textures: Array.<textureVariation>
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