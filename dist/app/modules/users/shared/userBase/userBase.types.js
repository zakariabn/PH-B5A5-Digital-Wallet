"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["PERSONAL"] = "PERSONAL";
    Role["AGENT"] = "AGENT";
})(Role || (exports.Role = Role = {}));
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["BLOCKED"] = "BLOCKED";
    Status["SUSPENDED"] = "SUSPENDED";
})(Status || (exports.Status = Status = {}));
