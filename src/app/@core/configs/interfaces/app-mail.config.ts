export interface AppMailConfig {
  templates: string;
  sender: string;
  password: string;
  smtpServer: string;
  smtpPort: number;
  isSecured: boolean;
}