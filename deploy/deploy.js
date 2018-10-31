/* globals artifacts web3 */

global.artifacts = artifacts
global.web3 = web3

const { Contracts, SimpleProject  } = require('zos-lib')

const StandaloneERC20 = Contracts.getFromLocal('StandaloneERC20')
const PLCRVoting = Contracts.getFromLocal('PLCRVoting')
const PLCRVotingChallengeFactory = Contracts.getFromLocal('PLCRVotingChallengeFactory')
const TokenCuratedRegistry = Contracts.getFromLocal('TokenCuratedRegistry')

const [ sender ] = web3.eth.accounts

const minStake = 10 * 10 ** 18
const challengerStake = 10 * 10 ** 18
const applicationPeriod = 60 * 60 * 24
const commitStageLength = 60 * 60 * 24
const revealStageLength = 60 * 60 * 24
const voteQuorum = 50
const percentVoterReward = 50

module.exports = async (callback) => {
  const project = new SimpleProject('TokenCuratedRegistryExample')

  const token = await project.createProxy(StandaloneERC20, { initArgs: [
    'Shrimp Coin',
    'SHRMP',
    18,
    [ sender ],
    [ sender ]
  ]})
  console.log('deployed StandaloneERC20 proxy: ', token.address)

  const plcrVoting = await project.createProxy(PLCRVoting, { initArgs: [ token.address ]})
  console.log('deployed PLCRVoting proxy: ', plcrVoting.address)

  const plcrVotingChallengeFactory = await project.createProxy(
    PLCRVotingChallengeFactory,
    { initArgs: [
      challengerStake,
      plcrVoting.address,
      commitStageLength,
      revealStageLength,
      voteQuorum,
      percentVoterReward
    ]}
  )
  console.log('deployed PLCRVotingChallengeFactory proxy: ', plcrVotingChallengeFactory.address)

  const tokenCuratedRegistry = await project.createProxy(
    TokenCuratedRegistry,
    { initArgs: [
      token.address,
      minStake,
      applicationPeriod,
      plcrVotingChallengeFactory.address
    ]}
  )
  console.log('deployed TokenCuratedRegistry proxy: ', tokenCuratedRegistry.address)

  console.log('')

  callback()
}
