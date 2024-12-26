const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ jobs: job })
}

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs: jobs })
}

const getSingleJob = async (req, res) => {
  const { userId } = req.user
  const { id: jobId } = req.params

  const job = await Job.findOne({ _id: jobId, createdBy: userId })

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({ jobs: job })
}

const updateJob = async (req, res) => {
  const { user: userId } = req
  const {
    params: { id: jobId },
  } = req

  const { company, position } = req.body

  if (!company === '' || !position === '') {
    throw new BadRequestError('Please provide all the details')
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({ jobs: job })
}

const deleteJob = async (req, res) => {
  const { user: userId } = req
  const {
    params: { id: jobId },
  } = req

  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId })

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({ msg: 'Job deleted successfully' })
}

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
}
