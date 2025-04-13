const Workspace = require("../../model/workspace/WorkSpace");
const ErrorProvider = require("../../Error/ErrorProvider");
class WorkSpaceService {
  constructor(workspaceRepository, workspacePermissionService) {
    this.workspaceRepository = workspaceRepository;
    this.workspacePermissionService = workspacePermissionService;
  }

  async createWorkspace(user, name, fileId) {
    if (!user) throw new ErrorProvider(400, false, "User not found");

    return await this.workspaceRepository.create({
      name,
      file: fileId,
      user: user._id,
    });
  }

  async getAllWorkspaces(user) {
    if (!user) throw new ErrorProvider(400, false, "User not found");

    return await this.workspaceRepository.findByUser(user._id);
  }

  async getWorkspaceById(user, workspaceId) {
    if (!user) throw new ErrorProvider(400, false, "User not found");

    const workspace = await this.workspaceRepository.findById(
      workspaceId,
      user._id
    );
    if (!workspace) throw new ErrorProvider(404, false, "Workspace not found");

    return workspace;
  }

  async update(user, id, updatedFields) {
    const workspace = await Workspace.findById(id);

    if (!workspace) {
      throw new ErrorProvider(404, false, "Workspace not found");
    }

    // Ensure the user has permission to access the workspace
    if (!this.workspacePermissionService.isUserWorkspace(user, workspace)) {
      throw new ErrorProvider(403, false, "Invalid workspace access");
    }

    // Corrected line: Call findByIdAndUpdate on the Workspace model, not on the instance
    const updatedWorkspace = await this.workspaceRepository.update(
      id,
      updatedFields
    );

    if (!updatedWorkspace) {
      throw new ErrorProvider(400, false, "Workspace not updated");
    }

    return updatedWorkspace;
  }

  async deleteUserWorkspaceById(user, id) {
    console.log("user", user);  
    const workspace = await this.workspaceRepository.deleteUserWorkspaceByID(user,id)
    console.log("workspace", workspace);
    if (!workspace) {
      throw new ErrorProvider(404, false, "Workspace not found");
    }
    return workspace;
  }
}

module.exports = WorkSpaceService;
