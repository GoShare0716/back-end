const R = require('ramda')

const assocPhase = R.curry((now, workshop) => {
  // TODO over phase: judge by startDatetime or endDatetime

  const stateEqual = value => R.pipe(R.prop('state'), R.equals(value))
  const past = field => R.pipe(R.prop(field), R.gte(now))
  const isFull = R.converge(R.equals, [R.prop('attendeesNumber'), R.prop('minNumber')])

  const phase = R.cond([
    [stateEqual('judge_ac'), R.always('investigating')],
    [stateEqual('reached'), R.cond(
      [
        [past('startDatetime'), R.always('over')],
        [past('closing'), R.always('closing')],
        [isFull, R.always('full')],
        [R.T, R.always('reached')]
      ]
    )],
    [R.T, R.prop('state')]
  ])(workshop)

  return R.pipe(
    R.dissoc('state'),
    R.assoc('phase', phase)
  )(workshop)
})

module.exports = {
  assocPhase
}
