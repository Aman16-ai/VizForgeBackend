const ErrorProvider = require("../../Error/ErrorProvider");
const WorkSpace = require("../../model/workspace/WorkSpace");
const ApiResponse = require("../../utils/ApiResponse");
const WorkSpaceService = require("../../service/workspace");

const createWorkSpace = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw new ErrorProvider(400, false, "User not found");
    }
    const name = req.body.name;
    const fileId = req.body.file;
    const workSpaceObj = await WorkSpace.create({
      name: name,
      file: fileId,
      user: user._id,
    });
    res.status(201).json(ApiResponse(false, true, workSpaceObj));
  } catch (err) {
    next(err);
  }
};

const getUserAllWorkSpaces = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) {
      throw new ErrorProvider(400, false, "User not found");
    }
    const allWorkspaces = await WorkSpace.find({ user: user._id })
      .populate("user")
      .populate("file")
      .exec();

    res.status(200).json(ApiResponse(false, true, allWorkspaces));
  } catch (err) {
    next(err);
  }
};

const getWorkspaceById = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) {
      throw new ErrorProvider(400, false, "User not found");
    }
    const workspace = await WorkSpace.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
      .populate("user")
      .populate("file")
      .exec();

    res.status(200).json(ApiResponse(false, true, workspace));
  } catch (err) {
    next(err);
  }
};

const updateUserWorkspace = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ErrorProvider(404, false, "User not found");
    }
    const { id } = req.params;
    const updatedfields = req.body;
    const workspaceService = new WorkSpaceService();
    const updatedWorkspace = await workspaceService.update(
      req.user,
      id,
      updatedfields
    );
    res.status(200).json(ApiResponse(false, true, "Updated successfully"));
  } catch (err) {
    next(err);
  }
};
module.exports = { createWorkSpace, getUserAllWorkSpaces, getWorkspaceById,updateUserWorkspace };
