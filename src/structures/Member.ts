import type { APIMember } from "groupme-api-types";
import type { Client, User } from "..";
import type BaseGroup from "./BaseGroup";

interface MemberInterface {

}

export default class Member implements MemberInterface {
    private readonly _user: User;
    private readonly _group: BaseGroup;
    private readonly _memberID: string;
    public get user(): User { return this._user }
    public get group(): BaseGroup { return this._group }
    public get memberID(): string { return this._memberID }
    readonly client: Client;
    readonly id: string;
    nickname: string;
    muted: boolean;
    autokicked: boolean;
    roles: ("admin" | "owner" | "user")[];

    constructor(client: Client, group: BaseGroup, user: User, data: APIMember) {
        this.client = client;
        this.id = user.id;
        this._user = user;
        this._group = group;
        this._memberID = data.id;
        this.nickname = data.nickname;
        this.muted = data.muted;
        this.autokicked = data.autokicked;
        this.roles = data.roles;
    }

    get isAdmin(): boolean {
        return this.roles.includes("admin") || this.isOwner;
    }

    get isOwner(): boolean {
        return this.user.id === this.group.creatorID;
    }

    get canLeaveGroup(): boolean {
        return !this.isOwner;
    }

    get canUpdateGroup(): boolean {
        return this.isAdmin || !this.group.closed;
    }

    get canAddMembers(): boolean {
        return this.isAdmin || !this.group.closed;
    }

    get canRemoveMembers(): boolean {
        return this.isAdmin || !this.group.closed;
    }

    get canDeleteGroup(): boolean {
        return this.isOwner;
    }

    get canTransferGroup(): boolean {
        return this.isOwner;
    }
}