import { appMessagesKeys } from 'src/app/@core/values/app-messages-keys';
import { AppSuccess } from 'src/app/@core/shared/domain/shared/app-success';

export class AuthInfoSuccess extends AppSuccess {
    public constructor(
        public readonly key: string,
        public readonly message: string,
    ) {
        super(
            key,
            message,
        );
    }

    public static readonly userAlreadyLoggedOut = new AppSuccess(
        appMessagesKeys.userAlreadyLoggedOut,
        'User is already logged out',
    );
}