"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGuard = void 0;
class UserGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.user)
            return false;
        return true;
    }
}
exports.UserGuard = UserGuard;
//# sourceMappingURL=user.guard.js.map