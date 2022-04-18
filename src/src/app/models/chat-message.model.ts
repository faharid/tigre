import { Observable } from 'rxjs';

export class ChatMessage {
    $key?: string;
    $uid?: string;
    email?: string;
    userName?: string;
    message?: string;
    timeSent?: string;
}