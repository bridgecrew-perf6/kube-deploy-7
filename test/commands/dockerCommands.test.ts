import getCwd from '../../src/utils/getCwd';
import { doSpawnSync } from '../../src/utils/doSpawn';
import Mock = jest.Mock;
import { dockerBuild, dockerPush } from '../../src/commands/dockerCommands';

const getCwdMock: Mock = getCwd as Mock;
const doSpawnSyncMock: Mock = doSpawnSync as Mock;

const cwd = '/home/dir'
const tag = 'localhost:3200/sample-project:1.0.0'

describe('dockerCommands', () => {
    beforeEach(() => {
        getCwdMock.mockImplementation(() => cwd);
    });
    it('dockerBuild', () => {
        dockerBuild(tag);
        expect(doSpawnSyncMock).toHaveBeenLastCalledWith({
            command: 'docker',
            args: [
                'build',
                '--network=host',
                '-t',
                tag,
                '.'
            ],
            cwd: `${cwd}/deploy`
        });
    });

    it('dockerPush', () => {
        dockerPush(tag);
        expect(doSpawnSyncMock).toHaveBeenLastCalledWith({
            command: 'docker',
            args: [
                'push',
                tag
            ],
            cwd: `${cwd}/deploy`
        });
    });
});