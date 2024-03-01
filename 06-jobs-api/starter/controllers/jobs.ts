import Job from "../models/Job";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";

const getAllJobs = async (req, res) => {
  console.log("the user: ", req.user.userID);

  const jobs = await Job.find({ createdBy: req.user.userID }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobId },
  } = req;
  console.log("userID:", userID);

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userID,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  console.log("the user: ", req.user.userID);
  const job = await Job.create(req.body);
  res.status(StatusCodes.OK).json({ job });
};
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userID },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  );
  if (company === "" || position === "") {
    throw new BadRequestError("Company and position must b provided");
  }
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userID,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send("success");
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
