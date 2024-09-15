

class WorkSpacePermissionService {
    
    async isUserWorkspace(user,workspace) {
        if(workspace.user !== user._id) return  false
    
    }
}

module.exports = WorkSpacePermissionService