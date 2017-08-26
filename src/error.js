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

const notAuthor = errorFactory(
  'Not allowed to do this unless you are author of this workshop.', {
    status: 401
  }
)

const adminOnly = errorFactory(
  'Only admin allowed to do this operation.', {
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

const fbInfoRequired = errorFactory(
  `login withour 'fbId' and 'accessToken' in request body.`, {
    status: 400
  }
)

// const workshopFull = errorBuilder()
//   .message('this workshop is full.')
//   .status(401)
//   .build()

module.exports = {
  fbInfoRequired,
  memberOnly,
  notAuthor,
  adminOnly,
  notAvailable,
  workshopFull
}
