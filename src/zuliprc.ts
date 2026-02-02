import { readFile } from 'fs/promises';
import { parse } from 'ini';

export interface ZulipRC {
  realm: string;
  username: string;
  apiKey: string;
  apiURL: string;
}

export default async function parseConfigFile(filename: string): Promise<ZulipRC> {
  const data = await readFile(filename, 'utf8');
  const parsedConfig = parse(data);
  return {
    realm: parsedConfig.api.site,
    username: parsedConfig.api.email,
    apiKey: parsedConfig.api.key,
    apiURL: `${parsedConfig.api.site}/api/v1`,
  };
}
