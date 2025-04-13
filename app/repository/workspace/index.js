const WorkSpace = require("../../model/workspace/WorkSpace");

class WorkspaceRepository {
  async create(workspaceData) {
    return await WorkSpace.create(workspaceData);
  }

  async findByUser(userId) {
    return await WorkSpace.find({ user: userId })
      .populate("user")
      .populate("file")
      .exec();
  }

  async findById(workspaceId, userId) {
    return await WorkSpace.findOne({ _id: workspaceId, user: userId })
      .populate("user")
      .populate("file")
      .exec();
  }

  async update(workspaceId, updateFields) {
    return await WorkSpace.findByIdAndUpdate(workspaceId, updateFields, {
      new: true,
      runValidators:true,
    });
  }

  async deleteUserWorkspaceByID(userId, workspaceId) {
    return await WorkSpace.findOneAndDelete({ _id: workspaceId, user: userId });
  }

}

module.exports = WorkspaceRepository;
