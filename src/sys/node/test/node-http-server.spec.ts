import * as d from '../../../declarations';
import { getFilePath } from '../node-http-server';
import { TestingConfig } from '../../../testing';
import { validateConfig } from '../../../compiler/config/validate-config';
import { normalizePath } from '../../../compiler/util';


describe('node-http-server', () => {

  let config: d.Config;
  let outputTarget: d.OutputTargetWww;


  it('getFilePath w/ baseUrl and dir', () => {
    config = new TestingConfig();
    config.outputTargets = [
      {
        type: 'www',
        baseUrl: '/some/web/url',
        dir: '/my/network/drive/some/file/system/dir'
      } as d.OutputTargetWww
    ];
    validateConfig(config);
    outputTarget = config.outputTargets[0];
    const url = '/some/web/url/data.json?v=123#hello';

    const p = getFilePath(outputTarget, url);
    const normalizedPath = normalizePath(p);
    expect(normalizedPath).toBe('/my/network/drive/some/file/system/dir/data.json');
  });

  it('getFilePath w/ baseUrl', () => {
    config = new TestingConfig();
    config.outputTargets = [
      {
        type: 'www',
        baseUrl: '/docs'
      } as d.OutputTargetWww
    ];
    validateConfig(config);
    outputTarget = config.outputTargets[0];
    const url = '/docs/data.json?v=123#hello';

    const p = getFilePath(outputTarget, url);
    const normalizedPath = normalizePath(p);
    expect(normalizedPath).toBe('/www/data.json');
  });

  it('getFilePath, defaults w/ querystring and hash', () => {
    config = new TestingConfig();
    validateConfig(config);
    outputTarget = config.outputTargets[0];
    const url = '/data.json?v=123#hello';

    const p = getFilePath(outputTarget, url);
    const normalizedPath = normalizePath(p);
    expect(normalizedPath).toBe('/www/data.json');
  });

  it('getFilePath, defaults', () => {
    config = new TestingConfig();
    validateConfig(config);
    outputTarget = config.outputTargets[0];
    const url = '/data.json';

    const p = getFilePath(outputTarget, url);
    const normalizedPath = normalizePath(p);
    expect(normalizedPath).toBe('/www/data.json');
  });

});
