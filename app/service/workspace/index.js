const Workspace = require("../../model/workspace/WorkSpace");
const WorkSpacePermissionService = require("./Permission");
const ErrorProvider = require("../../Error/ErrorProvider");
class WorkSpaceService {
  async update(user, id, updatedFields) {
    const workspace = await Workspace.findById(id);
    const workspacePermission = new WorkSpacePermissionService();

    if (!workspace) {
      throw new ErrorProvider(404, false, "Workspace not found");
    }

    // Ensure the user has permission to access the workspace
    if (!workspacePermission.isUserWorkspace(user, workspace)) {
      throw new ErrorProvider(403, false, "Invalid workspace access");
    }

    // Corrected line: Call findByIdAndUpdate on the Workspace model, not on the instance
    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      id,
      { ...updatedFields }, // Ensure `updatedFields` is defined and has the fields to update
      { new: true, runValidators: true }
    );

    if (!updatedWorkspace) {
      throw new ErrorProvider(400, false, "Workspace not updated");
    }

    return updatedWorkspace;
  }
}

module.exports = WorkSpaceService;
