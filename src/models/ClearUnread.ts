import { ThreadType } from "./Enum.js";

/**
 * One entry of `clearUnreads` pushed by Zalo over the WebSocket (cmd 504 for user threads,
 * cmd 524 for groups). Observed when a thread is read up to `lastMsgId` in another session of
 * the same account (phone app, Zalo PC) and when this session sends a seen event itself.
 *
 * `type` is kept raw: entries with `type: 0` carry a real thread id; `type: 2` has been seen on
 * cmd 504 with an `idTo` that matches no conversation, so consumers should not treat it as a
 * thread read until its meaning is known.
 */
export type TClearUnread = {
    idTo: string;
    isGroup: number;
    lastMsgId: string;
    lastCliMsgId?: string;
    sct?: number;
    ts: number | string;
    type: number;
};

export class ClearUnread {
    type: ThreadType;
    data: TClearUnread;
    threadId: string;
    lastMsgId: string;

    constructor(data: TClearUnread, isGroup: boolean) {
        this.data = data;
        this.type = isGroup ? ThreadType.Group : ThreadType.User;
        this.threadId = String(data.idTo);
        this.lastMsgId = String(data.lastMsgId);
    }
}
