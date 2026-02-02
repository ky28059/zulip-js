import { promises as fsPromises } from 'fs';
import { parse } from 'ini';

export interface ZulipRC {
  realm: string;
  username: string;
  apiKey: string;
  apiURL: string;
}

export default async function parseConfigFile(filename: string): Promise<ZulipRC> {
  const data = await fsPromises.readFile(filename, 'utf8');
  const parsedConfig = parse(data);
  const config: ZulipRC = {
    realm: parsedConfig.api.site,
    username: parsedConfig.api.email,
    apiKey: parsedConfig.api.key,
    apiURL: `${parsedConfig.api.site}/api/v1`,
  };
  return config;
}
