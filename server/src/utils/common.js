/**
 * @module utils/common
 */
import util from 'util'
import {
  exec
} from 'child_process'

const execPromise = util.promisify(exec)

export const getHostname = async () => {
  const {stdout} = await execPromise('hostname')
  return stdout.replace(/\n$/, '')
}

export const getCommit = async () => {
  const {stdout} = await execPromise('git rev-parse HEAD')
  return stdout.replace(/\n$/, '')
}
