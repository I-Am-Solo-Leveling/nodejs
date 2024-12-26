const getAllJobs = async (req, res) => {
  res.send('All jobs route')
}

const getSingleJob = async (req, res) => {
  res.send('Get single route')
}

const updateJob = async (req, res) => {
  res.send('Edit job route')
}
const createJob = async (req, res) => {
  res.send('Create job route')
}
const deleteJob = async (req, res) => {
  res.send('Delete job route')
}

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
}
