function errorFactory (msg, obj) {
  const err = new Error(msg)
  Object.assign(err, obj)
  return err
}

const memberOnly = errorFactory(
  'Need to login', {
    status: 401
  }
)

const notAvailable = errorFactory(
  'the workshop is not available to attend.', {
    status: 400
  }
)

const workshopFull = errorFactory(
  'this workshop is full.', {
    status: 400
  }
)

const unreachable = errorFactory(
  'this code should be unreachable', {
    status: 500
  }
)

// const workshopFull = errorBuilder()
//   .message('this workshop is full.')
//   .status(401)
//   .build()

module.exports = {
  memberOnly,
  notAvailable,
  workshopFull
}
