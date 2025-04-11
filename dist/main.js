/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const app_logger_service_1 = __webpack_require__(4);
const app_configs_service_1 = __webpack_require__(7);
const core_1 = __webpack_require__(1);
const throttler_1 = __webpack_require__(13);
const app_configs_module_1 = __webpack_require__(14);
const app_throttler_module_1 = __webpack_require__(16);
const auth_module_1 = __webpack_require__(19);
const auth_info_module_1 = __webpack_require__(154);
const users_module_1 = __webpack_require__(67);
const medias_module_1 = __webpack_require__(169);
const categories_module_1 = __webpack_require__(185);
const database_module_1 = __webpack_require__(206);
const utils_module_1 = __webpack_require__(138);
const companies_module_1 = __webpack_require__(207);
const serve_static_1 = __webpack_require__(243);
const medias_constants_1 = __webpack_require__(147);
const miedas_functions_1 = __webpack_require__(148);
const protected_files_middleware_1 = __webpack_require__(244);
const app_logger_module_1 = __webpack_require__(140);
const requests_logger_middleware_1 = __webpack_require__(245);
const mailer_1 = __webpack_require__(61);
const handlebars_adapter_1 = __webpack_require__(246);
const tenders_module_1 = __webpack_require__(247);
const orders_module_1 = __webpack_require__(311);
const items_module_1 = __webpack_require__(353);
const help_module_1 = __webpack_require__(379);
const notification_module_1 = __webpack_require__(347);
const transforms_module_1 = __webpack_require__(382);
const payment_module_1 = __webpack_require__(414);
const config_1 = __webpack_require__(8);
const app_controller_1 = __webpack_require__(418);
let AppModule = class AppModule {
    configure(consumer) {
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, miedas_functions_1.getPublicDirectory)(),
                serveRoot: `/${medias_constants_1.mediasConstants.paths.public}`,
            }),
            app_logger_module_1.AppLoggerModule,
            auth_module_1.AuthModule.prepareJwtModule(),
            app_configs_module_1.AppConfigsModule,
            app_throttler_module_1.AppThrottlerModule,
            database_module_1.DatabaseModule,
            utils_module_1.UtilsModule,
            auth_module_1.AuthModule,
            auth_info_module_1.AuthInfoModule,
            users_module_1.UsersModule,
            categories_module_1.CategoriesModule,
            companies_module_1.CompaniesModule,
            orders_module_1.OrdersModule,
            medias_module_1.MediasModule,
            items_module_1.ItemsModule,
            tenders_module_1.TendersModule,
            help_module_1.HelpModule,
            payment_module_1.PaymentModule,
            notification_module_1.NotificationModule,
            transforms_module_1.TransformsModule,
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    transport: {
                        host: configService.get("EMAIL_SMTP_SERVER"),
                        port: parseInt(configService.get("EMAIL_SMTP_PORT"), 10),
                        secure: configService.get("EMAIL_SECURE") === "true",
                        auth: {
                            user: configService.get("EMAIL_SENDER"),
                            pass: configService.get("EMAIL_PASSWORD"),
                        },
                    },
                    defaults: {
                        from: configService.get("EMAIL_SENDER"),
                    },
                    template: {
                        dir: configService.get("EMAIL_TEMPLATES"),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            app_configs_service_1.AppConfigsService,
            app_logger_service_1.AppLoggerService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            requests_logger_middleware_1.RequestsLoggerMiddleware,
            protected_files_middleware_1.ProtectedFilesMiddleware,
        ],
        exports: [app_configs_service_1.AppConfigsService, app_logger_service_1.AppLoggerService],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppLoggerService = void 0;
const common_1 = __webpack_require__(3);
const winston = __webpack_require__(5);
__webpack_require__(6);
const app_configs_service_1 = __webpack_require__(7);
let AppLoggerService = class AppLoggerService {
    constructor(appConfigsService) {
        this.appConfigsService = appConfigsService;
        this.logger =
            winston
                .createLogger({
                transports: this.appConfigsService.isProduction ?
                    [
                        this.getConsoleTransport(),
                    ] :
                    [
                        this.getConsoleTransport(),
                    ],
            });
    }
    log(message) {
        this
            .logger
            .log('info', message);
    }
    error(message, stackTrace) {
        this
            .logger
            .log('error', message, {
            stackTrace,
        });
    }
    warn(message) {
        this
            .logger
            .log('warn', message);
    }
    debug(message) {
        this
            .logger
            .log('debug', message);
    }
    verbose(message) {
        this
            .logger
            .log('verbose', message);
    }
    getConsoleTransport() {
        return new winston
            .transports
            .Console({
            format: winston
                .format
                .combine(winston.format.timestamp(), winston.format.json()),
        });
    }
    getFileTransport() {
        return new winston
            .transports
            .DailyRotateFile({
            dirname: './logs',
            filename: 'application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: winston
                .format
                .combine(winston.format.timestamp(), winston.format.json()),
        });
    }
};
exports.AppLoggerService = AppLoggerService;
exports.AppLoggerService = AppLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_configs_service_1.AppConfigsService !== "undefined" && app_configs_service_1.AppConfigsService) === "function" ? _a : Object])
], AppLoggerService);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("winston");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("winston-daily-rotate-file");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigsService = void 0;
const config_1 = __webpack_require__(8);
const injectable_decorator_1 = __webpack_require__(9);
const joi_1 = __webpack_require__(10);
const env_enum_1 = __webpack_require__(11);
const env_constants_1 = __webpack_require__(12);
let AppConfigsService = class AppConfigsService {
    constructor(configService) {
        this.configService = configService;
    }
    get appConfig() {
        return {
            name: this.configService.get('APP_NAME'),
            port: this.configService.get('APP_PORT'),
            environment: this.configService.get('NODE_ENV'),
        };
    }
    get isProduction() {
        return this.appConfig.environment === env_enum_1.EnvEnum.PRODUCTION;
    }
    get databaseConfig() {
        return {
            uri: this.configService.get('DB_URI'),
            username: this.configService.get('DB_USERNAME'),
            password: this.configService.get('DB_PASSWORD'),
            database: this.configService.get('DB_DATABASE'),
        };
    }
    get jwtConfig() {
        return {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_IN'),
            refreshExpiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        };
    }
    get sentCodeConfig() {
        return {
            expiresIn: this.configService.get('SENT_CODE_EXPIRES_IN'),
        };
    }
    get mailConfig() {
        return {
            templates: this.configService.get('EMAIL_TEMPLATES'),
            sender: this.configService.get('EMAIL_SENDER'),
            password: this.configService.get('EMAIL_PASSWORD'),
            smtpServer: this.configService.get('EMAIL_SMTP_SERVER'),
            smtpPort: this.configService.get('EMAIL_SMTP_PORT'),
            isSecured: this.configService.get('EMAIL_SECURE'),
        };
    }
    static validateConfig(envConfig) {
        const envVarsSchema = joi_1.default
            .object({
            APP_NAME: joi_1.default.string().default('Medex'),
            APP_PORT: joi_1.default.number().default(3000),
            NODE_ENV: joi_1.default
                .string()
                .valid(env_enum_1.EnvEnum.DEVELOPMENT, env_enum_1.EnvEnum.STAGING, env_enum_1.EnvEnum.PRODUCTION)
                .default(env_constants_1.envConstants.defaultEnv),
            DB_URI: joi_1.default.string().required(),
            DB_USERNAME: joi_1.default.string().required(),
            DB_PASSWORD: joi_1.default.string().required(),
            DB_DATABASE: joi_1.default.string().required(),
            JWT_SECRET: joi_1.default.string().required(),
            JWT_EXPIRES_IN: joi_1.default.string().default('60m'),
            JWT_REFRESH_EXPIRES_IN: joi_1.default.string().default('3d'),
            SENT_CODE_EXPIRES_IN: joi_1.default.string().default('5m'),
            EMAIL_TEMPLATES: joi_1.default.string().default('resources/email-templates'),
            EMAIL_SENDER: joi_1.default.string().default(''),
            EMAIL_PASSWORD: joi_1.default.string().default(''),
            EMAIL_SMTP_SERVER: joi_1.default.string().default(''),
            EMAIL_SMTP_PORT: joi_1.default.number().default(465),
            EMAIL_SECURE: joi_1.default.boolean().default(true),
        });
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig, {
            allowUnknown: false,
            abortEarly: true,
        });
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
};
exports.AppConfigsService = AppConfigsService;
exports.AppConfigsService = AppConfigsService = __decorate([
    (0, injectable_decorator_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AppConfigsService);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/common/decorators/core/injectable.decorator");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("joi");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnvEnum = void 0;
var EnvEnum;
(function (EnvEnum) {
    EnvEnum["DEVELOPMENT"] = "development";
    EnvEnum["STAGING"] = "staging";
    EnvEnum["PRODUCTION"] = "production";
})(EnvEnum || (exports.EnvEnum = EnvEnum = {}));


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.envConstants = void 0;
const env_enum_1 = __webpack_require__(11);
exports.envConstants = {
    defaultEnv: env_enum_1.EnvEnum.PRODUCTION,
};


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigsModule = void 0;
const module_decorator_1 = __webpack_require__(15);
const app_configs_service_1 = __webpack_require__(7);
const config_1 = __webpack_require__(8);
const env_constants_1 = __webpack_require__(12);
let AppConfigsModule = class AppConfigsModule {
};
exports.AppConfigsModule = AppConfigsModule;
exports.AppConfigsModule = AppConfigsModule = __decorate([
    (0, module_decorator_1.Module)({
        imports: [
            config_1.ConfigModule
                .forRoot({
                isGlobal: true,
                expandVariables: true,
                envFilePath: `src/app/@core/configs/.env/.env.${process.env.NODE_ENV || env_constants_1.envConstants.defaultEnv}`,
            })
        ],
        providers: [
            app_configs_service_1.AppConfigsService,
        ],
        exports: [
            app_configs_service_1.AppConfigsService,
        ],
    })
], AppConfigsModule);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("@nestjs/common/decorators/modules/module.decorator");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppThrottlerModule = void 0;
const module_decorator_1 = __webpack_require__(15);
const app_throttler_types_1 = __webpack_require__(17);
const throttler_module_1 = __webpack_require__(18);
let AppThrottlerModule = class AppThrottlerModule {
};
exports.AppThrottlerModule = AppThrottlerModule;
exports.AppThrottlerModule = AppThrottlerModule = __decorate([
    (0, module_decorator_1.Module)({
        imports: [
            throttler_module_1.ThrottlerModule
                .forRoot(app_throttler_types_1.appThrottlerTypes),
        ],
        providers: [],
        exports: [],
    })
], AppThrottlerModule);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appThrottlerTypes = void 0;
exports.appThrottlerTypes = [
    {
        name: 'short',
        ttl: 1000,
        limit: 3,
    },
    {
        name: 'medium',
        ttl: 10000,
        limit: 20
    },
    {
        name: 'long',
        ttl: 60000,
        limit: 100
    }
];


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler/dist/throttler.module");

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(20);
const passport_1 = __webpack_require__(66);
const users_module_1 = __webpack_require__(67);
const jwt_module_1 = __webpack_require__(105);
const app_configs_service_1 = __webpack_require__(7);
const app_configs_module_1 = __webpack_require__(14);
const jwt_auth_strategy_1 = __webpack_require__(106);
const auth_controller_1 = __webpack_require__(108);
const local_auth_strategy_1 = __webpack_require__(127);
const cqrs_1 = __webpack_require__(41);
const auth_register_handler_1 = __webpack_require__(129);
const auth_login_handler_1 = __webpack_require__(132);
const mongoose_1 = __webpack_require__(24);
const user_token_schema_1 = __webpack_require__(33);
const user_token_factory_1 = __webpack_require__(22);
const user_token_schema_factory_1 = __webpack_require__(39);
const user_tokens_repository_1 = __webpack_require__(23);
const jwt_provider_service_1 = __webpack_require__(43);
const auth_refresh_handler_1 = __webpack_require__(135);
const auth_forgot_password_handler_1 = __webpack_require__(136);
const sent_code_provider_service_1 = __webpack_require__(53);
const user_code_schema_1 = __webpack_require__(57);
const user_code_factory_1 = __webpack_require__(52);
const user_code_schema_factory_1 = __webpack_require__(58);
const user_codes_repository_1 = __webpack_require__(56);
const auth_reset_password_handler_1 = __webpack_require__(137);
const utils_module_1 = __webpack_require__(138);
const infrastructure_module_1 = __webpack_require__(139);
const auth_confirm_handler_1 = __webpack_require__(149);
const auth_resend_confirm_code_handler_1 = __webpack_require__(150);
const auth_get_me_handle_1 = __webpack_require__(151);
const auth_update_handler_1 = __webpack_require__(152);
const auth_factory_1 = __webpack_require__(153);
let AuthModule = class AuthModule {
    static prepareJwtModule() {
        return jwt_module_1.JwtModule
            .registerAsync({
            imports: [
                app_configs_module_1.AppConfigsModule,
            ],
            inject: [
                app_configs_service_1.AppConfigsService,
            ],
            useFactory: (appConfigsService) => ({
                secret: appConfigsService.jwtConfig.secret,
                signOptions: {
                    expiresIn: appConfigsService.jwtConfig.expiresIn,
                },
            }),
        });
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            utils_module_1.UtilsModule,
            infrastructure_module_1.InfrastructureModule,
            cqrs_1.CqrsModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_token_schema_1.UserTokenSchema.name,
                    schema: mongoose_1.SchemaFactory
                        .createForClass(user_token_schema_1.UserTokenSchema),
                },
                {
                    name: user_code_schema_1.UserCodeSchema.name,
                    schema: mongoose_1.SchemaFactory
                        .createForClass(user_code_schema_1.UserCodeSchema),
                },
            ]),
            passport_1.PassportModule,
            app_configs_module_1.AppConfigsModule,
            AuthModule.prepareJwtModule(),
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_provider_service_1.JwtProviderService,
            sent_code_provider_service_1.SentCodeProviderService,
            local_auth_strategy_1.LocalAuthStrategy,
            jwt_auth_strategy_1.JwtAuthStrategy,
            auth_register_handler_1.AuthRegisterHandler,
            auth_login_handler_1.AuthLoginHandler,
            auth_update_handler_1.AuthsUpsertHandler,
            auth_get_me_handle_1.GetMeHandler,
            auth_refresh_handler_1.AuthRefreshHandler,
            auth_confirm_handler_1.AuthConfirmHandler,
            auth_resend_confirm_code_handler_1.AuthResendConfirmCodeHandler,
            auth_reset_password_handler_1.AuthResetPasswordHandler,
            auth_forgot_password_handler_1.AuthForgotPasswordHandler,
            user_tokens_repository_1.UserTokensRepository,
            user_token_schema_factory_1.UserTokenSchemaFactory,
            user_token_factory_1.UserTokenFactory,
            user_codes_repository_1.UserCodesRepository,
            user_code_schema_factory_1.UserCodeSchemaFactory,
            user_code_factory_1.UserCodeFactory,
            auth_factory_1.AuthFactory,
        ],
        controllers: [
            auth_controller_1.AuthController,
        ],
        exports: [
            auth_service_1.AuthService,
            jwt_provider_service_1.JwtProviderService,
            user_tokens_repository_1.UserTokensRepository,
            user_token_factory_1.UserTokenFactory,
        ],
    })
], AuthModule);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(3);
const auth_tokens_result_1 = __webpack_require__(21);
const user_token_factory_1 = __webpack_require__(22);
const users_repository_1 = __webpack_require__(45);
const bcrypt = __webpack_require__(51);
const user_code_factory_1 = __webpack_require__(52);
const app_mail_service_1 = __webpack_require__(60);
const sent_code_enum_1 = __webpack_require__(62);
const email_templates_1 = __webpack_require__(64);
const app_urls_1 = __webpack_require__(65);
let AuthService = class AuthService {
    constructor(usersRepository, userTokenFactory, userCodeFactory, appMailService) {
        this.usersRepository = usersRepository;
        this.userTokenFactory = userTokenFactory;
        this.userCodeFactory = userCodeFactory;
        this.appMailService = appMailService;
    }
    async validateUser(username, password) {
        if (username === 'admin@example.com' && password === '1234') {
            return {
                id: 1,
                nickname: 'Admin NickName',
            };
        }
        return null;
    }
    async changePassword(user, newPassword) {
        const salt = await bcrypt
            .genSalt();
        const hashedNewPassword = await bcrypt
            .hash(newPassword, salt);
        user.password = hashedNewPassword;
        await this
            .usersRepository
            .getAndReplaceById(user._id, user);
        const userToken = await this
            .userTokenFactory
            .save(user._id);
        const resultTokens = auth_tokens_result_1.AuthTokensResult
            .create(userToken.accessToken, userToken.refreshToken);
        return resultTokens;
    }
    async createAndSendConfirmCode(user) {
        const confirmCode = await this
            .userCodeFactory
            .save(sent_code_enum_1.SentCodeEnum.emailConfirmation, user.email, user._id);
        const isEmailSent = await this
            .appMailService
            .send(user.email, sent_code_enum_1.SentCodeEnum.emailConfirmation.title, email_templates_1.default.confirm, {
            name: user.nickName,
            code: confirmCode.code,
            url: app_urls_1.default.auth.confirm + confirmCode.code,
        });
        return isEmailSent ? confirmCode : null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof user_token_factory_1.UserTokenFactory !== "undefined" && user_token_factory_1.UserTokenFactory) === "function" ? _b : Object, typeof (_c = typeof user_code_factory_1.UserCodeFactory !== "undefined" && user_code_factory_1.UserCodeFactory) === "function" ? _c : Object, typeof (_d = typeof app_mail_service_1.AppMailService !== "undefined" && app_mail_service_1.AppMailService) === "function" ? _d : Object])
], AuthService);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthTokensResult = void 0;
class AuthTokensResult {
    constructor(accessToken, refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    static create(accessToken, refreshToken) {
        return new AuthTokensResult(accessToken, refreshToken);
    }
}
exports.AuthTokensResult = AuthTokensResult;


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTokenFactory = void 0;
const common_1 = __webpack_require__(3);
const user_tokens_repository_1 = __webpack_require__(23);
const user_token_1 = __webpack_require__(40);
const app_configs_service_1 = __webpack_require__(7);
const uuid_1 = __webpack_require__(42);
const jwt_provider_service_1 = __webpack_require__(43);
const app_date_utils_service_1 = __webpack_require__(49);
const mongo_functions_1 = __webpack_require__(29);
let UserTokenFactory = class UserTokenFactory {
    constructor(jwtProviderService, appConfigsService, userTokensRepository, appDateUtilsService) {
        this.jwtProviderService = jwtProviderService;
        this.appConfigsService = appConfigsService;
        this.userTokensRepository = userTokensRepository;
        this.appDateUtilsService = appDateUtilsService;
    }
    async save(userId) {
        const accessToken = await this
            .jwtProviderService
            .generateAccessToken(userId);
        const refreshToken = (0, uuid_1.v4)();
        const expirationDate = this
            .appDateUtilsService
            .getCurrentDateWithDuration(this.appConfigsService.jwtConfig.refreshExpiresIn);
        const foundUserToken = await this.userTokensRepository
            .get({
            userId: (0, mongo_functions_1.createObjectId)(userId),
        });
        const entity = new user_token_1.UserToken((0, mongo_functions_1.createObjectIdAsString)(foundUserToken?._id), accessToken, refreshToken, userId, expirationDate);
        if (foundUserToken === null) {
            await this
                .userTokensRepository
                .insert(entity);
            return entity;
        }
        await this
            .userTokensRepository
            .getAndReplaceById(foundUserToken._id, entity);
        return entity;
    }
};
exports.UserTokenFactory = UserTokenFactory;
exports.UserTokenFactory = UserTokenFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_provider_service_1.JwtProviderService !== "undefined" && jwt_provider_service_1.JwtProviderService) === "function" ? _a : Object, typeof (_b = typeof app_configs_service_1.AppConfigsService !== "undefined" && app_configs_service_1.AppConfigsService) === "function" ? _b : Object, typeof (_c = typeof user_tokens_repository_1.UserTokensRepository !== "undefined" && user_tokens_repository_1.UserTokensRepository) === "function" ? _c : Object, typeof (_d = typeof app_date_utils_service_1.AppDateUtilsService !== "undefined" && app_date_utils_service_1.AppDateUtilsService) === "function" ? _d : Object])
], UserTokenFactory);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTokensRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const base_repository_1 = __webpack_require__(26);
const user_token_schema_1 = __webpack_require__(33);
const user_token_schema_factory_1 = __webpack_require__(39);
const mongo_functions_1 = __webpack_require__(29);
let UserTokensRepository = class UserTokensRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
    async getByRefreshToken(refreshToken) {
        const entity = await this.get({
            refreshToken: refreshToken,
        });
        return entity;
    }
    async getByUserId(userId) {
        const entity = await this.get({
            userId: (0, mongo_functions_1.createObjectId)(userId),
        });
        return entity;
    }
};
exports.UserTokensRepository = UserTokensRepository;
exports.UserTokensRepository = UserTokensRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_token_schema_1.UserTokenSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof user_token_schema_factory_1.UserTokenSchemaFactory !== "undefined" && user_token_schema_factory_1.UserTokenSchemaFactory) === "function" ? _b : Object])
], UserTokensRepository);


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseRepository = void 0;
const app_result_1 = __webpack_require__(27);
const app_paging_1 = __webpack_require__(28);
const mongo_functions_1 = __webpack_require__(29);
const date_functions_1 = __webpack_require__(31);
const order_direction_enum_1 = __webpack_require__(32);
class BaseRepository {
    constructor(model, schemaFactory) {
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
    async getById(id, projection, populateOptions) {
        const filter = {
            _id: (0, mongo_functions_1.createObjectId)(id),
        };
        return await this.get(filter, projection, populateOptions);
    }
    async getAndReplaceById(id, entity) {
        const filter = {
            _id: (0, mongo_functions_1.createObjectId)(id),
        };
        return await this.getAndUpdate(filter, entity);
    }
    async get(filterQuery, projection, populateOptions) {
        let query = this.model.findOne(filterQuery, {
            ...projection,
        }, {
            lean: true,
        });
        if (populateOptions != null && populateOptions.length > 0) {
            populateOptions.forEach((option) => {
                query = query.populate(option.path, option.select);
            });
        }
        const entityDocument = await query.exec();
        if (entityDocument === null) {
            return null;
        }
        return this.schemaFactory.createFromSchema(entityDocument);
    }
    async getAll(filterQuery, projection, populateOptions, orderByCriteria) {
        let query = this.model.find(filterQuery, {
            ...projection,
        }, {
            lean: true,
        });
        query = this.orderBy(query, orderByCriteria);
        if (populateOptions != null && populateOptions.length > 0) {
            populateOptions.forEach((option) => {
                query = query.populate(option.path, option.select);
            });
        }
        const entityDocuments = await query.exec();
        return entityDocuments.map((entityDocument) => this.schemaFactory.createFromSchema(entityDocument));
    }
    async getAllAsResult(filterQuery, projection, populateOptions, pageSize = 10, pageNumber = 1, withPaging = true, orderByCriteria) {
        const skip = withPaging ? (pageNumber - 1) * pageSize : 0;
        const take = withPaging ? pageSize : 0;
        let query = this.model.find(filterQuery, {
            ...projection,
        }, {
            lean: true,
        });
        query = this.orderBy(query, orderByCriteria);
        if (withPaging) {
            query = query.skip(skip).limit(take);
        }
        if (populateOptions != null && populateOptions.length > 0) {
            populateOptions.forEach((option) => {
                query = query.populate(option.path, option.select);
            });
        }
        const totalRecords = !withPaging ? 0 : await this.model.countDocuments(filterQuery);
        const appPaging = !withPaging ? null : (app_paging_1.AppPaging.calc(withPaging, totalRecords, pageSize, pageNumber));
        const entityDocuments = await query.exec();
        const entities = entityDocuments.map((entityDocument) => this.schemaFactory.createFromSchema(entityDocument));
        return app_result_1.AppResult.createSuccess(null, null, entities, appPaging);
    }
    async insert(entity) {
        console.log("insert", entity);
        var schema = this.schemaFactory.create(entity);
        console.log(schema);
        schema = this.prepareDateForSchema(schema, true, false, false);
        const model = new this.model(schema);
        await model.save();
    }
    async insertAll(entities) {
        const preparedEntities = entities.map((entity) => {
            const schema = this.schemaFactory.create(entity);
            return this.prepareDateForSchema(schema, true, false, false);
        });
        await this.model.insertMany(preparedEntities);
    }
    async getAndUpdate(filterQuery, entity) {
        var schema = this.schemaFactory.create(entity);
        schema = this.prepareDateForSchema(schema, false, true, false);
        const updatedEntityDocument = await this.model.findOneAndReplace(filterQuery, schema, {
            new: true,
            useFindAndModify: false,
            lean: true,
        });
        if (updatedEntityDocument === null) {
            return null;
        }
        return entity;
    }
    async getAndDelete(filterQuery) {
        console.log("filterQuery", filterQuery);
        const deletedEntityDocument = await this.model.findOneAndDelete(filterQuery);
        console.log("deletedEntityDocument", deletedEntityDocument);
        if (deletedEntityDocument === null) {
            return null;
        }
        const entity = this.schemaFactory.createFromSchema(deletedEntityDocument);
        return entity;
    }
    async deleteById(id) {
        const filter = {
            _id: (0, mongo_functions_1.createObjectId)(id),
        };
        return await this.delete(filter);
    }
    async delete(filterQuery) {
        const deleteResult = await this.model.deleteOne(filterQuery);
        return deleteResult.deletedCount >= 1;
    }
    async deleteAll(filterQuery) {
        const deleteResult = await this.model.deleteMany(filterQuery);
        return deleteResult.deletedCount >= 1;
    }
    prepareDateForSchema(schema, withCreatedAt = false, withUpdatedAt = false, withDeleteAt = false) {
        const hasDates = this.hasDates(schema);
        if (!hasDates && !withCreatedAt && !withUpdatedAt && !withDeleteAt) {
            return schema;
        }
        const schemaWithDates = schema;
        if (withCreatedAt) {
            schemaWithDates.createdAt = (0, date_functions_1.nowUtc)();
            schemaWithDates.updatedAt = (0, date_functions_1.nowUtc)();
        }
        if (withUpdatedAt) {
            schemaWithDates.updatedAt = (0, date_functions_1.nowUtc)();
        }
        if (withDeleteAt) {
            schemaWithDates.deletedAt = (0, date_functions_1.nowUtc)();
        }
        return schema;
    }
    hasDates(object) {
        const hasCreatedAt = object != null && typeof object.createdAt !== "undefined";
        const hasUpdatedAt = object != null && typeof object.updatedAt !== "undefined";
        const hasDeletedAt = object != null && typeof object.deletedAt !== "undefined";
        return hasCreatedAt && hasUpdatedAt && hasDeletedAt;
    }
    orderBy(query, orderByCriteria) {
        if (orderByCriteria != null && orderByCriteria.length != 0) {
            const sortCriteria = orderByCriteria.reduce((acc, { field, direction }) => {
                acc[field] = direction === order_direction_enum_1.OrderDirectionEnum.ASC ? 1 : -1;
                return acc;
            }, {});
            query = query.sort(sortCriteria);
        }
        return query;
    }
    async updateStatus(id, status) {
        const filter = {
            _id: (0, mongo_functions_1.createObjectId)(id),
        };
        const update = {
            status: status,
            updatedAt: (0, date_functions_1.nowUtc)(),
        };
        const updateResult = await this.model.updateOne(filter, update);
        return updateResult.modifiedCount > 0;
    }
}
exports.BaseRepository = BaseRepository;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppResult = void 0;
class AppResult {
    constructor(isSuccess, key, message, data, paging, error) {
        this.isSuccess = isSuccess;
        this.key = key;
        this.message = message;
        this.data = data;
        this.paging = paging;
        this.error = error;
    }
    get isFailure() {
        return !this.isSuccess;
    }
    get statusCode() {
        if (this.isFailure && this.error) {
            return this.error.statusCode || 400;
        }
        return 200;
    }
    static create(isSuccess, key, message, data, paging, error) {
        return new AppResult(isSuccess, key, message, data, paging, error);
    }
    static createSuccess(key, message, data, paging) {
        return new AppResult(true, key, message, data, paging, null);
    }
    static createError(error) {
        console.log(error);
        return new AppResult(false, null, null, null, null, error);
    }
}
exports.AppResult = AppResult;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppPaging = void 0;
class AppPaging {
    constructor(pageSize, pageNumber, firstPage, lastPage, previousPage, nextPage, totalRecords, totalPages, firstItem, lastItem, withPaging) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.firstPage = firstPage;
        this.lastPage = lastPage;
        this.previousPage = previousPage;
        this.nextPage = nextPage;
        this.totalRecords = totalRecords;
        this.totalPages = totalPages;
        this.firstItem = firstItem;
        this.lastItem = lastItem;
        this.withPaging = withPaging;
    }
    static create(pageSize, pageNumber, firstPage, lastPage, previousPage, nextPage, totalRecords, totalPages, firstItem, lastItem, withPaging) {
        return new AppPaging(pageSize, pageNumber, firstPage, lastPage, previousPage, nextPage, totalRecords, totalPages, firstItem, lastItem, withPaging);
    }
    static calc(withPaging, totalRecords, pageSize, pageNumber) {
        const skip = (pageNumber - 1) * pageSize;
        const totalPages = withPaging && pageSize > 0 ?
            Math.ceil(totalRecords / pageSize)
            :
                0;
        const firstPage = totalRecords > 0 ?
            1
            :
                null;
        const lastPage = totalRecords > 0 ?
            totalPages
            :
                null;
        const previousPage = pageNumber > 1 ?
            pageNumber - 1
            :
                null;
        const nextPage = pageNumber < totalPages ?
            pageNumber + 1
            :
                null;
        const firstItem = withPaging && totalRecords > 0 ?
            skip + 1
            :
                null;
        const lastItem = withPaging && totalRecords > 0 ?
            Math.min(pageNumber * pageSize, totalRecords)
            :
                null;
        return AppPaging.create(pageSize, pageNumber, firstPage, lastPage, previousPage, nextPage, totalRecords, totalPages, firstItem, lastItem, withPaging);
    }
}
exports.AppPaging = AppPaging;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createObjectId = createObjectId;
exports.createObjectUserId = createObjectUserId;
exports.createObjectIds = createObjectIds;
exports.createObjectIdAsString = createObjectIdAsString;
exports.fromObjectId = fromObjectId;
exports.fromObjectIds = fromObjectIds;
const mongodb_1 = __webpack_require__(30);
function createObjectId(id) {
    return id === null ?
        null
        :
            new mongodb_1.ObjectId(id);
}
function createObjectUserId(userId) {
    return userId ? new mongodb_1.ObjectId(userId) : null;
}
function createObjectIds(ids = []) {
    return ids
        .map(id => createObjectId(id));
}
function createObjectIdAsString(id) {
    return id === null ?
        fromObjectId(createObjectId())
        :
            id;
}
function fromObjectId(id) {
    return id === null ?
        null
        :
            id.toHexString();
}
function fromObjectIds(ids = []) {
    return ids
        .map(id => id.toHexString());
}


/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nowUtc = nowUtc;
function nowUtc() {
    const now = Date.now();
    const nowDate = new Date(now);
    const nowDateUtcString = nowDate
        .toUTCString();
    const nowDateUtc = new Date(nowDateUtcString);
    return nowDateUtc;
}


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderDirectionEnum = void 0;
var OrderDirectionEnum;
(function (OrderDirectionEnum) {
    OrderDirectionEnum["ASC"] = "asc";
    OrderDirectionEnum["DESC"] = "desc";
})(OrderDirectionEnum || (exports.OrderDirectionEnum = OrderDirectionEnum = {}));


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTokenSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mongodb_1 = __webpack_require__(30);
const schemas_names_1 = __webpack_require__(34);
const base_schema_1 = __webpack_require__(35);
const user_schema_1 = __webpack_require__(36);
let UserTokenSchema = class UserTokenSchema extends base_schema_1.BaseSchema {
};
exports.UserTokenSchema = UserTokenSchema;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        index: true,
    }),
    __metadata("design:type", String)
], UserTokenSchema.prototype, "accessToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        index: true,
    }),
    __metadata("design:type", String)
], UserTokenSchema.prototype, "refreshToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchema.name,
    }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], UserTokenSchema.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserTokenSchema.prototype, "expirationDate", void 0);
exports.UserTokenSchema = UserTokenSchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.userTokens,
        versionKey: false,
        timestamps: false,
    })
], UserTokenSchema);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.schemasNames = void 0;
exports.schemasNames = {
    users: 'users',
    userCodes: 'user-codes',
    userTokens: 'user-tokens',
    categories: 'categories',
    companies: 'companies',
    tenders: 'tenders',
    tenderQuotations: 'tender-quotations',
    medias: 'medias',
    userCompanies: 'user-companies',
    orders: 'orders',
    items: 'items',
    notifications: "notifications",
    transforms: "transforms"
};


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongodb_1 = __webpack_require__(30);
class BaseSchema {
}
exports.BaseSchema = BaseSchema;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], BaseSchema.prototype, "_id", void 0);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const schemas_names_1 = __webpack_require__(34);
const base_with_Info_schema_1 = __webpack_require__(37);
const gender_enum_1 = __webpack_require__(38);
let UserSchema = class UserSchema extends base_with_Info_schema_1.BaseWithInfoSchema {
};
exports.UserSchema = UserSchema;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", String)
], UserSchema.prototype, "nickName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
    }),
    __metadata("design:type", String)
], UserSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        index: true,
    }),
    __metadata("design:type", String)
], UserSchema.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], UserSchema.prototype, "isEmailConfirmed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], UserSchema.prototype, "isPhoneNumberConfirmed", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", String)
], UserSchema.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", String)
], UserSchema.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: gender_enum_1.GenderEnum.MALE,
    }),
    __metadata("design:type", String)
], UserSchema.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "accountType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "region", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "identityType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "identityNo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchema.prototype, "residenceNo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.Date,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserSchema.prototype, "dateOfBirth", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], UserSchema.prototype, "isVerified", void 0);
exports.UserSchema = UserSchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.users,
        versionKey: false,
        timestamps: false,
    })
], UserSchema);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseWithInfoSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const base_schema_1 = __webpack_require__(35);
class BaseWithInfoSchema extends base_schema_1.BaseSchema {
    constructor() {
        super(...arguments);
        this.displayOrder = 0;
        this.isVisible = true;
        this.createdAt = null;
        this.updatedAt = null;
        this.deletedAt = null;
        this.createdBy = null;
        this.updatedBy = null;
        this.deletedBy = null;
    }
}
exports.BaseWithInfoSchema = BaseWithInfoSchema;
__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    __metadata("design:type", Number)
], BaseWithInfoSchema.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], BaseWithInfoSchema.prototype, "isVisible", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseWithInfoSchema.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseWithInfoSchema.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], BaseWithInfoSchema.prototype, "deletedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BaseWithInfoSchema.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BaseWithInfoSchema.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BaseWithInfoSchema.prototype, "deletedBy", void 0);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenderEnum = void 0;
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "Male";
    GenderEnum["FEMALE"] = "Female";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTokenSchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const user_token_1 = __webpack_require__(40);
const mongo_functions_1 = __webpack_require__(29);
let UserTokenSchemaFactory = class UserTokenSchemaFactory {
    create(entity) {
        return {
            _id: (0, mongo_functions_1.createObjectId)(entity._id),
            accessToken: entity.accessToken,
            refreshToken: entity.refreshToken,
            userId: (0, mongo_functions_1.createObjectId)(entity.userId),
            expirationDate: entity.expirationDate,
        };
    }
    createFromSchema(entitySchema) {
        return new user_token_1.UserToken((0, mongo_functions_1.fromObjectId)(entitySchema._id), entitySchema.accessToken, entitySchema.refreshToken, (0, mongo_functions_1.fromObjectId)(entitySchema.userId), entitySchema.expirationDate);
    }
};
exports.UserTokenSchemaFactory = UserTokenSchemaFactory;
exports.UserTokenSchemaFactory = UserTokenSchemaFactory = __decorate([
    (0, common_1.Injectable)()
], UserTokenSchemaFactory);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserToken = void 0;
const cqrs_1 = __webpack_require__(41);
class UserToken extends cqrs_1.AggregateRoot {
    constructor(_id, accessToken, refreshToken, userId, expirationDate) {
        super();
        this._id = _id;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.userId = userId;
        this.expirationDate = expirationDate;
    }
}
exports.UserToken = UserToken;


/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("@nestjs/cqrs");

/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtProviderService = void 0;
const common_1 = __webpack_require__(3);
const jwt_service_1 = __webpack_require__(44);
const users_repository_1 = __webpack_require__(45);
const token_validation_result_1 = __webpack_require__(48);
let JwtProviderService = class JwtProviderService {
    constructor(jwtService, usersRepository) {
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
    }
    async generateAccessToken(userId) {
        const user = await this
            .usersRepository
            .getById(userId);
        const tokenPayload = {
            userId: userId,
            roles: [
                user.role,
            ],
        };
        const accessToken = await this
            .jwtService
            .signAsync(tokenPayload);
        return accessToken;
        ;
    }
    verifyAccessToken(token) {
        try {
            if (token == null) {
                return new token_validation_result_1.TokenValidationResult(false, null);
            }
            const payload = this
                .jwtService
                .verify(token);
            return new token_validation_result_1.TokenValidationResult(true, payload);
        }
        catch (exception) {
            return new token_validation_result_1.TokenValidationResult(false, null);
        }
    }
};
exports.JwtProviderService = JwtProviderService;
exports.JwtProviderService = JwtProviderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_service_1.JwtService !== "undefined" && jwt_service_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _b : Object])
], JwtProviderService);


/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt/dist/jwt.service");

/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersRepository = void 0;
const common_1 = __webpack_require__(3);
const user_schema_1 = __webpack_require__(36);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const user_schema_factory_1 = __webpack_require__(46);
const base_repository_1 = __webpack_require__(26);
let UsersRepository = class UsersRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
    async getByEmail(email) {
        const entity = await this
            .get({
            email: email
        });
        return entity;
    }
    async getByPhoneNumber(phoneNumber) {
        const entity = await this
            .get({
            phoneNumber: phoneNumber
        });
        return entity;
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof user_schema_factory_1.UserSchemaFactory !== "undefined" && user_schema_factory_1.UserSchemaFactory) === "function" ? _b : Object])
], UsersRepository);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const user_1 = __webpack_require__(47);
const mongo_functions_1 = __webpack_require__(29);
let UserSchemaFactory = class UserSchemaFactory {
    create(entity) {
        return {
            _id: (0, mongo_functions_1.createObjectId)(entity._id),
            nickName: entity.nickName,
            email: entity.email,
            phoneNumber: entity.phoneNumber,
            isEmailConfirmed: entity.isEmailConfirmed,
            isPhoneNumberConfirmed: entity.isPhoneNumberConfirmed,
            password: entity.password,
            role: entity.role,
            gender: entity.gender,
            accountType: entity.accountType,
            region: entity.region,
            city: entity.city,
            address: entity.address,
            identityType: entity.identityType,
            identityNo: entity.identityNo,
            residenceNo: entity.residenceNo,
            dateOfBirth: entity.dateOfBirth,
            isVerified: entity.isVerified,
            displayOrder: entity.displayOrder,
            isVisible: entity.isVisible,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
            createdBy: entity.createdBy,
            updatedBy: entity.updatedBy,
            deletedBy: entity.deletedBy,
        };
    }
    createFromSchema(entitySchema) {
        return new user_1.User((0, mongo_functions_1.fromObjectId)(entitySchema._id), entitySchema.nickName, entitySchema.email, entitySchema.phoneNumber, entitySchema.isEmailConfirmed, entitySchema.isPhoneNumberConfirmed, entitySchema.password, entitySchema.role, entitySchema.gender, entitySchema.accountType, entitySchema.region, entitySchema.city, entitySchema.address, entitySchema.identityType, entitySchema.identityNo, entitySchema.residenceNo, entitySchema.dateOfBirth, entitySchema.isVerified, entitySchema.displayOrder, entitySchema.isVisible, entitySchema.createdAt, entitySchema.updatedAt, entitySchema.deletedAt, entitySchema.createdBy, entitySchema.updatedBy, entitySchema.deletedBy);
    }
};
exports.UserSchemaFactory = UserSchemaFactory;
exports.UserSchemaFactory = UserSchemaFactory = __decorate([
    (0, common_1.Injectable)()
], UserSchemaFactory);


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const cqrs_1 = __webpack_require__(41);
const mongo_functions_1 = __webpack_require__(29);
class User extends cqrs_1.AggregateRoot {
    constructor(_id, nickName, email, phoneNumber, isEmailConfirmed, isPhoneNumberConfirmed, password, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth, isVerified = false, displayOrder = 0, isVisible = true, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy) {
        super();
        this._id = _id;
        this.nickName = nickName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.isEmailConfirmed = isEmailConfirmed;
        this.isPhoneNumberConfirmed = isPhoneNumberConfirmed;
        this.password = password;
        this.role = role;
        this.gender = gender;
        this.accountType = accountType;
        this.region = region;
        this.city = city;
        this.address = address;
        this.identityType = identityType;
        this.identityNo = identityNo;
        this.residenceNo = residenceNo;
        this.dateOfBirth = dateOfBirth;
        this.isVerified = isVerified;
        this.displayOrder = displayOrder;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
    static create(id, nickName, email, phoneNumber, password, role, gender = null, accountType = null, region = null, city = null, address = null, identityType = null, identityNo = null, residenceNo = null, dateOfBirth = null, isVerified = false, displayOrder = 0, isVisible = true, createdAt = null, updatedAt = null, deletedAt = null, createdBy = null, updatedBy = null, deletedBy = null) {
        return new User((0, mongo_functions_1.createObjectIdAsString)(id), nickName, email, phoneNumber, false, false, password, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth, isVerified, displayOrder, isVisible, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy);
    }
}
exports.User = User;


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenValidationResult = void 0;
class TokenValidationResult {
    constructor(isValid, payload) {
        this.isValid = isValid;
        this.payload = payload;
    }
}
exports.TokenValidationResult = TokenValidationResult;


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppDateUtilsService = void 0;
const common_1 = __webpack_require__(3);
const date_fns_1 = __webpack_require__(50);
let AppDateUtilsService = class AppDateUtilsService {
    constructor() { }
    getCurrentDateWithDuration(duration) {
        const durationMapping = {
            'd': 'days',
            'h': 'hours',
            'm': 'minutes',
            's': 'seconds'
        };
        const regex = /(\d+)([dhms])/g;
        let currentDate = new Date();
        let match;
        while ((match = regex.exec(duration)) !== null) {
            const value = parseInt(match[1], 10);
            const unit = durationMapping[match[2]];
            currentDate =
                (0, date_fns_1.add)(currentDate, { [unit]: value });
        }
        return currentDate;
    }
};
exports.AppDateUtilsService = AppDateUtilsService;
exports.AppDateUtilsService = AppDateUtilsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppDateUtilsService);


/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),
/* 51 */
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCodeFactory = void 0;
const common_1 = __webpack_require__(3);
const app_configs_service_1 = __webpack_require__(7);
const sent_code_provider_service_1 = __webpack_require__(53);
const user_codes_repository_1 = __webpack_require__(56);
const user_code_1 = __webpack_require__(59);
const app_date_utils_service_1 = __webpack_require__(49);
const mongo_functions_1 = __webpack_require__(29);
let UserCodeFactory = class UserCodeFactory {
    constructor(sentCodeProviderService, appConfigsService, userCodesRepository, appDateUtilsService) {
        this.sentCodeProviderService = sentCodeProviderService;
        this.appConfigsService = appConfigsService;
        this.userCodesRepository = userCodesRepository;
        this.appDateUtilsService = appDateUtilsService;
    }
    async save(sentCodeEnum, sentTo, userId) {
        const codeToSend = await this
            .sentCodeProviderService
            .generateCode(sentCodeEnum);
        const expirationDate = this
            .appDateUtilsService
            .getCurrentDateWithDuration(this.appConfigsService.sentCodeConfig.expiresIn);
        const foundUserCode = await this.userCodesRepository
            .get({
            userId: (0, mongo_functions_1.createObjectId)(userId),
            type: sentCodeEnum.type,
        });
        const userCode = new user_code_1.UserCode((0, mongo_functions_1.createObjectIdAsString)(foundUserCode?._id), codeToSend, sentCodeEnum.type, sentTo, userId, expirationDate);
        if (foundUserCode === null) {
            await this
                .userCodesRepository
                .insert(userCode);
            return userCode;
        }
        await this
            .userCodesRepository
            .getAndReplaceById(foundUserCode._id, userCode);
        return userCode;
    }
};
exports.UserCodeFactory = UserCodeFactory;
exports.UserCodeFactory = UserCodeFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof sent_code_provider_service_1.SentCodeProviderService !== "undefined" && sent_code_provider_service_1.SentCodeProviderService) === "function" ? _a : Object, typeof (_b = typeof app_configs_service_1.AppConfigsService !== "undefined" && app_configs_service_1.AppConfigsService) === "function" ? _b : Object, typeof (_c = typeof user_codes_repository_1.UserCodesRepository !== "undefined" && user_codes_repository_1.UserCodesRepository) === "function" ? _c : Object, typeof (_d = typeof app_date_utils_service_1.AppDateUtilsService !== "undefined" && app_date_utils_service_1.AppDateUtilsService) === "function" ? _d : Object])
], UserCodeFactory);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SentCodeProviderService = void 0;
const common_1 = __webpack_require__(3);
const nanoid_1 = __webpack_require__(54);
const class_validator_1 = __webpack_require__(55);
let SentCodeProviderService = class SentCodeProviderService {
    constructor() { }
    async generateCode(sentCodeEnum) {
        return this
            .customGenerate(sentCodeEnum.alphabet, sentCodeEnum.length);
    }
    obfuscateSentTo(sentTo) {
        const emailCondition = (0, class_validator_1.isEmail)(sentTo);
        if (emailCondition) {
            const email = sentTo;
            const [localPart, domain] = email
                .split('@');
            const slicedLocalPart = localPart
                .slice(0, 2);
            const repeatedLocalPart = '*'
                .repeat(localPart.length - 2);
            return `${slicedLocalPart}${repeatedLocalPart}@${domain}`;
        }
        const phoneNumber = sentTo;
        const slicedStart = phoneNumber
            .slice(0, 2);
        const repeatedRest = '*'
            .repeat(phoneNumber.length - 4);
        const slicedEnd = phoneNumber
            .slice(0, 2);
        return `${slicedStart}${repeatedRest}${slicedEnd}`;
    }
    async customGenerate(alphabet, length) {
        const code = (0, nanoid_1.customAlphabet)(alphabet, length);
        return code();
    }
};
exports.SentCodeProviderService = SentCodeProviderService;
exports.SentCodeProviderService = SentCodeProviderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SentCodeProviderService);


/***/ }),
/* 54 */
/***/ ((module) => {

module.exports = require("nanoid");

/***/ }),
/* 55 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCodesRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const base_repository_1 = __webpack_require__(26);
const user_code_schema_1 = __webpack_require__(57);
const user_code_schema_factory_1 = __webpack_require__(58);
let UserCodesRepository = class UserCodesRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
    async checkIfExists(email, code, type) {
        const entity = await this
            .get({
            sentTo: email,
            code: code,
            type: type,
        });
        return entity;
    }
};
exports.UserCodesRepository = UserCodesRepository;
exports.UserCodesRepository = UserCodesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_code_schema_1.UserCodeSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof user_code_schema_factory_1.UserCodeSchemaFactory !== "undefined" && user_code_schema_factory_1.UserCodeSchemaFactory) === "function" ? _b : Object])
], UserCodesRepository);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCodeSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mongodb_1 = __webpack_require__(30);
const schemas_names_1 = __webpack_require__(34);
const base_schema_1 = __webpack_require__(35);
const user_schema_1 = __webpack_require__(36);
let UserCodeSchema = class UserCodeSchema extends base_schema_1.BaseSchema {
};
exports.UserCodeSchema = UserCodeSchema;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        index: true,
    }),
    __metadata("design:type", String)
], UserCodeSchema.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", String)
], UserCodeSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", String)
], UserCodeSchema.prototype, "sentTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchema.name,
    }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], UserCodeSchema.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserCodeSchema.prototype, "expirationDate", void 0);
exports.UserCodeSchema = UserCodeSchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.userCodes,
        versionKey: false,
        timestamps: false,
    })
], UserCodeSchema);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCodeSchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const user_code_1 = __webpack_require__(59);
const mongo_functions_1 = __webpack_require__(29);
let UserCodeSchemaFactory = class UserCodeSchemaFactory {
    create(entity) {
        return {
            _id: (0, mongo_functions_1.createObjectId)(entity._id),
            code: entity.code,
            type: entity.type,
            sentTo: entity.sentTo,
            userId: (0, mongo_functions_1.createObjectId)(entity.userId),
            expirationDate: entity.expirationDate,
        };
    }
    createFromSchema(entitySchema) {
        return new user_code_1.UserCode((0, mongo_functions_1.fromObjectId)(entitySchema._id), entitySchema.code, entitySchema.type, entitySchema.sentTo, (0, mongo_functions_1.fromObjectId)(entitySchema.userId), entitySchema.expirationDate);
    }
};
exports.UserCodeSchemaFactory = UserCodeSchemaFactory;
exports.UserCodeSchemaFactory = UserCodeSchemaFactory = __decorate([
    (0, common_1.Injectable)()
], UserCodeSchemaFactory);


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCode = void 0;
const cqrs_1 = __webpack_require__(41);
class UserCode extends cqrs_1.AggregateRoot {
    constructor(_id, code, type, sentTo, userId, expirationDate) {
        super();
        this._id = _id;
        this.code = code;
        this.type = type;
        this.sentTo = sentTo;
        this.userId = userId;
        this.expirationDate = expirationDate;
    }
}
exports.UserCode = UserCode;


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppMailService = void 0;
const common_1 = __webpack_require__(3);
const app_configs_service_1 = __webpack_require__(7);
const app_logger_service_1 = __webpack_require__(4);
const mailer_1 = __webpack_require__(61);
let AppMailService = class AppMailService {
    constructor(mailerService, appConfigsService, logger) {
        this.mailerService = mailerService;
        this.appConfigsService = appConfigsService;
        this.logger = logger;
    }
    async send(to, subject, template, context) {
        var isSent = false;
        await this.
            mailerService
            .sendMail({
            from: `"${this.appConfigsService.appConfig.name}" <${this.appConfigsService.mailConfig.sender}>`,
            to: to,
            subject: `${this.appConfigsService.appConfig.name} | ${subject}`,
            template: template,
            context: context,
        })
            .then((sentMessageInfo) => {
            isSent = true;
            this.
                logger
                .log(sentMessageInfo.messageId);
        })
            .catch((error) => {
            this.
                logger
                .error(error, error.stackTrace);
        });
        return isSent;
    }
};
exports.AppMailService = AppMailService;
exports.AppMailService = AppMailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object, typeof (_b = typeof app_configs_service_1.AppConfigsService !== "undefined" && app_configs_service_1.AppConfigsService) === "function" ? _b : Object, typeof (_c = typeof app_logger_service_1.AppLoggerService !== "undefined" && app_logger_service_1.AppLoggerService) === "function" ? _c : Object])
], AppMailService);


/***/ }),
/* 61 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer");

/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SentCodeEnum = void 0;
const app_constants_1 = __webpack_require__(63);
class SentCodeEnum {
    constructor(type, title, alphabet, length) {
        this.type = type;
        this.title = title;
        this.alphabet = alphabet;
        this.length = length;
    }
    static get resetPassword() {
        return new SentCodeEnum('ResetPassword', 'Reset Password', app_constants_1.appConstants.digits + app_constants_1.appConstants.letters, 8);
    }
    static get emailConfirmation() {
        return new SentCodeEnum('EmailConfirmation', 'Email Confirmation', app_constants_1.appConstants.digits, 6);
    }
    static get phoneNumberConfirmation() {
        return new SentCodeEnum('PhoneNumberConfirmation', 'Phone Number Confirmation', app_constants_1.appConstants.digits, 6);
    }
}
exports.SentCodeEnum = SentCodeEnum;


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appConstants = void 0;
exports.appConstants = {
    pageSizes: [15, 25, 50, 75, 100, 500],
    roles: {
        ADMIN: "admin",
        SELLER: "seller",
        BUYER: "buyer",
    },
    defaultPageSize: 25,
    digits: '0123456789',
    letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    authorizationHeader: 'authorization',
    createdAt: 'createdAt',
    updateAt: 'updateAt',
    asc: 'asc',
    desc: 'desc',
};


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    confirm: './confirm',
    resetPassword: './reset-password',
    helpRequest: './help-request.ejs',
};


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.domainUrl = void 0;
exports.domainUrl = "https://www.medex2b.com";
exports["default"] = {
    auth: {
        confirm: `${exports.domainUrl}/auth/confirm?code=`,
        resetPassword: `${exports.domainUrl}/auth/reset-password?code=`,
    },
};


/***/ }),
/* 66 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(41);
const users_controller_1 = __webpack_require__(68);
const users_repository_1 = __webpack_require__(45);
const user_schema_factory_1 = __webpack_require__(46);
const user_factory_1 = __webpack_require__(89);
const users_upsert_handler_1 = __webpack_require__(91);
const users_created_handler_1 = __webpack_require__(96);
const mongoose_1 = __webpack_require__(24);
const user_schema_1 = __webpack_require__(36);
const users_get_all_handler_1 = __webpack_require__(97);
const users_get_handler_1 = __webpack_require__(101);
const users_delete_handler_1 = __webpack_require__(103);
const users_verify_handler_1 = __webpack_require__(104);
const user_update_factory_1 = __webpack_require__(95);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_schema_1.UserSchema.name,
                    schema: mongoose_1.SchemaFactory
                        .createForClass(user_schema_1.UserSchema),
                },
            ]),
        ],
        providers: [
            users_repository_1.UsersRepository,
            user_schema_factory_1.UserSchemaFactory,
            user_factory_1.UserFactory,
            user_update_factory_1.UserUpdateFactory,
            users_upsert_handler_1.UsersUpsertHandler,
            users_verify_handler_1.UsersVerifyHandler,
            users_delete_handler_1.UsersDeleteHandler,
            users_get_handler_1.UsersGetHandler,
            users_get_all_handler_1.UsersGetAllHandler,
            users_created_handler_1.UsersCreatedHandler,
        ],
        controllers: [
            users_controller_1.UsersController,
        ],
        exports: [
            users_repository_1.UsersRepository,
            user_schema_factory_1.UserSchemaFactory,
            user_factory_1.UserFactory,
            user_update_factory_1.UserUpdateFactory,
        ],
    })
], UsersModule);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(69);
const users_upsert_command_1 = __webpack_require__(70);
const cqrs_1 = __webpack_require__(41);
const users_upsert_request_1 = __webpack_require__(71);
const users_get_request_1 = __webpack_require__(75);
const users_get_query_1 = __webpack_require__(76);
const users_get_all_query_1 = __webpack_require__(77);
const users_get_all_request_1 = __webpack_require__(78);
const users_delete_request_1 = __webpack_require__(81);
const users_delete_command_1 = __webpack_require__(82);
const users_verify_request_1 = __webpack_require__(83);
const users_verify_command_1 = __webpack_require__(84);
const roles_guard_1 = __webpack_require__(85);
const roles_decorator_1 = __webpack_require__(86);
const role_enum_1 = __webpack_require__(74);
const app_response_1 = __webpack_require__(87);
let UsersController = class UsersController {
    constructor(queryBus, commandBus) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    async upsert(usersUpsertRequest) {
        const command = new users_upsert_command_1.UsersUpsertCommand(usersUpsertRequest.id, usersUpsertRequest.nickName, usersUpsertRequest.email, usersUpsertRequest.phoneNumber, usersUpsertRequest.role, usersUpsertRequest.gender, usersUpsertRequest.accountType, usersUpsertRequest.region, usersUpsertRequest.city, usersUpsertRequest.address, usersUpsertRequest.identityType, usersUpsertRequest.identityNo, usersUpsertRequest.residenceNo, usersUpsertRequest.dateOfBirth);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async verify(usersVerifyRequest) {
        const command = new users_verify_command_1.UsersVerifyCommand(usersVerifyRequest.id, usersVerifyRequest.isVerified);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, null, null, result.error);
        return response;
    }
    async delete(usersDeleteRequest) {
        const command = new users_delete_command_1.UsersDeleteCommand(usersDeleteRequest.id);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, null, null, result.error);
        return response;
    }
    async get(usersGetRequest, req) {
        console.log(usersGetRequest);
        const { userId, roles } = req.user;
        const isAdmin = roles.includes(role_enum_1.RoleEnum.ADMIN);
        if (!isAdmin && userId != usersGetRequest.id) {
            throw new common_1.ForbiddenException();
        }
        const query = new users_get_query_1.UsersGetQuery(usersGetRequest.id);
        const result = await this.queryBus.execute(query);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async getAll(usersGetAllRequest) {
        const query = new users_get_all_query_1.UsersGetAllQuery(usersGetAllRequest.pageSize, usersGetAllRequest.pageNumber, usersGetAllRequest.withPaging, usersGetAllRequest.search, usersGetAllRequest.role);
        const result = await this.queryBus.execute(query);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    (0, common_1.Post)("upsert"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof users_upsert_request_1.UsersUpsertRequest !== "undefined" && users_upsert_request_1.UsersUpsertRequest) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersController.prototype, "upsert", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    (0, common_1.Post)("verify"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof users_verify_request_1.UsersVerifyRequest !== "undefined" && users_verify_request_1.UsersVerifyRequest) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UsersController.prototype, "verify", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    (0, common_1.Delete)("delete"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof users_delete_request_1.UsersDeleteRequest !== "undefined" && users_delete_request_1.UsersDeleteRequest) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UsersController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("get"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof users_get_request_1.UsersGetRequest !== "undefined" && users_get_request_1.UsersGetRequest) === "function" ? _j : Object, Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UsersController.prototype, "get", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    (0, common_1.Get)("getAll"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof users_get_all_request_1.UsersGetAllRequest !== "undefined" && users_get_all_request_1.UsersGetAllRequest) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], UsersController.prototype, "getAll", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({
        path: "web/users",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object])
], UsersController);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(66);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersUpsertCommand = void 0;
class UsersUpsertCommand {
    constructor(id, nickName, email, phoneNumber, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth) {
        this.id = id;
        this.nickName = nickName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.gender = gender;
        this.accountType = accountType;
        this.region = region;
        this.city = city;
        this.address = address;
        this.identityType = identityType;
        this.identityNo = identityNo;
        this.residenceNo = residenceNo;
        this.dateOfBirth = dateOfBirth;
    }
}
exports.UsersUpsertCommand = UsersUpsertCommand;


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersUpsertRequest = void 0;
const class_validator_1 = __webpack_require__(55);
const class_transformer_1 = __webpack_require__(72);
const gender_enum_1 = __webpack_require__(38);
const account_type_enum_1 = __webpack_require__(73);
const role_enum_1 = __webpack_require__(74);
class UsersUpsertRequest {
}
exports.UsersUpsertRequest = UsersUpsertRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "nickName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(role_enum_1.RoleEnum),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(gender_enum_1.GenderEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(account_type_enum_1.AccountTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "accountType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "region", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "identityType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "identityNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UsersUpsertRequest.prototype, "residenceNo", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UsersUpsertRequest.prototype, "dateOfBirth", void 0);


/***/ }),
/* 72 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountTypeEnum = void 0;
var AccountTypeEnum;
(function (AccountTypeEnum) {
    AccountTypeEnum["INDIVIDUAL"] = "Individual";
    AccountTypeEnum["ESTABLISHMENT"] = "Establishment";
})(AccountTypeEnum || (exports.AccountTypeEnum = AccountTypeEnum = {}));


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["ADMIN"] = "Admin";
    RoleEnum["CLIENT"] = "Client";
    RoleEnum["SELLER"] = "Seller";
    RoleEnum["BUYER"] = "Buyer";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersGetRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class UsersGetRequest {
}
exports.UsersGetRequest = UsersGetRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UsersGetRequest.prototype, "id", void 0);


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersGetQuery = void 0;
class UsersGetQuery {
    constructor(id) {
        this.id = id;
    }
}
exports.UsersGetQuery = UsersGetQuery;


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersGetAllQuery = void 0;
class UsersGetAllQuery {
    constructor(pageSize, pageNumber, withPaging, search, role) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.withPaging = withPaging;
        this.search = search;
        this.role = role;
    }
}
exports.UsersGetAllQuery = UsersGetAllQuery;


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersGetAllRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const app_paging_request_1 = __webpack_require__(79);
const app_transforms_1 = __webpack_require__(80);
class UsersGetAllRequest extends app_paging_request_1.AppPagingRequest {
    constructor() {
        super(...arguments);
        this.search = null;
        this.role = null;
    }
}
exports.UsersGetAllRequest = UsersGetAllRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], UsersGetAllRequest.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], UsersGetAllRequest.prototype, "role", void 0);


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppPagingRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const app_transforms_1 = __webpack_require__(80);
class AppPagingRequest {
}
exports.AppPagingRequest = AppPagingRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.intTransform),
    __metadata("design:type", Number)
], AppPagingRequest.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.intTransform),
    __metadata("design:type", Number)
], AppPagingRequest.prototype, "pageNumber", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.booleanTransform),
    __metadata("design:type", Boolean)
], AppPagingRequest.prototype, "withPaging", void 0);


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    stringTransform({ value, }) {
        return value === '' || value === null || value === undefined ? null : value;
    },
    booleanTransform({ value, }) {
        return value === 'true';
    },
    intTransform({ value, }) {
        return parseInt(value);
    },
    stringCommasSeparatedTransform({ value, }) {
        return value === '' || value === null || value === undefined ?
            null
            :
                value
                    .split(',')
                    .map(id => id.trim());
    },
};


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersDeleteRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class UsersDeleteRequest {
}
exports.UsersDeleteRequest = UsersDeleteRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UsersDeleteRequest.prototype, "id", void 0);


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersDeleteCommand = void 0;
class UsersDeleteCommand {
    constructor(id) {
        this.id = id;
    }
}
exports.UsersDeleteCommand = UsersDeleteCommand;


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersVerifyRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class UsersVerifyRequest {
}
exports.UsersVerifyRequest = UsersVerifyRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersVerifyRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UsersVerifyRequest.prototype, "isVerified", void 0);


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersVerifyCommand = void 0;
class UsersVerifyCommand {
    constructor(id, isVerified) {
        this.id = id;
        this.isVerified = isVerified;
    }
}
exports.UsersVerifyCommand = UsersVerifyCommand;


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const roles_decorator_1 = __webpack_require__(86);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        console.log("requiredRoles", context);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user?.roles?.includes(role));
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppResponse = void 0;
const app_messages_keys_1 = __webpack_require__(88);
class AppResponse {
    constructor(isSuccess, key, message, data, paging) {
        this.isSuccess = isSuccess;
        this.key = key;
        this.message = message;
        this.data = data;
        this.paging = paging;
    }
    static create(isSuccess, key, message, data, paging, error) {
        const processedKey = AppResponse.getKey(key, error);
        const processedMessage = AppResponse.getMessage(message, error);
        return new AppResponse(isSuccess, processedKey ?? null, processedMessage ?? null, data, paging);
    }
    static getKey(key, error) {
        var isKeyEmpty = key == null || key == "";
        if (!isKeyEmpty) {
            return key;
        }
        var hasError = error != null;
        if (!hasError) {
            return app_messages_keys_1.appMessagesKeys.operationSucceeded;
        }
        return error.code;
    }
    static getMessage(message, error) {
        var isMessageEmpty = message == null || message == "";
        if (!isMessageEmpty) {
            return message;
        }
        var hasError = error != null;
        if (!hasError) {
            return app_messages_keys_1.appMessagesKeys.operationSucceeded;
        }
        return error?.message;
    }
}
exports.AppResponse = AppResponse;


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appMessagesKeys = void 0;
exports.appMessagesKeys = {
    operationSucceeded: 'OperationSucceeded',
    operationFailed: 'Error.OperationFailed',
    nullValue: 'Error.NullValue',
    notRelateToYourAccount: 'Error.NotRelateToYourAccount',
    emailNotExist: 'Error.EmailNotExist',
    phoneNumberNotExist: 'Error.PhoneNumberNotExist',
    emailNotConfirmed: 'Error.EmailNotConfirmed',
    phoneNotConfirmed: 'Error.PhoneNotConfirmed',
    accountIsLocked: 'Error.AccountIsLocked',
    accountIsLockedPermanently: 'Error.AccountIsLockedPermanently',
    passwordIncorrect: 'Error.PasswordIncorrect',
    login2FAInvalid: 'Error.Login2FAInvalid',
    invalidCode: 'Error.InvalidCode',
    emailTaken: 'Error.EmailTaken',
    phoneNumberTaken: 'Error.PhoneNumberTaken',
    codeIsEmpty: 'Error.CodeIsEmpty',
    phoneAlreadyConfirmed: 'Error.PhoneAlreadyConfirmed',
    emailAlreadyConfirmed: 'Error.EmailAlreadyConfirmed',
    reset2FAGenerateFailed: 'Error.Reset2FAGenerateFailed',
    deviceIdNotSame: 'Error.DeviceIdNotSame',
    alternativeDeviceIdEmpty: 'Error.AlternativeDeviceIdEmpty',
    accountRestricted: 'Error.AccountRestricted',
    invalidToken: 'Error.InvalidToken',
    invalidRefreshToken: 'Error.InvalidRefreshToken',
    codeExpired: 'Error.CodeExpired',
    refreshTokenExpired: 'Error.RefreshTokenExpired',
    accessTokenNotExpired: 'Error.AccessTokenNotExpired',
    userNotLoggedIn: 'Error.UserNotLoggedIn',
    securityError: 'Error.SecurityError',
    userNotFound: 'Error.UserNotFound',
    errorWhileSendingEmail: 'Error.ErrorWileSendingEmail',
    userTokenNotFoundToLogout: 'Error.UserTokenNotFoundToLogout',
    userAlreadyLoggedOut: 'Error.UserAlreadyLoggedOut',
    duplicateRegistrationNumber: 'Error.DuplicateRegistrationNumber',
    acceptQuotationMustHasQuotationId: 'Error.AcceptQuotationMustHasQuotationId',
    invalidStock: "Error.invalidStock",
    invalidType: "Error.invalidType",
    notFound: "Error.notFound",
    requiredField: "Error.requiredField",
    invalidStockOperation: "Error.invalidStockOperation"
};


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserFactory = void 0;
const common_1 = __webpack_require__(3);
const user_1 = __webpack_require__(47);
const users_repository_1 = __webpack_require__(45);
const users_created_event_1 = __webpack_require__(90);
const bcrypt = __webpack_require__(51);
const mongo_functions_1 = __webpack_require__(29);
let UserFactory = class UserFactory {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async save(id, nickName, email, phoneNumber, password, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth) {
        const isInsert = id === null || id === undefined;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        if (isInsert) {
            const entity = user_1.User.create((0, mongo_functions_1.createObjectIdAsString)(id), nickName, email, phoneNumber, hashedPassword, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth);
            await this.usersRepository.insert(entity);
            entity.apply(new users_created_event_1.UsersCreatedEvent(entity._id));
            return entity;
        }
        const foundEntity = await this.usersRepository.getById(id);
        if (foundEntity == null) {
            return null;
        }
        foundEntity.nickName = nickName;
        foundEntity.phoneNumber = phoneNumber;
        foundEntity.role = role;
        foundEntity.gender = gender;
        foundEntity.accountType = accountType;
        foundEntity.region = region;
        foundEntity.city = city;
        foundEntity.address = address;
        foundEntity.identityType = identityType;
        foundEntity.identityNo = identityNo;
        foundEntity.residenceNo = residenceNo;
        foundEntity.dateOfBirth = dateOfBirth;
        const updatedEntity = await this.usersRepository.getAndUpdate({
            _id: (0, mongo_functions_1.createObjectId)(id),
        }, foundEntity);
        return updatedEntity;
    }
};
exports.UserFactory = UserFactory;
exports.UserFactory = UserFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], UserFactory);


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersCreatedEvent = void 0;
class UsersCreatedEvent {
    constructor(id) {
        this.id = id;
    }
}
exports.UsersCreatedEvent = UsersCreatedEvent;


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersUpsertHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const users_upsert_command_1 = __webpack_require__(70);
const users_repository_1 = __webpack_require__(45);
const app_result_1 = __webpack_require__(27);
const users_error_1 = __webpack_require__(92);
const users_get_result_1 = __webpack_require__(94);
const user_update_factory_1 = __webpack_require__(95);
let UsersUpsertHandler = class UsersUpsertHandler {
    constructor(usersRepository, userFactory, eventPublisher) {
        this.usersRepository = usersRepository;
        this.userFactory = userFactory;
        this.eventPublisher = eventPublisher;
    }
    async execute(command) {
        const foundEntity = await this.usersRepository.getById(command.id);
        if (!foundEntity) {
            throw app_result_1.AppResult.createError(users_error_1.UsersError.userNotFound);
        }
        const updatedEntity = await this.userFactory.save(command.id, command.nickName, command.phoneNumber, command.gender, command.accountType, command.region, command.city, command.address, command.identityType, command.identityNo, command.residenceNo, command.dateOfBirth);
        const resultData = users_get_result_1.UsersGetResult.create(updatedEntity._id, updatedEntity.nickName, updatedEntity.email, updatedEntity.phoneNumber, updatedEntity.isEmailConfirmed, updatedEntity.isPhoneNumberConfirmed, updatedEntity.role, updatedEntity.gender, updatedEntity.accountType, updatedEntity.region, updatedEntity.city, updatedEntity.address, updatedEntity.identityType, updatedEntity.identityNo, updatedEntity.residenceNo, updatedEntity.dateOfBirth, updatedEntity.isVerified);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.UsersUpsertHandler = UsersUpsertHandler;
exports.UsersUpsertHandler = UsersUpsertHandler = __decorate([
    (0, cqrs_1.CommandHandler)(users_upsert_command_1.UsersUpsertCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof user_update_factory_1.UserUpdateFactory !== "undefined" && user_update_factory_1.UserUpdateFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object])
], UsersUpsertHandler);


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersError = void 0;
const app_messages_keys_1 = __webpack_require__(88);
const app_error_1 = __webpack_require__(93);
class UsersError extends app_error_1.AppError {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.message = message;
    }
}
exports.UsersError = UsersError;
UsersError.emailTaken = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.emailTaken, 'Email already taken');
UsersError.phoneNumberTaken = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.phoneNumberTaken, 'PhoneNumber already taken');
UsersError.userNotFound = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.userNotFound, 'User not found', 404);


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppError = void 0;
class AppError {
    constructor(code, message, statusCode = 400) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersGetResult = void 0;
class UsersGetResult {
    constructor(id, nickName, email, phoneNumber, isEmailConfirmed, isPhoneNumberConfirmed, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth, isVerified) {
        this.id = id;
        this.nickName = nickName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.isEmailConfirmed = isEmailConfirmed;
        this.isPhoneNumberConfirmed = isPhoneNumberConfirmed;
        this.role = role;
        this.gender = gender;
        this.accountType = accountType;
        this.region = region;
        this.city = city;
        this.address = address;
        this.identityType = identityType;
        this.identityNo = identityNo;
        this.residenceNo = residenceNo;
        this.dateOfBirth = dateOfBirth;
        this.isVerified = isVerified;
    }
    static create(id, nickName, email, phoneNumber, isEmailConfirmed, isPhoneNumberConfirmed, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth, isVerified) {
        return new UsersGetResult(id, nickName, email, phoneNumber, isEmailConfirmed, isPhoneNumberConfirmed, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth, isVerified);
    }
}
exports.UsersGetResult = UsersGetResult;


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserUpdateFactory = void 0;
const common_1 = __webpack_require__(3);
const users_repository_1 = __webpack_require__(45);
const mongo_functions_1 = __webpack_require__(29);
let UserUpdateFactory = class UserUpdateFactory {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async save(id, nickName, phoneNumber, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth) {
        const foundEntity = await this.usersRepository.getById(id);
        if (!foundEntity) {
            return null;
        }
        foundEntity.nickName = nickName;
        foundEntity.phoneNumber = phoneNumber;
        foundEntity.gender = gender;
        foundEntity.accountType = accountType;
        foundEntity.region = region;
        foundEntity.city = city;
        foundEntity.address = address;
        if (!foundEntity.isVerified) {
            foundEntity.identityType = identityType;
            foundEntity.identityNo = identityNo;
            foundEntity.residenceNo = residenceNo;
        }
        foundEntity.dateOfBirth = dateOfBirth;
        const updatedEntity = await this.usersRepository.getAndUpdate({ _id: (0, mongo_functions_1.createObjectId)(id) }, foundEntity);
        return updatedEntity;
    }
};
exports.UserUpdateFactory = UserUpdateFactory;
exports.UserUpdateFactory = UserUpdateFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], UserUpdateFactory);


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersCreatedHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const users_created_event_1 = __webpack_require__(90);
let UsersCreatedHandler = class UsersCreatedHandler {
    async handle(event) {
        console.log("User Created:", event.id);
    }
};
exports.UsersCreatedHandler = UsersCreatedHandler;
exports.UsersCreatedHandler = UsersCreatedHandler = __decorate([
    (0, cqrs_1.EventsHandler)(users_created_event_1.UsersCreatedEvent)
], UsersCreatedHandler);


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersGetAllHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const users_repository_1 = __webpack_require__(45);
const app_result_1 = __webpack_require__(27);
const users_get_all_query_1 = __webpack_require__(77);
const users_get_all_result_1 = __webpack_require__(98);
const reg_ex_functions_1 = __webpack_require__(99);
const order_direction_enum_1 = __webpack_require__(32);
const order_by_enum_1 = __webpack_require__(100);
let UsersGetAllHandler = class UsersGetAllHandler {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(query) {
        const filter = {};
        if (query.search !== null) {
            filter.$or = [
                {
                    nickName: (0, reg_ex_functions_1.searchRegEx)(query.search),
                    email: (0, reg_ex_functions_1.searchRegEx)(query.search),
                    phoneNumber: (0, reg_ex_functions_1.searchRegEx)(query.search),
                },
            ];
        }
        if (query.role != null && query.role !== 'null') {
            filter.role = query.role;
        }
        const result = await this
            .usersRepository
            .getAllAsResult(filter, {}, null, query.pageSize, query.pageNumber, query.withPaging, [
            {
                field: order_by_enum_1.OrderByEnum.NICK_NAME,
                direction: order_direction_enum_1.OrderDirectionEnum.ASC,
            },
        ]);
        const entitiesResults = result
            .data
            .map((element) => {
            return users_get_all_result_1.UsersGetAllResult
                .create(element._id, element.nickName, element.email, element.phoneNumber, element.role, element.gender, element.isVerified);
        });
        return app_result_1.AppResult
            .createSuccess(null, null, entitiesResults, result.paging);
    }
};
exports.UsersGetAllHandler = UsersGetAllHandler;
exports.UsersGetAllHandler = UsersGetAllHandler = __decorate([
    (0, cqrs_1.QueryHandler)(users_get_all_query_1.UsersGetAllQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], UsersGetAllHandler);


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersGetAllResult = void 0;
class UsersGetAllResult {
    constructor(id, nickName, email, phoneNumber, role, gender, isVerified) {
        this.id = id;
        this.nickName = nickName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.gender = gender;
        this.isVerified = isVerified;
    }
    static create(id, nickName, email, phoneNumber, role, gender, isVerified) {
        return new UsersGetAllResult(id, nickName, email, phoneNumber, role, gender, isVerified);
    }
}
exports.UsersGetAllResult = UsersGetAllResult;


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.searchRegEx = searchRegEx;
function searchRegEx(search) {
    return new RegExp(search, 'i');
}


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderByEnum = void 0;
var OrderByEnum;
(function (OrderByEnum) {
    OrderByEnum["NICK_NAME"] = "nickName";
    OrderByEnum["TITLE"] = "title";
    OrderByEnum["NAME"] = "name";
    OrderByEnum["VALUE"] = "value";
    OrderByEnum["CREATED_AT"] = "createdAt";
    OrderByEnum["UPDATED_AT"] = "updatedAt";
})(OrderByEnum || (exports.OrderByEnum = OrderByEnum = {}));


/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersGetHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const users_repository_1 = __webpack_require__(45);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const users_get_query_1 = __webpack_require__(76);
const users_get_result_1 = __webpack_require__(94);
let UsersGetHandler = class UsersGetHandler {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(query) {
        const entity = await this
            .usersRepository
            .getById(query.id);
        if (entity === null) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors
                .nullValue('object'));
        }
        const resultData = users_get_result_1.UsersGetResult
            .create(entity._id, entity.nickName, entity.email, entity.phoneNumber, entity.isEmailConfirmed, entity.isPhoneNumberConfirmed, entity.role, entity.gender, entity.accountType, entity.region, entity.city, entity.address, entity.identityType, entity.identityNo, entity.residenceNo, entity.dateOfBirth, entity.isVerified);
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.UsersGetHandler = UsersGetHandler;
exports.UsersGetHandler = UsersGetHandler = __decorate([
    (0, cqrs_1.QueryHandler)(users_get_query_1.UsersGetQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], UsersGetHandler);


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppErrors = void 0;
const app_messages_keys_1 = __webpack_require__(88);
const app_error_1 = __webpack_require__(93);
class AppErrors extends app_error_1.AppError {
    constructor(code, message, statusCode = 400) {
        super(code, message, statusCode);
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
    static operationFailed() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.operationFailed, "Operation failed", 400);
    }
    static nullValue(field) {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.nullValue, `${field} is null`, 404);
    }
    static notRelateToYourAccount() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.notRelateToYourAccount, `Not related to your account`, 403);
    }
}
exports.AppErrors = AppErrors;


/***/ }),
/* 103 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersDeleteHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const users_delete_command_1 = __webpack_require__(82);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const users_repository_1 = __webpack_require__(45);
let UsersDeleteHandler = class UsersDeleteHandler {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(command) {
        const isDeleted = await this.usersRepository.deleteById(command.id);
        if (!isDeleted) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.operationFailed());
        }
        return app_result_1.AppResult.createSuccess(null, null, null);
    }
};
exports.UsersDeleteHandler = UsersDeleteHandler;
exports.UsersDeleteHandler = UsersDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(users_delete_command_1.UsersDeleteCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], UsersDeleteHandler);


/***/ }),
/* 104 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersVerifyHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const users_verify_command_1 = __webpack_require__(84);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const users_repository_1 = __webpack_require__(45);
const mongo_functions_1 = __webpack_require__(29);
let UsersVerifyHandler = class UsersVerifyHandler {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(command) {
        const entity = await this.usersRepository.getById(command.id);
        if (entity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("object"));
        }
        entity.isVerified = command.isVerified;
        const updatedEntity = await this.usersRepository.getAndUpdate({
            _id: (0, mongo_functions_1.createObjectId)(command.id),
        }, entity);
        return app_result_1.AppResult.createSuccess(null, null, null);
    }
};
exports.UsersVerifyHandler = UsersVerifyHandler;
exports.UsersVerifyHandler = UsersVerifyHandler = __decorate([
    (0, cqrs_1.CommandHandler)(users_verify_command_1.UsersVerifyCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], UsersVerifyHandler);


/***/ }),
/* 105 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt/dist/jwt.module");

/***/ }),
/* 106 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthStrategy = void 0;
const passport_jwt_1 = __webpack_require__(107);
const passport_1 = __webpack_require__(66);
const common_1 = __webpack_require__(3);
const app_configs_service_1 = __webpack_require__(7);
const user_tokens_repository_1 = __webpack_require__(23);
let JwtAuthStrategy = class JwtAuthStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userTokensRepository, appConfigsService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfigsService.jwtConfig.secret,
        });
        this.userTokensRepository = userTokensRepository;
        this.appConfigsService = appConfigsService;
    }
    async validate(payload) {
        console.log("payload", payload);
        const { userId, roles } = payload;
        const userToken = await this.userTokensRepository.getByUserId(userId);
        console.log("userToken", userToken);
        if (userToken === null) {
            return null;
        }
        return payload;
    }
};
exports.JwtAuthStrategy = JwtAuthStrategy;
exports.JwtAuthStrategy = JwtAuthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_tokens_repository_1.UserTokensRepository !== "undefined" && user_tokens_repository_1.UserTokensRepository) === "function" ? _a : Object, typeof (_b = typeof app_configs_service_1.AppConfigsService !== "undefined" && app_configs_service_1.AppConfigsService) === "function" ? _b : Object])
], JwtAuthStrategy);


/***/ }),
/* 107 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 108 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(20);
const auth_login_request_1 = __webpack_require__(109);
const auth_register_request_1 = __webpack_require__(110);
const auth_register_command_1 = __webpack_require__(111);
const cqrs_1 = __webpack_require__(41);
const auth_refresh_request_1 = __webpack_require__(112);
const auth_login_command_1 = __webpack_require__(113);
const auth_refresh_command_1 = __webpack_require__(114);
const auth_forgot_password_request_1 = __webpack_require__(115);
const auth_forgot_password_command_1 = __webpack_require__(116);
const auth_reset_password_request_1 = __webpack_require__(117);
const auth_reset_password_command_1 = __webpack_require__(118);
const auth_resend_confirm_code_request_1 = __webpack_require__(119);
const auth_resend_confirm_code_command_1 = __webpack_require__(120);
const auth_confirm_request_1 = __webpack_require__(121);
const auth_confirm_command_1 = __webpack_require__(122);
const app_response_1 = __webpack_require__(87);
const jwt_auth_guard_1 = __webpack_require__(69);
const auth_get_me_command_1 = __webpack_require__(123);
const auth_update_request_1 = __webpack_require__(124);
const auth_update_command_1 = __webpack_require__(126);
let AuthController = class AuthController {
    constructor(authService, commandBus) {
        this.authService = authService;
        this.commandBus = commandBus;
    }
    async register(authRegisterRequest) {
        const command = new auth_register_command_1.AuthRegisterCommand(authRegisterRequest.nickName, authRegisterRequest.email, authRegisterRequest.password, authRegisterRequest.role);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
    async login(authLoginRequest) {
        const command = new auth_login_command_1.AuthLoginCommand(authLoginRequest.email, authLoginRequest.password);
        const result = await this.commandBus.execute(command);
        console.log("result", result);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
    async upsert(usersUpsertRequest) {
        const command = new auth_update_command_1.AuthsUpsertCommand(usersUpsertRequest.id, usersUpsertRequest.nickName, usersUpsertRequest.email, String(usersUpsertRequest.phoneNumber), usersUpsertRequest.role, usersUpsertRequest.gender, usersUpsertRequest.accountType, usersUpsertRequest.region, usersUpsertRequest.city, usersUpsertRequest.address, usersUpsertRequest.identityType, usersUpsertRequest.identityNo, usersUpsertRequest.residenceNo, usersUpsertRequest.dateOfBirth);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async getMe(req) {
        console.log(req.user);
        const { userId } = req.user;
        const command = new auth_get_me_command_1.GetMeCommand(userId);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
    async refresh(authRefreshRequest) {
        const command = new auth_refresh_command_1.AuthRefreshCommand(authRefreshRequest.refreshToken);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
    async confirm(authConfirmRequest) {
        const command = new auth_confirm_command_1.AuthConfirmCommand(authConfirmRequest.email, authConfirmRequest.code);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
    async resendConfirmCode(authResendConfirmCodeRequest) {
        const command = new auth_resend_confirm_code_command_1.AuthResendConfirmCodeCommand(authResendConfirmCodeRequest.email);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
    async forgotPassword(authForgotPasswordRequest) {
        const command = new auth_forgot_password_command_1.AuthForgotPasswordCommand(authForgotPasswordRequest.email);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
    async resetPassword(authResetPasswordRequest) {
        const command = new auth_reset_password_command_1.AuthResetPasswordCommand(authResetPasswordRequest.email, authResetPasswordRequest.code, authResetPasswordRequest.newPassword);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof auth_register_request_1.AuthRegisterRequest !== "undefined" && auth_register_request_1.AuthRegisterRequest) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof auth_login_request_1.AuthLoginRequest !== "undefined" && auth_login_request_1.AuthLoginRequest) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("upsert"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof auth_update_request_1.AuthsUpsertRequest !== "undefined" && auth_update_request_1.AuthsUpsertRequest) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthController.prototype, "upsert", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("me"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, common_1.Post)("refresh"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof auth_refresh_request_1.AuthRefreshRequest !== "undefined" && auth_refresh_request_1.AuthRefreshRequest) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)("confirm"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof auth_confirm_request_1.AuthConfirmRequest !== "undefined" && auth_confirm_request_1.AuthConfirmRequest) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], AuthController.prototype, "confirm", null);
__decorate([
    (0, common_1.Post)("resendConfirmCode"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof auth_resend_confirm_code_request_1.AuthResendConfirmCodeRequest !== "undefined" && auth_resend_confirm_code_request_1.AuthResendConfirmCodeRequest) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], AuthController.prototype, "resendConfirmCode", null);
__decorate([
    (0, common_1.Post)("forgotPassword"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof auth_forgot_password_request_1.AuthForgotPasswordRequest !== "undefined" && auth_forgot_password_request_1.AuthForgotPasswordRequest) === "function" ? _r : Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)("resetPassword"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof auth_reset_password_request_1.AuthResetPasswordRequest !== "undefined" && auth_reset_password_request_1.AuthResetPasswordRequest) === "function" ? _t : Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)({
        path: "web/auth",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object])
], AuthController);


/***/ }),
/* 109 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthLoginRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class AuthLoginRequest {
}
exports.AuthLoginRequest = AuthLoginRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthLoginRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthLoginRequest.prototype, "password", void 0);


/***/ }),
/* 110 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRegisterRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class AuthRegisterRequest {
}
exports.AuthRegisterRequest = AuthRegisterRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterRequest.prototype, "nickName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthRegisterRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
    __metadata("design:type", String)
], AuthRegisterRequest.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterRequest.prototype, "role", void 0);


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRegisterCommand = void 0;
class AuthRegisterCommand {
    constructor(nickName, email, password, role) {
        this.nickName = nickName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
exports.AuthRegisterCommand = AuthRegisterCommand;


/***/ }),
/* 112 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRefreshRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class AuthRefreshRequest {
}
exports.AuthRefreshRequest = AuthRefreshRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRefreshRequest.prototype, "refreshToken", void 0);


/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthLoginCommand = void 0;
class AuthLoginCommand {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
exports.AuthLoginCommand = AuthLoginCommand;


/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRefreshCommand = void 0;
class AuthRefreshCommand {
    constructor(refreshToken) {
        this.refreshToken = refreshToken;
    }
}
exports.AuthRefreshCommand = AuthRefreshCommand;


/***/ }),
/* 115 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthForgotPasswordRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class AuthForgotPasswordRequest {
}
exports.AuthForgotPasswordRequest = AuthForgotPasswordRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthForgotPasswordRequest.prototype, "email", void 0);


/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthForgotPasswordCommand = void 0;
class AuthForgotPasswordCommand {
    constructor(email) {
        this.email = email;
    }
}
exports.AuthForgotPasswordCommand = AuthForgotPasswordCommand;


/***/ }),
/* 117 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResetPasswordRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class AuthResetPasswordRequest {
}
exports.AuthResetPasswordRequest = AuthResetPasswordRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthResetPasswordRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthResetPasswordRequest.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
    __metadata("design:type", String)
], AuthResetPasswordRequest.prototype, "newPassword", void 0);


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResetPasswordCommand = void 0;
class AuthResetPasswordCommand {
    constructor(email, code, newPassword) {
        this.email = email;
        this.code = code;
        this.newPassword = newPassword;
    }
}
exports.AuthResetPasswordCommand = AuthResetPasswordCommand;


/***/ }),
/* 119 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResendConfirmCodeRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class AuthResendConfirmCodeRequest {
}
exports.AuthResendConfirmCodeRequest = AuthResendConfirmCodeRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthResendConfirmCodeRequest.prototype, "email", void 0);


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResendConfirmCodeCommand = void 0;
class AuthResendConfirmCodeCommand {
    constructor(email) {
        this.email = email;
    }
}
exports.AuthResendConfirmCodeCommand = AuthResendConfirmCodeCommand;


/***/ }),
/* 121 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthConfirmRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class AuthConfirmRequest {
}
exports.AuthConfirmRequest = AuthConfirmRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthConfirmRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthConfirmRequest.prototype, "code", void 0);


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthConfirmCommand = void 0;
class AuthConfirmCommand {
    constructor(email, code) {
        this.email = email;
        this.code = code;
    }
}
exports.AuthConfirmCommand = AuthConfirmCommand;


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetMeCommand = void 0;
class GetMeCommand {
    constructor(id) {
        this.id = id;
    }
}
exports.GetMeCommand = GetMeCommand;


/***/ }),
/* 124 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthsUpsertRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const gender_enum_1 = __webpack_require__(38);
const account_type_enum_1 = __webpack_require__(73);
const role_enum_1 = __webpack_require__(74);
const identityTypeEnum_1 = __webpack_require__(125);
class AuthsUpsertRequest {
}
exports.AuthsUpsertRequest = AuthsUpsertRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "nickName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(role_enum_1.RoleEnum),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(gender_enum_1.GenderEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(account_type_enum_1.AccountTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "accountType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(identityTypeEnum_1.identityTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "identityType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "region", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "identityNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthsUpsertRequest.prototype, "residenceNo", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AuthsUpsertRequest.prototype, "dateOfBirth", void 0);


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.identityTypeEnum = void 0;
var identityTypeEnum;
(function (identityTypeEnum) {
    identityTypeEnum["CITIZEN"] = "Citizen";
    identityTypeEnum["RESIDENT"] = "Resident";
})(identityTypeEnum || (exports.identityTypeEnum = identityTypeEnum = {}));


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthsUpsertCommand = void 0;
class AuthsUpsertCommand {
    constructor(id, nickName, email, phoneNumber, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth) {
        this.id = id;
        this.nickName = nickName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.gender = gender;
        this.accountType = accountType;
        this.region = region;
        this.city = city;
        this.address = address;
        this.identityType = identityType;
        this.identityNo = identityNo;
        this.residenceNo = residenceNo;
        this.dateOfBirth = dateOfBirth;
    }
}
exports.AuthsUpsertCommand = AuthsUpsertCommand;


/***/ }),
/* 127 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthStrategy = void 0;
const passport_local_1 = __webpack_require__(128);
const passport_1 = __webpack_require__(66);
const common_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(20);
let LocalAuthStrategy = class LocalAuthStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(username, password) {
        const user = await this
            .authService
            .validateUser(username, password);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.LocalAuthStrategy = LocalAuthStrategy;
exports.LocalAuthStrategy = LocalAuthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalAuthStrategy);


/***/ }),
/* 128 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 129 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRegisterHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const auth_register_command_1 = __webpack_require__(111);
const user_factory_1 = __webpack_require__(89);
const app_result_1 = __webpack_require__(27);
const users_repository_1 = __webpack_require__(45);
const auth_error_1 = __webpack_require__(130);
const auth_service_1 = __webpack_require__(20);
const auth_sent_code_result_1 = __webpack_require__(131);
const app_configs_service_1 = __webpack_require__(7);
const sent_code_provider_service_1 = __webpack_require__(53);
const gender_enum_1 = __webpack_require__(38);
let AuthRegisterHandler = class AuthRegisterHandler {
    constructor(usersRepository, userFactory, eventPublisher, authService, appConfigsService, sentCodeProviderService) {
        this.usersRepository = usersRepository;
        this.userFactory = userFactory;
        this.eventPublisher = eventPublisher;
        this.authService = authService;
        this.appConfigsService = appConfigsService;
        this.sentCodeProviderService = sentCodeProviderService;
    }
    async execute(command) {
        const foundUser = await this
            .usersRepository
            .getByEmail(command.email);
        if (foundUser !== null) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError.emailTaken);
        }
        const user = await this
            .userFactory
            .save(null, command.nickName, command.email, '', command.password, command.role, gender_enum_1.GenderEnum.MALE, null, null, null, null, null, null, null, null);
        const confirmCode = await this
            .authService
            .createAndSendConfirmCode(user);
        if (confirmCode === null) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError.errorWhileSendingEmail);
        }
        this
            .eventPublisher
            .mergeObjectContext(user);
        user
            .commit();
        const obfuscatedSentTo = this
            .sentCodeProviderService
            .obfuscateSentTo(user.email);
        const resultData = auth_sent_code_result_1.AuthSentCodeResult
            .create(this.appConfigsService.isProduction ? null : confirmCode.code, obfuscatedSentTo, confirmCode.expirationDate.getTime());
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.AuthRegisterHandler = AuthRegisterHandler;
exports.AuthRegisterHandler = AuthRegisterHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_register_command_1.AuthRegisterCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof user_factory_1.UserFactory !== "undefined" && user_factory_1.UserFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object, typeof (_d = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _d : Object, typeof (_e = typeof app_configs_service_1.AppConfigsService !== "undefined" && app_configs_service_1.AppConfigsService) === "function" ? _e : Object, typeof (_f = typeof sent_code_provider_service_1.SentCodeProviderService !== "undefined" && sent_code_provider_service_1.SentCodeProviderService) === "function" ? _f : Object])
], AuthRegisterHandler);


/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthError = void 0;
const app_messages_keys_1 = __webpack_require__(88);
const app_error_1 = __webpack_require__(93);
class AuthError extends app_error_1.AppError {
    constructor(code, message, statusCode = 400) {
        super(code, message, statusCode);
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
    static emailOrPhoneNotExist(byEmail) {
        return new AuthError(byEmail ?
            app_messages_keys_1.appMessagesKeys.emailNotExist
            : app_messages_keys_1.appMessagesKeys.phoneNumberNotExist, byEmail ? "Email not exist" : "Phone number not exist", 404);
    }
    static accountIsLocked(remainTime) {
        let timeMessage = "";
        if (remainTime.hours > 0) {
            timeMessage = `${remainTime.hours} hours`;
        }
        if (remainTime.minutes > 0) {
            timeMessage += timeMessage ? ", " : "";
            timeMessage += `${remainTime.minutes} minute(s)`;
        }
        else if (remainTime.hours === 0) {
            timeMessage = "less than a minute";
        }
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.accountIsLocked, `The account is locked for ${timeMessage}`, 403);
    }
}
exports.AuthError = AuthError;
AuthError.emailNotConfirmed = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.emailNotConfirmed, "The email is not confirmed", 404);
AuthError.phoneNotConfirmed = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.phoneNotConfirmed, "The phone is not confirmed", 404);
AuthError.accountIsLockedPermanently = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.accountIsLockedPermanently, "Account is locked", 403);
AuthError.passwordIncorrect = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.passwordIncorrect, "Password incorrect", 401);
AuthError.invalidCode = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.invalidCode, "Invalid code", 400);
AuthError.login2FAInvalidCode = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.login2FAInvalid, "Login 2FA Invalid code");
AuthError.emailTaken = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.emailTaken, "Email already taken");
AuthError.phoneNumberTaken = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.phoneNumberTaken, "PhoneNumber already taken");
AuthError.resetCodeEmpty = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.codeIsEmpty, "Code is empty");
AuthError.phoneAlreadyConfirmed = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.phoneAlreadyConfirmed, "Phone number already confirmed");
AuthError.emailAlreadyConfirmed = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.emailAlreadyConfirmed, "Email already confirmed");
AuthError.reset2FAGenerateFailed = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.reset2FAGenerateFailed, "Generating code failed");
AuthError.deviceIdNotSame = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.deviceIdNotSame, "Device ID not the same in your account");
AuthError.alternativeDeviceIdEmpty = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.alternativeDeviceIdEmpty, "AlternativeDeviceId is empty");
AuthError.userLoggedIn = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.accountRestricted, "We've detected an issue with your account. For your security, we've temporarily restricted access.");
AuthError.invalidToken = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.invalidToken, "Invalid access token");
AuthError.invalidRefreshToken = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.invalidRefreshToken, "Invalid refresh token");
AuthError.refreshTokenExpired = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.refreshTokenExpired, "Refresh token has expired");
AuthError.codeExpired = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.codeExpired, "Code has expired");
AuthError.accessTokenNotExpired = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.accessTokenNotExpired, "Access token not expired");
AuthError.userNotLoggedIn = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.userNotLoggedIn, "User not logged in");
AuthError.securityError = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.securityError, "There is a security error, please contact support.");
AuthError.errorWhileSendingEmail = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.errorWhileSendingEmail, "Error while sending email");


/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthSentCodeResult = void 0;
class AuthSentCodeResult {
    constructor(code, sentTo, expiresIn) {
        this.code = code;
        this.sentTo = sentTo;
        this.expiresIn = expiresIn;
    }
    static create(code, sentTo, expiresIn) {
        return new AuthSentCodeResult(code, sentTo, expiresIn);
    }
}
exports.AuthSentCodeResult = AuthSentCodeResult;


/***/ }),
/* 132 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthLoginHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const users_repository_1 = __webpack_require__(45);
const app_result_1 = __webpack_require__(27);
const auth_data_result_1 = __webpack_require__(133);
const auth_error_1 = __webpack_require__(130);
const bcrypt = __webpack_require__(51);
const users_info_result_1 = __webpack_require__(134);
const auth_tokens_result_1 = __webpack_require__(21);
const user_token_factory_1 = __webpack_require__(22);
const auth_login_command_1 = __webpack_require__(113);
let AuthLoginHandler = class AuthLoginHandler {
    constructor(userTokenFactory, usersRepository) {
        this.userTokenFactory = userTokenFactory;
        this.usersRepository = usersRepository;
    }
    async execute(command) {
        const foundUser = await this.usersRepository.getByEmail(command.email);
        if (foundUser === null) {
            throw app_result_1.AppResult.createError(auth_error_1.AuthError.emailOrPhoneNotExist(true));
        }
        if (!foundUser.isEmailConfirmed) {
            throw app_result_1.AppResult.createError(auth_error_1.AuthError.emailNotConfirmed);
        }
        const isPasswordCorrect = await bcrypt.compare(command.password, foundUser.password);
        if (!isPasswordCorrect) {
            throw app_result_1.AppResult.createError(auth_error_1.AuthError.passwordIncorrect);
        }
        const userToken = await this.userTokenFactory.save(foundUser._id);
        const resultData = auth_data_result_1.AuthDataResult.create(users_info_result_1.UsersInfoResult.create(foundUser._id, foundUser.nickName, foundUser.email, foundUser.phoneNumber, foundUser.isEmailConfirmed, foundUser.isPhoneNumberConfirmed, foundUser.role, foundUser.gender, foundUser.accountType, foundUser.region, foundUser.city, foundUser.address, foundUser.identityType, foundUser.identityNo, foundUser.residenceNo, foundUser.dateOfBirth, foundUser.isVerified), auth_tokens_result_1.AuthTokensResult.create(userToken.accessToken, userToken.refreshToken));
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.AuthLoginHandler = AuthLoginHandler;
exports.AuthLoginHandler = AuthLoginHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_login_command_1.AuthLoginCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof user_token_factory_1.UserTokenFactory !== "undefined" && user_token_factory_1.UserTokenFactory) === "function" ? _a : Object, typeof (_b = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _b : Object])
], AuthLoginHandler);


/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthDataResult = void 0;
class AuthDataResult {
    constructor(user, tokens) {
        this.user = user;
        this.tokens = tokens;
    }
    static create(user, tokens) {
        return new AuthDataResult(user, tokens);
    }
}
exports.AuthDataResult = AuthDataResult;


/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersInfoResult = void 0;
class UsersInfoResult {
    constructor(id, nickName, email, phoneNumber, isEmailConfirmed, isPhoneNumberConfirmed, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth, isVerified) {
        this.id = id;
        this.nickName = nickName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.isEmailConfirmed = isEmailConfirmed;
        this.isPhoneNumberConfirmed = isPhoneNumberConfirmed;
        this.role = role;
        this.gender = gender;
        this.accountType = accountType;
        this.region = region;
        this.city = city;
        this.address = address;
        this.identityType = identityType;
        this.identityNo = identityNo;
        this.residenceNo = residenceNo;
        this.dateOfBirth = dateOfBirth;
        this.isVerified = isVerified;
    }
    static create(id, nickName, email, phoneNumber, isEmailConfirmed, isPhoneNumberConfirmed, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth, isVerified) {
        return new UsersInfoResult(id, nickName, email, phoneNumber, isEmailConfirmed, isPhoneNumberConfirmed, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth, isVerified);
    }
}
exports.UsersInfoResult = UsersInfoResult;


/***/ }),
/* 135 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRefreshHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const auth_error_1 = __webpack_require__(130);
const auth_tokens_result_1 = __webpack_require__(21);
const user_tokens_repository_1 = __webpack_require__(23);
const jwt_provider_service_1 = __webpack_require__(43);
const user_token_1 = __webpack_require__(40);
const auth_refresh_command_1 = __webpack_require__(114);
let AuthRefreshHandler = class AuthRefreshHandler {
    constructor(userTokensRepository, jwtProviderService) {
        this.userTokensRepository = userTokensRepository;
        this.jwtProviderService = jwtProviderService;
    }
    async execute(command) {
        const foundUserToken = await this
            .userTokensRepository
            .getByRefreshToken(command.refreshToken);
        if (foundUserToken === null) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError.invalidRefreshToken);
        }
        const expirationCondition = foundUserToken.expirationDate < new Date();
        if (expirationCondition) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError.refreshTokenExpired);
        }
        const accessToken = await this
            .jwtProviderService
            .generateAccessToken(foundUserToken.userId);
        const userToken = await this
            .userTokensRepository
            .getAndReplaceById(foundUserToken._id, new user_token_1.UserToken(foundUserToken._id, accessToken, foundUserToken.refreshToken, foundUserToken.userId, foundUserToken.expirationDate));
        const resultTokens = auth_tokens_result_1.AuthTokensResult
            .create(userToken.accessToken, userToken.refreshToken);
        return app_result_1.AppResult
            .createSuccess(null, null, resultTokens);
    }
};
exports.AuthRefreshHandler = AuthRefreshHandler;
exports.AuthRefreshHandler = AuthRefreshHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_refresh_command_1.AuthRefreshCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof user_tokens_repository_1.UserTokensRepository !== "undefined" && user_tokens_repository_1.UserTokensRepository) === "function" ? _a : Object, typeof (_b = typeof jwt_provider_service_1.JwtProviderService !== "undefined" && jwt_provider_service_1.JwtProviderService) === "function" ? _b : Object])
], AuthRefreshHandler);


/***/ }),
/* 136 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthForgotPasswordHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const users_repository_1 = __webpack_require__(45);
const app_result_1 = __webpack_require__(27);
const auth_error_1 = __webpack_require__(130);
const auth_forgot_password_command_1 = __webpack_require__(116);
const auth_sent_code_result_1 = __webpack_require__(131);
const sent_code_enum_1 = __webpack_require__(62);
const user_code_factory_1 = __webpack_require__(52);
const sent_code_provider_service_1 = __webpack_require__(53);
const app_mail_service_1 = __webpack_require__(60);
const app_urls_1 = __webpack_require__(65);
const email_templates_1 = __webpack_require__(64);
const app_configs_service_1 = __webpack_require__(7);
let AuthForgotPasswordHandler = class AuthForgotPasswordHandler {
    constructor(usersRepository, userCodeFactory, sentCodeProviderService, appMailService, appConfigsService) {
        this.usersRepository = usersRepository;
        this.userCodeFactory = userCodeFactory;
        this.sentCodeProviderService = sentCodeProviderService;
        this.appMailService = appMailService;
        this.appConfigsService = appConfigsService;
    }
    async execute(command) {
        const foundUser = await this.usersRepository.getByEmail(command.email);
        if (foundUser === null) {
            throw app_result_1.AppResult.createError(auth_error_1.AuthError.emailOrPhoneNotExist(true));
        }
        const resetPasswordCode = await this.userCodeFactory.save(sent_code_enum_1.SentCodeEnum.resetPassword, foundUser.email, foundUser._id);
        const isEmailSent = await this.appMailService.send(foundUser.email, sent_code_enum_1.SentCodeEnum.resetPassword.title, email_templates_1.default.resetPassword, {
            name: foundUser.nickName,
            code: resetPasswordCode.code,
            url: app_urls_1.default.auth.resetPassword + resetPasswordCode.code,
        });
        if (!isEmailSent) {
            throw app_result_1.AppResult.createError(auth_error_1.AuthError.errorWhileSendingEmail);
        }
        const obfuscatedSentTo = this.sentCodeProviderService.obfuscateSentTo(foundUser.email);
        const resultData = auth_sent_code_result_1.AuthSentCodeResult.create(this.appConfigsService.isProduction ? null : resetPasswordCode.code, obfuscatedSentTo, resetPasswordCode.expirationDate.getTime());
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.AuthForgotPasswordHandler = AuthForgotPasswordHandler;
exports.AuthForgotPasswordHandler = AuthForgotPasswordHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_forgot_password_command_1.AuthForgotPasswordCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof user_code_factory_1.UserCodeFactory !== "undefined" && user_code_factory_1.UserCodeFactory) === "function" ? _b : Object, typeof (_c = typeof sent_code_provider_service_1.SentCodeProviderService !== "undefined" && sent_code_provider_service_1.SentCodeProviderService) === "function" ? _c : Object, typeof (_d = typeof app_mail_service_1.AppMailService !== "undefined" && app_mail_service_1.AppMailService) === "function" ? _d : Object, typeof (_e = typeof app_configs_service_1.AppConfigsService !== "undefined" && app_configs_service_1.AppConfigsService) === "function" ? _e : Object])
], AuthForgotPasswordHandler);


/***/ }),
/* 137 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResetPasswordHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const auth_error_1 = __webpack_require__(130);
const auth_reset_password_command_1 = __webpack_require__(118);
const sent_code_enum_1 = __webpack_require__(62);
const user_codes_repository_1 = __webpack_require__(56);
const auth_service_1 = __webpack_require__(20);
const users_repository_1 = __webpack_require__(45);
let AuthResetPasswordHandler = class AuthResetPasswordHandler {
    constructor(usersRepository, userCodesRepository, authService) {
        this.usersRepository = usersRepository;
        this.userCodesRepository = userCodesRepository;
        this.authService = authService;
    }
    async execute(command) {
        const foundUserCode = await this
            .userCodesRepository
            .checkIfExists(command.email, command.code, sent_code_enum_1.SentCodeEnum.resetPassword.type);
        if (foundUserCode === null) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError.invalidCode);
        }
        const expirationCondition = foundUserCode.expirationDate < new Date();
        if (expirationCondition) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError.codeExpired);
        }
        const foundUser = await this
            .usersRepository
            .getByEmail(command.email);
        const resultTokens = await this
            .authService
            .changePassword(foundUser, command.newPassword);
        await this
            .userCodesRepository
            .deleteById(foundUserCode._id);
        return app_result_1.AppResult
            .createSuccess(null, null, resultTokens);
    }
};
exports.AuthResetPasswordHandler = AuthResetPasswordHandler;
exports.AuthResetPasswordHandler = AuthResetPasswordHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_reset_password_command_1.AuthResetPasswordCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof user_codes_repository_1.UserCodesRepository !== "undefined" && user_codes_repository_1.UserCodesRepository) === "function" ? _b : Object, typeof (_c = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _c : Object])
], AuthResetPasswordHandler);


/***/ }),
/* 138 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UtilsModule = void 0;
const common_1 = __webpack_require__(3);
const app_date_utils_service_1 = __webpack_require__(49);
let UtilsModule = class UtilsModule {
};
exports.UtilsModule = UtilsModule;
exports.UtilsModule = UtilsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            app_date_utils_service_1.AppDateUtilsService,
        ],
        controllers: [],
        exports: [
            app_date_utils_service_1.AppDateUtilsService,
        ],
    })
], UtilsModule);


/***/ }),
/* 139 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InfrastructureModule = void 0;
const common_1 = __webpack_require__(3);
const app_configs_module_1 = __webpack_require__(14);
const app_logger_module_1 = __webpack_require__(140);
const mailer_1 = __webpack_require__(61);
const path_1 = __webpack_require__(141);
const app_configs_service_1 = __webpack_require__(7);
const ejs_adapter_1 = __webpack_require__(142);
const app_mail_service_1 = __webpack_require__(60);
const app_files_service_1 = __webpack_require__(143);
let InfrastructureModule = class InfrastructureModule {
};
exports.InfrastructureModule = InfrastructureModule;
exports.InfrastructureModule = InfrastructureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_configs_module_1.AppConfigsModule,
            app_logger_module_1.AppLoggerModule,
            mailer_1.MailerModule.forRootAsync({
                imports: [
                    app_configs_module_1.AppConfigsModule,
                ],
                inject: [
                    app_configs_service_1.AppConfigsService,
                ],
                useFactory: async (appConfigsService) => {
                    return ({
                        transport: {
                            host: appConfigsService.mailConfig.smtpServer,
                            port: appConfigsService.mailConfig.smtpPort,
                            secure: appConfigsService.mailConfig.isSecured,
                            auth: {
                                user: appConfigsService.mailConfig.sender,
                                pass: appConfigsService.mailConfig.password,
                            },
                        },
                        defaults: {
                            from: `"${appConfigsService.appConfig.name}" <${appConfigsService.mailConfig.sender}>`,
                        },
                        template: {
                            dir: (0, path_1.join)(__dirname, appConfigsService.mailConfig.templates),
                            adapter: new ejs_adapter_1.EjsAdapter(),
                            options: {
                                strict: false,
                            },
                        },
                    });
                },
            }),
        ],
        providers: [
            app_mail_service_1.AppMailService,
            app_files_service_1.AppFilesService,
        ],
        controllers: [],
        exports: [
            app_mail_service_1.AppMailService,
            app_files_service_1.AppFilesService,
        ],
    })
], InfrastructureModule);


/***/ }),
/* 140 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppLoggerModule = void 0;
const common_1 = __webpack_require__(3);
__webpack_require__(6);
const app_logger_service_1 = __webpack_require__(4);
const app_configs_module_1 = __webpack_require__(14);
let AppLoggerModule = class AppLoggerModule {
};
exports.AppLoggerModule = AppLoggerModule;
exports.AppLoggerModule = AppLoggerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_configs_module_1.AppConfigsModule,
        ],
        providers: [
            app_logger_service_1.AppLoggerService,
        ],
        exports: [
            app_logger_service_1.AppLoggerService,
        ],
    })
], AppLoggerModule);


/***/ }),
/* 141 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 142 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");

/***/ }),
/* 143 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppFilesService = void 0;
const common_1 = __webpack_require__(3);
const path = __webpack_require__(141);
const fs_1 = __webpack_require__(144);
const path_1 = __webpack_require__(141);
const fs_extra_1 = __webpack_require__(145);
const media_1 = __webpack_require__(146);
const medias_constants_1 = __webpack_require__(147);
const mongo_functions_1 = __webpack_require__(29);
const miedas_functions_1 = __webpack_require__(148);
let AppFilesService = class AppFilesService {
    constructor() { }
    async uploadMultipleFiles(files, directoryPath = medias_constants_1.mediasConstants.paths.temp, isProtected = true) {
        if (!files || files.length === 0) {
            return [];
        }
        const rootPath = this.getRootPath(isProtected);
        this.createDirectory(rootPath);
        const combinedDirectoryPath = (0, path_1.join)(rootPath, directoryPath);
        this.createDirectory(combinedDirectoryPath);
        const medias = [];
        for (const file of files) {
            if (!file || file.size === 0) {
                continue;
            }
            const fileName = file.originalname;
            const extension = (0, medias_constants_1.getFileExtension)(fileName);
            const mediaId = (0, mongo_functions_1.fromObjectId)((0, mongo_functions_1.createObjectId)());
            const uniqueName = `${mediaId}${extension}`;
            const combinedFilePath = (0, path_1.join)(combinedDirectoryPath, uniqueName);
            const url = (0, path_1.join)(directoryPath, uniqueName);
            await new Promise((resolve, reject) => {
                const stream = (0, fs_1.createWriteStream)(combinedFilePath);
                stream.write(file.buffer);
                stream.end();
                stream.on("finish", () => resolve());
                stream.on("error", reject);
            });
            const media = this.createMedia(mediaId, url, uniqueName, fileName, file.size, file.mimetype, isProtected);
            medias.push(media);
        }
        return medias;
    }
    async moveMultipleFiles(directoryPath, isProtected, medias) {
        this.createDirectories(isProtected, directoryPath);
        const rootPath = this.getRootPath(isProtected);
        const combinedDestDirectoryPath = (0, path_1.join)(rootPath, directoryPath);
        const mediasResult = [];
        for (const media of medias) {
            if (!media || !media.url) {
                continue;
            }
            const combinedSrcFilePath = (0, path_1.join)(rootPath, media.url);
            const combinedDestFilePath = (0, path_1.join)(combinedDestDirectoryPath, media.uniqueName);
            try {
                await (0, fs_extra_1.move)(combinedSrcFilePath, combinedDestFilePath);
                media.url = (0, path_1.join)(directoryPath, media.uniqueName);
                mediasResult.push(media);
            }
            catch (error) {
                console.error("Failed to move file:", error);
            }
        }
        return mediasResult;
    }
    async saveFileAsync(stream, fileName, mimeType, directoryPath = medias_constants_1.mediasConstants.paths.temp, isProtected = false) {
        if (!stream)
            return null;
        const rootPath = this.getRootPath(isProtected);
        const combinedDirectoryPath = (0, path_1.join)(rootPath, directoryPath);
        this.createDirectory(combinedDirectoryPath);
        const mediaId = (0, mongo_functions_1.fromObjectId)((0, mongo_functions_1.createObjectId)());
        const extension = (0, medias_constants_1.getFileExtension)(fileName);
        const uniqueName = `${mediaId}${extension}`;
        const combinedFilePath = (0, path_1.join)(combinedDirectoryPath, uniqueName);
        const url = (0, path_1.join)(directoryPath, uniqueName);
        try {
            const fileStream = (0, fs_1.createWriteStream)(combinedFilePath);
            await new Promise((resolve, reject) => {
                stream.pipe(fileStream).on("finish", resolve).on("error", reject);
            });
            const fileSize = (0, fs_1.statSync)(combinedFilePath).size;
            const media = this.createMedia(mediaId, url, uniqueName, fileName, fileSize, mimeType, isProtected);
            return media;
        }
        catch (error) {
            console.error("Error saving file:", error);
            return null;
        }
    }
    async deleteMultipleFiles(medias) {
        const recyclerBinPath = this.getRecyclePath();
        const mediasResult = [];
        for (const media of medias) {
            if (!media || !media.fullUrl) {
                continue;
            }
            const rootPath = this.getRootPath(false);
            const sourceFilePath = path.resolve(rootPath, media.fullUrl);
            const destinationFilePath = (0, path_1.join)(recyclerBinPath, media.uniqueName);
            try {
                await (0, fs_extra_1.move)(sourceFilePath, destinationFilePath);
                media.url = (0, path_1.join)(medias_constants_1.mediasConstants.paths.recyclerBin, media.uniqueName);
                mediasResult.push(media);
            }
            catch (error) {
                console.error(`Failed to move file ${media.uniqueName}: ${error}`);
            }
        }
        return mediasResult;
    }
    deleteFiles(directoryPath, isProtected, isPermanently, ...filePaths) {
        const rootPath = this.getRootPath(isProtected);
        const combinedDirectoryPath = (0, path_1.join)(rootPath, directoryPath);
        filePaths.forEach((filePath) => {
            if (!filePath) {
                return;
            }
            const combinedFilePath = (0, path_1.join)(combinedDirectoryPath, filePath);
            const isExist = (0, fs_extra_1.existsSync)(combinedFilePath);
            if (isExist) {
                if (isPermanently) {
                    (0, fs_extra_1.unlinkSync)(combinedFilePath);
                }
                else {
                    const recycleBinPath = this.getRecyclePath();
                    const destPath = (0, path_1.join)(recycleBinPath, filePath);
                    (0, fs_extra_1.moveSync)(combinedFilePath, destPath);
                }
            }
        });
    }
    deleteDirectory(directoryPath, isProtected, isPermanently) {
        const rootPath = this.getRootPath(isProtected);
        const combinedDirectoryPath = (0, path_1.join)(rootPath, directoryPath);
        const isExist = (0, fs_extra_1.existsSync)(combinedDirectoryPath);
        if (isExist) {
            if (isPermanently) {
                (0, fs_1.rmdirSync)(combinedDirectoryPath, {
                    recursive: true,
                });
            }
            else {
                const recycleBinPath = this.getRecyclePath();
                const destPath = (0, path_1.join)(recycleBinPath, directoryPath);
                (0, fs_extra_1.moveSync)(combinedDirectoryPath, destPath);
            }
        }
    }
    createDirectories(isProtected, ...directoriesPaths) {
        const rootPath = this.getRootPath(isProtected);
        directoriesPaths.forEach((directoryPath) => {
            const combinedDirectoryPath = (0, path_1.join)(rootPath, directoryPath);
            const isExist = (0, fs_extra_1.existsSync)(combinedDirectoryPath);
            if (!isExist) {
                (0, fs_extra_1.mkdirSync)(combinedDirectoryPath, {
                    recursive: true,
                });
            }
        });
    }
    renameFile(filePath, newName, isProtected) {
        const rootPath = this.getRootPath(isProtected);
        const combinedFilePath = (0, path_1.join)(rootPath, filePath);
        const isExist = (0, fs_extra_1.existsSync)(combinedFilePath);
        if (!isExist) {
            return false;
        }
        const oldName = path.basename(filePath);
        const directoryPath = combinedFilePath.replace(oldName, "");
        const combinedDestPath = (0, path_1.join)(directoryPath, newName);
        try {
            (0, fs_extra_1.moveSync)(combinedFilePath, combinedDestPath, {
                overwrite: true,
            });
            return true;
        }
        catch (error) {
            console.error("Failed to rename file:", error);
            return false;
        }
    }
    copyFile(directoryPath, isProtected, srcUrl, destFileName) {
        if (!srcUrl || !destFileName) {
            return false;
        }
        const rootPath = this.getRootPath(isProtected);
        const combinedDirectoryPath = (0, path_1.join)(rootPath, directoryPath);
        this.createDirectory(combinedDirectoryPath);
        const combinedSrcFilePath = (0, path_1.join)(rootPath, srcUrl);
        const isExist = (0, fs_extra_1.existsSync)(combinedSrcFilePath);
        if (!isExist) {
            return false;
        }
        const combinedDestFilePath = (0, path_1.join)(rootPath, directoryPath, destFileName);
        try {
            (0, fs_extra_1.copySync)(combinedSrcFilePath, combinedDestFilePath);
            return true;
        }
        catch (error) {
            console.error("Failed to copy file:", error);
            return false;
        }
    }
    moveFile(srcPath, destPath, shouldEncryptFile = false) {
        const isExist = (0, fs_extra_1.existsSync)(srcPath);
        if (isExist) {
            if (shouldEncryptFile) {
            }
            else {
                (0, fs_extra_1.moveSync)(srcPath, destPath, {
                    overwrite: true,
                });
            }
            return true;
        }
        return (0, fs_extra_1.existsSync)(destPath);
    }
    deleteToRecycleBin(srcPath, isDirectory) {
        const recycleBinPath = this.getRecyclePath();
        const fileName = path.basename(srcPath);
        const destPath = (0, path_1.join)(recycleBinPath, fileName);
        if (isDirectory) {
            (0, fs_extra_1.moveSync)(srcPath, destPath, {
                overwrite: true,
            });
        }
        else {
            (0, fs_extra_1.moveSync)(srcPath, destPath, {
                overwrite: true,
            });
        }
    }
    createAppDirectories() {
        this.createDirectories(false, ...medias_constants_1.mediasConstants.directories);
        this.createDirectories(true, ...medias_constants_1.mediasConstants.protectedDirectories);
    }
    getRootPath(isProtected) {
        const rootPath = (0, miedas_functions_1.getPublicDirectory)();
        return isProtected ?
            (0, path_1.join)(rootPath, medias_constants_1.mediasConstants.paths.uploadsProtected)
            : (0, path_1.join)(rootPath, medias_constants_1.mediasConstants.paths.uploads);
    }
    getRecyclePath() {
        const rootPath = this.getRootPath(false);
        return (0, path_1.join)(rootPath, medias_constants_1.mediasConstants.paths.recyclerBin);
    }
    createDirectory(path) {
        const isExist = (0, fs_extra_1.existsSync)(path);
        if (!isExist) {
            (0, fs_extra_1.mkdirSync)(path, {
                recursive: true,
            });
        }
    }
    createMedia(id, url, uniqueName, name, size, type, isProtected) {
        return media_1.Media.create(id, url, uniqueName, name, size, type, null, null, null, null, isProtected);
    }
};
exports.AppFilesService = AppFilesService;
exports.AppFilesService = AppFilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppFilesService);


/***/ }),
/* 144 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 145 */
/***/ ((module) => {

module.exports = require("fs-extra");

/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Media = void 0;
const cqrs_1 = __webpack_require__(41);
const medias_constants_1 = __webpack_require__(147);
const mongo_functions_1 = __webpack_require__(29);
class Media extends cqrs_1.AggregateRoot {
    constructor(_id, url, uniqueName, name, size, type, companyId, userId, sourceType, source, isProtected, displayOrder, isVisible, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy) {
        super();
        this._id = _id;
        this.url = url;
        this.uniqueName = uniqueName;
        this.name = name;
        this.size = size;
        this.type = type;
        this.companyId = companyId;
        this.userId = userId;
        this.sourceType = sourceType;
        this.source = source;
        this.isProtected = isProtected;
        this.displayOrder = displayOrder;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
    static create(id, url, uniqueName, name, size, type, companyId, userId, sourceType, source, isProtected) {
        const entity = new Media((0, mongo_functions_1.createObjectIdAsString)(id), url, uniqueName, name, size, type, companyId, userId, sourceType, source, isProtected, 0, true, null, null, null, null, null, null);
        return entity;
    }
    get fullUrl() {
        return this.isProtected ?
            (0, medias_constants_1.toProtectedPath)(this.url)
            :
                this.url;
    }
    getFileSizeString() {
        if (this.size < 1024) {
            return `${this.size} B`;
        }
        if (this.size < 1024 * 1024) {
            return `${this.size / 1024} KB`;
        }
        return `${this.size / (1024 * 1024)} MB`;
    }
}
exports.Media = Media;


/***/ }),
/* 147 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mediasConstants = void 0;
exports.toProtectedPath = toProtectedPath;
exports.getFileExtension = getFileExtension;
const path_1 = __webpack_require__(141);
const publicPath = 'public';
const uploadsPath = 'uploads';
const protectedPath = 'protected';
const recyclerBinPath = 'recyclerBin';
const uploadsProtected = `${uploadsPath}/${protectedPath}`;
const publicUploadsPath = `${publicPath}/${uploadsPath}`;
const publicUploadsProtectedPath = `${publicPath}/${uploadsPath}/${protectedPath}`;
const tempPath = 'temp';
const directoriesPaths = [
    recyclerBinPath,
    tempPath,
];
const protectedDirectoriesPaths = [
    tempPath,
];
exports.mediasConstants = {
    paths: {
        public: publicPath,
        uploads: uploadsPath,
        protected: protectedPath,
        recyclerBin: recyclerBinPath,
        uploadsProtected: uploadsProtected,
        publicUploads: publicUploadsPath,
        publicUploadsProtected: publicUploadsProtectedPath,
        temp: tempPath,
    },
    directories: directoriesPaths,
    protectedDirectories: protectedDirectoriesPaths,
};
function toProtectedPath(value) {
    return `${protectedPath}/${value}`;
}
function getFileExtension(path) {
    return (0, path_1.extname)(path);
}


/***/ }),
/* 148 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPublicDirectory = getPublicDirectory;
exports.getUploadsPathInPublicDirectory = getUploadsPathInPublicDirectory;
const path_1 = __webpack_require__(141);
const medias_constants_1 = __webpack_require__(147);
function getPublicDirectory() {
    return (0, path_1.join)(__dirname, '..', medias_constants_1.mediasConstants.paths.public);
}
function getUploadsPathInPublicDirectory(path) {
    return (0, path_1.join)(getPublicDirectory(), medias_constants_1.mediasConstants.paths.uploads, path);
}


/***/ }),
/* 149 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthConfirmHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const auth_error_1 = __webpack_require__(130);
const auth_confirm_command_1 = __webpack_require__(122);
const sent_code_enum_1 = __webpack_require__(62);
const auth_tokens_result_1 = __webpack_require__(21);
const user_codes_repository_1 = __webpack_require__(56);
const users_repository_1 = __webpack_require__(45);
const auth_data_result_1 = __webpack_require__(133);
const users_info_result_1 = __webpack_require__(134);
const user_token_factory_1 = __webpack_require__(22);
let AuthConfirmHandler = class AuthConfirmHandler {
    constructor(usersRepository, userCodesRepository, userTokenFactory) {
        this.usersRepository = usersRepository;
        this.userCodesRepository = userCodesRepository;
        this.userTokenFactory = userTokenFactory;
    }
    async execute(command) {
        const foundUser = await this
            .usersRepository
            .getByEmail(command.email);
        if (foundUser.isEmailConfirmed) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError.emailAlreadyConfirmed);
        }
        const foundUserCode = await this
            .userCodesRepository
            .checkIfExists(command.email, command.code, sent_code_enum_1.SentCodeEnum.emailConfirmation.type);
        if (foundUserCode === null) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError.invalidCode);
        }
        const expirationCondition = foundUserCode.expirationDate < new Date();
        if (expirationCondition) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError.codeExpired);
        }
        foundUser.isEmailConfirmed = true;
        await this
            .usersRepository
            .getAndReplaceById(foundUser._id, foundUser);
        await this
            .userCodesRepository
            .deleteById(foundUserCode._id);
        const userToken = await this
            .userTokenFactory
            .save(foundUser._id);
        const resultData = auth_data_result_1.AuthDataResult
            .create(users_info_result_1.UsersInfoResult
            .create(foundUser._id, foundUser.nickName, foundUser.email, foundUser.phoneNumber, foundUser.isEmailConfirmed, foundUser.isPhoneNumberConfirmed, foundUser.role, foundUser.gender, foundUser.accountType, foundUser.region, foundUser.city, foundUser.address, foundUser.identityType, foundUser.identityNo, foundUser.residenceNo, foundUser.dateOfBirth, true), auth_tokens_result_1.AuthTokensResult
            .create(userToken.accessToken, userToken.refreshToken));
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.AuthConfirmHandler = AuthConfirmHandler;
exports.AuthConfirmHandler = AuthConfirmHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_confirm_command_1.AuthConfirmCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof user_codes_repository_1.UserCodesRepository !== "undefined" && user_codes_repository_1.UserCodesRepository) === "function" ? _b : Object, typeof (_c = typeof user_token_factory_1.UserTokenFactory !== "undefined" && user_token_factory_1.UserTokenFactory) === "function" ? _c : Object])
], AuthConfirmHandler);


/***/ }),
/* 150 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResendConfirmCodeHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const users_repository_1 = __webpack_require__(45);
const app_result_1 = __webpack_require__(27);
const auth_error_1 = __webpack_require__(130);
const auth_sent_code_result_1 = __webpack_require__(131);
const sent_code_provider_service_1 = __webpack_require__(53);
const app_configs_service_1 = __webpack_require__(7);
const auth_resend_confirm_code_command_1 = __webpack_require__(120);
const auth_service_1 = __webpack_require__(20);
let AuthResendConfirmCodeHandler = class AuthResendConfirmCodeHandler {
    constructor(usersRepository, sentCodeProviderService, appConfigsService, authService) {
        this.usersRepository = usersRepository;
        this.sentCodeProviderService = sentCodeProviderService;
        this.appConfigsService = appConfigsService;
        this.authService = authService;
    }
    async execute(command) {
        const foundUser = await this
            .usersRepository
            .getByEmail(command.email);
        if (foundUser === null) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError
                .emailOrPhoneNotExist(true));
        }
        if (foundUser.isEmailConfirmed) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError.emailAlreadyConfirmed);
        }
        const confirmCode = await this
            .authService
            .createAndSendConfirmCode(foundUser);
        if (confirmCode === null) {
            return app_result_1.AppResult
                .createError(auth_error_1.AuthError.errorWhileSendingEmail);
        }
        const obfuscatedSentTo = this
            .sentCodeProviderService
            .obfuscateSentTo(foundUser.email);
        const resultData = auth_sent_code_result_1.AuthSentCodeResult
            .create(this.appConfigsService.isProduction ? null : confirmCode.code, obfuscatedSentTo, confirmCode.expirationDate.getTime());
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.AuthResendConfirmCodeHandler = AuthResendConfirmCodeHandler;
exports.AuthResendConfirmCodeHandler = AuthResendConfirmCodeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_resend_confirm_code_command_1.AuthResendConfirmCodeCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof sent_code_provider_service_1.SentCodeProviderService !== "undefined" && sent_code_provider_service_1.SentCodeProviderService) === "function" ? _b : Object, typeof (_c = typeof app_configs_service_1.AppConfigsService !== "undefined" && app_configs_service_1.AppConfigsService) === "function" ? _c : Object, typeof (_d = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _d : Object])
], AuthResendConfirmCodeHandler);


/***/ }),
/* 151 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetMeHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const users_repository_1 = __webpack_require__(45);
const app_result_1 = __webpack_require__(27);
const auth_data_result_1 = __webpack_require__(133);
const auth_error_1 = __webpack_require__(130);
const users_info_result_1 = __webpack_require__(134);
const auth_tokens_result_1 = __webpack_require__(21);
const user_token_factory_1 = __webpack_require__(22);
const auth_get_me_command_1 = __webpack_require__(123);
let GetMeHandler = class GetMeHandler {
    constructor(userTokenFactory, usersRepository) {
        this.userTokenFactory = userTokenFactory;
        this.usersRepository = usersRepository;
    }
    async execute(command) {
        const foundUser = await this.usersRepository.getById(command.id);
        if (foundUser === null) {
            throw app_result_1.AppResult.createError(auth_error_1.AuthError.emailOrPhoneNotExist(true));
        }
        const userToken = await this.userTokenFactory.save(foundUser._id);
        const resultData = auth_data_result_1.AuthDataResult.create(users_info_result_1.UsersInfoResult.create(foundUser._id, foundUser.nickName, foundUser.email, foundUser.phoneNumber, foundUser.isEmailConfirmed, foundUser.isPhoneNumberConfirmed, foundUser.role, foundUser.gender, foundUser.accountType, foundUser.region, foundUser.city, foundUser.address, foundUser.identityType, foundUser.identityNo, foundUser.residenceNo, foundUser.dateOfBirth, foundUser.isVerified), auth_tokens_result_1.AuthTokensResult.create(userToken.accessToken, userToken.refreshToken));
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.GetMeHandler = GetMeHandler;
exports.GetMeHandler = GetMeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_get_me_command_1.GetMeCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof user_token_factory_1.UserTokenFactory !== "undefined" && user_token_factory_1.UserTokenFactory) === "function" ? _a : Object, typeof (_b = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _b : Object])
], GetMeHandler);


/***/ }),
/* 152 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthsUpsertHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const auth_update_command_1 = __webpack_require__(126);
const users_get_result_1 = __webpack_require__(94);
const users_repository_1 = __webpack_require__(45);
const app_result_1 = __webpack_require__(27);
const users_error_1 = __webpack_require__(92);
const auth_factory_1 = __webpack_require__(153);
let AuthsUpsertHandler = class AuthsUpsertHandler {
    constructor(usersRepository, authFactory, eventPublisher) {
        this.usersRepository = usersRepository;
        this.authFactory = authFactory;
        this.eventPublisher = eventPublisher;
    }
    async execute(command) {
        const isInsert = command.id === null;
        if (isInsert) {
            var foundEntity = await this.usersRepository.getByEmail(command.email);
            if (foundEntity !== null) {
                throw app_result_1.AppResult.createError(users_error_1.UsersError.emailTaken);
            }
            if (command.phoneNumber !== "") {
                foundEntity = await this.usersRepository.getByPhoneNumber(command.phoneNumber);
                if (foundEntity !== null) {
                    throw app_result_1.AppResult.createError(users_error_1.UsersError.phoneNumberTaken);
                }
            }
        }
        var entity = await this.authFactory.save(command.id, command.nickName, command.email, command.phoneNumber, command.role, command.gender, command.accountType, command.region, command.city, command.address, command.identityType, command.identityNo, command.residenceNo, command.dateOfBirth);
        entity = this.eventPublisher.mergeObjectContext(entity);
        entity.commit();
        const resultData = users_get_result_1.UsersGetResult.create(entity._id, entity.nickName, entity.email, entity.phoneNumber, entity.isEmailConfirmed, entity.isPhoneNumberConfirmed, entity.role, entity.gender, entity.accountType, entity.region, entity.city, entity.address, entity.identityType, entity.identityNo, entity.residenceNo, entity.dateOfBirth, entity.isVerified);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.AuthsUpsertHandler = AuthsUpsertHandler;
exports.AuthsUpsertHandler = AuthsUpsertHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_update_command_1.AuthsUpsertCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof auth_factory_1.AuthFactory !== "undefined" && auth_factory_1.AuthFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object])
], AuthsUpsertHandler);


/***/ }),
/* 153 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthFactory = void 0;
const common_1 = __webpack_require__(3);
const mongo_functions_1 = __webpack_require__(29);
const users_repository_1 = __webpack_require__(45);
let AuthFactory = class AuthFactory {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async save(id, nickName, email, phoneNumber, role, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth) {
        const isInsert = id === null;
        const foundEntity = await this
            .usersRepository
            .getById(id);
        if (foundEntity == null) {
            return null;
        }
        foundEntity.nickName = nickName;
        foundEntity.phoneNumber = phoneNumber;
        foundEntity.role = role;
        foundEntity.gender = gender;
        foundEntity.accountType = accountType;
        foundEntity.region = region;
        foundEntity.city = city;
        foundEntity.address = address;
        foundEntity.identityType = identityType;
        foundEntity.identityNo = identityNo;
        foundEntity.residenceNo = residenceNo;
        foundEntity.dateOfBirth = dateOfBirth;
        const updatedEntity = await this
            .usersRepository
            .getAndUpdate({
            _id: (0, mongo_functions_1.createObjectId)(id),
        }, foundEntity);
        return updatedEntity;
    }
};
exports.AuthFactory = AuthFactory;
exports.AuthFactory = AuthFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], AuthFactory);


/***/ }),
/* 154 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoModule = void 0;
const common_1 = __webpack_require__(3);
const auth_module_1 = __webpack_require__(19);
const cqrs_1 = __webpack_require__(41);
const auth_info_logout_handler_1 = __webpack_require__(155);
const auth_info_controller_1 = __webpack_require__(159);
const auth_info_change_password_handler_1 = __webpack_require__(164);
const users_module_1 = __webpack_require__(67);
const auth_info_profile_handler_1 = __webpack_require__(166);
const auth_info_update_handler_1 = __webpack_require__(168);
let AuthInfoModule = class AuthInfoModule {
};
exports.AuthInfoModule = AuthInfoModule;
exports.AuthInfoModule = AuthInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            cqrs_1.CqrsModule,
        ],
        providers: [
            auth_info_profile_handler_1.AuthInfoProfileHandler,
            auth_info_update_handler_1.AuthInfoUpdateHandler,
            auth_info_change_password_handler_1.AuthInfoChangePasswordHandler,
            auth_info_logout_handler_1.AuthInfoLogoutHandler,
        ],
        controllers: [
            auth_info_controller_1.AuthInfoController,
        ],
        exports: [],
    })
], AuthInfoModule);


/***/ }),
/* 155 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoLogoutHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const auth_info_logout_command_1 = __webpack_require__(156);
const user_tokens_repository_1 = __webpack_require__(23);
const auth_info_succes_1 = __webpack_require__(157);
const mongo_functions_1 = __webpack_require__(29);
let AuthInfoLogoutHandler = class AuthInfoLogoutHandler {
    constructor(userTokensRepository) {
        this.userTokensRepository = userTokensRepository;
    }
    async execute(command) {
        const deletedUserToken = await this.userTokensRepository.getAndDelete({
            userId: (0, mongo_functions_1.createObjectId)(command.userId),
        });
        if (deletedUserToken === null) {
            throw app_result_1.AppResult.createSuccess(auth_info_succes_1.AuthInfoSuccess.userAlreadyLoggedOut.key, auth_info_succes_1.AuthInfoSuccess.userAlreadyLoggedOut.message, null);
        }
        return app_result_1.AppResult.createSuccess(null, null, null);
    }
};
exports.AuthInfoLogoutHandler = AuthInfoLogoutHandler;
exports.AuthInfoLogoutHandler = AuthInfoLogoutHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_info_logout_command_1.AuthInfoLogoutCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof user_tokens_repository_1.UserTokensRepository !== "undefined" && user_tokens_repository_1.UserTokensRepository) === "function" ? _a : Object])
], AuthInfoLogoutHandler);


/***/ }),
/* 156 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoLogoutCommand = void 0;
class AuthInfoLogoutCommand {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.AuthInfoLogoutCommand = AuthInfoLogoutCommand;


/***/ }),
/* 157 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoSuccess = void 0;
const app_messages_keys_1 = __webpack_require__(88);
const app_success_1 = __webpack_require__(158);
class AuthInfoSuccess extends app_success_1.AppSuccess {
    constructor(key, message) {
        super(key, message);
        this.key = key;
        this.message = message;
    }
}
exports.AuthInfoSuccess = AuthInfoSuccess;
AuthInfoSuccess.userAlreadyLoggedOut = new app_success_1.AppSuccess(app_messages_keys_1.appMessagesKeys.userAlreadyLoggedOut, 'User is already logged out');


/***/ }),
/* 158 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppSuccess = void 0;
class AppSuccess {
    constructor(key, message) {
        this.key = key;
        this.message = message;
    }
}
exports.AppSuccess = AppSuccess;


/***/ }),
/* 159 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoController = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(41);
const jwt_auth_guard_1 = __webpack_require__(69);
const auth_info_logout_command_1 = __webpack_require__(156);
const auth_info_change_password_request_1 = __webpack_require__(160);
const auth_info_change_password_command_1 = __webpack_require__(161);
const users_get_query_1 = __webpack_require__(76);
const auth_info_update_request_1 = __webpack_require__(162);
const auth_info_update_command_1 = __webpack_require__(163);
const app_response_1 = __webpack_require__(87);
let AuthInfoController = class AuthInfoController {
    constructor(queryBus, commandBus) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    async profile(req) {
        const { userId, roles } = req.user;
        const query = new users_get_query_1.UsersGetQuery(userId);
        const result = await this.queryBus.execute(query);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async update(authInfoUpdateRequest, req) {
        const command = new auth_info_update_command_1.AuthInfoUpdateCommand(req.user.userId, authInfoUpdateRequest.nickName, authInfoUpdateRequest.phoneNumber, authInfoUpdateRequest.gender, authInfoUpdateRequest.accountType, authInfoUpdateRequest.region, authInfoUpdateRequest.city, authInfoUpdateRequest.address, authInfoUpdateRequest.identityType, authInfoUpdateRequest.identityNo, authInfoUpdateRequest.residenceNo, authInfoUpdateRequest.dateOfBirth);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async changePassword(authInfoChangePasswordRequest, req) {
        const command = new auth_info_change_password_command_1.AuthInfoChangePasswordCommand(req.user.userId, authInfoChangePasswordRequest.oldPassword, authInfoChangePasswordRequest.newPassword);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async logout(req) {
        const command = new auth_info_logout_command_1.AuthInfoLogoutCommand(req.user.userId);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, null, result.paging, result.error);
        return response;
    }
};
exports.AuthInfoController = AuthInfoController;
__decorate([
    (0, common_1.Get)("profile"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthInfoController.prototype, "profile", null);
__decorate([
    (0, common_1.Post)("update"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof auth_info_update_request_1.AuthInfoUpdateRequest !== "undefined" && auth_info_update_request_1.AuthInfoUpdateRequest) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthInfoController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("changePassword"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof auth_info_change_password_request_1.AuthInfoChangePasswordRequest !== "undefined" && auth_info_change_password_request_1.AuthInfoChangePasswordRequest) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthInfoController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthInfoController.prototype, "logout", null);
exports.AuthInfoController = AuthInfoController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)({
        path: "web/authInfo",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object])
], AuthInfoController);


/***/ }),
/* 160 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoChangePasswordRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class AuthInfoChangePasswordRequest {
}
exports.AuthInfoChangePasswordRequest = AuthInfoChangePasswordRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsStrongPassword)(),
    __metadata("design:type", String)
], AuthInfoChangePasswordRequest.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
    __metadata("design:type", String)
], AuthInfoChangePasswordRequest.prototype, "newPassword", void 0);


/***/ }),
/* 161 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoChangePasswordCommand = void 0;
class AuthInfoChangePasswordCommand {
    constructor(userId, oldPassword, newPassword) {
        this.userId = userId;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
exports.AuthInfoChangePasswordCommand = AuthInfoChangePasswordCommand;


/***/ }),
/* 162 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoUpdateRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const gender_enum_1 = __webpack_require__(38);
const account_type_enum_1 = __webpack_require__(73);
class AuthInfoUpdateRequest {
}
exports.AuthInfoUpdateRequest = AuthInfoUpdateRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthInfoUpdateRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthInfoUpdateRequest.prototype, "nickName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], AuthInfoUpdateRequest.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(gender_enum_1.GenderEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthInfoUpdateRequest.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(account_type_enum_1.AccountTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthInfoUpdateRequest.prototype, "accountType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthInfoUpdateRequest.prototype, "region", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthInfoUpdateRequest.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthInfoUpdateRequest.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthInfoUpdateRequest.prototype, "identityType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthInfoUpdateRequest.prototype, "identityNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthInfoUpdateRequest.prototype, "residenceNo", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AuthInfoUpdateRequest.prototype, "dateOfBirth", void 0);


/***/ }),
/* 163 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoUpdateCommand = void 0;
class AuthInfoUpdateCommand {
    constructor(id, nickName, phoneNumber, gender, accountType, region, city, address, identityType, identityNo, residenceNo, dateOfBirth) {
        this.id = id;
        this.nickName = nickName;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.accountType = accountType;
        this.region = region;
        this.city = city;
        this.address = address;
        this.identityType = identityType;
        this.identityNo = identityNo;
        this.residenceNo = residenceNo;
        this.dateOfBirth = dateOfBirth;
    }
}
exports.AuthInfoUpdateCommand = AuthInfoUpdateCommand;


/***/ }),
/* 164 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoChangePasswordHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const bcrypt = __webpack_require__(51);
const auth_info_change_password_command_1 = __webpack_require__(161);
const auth_info_error_1 = __webpack_require__(165);
const auth_service_1 = __webpack_require__(20);
const users_repository_1 = __webpack_require__(45);
let AuthInfoChangePasswordHandler = class AuthInfoChangePasswordHandler {
    constructor(usersRepository, authService) {
        this.usersRepository = usersRepository;
        this.authService = authService;
    }
    async execute(command) {
        const foundUser = await this
            .usersRepository
            .getById(command.userId);
        if (foundUser === null) {
            throw app_result_1.AppResult
                .createError(auth_info_error_1.AuthInfoError.userNotFound);
        }
        const isPasswordMatched = await bcrypt
            .compare(command.oldPassword, foundUser.password);
        if (!isPasswordMatched) {
            throw app_result_1.AppResult
                .createError(auth_info_error_1.AuthInfoError.passwordIncorrect);
        }
        const resultTokens = await this
            .authService
            .changePassword(foundUser, command.newPassword);
        return app_result_1.AppResult
            .createSuccess(null, null, resultTokens);
    }
};
exports.AuthInfoChangePasswordHandler = AuthInfoChangePasswordHandler;
exports.AuthInfoChangePasswordHandler = AuthInfoChangePasswordHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_info_change_password_command_1.AuthInfoChangePasswordCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], AuthInfoChangePasswordHandler);


/***/ }),
/* 165 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoError = void 0;
const app_messages_keys_1 = __webpack_require__(88);
const app_error_1 = __webpack_require__(93);
class AuthInfoError extends app_error_1.AppError {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.message = message;
    }
}
exports.AuthInfoError = AuthInfoError;
AuthInfoError.userTokenNotFoundToLogout = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.userTokenNotFoundToLogout, 'User token not found to logout', 400);
AuthInfoError.userNotFound = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.userNotFound, 'User token not found', 404);
AuthInfoError.passwordIncorrect = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.passwordIncorrect, 'Password incorrect', 401);


/***/ }),
/* 166 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoProfileHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const auth_info_profile_query_1 = __webpack_require__(167);
const users_info_result_1 = __webpack_require__(134);
const users_repository_1 = __webpack_require__(45);
let AuthInfoProfileHandler = class AuthInfoProfileHandler {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(query) {
        const entity = await this.usersRepository.getById(query.id);
        if (entity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("object"));
        }
        const resultData = users_info_result_1.UsersInfoResult.create(entity._id, entity.nickName, entity.email, entity.phoneNumber, entity.isEmailConfirmed, entity.isPhoneNumberConfirmed, entity.role, entity.gender, entity.accountType, entity.region, entity.city, entity.address, entity.identityType, entity.identityNo, entity.residenceNo, entity.dateOfBirth, entity.isVerified);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.AuthInfoProfileHandler = AuthInfoProfileHandler;
exports.AuthInfoProfileHandler = AuthInfoProfileHandler = __decorate([
    (0, cqrs_1.QueryHandler)(auth_info_profile_query_1.AuthInfoProfileQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], AuthInfoProfileHandler);


/***/ }),
/* 167 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoProfileQuery = void 0;
class AuthInfoProfileQuery {
    constructor(id) {
        this.id = id;
    }
}
exports.AuthInfoProfileQuery = AuthInfoProfileQuery;


/***/ }),
/* 168 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthInfoUpdateHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const auth_info_update_command_1 = __webpack_require__(163);
const app_result_1 = __webpack_require__(27);
const users_info_result_1 = __webpack_require__(134);
const user_update_factory_1 = __webpack_require__(95);
const users_repository_1 = __webpack_require__(45);
let AuthInfoUpdateHandler = class AuthInfoUpdateHandler {
    constructor(usersRepository, userUpdateFactory, eventPublisher) {
        this.usersRepository = usersRepository;
        this.userUpdateFactory = userUpdateFactory;
        this.eventPublisher = eventPublisher;
    }
    async execute(command) {
        var entity = await this
            .userUpdateFactory
            .save(command.id, command.nickName, command.phoneNumber, command.gender, command.accountType, command.region, command.city, command.address, command.identityType, command.identityNo, command.residenceNo, command.dateOfBirth);
        entity = this
            .eventPublisher
            .mergeObjectContext(entity);
        entity
            .commit();
        const foundUser = await this
            .usersRepository
            .getById(command.id);
        const resultData = users_info_result_1.UsersInfoResult
            .create(foundUser._id, foundUser.nickName, foundUser.email, foundUser.phoneNumber, foundUser.isEmailConfirmed, foundUser.isPhoneNumberConfirmed, foundUser.role, foundUser.gender, foundUser.accountType, foundUser.region, foundUser.city, foundUser.address, foundUser.identityType, foundUser.identityNo, foundUser.residenceNo, foundUser.dateOfBirth, foundUser.isVerified);
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.AuthInfoUpdateHandler = AuthInfoUpdateHandler;
exports.AuthInfoUpdateHandler = AuthInfoUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_info_update_command_1.AuthInfoUpdateCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object, typeof (_b = typeof user_update_factory_1.UserUpdateFactory !== "undefined" && user_update_factory_1.UserUpdateFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object])
], AuthInfoUpdateHandler);


/***/ }),
/* 169 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediasModule = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(41);
const mongoose_1 = __webpack_require__(24);
const media_schema_1 = __webpack_require__(170);
const medias_repository_1 = __webpack_require__(171);
const media_schema_factory_1 = __webpack_require__(172);
const medias_controller_1 = __webpack_require__(173);
const medias_upload_handler_1 = __webpack_require__(181);
const media_factory_1 = __webpack_require__(183);
const infrastructure_module_1 = __webpack_require__(139);
const medias_get_handler_1 = __webpack_require__(184);
const auth_module_1 = __webpack_require__(19);
let MediasModule = class MediasModule {
};
exports.MediasModule = MediasModule;
exports.MediasModule = MediasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            infrastructure_module_1.InfrastructureModule,
            cqrs_1.CqrsModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: media_schema_1.MediaSchema.name,
                    schema: mongoose_1.SchemaFactory
                        .createForClass(media_schema_1.MediaSchema),
                },
            ]),
        ],
        providers: [
            medias_repository_1.MediasRepository,
            media_schema_factory_1.MediaSchemaFactory,
            media_factory_1.MediaFactory,
            medias_controller_1.MediasController,
            medias_upload_handler_1.MediasUploadHandler,
            medias_get_handler_1.MediasGetHandler,
        ],
        controllers: [
            medias_controller_1.MediasController,
        ],
        exports: [
            media_factory_1.MediaFactory,
        ],
    })
], MediasModule);


/***/ }),
/* 170 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const schemas_names_1 = __webpack_require__(34);
const base_with_Info_schema_1 = __webpack_require__(37);
const mongodb_1 = __webpack_require__(30);
const mongoose_2 = __webpack_require__(25);
let MediaSchema = class MediaSchema extends base_with_Info_schema_1.BaseWithInfoSchema {
};
exports.MediaSchema = MediaSchema;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MediaSchema.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MediaSchema.prototype, "uniqueName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MediaSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], MediaSchema.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MediaSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: 'CompanySchema',
    }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], MediaSchema.prototype, "companyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: 'UserSchema',
    }),
    __metadata("design:type", typeof (_b = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _b : Object)
], MediaSchema.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['Order', 'Tender', 'Tender-quotation', 'Payment', 'Item', 'Company'],
    }),
    __metadata("design:type", String)
], MediaSchema.prototype, "sourceType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        refPath: 'sourceType',
    }),
    __metadata("design:type", typeof (_c = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _c : Object)
], MediaSchema.prototype, "source", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], MediaSchema.prototype, "isProtected", void 0);
exports.MediaSchema = MediaSchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.medias,
        versionKey: false,
        timestamps: false,
    })
], MediaSchema);


/***/ }),
/* 171 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediasRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const base_repository_1 = __webpack_require__(26);
const media_schema_1 = __webpack_require__(170);
const media_schema_factory_1 = __webpack_require__(172);
let MediasRepository = class MediasRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
};
exports.MediasRepository = MediasRepository;
exports.MediasRepository = MediasRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(media_schema_1.MediaSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof media_schema_factory_1.MediaSchemaFactory !== "undefined" && media_schema_factory_1.MediaSchemaFactory) === "function" ? _b : Object])
], MediasRepository);


/***/ }),
/* 172 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaSchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const media_1 = __webpack_require__(146);
const mongo_functions_1 = __webpack_require__(29);
let MediaSchemaFactory = class MediaSchemaFactory {
    create(entity) {
        return {
            _id: (0, mongo_functions_1.createObjectId)(entity._id),
            url: entity.url,
            uniqueName: entity.uniqueName,
            name: entity.name,
            size: entity.size,
            type: entity.type,
            companyId: (0, mongo_functions_1.createObjectId)(entity.companyId),
            userId: (0, mongo_functions_1.createObjectId)(entity.userId),
            sourceType: entity.sourceType,
            source: (0, mongo_functions_1.createObjectId)(entity.source),
            isProtected: entity.isProtected,
            displayOrder: entity.displayOrder,
            isVisible: entity.isVisible,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
            createdBy: entity.createdBy,
            updatedBy: entity.updatedBy,
            deletedBy: entity.deletedBy,
        };
    }
    createFromSchema(entitySchema) {
        return new media_1.Media((0, mongo_functions_1.fromObjectId)(entitySchema._id).toString(), entitySchema.url, entitySchema.uniqueName, entitySchema.name, entitySchema.size, entitySchema.type, (0, mongo_functions_1.fromObjectId)(entitySchema.companyId).toString(), (0, mongo_functions_1.fromObjectId)(entitySchema.userId).toString(), entitySchema.sourceType, (0, mongo_functions_1.fromObjectId)(entitySchema.source).toString(), entitySchema.isProtected, entitySchema.displayOrder, entitySchema.isVisible, entitySchema.createdAt, entitySchema.updatedAt, entitySchema.deletedAt, entitySchema.createdBy, entitySchema.updatedBy, entitySchema.deletedBy);
    }
};
exports.MediaSchemaFactory = MediaSchemaFactory;
exports.MediaSchemaFactory = MediaSchemaFactory = __decorate([
    (0, common_1.Injectable)()
], MediaSchemaFactory);


/***/ }),
/* 173 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediasController = void 0;
const common_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(69);
const cqrs_1 = __webpack_require__(41);
const platform_express_1 = __webpack_require__(174);
const medias_upload_command_1 = __webpack_require__(175);
const medias_upload_request_1 = __webpack_require__(176);
const medias_get_file_request_1 = __webpack_require__(177);
const medias_get_query_1 = __webpack_require__(178);
const medias_get_request_1 = __webpack_require__(179);
const express_1 = __webpack_require__(180);
const fs_1 = __webpack_require__(144);
const miedas_functions_1 = __webpack_require__(148);
const jwt_provider_service_1 = __webpack_require__(43);
const app_constants_1 = __webpack_require__(63);
const app_response_1 = __webpack_require__(87);
let MediasController = class MediasController {
    constructor(commandBus, queryBus, jwtProviderService) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
        this.jwtProviderService = jwtProviderService;
    }
    async upload(file, mediasUploadRequest) {
        const command = new medias_upload_command_1.MediasUploadCommand(file, mediasUploadRequest.isProtected);
        const result = await this
            .commandBus
            .execute(command);
        const response = app_response_1.AppResponse
            .create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async get(mediasGetRequest) {
        const query = new medias_get_query_1.MediasGetQuery(mediasGetRequest.id);
        const result = await this
            .queryBus
            .execute(query);
        const response = app_response_1.AppResponse
            .create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async getFile(mediasGetFileRequest, headers, res) {
        const query = new medias_get_query_1.MediasGetQuery(mediasGetFileRequest.id);
        const result = await this
            .queryBus
            .execute(query);
        if (result.isSuccess && result.data !== null) {
            const mediasResult = result.data;
            if (mediasResult.isProtected) {
                const token = headers[app_constants_1.appConstants.authorizationHeader]
                    ?.split(' ')[1];
                const result = this
                    .jwtProviderService
                    .verifyAccessToken(token);
                if (!result.isValid) {
                    throw new common_1.UnauthorizedException();
                }
            }
            res
                .setHeader('Content-Type', mediasResult.type || 'application/octet-stream');
            res
                .setHeader('Content-Disposition', `attachment; filename="${mediasResult.name}"`);
            const fileStream = (0, fs_1.createReadStream)((0, miedas_functions_1.getUploadsPathInPublicDirectory)(mediasResult.fullUrl));
            fileStream
                .pipe(res);
            return;
        }
        const response = app_response_1.AppResponse
            .create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
};
exports.MediasController = MediasController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)('file')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof Express !== "undefined" && (_d = Express.Multer) !== void 0 && _d.File) === "function" ? _e : Object, typeof (_f = typeof medias_upload_request_1.MediasUploadRequest !== "undefined" && medias_upload_request_1.MediasUploadRequest) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], MediasController.prototype, "upload", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof medias_get_request_1.MediasGetRequest !== "undefined" && medias_get_request_1.MediasGetRequest) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], MediasController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('getFile'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof medias_get_file_request_1.MediasGetFileRequest !== "undefined" && medias_get_file_request_1.MediasGetFileRequest) === "function" ? _k : Object, typeof (_l = typeof Map !== "undefined" && Map) === "function" ? _l : Object, typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], MediasController.prototype, "getFile", null);
exports.MediasController = MediasController = __decorate([
    (0, common_1.Controller)({
        path: 'web/medias',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _b : Object, typeof (_c = typeof jwt_provider_service_1.JwtProviderService !== "undefined" && jwt_provider_service_1.JwtProviderService) === "function" ? _c : Object])
], MediasController);


/***/ }),
/* 174 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediasUploadCommand = void 0;
class MediasUploadCommand {
    constructor(file, isProtected) {
        this.file = file;
        this.isProtected = isProtected;
    }
}
exports.MediasUploadCommand = MediasUploadCommand;


/***/ }),
/* 176 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediasUploadRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const app_transforms_1 = __webpack_require__(80);
class MediasUploadRequest {
}
exports.MediasUploadRequest = MediasUploadRequest;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.booleanTransform),
    __metadata("design:type", Boolean)
], MediasUploadRequest.prototype, "isProtected", void 0);


/***/ }),
/* 177 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediasGetFileRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class MediasGetFileRequest {
}
exports.MediasGetFileRequest = MediasGetFileRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MediasGetFileRequest.prototype, "id", void 0);


/***/ }),
/* 178 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediasGetQuery = void 0;
class MediasGetQuery {
    constructor(id) {
        this.id = id;
    }
}
exports.MediasGetQuery = MediasGetQuery;


/***/ }),
/* 179 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediasGetRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class MediasGetRequest {
}
exports.MediasGetRequest = MediasGetRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], MediasGetRequest.prototype, "id", void 0);


/***/ }),
/* 180 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 181 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediasUploadHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const medias_upload_command_1 = __webpack_require__(175);
const app_result_1 = __webpack_require__(27);
const medias_repository_1 = __webpack_require__(171);
const medias_result_1 = __webpack_require__(182);
const app_files_service_1 = __webpack_require__(143);
const medias_constants_1 = __webpack_require__(147);
const app_errors_1 = __webpack_require__(102);
let MediasUploadHandler = class MediasUploadHandler {
    constructor(appFilesService, mediasRepository) {
        this.appFilesService = appFilesService;
        this.mediasRepository = mediasRepository;
    }
    async execute(command) {
        const medias = await this.
            appFilesService
            .uploadMultipleFiles([
            command.file,
        ], medias_constants_1.mediasConstants.paths.temp, command.isProtected);
        if (medias === null || medias.length == 0) {
            throw app_result_1.AppResult
                .createError(app_errors_1.AppErrors
                .nullValue('medias'));
        }
        const insertedMedia = medias[0];
        await this
            .mediasRepository
            .insert(insertedMedia);
        const resultData = medias_result_1.MediasResult
            .create(insertedMedia._id, insertedMedia.url, insertedMedia.uniqueName, insertedMedia.name, insertedMedia.size, insertedMedia.type, insertedMedia.isProtected, insertedMedia.fullUrl, insertedMedia.userId, insertedMedia.companyId, insertedMedia.source, insertedMedia.sourceType);
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.MediasUploadHandler = MediasUploadHandler;
exports.MediasUploadHandler = MediasUploadHandler = __decorate([
    (0, cqrs_1.CommandHandler)(medias_upload_command_1.MediasUploadCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof app_files_service_1.AppFilesService !== "undefined" && app_files_service_1.AppFilesService) === "function" ? _a : Object, typeof (_b = typeof medias_repository_1.MediasRepository !== "undefined" && medias_repository_1.MediasRepository) === "function" ? _b : Object])
], MediasUploadHandler);


/***/ }),
/* 182 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediasResult = void 0;
class MediasResult {
    constructor(id, url, uniqueName, name, size, type, isProtected, fullUrl, userId, companyId, source, sourceType) {
        this.id = id;
        this.url = url;
        this.uniqueName = uniqueName;
        this.name = name;
        this.size = size;
        this.type = type;
        this.isProtected = isProtected;
        this.fullUrl = fullUrl;
        this.userId = userId;
        this.companyId = companyId;
        this.source = source;
        this.sourceType = sourceType;
    }
    static create(id, url, uniqueName, name, size, type, isProtected, fullUrl, userId, companyId, source, sourceType) {
        return new MediasResult(id, url, uniqueName, name, size, type, isProtected, fullUrl, userId, companyId, source, sourceType);
    }
}
exports.MediasResult = MediasResult;


/***/ }),
/* 183 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaFactory = void 0;
const common_1 = __webpack_require__(3);
const media_1 = __webpack_require__(146);
const medias_repository_1 = __webpack_require__(171);
const mongo_functions_1 = __webpack_require__(29);
let MediaFactory = class MediaFactory {
    constructor(mediasRepository) {
        this.mediasRepository = mediasRepository;
    }
    async save(id, url, uniqueName, name, size, type, isProtected, userId, companyId, source, sourceType) {
        const entity = new media_1.Media((0, mongo_functions_1.createObjectIdAsString)(id), url, uniqueName, name, size, type, (0, mongo_functions_1.createObjectIdAsString)(userId), (0, mongo_functions_1.createObjectIdAsString)(companyId), sourceType, (0, mongo_functions_1.createObjectIdAsString)(source), isProtected, 0, true, null, null, null);
        await this.mediasRepository.insert(entity);
        return entity;
    }
};
exports.MediaFactory = MediaFactory;
exports.MediaFactory = MediaFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof medias_repository_1.MediasRepository !== "undefined" && medias_repository_1.MediasRepository) === "function" ? _a : Object])
], MediaFactory);


/***/ }),
/* 184 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediasGetHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const medias_repository_1 = __webpack_require__(171);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const medias_get_query_1 = __webpack_require__(178);
const medias_result_1 = __webpack_require__(182);
let MediasGetHandler = class MediasGetHandler {
    constructor(mediasRepository) {
        this.mediasRepository = mediasRepository;
    }
    async execute(query) {
        const entity = await this.mediasRepository.getById(query.id);
        if (entity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue('object'));
        }
        const resultData = medias_result_1.MediasResult.create(entity._id.toString(), entity.url, entity.uniqueName, entity.name, entity.size, entity.type, entity.isProtected, entity.fullUrl, entity.userId.toString(), entity.companyId.toString(), entity.source.toString(), entity.sourceType);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.MediasGetHandler = MediasGetHandler;
exports.MediasGetHandler = MediasGetHandler = __decorate([
    (0, cqrs_1.QueryHandler)(medias_get_query_1.MediasGetQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof medias_repository_1.MediasRepository !== "undefined" && medias_repository_1.MediasRepository) === "function" ? _a : Object])
], MediasGetHandler);


/***/ }),
/* 185 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesModule = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(41);
const mongoose_1 = __webpack_require__(24);
const category_schema_1 = __webpack_require__(186);
const categories_repository_1 = __webpack_require__(187);
const category_schema_factory_1 = __webpack_require__(188);
const category_factory_1 = __webpack_require__(190);
const categories_upsert_handler_1 = __webpack_require__(191);
const categories_controller_1 = __webpack_require__(194);
const categories_delete_handler_1 = __webpack_require__(202);
const categories_get_handler_1 = __webpack_require__(203);
const categories_get_all_handler_1 = __webpack_require__(204);
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: category_schema_1.CategorySchema.name,
                    schema: category_schema_1.CreatedCategorySchema,
                },
            ]),
        ],
        providers: [
            categories_repository_1.CategoriesRepository,
            category_schema_factory_1.CategorySchemaFactory,
            category_factory_1.CategoryFactory,
            categories_upsert_handler_1.CategoriesUpsertHandler,
            categories_delete_handler_1.CategoriesDeleteHandler,
            categories_get_handler_1.CategoriesGetHandler,
            categories_get_all_handler_1.CategoriesGetAllHandler,
        ],
        controllers: [categories_controller_1.CategoriesController],
        exports: [categories_repository_1.CategoriesRepository],
    })
], CategoriesModule);


/***/ }),
/* 186 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatedCategorySchema = exports.CategorySchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mongodb_1 = __webpack_require__(30);
const schemas_names_1 = __webpack_require__(34);
const base_with_Info_schema_1 = __webpack_require__(37);
let CategorySchema = class CategorySchema extends base_with_Info_schema_1.BaseWithInfoSchema {
};
exports.CategorySchema = CategorySchema;
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
    }),
    __metadata("design:type", String)
], CategorySchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
    }),
    __metadata("design:type", String)
], CategorySchema.prototype, "TagName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: CategorySchema.name,
    }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], CategorySchema.prototype, "parentId", void 0);
exports.CategorySchema = CategorySchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.categories,
        versionKey: false,
        timestamps: false,
    })
], CategorySchema);
exports.CreatedCategorySchema = mongoose_1.SchemaFactory
    .createForClass(CategorySchema);
exports.CreatedCategorySchema
    .virtual('parent', {
    ref: CategorySchema.name,
    localField: 'parentId',
    foreignField: '_id',
    justOne: true,
});
exports.CreatedCategorySchema
    .set('toJSON', {
    virtuals: true,
});
exports.CreatedCategorySchema
    .set('toObject', {
    virtuals: true,
});


/***/ }),
/* 187 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const base_repository_1 = __webpack_require__(26);
const category_schema_1 = __webpack_require__(186);
const category_schema_factory_1 = __webpack_require__(188);
let CategoriesRepository = class CategoriesRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
};
exports.CategoriesRepository = CategoriesRepository;
exports.CategoriesRepository = CategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.CategorySchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof category_schema_factory_1.CategorySchemaFactory !== "undefined" && category_schema_factory_1.CategorySchemaFactory) === "function" ? _b : Object])
], CategoriesRepository);


/***/ }),
/* 188 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategorySchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const category_1 = __webpack_require__(189);
const mongo_functions_1 = __webpack_require__(29);
let CategorySchemaFactory = class CategorySchemaFactory {
    create(entity) {
        return {
            _id: (0, mongo_functions_1.createObjectId)(entity._id),
            name: entity.name,
            TagName: entity.TagName,
            parentId: entity.parentId === null ?
                null
                :
                    (0, mongo_functions_1.createObjectId)(entity.parentId),
            parent: null,
            displayOrder: entity.displayOrder,
            isVisible: entity.isVisible,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
            createdBy: entity.createdBy,
            updatedBy: entity.updatedBy,
            deletedBy: entity.deletedBy,
        };
    }
    createFromSchema(entitySchema) {
        return new category_1.Category((0, mongo_functions_1.fromObjectId)(entitySchema._id), entitySchema.name, entitySchema.TagName, (0, mongo_functions_1.fromObjectId)(entitySchema.parentId), entitySchema.parent, entitySchema.displayOrder, entitySchema.isVisible, entitySchema.createdAt, entitySchema.updatedAt, entitySchema.deletedAt, entitySchema.createdBy, entitySchema.updatedBy, entitySchema.deletedBy);
    }
};
exports.CategorySchemaFactory = CategorySchemaFactory;
exports.CategorySchemaFactory = CategorySchemaFactory = __decorate([
    (0, common_1.Injectable)()
], CategorySchemaFactory);


/***/ }),
/* 189 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = void 0;
const cqrs_1 = __webpack_require__(41);
class Category extends cqrs_1.AggregateRoot {
    constructor(_id, name, TagName, parentId, parent, displayOrder, isVisible, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy) {
        super();
        this._id = _id;
        this.name = name;
        this.TagName = TagName;
        this.parentId = parentId;
        this.parent = parent;
        this.displayOrder = displayOrder;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
}
exports.Category = Category;


/***/ }),
/* 190 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryFactory = void 0;
const common_1 = __webpack_require__(3);
const category_1 = __webpack_require__(189);
const categories_repository_1 = __webpack_require__(187);
const mongo_functions_1 = __webpack_require__(29);
let CategoryFactory = class CategoryFactory {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async save(id, name, TagName, parentId, displayOrder) {
        const isInsert = id === null || id === undefined || id === "null";
        if (isInsert) {
            const entity = new category_1.Category((0, mongo_functions_1.createObjectIdAsString)(id), name, TagName, parentId, null, displayOrder, true, null, null, null, null, null, null);
            console.log("entity", entity);
            await this.categoriesRepository.insert(entity);
            return entity;
        }
        const foundEntity = await this.categoriesRepository.getById(id);
        if (foundEntity == null) {
            return null;
        }
        foundEntity.name = name;
        foundEntity.TagName = TagName;
        foundEntity.parentId = parentId;
        foundEntity.displayOrder = displayOrder;
        const updatedEntity = await this.categoriesRepository.getAndUpdate({
            _id: (0, mongo_functions_1.createObjectId)(id),
        }, foundEntity);
        return updatedEntity;
    }
};
exports.CategoryFactory = CategoryFactory;
exports.CategoryFactory = CategoryFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof categories_repository_1.CategoriesRepository !== "undefined" && categories_repository_1.CategoriesRepository) === "function" ? _a : Object])
], CategoryFactory);


/***/ }),
/* 191 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesUpsertHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const categories_upsert_command_1 = __webpack_require__(192);
const categories_get_result_1 = __webpack_require__(193);
const category_factory_1 = __webpack_require__(190);
const app_errors_1 = __webpack_require__(102);
let CategoriesUpsertHandler = class CategoriesUpsertHandler {
    constructor(categoryFactory) {
        this.categoryFactory = categoryFactory;
    }
    async execute(command) {
        const entity = await this.categoryFactory.save(command.id, command.name, command.TagName, command.parentId, command.displayOrder);
        if (entity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("category"));
        }
        const resultData = categories_get_result_1.CategoriesGetResult.create(entity._id, entity.name, entity.TagName, entity.parentId, null, entity.displayOrder);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.CategoriesUpsertHandler = CategoriesUpsertHandler;
exports.CategoriesUpsertHandler = CategoriesUpsertHandler = __decorate([
    (0, cqrs_1.CommandHandler)(categories_upsert_command_1.CategoriesUpsertCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof category_factory_1.CategoryFactory !== "undefined" && category_factory_1.CategoryFactory) === "function" ? _a : Object])
], CategoriesUpsertHandler);


/***/ }),
/* 192 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesUpsertCommand = void 0;
class CategoriesUpsertCommand {
    constructor(id, name, TagName, parentId, displayOrder) {
        this.id = id;
        this.name = name;
        this.TagName = TagName;
        this.parentId = parentId;
        this.displayOrder = displayOrder;
    }
}
exports.CategoriesUpsertCommand = CategoriesUpsertCommand;


/***/ }),
/* 193 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesGetResult = void 0;
class CategoriesGetResult {
    constructor(id, name, TagName, parentId, parent, displayOrder) {
        this.id = id;
        this.name = name;
        this.TagName = TagName;
        this.parentId = parentId;
        this.parent = parent;
        this.displayOrder = displayOrder;
    }
    static create(id, name, TagName, parentId, parent, displayOrder) {
        return new CategoriesGetResult(id, name, TagName, parentId, parent, displayOrder);
    }
}
exports.CategoriesGetResult = CategoriesGetResult;


/***/ }),
/* 194 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesController = void 0;
const common_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(69);
const cqrs_1 = __webpack_require__(41);
const categories_upsert_command_1 = __webpack_require__(192);
const categories_upsert_request_1 = __webpack_require__(195);
const categories_delete_request_1 = __webpack_require__(196);
const categories_delete_command_1 = __webpack_require__(197);
const categories_get_query_1 = __webpack_require__(198);
const categories_get_request_1 = __webpack_require__(199);
const categories_get_all_request_1 = __webpack_require__(200);
const categories_get_all_query_1 = __webpack_require__(201);
const roles_guard_1 = __webpack_require__(85);
const roles_decorator_1 = __webpack_require__(86);
const role_enum_1 = __webpack_require__(74);
const app_response_1 = __webpack_require__(87);
let CategoriesController = class CategoriesController {
    constructor(queryBus, commandBus) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    async upsert(usersUpsertRequest) {
        const command = new categories_upsert_command_1.CategoriesUpsertCommand(usersUpsertRequest.id, usersUpsertRequest.name, usersUpsertRequest.TagName, usersUpsertRequest.parentId, usersUpsertRequest.displayOrder);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async delete(categoriesDeleteRequest) {
        const command = new categories_delete_command_1.CategoriesDeleteCommand(categoriesDeleteRequest.id);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, null, null, result.error);
        return response;
    }
    async get(categoriesGetRequest) {
        const query = new categories_get_query_1.CategoriesGetQuery(categoriesGetRequest.id);
        const result = await this.queryBus.execute(query);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async getAll(categoriesGetAllRequest) {
        const query = new categories_get_all_query_1.CategoriesGetAllQuery(categoriesGetAllRequest.pageSize, categoriesGetAllRequest.pageNumber, categoriesGetAllRequest.withPaging, categoriesGetAllRequest.search, categoriesGetAllRequest.parentId);
        const result = await this.queryBus.execute(query);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    (0, common_1.Post)("upsert"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof categories_upsert_request_1.CategoriesUpsertRequest !== "undefined" && categories_upsert_request_1.CategoriesUpsertRequest) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CategoriesController.prototype, "upsert", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.RoleEnum.ADMIN),
    (0, common_1.Delete)("delete"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof categories_delete_request_1.CategoriesDeleteRequest !== "undefined" && categories_delete_request_1.CategoriesDeleteRequest) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CategoriesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("get"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof categories_get_request_1.CategoriesGetRequest !== "undefined" && categories_get_request_1.CategoriesGetRequest) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CategoriesController.prototype, "get", null);
__decorate([
    (0, common_1.Get)("getAll"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof categories_get_all_request_1.CategoriesGetAllRequest !== "undefined" && categories_get_all_request_1.CategoriesGetAllRequest) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], CategoriesController.prototype, "getAll", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({
        path: "web/categories",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object])
], CategoriesController);


/***/ }),
/* 195 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesUpsertRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class CategoriesUpsertRequest {
}
exports.CategoriesUpsertRequest = CategoriesUpsertRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CategoriesUpsertRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategoriesUpsertRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CategoriesUpsertRequest.prototype, "TagName", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CategoriesUpsertRequest.prototype, "parentId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CategoriesUpsertRequest.prototype, "displayOrder", void 0);


/***/ }),
/* 196 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesDeleteRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class CategoriesDeleteRequest {
}
exports.CategoriesDeleteRequest = CategoriesDeleteRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CategoriesDeleteRequest.prototype, "id", void 0);


/***/ }),
/* 197 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesDeleteCommand = void 0;
class CategoriesDeleteCommand {
    constructor(id) {
        this.id = id;
    }
}
exports.CategoriesDeleteCommand = CategoriesDeleteCommand;


/***/ }),
/* 198 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesGetQuery = void 0;
class CategoriesGetQuery {
    constructor(id) {
        this.id = id;
    }
}
exports.CategoriesGetQuery = CategoriesGetQuery;


/***/ }),
/* 199 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesGetRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class CategoriesGetRequest {
}
exports.CategoriesGetRequest = CategoriesGetRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CategoriesGetRequest.prototype, "id", void 0);


/***/ }),
/* 200 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesGetAllRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const app_paging_request_1 = __webpack_require__(79);
const app_transforms_1 = __webpack_require__(80);
class CategoriesGetAllRequest extends app_paging_request_1.AppPagingRequest {
    constructor() {
        super(...arguments);
        this.search = null;
        this.parentId = null;
    }
}
exports.CategoriesGetAllRequest = CategoriesGetAllRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], CategoriesGetAllRequest.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], CategoriesGetAllRequest.prototype, "parentId", void 0);


/***/ }),
/* 201 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesGetAllQuery = void 0;
class CategoriesGetAllQuery {
    constructor(pageSize, pageNumber, withPaging, search, parentId) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.withPaging = withPaging;
        this.search = search;
        this.parentId = parentId;
    }
}
exports.CategoriesGetAllQuery = CategoriesGetAllQuery;


/***/ }),
/* 202 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesDeleteHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const categories_repository_1 = __webpack_require__(187);
const categories_delete_command_1 = __webpack_require__(197);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
let CategoriesDeleteHandler = class CategoriesDeleteHandler {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async execute(command) {
        const isDeleted = await this.categoriesRepository.deleteById(command.id);
        if (!isDeleted) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.operationFailed());
        }
        return app_result_1.AppResult.createSuccess(null, null, null);
    }
};
exports.CategoriesDeleteHandler = CategoriesDeleteHandler;
exports.CategoriesDeleteHandler = CategoriesDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(categories_delete_command_1.CategoriesDeleteCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof categories_repository_1.CategoriesRepository !== "undefined" && categories_repository_1.CategoriesRepository) === "function" ? _a : Object])
], CategoriesDeleteHandler);


/***/ }),
/* 203 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesGetHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const categories_repository_1 = __webpack_require__(187);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const categories_get_query_1 = __webpack_require__(198);
const categories_get_result_1 = __webpack_require__(193);
let CategoriesGetHandler = class CategoriesGetHandler {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async execute(query) {
        const entity = await this.categoriesRepository.getById(query.id, {}, [
            {
                path: "parent",
                select: "",
            },
        ]);
        if (entity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("object"));
        }
        const resultData = categories_get_result_1.CategoriesGetResult.create(entity._id, entity.name, entity.TagName, entity.parentId, entity.parentId === null || entity.parent === null ?
            null
            : categories_get_result_1.CategoriesGetResult.create(entity.parent._id, entity.parent.name, entity.parent.TagName, entity.parent.parentId, null, entity.parent.displayOrder), entity.displayOrder);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.CategoriesGetHandler = CategoriesGetHandler;
exports.CategoriesGetHandler = CategoriesGetHandler = __decorate([
    (0, cqrs_1.QueryHandler)(categories_get_query_1.CategoriesGetQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof categories_repository_1.CategoriesRepository !== "undefined" && categories_repository_1.CategoriesRepository) === "function" ? _a : Object])
], CategoriesGetHandler);


/***/ }),
/* 204 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesGetAllHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const categories_repository_1 = __webpack_require__(187);
const app_result_1 = __webpack_require__(27);
const categories_get_all_query_1 = __webpack_require__(201);
const categories_get_all_result_1 = __webpack_require__(205);
const reg_ex_functions_1 = __webpack_require__(99);
const mongo_functions_1 = __webpack_require__(29);
const order_by_enum_1 = __webpack_require__(100);
const order_direction_enum_1 = __webpack_require__(32);
const categories_get_result_1 = __webpack_require__(193);
let CategoriesGetAllHandler = class CategoriesGetAllHandler {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async execute(query) {
        const filter = {};
        if (query.search !== null) {
            filter.$or = [
                {
                    name: (0, reg_ex_functions_1.searchRegEx)(query.search),
                    TagName: (0, reg_ex_functions_1.searchRegEx)(query.search),
                },
            ];
        }
        if (query.parentId === 'null') {
            filter.parentId = null;
        }
        else if (query.parentId != null && query.parentId !== 'null') {
            filter.parentId =
                (0, mongo_functions_1.createObjectId)(query.parentId);
        }
        const result = await this
            .categoriesRepository
            .getAllAsResult(filter, {}, [
            {
                path: 'parent',
                select: '',
            },
        ], query.pageSize, query.pageNumber, query.withPaging, [
            {
                field: order_by_enum_1.OrderByEnum.NAME,
                direction: order_direction_enum_1.OrderDirectionEnum.ASC,
            },
        ]);
        const entitiesResults = result
            .data
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((element) => {
            return categories_get_all_result_1.CategoriesGetAllResult
                .create(element._id, element.name, element.TagName, element.parentId, element.parentId === null || element.parent === null ?
                null
                :
                    categories_get_result_1.CategoriesGetResult
                        .create(element.parent._id, element.parent.name, element.parent.TagName, element.parent.parentId, null, element.parent.displayOrder), element.displayOrder);
        });
        return app_result_1.AppResult
            .createSuccess(null, null, entitiesResults, result.paging);
    }
};
exports.CategoriesGetAllHandler = CategoriesGetAllHandler;
exports.CategoriesGetAllHandler = CategoriesGetAllHandler = __decorate([
    (0, cqrs_1.QueryHandler)(categories_get_all_query_1.CategoriesGetAllQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof categories_repository_1.CategoriesRepository !== "undefined" && categories_repository_1.CategoriesRepository) === "function" ? _a : Object])
], CategoriesGetAllHandler);


/***/ }),
/* 205 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesGetAllResult = void 0;
class CategoriesGetAllResult {
    constructor(id, name, TagName, parentId, parent, displayOrder) {
        this.id = id;
        this.name = name;
        this.TagName = TagName;
        this.parentId = parentId;
        this.parent = parent;
        this.displayOrder = displayOrder;
    }
    static create(id, name, TagName, parentId, parent, displayOrder) {
        return new CategoriesGetAllResult(id, name, TagName, parentId, parent, displayOrder);
    }
}
exports.CategoriesGetAllResult = CategoriesGetAllResult;


/***/ }),
/* 206 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(3);
const app_configs_module_1 = __webpack_require__(14);
const mongoose_1 = __webpack_require__(24);
const app_configs_service_1 = __webpack_require__(7);
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_configs_module_1.AppConfigsModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [
                    app_configs_module_1.AppConfigsModule,
                ],
                inject: [
                    app_configs_service_1.AppConfigsService,
                ],
                useFactory: async (appConfigsService) => {
                    try {
                        const uri = appConfigsService.databaseConfig.uri;
                        console.
                            log('Connecting to MongoDB with URI:', uri);
                        return {
                            uri,
                        };
                    }
                    catch (error) {
                        console
                            .error('Error connecting to MongoDB:', error);
                        throw error;
                    }
                },
            }),
        ],
        providers: [],
        exports: [],
    })
], DatabaseModule);


/***/ }),
/* 207 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesModule = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(41);
const mongoose_1 = __webpack_require__(24);
const companies_delete_handler_1 = __webpack_require__(208);
const companies_upsert_handler_1 = __webpack_require__(216);
const company_factory_1 = __webpack_require__(218);
const companies_get_handler_1 = __webpack_require__(221);
const companies_get_all_handler_1 = __webpack_require__(223);
const company_schema_factory_1 = __webpack_require__(214);
const companies_repository_1 = __webpack_require__(210);
const company_schema_1 = __webpack_require__(211);
const companies_controller_1 = __webpack_require__(226);
const companies_getMy_handler_1 = __webpack_require__(242);
const user_company_schema_1 = __webpack_require__(234);
const user_companies_repository_1 = __webpack_require__(233);
const companies_service_1 = __webpack_require__(232);
const user_companies_service_1 = __webpack_require__(235);
const categories_module_1 = __webpack_require__(185);
const users_module_1 = __webpack_require__(67);
let CompaniesModule = class CompaniesModule {
};
exports.CompaniesModule = CompaniesModule;
exports.CompaniesModule = CompaniesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            categories_module_1.CategoriesModule,
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: company_schema_1.CompanySchema.name,
                    schema: mongoose_1.SchemaFactory
                        .createForClass(company_schema_1.CompanySchema),
                },
                {
                    name: user_company_schema_1.UserCompaniesSchema.name,
                    schema: mongoose_1.SchemaFactory.createForClass(user_company_schema_1.UserCompaniesSchema),
                },
            ]),
        ],
        providers: [
            companies_service_1.CompaniesService,
            companies_repository_1.CompaniesRepository,
            company_schema_factory_1.CompanySchemaFactory,
            company_factory_1.CompanyFactory,
            companies_upsert_handler_1.CompaniesUpsertHandler,
            companies_delete_handler_1.CompaniesDeleteHandler,
            companies_get_handler_1.CompaniesGetHandler,
            companies_getMy_handler_1.CompaniesGetMyHandler,
            companies_get_all_handler_1.CompaniesGetAllHandler,
            user_companies_repository_1.UserCompaniesRepository,
            user_companies_service_1.UserCompaniesService,
        ],
        controllers: [
            companies_controller_1.CompaniesController,
        ],
        exports: [
            companies_service_1.CompaniesService,
            companies_repository_1.CompaniesRepository,
            company_schema_factory_1.CompanySchemaFactory,
            company_factory_1.CompanyFactory,
            user_companies_repository_1.UserCompaniesRepository,
            user_companies_service_1.UserCompaniesService,
        ],
    })
], CompaniesModule);


/***/ }),
/* 208 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesDeleteHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const companies_delete_command_1 = __webpack_require__(209);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const companies_repository_1 = __webpack_require__(210);
let CompaniesDeleteHandler = class CompaniesDeleteHandler {
    constructor(companiesRepository) {
        this.companiesRepository = companiesRepository;
    }
    async execute(command) {
        const entity = await this
            .companiesRepository
            .getById(command.id);
        if (entity === null) {
            throw app_result_1.AppResult
                .createError(app_errors_1.AppErrors
                .nullValue('object'));
        }
        if (command.userId != entity.userId) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.notRelateToYourAccount());
        }
        const isDeleted = await this
            .companiesRepository
            .deleteById(command.id);
        if (!isDeleted) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.operationFailed());
        }
        return app_result_1.AppResult
            .createSuccess(null, null, null);
    }
};
exports.CompaniesDeleteHandler = CompaniesDeleteHandler;
exports.CompaniesDeleteHandler = CompaniesDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(companies_delete_command_1.CompaniesDeleteCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _a : Object])
], CompaniesDeleteHandler);


/***/ }),
/* 209 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesDeleteCommand = void 0;
class CompaniesDeleteCommand {
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
    }
}
exports.CompaniesDeleteCommand = CompaniesDeleteCommand;


/***/ }),
/* 210 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const base_repository_1 = __webpack_require__(26);
const company_schema_1 = __webpack_require__(211);
const company_schema_factory_1 = __webpack_require__(214);
const mongodb_1 = __webpack_require__(30);
let CompaniesRepository = class CompaniesRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
    async updateItemNr(companyId, itemNr) {
        const company = await this.getById(companyId);
        if (company) {
            company.itemNr = itemNr;
            await this.getAndUpdate({ _id: new mongodb_1.ObjectId(companyId) }, company);
        }
    }
    async updateTenderNr(companyId, TenderNr) {
        const company = await this.getById(companyId);
        if (company) {
            company.TenderNr = TenderNr;
            await this.getAndUpdate({ _id: new mongodb_1.ObjectId(companyId) }, company);
        }
    }
    async updateOpportunityNr(companyId, OpportunityNr) {
        const company = await this.getById(companyId);
        if (company) {
            company.OpportunityNr = OpportunityNr;
            await this.getAndUpdate({ _id: new mongodb_1.ObjectId(companyId) }, company);
        }
    }
    async updateOrderNr(companyId, OrderNr) {
        const company = await this.getById(companyId);
        if (company) {
            company.orderNr = OrderNr;
            await this.getAndUpdate({ _id: new mongodb_1.ObjectId(companyId) }, company);
        }
    }
    async getByRegistrationNumber(registrationNumber) {
        const entity = await this
            .get({
            registrationNumber: registrationNumber
        });
        return entity;
    }
    async getByCompanyNr(companyNr) {
        return this.getByCompanyNr(companyNr);
    }
    async getCompanyByUserId(userId) {
        const entity = await this
            .get({
            userId: new mongodb_1.ObjectId(userId)
        });
        return entity;
    }
};
exports.CompaniesRepository = CompaniesRepository;
exports.CompaniesRepository = CompaniesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(company_schema_1.CompanySchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof company_schema_factory_1.CompanySchemaFactory !== "undefined" && company_schema_factory_1.CompanySchemaFactory) === "function" ? _b : Object])
], CompaniesRepository);


/***/ }),
/* 211 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanySchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mongodb_1 = __webpack_require__(30);
const base_with_Info_schema_1 = __webpack_require__(37);
const company_owner_type_enum_1 = __webpack_require__(212);
const company_type_enum_1 = __webpack_require__(213);
const schemas_names_1 = __webpack_require__(34);
const category_schema_1 = __webpack_require__(186);
const user_schema_1 = __webpack_require__(36);
let CompanySchema = class CompanySchema extends base_with_Info_schema_1.BaseWithInfoSchema {
};
exports.CompanySchema = CompanySchema;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CompanySchema.prototype, "nameAr", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "nameEn", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "website", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "region", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CompanySchema.prototype, "registrationNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: company_owner_type_enum_1.CompanyOwnerTypeEnum.OWNER }),
    __metadata("design:type", String)
], CompanySchema.prototype, "ownerType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "stampedAuthorizationFormUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "authorizationFileUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "registeringFileUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.Date }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CompanySchema.prototype, "registrationExpirationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CompanySchema.prototype, "creationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "placeOfIssue", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CompanySchema.prototype, "turnover", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: company_type_enum_1.CompanyTypeEnum.ESTABLISHMENT }),
    __metadata("design:type", String)
], CompanySchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "activities", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: [],
        type: [
            {
                type: mongoose_2.Types.ObjectId,
                ref: category_schema_1.CategorySchema.name,
            },
        ],
    }),
    __metadata("design:type", Array)
], CompanySchema.prototype, "categoriesIds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "logoMedia", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "taxInformation", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "deliveryAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CompanySchema.prototype, "employeesNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "CompanyNr", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CompanySchema.prototype, "itemNr", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CompanySchema.prototype, "orderNr", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CompanySchema.prototype, "TenderNr", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CompanySchema.prototype, "OpportunityNr", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CompanySchema.prototype, "contactInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchema.name,
    }),
    __metadata("design:type", typeof (_c = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _c : Object)
], CompanySchema.prototype, "userId", void 0);
exports.CompanySchema = CompanySchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.companies,
        versionKey: false,
        timestamps: false,
    })
], CompanySchema);


/***/ }),
/* 212 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanyOwnerTypeEnum = void 0;
var CompanyOwnerTypeEnum;
(function (CompanyOwnerTypeEnum) {
    CompanyOwnerTypeEnum["OWNER"] = "Owner";
    CompanyOwnerTypeEnum["AUTHORIZED"] = "Authorized";
})(CompanyOwnerTypeEnum || (exports.CompanyOwnerTypeEnum = CompanyOwnerTypeEnum = {}));


/***/ }),
/* 213 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanyTypeEnum = void 0;
var CompanyTypeEnum;
(function (CompanyTypeEnum) {
    CompanyTypeEnum["ESTABLISHMENT"] = "Establishment";
})(CompanyTypeEnum || (exports.CompanyTypeEnum = CompanyTypeEnum = {}));


/***/ }),
/* 214 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanySchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const company_1 = __webpack_require__(215);
const mongo_functions_1 = __webpack_require__(29);
let CompanySchemaFactory = class CompanySchemaFactory {
    create(entity) {
        return {
            _id: (0, mongo_functions_1.createObjectId)(entity._id),
            nameAr: entity.nameAr,
            nameEn: entity.nameEn,
            website: entity.website,
            address: entity.address,
            region: entity.region,
            city: entity.city,
            registrationNumber: entity.registrationNumber,
            ownerType: entity.ownerType,
            stampedAuthorizationFormUrl: entity.stampedAuthorizationFormUrl,
            registrationExpirationDate: entity.registrationExpirationDate,
            creationDate: entity.creationDate,
            placeOfIssue: entity.placeOfIssue,
            turnover: entity.turnover,
            type: entity.type,
            activities: entity.activities,
            categoriesIds: (0, mongo_functions_1.createObjectIds)(entity.categoriesIds),
            logoMedia: entity.logoMedia,
            authorizationFileUrl: entity.authorizationFileUrl,
            registeringFileUrl: entity.registeringFileUrl,
            contactInfo: entity.contactInfo,
            userId: (0, mongo_functions_1.createObjectId)(entity.userId),
            taxInformation: entity.taxInformation,
            deliveryAddress: entity.deliveryAddress,
            employeesNumber: entity.employeesNumber,
            CompanyNr: entity.CompanyNr,
            itemNr: entity.itemNr,
            orderNr: entity.orderNr,
            TenderNr: entity.TenderNr,
            OpportunityNr: entity.OpportunityNr,
            displayOrder: entity.displayOrder,
            isVisible: entity.isVisible,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
            createdBy: entity.createdBy,
            updatedBy: entity.updatedBy,
            deletedBy: entity.deletedBy,
        };
    }
    createFromSchema(entitySchema) {
        return new company_1.Company((0, mongo_functions_1.fromObjectId)(entitySchema._id), entitySchema.nameAr, entitySchema.nameEn, entitySchema.website, entitySchema.address, entitySchema.region, entitySchema.city, entitySchema.registrationNumber, entitySchema.ownerType, entitySchema.stampedAuthorizationFormUrl, entitySchema.registrationExpirationDate, entitySchema.creationDate, entitySchema.placeOfIssue, entitySchema.turnover, entitySchema.type, entitySchema.activities, (0, mongo_functions_1.fromObjectIds)(entitySchema.categoriesIds), entitySchema.logoMedia, entitySchema.authorizationFileUrl, entitySchema.registeringFileUrl, entitySchema.contactInfo, (0, mongo_functions_1.fromObjectId)(entitySchema.userId), entitySchema.taxInformation, entitySchema.deliveryAddress, entitySchema.employeesNumber, entitySchema.CompanyNr, entitySchema.itemNr, entitySchema.orderNr, entitySchema.TenderNr, entitySchema.OpportunityNr, entitySchema.displayOrder, entitySchema.isVisible, entitySchema.createdAt, entitySchema.updatedAt, entitySchema.deletedAt, entitySchema.createdBy, entitySchema.updatedBy, entitySchema.deletedBy);
    }
};
exports.CompanySchemaFactory = CompanySchemaFactory;
exports.CompanySchemaFactory = CompanySchemaFactory = __decorate([
    (0, common_1.Injectable)()
], CompanySchemaFactory);


/***/ }),
/* 215 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Company = void 0;
const cqrs_1 = __webpack_require__(41);
class Company extends cqrs_1.AggregateRoot {
    constructor(_id, nameAr, nameEn, website, address, region, city, registrationNumber = '', ownerType, stampedAuthorizationFormUrl, registrationExpirationDate, creationDate, placeOfIssue, turnover, type, activities, categoriesIds, logoMedia, authorizationFileUrl, registeringFileUrl, contactInfo, userId = '', taxInformation, deliveryAddress, employeesNumber, CompanyNr, itemNr, orderNr, TenderNr, OpportunityNr, displayOrder = 0, isVisible = true, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy) {
        super();
        this._id = _id;
        this.nameAr = nameAr;
        this.nameEn = nameEn;
        this.website = website;
        this.address = address;
        this.region = region;
        this.city = city;
        this.registrationNumber = registrationNumber;
        this.ownerType = ownerType;
        this.stampedAuthorizationFormUrl = stampedAuthorizationFormUrl;
        this.registrationExpirationDate = registrationExpirationDate;
        this.creationDate = creationDate;
        this.placeOfIssue = placeOfIssue;
        this.turnover = turnover;
        this.type = type;
        this.activities = activities;
        this.categoriesIds = categoriesIds;
        this.logoMedia = logoMedia;
        this.authorizationFileUrl = authorizationFileUrl;
        this.registeringFileUrl = registeringFileUrl;
        this.contactInfo = contactInfo;
        this.userId = userId;
        this.taxInformation = taxInformation;
        this.deliveryAddress = deliveryAddress;
        this.employeesNumber = employeesNumber;
        this.CompanyNr = CompanyNr;
        this.itemNr = itemNr;
        this.orderNr = orderNr;
        this.TenderNr = TenderNr;
        this.OpportunityNr = OpportunityNr;
        this.displayOrder = displayOrder;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
}
exports.Company = Company;


/***/ }),
/* 216 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesUpsertHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const companies_upsert_command_1 = __webpack_require__(217);
const app_result_1 = __webpack_require__(27);
const companies_repository_1 = __webpack_require__(210);
const company_factory_1 = __webpack_require__(218);
const companies_error_1 = __webpack_require__(219);
const companies_get_result_1 = __webpack_require__(220);
const app_errors_1 = __webpack_require__(102);
const categories_repository_1 = __webpack_require__(187);
const users_repository_1 = __webpack_require__(45);
let CompaniesUpsertHandler = class CompaniesUpsertHandler {
    constructor(companiesRepository, CategoriesRepository, companyFactory, usersRepository, eventPublisher) {
        this.companiesRepository = companiesRepository;
        this.CategoriesRepository = CategoriesRepository;
        this.companyFactory = companyFactory;
        this.usersRepository = usersRepository;
        this.eventPublisher = eventPublisher;
    }
    async execute(command) {
        const isInsert = command.id === null || command.id === undefined || command.id === "null";
        console.log(command.categoriesIds);
        if (command.categoriesIds) {
            const uniqueCategoryIds = [...new Set(command.categoriesIds)];
            const categories = await Promise.all(uniqueCategoryIds.map(async (categoryId) => {
                const category = await this.CategoriesRepository.getById(categoryId);
                if (category === null) {
                    throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("category"));
                }
                return category;
            }));
            command = { ...command, categoriesIds: categories.map((category) => category._id) };
        }
        if (command.userId) {
            const user = await this.usersRepository.getById(command.userId);
            if (user === null) {
                throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("user"));
            }
        }
        if (isInsert) {
            const foundEntity = await this.companiesRepository.getByRegistrationNumber(command.registrationNumber);
            if (foundEntity !== null) {
                throw app_result_1.AppResult.createError(companies_error_1.CompaniesError.duplicateRegistrationNumber);
            }
        }
        if (!isInsert) {
            const foundEntity = await this.companiesRepository.getById(command.id);
            if (foundEntity === null) {
                throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("company"));
            }
            if (command.userId !== foundEntity.userId) {
                throw app_result_1.AppResult.createError(app_errors_1.AppErrors.notRelateToYourAccount());
            }
        }
        const generateUniqueCompanyNr = async () => {
            let companyNr;
            let isUnique = false;
            do {
                companyNr = Math.floor(100000 + Math.random() * 900000).toString();
                const existingCompany = await this.companiesRepository.getByCompanyNr(companyNr);
                isUnique = !existingCompany;
            } while (!isUnique);
            return companyNr;
        };
        const companyNr = command.CompanyNr && command.CompanyNr.toString() !== "null" ?
            command.CompanyNr.toString()
            : await generateUniqueCompanyNr();
        let entity = await this.companyFactory.save(command.id, command.nameAr, command.nameEn, command.website, command.address, command.region, command.city, command.registrationNumber, command.ownerType, command.stampedAuthorizationFormUrl, command.registrationExpirationDate, command.creationDate, command.placeOfIssue, command.turnover, command.type, command.activities, command.categoriesIds, command.logoMedia, command.authorizationFileUrl, command.registeringFileUrl, command.contactInfo, command.userId, command.taxInformation, command.deliveryAddress, command.employeesNumber, companyNr, command.itemNr || 0, command.orderNr || 0, command.TenderNr || 0, command.OpportunityNr || 0);
        entity = this.eventPublisher.mergeObjectContext(entity);
        entity.commit();
        const resultData = companies_get_result_1.CompaniesGetResult.create(entity._id, entity.nameAr, entity.nameEn, entity.website, entity.address, entity.region, entity.city, entity.registrationNumber, entity.ownerType, command.stampedAuthorizationFormUrl, entity.registrationExpirationDate, entity.creationDate, entity.placeOfIssue, entity.turnover, entity.type, entity.activities, entity.categoriesIds, command.logoMedia, command.authorizationFileUrl, command.registeringFileUrl, entity.contactInfo, entity.userId, entity.taxInformation, entity.deliveryAddress, entity.employeesNumber, companyNr, entity.itemNr, entity.orderNr, entity.TenderNr, entity.OpportunityNr);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.CompaniesUpsertHandler = CompaniesUpsertHandler;
exports.CompaniesUpsertHandler = CompaniesUpsertHandler = __decorate([
    (0, cqrs_1.CommandHandler)(companies_upsert_command_1.CompaniesUpsertCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _a : Object, typeof (_b = typeof categories_repository_1.CategoriesRepository !== "undefined" && categories_repository_1.CategoriesRepository) === "function" ? _b : Object, typeof (_c = typeof company_factory_1.CompanyFactory !== "undefined" && company_factory_1.CompanyFactory) === "function" ? _c : Object, typeof (_d = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _d : Object, typeof (_e = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _e : Object])
], CompaniesUpsertHandler);


/***/ }),
/* 217 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesUpsertCommand = void 0;
class CompaniesUpsertCommand {
    constructor(id, nameAr, nameEn, website, address, region, city, registrationNumber, ownerType, stampedAuthorizationFormUrl, registrationExpirationDate, creationDate, placeOfIssue, turnover, type, activities, categoriesIds, logoMedia, authorizationFileUrl, registeringFileUrl, contactInfo, userId = '', taxInformation, deliveryAddress, employeesNumber, CompanyNr, itemNr, orderNr, TenderNr, OpportunityNr) {
        this.id = id;
        this.nameAr = nameAr;
        this.nameEn = nameEn;
        this.website = website;
        this.address = address;
        this.region = region;
        this.city = city;
        this.registrationNumber = registrationNumber;
        this.ownerType = ownerType;
        this.stampedAuthorizationFormUrl = stampedAuthorizationFormUrl;
        this.registrationExpirationDate = registrationExpirationDate;
        this.creationDate = creationDate;
        this.placeOfIssue = placeOfIssue;
        this.turnover = turnover;
        this.type = type;
        this.activities = activities;
        this.categoriesIds = categoriesIds;
        this.logoMedia = logoMedia;
        this.authorizationFileUrl = authorizationFileUrl;
        this.registeringFileUrl = registeringFileUrl;
        this.contactInfo = contactInfo;
        this.userId = userId;
        this.taxInformation = taxInformation;
        this.deliveryAddress = deliveryAddress;
        this.employeesNumber = employeesNumber;
        this.CompanyNr = CompanyNr;
        this.itemNr = itemNr;
        this.orderNr = orderNr;
        this.TenderNr = TenderNr;
        this.OpportunityNr = OpportunityNr;
    }
}
exports.CompaniesUpsertCommand = CompaniesUpsertCommand;


/***/ }),
/* 218 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanyFactory = void 0;
const common_1 = __webpack_require__(3);
const company_1 = __webpack_require__(215);
const companies_repository_1 = __webpack_require__(210);
const mongo_functions_1 = __webpack_require__(29);
let CompanyFactory = class CompanyFactory {
    constructor(companiesRepository) {
        this.companiesRepository = companiesRepository;
    }
    async save(id, nameAr, nameEn, website = '', address = '', region = '', city = '', registrationNumber = '', ownerType = '', stampedAuthorizationFormUrl = null, registrationExpirationDate = null, creationDate = null, placeOfIssue = '', turnover = null, type = '', activities = '', categoriesIds = [], logoMedia = null, authorizationFileUrl = null, registeringFileUrl = null, contactInfo = '', userId, taxInformation = '', deliveryAddress = '', employeesNumber = null, CompanyNr = '0000000', itemNr = 0, orderNr = 0, TenderNr = 0, OpportunityNr = 0) {
        const isInsert = id === null || id === 'null' || id === undefined;
        if (isInsert) {
            const entity = new company_1.Company((0, mongo_functions_1.createObjectIdAsString)(id), nameAr, nameEn, website, address, region, city, registrationNumber, ownerType, stampedAuthorizationFormUrl, registrationExpirationDate, creationDate ?? new Date(), placeOfIssue, turnover, type, activities, categoriesIds, logoMedia, authorizationFileUrl, registeringFileUrl, contactInfo, userId, taxInformation, deliveryAddress, employeesNumber, CompanyNr, itemNr, orderNr, TenderNr, OpportunityNr);
            console.log("CompanyFactory.save(): isInsert:", entity);
            await this.companiesRepository.insert(entity);
            return entity;
        }
        const foundEntity = await this.companiesRepository.getById(id);
        console.log("CompanyFactory.save(): isInsert:", foundEntity);
        if (foundEntity == null) {
            return null;
        }
        foundEntity.nameAr = nameAr;
        foundEntity.nameEn = nameEn;
        foundEntity.website = website;
        foundEntity.address = address;
        foundEntity.region = region;
        foundEntity.city = city;
        foundEntity.registrationNumber = registrationNumber;
        foundEntity.ownerType = ownerType;
        foundEntity.stampedAuthorizationFormUrl = stampedAuthorizationFormUrl;
        foundEntity.registrationExpirationDate = registrationExpirationDate;
        foundEntity.creationDate = creationDate ?? new Date();
        foundEntity.placeOfIssue = placeOfIssue;
        foundEntity.turnover = turnover;
        foundEntity.type = type;
        foundEntity.activities = activities;
        foundEntity.categoriesIds = categoriesIds;
        foundEntity.logoMedia = logoMedia;
        foundEntity.authorizationFileUrl = authorizationFileUrl;
        foundEntity.registeringFileUrl = registeringFileUrl;
        foundEntity.contactInfo = contactInfo;
        foundEntity.userId = userId;
        foundEntity.taxInformation = taxInformation;
        foundEntity.deliveryAddress = deliveryAddress;
        foundEntity.employeesNumber = employeesNumber;
        foundEntity.CompanyNr = CompanyNr;
        foundEntity.itemNr = itemNr;
        foundEntity.orderNr = orderNr;
        foundEntity.TenderNr = TenderNr;
        foundEntity.OpportunityNr = OpportunityNr;
        const updatedEntity = await this.companiesRepository.getAndUpdate({
            _id: (0, mongo_functions_1.createObjectId)(id),
        }, foundEntity);
        return updatedEntity;
    }
};
exports.CompanyFactory = CompanyFactory;
exports.CompanyFactory = CompanyFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _a : Object])
], CompanyFactory);


/***/ }),
/* 219 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesError = void 0;
const app_messages_keys_1 = __webpack_require__(88);
const app_error_1 = __webpack_require__(93);
class CompaniesError extends app_error_1.AppError {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.message = message;
    }
}
exports.CompaniesError = CompaniesError;
CompaniesError.duplicateRegistrationNumber = new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.duplicateRegistrationNumber, 'Duplicate registration number', 409);


/***/ }),
/* 220 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesGetResult = void 0;
class CompaniesGetResult {
    constructor(id, nameAr, nameEn, website, address, region, city, registrationNumber = '', ownerType, stampedAuthorizationFormUrl, registrationExpirationDate, creationDate, placeOfIssue, turnover, type, activities, categoriesIds, logoMedia, authorizationFileUrl, registeringFileUrl, contactInfo, userId = '', taxInformation, deliveryAddress, employeesNumber, CompanyNr, itemNr, orderNr, TenderNr, OpportunityNr) {
        this.id = id;
        this.nameAr = nameAr;
        this.nameEn = nameEn;
        this.website = website;
        this.address = address;
        this.region = region;
        this.city = city;
        this.registrationNumber = registrationNumber;
        this.ownerType = ownerType;
        this.stampedAuthorizationFormUrl = stampedAuthorizationFormUrl;
        this.registrationExpirationDate = registrationExpirationDate;
        this.creationDate = creationDate;
        this.placeOfIssue = placeOfIssue;
        this.turnover = turnover;
        this.type = type;
        this.activities = activities;
        this.categoriesIds = categoriesIds;
        this.logoMedia = logoMedia;
        this.authorizationFileUrl = authorizationFileUrl;
        this.registeringFileUrl = registeringFileUrl;
        this.contactInfo = contactInfo;
        this.userId = userId;
        this.taxInformation = taxInformation;
        this.deliveryAddress = deliveryAddress;
        this.employeesNumber = employeesNumber;
        this.CompanyNr = CompanyNr;
        this.itemNr = itemNr;
        this.orderNr = orderNr;
        this.TenderNr = TenderNr;
        this.OpportunityNr = OpportunityNr;
    }
    static create(id, nameAr, nameEn = null, website = null, address = null, region = null, city = null, registrationNumber, ownerType = null, stampedAuthorizationFormUrl = null, registrationExpirationDate = null, creationDate = null, placeOfIssue = null, turnover = null, type = null, activities = null, categoriesIds = [], logoMedia = null, authorizationFileUrl = null, registeringFileUrl = null, contactInfo = null, userId = '', taxInformation = null, deliveryAddress = null, employeesNumber = null, CompanyNr = null, itemNr = null, orderNr = null, TenderNr = null, OpportunityNr = null) {
        return new CompaniesGetResult(id, nameAr, nameEn, website, address, region, city, registrationNumber, ownerType, stampedAuthorizationFormUrl, registrationExpirationDate, creationDate ?? new Date(), placeOfIssue, turnover, type, activities, categoriesIds, logoMedia, authorizationFileUrl, registeringFileUrl, contactInfo, userId, taxInformation, deliveryAddress, employeesNumber, CompanyNr, itemNr, orderNr, TenderNr, OpportunityNr);
    }
    static createFromDomain(company) {
        return new CompaniesGetResult(company._id, company.nameAr, company.nameEn, company.website, company.address, company.region, company.city, company.registrationNumber, company.ownerType, company.stampedAuthorizationFormUrl, company.registrationExpirationDate, company.creationDate ?? new Date(), company.placeOfIssue, company.turnover, company.type, company.activities, company.categoriesIds, company.logoMedia, company.authorizationFileUrl, company.registeringFileUrl, company.contactInfo, company.userId, company.taxInformation, company.deliveryAddress, company.employeesNumber, company.CompanyNr, company.itemNr, company.orderNr, company.TenderNr, company.OpportunityNr);
    }
}
exports.CompaniesGetResult = CompaniesGetResult;


/***/ }),
/* 221 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesGetHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const companies_repository_1 = __webpack_require__(210);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const companies_get_query_1 = __webpack_require__(222);
const companies_get_result_1 = __webpack_require__(220);
let CompaniesGetHandler = class CompaniesGetHandler {
    constructor(companiesRepository) {
        this.companiesRepository = companiesRepository;
    }
    async execute(query) {
        const entity = await this.companiesRepository.getById(query.id);
        if (entity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue('object'));
        }
        const resultData = companies_get_result_1.CompaniesGetResult.create(entity._id, entity.nameAr, entity.nameEn, entity.website, entity.address, entity.region, entity.city, entity.registrationNumber, entity.ownerType, entity.stampedAuthorizationFormUrl, entity.registrationExpirationDate, entity.creationDate, entity.placeOfIssue, entity.turnover, entity.type, entity.activities, entity.categoriesIds, entity.logoMedia, entity.authorizationFileUrl, entity.registeringFileUrl, entity.contactInfo, entity.userId, entity.taxInformation, entity.deliveryAddress, entity.employeesNumber, entity.CompanyNr, entity.itemNr, entity.orderNr, entity.TenderNr, entity.OpportunityNr);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.CompaniesGetHandler = CompaniesGetHandler;
exports.CompaniesGetHandler = CompaniesGetHandler = __decorate([
    (0, cqrs_1.QueryHandler)(companies_get_query_1.CompaniesGetQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _a : Object])
], CompaniesGetHandler);


/***/ }),
/* 222 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesGetQuery = void 0;
class CompaniesGetQuery {
    constructor(id) {
        this.id = id;
    }
}
exports.CompaniesGetQuery = CompaniesGetQuery;


/***/ }),
/* 223 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesGetAllHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const companies_repository_1 = __webpack_require__(210);
const companies_get_all_result_1 = __webpack_require__(224);
const companies_get_all_query_1 = __webpack_require__(225);
const reg_ex_functions_1 = __webpack_require__(99);
const mongo_functions_1 = __webpack_require__(29);
const order_direction_enum_1 = __webpack_require__(32);
const order_by_enum_1 = __webpack_require__(100);
let CompaniesGetAllHandler = class CompaniesGetAllHandler {
    constructor(companiesRepository) {
        this.companiesRepository = companiesRepository;
    }
    async execute(query) {
        const filter = {};
        if (query.search !== null) {
            filter.$or = [
                {
                    nameAr: (0, reg_ex_functions_1.searchRegEx)(query.search),
                },
                {
                    nameEn: (0, reg_ex_functions_1.searchRegEx)(query.search),
                },
                {
                    CompanyNr: (0, reg_ex_functions_1.searchRegEx)(query.search),
                },
            ];
        }
        if (query.userId !== null) {
            filter.userId =
                (0, mongo_functions_1.createObjectId)(query.userId);
        }
        const result = await this
            .companiesRepository
            .getAllAsResult(filter, {}, null, query.pageSize, query.pageNumber, query.withPaging, [{ field: order_by_enum_1.OrderByEnum.CREATED_AT, direction: order_direction_enum_1.OrderDirectionEnum.DESC }]);
        const entitiesResults = result
            .data
            .map((element) => {
            return companies_get_all_result_1.CompaniesGetAllResult
                .create(element._id, element.nameAr, element.nameEn, element.registrationNumber, element.ownerType, element.CompanyNr);
        });
        return app_result_1.AppResult
            .createSuccess(null, null, entitiesResults, result.paging);
    }
};
exports.CompaniesGetAllHandler = CompaniesGetAllHandler;
exports.CompaniesGetAllHandler = CompaniesGetAllHandler = __decorate([
    (0, cqrs_1.QueryHandler)(companies_get_all_query_1.CompaniesGetAllQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _a : Object])
], CompaniesGetAllHandler);


/***/ }),
/* 224 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesGetAllResult = void 0;
class CompaniesGetAllResult {
    constructor(id, nameAr, nameEn, registrationNumber = '', ownerType, CompanyNr) {
        this.id = id;
        this.nameAr = nameAr;
        this.nameEn = nameEn;
        this.registrationNumber = registrationNumber;
        this.ownerType = ownerType;
        this.CompanyNr = CompanyNr;
    }
    static create(id, nameAr, nameEn = null, registrationNumber, ownerType = null, CompanyNr = null) {
        return new CompaniesGetAllResult(id, nameAr, nameEn, registrationNumber, ownerType, CompanyNr);
    }
}
exports.CompaniesGetAllResult = CompaniesGetAllResult;


/***/ }),
/* 225 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesGetAllQuery = void 0;
class CompaniesGetAllQuery {
    constructor(pageSize, pageNumber, withPaging, search, userId) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.withPaging = withPaging;
        this.search = search;
        this.userId = userId;
    }
}
exports.CompaniesGetAllQuery = CompaniesGetAllQuery;


/***/ }),
/* 226 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesController = void 0;
const common_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(69);
const companies_upsert_command_1 = __webpack_require__(217);
const cqrs_1 = __webpack_require__(41);
const companies_upsert_request_1 = __webpack_require__(227);
const companies_get_request_1 = __webpack_require__(228);
const companies_get_query_1 = __webpack_require__(222);
const companies_get_all_query_1 = __webpack_require__(225);
const companies_get_all_request_1 = __webpack_require__(229);
const companies_delete_request_1 = __webpack_require__(230);
const companies_delete_command_1 = __webpack_require__(209);
const roles_guard_1 = __webpack_require__(85);
const app_response_1 = __webpack_require__(87);
const companies_get_mine_query_1 = __webpack_require__(231);
const companies_service_1 = __webpack_require__(232);
const mongodb_1 = __webpack_require__(30);
const user_companies_service_1 = __webpack_require__(235);
const platform_express_1 = __webpack_require__(174);
const multer_config_1 = __webpack_require__(237);
const s3_upload_service_1 = __webpack_require__(239);
const mongo_functions_1 = __webpack_require__(29);
const admin_companies_upsert_request_1 = __webpack_require__(423);
let CompaniesController = class CompaniesController {
    constructor(companiesService, userCompaniesService, queryBus, commandBus) {
        this.companiesService = companiesService;
        this.userCompaniesService = userCompaniesService;
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    async upsert(files, companiesUpsertRequest, req) {
        const { userId, roles } = req.user;
        let authorizationFileUrl = null;
        let registeringFileUrl = null;
        let logoMediaUrl = null;
        const folderPath = `${companiesUpsertRequest.registrationNumber}/attachments`;
        if (files.authorizationFileUrl && files.authorizationFileUrl[0]) {
            authorizationFileUrl = await s3_upload_service_1.S3UploadService.uploadFile(files.authorizationFileUrl[0], folderPath);
        }
        if (files.registeringFileUrl && files.registeringFileUrl[0]) {
            registeringFileUrl = await s3_upload_service_1.S3UploadService.uploadFile(files.registeringFileUrl[0], folderPath);
        }
        if (files.logoMedia && files.logoMedia[0]) {
            logoMediaUrl = await s3_upload_service_1.S3UploadService.uploadFile(files.logoMedia[0], folderPath);
        }
        companiesUpsertRequest = {
            ...companiesUpsertRequest,
            authorizationFileUrl: authorizationFileUrl,
            registeringFileUrl: registeringFileUrl,
            logoMedia: logoMediaUrl,
        };
        let categoriesIds = companiesUpsertRequest.categoriesIds;
        try {
            if (typeof categoriesIds === "string") {
                categoriesIds = JSON.parse(categoriesIds);
            }
        }
        catch (error) { }
        const command = new companies_upsert_command_1.CompaniesUpsertCommand(companiesUpsertRequest.id === "" ? null : companiesUpsertRequest.id, String(companiesUpsertRequest.nameAr), companiesUpsertRequest.nameEn, companiesUpsertRequest.website, companiesUpsertRequest.address, companiesUpsertRequest.region, companiesUpsertRequest.city, companiesUpsertRequest.registrationNumber, companiesUpsertRequest.ownerType, companiesUpsertRequest.stampedAuthorizationFormUrl, companiesUpsertRequest.registrationExpirationDate, companiesUpsertRequest.creationDate, companiesUpsertRequest.placeOfIssue, companiesUpsertRequest.turnover, companiesUpsertRequest.type, companiesUpsertRequest.activities, categoriesIds, companiesUpsertRequest.logoMedia, companiesUpsertRequest.authorizationFileUrl, companiesUpsertRequest.registeringFileUrl, companiesUpsertRequest.contactInfo, userId, companiesUpsertRequest.taxInformation, companiesUpsertRequest.deliveryAddress, companiesUpsertRequest.employeesNumber, companiesUpsertRequest.CompanyNr, companiesUpsertRequest.OpportunityNr, companiesUpsertRequest.TenderNr);
        const result = await this.commandBus.execute(command);
        if (result.data.id) {
            await this.companiesService.addUserToCompany(new mongodb_1.ObjectId(result.data.userId), new mongodb_1.ObjectId(result.data.id), companiesUpsertRequest.ownerType);
        }
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async Adminupsert(companiesUpsertRequest, req) {
        const { userId, roles } = req.user;
        if (!roles.includes("Admin")) {
            throw new common_1.UnauthorizedException("You do not have permission to update this company.");
        }
        const command = new companies_upsert_command_1.CompaniesUpsertCommand(companiesUpsertRequest.id, String(companiesUpsertRequest.nameAr), companiesUpsertRequest.nameEn, companiesUpsertRequest.website, companiesUpsertRequest.address, companiesUpsertRequest.region, companiesUpsertRequest.city, companiesUpsertRequest.registrationNumber, companiesUpsertRequest.ownerType, companiesUpsertRequest.stampedAuthorizationFormUrl, companiesUpsertRequest.registrationExpirationDate, companiesUpsertRequest.creationDate, companiesUpsertRequest.placeOfIssue, companiesUpsertRequest.turnover, companiesUpsertRequest.type, companiesUpsertRequest.activities, companiesUpsertRequest.categoriesIds, companiesUpsertRequest.logoMedia, companiesUpsertRequest.authorizationFileUrl, companiesUpsertRequest.registeringFileUrl, companiesUpsertRequest.contactInfo, companiesUpsertRequest.userId, companiesUpsertRequest.taxInformation, companiesUpsertRequest.deliveryAddress, companiesUpsertRequest.employeesNumber, companiesUpsertRequest.CompanyNr);
        const result = await this.commandBus.execute(command);
        await this.companiesService.addUserToCompany((0, mongo_functions_1.createObjectId)(result.data.userId), (0, mongo_functions_1.createObjectId)(result.data.id), companiesUpsertRequest.ownerType);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async delete(companiesDeleteRequest, req) {
        const { userId, roles } = req.user;
        const command = new companies_delete_command_1.CompaniesDeleteCommand(companiesDeleteRequest.id, userId);
        const result = await this.commandBus.execute(command);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, null, null, result.error);
        return response;
    }
    async get(companiesGetRequest) {
        const query = new companies_get_query_1.CompaniesGetQuery(companiesGetRequest.id);
        const result = await this.queryBus.execute(query);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
    async getAll(companiesGetAllRequest, req) {
        const { userId, roles } = req.user;
        const query = new companies_get_all_query_1.CompaniesGetAllQuery(companiesGetAllRequest.pageSize, companiesGetAllRequest.pageNumber, companiesGetAllRequest.withPaging, companiesGetAllRequest.search, roles.some((item) => item === "Admin") ? null : userId);
        const result = await this.queryBus.execute(query);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
    async getUsersAll(req) {
        const { userId, pageSize, pageNumber, withPaging } = req.query;
        const query = new companies_get_all_query_1.CompaniesGetAllQuery(pageSize, pageNumber, withPaging, "", userId);
        const result = await this.queryBus.execute(query);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, result.paging, result.error);
        return response;
    }
    async getAllUsers(req) {
        const { ComapnyId, pageSize, pageNumber, withPaging } = req.query;
        if (!ComapnyId) {
            return app_response_1.AppResponse.create(false, null, "Company ID is required", null, null, null);
        }
        const users = await this.userCompaniesService.getAllUsersByCompanyId(ComapnyId);
        const response = app_response_1.AppResponse.create(true, null, "Users retrieved successfully", users, null, null);
        return response;
    }
    async getAllAttchments(req) {
        const { ComapnyId, pageSize, pageNumber, withPaging } = req.query;
        if (!ComapnyId) {
            return app_response_1.AppResponse.create(false, null, "Company ID is required", null, null, null);
        }
        const Attachment = [];
        const response = app_response_1.AppResponse.create(true, null, "Attachments retrieved successfully", Attachment, null, null);
        return response;
    }
    async getAllItems(req) {
        const { ComapnyId, pageSize, pageNumber, withPaging } = req.query;
        if (!ComapnyId) {
            return app_response_1.AppResponse.create(false, null, "Company ID is required", null, null, null);
        }
        const items = [];
        const response = app_response_1.AppResponse.create(true, null, "items retrieved successfully", items, null, null);
        return response;
    }
    async getmy(req) {
        const { userId } = req.user;
        const query = new companies_get_mine_query_1.CompaniesGetMineQuery(userId);
        const result = await this.queryBus.execute(query);
        const response = app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        return response;
    }
};
exports.CompaniesController = CompaniesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)("upsert"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "authorizationFileUrl", maxCount: 1 },
        { name: "registeringFileUrl", maxCount: 1 },
        { name: "logoMedia", maxCount: 1 },
    ], multer_config_1.multerOptions)),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof companies_upsert_request_1.CompaniesUpsertRequest !== "undefined" && companies_upsert_request_1.CompaniesUpsertRequest) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CompaniesController.prototype, "upsert", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)("Admin/upsert"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof admin_companies_upsert_request_1.AdminCompaniesUpsertRequest !== "undefined" && admin_companies_upsert_request_1.AdminCompaniesUpsertRequest) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CompaniesController.prototype, "Adminupsert", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)("delete"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof companies_delete_request_1.CompaniesDeleteRequest !== "undefined" && companies_delete_request_1.CompaniesDeleteRequest) === "function" ? _j : Object, Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], CompaniesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("get"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof companies_get_request_1.CompaniesGetRequest !== "undefined" && companies_get_request_1.CompaniesGetRequest) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], CompaniesController.prototype, "get", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)("getAll"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof companies_get_all_request_1.CompaniesGetAllRequest !== "undefined" && companies_get_all_request_1.CompaniesGetAllRequest) === "function" ? _o : Object, Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], CompaniesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("users/getAll"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], CompaniesController.prototype, "getUsersAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)("getAllUsers"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], CompaniesController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)("getAllAttchments"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], CompaniesController.prototype, "getAllAttchments", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)("getAllItems"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], CompaniesController.prototype, "getAllItems", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)("get/my"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], CompaniesController.prototype, "getmy", null);
exports.CompaniesController = CompaniesController = __decorate([
    (0, common_1.Controller)({
        path: "web/companies",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof companies_service_1.CompaniesService !== "undefined" && companies_service_1.CompaniesService) === "function" ? _a : Object, typeof (_b = typeof user_companies_service_1.UserCompaniesService !== "undefined" && user_companies_service_1.UserCompaniesService) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _c : Object, typeof (_d = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _d : Object])
], CompaniesController);


/***/ }),
/* 227 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesUpsertRequest = void 0;
const class_validator_1 = __webpack_require__(55);
const class_transformer_1 = __webpack_require__(72);
const company_owner_type_enum_1 = __webpack_require__(212);
const company_type_enum_1 = __webpack_require__(213);
class CompaniesUpsertRequest {
}
exports.CompaniesUpsertRequest = CompaniesUpsertRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "nameAr", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "nameEn", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "region", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "registrationNumber", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(company_owner_type_enum_1.CompanyOwnerTypeEnum),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "ownerType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "stampedAuthorizationFormUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "authorizationFileUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "registeringFileUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "logoMedia", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CompaniesUpsertRequest.prototype, "registrationExpirationDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CompaniesUpsertRequest.prototype, "creationDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "placeOfIssue", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], CompaniesUpsertRequest.prototype, "turnover", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(company_type_enum_1.CompanyTypeEnum),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "activities", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CompaniesUpsertRequest.prototype, "categoriesIds", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "contactInfo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "taxInformation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "deliveryAddress", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CompaniesUpsertRequest.prototype, "employeesNumber", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CompaniesUpsertRequest.prototype, "itemNr", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CompaniesUpsertRequest.prototype, "orderNr", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CompaniesUpsertRequest.prototype, "TenderNr", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CompaniesUpsertRequest.prototype, "OpportunityNr", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", String)
], CompaniesUpsertRequest.prototype, "CompanyNr", void 0);


/***/ }),
/* 228 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesGetRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class CompaniesGetRequest {
}
exports.CompaniesGetRequest = CompaniesGetRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CompaniesGetRequest.prototype, "id", void 0);


/***/ }),
/* 229 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesGetAllRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const app_paging_request_1 = __webpack_require__(79);
const app_transforms_1 = __webpack_require__(80);
class CompaniesGetAllRequest extends app_paging_request_1.AppPagingRequest {
    constructor() {
        super(...arguments);
        this.search = null;
    }
}
exports.CompaniesGetAllRequest = CompaniesGetAllRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], CompaniesGetAllRequest.prototype, "search", void 0);


/***/ }),
/* 230 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesDeleteRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class CompaniesDeleteRequest {
}
exports.CompaniesDeleteRequest = CompaniesDeleteRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CompaniesDeleteRequest.prototype, "id", void 0);


/***/ }),
/* 231 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesGetMineQuery = void 0;
class CompaniesGetMineQuery {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.CompaniesGetMineQuery = CompaniesGetMineQuery;


/***/ }),
/* 232 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesService = void 0;
const common_1 = __webpack_require__(3);
const user_companies_repository_1 = __webpack_require__(233);
let CompaniesService = class CompaniesService {
    constructor(userCompaniesRepository) {
        this.userCompaniesRepository = userCompaniesRepository;
    }
    async addUserToCompany(userId, companyId, role) {
        return this.userCompaniesRepository.createUserCompany(userId, companyId, role);
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_companies_repository_1.UserCompaniesRepository !== "undefined" && user_companies_repository_1.UserCompaniesRepository) === "function" ? _a : Object])
], CompaniesService);


/***/ }),
/* 233 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCompaniesRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mongodb_1 = __webpack_require__(30);
const user_company_schema_1 = __webpack_require__(234);
const createObjectId = (id) => {
    return id ? new mongodb_1.ObjectId(id) : new mongodb_1.ObjectId();
};
let UserCompaniesRepository = class UserCompaniesRepository {
    constructor(userCompaniesModel) {
        this.userCompaniesModel = userCompaniesModel;
    }
    async createUserCompany(userId, companyId, role) {
        const existingUserCompany = await this.userCompaniesModel.findOne({
            userId,
            companyId,
        });
        if (existingUserCompany) {
            return true;
        }
        const newUserCompany = new this.userCompaniesModel({
            _id: createObjectId(),
            userId,
            companyId,
            Role: role,
        });
        return await newUserCompany.save();
    }
};
exports.UserCompaniesRepository = UserCompaniesRepository;
exports.UserCompaniesRepository = UserCompaniesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_company_schema_1.UserCompaniesSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UserCompaniesRepository);


/***/ }),
/* 234 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCompaniesSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mongodb_1 = __webpack_require__(30);
const base_with_Info_schema_1 = __webpack_require__(37);
const user_schema_1 = __webpack_require__(36);
const company_schema_1 = __webpack_require__(211);
const schemas_names_1 = __webpack_require__(34);
const company_owner_type_enum_1 = __webpack_require__(212);
let UserCompaniesSchema = class UserCompaniesSchema extends base_with_Info_schema_1.BaseWithInfoSchema {
};
exports.UserCompaniesSchema = UserCompaniesSchema;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchema.name,
    }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], UserCompaniesSchema.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: company_schema_1.CompanySchema.name,
    }),
    __metadata("design:type", typeof (_b = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _b : Object)
], UserCompaniesSchema.prototype, "companyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: company_owner_type_enum_1.CompanyOwnerTypeEnum.AUTHORIZED,
    }),
    __metadata("design:type", String)
], UserCompaniesSchema.prototype, "Role", void 0);
exports.UserCompaniesSchema = UserCompaniesSchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.userCompanies,
        versionKey: false,
        timestamps: false,
    })
], UserCompaniesSchema);


/***/ }),
/* 235 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCompaniesService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const user_company_schema_1 = __webpack_require__(234);
const companies_get_all_users_response_1 = __webpack_require__(236);
let UserCompaniesService = class UserCompaniesService {
    constructor(userCompaniesModel) {
        this.userCompaniesModel = userCompaniesModel;
    }
    async getAllUsersByCompanyId(companyId) {
        const userCompanies = await this.userCompaniesModel.find({ companyId: new mongoose_2.Types.ObjectId(companyId) })
            .populate('userId')
            .exec();
        return userCompanies.map(userCompany => {
            const user = userCompany.userId;
            return companies_get_all_users_response_1.CompaniesGetAllUsersResponse.create(user._id.toString(), user.nickName, user.email, userCompany.Role);
        });
    }
};
exports.UserCompaniesService = UserCompaniesService;
exports.UserCompaniesService = UserCompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_company_schema_1.UserCompaniesSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UserCompaniesService);


/***/ }),
/* 236 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesGetAllUsersResponse = void 0;
class CompaniesGetAllUsersResponse {
    constructor(id, nickName, email, Role) {
        this.id = id;
        this.nickName = nickName;
        this.email = email;
        this.Role = Role;
    }
    static create(id, nickName, email, Role) {
        return new CompaniesGetAllUsersResponse(id, nickName, email, Role);
    }
}
exports.CompaniesGetAllUsersResponse = CompaniesGetAllUsersResponse;


/***/ }),
/* 237 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.multerOptions = void 0;
const multer_1 = __webpack_require__(238);
const common_1 = __webpack_require__(3);
exports.multerOptions = {
    storage: (0, multer_1.memoryStorage)(),
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedFields = ['image', 'attachment', 'attachments', 'logoMedia', 'authorizationFile', 'registeringFile', 'taxInformation', 'deliveryAddress', 'employeesNumber'];
        if (allowedFields.some((field) => file.fieldname.startsWith(field))) {
            cb(null, true);
        }
        else {
            cb(new common_1.BadRequestException(`Unexpected field '${file.fieldname}'. Allowed fields are: ${allowedFields.join(', ')}`), false);
        }
    },
};


/***/ }),
/* 238 */
/***/ ((module) => {

module.exports = require("multer");

/***/ }),
/* 239 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3UploadService = void 0;
const client_s3_1 = __webpack_require__(240);
const s3_config_1 = __webpack_require__(241);
const uuid_1 = __webpack_require__(42);
class S3UploadService {
    static async uploadFile(file, folderPath) {
        const fileKey = `${folderPath}/${(0, uuid_1.v4)()}-${file.originalname}`;
        try {
            await s3_config_1.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: s3_config_1.S3_BUCKET,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            }));
            return `https://${s3_config_1.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        }
        catch (error) {
            console.error("Error uploading file to S3:", error);
            throw new Error("Failed to upload file to S3.");
        }
    }
}
exports.S3UploadService = S3UploadService;


/***/ }),
/* 240 */
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),
/* 241 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3_BUCKET = exports.s3Client = void 0;
const client_s3_1 = __webpack_require__(240);
exports.s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});
exports.S3_BUCKET = process.env.AWS_S3_BUCKET || "";


/***/ }),
/* 242 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesGetMyHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const companies_repository_1 = __webpack_require__(210);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const companies_get_result_1 = __webpack_require__(220);
const companies_get_mine_query_1 = __webpack_require__(231);
let CompaniesGetMyHandler = class CompaniesGetMyHandler {
    constructor(companiesRepository) {
        this.companiesRepository = companiesRepository;
    }
    async execute(query) {
        const entity = await this.companiesRepository.getCompanyByUserId(query.userId);
        if (entity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue('object'));
        }
        const resultData = companies_get_result_1.CompaniesGetResult.create(entity._id, entity.nameAr, entity.nameEn, entity.website, entity.address, entity.region, entity.city, entity.registrationNumber, entity.ownerType, entity.stampedAuthorizationFormUrl, entity.registrationExpirationDate, entity.creationDate, entity.placeOfIssue, entity.turnover, entity.type, entity.activities, entity.categoriesIds, entity.logoMedia, entity.authorizationFileUrl, entity.registeringFileUrl, entity.contactInfo, entity.userId, entity.taxInformation, entity.deliveryAddress, entity.employeesNumber, entity.CompanyNr, entity.itemNr, entity.orderNr, entity.TenderNr, entity.OpportunityNr);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.CompaniesGetMyHandler = CompaniesGetMyHandler;
exports.CompaniesGetMyHandler = CompaniesGetMyHandler = __decorate([
    (0, cqrs_1.QueryHandler)(companies_get_mine_query_1.CompaniesGetMineQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _a : Object])
], CompaniesGetMyHandler);


/***/ }),
/* 243 */
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),
/* 244 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProtectedFilesMiddleware = void 0;
const common_1 = __webpack_require__(3);
const jwt_provider_service_1 = __webpack_require__(43);
const medias_constants_1 = __webpack_require__(147);
let ProtectedFilesMiddleware = class ProtectedFilesMiddleware {
    constructor(jwtProviderService) {
        this.jwtProviderService = jwtProviderService;
    }
    use(req, res, next) {
        const url = req.originalUrl;
        const isProtected = url
            .includes(medias_constants_1.mediasConstants.paths.protected);
        if (!isProtected) {
            next();
            return;
        }
        const token = req
            .headers
            .authorization
            ?.split(' ')[1];
        const result = this
            .jwtProviderService
            .verifyAccessToken(token);
        if (!result.isValid) {
            throw new common_1.UnauthorizedException();
        }
        next();
    }
};
exports.ProtectedFilesMiddleware = ProtectedFilesMiddleware;
exports.ProtectedFilesMiddleware = ProtectedFilesMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_provider_service_1.JwtProviderService !== "undefined" && jwt_provider_service_1.JwtProviderService) === "function" ? _a : Object])
], ProtectedFilesMiddleware);


/***/ }),
/* 245 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestsLoggerMiddleware = void 0;
const common_1 = __webpack_require__(3);
const app_logger_service_1 = __webpack_require__(4);
let RequestsLoggerMiddleware = class RequestsLoggerMiddleware {
    constructor(appLoggerService) {
        this.appLoggerService = appLoggerService;
    }
    use(req, res, next) {
        this
            .appLoggerService
            .log(`${req.method} ====> ${req.originalUrl}`);
        next();
    }
};
exports.RequestsLoggerMiddleware = RequestsLoggerMiddleware;
exports.RequestsLoggerMiddleware = RequestsLoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_logger_service_1.AppLoggerService !== "undefined" && app_logger_service_1.AppLoggerService) === "function" ? _a : Object])
], RequestsLoggerMiddleware);


/***/ }),
/* 246 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");

/***/ }),
/* 247 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersModule = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(41);
const mongoose_1 = __webpack_require__(24);
const tender_factory_1 = __webpack_require__(248);
const tenders_repository_1 = __webpack_require__(253);
const tender_schema_1 = __webpack_require__(254);
const tender_schema_factory_1 = __webpack_require__(256);
const tenders_controller_1 = __webpack_require__(257);
const tenders_upsert_handler_1 = __webpack_require__(279);
const tenders_delete_handler_1 = __webpack_require__(281);
const tender_quotations_controller_1 = __webpack_require__(282);
const tender_quotation_schema_1 = __webpack_require__(273);
const tenders_get_handler_1 = __webpack_require__(295);
const tenders_get_all_handler_1 = __webpack_require__(296);
const tender_quotations_delete_handler_1 = __webpack_require__(298);
const tender_quotations_upsert_handler_1 = __webpack_require__(299);
const tender_quotation_factory_1 = __webpack_require__(301);
const tender_quotations_get_handler_1 = __webpack_require__(302);
const tender_quotations_get_all_handler_1 = __webpack_require__(303);
const tender_quotation_schema_factory_1 = __webpack_require__(277);
const tender_quotations_repository_1 = __webpack_require__(272);
const tenders_change_status_handler_1 = __webpack_require__(306);
const tender_update_status_handler_1 = __webpack_require__(308);
const tender_quotations_update_status_handler_1 = __webpack_require__(309);
const getCompanyById_1 = __webpack_require__(269);
const companies_module_1 = __webpack_require__(207);
const tenders_cron_service_1 = __webpack_require__(270);
const schedule_1 = __webpack_require__(271);
const tender_quotations_get_allj2_handler_1 = __webpack_require__(310);
let TendersModule = class TendersModule {
};
exports.TendersModule = TendersModule;
exports.TendersModule = TendersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            cqrs_1.CqrsModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: tender_schema_1.TenderSchema.name,
                    schema: tender_schema_1.CreatedTenderSchema,
                },
                {
                    name: tender_quotation_schema_1.TenderQuotationSchema.name,
                    schema: tender_quotation_schema_1.CreatedTenderQuotationSchema,
                },
            ]),
            companies_module_1.CompaniesModule
        ],
        providers: [
            tenders_repository_1.TendersRepository,
            tender_schema_factory_1.TenderSchemaFactory,
            tender_factory_1.TenderFactory,
            tenders_upsert_handler_1.TendersUpsertHandler,
            tenders_change_status_handler_1.TendersChangeStatusHandler,
            tenders_delete_handler_1.TendersDeleteHandler,
            tenders_get_handler_1.TendersGetHandler,
            tenders_get_all_handler_1.TendersGetAllHandler,
            tender_quotations_repository_1.TenderQuotationsRepository,
            tender_quotation_schema_factory_1.TenderQuotationSchemaFactory,
            tender_quotation_factory_1.TenderQuotationFactory,
            tender_quotations_upsert_handler_1.TenderQuotationsUpsertHandler,
            tender_quotations_delete_handler_1.TenderQuotationsDeleteHandler,
            tender_quotations_get_handler_1.TenderQuotationsGetHandler,
            tender_quotations_get_all_handler_1.TenderQuotationsGetAllHandler,
            tender_quotations_update_status_handler_1.TenderQuotationsUpdateStatusHandler,
            tender_update_status_handler_1.TendersUpdateStatusHandler,
            getCompanyById_1.CompanyService,
            tenders_cron_service_1.TendersCronService,
            tender_quotations_get_allj2_handler_1.TenderQuotationsGetAllHandlerj2
        ],
        controllers: [
            tenders_controller_1.TendersController,
            tender_quotations_controller_1.TenderQuotationsController,
        ],
        exports: [
            tenders_repository_1.TendersRepository,
            tender_quotations_repository_1.TenderQuotationsRepository,
            mongoose_1.MongooseModule,
        ],
    })
], TendersModule);


/***/ }),
/* 248 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderFactory = void 0;
const common_1 = __webpack_require__(3);
const tender_1 = __webpack_require__(249);
const tenders_repository_1 = __webpack_require__(253);
const mongo_functions_1 = __webpack_require__(29);
let TenderFactory = class TenderFactory {
    constructor(tendersRepository) {
        this.tendersRepository = tendersRepository;
    }
    async save(id, title, minValue, value, endDate, deliverDate, type, status = null, categoriesIds = [], region = '', city = '', fileName = '', fileDescription = '', fileId = null, attachmentName = '', attachmentDescription = '', attachmentId = null, attachmentRequired = false, attachmentDeliverDays = null, receiveDocumentsType, Paylater, contactInfo = '', companyId, userId, products = [], TenderNr = 1000) {
        const isInsert = id === null;
        if (isInsert) {
            const entity = tender_1.Tender.create((0, mongo_functions_1.createObjectIdAsString)(id), title, minValue, value, endDate, deliverDate, type, status, categoriesIds, null, region, city, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired, attachmentDeliverDays, receiveDocumentsType, Paylater, contactInfo, companyId, userId, products, TenderNr);
            await this.tendersRepository.insert(entity);
            return entity;
        }
        const foundEntity = await this.tendersRepository.getById(id);
        if (foundEntity == null) {
            return null;
        }
        foundEntity.title = title;
        foundEntity.minValue = minValue;
        foundEntity.value = value;
        foundEntity.endDate = endDate;
        foundEntity.deliverDate = deliverDate;
        foundEntity.type = type;
        foundEntity.status = status;
        foundEntity.categoriesIds = categoriesIds;
        foundEntity.region = region;
        foundEntity.city = city;
        foundEntity.fileName = fileName;
        foundEntity.fileDescription = fileDescription;
        foundEntity.fileId = fileId;
        foundEntity.attachmentName = attachmentName;
        foundEntity.attachmentDescription = attachmentDescription;
        foundEntity.attachmentId = attachmentId;
        foundEntity.attachmentRequired = attachmentRequired;
        foundEntity.attachmentDeliverDays = attachmentDeliverDays;
        foundEntity.receiveDocumentsType = receiveDocumentsType;
        foundEntity.Paylater = Paylater;
        foundEntity.contactInfo = contactInfo;
        foundEntity.companyId = companyId;
        foundEntity.products = products;
        const updatedEntity = await this.tendersRepository.getAndUpdate({
            _id: (0, mongo_functions_1.createObjectId)(id),
        }, foundEntity);
        return updatedEntity;
    }
};
exports.TenderFactory = TenderFactory;
exports.TenderFactory = TenderFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof tenders_repository_1.TendersRepository !== "undefined" && tenders_repository_1.TendersRepository) === "function" ? _a : Object])
], TenderFactory);


/***/ }),
/* 249 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tender = void 0;
const cqrs_1 = __webpack_require__(41);
const mongo_functions_1 = __webpack_require__(29);
const receive_documents_type_enum_1 = __webpack_require__(250);
const tender_status_enum_1 = __webpack_require__(251);
const Paylater_type_enum_1 = __webpack_require__(252);
class Tender extends cqrs_1.AggregateRoot {
    constructor(_id, title, minValue, value, endDate, deliverDate, type, status = tender_status_enum_1.TenderStatusEnum.PLANING, categoriesIds = [], categories = [], region, city, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired = false, attachmentDeliverDays, receiveDocumentsType = receive_documents_type_enum_1.ReceiveDocumentsTypeEnum.BOTH, Paylater = Paylater_type_enum_1.PaylaterTypeEnum.NO, contactInfo, companyId = '', userId = '', products = [], TenderNr = 1000, displayOrder = 0, isVisible = true, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy) {
        super();
        this._id = _id;
        this.title = title;
        this.minValue = minValue;
        this.value = value;
        this.endDate = endDate;
        this.deliverDate = deliverDate;
        this.type = type;
        this.status = status;
        this.categoriesIds = categoriesIds;
        this.categories = categories;
        this.region = region;
        this.city = city;
        this.fileName = fileName;
        this.fileDescription = fileDescription;
        this.fileId = fileId;
        this.attachmentName = attachmentName;
        this.attachmentDescription = attachmentDescription;
        this.attachmentId = attachmentId;
        this.attachmentRequired = attachmentRequired;
        this.attachmentDeliverDays = attachmentDeliverDays;
        this.receiveDocumentsType = receiveDocumentsType;
        this.Paylater = Paylater;
        this.contactInfo = contactInfo;
        this.companyId = companyId;
        this.userId = userId;
        this.products = products;
        this.TenderNr = TenderNr;
        this.displayOrder = displayOrder;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
    static create(id, title, minValue, value, endDate, deliverDate, type, status = tender_status_enum_1.TenderStatusEnum.PLANING, categoriesIds = [], categories = [], region = null, city = null, fileName = null, fileDescription = null, fileId = null, attachmentName = null, attachmentDescription = null, attachmentId = null, attachmentRequired = false, attachmentDeliverDays = null, receiveDocumentsType = receive_documents_type_enum_1.ReceiveDocumentsTypeEnum.BOTH, Paylater = Paylater_type_enum_1.PaylaterTypeEnum.NO, contactInfo = null, companyId = '', userId = '', products = [], TenderNr = 1000, displayOrder = 0, isVisible = true, createdAt = null, updatedAt = null, deletedAt = null, createdBy = null, updatedBy = null, deletedBy = null) {
        return new Tender((0, mongo_functions_1.createObjectIdAsString)(id), title, minValue, value, endDate, deliverDate, type, status, categoriesIds, categories, region, city, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired, attachmentDeliverDays, receiveDocumentsType, Paylater, contactInfo, companyId, userId, products, TenderNr, displayOrder, isVisible, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy);
    }
}
exports.Tender = Tender;


/***/ }),
/* 250 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReceiveDocumentsTypeEnum = void 0;
var ReceiveDocumentsTypeEnum;
(function (ReceiveDocumentsTypeEnum) {
    ReceiveDocumentsTypeEnum["BOTH"] = "Both";
    ReceiveDocumentsTypeEnum["OneByOne"] = "OneByOne";
})(ReceiveDocumentsTypeEnum || (exports.ReceiveDocumentsTypeEnum = ReceiveDocumentsTypeEnum = {}));


/***/ }),
/* 251 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderStatusEnum = void 0;
var TenderStatusEnum;
(function (TenderStatusEnum) {
    TenderStatusEnum["PLANING"] = "Planning";
    TenderStatusEnum["OPENED"] = "Opened";
    TenderStatusEnum["CLOSED"] = "Closed";
    TenderStatusEnum["ACCEPTED"] = "Accepted";
    TenderStatusEnum["FINISHED"] = "Finished";
    TenderStatusEnum["PAYMENT"] = "Payment";
    TenderStatusEnum["PAYMENTCONFIRM"] = "PaymentConfirmation";
    TenderStatusEnum["SENDING"] = "Sending";
    TenderStatusEnum["RECEIVING"] = "Receiving";
    TenderStatusEnum["CANCELLED"] = "Canceled";
    TenderStatusEnum["PENDING"] = "Pending";
})(TenderStatusEnum || (exports.TenderStatusEnum = TenderStatusEnum = {}));


/***/ }),
/* 252 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaylaterTypeEnum = void 0;
var PaylaterTypeEnum;
(function (PaylaterTypeEnum) {
    PaylaterTypeEnum["YES"] = "Yes";
    PaylaterTypeEnum["NO"] = "No";
})(PaylaterTypeEnum || (exports.PaylaterTypeEnum = PaylaterTypeEnum = {}));


/***/ }),
/* 253 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const base_repository_1 = __webpack_require__(26);
const tender_schema_1 = __webpack_require__(254);
const tender_schema_factory_1 = __webpack_require__(256);
let TendersRepository = class TendersRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
    async getLatestTender() {
        return this.model
            .findOne()
            .sort({ TenderNr: -1 })
            .exec();
    }
};
exports.TendersRepository = TendersRepository;
exports.TendersRepository = TendersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tender_schema_1.TenderSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof tender_schema_factory_1.TenderSchemaFactory !== "undefined" && tender_schema_factory_1.TenderSchemaFactory) === "function" ? _b : Object])
], TendersRepository);


/***/ }),
/* 254 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatedTenderSchema = exports.TenderSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mongodb_1 = __webpack_require__(30);
const base_with_Info_schema_1 = __webpack_require__(37);
const schemas_names_1 = __webpack_require__(34);
const media_schema_1 = __webpack_require__(170);
const category_schema_1 = __webpack_require__(186);
const tender_type_enum_1 = __webpack_require__(255);
const tender_status_enum_1 = __webpack_require__(251);
const receive_documents_type_enum_1 = __webpack_require__(250);
const company_schema_1 = __webpack_require__(211);
const user_schema_1 = __webpack_require__(36);
const Paylater_type_enum_1 = __webpack_require__(252);
let TenderSchema = class TenderSchema extends base_with_Info_schema_1.BaseWithInfoSchema {
};
exports.TenderSchema = TenderSchema;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", String)
], TenderSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.SchemaTypes.Number,
    }),
    __metadata("design:type", Number)
], TenderSchema.prototype, "minValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.SchemaTypes.Number,
    }),
    __metadata("design:type", Number)
], TenderSchema.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.SchemaTypes.Date,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], TenderSchema.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.SchemaTypes.Date,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], TenderSchema.prototype, "deliverDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: tender_type_enum_1.TenderTypeEnum,
        default: tender_type_enum_1.TenderTypeEnum.TINY,
    }),
    __metadata("design:type", String)
], TenderSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: tender_status_enum_1.TenderStatusEnum,
        default: tender_status_enum_1.TenderStatusEnum.PLANING,
    }),
    __metadata("design:type", String)
], TenderSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: [],
        type: [
            {
                type: mongoose_2.Types.ObjectId,
                ref: category_schema_1.CategorySchema.name,
            },
        ],
    }),
    __metadata("design:type", Array)
], TenderSchema.prototype, "categoriesIds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenderSchema.prototype, "region", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenderSchema.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenderSchema.prototype, "fileName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenderSchema.prototype, "fileDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: media_schema_1.MediaSchema.name,
    }),
    __metadata("design:type", typeof (_c = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _c : Object)
], TenderSchema.prototype, "fileId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenderSchema.prototype, "attachmentName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenderSchema.prototype, "attachmentDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: media_schema_1.MediaSchema.name,
    }),
    __metadata("design:type", typeof (_d = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _d : Object)
], TenderSchema.prototype, "attachmentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], TenderSchema.prototype, "attachmentRequired", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], TenderSchema.prototype, "attachmentDeliverDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: receive_documents_type_enum_1.ReceiveDocumentsTypeEnum,
        default: receive_documents_type_enum_1.ReceiveDocumentsTypeEnum.BOTH,
    }),
    __metadata("design:type", String)
], TenderSchema.prototype, "receiveDocumentsType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: Paylater_type_enum_1.PaylaterTypeEnum,
        default: Paylater_type_enum_1.PaylaterTypeEnum.NO,
    }),
    __metadata("design:type", String)
], TenderSchema.prototype, "Paylater", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenderSchema.prototype, "contactInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: company_schema_1.CompanySchema.name,
    }),
    __metadata("design:type", typeof (_e = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _e : Object)
], TenderSchema.prototype, "companyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchema.name,
    }),
    __metadata("design:type", typeof (_f = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _f : Object)
], TenderSchema.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                item: { type: String, required: true },
                quantity: { type: Number, required: true },
                unit: { type: String, required: false },
                notice: { type: String, required: false },
                attachment: { type: mongoose_2.SchemaTypes.Mixed, required: false }
            }],
        default: [],
    }),
    __metadata("design:type", Array)
], TenderSchema.prototype, "products", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], TenderSchema.prototype, "TenderNr", void 0);
exports.TenderSchema = TenderSchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.tenders,
        versionKey: false,
        timestamps: false,
    })
], TenderSchema);
exports.CreatedTenderSchema = mongoose_1.SchemaFactory
    .createForClass(TenderSchema);
exports.CreatedTenderSchema
    .virtual('categories', {
    ref: category_schema_1.CategorySchema.name,
    localField: 'categoriesIds',
    foreignField: '_id',
    justOne: false,
});
exports.CreatedTenderSchema
    .set('toJSON', {
    virtuals: true,
});
exports.CreatedTenderSchema
    .set('toObject', {
    virtuals: true,
});


/***/ }),
/* 255 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderTypeEnum = void 0;
var TenderTypeEnum;
(function (TenderTypeEnum) {
    TenderTypeEnum["TINY"] = "Tiny";
    TenderTypeEnum["HUGE"] = "Huge";
})(TenderTypeEnum || (exports.TenderTypeEnum = TenderTypeEnum = {}));


/***/ }),
/* 256 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderSchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const tender_1 = __webpack_require__(249);
const mongo_functions_1 = __webpack_require__(29);
let TenderSchemaFactory = class TenderSchemaFactory {
    create(entity) {
        return {
            _id: (0, mongo_functions_1.createObjectId)(entity._id),
            title: entity.title,
            minValue: entity.minValue,
            value: entity.value,
            endDate: entity.endDate,
            deliverDate: entity.deliverDate,
            type: entity.type,
            status: entity.status,
            categoriesIds: (0, mongo_functions_1.createObjectIds)(entity.categoriesIds),
            categories: null,
            region: entity.region,
            city: entity.city,
            fileName: entity.fileName,
            fileDescription: entity.fileDescription,
            fileId: (0, mongo_functions_1.createObjectId)(entity.fileId),
            attachmentName: entity.attachmentName,
            attachmentDescription: entity.attachmentDescription,
            attachmentId: (0, mongo_functions_1.createObjectId)(entity.attachmentId),
            attachmentRequired: entity.attachmentRequired,
            attachmentDeliverDays: entity.attachmentDeliverDays,
            receiveDocumentsType: entity.receiveDocumentsType,
            Paylater: entity.Paylater,
            contactInfo: entity.contactInfo,
            companyId: (0, mongo_functions_1.createObjectId)(entity.companyId),
            userId: (0, mongo_functions_1.createObjectId)(entity.userId),
            products: entity.products,
            TenderNr: entity.TenderNr,
            displayOrder: entity.displayOrder,
            isVisible: entity.isVisible,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
            createdBy: entity.createdBy,
            updatedBy: entity.updatedBy,
            deletedBy: entity.deletedBy,
        };
    }
    createFromSchema(entitySchema) {
        return new tender_1.Tender((0, mongo_functions_1.fromObjectId)(entitySchema._id), entitySchema.title, entitySchema.minValue, entitySchema.value, entitySchema.endDate, entitySchema.deliverDate, entitySchema.type, entitySchema.status, (0, mongo_functions_1.fromObjectIds)(entitySchema.categoriesIds), entitySchema.categories, entitySchema.region, entitySchema.city, entitySchema.fileName, entitySchema.fileDescription, (0, mongo_functions_1.fromObjectId)(entitySchema.fileId), entitySchema.attachmentName, entitySchema.attachmentDescription, (0, mongo_functions_1.fromObjectId)(entitySchema.attachmentId), entitySchema.attachmentRequired, entitySchema.attachmentDeliverDays, entitySchema.receiveDocumentsType, entitySchema.Paylater, entitySchema.contactInfo, (0, mongo_functions_1.fromObjectId)(entitySchema.companyId), (0, mongo_functions_1.fromObjectId)(entitySchema.userId), entitySchema.products, entitySchema.TenderNr, entitySchema.displayOrder, entitySchema.isVisible, entitySchema.createdAt, entitySchema.updatedAt, entitySchema.deletedAt, entitySchema.createdBy, entitySchema.updatedBy, entitySchema.deletedBy);
    }
};
exports.TenderSchemaFactory = TenderSchemaFactory;
exports.TenderSchemaFactory = TenderSchemaFactory = __decorate([
    (0, common_1.Injectable)()
], TenderSchemaFactory);


/***/ }),
/* 257 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersController = void 0;
const common_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(69);
const roles_guard_1 = __webpack_require__(85);
const cqrs_1 = __webpack_require__(41);
const tenders_get_all_response_1 = __webpack_require__(258);
const tenders_upsert_request_1 = __webpack_require__(259);
const tenders_get_request_1 = __webpack_require__(260);
const tenders_get_all_request_1 = __webpack_require__(261);
const tenders_delete_request_1 = __webpack_require__(262);
const tenders_get_query_1 = __webpack_require__(263);
const tenders_get_all_query_1 = __webpack_require__(264);
const tenders_upsert_command_1 = __webpack_require__(265);
const tenders_delete_command_1 = __webpack_require__(266);
const tenders_change_status_command_1 = __webpack_require__(267);
const tenders_change_status_request_1 = __webpack_require__(268);
const app_response_1 = __webpack_require__(87);
const tender_status_enum_1 = __webpack_require__(251);
const getCompanyById_1 = __webpack_require__(269);
const tenders_cron_service_1 = __webpack_require__(270);
let TendersController = class TendersController {
    constructor(queryBus, commandBus, companyService, tendersCronService) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
        this.companyService = companyService;
        this.tendersCronService = tendersCronService;
    }
    async upsert(tendersUpsertRequest, req) {
        const { userId } = req.user;
        const command = new tenders_upsert_command_1.TendersUpsertCommand(tendersUpsertRequest.id ? tendersUpsertRequest.id : null, tendersUpsertRequest.title, tendersUpsertRequest.minValue, tendersUpsertRequest.value, tendersUpsertRequest.endDate, tendersUpsertRequest.deliverDate, tendersUpsertRequest.type, tendersUpsertRequest.status ?
            tendersUpsertRequest.status
            : tender_status_enum_1.TenderStatusEnum.PLANING, tendersUpsertRequest.categoriesIds, tendersUpsertRequest.region, tendersUpsertRequest.city, tendersUpsertRequest.fileName, tendersUpsertRequest.fileDescription, tendersUpsertRequest.fileId, tendersUpsertRequest.attachmentName, tendersUpsertRequest.attachmentDescription, tendersUpsertRequest.attachmentId, tendersUpsertRequest.attachmentRequired, tendersUpsertRequest.attachmentDeliverDays, tendersUpsertRequest.receiveDocumentsType, tendersUpsertRequest.Paylater, tendersUpsertRequest.contactInfo, tendersUpsertRequest.companyId ? tendersUpsertRequest.companyId : null, userId, tendersUpsertRequest.products, tendersUpsertRequest.TenderNr);
        const result = await this.commandBus.execute(command);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async Send(tendersChangeStatusRequest, req) {
        const { userId } = req.user;
        const command = new tenders_change_status_command_1.TendersChangeStatusCommand(tendersChangeStatusRequest.id, tendersChangeStatusRequest.status, null, userId);
        const result = await this.commandBus.execute(command);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async changeStatus(tendersChangeStatusRequest, req) {
        const { userId } = req.user;
        const command = new tenders_change_status_command_1.TendersChangeStatusCommand(tendersChangeStatusRequest.id, tendersChangeStatusRequest.status, tendersChangeStatusRequest.tenderQuotationId, userId);
        const result = await this.commandBus.execute(command);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async delete(tendersDeleteRequest, req) {
        const { userId } = req.user;
        const command = new tenders_delete_command_1.TendersDeleteCommand(tendersDeleteRequest.id, userId);
        const result = await this.commandBus.execute(command);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, null, null, result.error);
    }
    async get(tendersGetRequest) {
        const query = new tenders_get_query_1.TendersGetQuery(tendersGetRequest.id);
        const result = await this.queryBus.execute(query);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async getAll(tendersGetAllRequest, req) {
        const { userId } = req.user || {};
        const query = new tenders_get_all_query_1.TendersGetAllQuery(tendersGetAllRequest.pageSize, tendersGetAllRequest.pageNumber, tendersGetAllRequest.withPaging, tendersGetAllRequest.search, tendersGetAllRequest.type, tendersGetAllRequest.status, tendersGetAllRequest.categoriesIds, tendersGetAllRequest.companyId, !userId ? null : userId);
        const result = await this.queryBus.execute(query);
        const responseData = result.data ?
            result.data.map((tender) => tenders_get_all_response_1.TendersGetAllResponse.create(tender.id, tender.title, tender.minValue, tender.value, tender.endDate, tender.deliverDate, tender.type, tender.status, tender.categoriesIds, tender.categories, tender.region, tender.city, tender.attachmentRequired, tender.receiveDocumentsType, tender.Paylater, tender.companyId, tender.userId, tender.TenderNr))
            : [];
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
    async getAllpayment(tendersGetAllRequest, req) {
        const { userId } = req.user || {};
        const statuses = [
            tender_status_enum_1.TenderStatusEnum.ACCEPTED,
            tender_status_enum_1.TenderStatusEnum.PAYMENT,
            tender_status_enum_1.TenderStatusEnum.PAYMENTCONFIRM,
            tender_status_enum_1.TenderStatusEnum.SENDING,
        ];
        const query = new tenders_get_all_query_1.TendersGetAllQuery(tendersGetAllRequest.pageSize, tendersGetAllRequest.pageNumber, tendersGetAllRequest.withPaging, tendersGetAllRequest.search, tendersGetAllRequest.type, statuses, tendersGetAllRequest.categoriesIds, tendersGetAllRequest.companyId, userId);
        const result = await this.queryBus.execute(query);
        const responseData = result.data ?
            result.data.map((tender) => tenders_get_all_response_1.TendersGetAllResponse.create(tender.id, tender.title, tender.minValue, tender.value, tender.endDate, tender.deliverDate, tender.type, tender.status, tender.categoriesIds, tender.categories, tender.region, tender.city, tender.attachmentRequired, tender.receiveDocumentsType, tender.Paylater, tender.companyId, tender.userId))
            : [];
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
    async getAllbyCompany(tendersGetAllRequest, req) {
        const { companyId } = req.query;
        const { userId, roles } = req.user;
        const query = new tenders_get_all_query_1.TendersGetAllQuery(null, null, null, null, null, null, null, companyId, null);
        const result = await this.queryBus.execute(query);
        const responseData = result.data ?
            result.data.map((tender) => tenders_get_all_response_1.TendersGetAllResponse.create(tender.id, tender.title, tender.minValue, tender.value, tender.endDate, tender.deliverDate, tender.type, tender.status, tender.categoriesIds, tender.categories, tender.region, tender.city, tender.attachmentRequired, tender.receiveDocumentsType, tender.Paylater, tender.companyId, tender.userId))
            : [];
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
    async getMyAll(tendersGetAllRequest, req) {
        const { userId } = req.user || {};
        const query = new tenders_get_all_query_1.TendersGetAllQuery(tendersGetAllRequest.pageSize, tendersGetAllRequest.pageNumber, tendersGetAllRequest.withPaging, tendersGetAllRequest.search, tendersGetAllRequest.type, tendersGetAllRequest.status, tendersGetAllRequest.categoriesIds, tendersGetAllRequest.companyId, userId);
        const result = await this.queryBus.execute(query);
        const responseData = result.data ?
            await Promise.all(result.data
                .filter((item) => item.userId === userId)
                .map(async (tender) => {
                const company = await this.companyService.getCompanyById(tender.companyId);
                return tenders_get_all_response_1.TendersGetAllResponse.create(tender.id, tender.title, tender.minValue, tender.value, tender.endDate, tender.deliverDate, tender.type, tender.status, tender.categoriesIds, tender.categories, tender.region, tender.city, tender.attachmentRequired, tender.receiveDocumentsType, tender.Paylater, tender.companyId, tender.userId, tender.TenderNr, company);
            }))
            : [];
        responseData;
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
    async getAllTotal(req) {
        const { userId } = req.user;
        const status = tender_status_enum_1.TenderStatusEnum.CLOSED;
        const query = new tenders_get_all_query_1.TendersGetAllQuery(10, 1, false, null, null, status, null, null, userId);
        const openedTenders = await this.queryBus.execute(query);
        return { total: openedTenders.data ? openedTenders.data.length : 0 };
    }
    async getAllTotalByStatus(req) {
        const { userId } = req.user;
        const query = new tenders_get_all_query_1.TendersGetAllQuery(10, 1, false, null, null, null, null, null, userId);
        const Tenders = await this.queryBus.execute(query);
        const statusCountMap = {};
        if (Tenders.data.filter((item) => item.userId === userId)) {
            Tenders.data
                .filter((item) => item.userId === userId)
                .forEach((tender) => {
                const status = tender.status;
                if (statusCountMap[status]) {
                    statusCountMap[status]++;
                }
                else {
                    statusCountMap[status] = 1;
                }
            });
        }
        const result = Object.entries(statusCountMap).map(([status, total]) => ({
            status,
            total,
        }));
        return result;
    }
    async runCronManually(req) {
        await this.tendersCronService.checkAndCloseExpiredTenders();
        return "Cron job executed manually!";
    }
};
exports.TendersController = TendersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("upsert"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof tenders_upsert_request_1.TendersUpsertRequest !== "undefined" && tenders_upsert_request_1.TendersUpsertRequest) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], TendersController.prototype, "upsert", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("send"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof tenders_change_status_request_1.TendersChangeStatusRequest !== "undefined" && tenders_change_status_request_1.TendersChangeStatusRequest) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], TendersController.prototype, "Send", null);
__decorate([
    (0, common_1.Post)("changeStatus"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof tenders_change_status_request_1.TendersChangeStatusRequest !== "undefined" && tenders_change_status_request_1.TendersChangeStatusRequest) === "function" ? _j : Object, Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], TendersController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("delete"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof tenders_delete_request_1.TendersDeleteRequest !== "undefined" && tenders_delete_request_1.TendersDeleteRequest) === "function" ? _l : Object, Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], TendersController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("get"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof tenders_get_request_1.TendersGetRequest !== "undefined" && tenders_get_request_1.TendersGetRequest) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], TendersController.prototype, "get", null);
__decorate([
    (0, common_1.Get)("getAll"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof tenders_get_all_request_1.TendersGetAllRequest !== "undefined" && tenders_get_all_request_1.TendersGetAllRequest) === "function" ? _q : Object, Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], TendersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("getAll/payment"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof tenders_get_all_request_1.TendersGetAllRequest !== "undefined" && tenders_get_all_request_1.TendersGetAllRequest) === "function" ? _s : Object, Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], TendersController.prototype, "getAllpayment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)("getAll/Company"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof tenders_get_all_request_1.TendersGetAllRequest !== "undefined" && tenders_get_all_request_1.TendersGetAllRequest) === "function" ? _u : Object, Object]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], TendersController.prototype, "getAllbyCompany", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("getMy"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_w = typeof tenders_get_all_request_1.TendersGetAllRequest !== "undefined" && tenders_get_all_request_1.TendersGetAllRequest) === "function" ? _w : Object, Object]),
    __metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], TendersController.prototype, "getMyAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("getTotal/Closed"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], TendersController.prototype, "getAllTotal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("getTotal/ByStatus"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_z = typeof Promise !== "undefined" && Promise) === "function" ? _z : Object)
], TendersController.prototype, "getAllTotalByStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("run-cron-manually"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_0 = typeof Promise !== "undefined" && Promise) === "function" ? _0 : Object)
], TendersController.prototype, "runCronManually", null);
exports.TendersController = TendersController = __decorate([
    (0, common_1.Controller)({
        path: "web/tenders",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object, typeof (_c = typeof getCompanyById_1.CompanyService !== "undefined" && getCompanyById_1.CompanyService) === "function" ? _c : Object, typeof (_d = typeof tenders_cron_service_1.TendersCronService !== "undefined" && tenders_cron_service_1.TendersCronService) === "function" ? _d : Object])
], TendersController);


/***/ }),
/* 258 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersGetAllResponse = void 0;
const Paylater_type_enum_1 = __webpack_require__(252);
const receive_documents_type_enum_1 = __webpack_require__(250);
class TendersGetAllResponse {
    constructor(id, title, minValue, value, endDate, deliverDate, type, status, categoriesIds = [], categories = [], region, city, attachmentRequired = false, receiveDocumentsType = receive_documents_type_enum_1.ReceiveDocumentsTypeEnum.BOTH, Paylater = Paylater_type_enum_1.PaylaterTypeEnum.NO, companyId = '', userId = '', TenderNr, company) {
        this.id = id;
        this.title = title;
        this.minValue = minValue;
        this.value = value;
        this.endDate = endDate;
        this.deliverDate = deliverDate;
        this.type = type;
        this.status = status;
        this.categoriesIds = categoriesIds;
        this.categories = categories;
        this.region = region;
        this.city = city;
        this.attachmentRequired = attachmentRequired;
        this.receiveDocumentsType = receiveDocumentsType;
        this.Paylater = Paylater;
        this.companyId = companyId;
        this.userId = userId;
        this.TenderNr = TenderNr;
        this.company = company;
    }
    static create(id, title, minValue, value, endDate, deliverDate, type, status = null, categoriesIds = [], categories = [], region = null, city = null, attachmentRequired = false, receiveDocumentsType = receive_documents_type_enum_1.ReceiveDocumentsTypeEnum.BOTH, Paylater = Paylater_type_enum_1.PaylaterTypeEnum.NO, companyId = '', userId = '', TenderNr = null, company) {
        return new TendersGetAllResponse(id, title, minValue, value, endDate, deliverDate, type, status, categoriesIds, categories, region, city, attachmentRequired, receiveDocumentsType, Paylater, companyId, userId, TenderNr, company);
    }
}
exports.TendersGetAllResponse = TendersGetAllResponse;


/***/ }),
/* 259 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersUpsertRequest = void 0;
const class_validator_1 = __webpack_require__(55);
const class_transformer_1 = __webpack_require__(72);
const tender_type_enum_1 = __webpack_require__(255);
const tender_status_enum_1 = __webpack_require__(251);
const receive_documents_type_enum_1 = __webpack_require__(250);
const Paylater_type_enum_1 = __webpack_require__(252);
class Product {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "item", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], Product.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof File !== "undefined" && File) === "function" ? _a : Object)
], Product.prototype, "attachment", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "notice", void 0);
class TendersUpsertRequest {
}
exports.TendersUpsertRequest = TendersUpsertRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TendersUpsertRequest.prototype, "minValue", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TendersUpsertRequest.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], TendersUpsertRequest.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], TendersUpsertRequest.prototype, "deliverDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tender_type_enum_1.TenderTypeEnum),
    __metadata("design:type", typeof (_d = typeof tender_type_enum_1.TenderTypeEnum !== "undefined" && tender_type_enum_1.TenderTypeEnum) === "function" ? _d : Object)
], TendersUpsertRequest.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tender_status_enum_1.TenderStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_e = typeof tender_status_enum_1.TenderStatusEnum !== "undefined" && tender_status_enum_1.TenderStatusEnum) === "function" ? _e : Object)
], TendersUpsertRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({
        each: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TendersUpsertRequest.prototype, "categoriesIds", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "region", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "fileDescription", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "fileId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "attachmentName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "attachmentDescription", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "attachmentId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TendersUpsertRequest.prototype, "attachmentRequired", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TendersUpsertRequest.prototype, "attachmentDeliverDays", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(receive_documents_type_enum_1.ReceiveDocumentsTypeEnum),
    __metadata("design:type", typeof (_f = typeof receive_documents_type_enum_1.ReceiveDocumentsTypeEnum !== "undefined" && receive_documents_type_enum_1.ReceiveDocumentsTypeEnum) === "function" ? _f : Object)
], TendersUpsertRequest.prototype, "receiveDocumentsType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Paylater_type_enum_1.PaylaterTypeEnum),
    __metadata("design:type", typeof (_g = typeof Paylater_type_enum_1.PaylaterTypeEnum !== "undefined" && Paylater_type_enum_1.PaylaterTypeEnum) === "function" ? _g : Object)
], TendersUpsertRequest.prototype, "Paylater", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "contactInfo", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersUpsertRequest.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Product),
    __metadata("design:type", Array)
], TendersUpsertRequest.prototype, "products", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TendersUpsertRequest.prototype, "TenderNr", void 0);


/***/ }),
/* 260 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersGetRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class TendersGetRequest {
}
exports.TendersGetRequest = TendersGetRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], TendersGetRequest.prototype, "id", void 0);


/***/ }),
/* 261 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersGetAllRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const app_paging_request_1 = __webpack_require__(79);
const app_transforms_1 = __webpack_require__(80);
const tender_status_enum_1 = __webpack_require__(251);
const tender_type_enum_1 = __webpack_require__(255);
class TendersGetAllRequest extends app_paging_request_1.AppPagingRequest {
    constructor() {
        super(...arguments);
        this.search = null;
        this.type = null;
        this.status = null;
        this.categoriesIds = null;
        this.companyId = null;
    }
}
exports.TendersGetAllRequest = TendersGetAllRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], TendersGetAllRequest.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tender_type_enum_1.TenderTypeEnum),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", typeof (_a = typeof tender_type_enum_1.TenderTypeEnum !== "undefined" && tender_type_enum_1.TenderTypeEnum) === "function" ? _a : Object)
], TendersGetAllRequest.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tender_status_enum_1.TenderStatusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", typeof (_b = typeof tender_status_enum_1.TenderStatusEnum !== "undefined" && tender_status_enum_1.TenderStatusEnum) === "function" ? _b : Object)
], TendersGetAllRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringCommasSeparatedTransform),
    __metadata("design:type", Array)
], TendersGetAllRequest.prototype, "categoriesIds", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], TendersGetAllRequest.prototype, "companyId", void 0);


/***/ }),
/* 262 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersDeleteRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class TendersDeleteRequest {
}
exports.TendersDeleteRequest = TendersDeleteRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], TendersDeleteRequest.prototype, "id", void 0);


/***/ }),
/* 263 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersGetQuery = void 0;
class TendersGetQuery {
    constructor(id) {
        this.id = id;
    }
}
exports.TendersGetQuery = TendersGetQuery;


/***/ }),
/* 264 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersGetAllQuery = void 0;
class TendersGetAllQuery {
    constructor(pageSize, pageNumber, withPaging, search, type, status, categoriesIds, companyId, userId) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.withPaging = withPaging;
        this.search = search;
        this.type = type;
        this.status = status;
        this.categoriesIds = categoriesIds;
        this.companyId = companyId;
        this.userId = userId;
    }
}
exports.TendersGetAllQuery = TendersGetAllQuery;


/***/ }),
/* 265 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersUpsertCommand = void 0;
class TendersUpsertCommand {
    constructor(id, title, minValue, value, endDate, deliverDate, type, status, categoriesIds, region, city, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired, attachmentDeliverDays, receiveDocumentsType, Paylater, contactInfo, companyId = '', userId = '', products = [], TenderNr = 1000) {
        this.id = id;
        this.title = title;
        this.minValue = minValue;
        this.value = value;
        this.endDate = endDate;
        this.deliverDate = deliverDate;
        this.type = type;
        this.status = status;
        this.categoriesIds = categoriesIds;
        this.region = region;
        this.city = city;
        this.fileName = fileName;
        this.fileDescription = fileDescription;
        this.fileId = fileId;
        this.attachmentName = attachmentName;
        this.attachmentDescription = attachmentDescription;
        this.attachmentId = attachmentId;
        this.attachmentRequired = attachmentRequired;
        this.attachmentDeliverDays = attachmentDeliverDays;
        this.receiveDocumentsType = receiveDocumentsType;
        this.Paylater = Paylater;
        this.contactInfo = contactInfo;
        this.companyId = companyId;
        this.userId = userId;
        this.products = products;
        this.TenderNr = TenderNr;
    }
}
exports.TendersUpsertCommand = TendersUpsertCommand;


/***/ }),
/* 266 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersDeleteCommand = void 0;
class TendersDeleteCommand {
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
    }
}
exports.TendersDeleteCommand = TendersDeleteCommand;


/***/ }),
/* 267 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersChangeStatusCommand = void 0;
class TendersChangeStatusCommand {
    constructor(id, status, tenderQuotationId, userId = '') {
        this.id = id;
        this.status = status;
        this.tenderQuotationId = tenderQuotationId;
        this.userId = userId;
    }
}
exports.TendersChangeStatusCommand = TendersChangeStatusCommand;


/***/ }),
/* 268 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersChangeStatusRequest = void 0;
const class_validator_1 = __webpack_require__(55);
const tender_status_enum_1 = __webpack_require__(251);
class TendersChangeStatusRequest {
}
exports.TendersChangeStatusRequest = TendersChangeStatusRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersChangeStatusRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tender_status_enum_1.TenderStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof tender_status_enum_1.TenderStatusEnum !== "undefined" && tender_status_enum_1.TenderStatusEnum) === "function" ? _a : Object)
], TendersChangeStatusRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TendersChangeStatusRequest.prototype, "tenderQuotationId", void 0);


/***/ }),
/* 269 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanyService = void 0;
const common_1 = __webpack_require__(3);
const companies_repository_1 = __webpack_require__(210);
let CompanyService = class CompanyService {
    constructor(companiesRepository) {
        this.companiesRepository = companiesRepository;
    }
    async getCompanyById(companyId) {
        return this.companiesRepository.getById(companyId);
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _a : Object])
], CompanyService);


/***/ }),
/* 270 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TendersCronService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersCronService = void 0;
const common_1 = __webpack_require__(3);
const schedule_1 = __webpack_require__(271);
const tenders_repository_1 = __webpack_require__(253);
const tender_status_enum_1 = __webpack_require__(251);
const tender_quotations_repository_1 = __webpack_require__(272);
const mongo_functions_1 = __webpack_require__(29);
let TendersCronService = TendersCronService_1 = class TendersCronService {
    constructor(tendersRepository, tenderQuotationsRepository) {
        this.tendersRepository = tendersRepository;
        this.tenderQuotationsRepository = tenderQuotationsRepository;
        this.logger = new common_1.Logger(TendersCronService_1.name);
    }
    async checkAndCloseExpiredTenders() {
        this.logger.log('Running cron job to check and close expired tenders.');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const twoMonthsAgo = new Date(today);
        twoMonthsAgo.setMonth(today.getMonth() - 2);
        try {
            const expiredTenders = await this.tendersRepository.getAll({
                status: { $nin: [tender_status_enum_1.TenderStatusEnum.PLANING, tender_status_enum_1.TenderStatusEnum.FINISHED] },
                endDate: { $lt: twoMonthsAgo },
            });
            if (expiredTenders.length === 0) {
                this.logger.log('No expired tenders found.');
                return;
            }
            for (const tender of expiredTenders) {
                await this.tendersRepository.updateStatus(tender._id, tender_status_enum_1.TenderStatusEnum.FINISHED);
                this.logger.log(`Tender ID: ${tender._id} has been marked as Closed.`);
                const quotations = await this.tenderQuotationsRepository.getAll({ tenderId: (0, mongo_functions_1.createObjectId)(tender._id),
                    status: { $in: [tender_status_enum_1.TenderStatusEnum.PENDING] }
                });
                for (const quatation of quotations) {
                    await this.tenderQuotationsRepository.updateStatus(quatation._id, tender_status_enum_1.TenderStatusEnum.CANCELLED);
                    this.logger.log(`Quatation ID: ${quatation._id} has been marked as Closed.`);
                }
            }
            this.logger.log(`Updated ${expiredTenders.length} expired tenders.`);
        }
        catch (error) {
            this.logger.error('Error in closing expired tenders:', error);
        }
    }
};
exports.TendersCronService = TendersCronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TendersCronService.prototype, "checkAndCloseExpiredTenders", null);
exports.TendersCronService = TendersCronService = TendersCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof tenders_repository_1.TendersRepository !== "undefined" && tenders_repository_1.TendersRepository) === "function" ? _a : Object, typeof (_b = typeof tender_quotations_repository_1.TenderQuotationsRepository !== "undefined" && tender_quotations_repository_1.TenderQuotationsRepository) === "function" ? _b : Object])
], TendersCronService);


/***/ }),
/* 271 */
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 272 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const base_repository_1 = __webpack_require__(26);
const tender_quotation_schema_1 = __webpack_require__(273);
const tender_quotation_schema_factory_1 = __webpack_require__(277);
let TenderQuotationsRepository = class TenderQuotationsRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
};
exports.TenderQuotationsRepository = TenderQuotationsRepository;
exports.TenderQuotationsRepository = TenderQuotationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tender_quotation_schema_1.TenderQuotationSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof tender_quotation_schema_factory_1.TenderQuotationSchemaFactory !== "undefined" && tender_quotation_schema_factory_1.TenderQuotationSchemaFactory) === "function" ? _b : Object])
], TenderQuotationsRepository);


/***/ }),
/* 273 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatedTenderQuotationSchema = exports.TenderQuotationSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mongodb_1 = __webpack_require__(30);
const base_with_Info_schema_1 = __webpack_require__(37);
const schemas_names_1 = __webpack_require__(34);
const company_schema_1 = __webpack_require__(211);
const user_schema_1 = __webpack_require__(36);
const tender_quotation_status_enum_1 = __webpack_require__(274);
const tender_schema_1 = __webpack_require__(254);
const item_schema_1 = __webpack_require__(275);
let TenderQuotationSchema = class TenderQuotationSchema extends base_with_Info_schema_1.BaseWithInfoSchema {
};
exports.TenderQuotationSchema = TenderQuotationSchema;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, mongoose_1.Prop)({
        type: [{
                productId: { type: String, ref: item_schema_1.ItemSchema.name, required: true },
                unitName: { type: String, required: true },
                quantity: { type: Number, required: true },
                unitPrice: { type: Number, required: true },
                attachment: { type: mongoose_2.SchemaTypes.Mixed, required: false },
                image: { type: String, required: false },
                notice: { type: String, required: false },
                SKUCode: { type: String, required: false },
                vat: { type: String, required: false },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], TenderQuotationSchema.prototype, "products", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenderQuotationSchema.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenderQuotationSchema.prototype, "DeadLineDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenderQuotationSchema.prototype, "DeliveryMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TenderQuotationSchema.prototype, "contactMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], TenderQuotationSchema.prototype, "OpportunityNr", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: tender_quotation_status_enum_1.TenderQuotationStatusEnum,
        default: tender_quotation_status_enum_1.TenderQuotationStatusEnum.PENDING,
    }),
    __metadata("design:type", String)
], TenderQuotationSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: tender_schema_1.TenderSchema.name,
    }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], TenderQuotationSchema.prototype, "tenderId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: company_schema_1.CompanySchema.name,
    }),
    __metadata("design:type", typeof (_b = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _b : Object)
], TenderQuotationSchema.prototype, "companyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchema.name,
    }),
    __metadata("design:type", typeof (_c = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _c : Object)
], TenderQuotationSchema.prototype, "userId", void 0);
exports.TenderQuotationSchema = TenderQuotationSchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.tenderQuotations,
        versionKey: false,
        timestamps: false,
    })
], TenderQuotationSchema);
exports.CreatedTenderQuotationSchema = mongoose_1.SchemaFactory
    .createForClass(TenderQuotationSchema);
exports.CreatedTenderQuotationSchema
    .virtual('company', {
    ref: company_schema_1.CompanySchema.name,
    localField: 'companyId',
    foreignField: '_id',
    justOne: true,
});
exports.CreatedTenderQuotationSchema
    .set('toJSON', {
    virtuals: true,
});
exports.CreatedTenderQuotationSchema
    .set('toObject', {
    virtuals: true,
});


/***/ }),
/* 274 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationStatusEnum = void 0;
var TenderQuotationStatusEnum;
(function (TenderQuotationStatusEnum) {
    TenderQuotationStatusEnum["PENDING"] = "Pending";
    TenderQuotationStatusEnum["ACCEPTED"] = "Accepted";
    TenderQuotationStatusEnum["CANCELLED"] = "Canceled";
})(TenderQuotationStatusEnum || (exports.TenderQuotationStatusEnum = TenderQuotationStatusEnum = {}));


/***/ }),
/* 275 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatedItemSchema = exports.ItemSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mongodb_1 = __webpack_require__(30);
const schemas_names_1 = __webpack_require__(34);
const item_status_enum_1 = __webpack_require__(276);
const company_schema_1 = __webpack_require__(211);
const user_schema_1 = __webpack_require__(36);
const base_with_Info_schema_1 = __webpack_require__(37);
let ItemSchema = class ItemSchema extends base_with_Info_schema_1.BaseWithInfoSchema {
};
exports.ItemSchema = ItemSchema;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ItemSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ItemSchema.prototype, "SKUCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ItemSchema.prototype, "manufacturer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ItemSchema.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ItemSchema.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ItemSchema.prototype, "unit", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ItemSchema.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ItemSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ItemSchema.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ItemSchema.prototype, "vat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ItemSchema.prototype, "stock", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], ItemSchema.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.String }),
    __metadata("design:type", String)
], ItemSchema.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                name: { type: String, required: true },
                description: { type: String, required: true },
                fileId: { type: String, required: false, default: null },
                filepath: { type: String, required: true },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], ItemSchema.prototype, "attachments", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: item_status_enum_1.ItemStatusEnum,
        default: item_status_enum_1.ItemStatusEnum.ACTIVE,
    }),
    __metadata("design:type", String)
], ItemSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ItemSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.SchemaTypes.ObjectId,
        ref: company_schema_1.CompanySchema.name,
    }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], ItemSchema.prototype, "companyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.SchemaTypes.ObjectId,
        ref: user_schema_1.UserSchema.name,
    }),
    __metadata("design:type", typeof (_b = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _b : Object)
], ItemSchema.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], ItemSchema.prototype, "ItemNR", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], ItemSchema.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], ItemSchema.prototype, "isVisible", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ItemSchema.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ItemSchema.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], ItemSchema.prototype, "deletedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ItemSchema.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ItemSchema.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ItemSchema.prototype, "deletedBy", void 0);
exports.ItemSchema = ItemSchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.items,
        versionKey: false,
        timestamps: false,
    })
], ItemSchema);
exports.CreatedItemSchema = mongoose_1.SchemaFactory.createForClass(ItemSchema);
exports.CreatedItemSchema.set("toJSON", { virtuals: true });
exports.CreatedItemSchema.set("toObject", { virtuals: true });


/***/ }),
/* 276 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemStatusEnum = void 0;
var ItemStatusEnum;
(function (ItemStatusEnum) {
    ItemStatusEnum["ACTIVE"] = "Active";
    ItemStatusEnum["INACTIVE"] = "Inactive";
    ItemStatusEnum["OUT_OF_STOCK"] = "OutOfStock";
})(ItemStatusEnum || (exports.ItemStatusEnum = ItemStatusEnum = {}));


/***/ }),
/* 277 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationSchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const mongo_functions_1 = __webpack_require__(29);
const tender_quotation_1 = __webpack_require__(278);
let TenderQuotationSchemaFactory = class TenderQuotationSchemaFactory {
    create(entity) {
        return {
            _id: (0, mongo_functions_1.createObjectId)(entity._id),
            products: entity.products,
            paymentMethod: entity.paymentMethod,
            DeadLineDate: entity.DeadLineDate,
            DeliveryMethod: entity.DeliveryMethod,
            contactMethod: entity.contactMethod,
            deliverDays: entity.deliverDays,
            status: entity.status,
            tenderId: (0, mongo_functions_1.createObjectId)(entity.tenderId),
            company: null,
            companyId: (0, mongo_functions_1.createObjectId)(entity.companyId),
            userId: (0, mongo_functions_1.createObjectId)(entity.userId),
            OpportunityNr: entity.OpportunityNr,
            displayOrder: entity.displayOrder,
            isVisible: entity.isVisible,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
            createdBy: entity.createdBy,
            updatedBy: entity.updatedBy,
            deletedBy: entity.deletedBy,
        };
    }
    createFromSchema(entitySchema) {
        return new tender_quotation_1.TenderQuotation((0, mongo_functions_1.fromObjectId)(entitySchema._id), entitySchema.products, entitySchema.paymentMethod, entitySchema.DeadLineDate, entitySchema.DeliveryMethod, entitySchema.contactMethod, entitySchema.deliverDays, entitySchema.status, (0, mongo_functions_1.fromObjectId)(entitySchema.tenderId), (0, mongo_functions_1.fromObjectId)(entitySchema.companyId), entitySchema.company, (0, mongo_functions_1.fromObjectId)(entitySchema.userId), entitySchema.OpportunityNr, entitySchema.displayOrder, entitySchema.isVisible, entitySchema.createdAt, entitySchema.updatedAt, entitySchema.deletedAt, entitySchema.createdBy, entitySchema.updatedBy, entitySchema.deletedBy);
    }
};
exports.TenderQuotationSchemaFactory = TenderQuotationSchemaFactory;
exports.TenderQuotationSchemaFactory = TenderQuotationSchemaFactory = __decorate([
    (0, common_1.Injectable)()
], TenderQuotationSchemaFactory);


/***/ }),
/* 278 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotation = void 0;
const cqrs_1 = __webpack_require__(41);
const mongo_functions_1 = __webpack_require__(29);
const tender_quotation_status_enum_1 = __webpack_require__(274);
class TenderQuotation extends cqrs_1.AggregateRoot {
    constructor(_id, products = [], paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status = tender_quotation_status_enum_1.TenderQuotationStatusEnum.PENDING, tenderId = '', companyId = '', company, userId = '', OpportunityNr = 0, displayOrder = 0, isVisible = true, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy) {
        super();
        this._id = _id;
        this.products = products;
        this.paymentMethod = paymentMethod;
        this.DeadLineDate = DeadLineDate;
        this.DeliveryMethod = DeliveryMethod;
        this.contactMethod = contactMethod;
        this.deliverDays = deliverDays;
        this.status = status;
        this.tenderId = tenderId;
        this.companyId = companyId;
        this.company = company;
        this.userId = userId;
        this.OpportunityNr = OpportunityNr;
        this.displayOrder = displayOrder;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
    static create(id, products = [], paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status = tender_quotation_status_enum_1.TenderQuotationStatusEnum.PENDING, tenderId = '', companyId = '', company, userId = '', OpportunityNr = 0, displayOrder = 0, isVisible = true, createdAt = null, updatedAt = null, deletedAt = null, createdBy = null, updatedBy = null, deletedBy = null) {
        return new TenderQuotation((0, mongo_functions_1.createObjectIdAsString)(id), products, paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, company, userId, OpportunityNr, displayOrder, isVisible, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy);
    }
}
exports.TenderQuotation = TenderQuotation;


/***/ }),
/* 279 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersUpsertHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const tenders_upsert_command_1 = __webpack_require__(265);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const tenders_repository_1 = __webpack_require__(253);
const tender_factory_1 = __webpack_require__(248);
const tenders_get_result_1 = __webpack_require__(280);
const companies_repository_1 = __webpack_require__(210);
let TendersUpsertHandler = class TendersUpsertHandler {
    constructor(tendersRepository, tenderFactory, eventPublisher, companiesRepository) {
        this.tendersRepository = tendersRepository;
        this.tenderFactory = tenderFactory;
        this.eventPublisher = eventPublisher;
        this.companiesRepository = companiesRepository;
    }
    async execute(command) {
        const isInsert = command.id === null;
        let TenderNR = command.TenderNr;
        if (!isInsert) {
            var foundEntity = await this
                .tendersRepository
                .getById(command.id);
            if (foundEntity === null) {
                return app_result_1.AppResult
                    .createError(app_errors_1.AppErrors
                    .nullValue('tender'));
            }
            if (command.userId != foundEntity.userId) {
                return app_result_1.AppResult
                    .createError(app_errors_1.AppErrors.notRelateToYourAccount());
            }
        }
        else {
            const lastOrder = await this.tendersRepository.getLatestTender();
            const nexttendenr = lastOrder ? lastOrder.TenderNr >= 1000 ? lastOrder.TenderNr + 1 : 1000 : 1000;
            TenderNR = nexttendenr;
            await this.companiesRepository.updateTenderNr(command.companyId, nexttendenr);
        }
        let entity = await this
            .tenderFactory
            .save(command.id, command.title, command.minValue, command.value, command.endDate, command.deliverDate, command.type, command.status, command.categoriesIds, command.region, command.city, command.fileName, command.fileDescription, command.fileId, command.attachmentName, command.attachmentDescription, command.attachmentId, command.attachmentRequired, command.attachmentDeliverDays, command.receiveDocumentsType, command.Paylater, command.contactInfo, command.companyId, command.userId, command.products, TenderNR);
        entity = this
            .eventPublisher
            .mergeObjectContext(entity);
        entity
            .commit();
        const resultData = tenders_get_result_1.TendersGetResult
            .create(entity._id, entity.title, entity.minValue, entity.value, entity.endDate, entity.deliverDate, entity.type, entity.status, entity.categoriesIds, [], entity.region, entity.city, entity.fileName, entity.fileDescription, entity.fileId, entity.attachmentName, entity.attachmentDescription, entity.attachmentId, entity.attachmentRequired, entity.attachmentDeliverDays, entity.receiveDocumentsType, entity.Paylater, entity.contactInfo, entity.companyId, entity.userId, entity.products || [], entity.TenderNr);
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.TendersUpsertHandler = TendersUpsertHandler;
exports.TendersUpsertHandler = TendersUpsertHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenders_upsert_command_1.TendersUpsertCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof tenders_repository_1.TendersRepository !== "undefined" && tenders_repository_1.TendersRepository) === "function" ? _a : Object, typeof (_b = typeof tender_factory_1.TenderFactory !== "undefined" && tender_factory_1.TenderFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object, typeof (_d = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _d : Object])
], TendersUpsertHandler);


/***/ }),
/* 280 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersGetResult = void 0;
const Paylater_type_enum_1 = __webpack_require__(252);
const receive_documents_type_enum_1 = __webpack_require__(250);
class TendersGetResult {
    constructor(id, title, minValue, value, endDate, deliverDate, type, status, categoriesIds = [], categories = [], region, city, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired = false, attachmentDeliverDays, receiveDocumentsType = receive_documents_type_enum_1.ReceiveDocumentsTypeEnum.BOTH, Paylater = Paylater_type_enum_1.PaylaterTypeEnum.NO, contactInfo, companyId = '', userId = '', products = [], TenderNr = 0) {
        this.id = id;
        this.title = title;
        this.minValue = minValue;
        this.value = value;
        this.endDate = endDate;
        this.deliverDate = deliverDate;
        this.type = type;
        this.status = status;
        this.categoriesIds = categoriesIds;
        this.categories = categories;
        this.region = region;
        this.city = city;
        this.fileName = fileName;
        this.fileDescription = fileDescription;
        this.fileId = fileId;
        this.attachmentName = attachmentName;
        this.attachmentDescription = attachmentDescription;
        this.attachmentId = attachmentId;
        this.attachmentRequired = attachmentRequired;
        this.attachmentDeliverDays = attachmentDeliverDays;
        this.receiveDocumentsType = receiveDocumentsType;
        this.Paylater = Paylater;
        this.contactInfo = contactInfo;
        this.companyId = companyId;
        this.userId = userId;
        this.products = products;
        this.TenderNr = TenderNr;
    }
    static create(id, title, minValue, value, endDate, deliverDate, type, status = null, categoriesIds = [], categories = [], region = null, city = null, fileName = null, fileDescription = null, fileId = null, attachmentName = null, attachmentDescription = null, attachmentId = null, attachmentRequired = false, attachmentDeliverDays = null, receiveDocumentsType = receive_documents_type_enum_1.ReceiveDocumentsTypeEnum.BOTH, Paylater = Paylater_type_enum_1.PaylaterTypeEnum.NO, contactInfo = null, companyId = '', userId = '', products = [], TenderNr = 1000) {
        return new TendersGetResult(id, title, minValue, value, endDate, deliverDate, type, status, categoriesIds, categories, region, city, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired, attachmentDeliverDays, receiveDocumentsType, Paylater, contactInfo, companyId, userId, products, TenderNr);
    }
}
exports.TendersGetResult = TendersGetResult;


/***/ }),
/* 281 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersDeleteHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const tenders_delete_command_1 = __webpack_require__(266);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const tenders_repository_1 = __webpack_require__(253);
let TendersDeleteHandler = class TendersDeleteHandler {
    constructor(tendersRepository) {
        this.tendersRepository = tendersRepository;
    }
    async execute(command) {
        const entity = await this
            .tendersRepository
            .getById(command.id);
        if (entity === null) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors
                .nullValue('object'));
        }
        if (command.userId != entity.userId) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors.notRelateToYourAccount());
        }
        const isDeleted = await this
            .tendersRepository
            .deleteById(command.id);
        if (!isDeleted) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors.operationFailed());
        }
        return app_result_1.AppResult
            .createSuccess(null, null, null);
    }
};
exports.TendersDeleteHandler = TendersDeleteHandler;
exports.TendersDeleteHandler = TendersDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenders_delete_command_1.TendersDeleteCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof tenders_repository_1.TendersRepository !== "undefined" && tenders_repository_1.TendersRepository) === "function" ? _a : Object])
], TendersDeleteHandler);


/***/ }),
/* 282 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsController = void 0;
const common_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(69);
const roles_guard_1 = __webpack_require__(85);
const cqrs_1 = __webpack_require__(41);
const tender_quotations_delete_request_1 = __webpack_require__(283);
const tender_quotations_get_request_1 = __webpack_require__(284);
const tender_quotations_get_all_response_1 = __webpack_require__(285);
const tender_quotations_get_all_query_1 = __webpack_require__(286);
const tender_quotations_get_all_request_1 = __webpack_require__(287);
const tender_quotations_get_query_1 = __webpack_require__(288);
const tender_quotations_delete_command_1 = __webpack_require__(289);
const tender_quotations_upsert_command_1 = __webpack_require__(290);
const tender_quotations_upsert_request_1 = __webpack_require__(291);
const app_response_1 = __webpack_require__(87);
const tenders_get_all_query_1 = __webpack_require__(264);
const tender_status_enum_1 = __webpack_require__(251);
const tenders_get_query_1 = __webpack_require__(263);
const tenders_update_status_query_1 = __webpack_require__(292);
const tenders_quatation_update_status_query_1 = __webpack_require__(293);
const companies_repository_1 = __webpack_require__(210);
const tender_quotations_get_all_J2_query_1 = __webpack_require__(294);
let TenderQuotationsController = class TenderQuotationsController {
    constructor(queryBus, commandBus, companiesRepository) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
        this.companiesRepository = companiesRepository;
    }
    async upsert(tenderQuotationsUpsertRequest, req) {
        const { userId } = req.user;
        const products = tenderQuotationsUpsertRequest.products.map((product) => ({
            productId: product.productId,
            unitName: product.unitName,
            quantity: product.quantity,
            unitPrice: product.unitPrice,
            attachment: product.attachment,
            image: product.image,
            notice: product.notice,
            SKUCode: product.SKUCode,
            vat: product.vat,
        }));
        const command = new tender_quotations_upsert_command_1.TenderQuotationsUpsertCommand(tenderQuotationsUpsertRequest.id, products, tenderQuotationsUpsertRequest.paymentMethod, tenderQuotationsUpsertRequest.DeadLineDate, tenderQuotationsUpsertRequest.DeliveryMethod, tenderQuotationsUpsertRequest.contactMethod, tenderQuotationsUpsertRequest.deliverDays, tenderQuotationsUpsertRequest.status, tenderQuotationsUpsertRequest.tenderId, tenderQuotationsUpsertRequest.companyId, userId, tenderQuotationsUpsertRequest.OpportunityNr);
        console.log(command);
        const result = await this
            .commandBus
            .execute(command);
        console.log(result);
        return app_response_1.AppResponse
            .create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async delete(tenderQuotationsDeleteRequest, req) {
        const { userId } = req.user;
        const command = new tender_quotations_delete_command_1.TenderQuotationsDeleteCommand(tenderQuotationsDeleteRequest.id, userId);
        const result = await this
            .commandBus
            .execute(command);
        return app_response_1.AppResponse
            .create(result.isSuccess, result.key, result.message, null, null, result.error);
    }
    async get(tenderQuotationsGetRequest) {
        const query = new tender_quotations_get_query_1.TenderQuotationsGetQuery(tenderQuotationsGetRequest.id);
        const result = await this
            .queryBus
            .execute(query);
        return app_response_1.AppResponse
            .create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async getAll(tenderQuotationsGetAllRequest, req) {
        const { userId } = req.user;
        const query = new tender_quotations_get_all_query_1.TenderQuotationsGetAllQuery(tenderQuotationsGetAllRequest.pageSize, tenderQuotationsGetAllRequest.pageNumber, tenderQuotationsGetAllRequest.withPaging, tenderQuotationsGetAllRequest.status, tenderQuotationsGetAllRequest.tenderId, userId);
        const result = await this
            .queryBus
            .execute(query);
        const responseData = result.data ?
            result.data.map(tenderQuotation => tender_quotations_get_all_response_1.TenderQuotationsGetAllResponse
                .create(tenderQuotation.id, tenderQuotation.products, tenderQuotation.paymentMethod, tenderQuotation.DeadLineDate, tenderQuotation.DeliveryMethod, tenderQuotation.contactMethod, tenderQuotation.deliverDays, tenderQuotation.status, tenderQuotation.tenderId, tenderQuotation.companyId, tenderQuotation.company, tenderQuotation.userId, tenderQuotation.OpportunityNr))
            :
                [];
        return app_response_1.AppResponse
            .create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
    async getTotal(req) {
        const { userId } = req.user;
        const query = new tenders_get_all_query_1.TendersGetAllQuery(10, 1, false, null, null, null, null, null, null);
        const openedTenders = await this.queryBus.execute(query);
        const tenderIds = openedTenders.data ? openedTenders.data.map(tender => tender.id) : [];
        const query2 = new tender_quotations_get_all_query_1.TenderQuotationsGetAllQuery(10, 1, false, null, tenderIds ? tenderIds : null, userId);
        const totalTenderQuestions = await this.queryBus.execute(query2);
        return { total: totalTenderQuestions.data ? totalTenderQuestions.data.length : 0 };
    }
    async getTotalOpened(req) {
        const { userId } = req.user;
        const status = tender_status_enum_1.TenderStatusEnum.OPENED;
        ;
        const query = new tenders_get_all_query_1.TendersGetAllQuery(10, 1, false, null, null, status, null, null, null);
        const openedTenders = await this.queryBus.execute(query);
        const tenderIds = openedTenders.data ? openedTenders.data.map(tender => tender.id) : [];
        const query2 = new tender_quotations_get_all_query_1.TenderQuotationsGetAllQuery(10, 1, false, null, tenderIds ? tenderIds : null, userId);
        const totalTenderQuestions = await this.queryBus.execute(query2);
        return { total: totalTenderQuestions.data ? totalTenderQuestions.data.length : 0 };
    }
    async getTotalClosed(req) {
        const { userId } = req.user;
        const status = tender_status_enum_1.TenderStatusEnum.CLOSED;
        const query = new tenders_get_all_query_1.TendersGetAllQuery(10, 1, false, null, null, status, null, null, null);
        const openedTenders = await this.queryBus.execute(query);
        const tenderIds = openedTenders.data ? openedTenders.data.map(tender => tender.id) : [];
        const query2 = new tender_quotations_get_all_query_1.TenderQuotationsGetAllQuery(10, 1, false, null, tenderIds ? tenderIds : null, userId);
        const totalTenderQuestions = await this.queryBus.execute(query2);
        return { total: totalTenderQuestions.data ? totalTenderQuestions.data.length : 0 };
    }
    async getTotalByStatus(req) {
        const { userId } = req.user;
        const company = await this.companiesRepository.getCompanyByUserId(userId);
        const statuses = [
            tender_status_enum_1.TenderStatusEnum.PENDING,
            tender_status_enum_1.TenderStatusEnum.ACCEPTED,
            tender_status_enum_1.TenderStatusEnum.FINISHED,
            tender_status_enum_1.TenderStatusEnum.RECEIVING,
            tender_status_enum_1.TenderStatusEnum.SENDING,
        ];
        const totals = {};
        for (const status of statuses) {
            const query = new tender_quotations_get_all_J2_query_1.TenderQuotationsGetAllQueryj2(10, 1, false, status, null, null, company._id);
            const tendersResult = await this.queryBus.execute(query);
            const tenderIds = tendersResult.data ? tendersResult.data.map(tender => tender.id) : [];
            if (tenderIds.length > 0) {
                totals[status] = tendersResult.data ? tendersResult.data.length : 0;
            }
            else {
                totals[status] = 0;
            }
        }
        return { totals };
    }
    async getTotalAllOpened(req) {
        const { userId } = req.user;
        const status = tender_status_enum_1.TenderStatusEnum.OPENED;
        ;
        const query = new tenders_get_all_query_1.TendersGetAllQuery(10, 1, false, null, null, status, null, null, userId);
        const openedTenders = await this.queryBus.execute(query);
        return { total: openedTenders.data.filter(item => item.userId === userId) ? openedTenders.data.filter(item => item.userId === userId).length : 0 };
    }
    async getTotalAllCLOSED(req) {
        const status = tender_status_enum_1.TenderStatusEnum.CLOSED;
        ;
        const { userId } = req.user;
        const query = new tenders_get_all_query_1.TendersGetAllQuery(10, 1, false, null, null, status, null, null, userId);
        const openedTenders = await this.queryBus.execute(query);
        return { total: openedTenders.data.filter(item => item.userId === userId) ? openedTenders.data.filter(item => item.userId === userId).length : 0 };
    }
    async getTotalAllMine(req) {
        const { userId } = req.user;
        const query = new tender_quotations_get_all_query_1.TenderQuotationsGetAllQuery(10, 1, false, null, null, userId);
        const openedTenders = await this.queryBus.execute(query);
        return { total: openedTenders.data.filter(item => item.userId === userId) ? openedTenders.data.filter(item => item.userId === userId).length : 0 };
    }
    async getAllTrenders(req) {
        const { userId, role } = req.user;
        const query = new tender_quotations_get_all_query_1.TenderQuotationsGetAllQuery(10, 1, false, null, null, role === "Seller" ? userId : null);
        const result = await this.queryBus.execute(query);
        const response1 = result.data ?
            result.data.map(tenderQuotation => tender_quotations_get_all_response_1.TenderQuotationsGetAllResponse.create(tenderQuotation.id, tenderQuotation.products, tenderQuotation.paymentMethod, tenderQuotation.DeadLineDate, tenderQuotation.DeliveryMethod, tenderQuotation.contactMethod, tenderQuotation.deliverDays, tenderQuotation.status, tenderQuotation.tenderId, tenderQuotation.companyId, tenderQuotation.company, tenderQuotation.userId, tenderQuotation.OpportunityNr))
            : [];
        const responseData = [];
        await Promise.all(response1.map(async (item) => {
            const query1 = new tenders_get_query_1.TendersGetQuery(item.tenderId);
            const result1 = await this.queryBus.execute(query1);
            const tenderData = result1.isSuccess ? result1.data : null;
            if (tenderData !== null) {
                if (req.user.roles.includes("Seller")) {
                    if (item.userId === userId) {
                        responseData.push({
                            ...item,
                            tender: tenderData
                        });
                    }
                }
                else {
                    if (tenderData.userId === userId) {
                        responseData.push({
                            ...item,
                            tender: tenderData
                        });
                    }
                }
            }
        }));
        responseData.filter(item => item !== null);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
    async getAllOffertTrenders(req) {
        const { userId } = req.user;
        const { OfferId } = req.query;
        const query = new tender_quotations_get_all_query_1.TenderQuotationsGetAllQuery(10, 1, false, null, OfferId, null);
        const result = await this.queryBus.execute(query);
        const response1 = result.data ?
            result.data.filter(item => item.tenderId == OfferId).map(tenderQuotation => tender_quotations_get_all_response_1.TenderQuotationsGetAllResponse.create(tenderQuotation.id, tenderQuotation.products, tenderQuotation.paymentMethod, tenderQuotation.DeadLineDate, tenderQuotation.DeliveryMethod, tenderQuotation.contactMethod, tenderQuotation.deliverDays, tenderQuotation.status, tenderQuotation.tenderId, tenderQuotation.companyId, tenderQuotation.company, tenderQuotation.userId, tenderQuotation.OpportunityNr))
            : [];
        const responseData = await Promise.all(response1.map(async (item) => {
            const query1 = new tenders_get_query_1.TendersGetQuery(item.tenderId);
            const result1 = await this.queryBus.execute(query1);
            const tenderData = result1.isSuccess ? result1.data : null;
            return {
                ...item,
                tender: tenderData
            };
        }));
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
    async getAllMyOffertTrenders(req) {
        const { userId } = req.user;
        const { OfferId } = req.query;
        const query = new tender_quotations_get_all_query_1.TenderQuotationsGetAllQuery(10, 1, false, null, OfferId, userId);
        const result = await this.queryBus.execute(query);
        const response1 = result.data ?
            result.data.filter(item => item.tenderId == OfferId).map(tenderQuotation => tender_quotations_get_all_response_1.TenderQuotationsGetAllResponse.create(tenderQuotation.id, tenderQuotation.products, tenderQuotation.paymentMethod, tenderQuotation.DeadLineDate, tenderQuotation.DeliveryMethod, tenderQuotation.contactMethod, tenderQuotation.deliverDays, tenderQuotation.status, tenderQuotation.tenderId, tenderQuotation.companyId, tenderQuotation.company, tenderQuotation.userId, tenderQuotation.OpportunityNr))
            : [];
        const responseData = await Promise.all(response1.map(async (item) => {
            const query1 = new tenders_get_query_1.TendersGetQuery(item.tenderId);
            const result1 = await this.queryBus.execute(query1);
            const tenderData = result1.isSuccess ? result1.data : null;
            return {
                ...item,
                tender: tenderData
            };
        }));
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
    async cancelled(id, req) {
        const { userId } = req.user;
        try {
            const updateQuotationCommand = new tenders_quatation_update_status_query_1.TenderQuotationsUpdateStatusCommand(req.body.quatationID, tender_status_enum_1.TenderStatusEnum.CANCELLED, userId);
            const quotationResult = await this.commandBus.execute(updateQuotationCommand);
            return app_response_1.AppResponse.create(quotationResult.isSuccess, quotationResult.key, quotationResult.message, null, null, quotationResult.error);
        }
        catch (error) {
            console.log(error);
            return app_response_1.AppResponse.create(false, 'ERROR', 'Failed to cancel tender', null, null, error);
        }
    }
    async accept(id, req) {
        const { userId } = req.user;
        try {
            const updateQuotationCommand = new tenders_quatation_update_status_query_1.TenderQuotationsUpdateStatusCommand(req.body.quatationID, tender_status_enum_1.TenderStatusEnum.ACCEPTED, userId);
            const quotationResult = await this.commandBus.execute(updateQuotationCommand);
            if (!quotationResult.isSuccess) {
                return app_response_1.AppResponse.create(false, quotationResult.key, quotationResult.message, null, null, quotationResult.error);
            }
            const quotationQuery = new tender_quotations_get_query_1.TenderQuotationsGetQuery(req.body.quatationID);
            const quotationData = await this.queryBus.execute(quotationQuery);
            if (!quotationData.isSuccess || !quotationData.data) {
                return app_response_1.AppResponse.create(false, quotationData.key, quotationData.message, null, null, quotationData.error);
            }
            const tenderId = quotationData.data.tenderId;
            const updateTenderCommand = new tenders_update_status_query_1.TendersUpdateStatusCommand(tenderId, tender_status_enum_1.TenderStatusEnum.ACCEPTED, userId);
            const tenderResult = await this.commandBus.execute(updateTenderCommand);
            return app_response_1.AppResponse.create(tenderResult.isSuccess, tenderResult.key, tenderResult.message, null, null, tenderResult.error);
        }
        catch (error) {
            console.log(error);
            return app_response_1.AppResponse.create(false, 'ERROR', 'Failed to accept tender', null, null, error);
        }
    }
    async Payrequest(id, req) {
        const { userId } = req.user;
        try {
            const updateQuotationCommand = new tenders_quatation_update_status_query_1.TenderQuotationsUpdateStatusCommand(req.body.quatationID, tender_status_enum_1.TenderStatusEnum.PAYMENT, userId);
            const quotationResult = await this.commandBus.execute(updateQuotationCommand);
            if (!quotationResult.isSuccess) {
                return app_response_1.AppResponse.create(false, quotationResult.key, quotationResult.message, null, null, quotationResult.error);
            }
            const quotationQuery = new tender_quotations_get_query_1.TenderQuotationsGetQuery(req.body.quatationID);
            const quotationData = await this.queryBus.execute(quotationQuery);
            if (!quotationData.isSuccess || !quotationData.data) {
                return app_response_1.AppResponse.create(false, quotationData.key, quotationData.message, null, null, quotationData.error);
            }
            const tenderId = quotationData.data.tenderId;
            const updateTenderCommand = new tenders_update_status_query_1.TendersUpdateStatusCommand(tenderId, tender_status_enum_1.TenderStatusEnum.PAYMENT, userId);
            const tenderResult = await this.commandBus.execute(updateTenderCommand);
            return app_response_1.AppResponse.create(tenderResult.isSuccess, tenderResult.key, tenderResult.message, null, null, tenderResult.error);
        }
        catch (error) {
            console.log(error);
            return app_response_1.AppResponse.create(false, 'ERROR', 'Failed to accept tender', null, null, error);
        }
    }
    async Send(id, req) {
        const { userId } = req.user;
        try {
            const updateQuotationCommand = new tenders_quatation_update_status_query_1.TenderQuotationsUpdateStatusCommand(req.body.quatationID, tender_status_enum_1.TenderStatusEnum.SENDING, userId);
            const quotationResult = await this.commandBus.execute(updateQuotationCommand);
            if (!quotationResult.isSuccess) {
                return app_response_1.AppResponse.create(false, quotationResult.key, quotationResult.message, null, null, quotationResult.error);
            }
            const quotationQuery = new tender_quotations_get_query_1.TenderQuotationsGetQuery(req.body.quatationID);
            const quotationData = await this.queryBus.execute(quotationQuery);
            if (!quotationData.isSuccess || !quotationData.data) {
                return app_response_1.AppResponse.create(false, quotationData.key, quotationData.message, null, null, quotationData.error);
            }
            const tenderId = quotationData.data.tenderId;
            const updateTenderCommand = new tenders_update_status_query_1.TendersUpdateStatusCommand(tenderId, tender_status_enum_1.TenderStatusEnum.SENDING, userId);
            const tenderResult = await this.commandBus.execute(updateTenderCommand);
            return app_response_1.AppResponse.create(tenderResult.isSuccess, tenderResult.key, tenderResult.message, null, null, tenderResult.error);
        }
        catch (error) {
            console.log(error);
            return app_response_1.AppResponse.create(false, 'ERROR', 'Failed to accept tender', null, null, error);
        }
    }
    async receive(id, req) {
        const { userId } = req.user;
        try {
            const updateQuotationCommand = new tenders_quatation_update_status_query_1.TenderQuotationsUpdateStatusCommand(req.body.quatationID, tender_status_enum_1.TenderStatusEnum.RECEIVING, userId);
            const quotationResult = await this.commandBus.execute(updateQuotationCommand);
            if (!quotationResult.isSuccess) {
                return app_response_1.AppResponse.create(false, quotationResult.key, quotationResult.message, null, null, quotationResult.error);
            }
            const quotationQuery = new tender_quotations_get_query_1.TenderQuotationsGetQuery(req.body.quatationID);
            const quotationData = await this.queryBus.execute(quotationQuery);
            if (!quotationData.isSuccess || !quotationData.data) {
                return app_response_1.AppResponse.create(false, quotationData.key, quotationData.message, null, null, quotationData.error);
            }
            const tenderId = quotationData.data.tenderId;
            const updateTenderCommand = new tenders_update_status_query_1.TendersUpdateStatusCommand(tenderId, tender_status_enum_1.TenderStatusEnum.FINISHED, userId);
            const tenderResult = await this.commandBus.execute(updateTenderCommand);
            return app_response_1.AppResponse.create(tenderResult.isSuccess, tenderResult.key, tenderResult.message, null, null, tenderResult.error);
        }
        catch (error) {
            console.log(error);
            return app_response_1.AppResponse.create(false, 'ERROR', 'Failed to accept tender', null, null, error);
        }
    }
    async Sendrequest(id, req) {
        const { userId } = req.user;
        try {
            const updateQuotationCommand = new tenders_quatation_update_status_query_1.TenderQuotationsUpdateStatusCommand(req.body.quatationID, tender_status_enum_1.TenderStatusEnum.SENDING, userId);
            const quotationResult = await this.commandBus.execute(updateQuotationCommand);
            if (!quotationResult.isSuccess) {
                return app_response_1.AppResponse.create(false, quotationResult.key, quotationResult.message, null, null, quotationResult.error);
            }
            const quotationQuery = new tender_quotations_get_query_1.TenderQuotationsGetQuery(req.body.quatationID);
            const quotationData = await this.queryBus.execute(quotationQuery);
            if (!quotationData.isSuccess || !quotationData.data) {
                return app_response_1.AppResponse.create(false, quotationData.key, quotationData.message, null, null, quotationData.error);
            }
            return app_response_1.AppResponse.create(quotationData.isSuccess, quotationData.key, quotationData.message, null, null, quotationData.error);
        }
        catch (error) {
            console.log(error);
            return app_response_1.AppResponse.create(false, 'ERROR', 'Failed to accept tender', null, null, error);
        }
    }
    async PayConfirm(id, req) {
        const { userId } = req.user;
        const tenderId = req.body.quatationID;
        if (!userId) {
            return app_response_1.AppResponse.create(false, 'USER_ID_MISSING', 'User ID is missing', null, null, null);
        }
        if (!tenderId) {
            return app_response_1.AppResponse.create(false, 'TENDER_ID_MISSING', 'Tender ID is missing', null, null, null);
        }
        try {
            const quotationQuery = new tender_quotations_get_all_query_1.TenderQuotationsGetAllQuery(null, null, false, null, tenderId, userId);
            const quotationData = await this.queryBus.execute(quotationQuery);
            if (!quotationData.isSuccess || !quotationData.data) {
                return app_response_1.AppResponse.create(false, quotationData.key, quotationData.message, null, null, quotationData.error);
            }
            const quotationsToUpdate = quotationData.data.filter((quotation) => quotation.status === tender_status_enum_1.TenderStatusEnum.PAYMENT);
            for (const quotation of quotationsToUpdate) {
                const updateQuotationCommand = new tenders_quatation_update_status_query_1.TenderQuotationsUpdateStatusCommand(quotation.id, tender_status_enum_1.TenderStatusEnum.PAYMENTCONFIRM, userId);
                const quotationResult = await this.commandBus.execute(updateQuotationCommand);
                if (!quotationResult.isSuccess) {
                    console.log(`Failed to update quotation with ID: ${quotation.id}`);
                    return app_response_1.AppResponse.create(false, quotationResult.key, quotationResult.message, null, null, quotationResult.error);
                }
            }
            const updateTenderCommand = new tenders_update_status_query_1.TendersUpdateStatusCommand(tenderId, tender_status_enum_1.TenderStatusEnum.PAYMENTCONFIRM, userId);
            const tenderResult = await this.commandBus.execute(updateTenderCommand);
            return app_response_1.AppResponse.create(tenderResult.isSuccess, tenderResult.key, tenderResult.message, null, null, tenderResult.error);
        }
        catch (error) {
            console.error('Error during PayConfirm:', error);
            return app_response_1.AppResponse.create(false, 'ERROR', 'Failed to confirm payment and update tender status', null, null, error);
        }
    }
};
exports.TenderQuotationsController = TenderQuotationsController;
__decorate([
    (0, common_1.Post)('upsert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof tender_quotations_upsert_request_1.TenderQuotationsUpsertRequest !== "undefined" && tender_quotations_upsert_request_1.TenderQuotationsUpsertRequest) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], TenderQuotationsController.prototype, "upsert", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof tender_quotations_delete_request_1.TenderQuotationsDeleteRequest !== "undefined" && tender_quotations_delete_request_1.TenderQuotationsDeleteRequest) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], TenderQuotationsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof tender_quotations_get_request_1.TenderQuotationsGetRequest !== "undefined" && tender_quotations_get_request_1.TenderQuotationsGetRequest) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], TenderQuotationsController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof tender_quotations_get_all_request_1.TenderQuotationsGetAllRequest !== "undefined" && tender_quotations_get_all_request_1.TenderQuotationsGetAllRequest) === "function" ? _k : Object, Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], TenderQuotationsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('getTotal'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], TenderQuotationsController.prototype, "getTotal", null);
__decorate([
    (0, common_1.Get)('getTotal/Opened'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], TenderQuotationsController.prototype, "getTotalOpened", null);
__decorate([
    (0, common_1.Get)('getTotal/Closed'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], TenderQuotationsController.prototype, "getTotalClosed", null);
__decorate([
    (0, common_1.Get)('getTotal/ByStatus'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], TenderQuotationsController.prototype, "getTotalByStatus", null);
__decorate([
    (0, common_1.Get)('getAll/All/Opened'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], TenderQuotationsController.prototype, "getTotalAllOpened", null);
__decorate([
    (0, common_1.Get)('getAll/All/Closed'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], TenderQuotationsController.prototype, "getTotalAllCLOSED", null);
__decorate([
    (0, common_1.Get)('getAll/All/Mine'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], TenderQuotationsController.prototype, "getTotalAllMine", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getAll/All'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], TenderQuotationsController.prototype, "getAllTrenders", null);
__decorate([
    (0, common_1.Get)('getAll/Offert'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], TenderQuotationsController.prototype, "getAllOffertTrenders", null);
__decorate([
    (0, common_1.Get)('getAll/MyOffert'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], TenderQuotationsController.prototype, "getAllMyOffertTrenders", null);
__decorate([
    (0, common_1.Put)('cancelled'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], TenderQuotationsController.prototype, "cancelled", null);
__decorate([
    (0, common_1.Put)('accept'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], TenderQuotationsController.prototype, "accept", null);
__decorate([
    (0, common_1.Put)('pay/request'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_z = typeof Promise !== "undefined" && Promise) === "function" ? _z : Object)
], TenderQuotationsController.prototype, "Payrequest", null);
__decorate([
    (0, common_1.Put)('send'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_0 = typeof Promise !== "undefined" && Promise) === "function" ? _0 : Object)
], TenderQuotationsController.prototype, "Send", null);
__decorate([
    (0, common_1.Put)('receive'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_1 = typeof Promise !== "undefined" && Promise) === "function" ? _1 : Object)
], TenderQuotationsController.prototype, "receive", null);
__decorate([
    (0, common_1.Put)('send/request'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_2 = typeof Promise !== "undefined" && Promise) === "function" ? _2 : Object)
], TenderQuotationsController.prototype, "Sendrequest", null);
__decorate([
    (0, common_1.Put)('pay/Confirm'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_3 = typeof Promise !== "undefined" && Promise) === "function" ? _3 : Object)
], TenderQuotationsController.prototype, "PayConfirm", null);
exports.TenderQuotationsController = TenderQuotationsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({
        path: 'web/tenderQuotations',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object, typeof (_c = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _c : Object])
], TenderQuotationsController);


/***/ }),
/* 283 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsDeleteRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class TenderQuotationsDeleteRequest {
}
exports.TenderQuotationsDeleteRequest = TenderQuotationsDeleteRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], TenderQuotationsDeleteRequest.prototype, "id", void 0);


/***/ }),
/* 284 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsGetRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class TenderQuotationsGetRequest {
}
exports.TenderQuotationsGetRequest = TenderQuotationsGetRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], TenderQuotationsGetRequest.prototype, "id", void 0);


/***/ }),
/* 285 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsGetAllResponse = void 0;
class TenderQuotationsGetAllResponse {
    constructor(id, products = [], paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, company, userId, OpportunityNr) {
        this.id = id;
        this.products = products;
        this.paymentMethod = paymentMethod;
        this.DeadLineDate = DeadLineDate;
        this.DeliveryMethod = DeliveryMethod;
        this.contactMethod = contactMethod;
        this.deliverDays = deliverDays;
        this.status = status;
        this.tenderId = tenderId;
        this.companyId = companyId;
        this.company = company;
        this.userId = userId;
        this.OpportunityNr = OpportunityNr;
    }
    static create(id, products = [], paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, company, userId, OpportunityNr) {
        return new TenderQuotationsGetAllResponse(id, products, paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, company, userId, OpportunityNr);
    }
}
exports.TenderQuotationsGetAllResponse = TenderQuotationsGetAllResponse;


/***/ }),
/* 286 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsGetAllQuery = void 0;
class TenderQuotationsGetAllQuery {
    constructor(pageSize, pageNumber, withPaging, status, tenderId, userId) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.withPaging = withPaging;
        this.status = status;
        this.tenderId = tenderId;
        this.userId = userId;
    }
}
exports.TenderQuotationsGetAllQuery = TenderQuotationsGetAllQuery;


/***/ }),
/* 287 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsGetAllRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const app_paging_request_1 = __webpack_require__(79);
const app_transforms_1 = __webpack_require__(80);
const tender_quotation_status_enum_1 = __webpack_require__(274);
class TenderQuotationsGetAllRequest extends app_paging_request_1.AppPagingRequest {
    constructor() {
        super(...arguments);
        this.status = null;
        this.tenderId = null;
    }
}
exports.TenderQuotationsGetAllRequest = TenderQuotationsGetAllRequest;
__decorate([
    (0, class_validator_1.IsEnum)(tender_quotation_status_enum_1.TenderQuotationStatusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", typeof (_a = typeof tender_quotation_status_enum_1.TenderQuotationStatusEnum !== "undefined" && tender_quotation_status_enum_1.TenderQuotationStatusEnum) === "function" ? _a : Object)
], TenderQuotationsGetAllRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], TenderQuotationsGetAllRequest.prototype, "tenderId", void 0);


/***/ }),
/* 288 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsGetQuery = void 0;
class TenderQuotationsGetQuery {
    constructor(id) {
        this.id = id;
    }
}
exports.TenderQuotationsGetQuery = TenderQuotationsGetQuery;


/***/ }),
/* 289 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsDeleteCommand = void 0;
class TenderQuotationsDeleteCommand {
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
    }
}
exports.TenderQuotationsDeleteCommand = TenderQuotationsDeleteCommand;


/***/ }),
/* 290 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsUpsertCommand = void 0;
class TenderQuotationsUpsertCommand {
    constructor(id, products = [], paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, userId, OpportunityNr) {
        this.id = id;
        this.products = products;
        this.paymentMethod = paymentMethod;
        this.DeadLineDate = DeadLineDate;
        this.DeliveryMethod = DeliveryMethod;
        this.contactMethod = contactMethod;
        this.deliverDays = deliverDays;
        this.status = status;
        this.tenderId = tenderId;
        this.companyId = companyId;
        this.userId = userId;
        this.OpportunityNr = OpportunityNr;
    }
}
exports.TenderQuotationsUpsertCommand = TenderQuotationsUpsertCommand;


/***/ }),
/* 291 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsUpsertRequest = void 0;
const class_validator_1 = __webpack_require__(55);
const class_transformer_1 = __webpack_require__(72);
const tender_quotation_status_enum_1 = __webpack_require__(274);
class Product {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], Product.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "unitName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Product.prototype, "unitPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof File !== "undefined" && File) === "function" ? _a : Object)
], Product.prototype, "attachment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "notice", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "SKUCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "vat", void 0);
class TenderQuotationsUpsertRequest {
}
exports.TenderQuotationsUpsertRequest = TenderQuotationsUpsertRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TenderQuotationsUpsertRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tender_quotation_status_enum_1.TenderQuotationStatusEnum),
    __metadata("design:type", typeof (_b = typeof tender_quotation_status_enum_1.TenderQuotationStatusEnum !== "undefined" && tender_quotation_status_enum_1.TenderQuotationStatusEnum) === "function" ? _b : Object)
], TenderQuotationsUpsertRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], TenderQuotationsUpsertRequest.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], TenderQuotationsUpsertRequest.prototype, "tenderId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], TenderQuotationsUpsertRequest.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Product),
    __metadata("design:type", Array)
], TenderQuotationsUpsertRequest.prototype, "products", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TenderQuotationsUpsertRequest.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TenderQuotationsUpsertRequest.prototype, "DeadLineDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TenderQuotationsUpsertRequest.prototype, "DeliveryMethod", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TenderQuotationsUpsertRequest.prototype, "contactMethod", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TenderQuotationsUpsertRequest.prototype, "deliverDays", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TenderQuotationsUpsertRequest.prototype, "OpportunityNr", void 0);


/***/ }),
/* 292 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersUpdateStatusCommand = void 0;
class TendersUpdateStatusCommand {
    constructor(tenderId, status, userId) {
        this.tenderId = tenderId;
        this.status = status;
        this.userId = userId;
    }
}
exports.TendersUpdateStatusCommand = TendersUpdateStatusCommand;


/***/ }),
/* 293 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsUpdateStatusCommand = void 0;
class TenderQuotationsUpdateStatusCommand {
    constructor(quotationId, status, userId) {
        this.quotationId = quotationId;
        this.status = status;
        this.userId = userId;
    }
}
exports.TenderQuotationsUpdateStatusCommand = TenderQuotationsUpdateStatusCommand;


/***/ }),
/* 294 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsGetAllQueryj2 = void 0;
class TenderQuotationsGetAllQueryj2 {
    constructor(pageSize, pageNumber, withPaging, status, tenderId, userId, companyId) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.withPaging = withPaging;
        this.status = status;
        this.tenderId = tenderId;
        this.userId = userId;
        this.companyId = companyId;
    }
}
exports.TenderQuotationsGetAllQueryj2 = TenderQuotationsGetAllQueryj2;


/***/ }),
/* 295 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersGetHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const tenders_get_query_1 = __webpack_require__(263);
const tenders_get_result_1 = __webpack_require__(280);
const tenders_repository_1 = __webpack_require__(253);
let TendersGetHandler = class TendersGetHandler {
    constructor(tendersRepository) {
        this.tendersRepository = tendersRepository;
    }
    async execute(query) {
        const entity = await this
            .tendersRepository
            .getById(query.id, {}, [
            {
                path: 'categories',
                select: 'name',
            },
        ]);
        if (entity === null) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors
                .nullValue('object'));
        }
        const resultData = tenders_get_result_1.TendersGetResult.create(entity._id, entity.title, entity.minValue, entity.value, entity.endDate, entity.deliverDate, entity.type, entity.status, entity.categoriesIds, entity
            .categories
            .map(category => category.name), entity.region, entity.city, entity.fileName, entity.fileDescription, entity.fileId, entity.attachmentName, entity.attachmentDescription, entity.attachmentId, entity.attachmentRequired, entity.attachmentDeliverDays, entity.receiveDocumentsType, entity.Paylater, entity.contactInfo, entity.companyId, entity.userId, entity.products, entity.TenderNr);
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.TendersGetHandler = TendersGetHandler;
exports.TendersGetHandler = TendersGetHandler = __decorate([
    (0, cqrs_1.QueryHandler)(tenders_get_query_1.TendersGetQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof tenders_repository_1.TendersRepository !== "undefined" && tenders_repository_1.TendersRepository) === "function" ? _a : Object])
], TendersGetHandler);


/***/ }),
/* 296 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersGetAllHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const tenders_get_all_query_1 = __webpack_require__(264);
const reg_ex_functions_1 = __webpack_require__(99);
const mongo_functions_1 = __webpack_require__(29);
const tenders_get_all_result_1 = __webpack_require__(297);
const tenders_repository_1 = __webpack_require__(253);
const order_by_enum_1 = __webpack_require__(100);
const order_direction_enum_1 = __webpack_require__(32);
let TendersGetAllHandler = class TendersGetAllHandler {
    constructor(tendersRepository) {
        this.tendersRepository = tendersRepository;
    }
    async execute(query) {
        const filter = {};
        if (query.search !== null) {
            const searchValue = query.search.trim();
            if (!isNaN(Number(searchValue))) {
                filter.TenderNr = Number(searchValue);
            }
            else {
                filter.title = (0, reg_ex_functions_1.searchRegEx)(searchValue);
            }
        }
        if (query.type !== null) {
            filter.type = query.type;
        }
        if (query.status !== null) {
            filter.status = query.status;
        }
        if (query.categoriesIds !== null && query.categoriesIds.length > 0) {
            filter.categoriesIds = {
                $in: query.categoriesIds.map(mongo_functions_1.createObjectId),
            };
        }
        if (query.companyId !== null) {
            filter.companyId = (0, mongo_functions_1.createObjectId)(query.companyId);
        }
        if (query.userId !== null) {
            filter.userId = (0, mongo_functions_1.createObjectId)(query.userId);
        }
        const result = await this.tendersRepository.getAllAsResult(filter, {}, [
            {
                path: "categories",
                select: "name",
            },
        ], query.pageSize, query.pageNumber, query.withPaging, [
            {
                field: order_by_enum_1.OrderByEnum.CREATED_AT,
                direction: order_direction_enum_1.OrderDirectionEnum.DESC,
            },
            {
                field: order_by_enum_1.OrderByEnum.TITLE,
                direction: order_direction_enum_1.OrderDirectionEnum.ASC,
            },
        ]);
        const entitiesResults = result.data.map((element) => {
            return tenders_get_all_result_1.TendersGetAllResult.create(element._id, element.title, element.minValue, element.value, element.endDate, element.deliverDate, element.type, element.status, element.categoriesIds, element.categories.map((category) => category.name), element.region, element.city, element.attachmentRequired, element.receiveDocumentsType, element.Paylater, element.companyId, element.userId, element.TenderNr);
        });
        return app_result_1.AppResult.createSuccess(null, null, entitiesResults, result.paging);
    }
};
exports.TendersGetAllHandler = TendersGetAllHandler;
exports.TendersGetAllHandler = TendersGetAllHandler = __decorate([
    (0, cqrs_1.QueryHandler)(tenders_get_all_query_1.TendersGetAllQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof tenders_repository_1.TendersRepository !== "undefined" && tenders_repository_1.TendersRepository) === "function" ? _a : Object])
], TendersGetAllHandler);


/***/ }),
/* 297 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersGetAllResult = void 0;
const Paylater_type_enum_1 = __webpack_require__(252);
const receive_documents_type_enum_1 = __webpack_require__(250);
class TendersGetAllResult {
    constructor(id, title, minValue, value, endDate, deliverDate, type, status, categoriesIds = [], categories = [], region, city, attachmentRequired = false, receiveDocumentsType = receive_documents_type_enum_1.ReceiveDocumentsTypeEnum.BOTH, Paylater = Paylater_type_enum_1.PaylaterTypeEnum.NO, companyId = '', userId = '', TenderNr) {
        this.id = id;
        this.title = title;
        this.minValue = minValue;
        this.value = value;
        this.endDate = endDate;
        this.deliverDate = deliverDate;
        this.type = type;
        this.status = status;
        this.categoriesIds = categoriesIds;
        this.categories = categories;
        this.region = region;
        this.city = city;
        this.attachmentRequired = attachmentRequired;
        this.receiveDocumentsType = receiveDocumentsType;
        this.Paylater = Paylater;
        this.companyId = companyId;
        this.userId = userId;
        this.TenderNr = TenderNr;
    }
    static create(id, title, minValue, value, endDate, deliverDate, type, status = null, categoriesIds = [], categories = [], region = null, city = null, attachmentRequired = false, receiveDocumentsType = receive_documents_type_enum_1.ReceiveDocumentsTypeEnum.BOTH, Paylater = Paylater_type_enum_1.PaylaterTypeEnum.NO, companyId = '', userId = '', TenderNr) {
        return new TendersGetAllResult(id, title, minValue, value, endDate, deliverDate, type, status, categoriesIds, categories, region, city, attachmentRequired, receiveDocumentsType, Paylater, companyId, userId, TenderNr);
    }
}
exports.TendersGetAllResult = TendersGetAllResult;


/***/ }),
/* 298 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsDeleteHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const tender_quotations_repository_1 = __webpack_require__(272);
const tender_quotations_delete_command_1 = __webpack_require__(289);
let TenderQuotationsDeleteHandler = class TenderQuotationsDeleteHandler {
    constructor(tenderQuotationsRepository) {
        this.tenderQuotationsRepository = tenderQuotationsRepository;
    }
    async execute(command) {
        const entity = await this
            .tenderQuotationsRepository
            .getById(command.id);
        if (entity === null) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors
                .nullValue('object'));
        }
        if (command.userId != entity.userId) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors.notRelateToYourAccount());
        }
        const isDeleted = await this
            .tenderQuotationsRepository
            .deleteById(command.id);
        if (!isDeleted) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors.operationFailed());
        }
        return app_result_1.AppResult
            .createSuccess(null, null, null);
    }
};
exports.TenderQuotationsDeleteHandler = TenderQuotationsDeleteHandler;
exports.TenderQuotationsDeleteHandler = TenderQuotationsDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tender_quotations_delete_command_1.TenderQuotationsDeleteCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof tender_quotations_repository_1.TenderQuotationsRepository !== "undefined" && tender_quotations_repository_1.TenderQuotationsRepository) === "function" ? _a : Object])
], TenderQuotationsDeleteHandler);


/***/ }),
/* 299 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsUpsertHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const tender_quotations_get_result_1 = __webpack_require__(300);
const tender_quotations_upsert_command_1 = __webpack_require__(290);
const tender_quotations_repository_1 = __webpack_require__(272);
const tender_quotation_factory_1 = __webpack_require__(301);
const app_errors_1 = __webpack_require__(102);
const companies_repository_1 = __webpack_require__(210);
let TenderQuotationsUpsertHandler = class TenderQuotationsUpsertHandler {
    constructor(tenderQuotationsRepository, tenderQuotationFactory, eventPublisher, companiesRepository) {
        this.tenderQuotationsRepository = tenderQuotationsRepository;
        this.tenderQuotationFactory = tenderQuotationFactory;
        this.eventPublisher = eventPublisher;
        this.companiesRepository = companiesRepository;
    }
    async execute(command) {
        const isInsert = command.id === null || command.id === undefined;
        if (!isInsert) {
            var foundEntity = await this.tenderQuotationsRepository.getById(command.id);
            console.log("foundEntity", !isInsert);
            if (foundEntity === null) {
                throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("tenderQuotation"));
            }
            if (command.userId != foundEntity.userId) {
                throw app_result_1.AppResult.createError(app_errors_1.AppErrors.notRelateToYourAccount());
            }
        }
        else {
            await this.companiesRepository.updateOpportunityNr(command.companyId, command.OpportunityNr);
        }
        let entity = await this.tenderQuotationFactory.save(command.id, command.products, command.paymentMethod, command.DeadLineDate, command.DeliveryMethod, command.contactMethod, command.deliverDays, command.status, command.tenderId, command.companyId, command.userId, command.OpportunityNr);
        entity = this.eventPublisher.mergeObjectContext(entity);
        entity.commit();
        const resultData = tender_quotations_get_result_1.TenderQuotationsGetResult.create(entity._id, entity.products, entity.paymentMethod, entity.DeadLineDate, entity.DeliveryMethod, entity.contactMethod, entity.deliverDays, entity.status, entity.tenderId, entity.companyId, entity.userId, entity.OpportunityNr);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.TenderQuotationsUpsertHandler = TenderQuotationsUpsertHandler;
exports.TenderQuotationsUpsertHandler = TenderQuotationsUpsertHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tender_quotations_upsert_command_1.TenderQuotationsUpsertCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof tender_quotations_repository_1.TenderQuotationsRepository !== "undefined" && tender_quotations_repository_1.TenderQuotationsRepository) === "function" ? _a : Object, typeof (_b = typeof tender_quotation_factory_1.TenderQuotationFactory !== "undefined" && tender_quotation_factory_1.TenderQuotationFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object, typeof (_d = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _d : Object])
], TenderQuotationsUpsertHandler);


/***/ }),
/* 300 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsGetResult = void 0;
class TenderQuotationsGetResult {
    constructor(id, products = [], paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, userId, OpportunityNr) {
        this.id = id;
        this.products = products;
        this.paymentMethod = paymentMethod;
        this.DeadLineDate = DeadLineDate;
        this.DeliveryMethod = DeliveryMethod;
        this.contactMethod = contactMethod;
        this.deliverDays = deliverDays;
        this.status = status;
        this.tenderId = tenderId;
        this.companyId = companyId;
        this.userId = userId;
        this.OpportunityNr = OpportunityNr;
    }
    static create(id, products = [], paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, userId, OpportunityNr) {
        return new TenderQuotationsGetResult(id, products, paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, userId, OpportunityNr);
    }
}
exports.TenderQuotationsGetResult = TenderQuotationsGetResult;


/***/ }),
/* 301 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationFactory = void 0;
const common_1 = __webpack_require__(3);
const mongo_functions_1 = __webpack_require__(29);
const tender_quotation_1 = __webpack_require__(278);
const tender_quotations_repository_1 = __webpack_require__(272);
const tender_quotation_status_enum_1 = __webpack_require__(274);
let TenderQuotationFactory = class TenderQuotationFactory {
    constructor(tenderQuotationsRepository) {
        this.tenderQuotationsRepository = tenderQuotationsRepository;
    }
    async save(id, products = [], paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status = tender_quotation_status_enum_1.TenderQuotationStatusEnum.PENDING, tenderId, companyId, userId, OpportunityNr) {
        const isInsert = id === null;
        if (isInsert) {
            const entity = tender_quotation_1.TenderQuotation
                .create((0, mongo_functions_1.createObjectIdAsString)(id), products, paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, null, userId, OpportunityNr);
            await this
                .tenderQuotationsRepository
                .insert(entity);
            return entity;
        }
        const foundEntity = await this
            .tenderQuotationsRepository
            .getById(id);
        if (foundEntity == null) {
            return null;
        }
        foundEntity.products = products;
        foundEntity.paymentMethod = paymentMethod;
        foundEntity.DeadLineDate = DeadLineDate;
        foundEntity.DeliveryMethod = DeliveryMethod;
        foundEntity.contactMethod = contactMethod;
        foundEntity.deliverDays = deliverDays;
        foundEntity.status = status;
        foundEntity.tenderId = tenderId;
        foundEntity.companyId = companyId;
        const updatedEntity = await this
            .tenderQuotationsRepository
            .getAndUpdate({
            _id: (0, mongo_functions_1.createObjectId)(id),
        }, foundEntity);
        return updatedEntity;
    }
};
exports.TenderQuotationFactory = TenderQuotationFactory;
exports.TenderQuotationFactory = TenderQuotationFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof tender_quotations_repository_1.TenderQuotationsRepository !== "undefined" && tender_quotations_repository_1.TenderQuotationsRepository) === "function" ? _a : Object])
], TenderQuotationFactory);


/***/ }),
/* 302 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsGetHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const tender_quotations_get_query_1 = __webpack_require__(288);
const app_errors_1 = __webpack_require__(102);
const tender_quotations_repository_1 = __webpack_require__(272);
const tender_quotations_get_result_1 = __webpack_require__(300);
let TenderQuotationsGetHandler = class TenderQuotationsGetHandler {
    constructor(tenderQuotationsRepository) {
        this.tenderQuotationsRepository = tenderQuotationsRepository;
    }
    async execute(query) {
        const entity = await this
            .tenderQuotationsRepository
            .getById(query.id, {}, null);
        if (entity === null) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors
                .nullValue('object'));
        }
        const resultData = tender_quotations_get_result_1.TenderQuotationsGetResult.create(entity._id, entity.products, entity.paymentMethod, entity.DeadLineDate, entity.DeliveryMethod, entity.contactMethod, entity.deliverDays, entity.status, entity.tenderId, entity.companyId, entity.userId, entity.OpportunityNr);
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.TenderQuotationsGetHandler = TenderQuotationsGetHandler;
exports.TenderQuotationsGetHandler = TenderQuotationsGetHandler = __decorate([
    (0, cqrs_1.QueryHandler)(tender_quotations_get_query_1.TenderQuotationsGetQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof tender_quotations_repository_1.TenderQuotationsRepository !== "undefined" && tender_quotations_repository_1.TenderQuotationsRepository) === "function" ? _a : Object])
], TenderQuotationsGetHandler);


/***/ }),
/* 303 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsGetAllHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const tender_quotations_get_all_query_1 = __webpack_require__(286);
const mongo_functions_1 = __webpack_require__(29);
const order_by_enum_1 = __webpack_require__(100);
const order_direction_enum_1 = __webpack_require__(32);
const tender_quotations_repository_1 = __webpack_require__(272);
const tender_quotations_get_all_result_1 = __webpack_require__(304);
const companies_result_1 = __webpack_require__(305);
let TenderQuotationsGetAllHandler = class TenderQuotationsGetAllHandler {
    constructor(tenderQuotationsRepository) {
        this.tenderQuotationsRepository = tenderQuotationsRepository;
    }
    async execute(query) {
        const filter = {};
        if (query.status !== null) {
            filter.status = query.status;
        }
        if (query.userId !== null) {
            filter.userId = (0, mongo_functions_1.createObjectId)(query.userId);
        }
        if (query.tenderId !== null) {
            if (Array.isArray(query.tenderId)) {
                filter.tenderId = { $in: query.tenderId.map(id => (0, mongo_functions_1.createObjectId)(id)) };
            }
            else {
                filter.tenderId = (0, mongo_functions_1.createObjectId)(query.tenderId);
            }
        }
        const result = await this
            .tenderQuotationsRepository
            .getAllAsResult(filter, {}, [
            {
                path: 'company',
                select: '_id nameAr nameEn website address contactInfo CompanyNr',
            },
        ], query.pageSize, query.pageNumber, query.withPaging, [
            {
                field: order_by_enum_1.OrderByEnum.VALUE,
                direction: order_direction_enum_1.OrderDirectionEnum.DESC,
            },
        ]);
        const entitiesResults = result
            .data
            .map(element => {
            return tender_quotations_get_all_result_1.TenderQuotationsGetAllResult
                .create(element._id, element.products, element.paymentMethod, element.DeadLineDate, element.DeliveryMethod, element.contactMethod, element.deliverDays, element.status, element.tenderId, element.companyId, companies_result_1.CompaniesResult
                .createFromDomain(element.company), element.userId, element.OpportunityNr);
        });
        return app_result_1.AppResult.createSuccess(null, null, entitiesResults, result.paging);
    }
};
exports.TenderQuotationsGetAllHandler = TenderQuotationsGetAllHandler;
exports.TenderQuotationsGetAllHandler = TenderQuotationsGetAllHandler = __decorate([
    (0, cqrs_1.QueryHandler)(tender_quotations_get_all_query_1.TenderQuotationsGetAllQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof tender_quotations_repository_1.TenderQuotationsRepository !== "undefined" && tender_quotations_repository_1.TenderQuotationsRepository) === "function" ? _a : Object])
], TenderQuotationsGetAllHandler);


/***/ }),
/* 304 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsGetAllResult = void 0;
class TenderQuotationsGetAllResult {
    constructor(id, products = [], paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, company, userId, OpportunityNr) {
        this.id = id;
        this.products = products;
        this.paymentMethod = paymentMethod;
        this.DeadLineDate = DeadLineDate;
        this.DeliveryMethod = DeliveryMethod;
        this.contactMethod = contactMethod;
        this.deliverDays = deliverDays;
        this.status = status;
        this.tenderId = tenderId;
        this.companyId = companyId;
        this.company = company;
        this.userId = userId;
        this.OpportunityNr = OpportunityNr;
    }
    static create(id, products = [], paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, company, userId, OpportunityNr) {
        return new TenderQuotationsGetAllResult(id, products, paymentMethod, DeadLineDate, DeliveryMethod, contactMethod, deliverDays, status, tenderId, companyId, company, userId, OpportunityNr);
    }
}
exports.TenderQuotationsGetAllResult = TenderQuotationsGetAllResult;


/***/ }),
/* 305 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesResult = void 0;
class CompaniesResult {
    constructor(id, nameAr, CompanyNr, nameEn, website, address, contactInfo) {
        this.id = id;
        this.nameAr = nameAr;
        this.CompanyNr = CompanyNr;
        this.nameEn = nameEn;
        this.website = website;
        this.address = address;
        this.contactInfo = contactInfo;
    }
    static createFromDomain(company) {
        return new CompaniesResult(company._id, company.nameAr, company.CompanyNr, company.nameEn, company.website, company.address, company.contactInfo);
    }
}
exports.CompaniesResult = CompaniesResult;


/***/ }),
/* 306 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersChangeStatusHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const tenders_change_status_command_1 = __webpack_require__(267);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const tenders_repository_1 = __webpack_require__(253);
const tender_factory_1 = __webpack_require__(248);
const tenders_get_result_1 = __webpack_require__(280);
const tender_quotations_repository_1 = __webpack_require__(272);
const tender_quotation_factory_1 = __webpack_require__(301);
const tender_status_enum_1 = __webpack_require__(251);
const tender_quotation_status_enum_1 = __webpack_require__(274);
const tenders_error_1 = __webpack_require__(307);
let TendersChangeStatusHandler = class TendersChangeStatusHandler {
    constructor(tendersRepository, tenderQuotationsRepository, tenderFactory, tenderQuotationFactory, eventPublisher) {
        this.tendersRepository = tendersRepository;
        this.tenderQuotationsRepository = tenderQuotationsRepository;
        this.tenderFactory = tenderFactory;
        this.tenderQuotationFactory = tenderQuotationFactory;
        this.eventPublisher = eventPublisher;
    }
    async execute(command) {
        var foundTenderEntity = await this
            .tendersRepository
            .getById(command.id);
        if (foundTenderEntity === null) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors
                .nullValue('tender'));
        }
        if (command.userId != foundTenderEntity.userId) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors.notRelateToYourAccount());
        }
        if (command.status == tender_status_enum_1.TenderStatusEnum.ACCEPTED && command.tenderQuotationId == null) {
            return app_result_1.AppResult
                .createError(tenders_error_1.TendersError.acceptQuotationMustHasQuotationId());
        }
        var foundTenderQuotationEntity = await this
            .tenderQuotationsRepository
            .getById(command.tenderQuotationId);
        if (command.status != tender_status_enum_1.TenderStatusEnum.OPENED && command.tenderQuotationId == null) {
            if (foundTenderQuotationEntity === null) {
                return app_result_1.AppResult
                    .createError(app_errors_1.AppErrors
                    .nullValue('tenderQuotation'));
            }
        }
        if (command.status == tender_status_enum_1.TenderStatusEnum.ACCEPTED) {
            let tenderQuotationEntity = await this
                .tenderQuotationFactory
                .save(foundTenderQuotationEntity._id, foundTenderQuotationEntity.products, foundTenderQuotationEntity.paymentMethod, foundTenderQuotationEntity.DeadLineDate, foundTenderQuotationEntity.DeliveryMethod, foundTenderQuotationEntity.contactMethod, foundTenderQuotationEntity.deliverDays, tender_quotation_status_enum_1.TenderQuotationStatusEnum.ACCEPTED, foundTenderQuotationEntity.tenderId, foundTenderQuotationEntity.companyId, foundTenderQuotationEntity.userId, foundTenderQuotationEntity.OpportunityNr);
            tenderQuotationEntity = this
                .eventPublisher
                .mergeObjectContext(tenderQuotationEntity);
            tenderQuotationEntity
                .commit();
        }
        let tenderEntity = await this
            .tenderFactory
            .save(foundTenderEntity._id, foundTenderEntity.title, foundTenderEntity.minValue, foundTenderEntity.value, foundTenderEntity.endDate, foundTenderEntity.deliverDate, foundTenderEntity.type, command.status, foundTenderEntity.categoriesIds, foundTenderEntity.region, foundTenderEntity.city, foundTenderEntity.fileName, foundTenderEntity.fileDescription, foundTenderEntity.fileId, foundTenderEntity.attachmentName, foundTenderEntity.attachmentDescription, foundTenderEntity.attachmentId, foundTenderEntity.attachmentRequired, foundTenderEntity.attachmentDeliverDays, foundTenderEntity.receiveDocumentsType, foundTenderEntity.Paylater, foundTenderEntity.contactInfo, foundTenderEntity.companyId, foundTenderEntity.userId);
        tenderEntity = this
            .eventPublisher
            .mergeObjectContext(tenderEntity);
        tenderEntity
            .commit();
        const resultData = tenders_get_result_1.TendersGetResult
            .create(tenderEntity._id, tenderEntity.title, tenderEntity.minValue, tenderEntity.value, tenderEntity.endDate, tenderEntity.deliverDate, tenderEntity.type, tenderEntity.status, tenderEntity.categoriesIds, [], tenderEntity.region, tenderEntity.city, tenderEntity.fileName, tenderEntity.fileDescription, tenderEntity.fileId, tenderEntity.attachmentName, tenderEntity.attachmentDescription, tenderEntity.attachmentId, tenderEntity.attachmentRequired, tenderEntity.attachmentDeliverDays, tenderEntity.receiveDocumentsType, tenderEntity.Paylater, tenderEntity.contactInfo, tenderEntity.companyId, tenderEntity.userId);
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.TendersChangeStatusHandler = TendersChangeStatusHandler;
exports.TendersChangeStatusHandler = TendersChangeStatusHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenders_change_status_command_1.TendersChangeStatusCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof tenders_repository_1.TendersRepository !== "undefined" && tenders_repository_1.TendersRepository) === "function" ? _a : Object, typeof (_b = typeof tender_quotations_repository_1.TenderQuotationsRepository !== "undefined" && tender_quotations_repository_1.TenderQuotationsRepository) === "function" ? _b : Object, typeof (_c = typeof tender_factory_1.TenderFactory !== "undefined" && tender_factory_1.TenderFactory) === "function" ? _c : Object, typeof (_d = typeof tender_quotation_factory_1.TenderQuotationFactory !== "undefined" && tender_quotation_factory_1.TenderQuotationFactory) === "function" ? _d : Object, typeof (_e = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _e : Object])
], TendersChangeStatusHandler);


/***/ }),
/* 307 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersError = void 0;
const app_messages_keys_1 = __webpack_require__(88);
const app_error_1 = __webpack_require__(93);
class TendersError extends app_error_1.AppError {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.message = message;
    }
    static acceptQuotationMustHasQuotationId() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.notRelateToYourAccount, `Accept quotation must has quotation id`);
    }
}
exports.TendersError = TendersError;


/***/ }),
/* 308 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TendersUpdateStatusHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const tenders_update_status_query_1 = __webpack_require__(292);
const tenders_repository_1 = __webpack_require__(253);
let TendersUpdateStatusHandler = class TendersUpdateStatusHandler {
    constructor(tenderRepository) {
        this.tenderRepository = tenderRepository;
    }
    async execute(command) {
        const { tenderId, status, userId } = command;
        try {
            const tender = await this.tenderRepository.getById(tenderId);
            tender.status = status;
            await this.tenderRepository.updateStatus(tender._id, tender.status);
            return app_result_1.AppResult.createSuccess(null, 'Tender status updated successfully');
        }
        catch (error) {
            throw app_result_1.AppResult.createError(error);
        }
    }
};
exports.TendersUpdateStatusHandler = TendersUpdateStatusHandler;
exports.TendersUpdateStatusHandler = TendersUpdateStatusHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenders_update_status_query_1.TendersUpdateStatusCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof tenders_repository_1.TendersRepository !== "undefined" && tenders_repository_1.TendersRepository) === "function" ? _a : Object])
], TendersUpdateStatusHandler);


/***/ }),
/* 309 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsUpdateStatusHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const tenders_quatation_update_status_query_1 = __webpack_require__(293);
const tender_quotations_repository_1 = __webpack_require__(272);
let TenderQuotationsUpdateStatusHandler = class TenderQuotationsUpdateStatusHandler {
    constructor(tenderQuotationsRepository) {
        this.tenderQuotationsRepository = tenderQuotationsRepository;
    }
    async execute(command) {
        const { quotationId, status, userId } = command;
        try {
            const tenderQuotation = await this.tenderQuotationsRepository.getById(quotationId);
            tenderQuotation.status = status;
            await this.tenderQuotationsRepository.updateStatus(tenderQuotation._id, tenderQuotation.status);
            return app_result_1.AppResult.createSuccess(null, 'Tender quotation status updated successfully');
        }
        catch (error) {
            throw app_result_1.AppResult.createError(error);
        }
    }
};
exports.TenderQuotationsUpdateStatusHandler = TenderQuotationsUpdateStatusHandler;
exports.TenderQuotationsUpdateStatusHandler = TenderQuotationsUpdateStatusHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenders_quatation_update_status_query_1.TenderQuotationsUpdateStatusCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof tender_quotations_repository_1.TenderQuotationsRepository !== "undefined" && tender_quotations_repository_1.TenderQuotationsRepository) === "function" ? _a : Object])
], TenderQuotationsUpdateStatusHandler);


/***/ }),
/* 310 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenderQuotationsGetAllHandlerj2 = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const mongo_functions_1 = __webpack_require__(29);
const order_by_enum_1 = __webpack_require__(100);
const order_direction_enum_1 = __webpack_require__(32);
const tender_quotations_repository_1 = __webpack_require__(272);
const tender_quotations_get_all_result_1 = __webpack_require__(304);
const companies_result_1 = __webpack_require__(305);
const tender_quotations_get_all_J2_query_1 = __webpack_require__(294);
let TenderQuotationsGetAllHandlerj2 = class TenderQuotationsGetAllHandlerj2 {
    constructor(tenderQuotationsRepository) {
        this.tenderQuotationsRepository = tenderQuotationsRepository;
    }
    async execute(query) {
        const filter = {};
        if (query.status !== null) {
            filter.status = query.status;
        }
        if (query.userId !== null) {
            filter.userId = (0, mongo_functions_1.createObjectId)(query.userId);
        }
        if (query.tenderId !== null) {
            if (Array.isArray(query.tenderId)) {
                filter.tenderId = { $in: query.tenderId.map(id => (0, mongo_functions_1.createObjectId)(id)) };
            }
            else {
                filter.tenderId = (0, mongo_functions_1.createObjectId)(query.tenderId);
            }
        }
        const result = await this
            .tenderQuotationsRepository
            .getAllAsResult(filter, {}, [
            {
                path: 'company',
                select: '_id nameAr nameEn website address contactInfo CompanyNr',
            },
        ], query.pageSize, query.pageNumber, query.withPaging, [
            {
                field: order_by_enum_1.OrderByEnum.VALUE,
                direction: order_direction_enum_1.OrderDirectionEnum.DESC,
            },
        ]);
        const entitiesResults = result
            .data
            .map(element => {
            return tender_quotations_get_all_result_1.TenderQuotationsGetAllResult
                .create(element._id, element.products, element.paymentMethod, element.DeadLineDate, element.DeliveryMethod, element.contactMethod, element.deliverDays, element.status, element.tenderId, element.companyId, companies_result_1.CompaniesResult
                .createFromDomain(element.company), element.userId, element.OpportunityNr);
        });
        return app_result_1.AppResult.createSuccess(null, null, entitiesResults, result.paging);
    }
};
exports.TenderQuotationsGetAllHandlerj2 = TenderQuotationsGetAllHandlerj2;
exports.TenderQuotationsGetAllHandlerj2 = TenderQuotationsGetAllHandlerj2 = __decorate([
    (0, cqrs_1.QueryHandler)(tender_quotations_get_all_J2_query_1.TenderQuotationsGetAllQueryj2),
    __metadata("design:paramtypes", [typeof (_a = typeof tender_quotations_repository_1.TenderQuotationsRepository !== "undefined" && tender_quotations_repository_1.TenderQuotationsRepository) === "function" ? _a : Object])
], TenderQuotationsGetAllHandlerj2);


/***/ }),
/* 311 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersModule = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(41);
const mongoose_1 = __webpack_require__(24);
const order_factory_1 = __webpack_require__(312);
const orders_repository_1 = __webpack_require__(315);
const order_schema_1 = __webpack_require__(316);
const order_schema_factory_1 = __webpack_require__(318);
const orders_controller_1 = __webpack_require__(319);
const tenders_upsert_handler_1 = __webpack_require__(339);
const orders_delete_handler_1 = __webpack_require__(341);
const orders_get_handler_1 = __webpack_require__(342);
const orders_get_all_handler_1 = __webpack_require__(343);
const orders_change_status_handler_1 = __webpack_require__(345);
const tenders_module_1 = __webpack_require__(247);
const companies_module_1 = __webpack_require__(207);
const notification_module_1 = __webpack_require__(347);
const getCompanyById_1 = __webpack_require__(269);
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: order_schema_1.OrderSchema.name,
                    schema: order_schema_1.CreatedOrderSchema,
                },
            ]),
            tenders_module_1.TendersModule,
            companies_module_1.CompaniesModule,
            notification_module_1.NotificationModule,
        ],
        providers: [
            orders_repository_1.OrdersRepository,
            order_schema_factory_1.OrderSchemaFactory,
            order_factory_1.OrderFactory,
            tenders_upsert_handler_1.OrdersUpsertHandler,
            orders_change_status_handler_1.OrdersChangeStatusHandler,
            orders_delete_handler_1.OrdersDeleteHandler,
            orders_get_handler_1.OrdersGetHandler,
            orders_get_all_handler_1.OrdersGetAllHandler,
            getCompanyById_1.CompanyService
        ],
        controllers: [orders_controller_1.OrdersController],
    })
], OrdersModule);


/***/ }),
/* 312 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderFactory = void 0;
const common_1 = __webpack_require__(3);
const order_1 = __webpack_require__(313);
const orders_repository_1 = __webpack_require__(315);
const mongo_functions_1 = __webpack_require__(29);
let OrderFactory = class OrderFactory {
    constructor(tendersRepository) {
        this.tendersRepository = tendersRepository;
    }
    async save(id, title, endDate, deliverDate, type, status = null, region = '', city = '', address = '', fileName = '', fileDescription = '', fileId = null, attachmentName = '', attachmentDescription = '', attachmentId = null, attachmentRequired = false, attachmentDeliverDays = null, contactInfo = '', tenderId, companyId, userId, products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod, paymentMethod, invoices = []) {
        const isInsert = id === null;
        if (isInsert) {
            const entity = order_1.Order.create((0, mongo_functions_1.createObjectIdAsString)(id), title, endDate, deliverDate, type, status, region, city, address, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired, attachmentDeliverDays, contactInfo, tenderId, companyId, userId, products, Sendedproducts, OrderNr, DeliveryMethod, paymentMethod, invoices);
            await this.tendersRepository.insert(entity);
            return entity;
        }
        const foundEntity = await this.tendersRepository.getById(id);
        if (foundEntity == null) {
            return null;
        }
        foundEntity.title = title;
        foundEntity.endDate = endDate;
        foundEntity.deliverDate = deliverDate;
        foundEntity.type = type;
        foundEntity.status = status;
        foundEntity.region = region;
        foundEntity.city = city;
        foundEntity.address = address;
        foundEntity.fileName = fileName;
        foundEntity.fileDescription = fileDescription;
        foundEntity.fileId = fileId;
        foundEntity.attachmentName = attachmentName;
        foundEntity.attachmentDescription = attachmentDescription;
        foundEntity.attachmentId = attachmentId;
        foundEntity.attachmentRequired = attachmentRequired;
        foundEntity.attachmentDeliverDays = attachmentDeliverDays;
        foundEntity.contactInfo = contactInfo;
        foundEntity.tenderId = tenderId;
        foundEntity.companyId = companyId;
        foundEntity.products = products;
        foundEntity.Sendedproducts = Sendedproducts;
        foundEntity.OrderNr = OrderNr;
        foundEntity.DeliveryMethod = DeliveryMethod;
        foundEntity.paymentMethod = paymentMethod;
        foundEntity.invoices = invoices;
        const updatedEntity = await this.tendersRepository.getAndUpdate({
            _id: (0, mongo_functions_1.createObjectId)(id),
        }, foundEntity);
        return updatedEntity;
    }
};
exports.OrderFactory = OrderFactory;
exports.OrderFactory = OrderFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_repository_1.OrdersRepository !== "undefined" && orders_repository_1.OrdersRepository) === "function" ? _a : Object])
], OrderFactory);


/***/ }),
/* 313 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Order = void 0;
const cqrs_1 = __webpack_require__(41);
const mongo_functions_1 = __webpack_require__(29);
const order_status_enum_1 = __webpack_require__(314);
class Order extends cqrs_1.AggregateRoot {
    constructor(_id, title, endDate, deliverDate, type, status = order_status_enum_1.OrderStatusEnum.PLANING, region, city, address, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired = false, attachmentDeliverDays, contactInfo, tenderId = '', companyId = '', userId = '', products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod = '', paymentMethod = '', invoices = [], displayOrder = 0, isVisible = true, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy) {
        super();
        this._id = _id;
        this.title = title;
        this.endDate = endDate;
        this.deliverDate = deliverDate;
        this.type = type;
        this.status = status;
        this.region = region;
        this.city = city;
        this.address = address;
        this.fileName = fileName;
        this.fileDescription = fileDescription;
        this.fileId = fileId;
        this.attachmentName = attachmentName;
        this.attachmentDescription = attachmentDescription;
        this.attachmentId = attachmentId;
        this.attachmentRequired = attachmentRequired;
        this.attachmentDeliverDays = attachmentDeliverDays;
        this.contactInfo = contactInfo;
        this.tenderId = tenderId;
        this.companyId = companyId;
        this.userId = userId;
        this.products = products;
        this.Sendedproducts = Sendedproducts;
        this.OrderNr = OrderNr;
        this.DeliveryMethod = DeliveryMethod;
        this.paymentMethod = paymentMethod;
        this.invoices = invoices;
        this.displayOrder = displayOrder;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
    static create(id, title, endDate, deliverDate, type, status = order_status_enum_1.OrderStatusEnum.PLANING, region = null, city = null, address = null, fileName = null, fileDescription = null, fileId = null, attachmentName = null, attachmentDescription = null, attachmentId = null, attachmentRequired = false, attachmentDeliverDays = null, contactInfo = null, tenderId = '', companyId = '', userId = '', products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod = '', paymentMethod = '', invoices = [], displayOrder = 0, isVisible = true, createdAt = null, updatedAt = null, deletedAt = null, createdBy = null, updatedBy = null, deletedBy = null) {
        return new Order((0, mongo_functions_1.createObjectIdAsString)(id), title, endDate, deliverDate, type, status, region, city, address, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired, attachmentDeliverDays, contactInfo, tenderId, companyId, userId, products, Sendedproducts, OrderNr, DeliveryMethod, paymentMethod, invoices, displayOrder, isVisible, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy);
    }
}
exports.Order = Order;


/***/ }),
/* 314 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderStatusEnum = void 0;
var OrderStatusEnum;
(function (OrderStatusEnum) {
    OrderStatusEnum["PLANING"] = "Planning";
    OrderStatusEnum["OPENED"] = "Opened";
    OrderStatusEnum["CLOSED"] = "Closed";
    OrderStatusEnum["ACCEPTED"] = "Accepted";
    OrderStatusEnum["CANCELED"] = "Canceled";
    OrderStatusEnum["FINISHED"] = "Finished";
    OrderStatusEnum["PAYMENT"] = "Payment";
    OrderStatusEnum["PAYMENTCONFIRM"] = "PaymentConfirmation";
    OrderStatusEnum["SENDING"] = "Sending";
    OrderStatusEnum["PARTSENDING"] = "Sending";
    OrderStatusEnum["RECEIVING"] = "Receiving";
    OrderStatusEnum["PARTRECEIVING"] = "Receiving";
})(OrderStatusEnum || (exports.OrderStatusEnum = OrderStatusEnum = {}));


/***/ }),
/* 315 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const base_repository_1 = __webpack_require__(26);
const order_schema_1 = __webpack_require__(316);
const order_schema_factory_1 = __webpack_require__(318);
let OrdersRepository = class OrdersRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
    async getLatestOrder() {
        return this.model
            .findOne()
            .sort({ OrderNr: -1 })
            .exec();
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.OrderSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof order_schema_factory_1.OrderSchemaFactory !== "undefined" && order_schema_factory_1.OrderSchemaFactory) === "function" ? _b : Object])
], OrdersRepository);


/***/ }),
/* 316 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatedOrderSchema = exports.OrderSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mongodb_1 = __webpack_require__(30);
const base_with_Info_schema_1 = __webpack_require__(37);
const schemas_names_1 = __webpack_require__(34);
const media_schema_1 = __webpack_require__(170);
const order_status_enum_1 = __webpack_require__(314);
const company_schema_1 = __webpack_require__(211);
const user_schema_1 = __webpack_require__(36);
const order_type_enum_1 = __webpack_require__(317);
const tender_schema_1 = __webpack_require__(254);
let OrderSchema = class OrderSchema extends base_with_Info_schema_1.BaseWithInfoSchema {
};
exports.OrderSchema = OrderSchema;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", String)
], OrderSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.SchemaTypes.Date,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], OrderSchema.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.SchemaTypes.Date,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], OrderSchema.prototype, "deliverDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: order_type_enum_1.OrderTypeEnum,
        default: order_type_enum_1.OrderTypeEnum.TINY,
    }),
    __metadata("design:type", String)
], OrderSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: order_status_enum_1.OrderStatusEnum,
        default: order_status_enum_1.OrderStatusEnum.PLANING,
    }),
    __metadata("design:type", String)
], OrderSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderSchema.prototype, "region", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderSchema.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderSchema.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderSchema.prototype, "fileName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderSchema.prototype, "fileDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: media_schema_1.MediaSchema.name,
    }),
    __metadata("design:type", typeof (_c = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _c : Object)
], OrderSchema.prototype, "fileId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderSchema.prototype, "attachmentName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderSchema.prototype, "attachmentDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: media_schema_1.MediaSchema.name,
    }),
    __metadata("design:type", typeof (_d = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _d : Object)
], OrderSchema.prototype, "attachmentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], OrderSchema.prototype, "attachmentRequired", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], OrderSchema.prototype, "attachmentDeliverDays", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderSchema.prototype, "contactInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: tender_schema_1.TenderSchema.name,
    }),
    __metadata("design:type", typeof (_e = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _e : Object)
], OrderSchema.prototype, "tenderId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: company_schema_1.CompanySchema.name,
    }),
    __metadata("design:type", typeof (_f = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _f : Object)
], OrderSchema.prototype, "companyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchema.name,
    }),
    __metadata("design:type", typeof (_g = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _g : Object)
], OrderSchema.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                itemId: { type: String, required: true },
                item: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                discount: { type: Number, required: true },
                notice: { type: String, required: false },
                image: { type: String, required: false },
                attachment: { type: mongoose_2.SchemaTypes.Mixed, required: false },
                SKUCode: { type: String, required: false },
                vat: { type: String, required: false },
                companyId: { type: mongoose_2.Types.ObjectId, ref: 'CompanySchema', required: false },
                tender: { type: mongoose_2.Types.ObjectId, ref: 'TenderSchema', required: false }
            }],
        default: [],
    }),
    __metadata("design:type", Array)
], OrderSchema.prototype, "products", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                itemId: { type: String, required: true },
                item: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                discount: { type: Number, required: true },
                notice: { type: String, required: false },
                image: { type: String, required: false },
                attachment: { type: mongoose_2.SchemaTypes.Mixed, required: false },
                SKUCode: { type: String, required: false },
                vat: { type: String, required: false },
                companyId: { type: mongoose_2.Types.ObjectId, ref: 'CompanySchema', required: false },
                tender: { type: mongoose_2.Types.ObjectId, ref: 'TenderSchema', required: false }
            }],
        default: [],
    }),
    __metadata("design:type", Array)
], OrderSchema.prototype, "Sendedproducts", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], OrderSchema.prototype, "OrderNr", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderSchema.prototype, "DeliveryMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderSchema.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                fileName: { type: String, required: true },
                companyId: { type: mongoose_2.Types.ObjectId, ref: 'CompanySchema', required: true },
                createdDate: { type: Date, default: Date.now },
                userId: { type: mongoose_2.Types.ObjectId, ref: user_schema_1.UserSchema.name, required: true },
                enVersion: { type: String, required: true },
                arVersion: { type: String, required: true },
            }],
        default: [],
    }),
    __metadata("design:type", Array)
], OrderSchema.prototype, "invoices", void 0);
exports.OrderSchema = OrderSchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.orders,
        versionKey: false,
        timestamps: false,
    })
], OrderSchema);
exports.CreatedOrderSchema = mongoose_1.SchemaFactory
    .createForClass(OrderSchema);
exports.CreatedOrderSchema
    .set('toJSON', {
    virtuals: true,
});
exports.CreatedOrderSchema
    .set('toObject', {
    virtuals: true,
});


/***/ }),
/* 317 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderTypeEnum = void 0;
var OrderTypeEnum;
(function (OrderTypeEnum) {
    OrderTypeEnum["TINY"] = "Tiny";
    OrderTypeEnum["HUGE"] = "Huge";
})(OrderTypeEnum || (exports.OrderTypeEnum = OrderTypeEnum = {}));


/***/ }),
/* 318 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderSchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const order_1 = __webpack_require__(313);
const mongo_functions_1 = __webpack_require__(29);
let OrderSchemaFactory = class OrderSchemaFactory {
    create(entity) {
        return {
            _id: (0, mongo_functions_1.createObjectId)(entity._id),
            title: entity.title,
            endDate: entity.endDate,
            deliverDate: entity.deliverDate,
            type: entity.type,
            status: entity.status,
            region: entity.region,
            city: entity.city,
            address: entity.address,
            fileName: entity.fileName,
            fileDescription: entity.fileDescription,
            fileId: (0, mongo_functions_1.createObjectId)(entity.fileId),
            attachmentName: entity.attachmentName,
            attachmentDescription: entity.attachmentDescription,
            attachmentId: (0, mongo_functions_1.createObjectId)(entity.attachmentId),
            attachmentRequired: entity.attachmentRequired,
            attachmentDeliverDays: entity.attachmentDeliverDays,
            contactInfo: entity.contactInfo,
            tenderId: (0, mongo_functions_1.createObjectId)(entity.tenderId),
            companyId: (0, mongo_functions_1.createObjectId)(entity.companyId),
            userId: (0, mongo_functions_1.createObjectId)(entity.userId),
            products: entity.products,
            Sendedproducts: entity.Sendedproducts,
            OrderNr: entity.OrderNr,
            DeliveryMethod: entity.DeliveryMethod,
            paymentMethod: entity.paymentMethod,
            invoices: entity.invoices,
            displayOrder: entity.displayOrder,
            isVisible: entity.isVisible,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
            createdBy: entity.createdBy,
            updatedBy: entity.updatedBy,
            deletedBy: entity.deletedBy,
        };
    }
    createFromSchema(entitySchema) {
        return new order_1.Order((0, mongo_functions_1.fromObjectId)(entitySchema._id), entitySchema.title, entitySchema.endDate, entitySchema.deliverDate, entitySchema.type, entitySchema.status, entitySchema.region, entitySchema.city, entitySchema.address, entitySchema.fileName, entitySchema.fileDescription, (0, mongo_functions_1.fromObjectId)(entitySchema.fileId), entitySchema.attachmentName, entitySchema.attachmentDescription, (0, mongo_functions_1.fromObjectId)(entitySchema.attachmentId), entitySchema.attachmentRequired, entitySchema.attachmentDeliverDays, entitySchema.contactInfo, (0, mongo_functions_1.fromObjectId)(entitySchema.tenderId), (0, mongo_functions_1.fromObjectId)(entitySchema.companyId), (0, mongo_functions_1.fromObjectId)(entitySchema.userId), entitySchema.products, entitySchema.Sendedproducts, entitySchema.OrderNr, entitySchema.DeliveryMethod, entitySchema.paymentMethod, entitySchema.invoices, entitySchema.displayOrder, entitySchema.isVisible, entitySchema.createdAt, entitySchema.updatedAt, entitySchema.deletedAt, entitySchema.createdBy, entitySchema.updatedBy, entitySchema.deletedBy);
    }
};
exports.OrderSchemaFactory = OrderSchemaFactory;
exports.OrderSchemaFactory = OrderSchemaFactory = __decorate([
    (0, common_1.Injectable)()
], OrderSchemaFactory);


/***/ }),
/* 319 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersController = void 0;
const common_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(69);
const cqrs_1 = __webpack_require__(41);
const orders_get_all_response_1 = __webpack_require__(320);
const orders_upsert_request_1 = __webpack_require__(321);
const orders_get_request_1 = __webpack_require__(323);
const orders_get_all_request_1 = __webpack_require__(324);
const orders_delete_request_1 = __webpack_require__(325);
const orders_get_query_1 = __webpack_require__(326);
const orders_get_all_query_1 = __webpack_require__(327);
const orders_upsert_command_1 = __webpack_require__(328);
const orders_delete_command_1 = __webpack_require__(329);
const orders_change_status_command_1 = __webpack_require__(330);
const orders_change_status_request_1 = __webpack_require__(331);
const app_response_1 = __webpack_require__(87);
const order_status_enum_1 = __webpack_require__(314);
const tenders_get_all_query_1 = __webpack_require__(264);
const companies_get_query_1 = __webpack_require__(222);
const orders_buyer_all_response_1 = __webpack_require__(332);
const tenders_get_query_1 = __webpack_require__(263);
const notifications_repository_1 = __webpack_require__(333);
const notification_factory_1 = __webpack_require__(337);
const user_companies_service_1 = __webpack_require__(235);
const order_type_enum_1 = __webpack_require__(317);
const puppeteer_1 = __webpack_require__(338);
const fs = __webpack_require__(144);
const getCompanyById_1 = __webpack_require__(269);
const s3_upload_service_1 = __webpack_require__(239);
let OrdersController = class OrdersController {
    constructor(queryBus, commandBus, notificationsRepository, userCompaniesService, companyService) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
        this.notificationsRepository = notificationsRepository;
        this.userCompaniesService = userCompaniesService;
        this.companyService = companyService;
    }
    async upsert(ordersUpsertRequest, req) {
        const { userId } = req.user;
        const defaultEndDate = new Date();
        defaultEndDate.setDate(defaultEndDate.getDate() + 30);
        const defaultDeliverDate = new Date();
        defaultDeliverDate.setDate(defaultDeliverDate.getDate() + 30);
        const mappedProducts = ordersUpsertRequest.products.map((product) => ({
            itemId: product.itemId || "",
            item: product.item,
            quantity: product.quantity,
            price: product.price,
            discount: product.discount,
            notice: product.notice || "",
            image: product.image,
            attachment: product.attachment,
            SKUCode: product.SKUCode,
            vat: product.vat,
            companyId: product.companyId || null,
            tender: product.tender || null,
            quatationId: product.quatationId || null,
        }));
        const mappedSendedproducts = ordersUpsertRequest.Sendedproducts ?
            ordersUpsertRequest.Sendedproducts.map((product) => ({
                itemId: product.itemId || "",
                item: product.item,
                quantity: product.quantity,
                price: product.price,
                discount: product.discount,
                notice: product.notice || "",
                image: product.image,
                attachment: product.attachment,
                SKUCode: product.SKUCode,
                vat: product.vat,
                companyId: product.companyId || null,
                tender: product.tender || null,
                quatationId: product.quatationId || null,
            }))
            : [];
        let invoices = ordersUpsertRequest.invoices || [];
        let Status = ordersUpsertRequest.status;
        if (req.user.roles.includes("Seller")) {
            if (mappedSendedproducts.length > 0 &&
                mappedSendedproducts.length === mappedProducts.length) {
                Status = order_status_enum_1.OrderStatusEnum.SENDING;
                const englishPDF = await this.createAndUploadPDF(ordersUpsertRequest, "en");
                const arabicPDF = await this.createAndUploadPDF(ordersUpsertRequest, "ar");
                invoices.push({
                    fileName: `invoice_${ordersUpsertRequest.OrderNr}`,
                    companyId: mappedSendedproducts[0].companyId || null,
                    createdDate: new Date(),
                    userId: userId,
                    enVersion: englishPDF,
                    arVersion: arabicPDF,
                });
            }
            if (mappedSendedproducts.length > 0 &&
                mappedSendedproducts.length < mappedProducts.length) {
                Status = order_status_enum_1.OrderStatusEnum.PARTSENDING;
                const englishPDF = await this.createAndUploadPDF(ordersUpsertRequest, "en");
                const arabicPDF = await this.createAndUploadPDF(ordersUpsertRequest, "ar");
                invoices.push({
                    fileName: `invoice_${ordersUpsertRequest.OrderNr}`,
                    companyId: mappedSendedproducts[0].companyId || null,
                    createdDate: new Date(),
                    userId: userId,
                    enVersion: englishPDF,
                    arVersion: arabicPDF,
                });
            }
        }
        if (req.user.roles.includes("Buyer")) {
            if (mappedSendedproducts.length > 0 &&
                mappedSendedproducts.length === mappedProducts.length) {
                Status = order_status_enum_1.OrderStatusEnum.FINISHED;
            }
            if (mappedSendedproducts.length > 0 &&
                mappedSendedproducts.length < mappedProducts.length &&
                ordersUpsertRequest.status === order_status_enum_1.OrderStatusEnum.PARTSENDING) {
                Status = order_status_enum_1.OrderStatusEnum.PARTRECEIVING;
            }
        }
        const command = new orders_upsert_command_1.OrdersUpsertCommand(ordersUpsertRequest.id ? ordersUpsertRequest.id : null, ordersUpsertRequest.title, ordersUpsertRequest.endDate || defaultEndDate, ordersUpsertRequest.deliverDate || defaultDeliverDate, ordersUpsertRequest.type || order_type_enum_1.OrderTypeEnum.TINY, Status, ordersUpsertRequest.region, ordersUpsertRequest.city, ordersUpsertRequest.address, ordersUpsertRequest.fileName, ordersUpsertRequest.fileDescription, ordersUpsertRequest.fileId, ordersUpsertRequest.attachmentName, ordersUpsertRequest.attachmentDescription, ordersUpsertRequest.attachmentId, ordersUpsertRequest.attachmentRequired ?? false, ordersUpsertRequest.attachmentDeliverDays, ordersUpsertRequest.contactInfo, ordersUpsertRequest.tenderId ? ordersUpsertRequest.tenderId : null, ordersUpsertRequest.companyId ? ordersUpsertRequest.companyId : null, userId, mappedProducts, mappedSendedproducts, ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0, ordersUpsertRequest.DeliveryMethod, ordersUpsertRequest.paymentMethod, invoices);
        const result = await this.commandBus.execute(command);
        if (ordersUpsertRequest.id && ordersUpsertRequest.status === "Planning") {
            const factory = new notification_factory_1.NotificationFactory(this.notificationsRepository);
            await factory.save(null, userId, "INFO", `تم تحديث طلبك برقم ${ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0}!`, false, new Date());
        }
        if (ordersUpsertRequest.id && ordersUpsertRequest.status === "Opened") {
            const factory = new notification_factory_1.NotificationFactory(this.notificationsRepository);
            mappedProducts.map(async (item) => {
                const users = await this.userCompaniesService.getAllUsersByCompanyId(item.companyId);
                await factory.save(null, users ? users[0].id : null, "INFO", `${users ? users[0].nickName : null} ارسال الطلب برقم ${ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0}!`, false, new Date());
            });
        }
        if (ordersUpsertRequest.id && ordersUpsertRequest.status === "Accepted") {
            const factory = new notification_factory_1.NotificationFactory(this.notificationsRepository);
            await factory.save(null, ordersUpsertRequest.userId, "INFO", `${"users?.nickName"} قبول الطلب برقم ${ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0}!`, false, new Date());
        }
        if (ordersUpsertRequest.id && ordersUpsertRequest.status === "Sending") {
            const factory = new notification_factory_1.NotificationFactory(this.notificationsRepository);
            await factory.save(null, ordersUpsertRequest.userId, "INFO", `${"users?.nickName"} شحن الطلب برقم ${ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0}!`, false, new Date());
        }
        if (ordersUpsertRequest.id && ordersUpsertRequest.status === "Canceled") {
            const factory = new notification_factory_1.NotificationFactory(this.notificationsRepository);
            await factory.save(null, ordersUpsertRequest.userId, "INFO", `${"users?.nickName"} رفض الطلب برقم ${ordersUpsertRequest.OrderNr ? ordersUpsertRequest.OrderNr : 0}!`, false, new Date());
        }
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async changeStatus(ordersChangeStatusRequest, req) {
        const { userId } = req.user;
        const command = new orders_change_status_command_1.OrdersChangeStatusCommand(ordersChangeStatusRequest.id, ordersChangeStatusRequest.status, ordersChangeStatusRequest.tenderQuotationId, ordersChangeStatusRequest.orderId, userId);
        const result = await this.commandBus.execute(command);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async delete(ordersDeleteRequest, req) {
        const { userId } = req.user;
        const command = new orders_delete_command_1.OrdersDeleteCommand(ordersDeleteRequest.id, userId);
        const result = await this.commandBus.execute(command);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, null, null, result.error);
    }
    async get(ordersGetRequest) {
        try {
            const orderQuery = new orders_get_query_1.OrdersGetQuery(ordersGetRequest.id);
            const orderResult = await this.queryBus.execute(orderQuery);
            if (!orderResult.isSuccess) {
                return app_response_1.AppResponse.create(false, orderResult.key, orderResult.message, null, null, orderResult.error);
            }
            let orderData = orderResult.data;
            const tenderQuery = new tenders_get_query_1.TendersGetQuery(orderData.tenderId);
            const tenderResult = await this.queryBus.execute(tenderQuery);
            if (tenderResult.isSuccess) {
                orderData = {
                    ...orderData,
                    Tender: tenderResult.data,
                };
                const BuycompanyQuery = new companies_get_query_1.CompaniesGetQuery(tenderResult.data.companyId);
                const BuycompanyResult = await this.queryBus.execute(BuycompanyQuery);
                orderData = { ...orderData, Buycompany: BuycompanyResult.data };
            }
            const companyQuery = new companies_get_query_1.CompaniesGetQuery(orderData.companyId);
            const companyResult = await this.queryBus.execute(companyQuery);
            orderData = {
                ...orderData,
                company: companyResult.isSuccess ? companyResult.data : null,
            };
            const productCompanyPromises = orderData.products.map(async (product) => {
                const productCompanyQuery = new companies_get_query_1.CompaniesGetQuery(product.companyId);
                const productCompanyResult = await this.queryBus.execute(productCompanyQuery);
                return {
                    ...product,
                    company: productCompanyResult.isSuccess ? productCompanyResult.data : null,
                };
            });
            const updatedProducts = await Promise.all(productCompanyPromises);
            orderData = { ...orderData, products: updatedProducts };
            const SendedproductsCompanyPromises = orderData.Sendedproducts.map(async (product) => {
                const SendedproductsCompanyQuery = new companies_get_query_1.CompaniesGetQuery(product.companyId);
                const SendedproductsCompanyResult = await this.queryBus.execute(SendedproductsCompanyQuery);
                return {
                    ...product,
                    company: SendedproductsCompanyResult.isSuccess ?
                        SendedproductsCompanyResult.data
                        : null,
                };
            });
            const updatedSendedproducts = await Promise.all(SendedproductsCompanyPromises);
            orderData = { ...orderData, Sendedproducts: updatedSendedproducts };
            return app_response_1.AppResponse.create(true, orderResult.key, "Order retrieved successfully", orderData, null, null);
        }
        catch (error) {
            return app_response_1.AppResponse.create(false, "error.unexpected", "An unexpected error occurred", null, null, error);
        }
    }
    async getAll(ordersGetAllRequest, req) {
        const { userId } = req.user || {};
        const role = userId?.role;
        const query = new orders_get_all_query_1.OrdersGetAllQuery(ordersGetAllRequest.pageSize, ordersGetAllRequest.pageNumber, ordersGetAllRequest.withPaging, ordersGetAllRequest.search, ordersGetAllRequest.type, ordersGetAllRequest.status, ordersGetAllRequest.TenderId, ordersGetAllRequest.companyId, null, order_status_enum_1.OrderStatusEnum.PLANING);
        const result = await this.queryBus.execute(query);
        let responseData = result.data ?
            result.data.map((order) => {
                const filteredProducts = role === "Seller" && ordersGetAllRequest.companyId ?
                    order.products.filter((product) => product.companyId === ordersGetAllRequest.companyId)
                    : order.products;
                return orders_get_all_response_1.OrdersGetAllResponse.create(order.id, order.title, order.endDate, order.deliverDate, order.type, order.status, order.region, order.city, order.address, order.attachmentRequired, order.tenderId, order.companyId, order.userId, filteredProducts, order.Sendedproducts, order.OrderNr, order.DeliveryMethod, order.paymentMethod, order.invoices, order.tender);
            })
            : [];
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
    async getAllBuyer(ordersGetAllRequest, req) {
        const { userId } = req.user || {};
        const tendersResult = await this.queryBus.execute(new tenders_get_all_query_1.TendersGetAllQuery(null, null, null, null, null, null, null, ordersGetAllRequest.companyId, null));
        if (!tendersResult.isSuccess || !tendersResult.data) {
            return app_response_1.AppResponse.create(false, tendersResult.key, tendersResult.message, [], null, tendersResult.error);
        }
        if (tendersResult.data.length === 0) {
            return app_response_1.AppResponse.create(true, tendersResult.key, tendersResult.message, [], null, tendersResult.error);
        }
        const tenderIds = tendersResult.data.map((tender) => tender.id);
        const filterQuery = new orders_get_all_query_1.OrdersGetAllQuery(null, null, null, null, null, null, tenderIds, null, null);
        const ordersResult = await this.queryBus.execute(filterQuery);
        if (!ordersResult.isSuccess || !ordersResult.data) {
            return app_response_1.AppResponse.create(false, ordersResult.key, ordersResult.message, [], null, ordersResult.error);
        }
        const enrichedOrders = await Promise.all(ordersResult.data.map(async (order) => {
            const companyResult = await this.queryBus.execute(new companies_get_query_1.CompaniesGetQuery(order.companyId));
            return orders_buyer_all_response_1.OrdersGetAllBResponse.create(order.id, order.title, order.endDate, order.deliverDate, order.type, order.status, order.region, order.city, order.address, order.attachmentRequired, order.tenderId, order.companyId, order.userId, order.products, order.Sendedproducts, order.OrderNr, order.DeliveryMethod, order.paymentMethod, order.invoices, order.tender, companyResult.isSuccess ? companyResult.data : null);
        }));
        return app_response_1.AppResponse.create(ordersResult.isSuccess, ordersResult.key, ordersResult.message, enrichedOrders, ordersResult.paging, ordersResult.error);
    }
    async getMyAll(OrdersGetAllRequest, req) {
        const { userId } = req.user || {};
        const query = new orders_get_all_query_1.OrdersGetAllQuery(OrdersGetAllRequest.pageSize, OrdersGetAllRequest.pageNumber, OrdersGetAllRequest.withPaging, OrdersGetAllRequest.search, OrdersGetAllRequest.type, OrdersGetAllRequest.status, OrdersGetAllRequest.TenderId, OrdersGetAllRequest.companyId, userId);
        const result = await this.queryBus.execute(query);
        const responseData = result.data ?
            result.data
                .filter((item) => item.userId === userId)
                .map((order) => orders_get_all_response_1.OrdersGetAllResponse.create(order.id, order.title, order.endDate, order.deliverDate, order.type, order.status, order.region, order.city, order.address, order.attachmentRequired, order.companyId, order.userId))
            : [];
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
    async getAllTotal(req) {
        const { userId } = req.user;
        const status = order_status_enum_1.OrderStatusEnum.CLOSED;
        const query = new orders_get_all_query_1.OrdersGetAllQuery(10, 1, false, null, null, status, null, null, userId);
        const openedOrders = await this.queryBus.execute(query);
        return { total: openedOrders.data ? openedOrders.data.length : 0 };
    }
    async getAllTotalByStatus(req) {
        const { userId } = req.user;
        const query = new orders_get_all_query_1.OrdersGetAllQuery(10, 1, false, null, null, null, null, null, userId);
        const Orders = await this.queryBus.execute(query);
        const statusCountMap = {};
        if (Orders.data.filter((item) => item.userId === userId)) {
            Orders.data
                .filter((item) => item.userId === userId)
                .forEach((order) => {
                const status = order.status;
                if (statusCountMap[status]) {
                    statusCountMap[status]++;
                }
                else {
                    statusCountMap[status] = 1;
                }
            });
        }
        const result = Object.entries(statusCountMap).map(([status, total]) => ({
            status,
            total,
        }));
        return result;
    }
    async createPDFInvoice(order, company, lang) {
        const isArabic = lang === "ar";
        const alignment = isArabic ? "right" : "left";
        const direction = isArabic ? "rtl" : "ltr";
        const companyName = company ? company.nameAr : "N/A";
        const createdDate = new Date(order.endDate).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US");
        const htmlContent = `
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Arial', sans-serif; direction: ${direction}; text-align: ${alignment}; margin: 40px; }
          h1, h3 { text-align: center; }
          .invoice-details { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid black; padding: 8px; text-align: ${alignment}; }
          th { background-color: #f2f2f2; }
          .footer { margin-top: 30px; font-size: 14px; text-align: center; }
          img { width: 50px; height: 50px; }
        </style>
      </head>
      <body>
        <h1>${isArabic ? "فاتورة" : "Invoice"}</h1>
        
        <div class="invoice-details">
          <p><strong>${isArabic ? "رقم الطلب:" : "Order Number:"}</strong> ${order.OrderNr}</p>
          <p><strong>${isArabic ? "تاريخ الإنشاء:" : "Created Date:"}</strong> ${createdDate}</p>
          <p><strong>${isArabic ? "عنوان التسليم:" : "Delivery Address:"}</strong> ${order.address}</p>
          <p><strong>${isArabic ? "شركة:" : "Company:"}</strong> ${companyName}</p>
          <p><strong>${isArabic ? "طريقة التوصيل:" : "Delivery Method:"}</strong> ${order.DeliveryMethod}</p>
        </div>
  
        <table>
          <thead>
            <tr>
              <th>${isArabic ? "الصورة" : "Image"}</th>
              <th>${isArabic ? "SKU" : "SKU Code"}</th>
              <th>${isArabic ? "البند" : "Item"}</th>
              <th>${isArabic ? "الكمية" : "Quantity"}</th>
              <th>${isArabic ? "السعر" : "Price (SAR)"}</th>
              <th>${isArabic ? "ضريبة القيمة المضافة" : "VAT (%)"}</th>
            </tr>
          </thead>
          <tbody>
            ${order.Sendedproducts.map((product) => `
              <tr>
                <td><img src="${product.image || "https://via.placeholder.com/50"}" /></td>
                <td>${product.SKUCode}</td>
                <td>${product.item}</td>
                <td>${product.quantity}</td>
                <td>${product.price.toFixed(2)} SAR</td>
                <td>${product.vat}%</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
  
        <p class="footer">${isArabic ? "شكراً لتعاملكم معنا!" : "Thank you for your business!"}</p>
      </body>
      </html>`;
        const browser = await puppeteer_1.default.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });
        const filePath = `./invoice_${order.OrderNr}_${lang}.pdf`;
        await page.pdf({ path: filePath, format: "A4", printBackground: true });
        await browser.close();
        return filePath;
    }
    async createAndUploadPDF(order, lang) {
        const company = await this.companyService.getCompanyById(order.companyId);
        const pdfPath = await this.createPDFInvoice(order, company, lang);
        const fileBuffer = fs.readFileSync(pdfPath);
        const file = {
            buffer: fileBuffer,
            originalname: `${order.OrderNr}_${lang}.pdf`,
            mimetype: "application/pdf",
        };
        const folderPath = `${company.registrationNumber}/orders/${order.OrderNr}`;
        const s3Url = await s3_upload_service_1.S3UploadService.uploadFile(file, folderPath);
        fs.unlinkSync(pdfPath);
        return s3Url;
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("upsert"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof orders_upsert_request_1.OrdersUpsertRequest !== "undefined" && orders_upsert_request_1.OrdersUpsertRequest) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], OrdersController.prototype, "upsert", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("changeStatus"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof orders_change_status_request_1.OrdersChangeStatusRequest !== "undefined" && orders_change_status_request_1.OrdersChangeStatusRequest) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], OrdersController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("delete"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof orders_delete_request_1.OrdersDeleteRequest !== "undefined" && orders_delete_request_1.OrdersDeleteRequest) === "function" ? _k : Object, Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], OrdersController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("get"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof orders_get_request_1.OrdersGetRequest !== "undefined" && orders_get_request_1.OrdersGetRequest) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], OrdersController.prototype, "get", null);
__decorate([
    (0, common_1.Get)("getAll"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof orders_get_all_request_1.OrdersGetAllRequest !== "undefined" && orders_get_all_request_1.OrdersGetAllRequest) === "function" ? _p : Object, Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], OrdersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("getAllBuyer"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof orders_get_all_request_1.OrdersGetAllRequest !== "undefined" && orders_get_all_request_1.OrdersGetAllRequest) === "function" ? _r : Object, Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], OrdersController.prototype, "getAllBuyer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("getMy"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof orders_get_all_request_1.OrdersGetAllRequest !== "undefined" && orders_get_all_request_1.OrdersGetAllRequest) === "function" ? _t : Object, Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], OrdersController.prototype, "getMyAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("getTotal/Closed"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], OrdersController.prototype, "getAllTotal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("getTotal/ByStatus"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], OrdersController.prototype, "getAllTotalByStatus", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)({
        path: "web/orders",
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object, typeof (_c = typeof notifications_repository_1.NotificationsRepository !== "undefined" && notifications_repository_1.NotificationsRepository) === "function" ? _c : Object, typeof (_d = typeof user_companies_service_1.UserCompaniesService !== "undefined" && user_companies_service_1.UserCompaniesService) === "function" ? _d : Object, typeof (_e = typeof getCompanyById_1.CompanyService !== "undefined" && getCompanyById_1.CompanyService) === "function" ? _e : Object])
], OrdersController);


/***/ }),
/* 320 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersGetAllResponse = void 0;
class OrdersGetAllResponse {
    constructor(id, title, endDate, deliverDate, type, status, region, city, address, attachmentRequired = false, tenderId = '', companyId = '', userId = '', products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod = '', paymentMethod = '', invoices = [], tender = null) {
        this.id = id;
        this.title = title;
        this.endDate = endDate;
        this.deliverDate = deliverDate;
        this.type = type;
        this.status = status;
        this.region = region;
        this.city = city;
        this.address = address;
        this.attachmentRequired = attachmentRequired;
        this.tenderId = tenderId;
        this.companyId = companyId;
        this.userId = userId;
        this.products = products;
        this.Sendedproducts = Sendedproducts;
        this.OrderNr = OrderNr;
        this.DeliveryMethod = DeliveryMethod;
        this.paymentMethod = paymentMethod;
        this.invoices = invoices;
        this.tender = tender;
    }
    static create(id, title, endDate, deliverDate, type, status = null, region = null, city = null, address = null, attachmentRequired = false, tenderId = '', companyId = '', userId = '', products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod = '', paymentMethod = '', invoices = [], tender = null) {
        return new OrdersGetAllResponse(id, title, endDate, deliverDate, type, status, region, city, address, attachmentRequired, tenderId, companyId, userId, products, Sendedproducts, OrderNr, DeliveryMethod, paymentMethod, invoices, tender);
    }
}
exports.OrdersGetAllResponse = OrdersGetAllResponse;


/***/ }),
/* 321 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersUpsertRequest = void 0;
const class_validator_1 = __webpack_require__(55);
const class_transformer_1 = __webpack_require__(72);
const order_type_enum_1 = __webpack_require__(317);
const order_status_enum_1 = __webpack_require__(314);
const invoice_1 = __webpack_require__(322);
class Product {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Product.prototype, "itemId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "item", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Product.prototype, "discount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Product.prototype, "notice", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof File !== "undefined" && File) === "function" ? _a : Object)
], Product.prototype, "attachment", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Product.prototype, "SKUCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Product.prototype, "vat", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Product.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Product.prototype, "tender", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Product.prototype, "quatationId", void 0);
class OrdersUpsertRequest {
}
exports.OrdersUpsertRequest = OrdersUpsertRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], OrdersUpsertRequest.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], OrdersUpsertRequest.prototype, "deliverDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(order_type_enum_1.OrderTypeEnum),
    __metadata("design:type", typeof (_d = typeof order_type_enum_1.OrderTypeEnum !== "undefined" && order_type_enum_1.OrderTypeEnum) === "function" ? _d : Object)
], OrdersUpsertRequest.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(order_status_enum_1.OrderStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_e = typeof order_status_enum_1.OrderStatusEnum !== "undefined" && order_status_enum_1.OrderStatusEnum) === "function" ? _e : Object)
], OrdersUpsertRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "region", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "fileDescription", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "fileId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "attachmentName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "attachmentDescription", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "attachmentId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OrdersUpsertRequest.prototype, "attachmentRequired", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrdersUpsertRequest.prototype, "attachmentDeliverDays", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "contactInfo", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "tenderId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Product),
    __metadata("design:type", Array)
], OrdersUpsertRequest.prototype, "products", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Product),
    __metadata("design:type", Array)
], OrdersUpsertRequest.prototype, "Sendedproducts", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrdersUpsertRequest.prototype, "OrderNr", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "DeliveryMethod", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersUpsertRequest.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => invoice_1.Invoice),
    __metadata("design:type", Array)
], OrdersUpsertRequest.prototype, "invoices", void 0);


/***/ }),
/* 322 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Invoice = void 0;
class Invoice {
    constructor(fileName, companyId, createdDate, userId, enVersion, arVersion) {
        this.fileName = fileName;
        this.companyId = companyId;
        this.createdDate = createdDate;
        this.userId = userId;
        this.enVersion = enVersion;
        this.arVersion = arVersion;
    }
}
exports.Invoice = Invoice;


/***/ }),
/* 323 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersGetRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class OrdersGetRequest {
}
exports.OrdersGetRequest = OrdersGetRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], OrdersGetRequest.prototype, "id", void 0);


/***/ }),
/* 324 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersGetAllRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const app_paging_request_1 = __webpack_require__(79);
const app_transforms_1 = __webpack_require__(80);
const order_status_enum_1 = __webpack_require__(314);
const order_type_enum_1 = __webpack_require__(317);
class OrdersGetAllRequest extends app_paging_request_1.AppPagingRequest {
    constructor() {
        super(...arguments);
        this.search = null;
        this.type = null;
        this.status = null;
        this.TenderId = null;
        this.companyId = null;
    }
}
exports.OrdersGetAllRequest = OrdersGetAllRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], OrdersGetAllRequest.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(order_type_enum_1.OrderTypeEnum),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", typeof (_a = typeof order_type_enum_1.OrderTypeEnum !== "undefined" && order_type_enum_1.OrderTypeEnum) === "function" ? _a : Object)
], OrdersGetAllRequest.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(order_status_enum_1.OrderStatusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", typeof (_b = typeof order_status_enum_1.OrderStatusEnum !== "undefined" && order_status_enum_1.OrderStatusEnum) === "function" ? _b : Object)
], OrdersGetAllRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringCommasSeparatedTransform),
    __metadata("design:type", Array)
], OrdersGetAllRequest.prototype, "TenderId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], OrdersGetAllRequest.prototype, "companyId", void 0);


/***/ }),
/* 325 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersDeleteRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class OrdersDeleteRequest {
}
exports.OrdersDeleteRequest = OrdersDeleteRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], OrdersDeleteRequest.prototype, "id", void 0);


/***/ }),
/* 326 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersGetQuery = void 0;
class OrdersGetQuery {
    constructor(id) {
        this.id = id;
    }
}
exports.OrdersGetQuery = OrdersGetQuery;


/***/ }),
/* 327 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersGetAllQuery = void 0;
class OrdersGetAllQuery {
    constructor(pageSize, pageNumber, withPaging, search, type, status, TenderId, companyId, userId, statusExclusion) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.withPaging = withPaging;
        this.search = search;
        this.type = type;
        this.status = status;
        this.TenderId = TenderId;
        this.companyId = companyId;
        this.userId = userId;
        this.statusExclusion = statusExclusion;
    }
}
exports.OrdersGetAllQuery = OrdersGetAllQuery;


/***/ }),
/* 328 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersUpsertCommand = void 0;
class OrdersUpsertCommand {
    constructor(id, title, endDate, deliverDate, type, status, region, city, address, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired, attachmentDeliverDays, contactInfo, tenderId = '', companyId = '', userId = '', products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod = '', paymentMethod = '', invoices = []) {
        this.id = id;
        this.title = title;
        this.endDate = endDate;
        this.deliverDate = deliverDate;
        this.type = type;
        this.status = status;
        this.region = region;
        this.city = city;
        this.address = address;
        this.fileName = fileName;
        this.fileDescription = fileDescription;
        this.fileId = fileId;
        this.attachmentName = attachmentName;
        this.attachmentDescription = attachmentDescription;
        this.attachmentId = attachmentId;
        this.attachmentRequired = attachmentRequired;
        this.attachmentDeliverDays = attachmentDeliverDays;
        this.contactInfo = contactInfo;
        this.tenderId = tenderId;
        this.companyId = companyId;
        this.userId = userId;
        this.products = products;
        this.Sendedproducts = Sendedproducts;
        this.OrderNr = OrderNr;
        this.DeliveryMethod = DeliveryMethod;
        this.paymentMethod = paymentMethod;
        this.invoices = invoices;
    }
}
exports.OrdersUpsertCommand = OrdersUpsertCommand;


/***/ }),
/* 329 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersDeleteCommand = void 0;
class OrdersDeleteCommand {
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
    }
}
exports.OrdersDeleteCommand = OrdersDeleteCommand;


/***/ }),
/* 330 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersChangeStatusCommand = void 0;
class OrdersChangeStatusCommand {
    constructor(id, status, tenderQuotationId, OrderId, userId = '') {
        this.id = id;
        this.status = status;
        this.tenderQuotationId = tenderQuotationId;
        this.OrderId = OrderId;
        this.userId = userId;
    }
}
exports.OrdersChangeStatusCommand = OrdersChangeStatusCommand;


/***/ }),
/* 331 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersChangeStatusRequest = void 0;
const class_validator_1 = __webpack_require__(55);
const order_status_enum_1 = __webpack_require__(314);
class OrdersChangeStatusRequest {
}
exports.OrdersChangeStatusRequest = OrdersChangeStatusRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersChangeStatusRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(order_status_enum_1.OrderStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof order_status_enum_1.OrderStatusEnum !== "undefined" && order_status_enum_1.OrderStatusEnum) === "function" ? _a : Object)
], OrdersChangeStatusRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersChangeStatusRequest.prototype, "tenderQuotationId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersChangeStatusRequest.prototype, "orderId", void 0);


/***/ }),
/* 332 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersGetAllBResponse = void 0;
class OrdersGetAllBResponse {
    constructor(id, title, endDate, deliverDate, type, status, region, city, address, attachmentRequired = false, tenderId = '', companyId = '', userId = '', products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod = '', paymentMethod = '', invoices = [], tender = null, company = null) {
        this.id = id;
        this.title = title;
        this.endDate = endDate;
        this.deliverDate = deliverDate;
        this.type = type;
        this.status = status;
        this.region = region;
        this.city = city;
        this.address = address;
        this.attachmentRequired = attachmentRequired;
        this.tenderId = tenderId;
        this.companyId = companyId;
        this.userId = userId;
        this.products = products;
        this.Sendedproducts = Sendedproducts;
        this.OrderNr = OrderNr;
        this.DeliveryMethod = DeliveryMethod;
        this.paymentMethod = paymentMethod;
        this.invoices = invoices;
        this.tender = tender;
        this.company = company;
    }
    static create(id, title, endDate, deliverDate, type, status = null, region = null, city = null, address = null, attachmentRequired = false, tenderId = '', companyId = '', userId = '', products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod = '', paymentMethod = '', invoices = [], tender = null, company = null) {
        return new OrdersGetAllBResponse(id, title, endDate, deliverDate, type, status, region, city, address, attachmentRequired, tenderId, companyId, userId, products, Sendedproducts, OrderNr, DeliveryMethod, paymentMethod, invoices, tender, company);
    }
}
exports.OrdersGetAllBResponse = OrdersGetAllBResponse;


/***/ }),
/* 333 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const base_repository_1 = __webpack_require__(26);
const notification_schema_1 = __webpack_require__(334);
const category_schema_factory_1 = __webpack_require__(335);
const mongodb_1 = __webpack_require__(30);
let NotificationsRepository = class NotificationsRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
    async findByUserId(userId) {
        const results = await this.model.find({ userId }).sort({ createdAt: -1 }).limit(20).exec();
        return results.map((doc) => this.schemaFactory.createFromSchema(doc));
    }
    async insert(notification) {
        const schema = this.schemaFactory.create(notification);
        const newNotification = new this.model(schema);
        await newNotification.save();
    }
    async update(id, notification) {
        const objectId = new mongodb_1.ObjectId(id);
        const schema = this.schemaFactory.create(notification);
        const { _id, ...updatePayload } = schema;
        await this.model.updateOne({ _id: objectId }, { $set: updatePayload }).exec();
    }
    async deleteById(id) {
        const result = await this.model.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0;
    }
    async getById(id) {
        const objectId = new mongodb_1.ObjectId(id);
        const result = await this.model.findById(objectId).exec();
        return result ? this.schemaFactory.createFromSchema(result) : null;
    }
};
exports.NotificationsRepository = NotificationsRepository;
exports.NotificationsRepository = NotificationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.NotificationSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof category_schema_factory_1.NotificationSchemaFactory !== "undefined" && category_schema_factory_1.NotificationSchemaFactory) === "function" ? _b : Object])
], NotificationsRepository);


/***/ }),
/* 334 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatedNotificationSchema = exports.NotificationSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
let NotificationSchema = class NotificationSchema extends mongoose_2.Document {
};
exports.NotificationSchema = NotificationSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, auto: true }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], NotificationSchema.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NotificationSchema.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NotificationSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NotificationSchema.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], NotificationSchema.prototype, "isRead", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], NotificationSchema.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], NotificationSchema.prototype, "updatedAt", void 0);
exports.NotificationSchema = NotificationSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'notifications', timestamps: true })
], NotificationSchema);
exports.CreatedNotificationSchema = mongoose_1.SchemaFactory.createForClass(NotificationSchema);


/***/ }),
/* 335 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationSchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(25);
const notification_1 = __webpack_require__(336);
let NotificationSchemaFactory = class NotificationSchemaFactory {
    create(entity) {
        return {
            _id: new mongoose_1.Types.ObjectId(entity.id),
            userId: entity.userId,
            type: entity.type,
            message: entity.message,
            isRead: entity.isRead,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    createFromSchema(entitySchema) {
        return new notification_1.Notification(entitySchema._id.toHexString(), entitySchema.userId, entitySchema.type, entitySchema.message, entitySchema.isRead, entitySchema.createdAt, entitySchema.updatedAt);
    }
};
exports.NotificationSchemaFactory = NotificationSchemaFactory;
exports.NotificationSchemaFactory = NotificationSchemaFactory = __decorate([
    (0, common_1.Injectable)()
], NotificationSchemaFactory);


/***/ }),
/* 336 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Notification = void 0;
const cqrs_1 = __webpack_require__(41);
class Notification extends cqrs_1.AggregateRoot {
    constructor(_id, userId, type, message, isRead, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy) {
        super();
        this._id = _id;
        this.userId = userId;
        this.type = type;
        this.message = message;
        this.isRead = isRead;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
    markAsRead() {
        this.isRead = true;
        this.apply({ event: 'NotificationRead', id: this._id, timestamp: new Date() });
    }
    updateMessage(newMessage) {
        this.message = newMessage;
        this.updatedAt = new Date();
        this.apply({ event: 'NotificationUpdated', id: this._id, newMessage });
    }
}
exports.Notification = Notification;


/***/ }),
/* 337 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationFactory = void 0;
const common_1 = __webpack_require__(3);
const mongodb_1 = __webpack_require__(30);
const notification_1 = __webpack_require__(336);
const mongo_functions_1 = __webpack_require__(29);
const notifications_repository_1 = __webpack_require__(333);
let NotificationFactory = class NotificationFactory {
    constructor(notificationsRepository) {
        this.notificationsRepository = notificationsRepository;
    }
    async save(id, userId, type, message, isRead, createdAt) {
        const isInsert = id === null;
        if (isInsert) {
            const entity = new notification_1.Notification((0, mongo_functions_1.createObjectIdAsString)(id), userId, type, message, isRead, createdAt);
            await this.notificationsRepository.insert(entity);
            return entity;
        }
        const foundEntity = await this.notificationsRepository.getById(id);
        if (foundEntity == null) {
            return null;
        }
        const updatedEntity = new notification_1.Notification(foundEntity.id, foundEntity.userId, foundEntity.type, message, isRead, createdAt);
        await this.notificationsRepository.getAndUpdate({ _id: new mongodb_1.ObjectId(id) }, updatedEntity);
        return updatedEntity;
    }
};
exports.NotificationFactory = NotificationFactory;
exports.NotificationFactory = NotificationFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notifications_repository_1.NotificationsRepository !== "undefined" && notifications_repository_1.NotificationsRepository) === "function" ? _a : Object])
], NotificationFactory);


/***/ }),
/* 338 */
/***/ ((module) => {

module.exports = require("puppeteer");

/***/ }),
/* 339 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersUpsertHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const orders_upsert_command_1 = __webpack_require__(328);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const orders_repository_1 = __webpack_require__(315);
const order_factory_1 = __webpack_require__(312);
const orders_get_result_1 = __webpack_require__(340);
const companies_repository_1 = __webpack_require__(210);
const tenders_quatation_update_status_query_1 = __webpack_require__(293);
const tender_status_enum_1 = __webpack_require__(251);
let OrdersUpsertHandler = class OrdersUpsertHandler {
    constructor(ordersRepository, orderFactory, eventPublisher, companiesRepository, commandBus) {
        this.ordersRepository = ordersRepository;
        this.orderFactory = orderFactory;
        this.eventPublisher = eventPublisher;
        this.companiesRepository = companiesRepository;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const isInsert = command.id === null;
        let orderNr = command.OrderNr;
        if (!isInsert) {
            var foundEntity = await this
                .ordersRepository
                .getById(command.id);
            if (foundEntity === null) {
                return app_result_1.AppResult
                    .createError(app_errors_1.AppErrors
                    .nullValue('tender'));
            }
        }
        else {
            const lastOrder = await this.ordersRepository.getLatestOrder();
            const nextOrderNr = lastOrder ? lastOrder.OrderNr >= 1000 ? lastOrder.OrderNr + 1 : 1000 : 1000;
            orderNr = nextOrderNr;
            if (command.products.length > 0) {
                command.products.map(async (product) => {
                    const updateQuotationCommand = new tenders_quatation_update_status_query_1.TenderQuotationsUpdateStatusCommand(product.quatationId, tender_status_enum_1.TenderStatusEnum.ACCEPTED, command.userId);
                    await this.commandBus.execute(updateQuotationCommand);
                });
            }
        }
        let entity = await this
            .orderFactory
            .save(command.id, command.title, command.endDate, command.deliverDate, command.type, command.status, command.region, command.city, command.address, command.fileName, command.fileDescription, command.fileId, command.attachmentName, command.attachmentDescription, command.attachmentId, command.attachmentRequired, command.attachmentDeliverDays, command.contactInfo, command.tenderId, command.companyId, command.userId, command.products, command.Sendedproducts, orderNr, command.DeliveryMethod, command.paymentMethod, command.invoices);
        entity = this
            .eventPublisher
            .mergeObjectContext(entity);
        entity
            .commit();
        const resultData = orders_get_result_1.OrdersGetResult
            .create(entity._id, entity.title, entity.endDate, entity.deliverDate, entity.type, entity.status, entity.region, entity.city, entity.address, entity.fileName, entity.fileDescription, entity.fileId, entity.attachmentName, entity.attachmentDescription, entity.attachmentId, entity.attachmentRequired, entity.attachmentDeliverDays, entity.contactInfo, entity.tenderId, entity.companyId, entity.userId, entity.products || [], entity.Sendedproducts || [], entity.OrderNr, entity.DeliveryMethod, entity.paymentMethod, entity.invoices || []);
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.OrdersUpsertHandler = OrdersUpsertHandler;
exports.OrdersUpsertHandler = OrdersUpsertHandler = __decorate([
    (0, cqrs_1.CommandHandler)(orders_upsert_command_1.OrdersUpsertCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_repository_1.OrdersRepository !== "undefined" && orders_repository_1.OrdersRepository) === "function" ? _a : Object, typeof (_b = typeof order_factory_1.OrderFactory !== "undefined" && order_factory_1.OrderFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object, typeof (_d = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _d : Object, typeof (_e = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _e : Object])
], OrdersUpsertHandler);


/***/ }),
/* 340 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersGetResult = void 0;
class OrdersGetResult {
    constructor(id, title, endDate, deliverDate, type, status, region, city, address, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired = false, attachmentDeliverDays, contactInfo, tenderId = "", companyId = "", userId = "", products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod = "", paymentMethod = "", invoices = [], Tender = null, company = null, Buycompany = null) {
        this.id = id;
        this.title = title;
        this.endDate = endDate;
        this.deliverDate = deliverDate;
        this.type = type;
        this.status = status;
        this.region = region;
        this.city = city;
        this.address = address;
        this.fileName = fileName;
        this.fileDescription = fileDescription;
        this.fileId = fileId;
        this.attachmentName = attachmentName;
        this.attachmentDescription = attachmentDescription;
        this.attachmentId = attachmentId;
        this.attachmentRequired = attachmentRequired;
        this.attachmentDeliverDays = attachmentDeliverDays;
        this.contactInfo = contactInfo;
        this.tenderId = tenderId;
        this.companyId = companyId;
        this.userId = userId;
        this.products = products;
        this.Sendedproducts = Sendedproducts;
        this.OrderNr = OrderNr;
        this.DeliveryMethod = DeliveryMethod;
        this.paymentMethod = paymentMethod;
        this.invoices = invoices;
        this.Tender = Tender;
        this.company = company;
        this.Buycompany = Buycompany;
    }
    static create(id, title, endDate, deliverDate, type, status = null, region = null, city = null, address = null, fileName = null, fileDescription = null, fileId = null, attachmentName = null, attachmentDescription = null, attachmentId = null, attachmentRequired = false, attachmentDeliverDays = null, contactInfo = null, tenderId = "", companyId = "", userId = "", products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod = "", paymentMethod = "", invoices = [], Tender = null, company = null, Buycompany = null) {
        return new OrdersGetResult(id, title, endDate, deliverDate, type, status, region, city, address, fileName, fileDescription, fileId, attachmentName, attachmentDescription, attachmentId, attachmentRequired, attachmentDeliverDays, contactInfo, tenderId, companyId, userId, products, Sendedproducts, OrderNr, DeliveryMethod, paymentMethod, invoices, Tender, company, Buycompany);
    }
}
exports.OrdersGetResult = OrdersGetResult;


/***/ }),
/* 341 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersDeleteHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const orders_delete_command_1 = __webpack_require__(329);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const orders_repository_1 = __webpack_require__(315);
let OrdersDeleteHandler = class OrdersDeleteHandler {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }
    async execute(command) {
        const entity = await this
            .ordersRepository
            .getById(command.id);
        if (entity === null) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors
                .nullValue('object'));
        }
        if (command.userId != entity.userId) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors.notRelateToYourAccount());
        }
        const isDeleted = await this
            .ordersRepository
            .deleteById(command.id);
        if (!isDeleted) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors.operationFailed());
        }
        return app_result_1.AppResult
            .createSuccess(null, null, null);
    }
};
exports.OrdersDeleteHandler = OrdersDeleteHandler;
exports.OrdersDeleteHandler = OrdersDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(orders_delete_command_1.OrdersDeleteCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_repository_1.OrdersRepository !== "undefined" && orders_repository_1.OrdersRepository) === "function" ? _a : Object])
], OrdersDeleteHandler);


/***/ }),
/* 342 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersGetHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const orders_get_query_1 = __webpack_require__(326);
const orders_get_result_1 = __webpack_require__(340);
const orders_repository_1 = __webpack_require__(315);
let OrdersGetHandler = class OrdersGetHandler {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }
    async execute(query) {
        const entity = await this
            .ordersRepository
            .getById(query.id, {});
        if (entity === null) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors
                .nullValue('object'));
        }
        const resultData = orders_get_result_1.OrdersGetResult.create(entity._id, entity.title, entity.endDate, entity.deliverDate, entity.type, entity.status, entity.region, entity.city, entity.address, entity.fileName, entity.fileDescription, entity.fileId, entity.attachmentName, entity.attachmentDescription, entity.attachmentId, entity.attachmentRequired, entity.attachmentDeliverDays, entity.contactInfo, entity.tenderId, entity.companyId, entity.userId, entity.products, entity.Sendedproducts, entity.OrderNr, entity.DeliveryMethod, entity.paymentMethod, entity.invoices);
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.OrdersGetHandler = OrdersGetHandler;
exports.OrdersGetHandler = OrdersGetHandler = __decorate([
    (0, cqrs_1.QueryHandler)(orders_get_query_1.OrdersGetQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_repository_1.OrdersRepository !== "undefined" && orders_repository_1.OrdersRepository) === "function" ? _a : Object])
], OrdersGetHandler);


/***/ }),
/* 343 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersGetAllHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const orders_get_all_query_1 = __webpack_require__(327);
const reg_ex_functions_1 = __webpack_require__(99);
const mongo_functions_1 = __webpack_require__(29);
const orders_get_all_result_1 = __webpack_require__(344);
const orders_repository_1 = __webpack_require__(315);
const order_by_enum_1 = __webpack_require__(100);
const order_direction_enum_1 = __webpack_require__(32);
const tenders_repository_1 = __webpack_require__(253);
let OrdersGetAllHandler = class OrdersGetAllHandler {
    constructor(ordersRepository, tendersRepository) {
        this.ordersRepository = ordersRepository;
        this.tendersRepository = tendersRepository;
    }
    async execute(query) {
        const filter = {};
        if (query.search) {
            filter.$or = [
                {
                    title: (0, reg_ex_functions_1.searchRegEx)(query.search),
                },
            ];
        }
        if (query.type) {
            filter.type = query.type;
        }
        if (query.status) {
            filter.status = query.status;
        }
        if (query.companyId) {
            filter.$or = [
                { companyId: (0, mongo_functions_1.createObjectId)(query.companyId) },
                { "products.companyId": (0, mongo_functions_1.createObjectId)(query.companyId) },
            ];
        }
        if (query.userId) {
            filter.userId = (0, mongo_functions_1.createObjectId)(query.userId);
        }
        if (query.TenderId && query.TenderId.length > 0) {
            filter.tenderId = { $in: query.TenderId.map((id) => (0, mongo_functions_1.createObjectId)(id)) };
        }
        if (query.statusExclusion) {
            filter.status = { $ne: query.statusExclusion };
        }
        const result = await this.ordersRepository.getAllAsResult(filter, {}, [], query.pageSize || 10, query.pageNumber || 1, query.withPaging || true, [
            {
                field: order_by_enum_1.OrderByEnum.CREATED_AT,
                direction: order_direction_enum_1.OrderDirectionEnum.DESC,
            },
            {
                field: order_by_enum_1.OrderByEnum.TITLE,
                direction: order_direction_enum_1.OrderDirectionEnum.ASC,
            },
        ]);
        const entitiesResults = await Promise.all(result.data.map(async (element) => {
            const tender = element.tenderId
                ? await this.tendersRepository.getById(element.tenderId)
                : null;
            return orders_get_all_result_1.OrdersGetAllResult.create(element._id, element.title, element.endDate, element.deliverDate, element.type, element.status, element.region, element.city, element.address, element.attachmentRequired, element.tenderId, element.companyId, element.userId, element.products, element.Sendedproducts, element.OrderNr, element.DeliveryMethod, element.paymentMethod, element.invoices, tender);
        }));
        return app_result_1.AppResult.createSuccess(null, null, entitiesResults, result.paging);
    }
};
exports.OrdersGetAllHandler = OrdersGetAllHandler;
exports.OrdersGetAllHandler = OrdersGetAllHandler = __decorate([
    (0, cqrs_1.QueryHandler)(orders_get_all_query_1.OrdersGetAllQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_repository_1.OrdersRepository !== "undefined" && orders_repository_1.OrdersRepository) === "function" ? _a : Object, typeof (_b = typeof tenders_repository_1.TendersRepository !== "undefined" && tenders_repository_1.TendersRepository) === "function" ? _b : Object])
], OrdersGetAllHandler);


/***/ }),
/* 344 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersGetAllResult = void 0;
class OrdersGetAllResult {
    constructor(id, title, endDate, deliverDate, type, status, region, city, address, attachmentRequired = false, tenderId = '', companyId = '', userId = '', products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod, paymentMethod, invoices = [], tender = null) {
        this.id = id;
        this.title = title;
        this.endDate = endDate;
        this.deliverDate = deliverDate;
        this.type = type;
        this.status = status;
        this.region = region;
        this.city = city;
        this.address = address;
        this.attachmentRequired = attachmentRequired;
        this.tenderId = tenderId;
        this.companyId = companyId;
        this.userId = userId;
        this.products = products;
        this.Sendedproducts = Sendedproducts;
        this.OrderNr = OrderNr;
        this.DeliveryMethod = DeliveryMethod;
        this.paymentMethod = paymentMethod;
        this.invoices = invoices;
        this.tender = tender;
    }
    static create(id, title, endDate, deliverDate, type, status = null, region = null, city = null, address = null, attachmentRequired = false, tenderId = '', companyId = '', userId = '', products = [], Sendedproducts = [], OrderNr = 0, DeliveryMethod = '', paymentMethod = '', invoices = [], tender = null) {
        return new OrdersGetAllResult(id, title, endDate, deliverDate, type, status, region, city, address, attachmentRequired, tenderId, companyId, userId, products, Sendedproducts, OrderNr, DeliveryMethod, paymentMethod, invoices, tender);
    }
}
exports.OrdersGetAllResult = OrdersGetAllResult;


/***/ }),
/* 345 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersChangeStatusHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const orders_change_status_command_1 = __webpack_require__(330);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const orders_repository_1 = __webpack_require__(315);
const order_factory_1 = __webpack_require__(312);
const orders_get_result_1 = __webpack_require__(340);
const order_status_enum_1 = __webpack_require__(314);
const orders_error_1 = __webpack_require__(346);
let OrdersChangeStatusHandler = class OrdersChangeStatusHandler {
    constructor(ordersRepository, orderFactory, eventPublisher) {
        this.ordersRepository = ordersRepository;
        this.orderFactory = orderFactory;
        this.eventPublisher = eventPublisher;
    }
    async execute(command) {
        var foundOrderEntity = await this
            .ordersRepository
            .getById(command.id);
        if (foundOrderEntity === null) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors
                .nullValue('order'));
        }
        if (command.userId != foundOrderEntity.userId) {
            return app_result_1.AppResult
                .createError(app_errors_1.AppErrors.notRelateToYourAccount());
        }
        if (command.status == order_status_enum_1.OrderStatusEnum.ACCEPTED) {
            return app_result_1.AppResult
                .createError(orders_error_1.OrdersError.acceptQuotationMustHasQuotationId());
        }
        let orderEntity = await this
            .orderFactory
            .save(foundOrderEntity._id, foundOrderEntity.title, foundOrderEntity.endDate, foundOrderEntity.deliverDate, foundOrderEntity.type, command.status, foundOrderEntity.region, foundOrderEntity.city, foundOrderEntity.address, foundOrderEntity.fileName, foundOrderEntity.fileDescription, foundOrderEntity.fileId, foundOrderEntity.attachmentName, foundOrderEntity.attachmentDescription, foundOrderEntity.attachmentId, foundOrderEntity.attachmentRequired, foundOrderEntity.attachmentDeliverDays, foundOrderEntity.contactInfo, foundOrderEntity.tenderId, foundOrderEntity.companyId, foundOrderEntity.userId, foundOrderEntity.products, foundOrderEntity.Sendedproducts, foundOrderEntity.OrderNr, foundOrderEntity.DeliveryMethod, foundOrderEntity.paymentMethod, foundOrderEntity.invoices);
        orderEntity = this
            .eventPublisher
            .mergeObjectContext(orderEntity);
        orderEntity
            .commit();
        const resultData = orders_get_result_1.OrdersGetResult
            .create(orderEntity._id, orderEntity.title, orderEntity.endDate, orderEntity.deliverDate, orderEntity.type, orderEntity.status, orderEntity.region, orderEntity.city, orderEntity.address, orderEntity.fileName, orderEntity.fileDescription, orderEntity.fileId, orderEntity.attachmentName, orderEntity.attachmentDescription, orderEntity.attachmentId, orderEntity.attachmentRequired, orderEntity.attachmentDeliverDays, orderEntity.contactInfo, orderEntity.tenderId, orderEntity.companyId, orderEntity.userId, orderEntity.products, [], orderEntity.OrderNr, orderEntity.DeliveryMethod, orderEntity.paymentMethod, orderEntity.invoices);
        return app_result_1.AppResult
            .createSuccess(null, null, resultData);
    }
};
exports.OrdersChangeStatusHandler = OrdersChangeStatusHandler;
exports.OrdersChangeStatusHandler = OrdersChangeStatusHandler = __decorate([
    (0, cqrs_1.CommandHandler)(orders_change_status_command_1.OrdersChangeStatusCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_repository_1.OrdersRepository !== "undefined" && orders_repository_1.OrdersRepository) === "function" ? _a : Object, typeof (_b = typeof order_factory_1.OrderFactory !== "undefined" && order_factory_1.OrderFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object])
], OrdersChangeStatusHandler);


/***/ }),
/* 346 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersError = void 0;
const app_messages_keys_1 = __webpack_require__(88);
const app_error_1 = __webpack_require__(93);
class OrdersError extends app_error_1.AppError {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.message = message;
    }
    static acceptQuotationMustHasQuotationId() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.notRelateToYourAccount, `Accept order must has order id`);
    }
}
exports.OrdersError = OrdersError;


/***/ }),
/* 347 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationModule = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const notification_gateway_1 = __webpack_require__(348);
const notifications_repository_1 = __webpack_require__(333);
const notification_schema_1 = __webpack_require__(334);
const category_schema_factory_1 = __webpack_require__(335);
const notification_factory_1 = __webpack_require__(337);
const notifications_controller_1 = __webpack_require__(351);
const notification_service_1 = __webpack_require__(352);
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: notification_schema_1.NotificationSchema.name, schema: notification_schema_1.CreatedNotificationSchema }]),
        ],
        providers: [
            notification_gateway_1.NotificationGateway,
            notifications_repository_1.NotificationsRepository,
            category_schema_factory_1.NotificationSchemaFactory,
            notification_factory_1.NotificationFactory,
            notification_service_1.NotificationService
        ],
        controllers: [
            notifications_controller_1.NotificationsController
        ],
        exports: [
            notifications_repository_1.NotificationsRepository,
            category_schema_factory_1.NotificationSchemaFactory,
        ],
    })
], NotificationModule);


/***/ }),
/* 348 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationGateway = void 0;
const websockets_1 = __webpack_require__(349);
const socket_io_1 = __webpack_require__(350);
let NotificationGateway = class NotificationGateway {
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    sendNotificationToUser(userId, message) {
        this.server.to(userId).emit('notification', { message });
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], NotificationGateway.prototype, "server", void 0);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], NotificationGateway);


/***/ }),
/* 349 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 350 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 351 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsController = void 0;
const common_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(69);
const notification_service_1 = __webpack_require__(352);
let NotificationsController = class NotificationsController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async createNotification(userId, type, message) {
        return this.notificationService.createNotification(userId, type, message);
    }
    async getNotificationsForUser(req, isRead) {
        const { userId } = req.user;
        const parsedIsRead = isRead === true ? true : isRead === false ? false : undefined;
        return this.notificationService.getNotificationsForUser(userId, parsedIsRead);
    }
    async markNotificationAsRead(id) {
        return this.notificationService.markAsRead(id);
    }
    async deleteNotification(id) {
        await this.notificationService.deleteNotification(id);
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('type')),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], NotificationsController.prototype, "createNotification", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('isRead')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], NotificationsController.prototype, "getNotificationsForUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/mark-as-read/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], NotificationsController.prototype, "markNotificationAsRead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], NotificationsController.prototype, "deleteNotification", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)({
        path: 'notifications',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _a : Object])
], NotificationsController);


/***/ }),
/* 352 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationService = void 0;
const common_1 = __webpack_require__(3);
const notifications_repository_1 = __webpack_require__(333);
const notification_1 = __webpack_require__(336);
const notification_gateway_1 = __webpack_require__(348);
const mongodb_1 = __webpack_require__(30);
let NotificationService = class NotificationService {
    constructor(notificationsRepository, notificationGateway) {
        this.notificationsRepository = notificationsRepository;
        this.notificationGateway = notificationGateway;
    }
    async createNotification(userId, type, message) {
        const notification = new notification_1.Notification(new mongodb_1.ObjectId().toString(), userId, type, message, false, new Date());
        await this.notificationsRepository.insert(notification);
        this.notificationGateway.sendNotificationToUser(userId, message);
        return notification;
    }
    async getNotificationsForUser(userId, parsedIsRead) {
        return this.notificationsRepository.findByUserId(userId);
    }
    async markAsRead(id) {
        const notification = await this.notificationsRepository.getById(id);
        if (!notification) {
            throw new Error('Notification not found');
        }
        notification.isRead = true;
        await this.notificationsRepository.update(id, notification);
        return notification;
    }
    async deleteNotification(id) {
        await this.notificationsRepository.deleteById(id);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notifications_repository_1.NotificationsRepository !== "undefined" && notifications_repository_1.NotificationsRepository) === "function" ? _a : Object, typeof (_b = typeof notification_gateway_1.NotificationGateway !== "undefined" && notification_gateway_1.NotificationGateway) === "function" ? _b : Object])
], NotificationService);


/***/ }),
/* 353 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsModule = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(41);
const mongoose_1 = __webpack_require__(24);
const items_repository_1 = __webpack_require__(354);
const item_schema_1 = __webpack_require__(275);
const item_schema_factory_1 = __webpack_require__(355);
const item_factory_1 = __webpack_require__(358);
const items_upsert_handler_1 = __webpack_require__(359);
const items_change_status_handler_1 = __webpack_require__(362);
const items_delete_handler_1 = __webpack_require__(365);
const items_get_handler_1 = __webpack_require__(367);
const items_get_all_handler_1 = __webpack_require__(369);
const items_controller_1 = __webpack_require__(372);
const companies_module_1 = __webpack_require__(207);
let ItemsModule = class ItemsModule {
};
exports.ItemsModule = ItemsModule;
exports.ItemsModule = ItemsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: item_schema_1.ItemSchema.name,
                    schema: item_schema_1.CreatedItemSchema,
                },
            ]),
            companies_module_1.CompaniesModule
        ],
        providers: [
            items_repository_1.ItemsRepository,
            item_schema_factory_1.ItemSchemaFactory,
            item_factory_1.ItemFactory,
            items_upsert_handler_1.ItemsUpsertHandler,
            items_change_status_handler_1.ItemsChangeStatusHandler,
            items_delete_handler_1.ItemsDeleteHandler,
            items_get_handler_1.ItemsGetHandler,
            items_get_all_handler_1.ItemsGetAllHandler,
        ],
        controllers: [items_controller_1.ItemsController],
        exports: [],
    })
], ItemsModule);


/***/ }),
/* 354 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const base_repository_1 = __webpack_require__(26);
const item_schema_1 = __webpack_require__(275);
const item_schema_factory_1 = __webpack_require__(355);
let ItemsRepository = class ItemsRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
};
exports.ItemsRepository = ItemsRepository;
exports.ItemsRepository = ItemsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(item_schema_1.ItemSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof item_schema_factory_1.ItemSchemaFactory !== "undefined" && item_schema_factory_1.ItemSchemaFactory) === "function" ? _b : Object])
], ItemsRepository);


/***/ }),
/* 355 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemSchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const item_1 = __webpack_require__(356);
const mongo_functions_1 = __webpack_require__(29);
const attachment_1 = __webpack_require__(357);
let ItemSchemaFactory = class ItemSchemaFactory {
    create(entity) {
        return {
            _id: (0, mongo_functions_1.createObjectId)(entity._id),
            name: entity.name,
            SKUCode: entity.SKUCode,
            manufacturer: entity.manufacturer,
            brand: entity.brand,
            model: entity.model,
            unit: entity.unit,
            categories: entity.categories,
            description: entity.description || '',
            price: entity.price,
            vat: entity.vat || 0,
            stock: entity.stock || 0,
            tags: entity.tags || [],
            image: entity.image || '',
            attachments: entity.attachments?.map((attachment) => ({
                name: attachment.name || '',
                description: attachment.description || '',
                fileId: attachment.fileId,
                filepath: attachment.filepath || ''
            })) || [],
            status: entity.status,
            type: entity.type,
            companyId: (0, mongo_functions_1.createObjectId)(entity.companyId),
            userId: (0, mongo_functions_1.createObjectId)(entity.userId),
            ItemNR: entity.ItemNR || 0,
            displayOrder: entity.displayOrder || 0,
            isVisible: entity.isVisible ?? true,
            createdAt: entity.createdAt || new Date(),
            updatedAt: entity.updatedAt || new Date(),
            deletedAt: entity.deletedAt || null,
            createdBy: entity.createdBy || '',
            updatedBy: entity.updatedBy || '',
            deletedBy: entity.deletedBy || '',
        };
    }
    createFromSchema(entitySchema) {
        return new item_1.Item((0, mongo_functions_1.fromObjectId)(entitySchema._id), entitySchema.name, entitySchema.SKUCode, entitySchema.manufacturer, entitySchema.brand, entitySchema.model, entitySchema.unit, entitySchema.categories, entitySchema.description || '', entitySchema.price, entitySchema.vat || 0, entitySchema.stock || 0, entitySchema.tags || [], entitySchema.image || '', entitySchema.attachments?.map((attachment) => new attachment_1.Attachment(attachment.name || '', attachment.description || '', attachment.fileId, attachment.filepath || '')) || [], entitySchema.status, entitySchema.type, (0, mongo_functions_1.fromObjectId)(entitySchema.companyId).toString(), (0, mongo_functions_1.fromObjectId)(entitySchema.userId).toString(), entitySchema.ItemNR || 0, entitySchema.displayOrder || 0, entitySchema.isVisible ?? true, entitySchema.createdAt || new Date(), entitySchema.updatedAt || new Date(), entitySchema.deletedAt || null, entitySchema.createdBy || '', entitySchema.updatedBy || '', entitySchema.deletedBy || '');
    }
};
exports.ItemSchemaFactory = ItemSchemaFactory;
exports.ItemSchemaFactory = ItemSchemaFactory = __decorate([
    (0, common_1.Injectable)()
], ItemSchemaFactory);


/***/ }),
/* 356 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Item = void 0;
const cqrs_1 = __webpack_require__(41);
const mongo_functions_1 = __webpack_require__(29);
const item_status_enum_1 = __webpack_require__(276);
class Item extends cqrs_1.AggregateRoot {
    constructor(_id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock = 0, tags = [], image = '', attachments = [], status = item_status_enum_1.ItemStatusEnum.ACTIVE, type, companyId, userId, ItemNR = 0, displayOrder = 0, isVisible = true, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy) {
        super();
        this._id = _id;
        this.name = name;
        this.SKUCode = SKUCode;
        this.manufacturer = manufacturer;
        this.brand = brand;
        this.model = model;
        this.unit = unit;
        this.categories = categories;
        this.description = description;
        this.price = price;
        this.vat = vat;
        this.stock = stock;
        this.tags = tags;
        this.image = image;
        this.attachments = attachments;
        this.status = status;
        this.type = type;
        this.companyId = companyId;
        this.userId = userId;
        this.ItemNR = ItemNR;
        this.displayOrder = displayOrder;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
    static create(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock = 0, tags = [], image = '', attachments = [], status = item_status_enum_1.ItemStatusEnum.ACTIVE, type, companyId, userId, ItemNR = 0, displayOrder = 0, isVisible = true, createdAt = null, updatedAt = null, deletedAt = null, createdBy = null, updatedBy = null, deletedBy = null) {
        return new Item((0, mongo_functions_1.createObjectIdAsString)(id), name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, attachments, status, type, companyId, userId, ItemNR, displayOrder, isVisible, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy);
    }
}
exports.Item = Item;


/***/ }),
/* 357 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Attachment = void 0;
class Attachment {
    constructor(name, description, fileId, filepath) {
        this.name = name;
        this.description = description;
        this.fileId = fileId;
        this.filepath = filepath;
    }
}
exports.Attachment = Attachment;


/***/ }),
/* 358 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemFactory = void 0;
const common_1 = __webpack_require__(3);
const item_1 = __webpack_require__(356);
const items_repository_1 = __webpack_require__(354);
const mongo_functions_1 = __webpack_require__(29);
const attachment_1 = __webpack_require__(357);
const class_validator_1 = __webpack_require__(55);
let ItemFactory = class ItemFactory {
    constructor(itemsRepository) {
        this.itemsRepository = itemsRepository;
    }
    async save(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, attachments, status, type, companyId, userId, ItemNR) {
        const isInsert = id === null;
        let processedAttachments = [];
        if (!(0, class_validator_1.isEmpty)(attachments)) {
            processedAttachments = attachments.map((attachment) => new attachment_1.Attachment(attachment.name, attachment.description, attachment.fileId || null, attachment.filepath || null));
        }
        if (isInsert) {
            const entity = item_1.Item.create((0, mongo_functions_1.createObjectIdAsString)(id), name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, processedAttachments, status, type, companyId, userId, ItemNR);
            await this.itemsRepository.insert(entity);
            return entity;
        }
        const foundEntity = await this.itemsRepository.getById(id);
        if (foundEntity === null) {
            return null;
        }
        foundEntity.name = name;
        foundEntity.SKUCode = SKUCode;
        foundEntity.manufacturer = manufacturer;
        foundEntity.brand = brand;
        foundEntity.model = model;
        foundEntity.unit = unit;
        foundEntity.categories = categories;
        foundEntity.description = description;
        foundEntity.price = price;
        foundEntity.vat = vat;
        foundEntity.stock = stock;
        foundEntity.tags = tags;
        foundEntity.image = image;
        foundEntity.attachments = processedAttachments;
        foundEntity.status = status;
        foundEntity.type = type;
        foundEntity.ItemNR = ItemNR;
        const updatedEntity = await this.itemsRepository.getAndUpdate({ _id: (0, mongo_functions_1.createObjectId)(id) }, foundEntity);
        return updatedEntity;
    }
};
exports.ItemFactory = ItemFactory;
exports.ItemFactory = ItemFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof items_repository_1.ItemsRepository !== "undefined" && items_repository_1.ItemsRepository) === "function" ? _a : Object])
], ItemFactory);


/***/ }),
/* 359 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsUpsertHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const items_upsert_command_1 = __webpack_require__(360);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const items_repository_1 = __webpack_require__(354);
const item_factory_1 = __webpack_require__(358);
const items_get_result_1 = __webpack_require__(361);
const companies_repository_1 = __webpack_require__(210);
let ItemsUpsertHandler = class ItemsUpsertHandler {
    constructor(itemsRepository, itemFactory, eventPublisher, companiesRepository) {
        this.itemsRepository = itemsRepository;
        this.itemFactory = itemFactory;
        this.eventPublisher = eventPublisher;
        this.companiesRepository = companiesRepository;
    }
    async execute(command) {
        const isInsert = command.id === null;
        if (!isInsert) {
            const foundEntity = await this.itemsRepository.getById(command.id);
            if (foundEntity === null) {
                throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("item"));
            }
            if (command.userId !== foundEntity.userId) {
                throw app_result_1.AppResult.createError(app_errors_1.AppErrors.notRelateToYourAccount());
            }
        }
        else {
            await this.companiesRepository.updateItemNr(command.companyId, command.ItemNR);
        }
        let entity = await this.itemFactory.save(command.id, command.name, command.SKUCode, command.manufacturer, command.brand, command.model, command.unit, command.categories, command.description, command.price, command.vat, command.stock, command.tags, command.image, command.attachments, command.status, command.type, command.companyId, command.userId, command.ItemNR);
        entity = this.eventPublisher.mergeObjectContext(entity);
        entity.commit();
        const resultData = items_get_result_1.ItemsGetResult.create(entity._id, entity.name, entity.SKUCode, entity.manufacturer, entity.brand, entity.model, entity.unit, entity.categories, entity.description, entity.price, entity.vat, entity.stock, entity.tags, entity.image, entity.attachments || [], entity.status, entity.type, entity.companyId, entity.userId, entity.ItemNR);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.ItemsUpsertHandler = ItemsUpsertHandler;
exports.ItemsUpsertHandler = ItemsUpsertHandler = __decorate([
    (0, cqrs_1.CommandHandler)(items_upsert_command_1.ItemsUpsertCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof items_repository_1.ItemsRepository !== "undefined" && items_repository_1.ItemsRepository) === "function" ? _a : Object, typeof (_b = typeof item_factory_1.ItemFactory !== "undefined" && item_factory_1.ItemFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object, typeof (_d = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _d : Object])
], ItemsUpsertHandler);


/***/ }),
/* 360 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsUpsertCommand = void 0;
class ItemsUpsertCommand {
    constructor(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, attachments, status, type, companyId = '', userId = '', ItemNR = 0) {
        this.id = id;
        this.name = name;
        this.SKUCode = SKUCode;
        this.manufacturer = manufacturer;
        this.brand = brand;
        this.model = model;
        this.unit = unit;
        this.categories = categories;
        this.description = description;
        this.price = price;
        this.vat = vat;
        this.stock = stock;
        this.tags = tags;
        this.image = image;
        this.attachments = attachments;
        this.status = status;
        this.type = type;
        this.companyId = companyId;
        this.userId = userId;
        this.ItemNR = ItemNR;
    }
}
exports.ItemsUpsertCommand = ItemsUpsertCommand;


/***/ }),
/* 361 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsGetResult = void 0;
class ItemsGetResult {
    constructor(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, attachments, status, type, companyId = '', userId = '', ItemNR = 0, displayOrder = 0, isVisible = true, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy) {
        this.id = id;
        this.name = name;
        this.SKUCode = SKUCode;
        this.manufacturer = manufacturer;
        this.brand = brand;
        this.model = model;
        this.unit = unit;
        this.categories = categories;
        this.description = description;
        this.price = price;
        this.vat = vat;
        this.stock = stock;
        this.tags = tags;
        this.image = image;
        this.attachments = attachments;
        this.status = status;
        this.type = type;
        this.companyId = companyId;
        this.userId = userId;
        this.ItemNR = ItemNR;
        this.displayOrder = displayOrder;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
    static create(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, attachments, status, type, companyId, userId, ItemNR = 0, displayOrder = 0, isVisible = true, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy) {
        return new ItemsGetResult(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, attachments, status, type, companyId, userId, ItemNR, displayOrder, isVisible, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy);
    }
}
exports.ItemsGetResult = ItemsGetResult;


/***/ }),
/* 362 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsChangeStatusHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const items_change_status_command_1 = __webpack_require__(363);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const items_repository_1 = __webpack_require__(354);
const item_factory_1 = __webpack_require__(358);
const items_get_result_1 = __webpack_require__(361);
const item_status_enum_1 = __webpack_require__(276);
const items_error_1 = __webpack_require__(364);
let ItemsChangeStatusHandler = class ItemsChangeStatusHandler {
    constructor(itemsRepository, itemFactory, eventPublisher) {
        this.itemsRepository = itemsRepository;
        this.itemFactory = itemFactory;
        this.eventPublisher = eventPublisher;
    }
    async execute(command) {
        const foundItemEntity = await this.itemsRepository.getById(command.id);
        if (foundItemEntity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("item"));
        }
        if (command.userId !== foundItemEntity.userId) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.notRelateToYourAccount());
        }
        if (command.status === item_status_enum_1.ItemStatusEnum.OUT_OF_STOCK &&
            foundItemEntity.stock > 0) {
            throw app_result_1.AppResult.createError(items_error_1.ItemsError.stockMustBeZeroForOutOfStock());
        }
        let itemEntity = await this.itemFactory.save(foundItemEntity._id, foundItemEntity.name, foundItemEntity.SKUCode, foundItemEntity.manufacturer, foundItemEntity.brand, foundItemEntity.model, foundItemEntity.unit, foundItemEntity.categories, foundItemEntity.description, foundItemEntity.price, foundItemEntity.vat, foundItemEntity.stock, foundItemEntity.tags, foundItemEntity.image, foundItemEntity.attachments, command.status, foundItemEntity.type, foundItemEntity.companyId, foundItemEntity.userId, foundItemEntity.ItemNR);
        itemEntity = this.eventPublisher.mergeObjectContext(itemEntity);
        itemEntity.commit();
        const attachments = itemEntity.attachments?.map((attachment) => ({
            name: attachment.name,
            description: attachment.description,
            fileId: typeof attachment.fileId === "string"
                ? attachment.fileId
                : attachment.fileId,
            filepath: attachment.filepath || null,
        })) || [];
        const resultData = items_get_result_1.ItemsGetResult.create(itemEntity._id, itemEntity.name, itemEntity.SKUCode, itemEntity.manufacturer, itemEntity.brand, itemEntity.model, itemEntity.unit, itemEntity.categories, itemEntity.description, itemEntity.price, itemEntity.vat, itemEntity.stock, itemEntity.tags, itemEntity.image, attachments, itemEntity.status, itemEntity.type, itemEntity.companyId, itemEntity.userId, itemEntity.ItemNR);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.ItemsChangeStatusHandler = ItemsChangeStatusHandler;
exports.ItemsChangeStatusHandler = ItemsChangeStatusHandler = __decorate([
    (0, cqrs_1.CommandHandler)(items_change_status_command_1.ItemsChangeStatusCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof items_repository_1.ItemsRepository !== "undefined" && items_repository_1.ItemsRepository) === "function" ? _a : Object, typeof (_b = typeof item_factory_1.ItemFactory !== "undefined" && item_factory_1.ItemFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object])
], ItemsChangeStatusHandler);


/***/ }),
/* 363 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsChangeStatusCommand = void 0;
class ItemsChangeStatusCommand {
    constructor(id, status, userId = '') {
        this.id = id;
        this.status = status;
        this.userId = userId;
    }
}
exports.ItemsChangeStatusCommand = ItemsChangeStatusCommand;


/***/ }),
/* 364 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsError = void 0;
const app_messages_keys_1 = __webpack_require__(88);
const app_error_1 = __webpack_require__(93);
class ItemsError extends app_error_1.AppError {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.message = message;
    }
    static stockMustBeZeroForOutOfStock() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.invalidStockOperation, `Stock must be zero to mark the item as OutOfStock.`);
    }
    static stockMustBeGreaterThanZero() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.invalidStock, `Stock must be greater than zero for this operation.`, 400);
    }
    static invalidItemType() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.invalidType, `The item type provided is invalid.`, 400);
    }
    static itemNotFound() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.notFound, `The requested item could not be found.`, 404);
    }
    static userNotAuthorized() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.notRelateToYourAccount, `You are not authorized to perform this action.`, 403);
    }
    static requiredFieldMissing(fieldName) {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.requiredField, `The field '${fieldName}' is required.`, 400);
    }
}
exports.ItemsError = ItemsError;


/***/ }),
/* 365 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsDeleteHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const items_delete_command_1 = __webpack_require__(366);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const items_repository_1 = __webpack_require__(354);
let ItemsDeleteHandler = class ItemsDeleteHandler {
    constructor(itemsRepository) {
        this.itemsRepository = itemsRepository;
    }
    async execute(command) {
        const entity = await this.itemsRepository.getById(command.id);
        if (entity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("item"));
        }
        const isDeleted = await this.itemsRepository.deleteById(command.id);
        if (!isDeleted) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.operationFailed());
        }
        return app_result_1.AppResult.createSuccess(null, null, null);
    }
};
exports.ItemsDeleteHandler = ItemsDeleteHandler;
exports.ItemsDeleteHandler = ItemsDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(items_delete_command_1.ItemsDeleteCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof items_repository_1.ItemsRepository !== "undefined" && items_repository_1.ItemsRepository) === "function" ? _a : Object])
], ItemsDeleteHandler);


/***/ }),
/* 366 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsDeleteCommand = void 0;
class ItemsDeleteCommand {
    constructor(id) {
        this.id = id;
    }
}
exports.ItemsDeleteCommand = ItemsDeleteCommand;


/***/ }),
/* 367 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsGetHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const items_get_query_1 = __webpack_require__(368);
const items_get_result_1 = __webpack_require__(361);
const items_repository_1 = __webpack_require__(354);
let ItemsGetHandler = class ItemsGetHandler {
    constructor(itemsRepository) {
        this.itemsRepository = itemsRepository;
    }
    async execute(query) {
        const entity = await this.itemsRepository.getById(query.id, {});
        if (entity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("item"));
        }
        const resultData = items_get_result_1.ItemsGetResult.create(entity._id, entity.name, entity.SKUCode, entity.manufacturer, entity.brand, entity.model, entity.unit, entity.categories, entity.description, entity.price, entity.vat, entity.stock, entity.tags, entity.image, entity.attachments || [], entity.status, entity.type, entity.companyId, entity.userId, entity.ItemNR);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.ItemsGetHandler = ItemsGetHandler;
exports.ItemsGetHandler = ItemsGetHandler = __decorate([
    (0, cqrs_1.QueryHandler)(items_get_query_1.ItemsGetQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof items_repository_1.ItemsRepository !== "undefined" && items_repository_1.ItemsRepository) === "function" ? _a : Object])
], ItemsGetHandler);


/***/ }),
/* 368 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsGetQuery = void 0;
class ItemsGetQuery {
    constructor(id) {
        this.id = id;
    }
}
exports.ItemsGetQuery = ItemsGetQuery;


/***/ }),
/* 369 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsGetAllHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const items_get_all_query_1 = __webpack_require__(370);
const reg_ex_functions_1 = __webpack_require__(99);
const mongo_functions_1 = __webpack_require__(29);
const items_get_all_result_1 = __webpack_require__(371);
const items_repository_1 = __webpack_require__(354);
const order_by_enum_1 = __webpack_require__(100);
const order_direction_enum_1 = __webpack_require__(32);
let ItemsGetAllHandler = class ItemsGetAllHandler {
    constructor(itemsRepository) {
        this.itemsRepository = itemsRepository;
    }
    async execute(query) {
        const filter = {};
        if (query.search !== null) {
            filter.$or = [
                {
                    name: (0, reg_ex_functions_1.searchRegEx)(query.search),
                },
                {
                    description: (0, reg_ex_functions_1.searchRegEx)(query.search),
                },
            ];
        }
        if (query.type !== null) {
            filter.type = query.type;
        }
        if (query.status !== null) {
            filter.status = query.status;
        }
        if (query.companyId !== null) {
            filter.companyId = (0, mongo_functions_1.createObjectId)(query.companyId);
        }
        if (query.userId !== null) {
            filter.userId = (0, mongo_functions_1.createObjectId)(query.userId);
        }
        const result = await this.itemsRepository.getAllAsResult(filter, {}, [], query.pageSize, query.pageNumber, query.withPaging, [
            {
                field: order_by_enum_1.OrderByEnum.CREATED_AT,
                direction: order_direction_enum_1.OrderDirectionEnum.DESC,
            },
            {
                field: order_by_enum_1.OrderByEnum.NAME,
                direction: order_direction_enum_1.OrderDirectionEnum.ASC,
            },
        ]);
        const entitiesResults = result.data.map((element) => items_get_all_result_1.ItemsGetAllResult.create(element._id, element.name, element.SKUCode, element.manufacturer, element.brand, element.model, element.unit, element.categories, element.description, element.price, element.vat, element.stock, element.tags, element.image, element.status, element.type, element.companyId, element.userId, element.ItemNR));
        return app_result_1.AppResult.createSuccess(null, null, entitiesResults, result.paging);
    }
};
exports.ItemsGetAllHandler = ItemsGetAllHandler;
exports.ItemsGetAllHandler = ItemsGetAllHandler = __decorate([
    (0, cqrs_1.QueryHandler)(items_get_all_query_1.ItemsGetAllQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof items_repository_1.ItemsRepository !== "undefined" && items_repository_1.ItemsRepository) === "function" ? _a : Object])
], ItemsGetAllHandler);


/***/ }),
/* 370 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsGetAllQuery = void 0;
class ItemsGetAllQuery {
    constructor(pageSize, pageNumber, withPaging, search, type, status, companyId, userId) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.withPaging = withPaging;
        this.search = search;
        this.type = type;
        this.status = status;
        this.companyId = companyId;
        this.userId = userId;
    }
}
exports.ItemsGetAllQuery = ItemsGetAllQuery;


/***/ }),
/* 371 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsGetAllResult = void 0;
class ItemsGetAllResult {
    constructor(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, status, type, companyId = "", userId = "", ItemNR = 0) {
        this.id = id;
        this.name = name;
        this.SKUCode = SKUCode;
        this.manufacturer = manufacturer;
        this.brand = brand;
        this.model = model;
        this.unit = unit;
        this.categories = categories;
        this.description = description;
        this.price = price;
        this.vat = vat;
        this.stock = stock;
        this.tags = tags;
        this.image = image;
        this.status = status;
        this.type = type;
        this.companyId = companyId;
        this.userId = userId;
        this.ItemNR = ItemNR;
    }
    static create(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, status, type, companyId, userId, ItemNR) {
        return new ItemsGetAllResult(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, status, type, companyId, userId, ItemNR);
    }
}
exports.ItemsGetAllResult = ItemsGetAllResult;


/***/ }),
/* 372 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsController = void 0;
const common_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(69);
const cqrs_1 = __webpack_require__(41);
const items_get_all_response_1 = __webpack_require__(373);
const items_get_request_1 = __webpack_require__(374);
const items_get_all_request_1 = __webpack_require__(375);
const items_delete_request_1 = __webpack_require__(377);
const items_change_status_request_1 = __webpack_require__(378);
const app_response_1 = __webpack_require__(87);
const items_upsert_command_1 = __webpack_require__(360);
const items_change_status_command_1 = __webpack_require__(363);
const items_delete_command_1 = __webpack_require__(366);
const items_get_query_1 = __webpack_require__(368);
const items_get_all_query_1 = __webpack_require__(370);
const platform_express_1 = __webpack_require__(174);
const multer_config_1 = __webpack_require__(237);
const s3_upload_service_1 = __webpack_require__(239);
const s3_config_1 = __webpack_require__(241);
const client_s3_1 = __webpack_require__(240);
const items_repository_1 = __webpack_require__(354);
const class_validator_1 = __webpack_require__(55);
let ItemsController = class ItemsController {
    constructor(queryBus, commandBus, itemsRepository) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
        this.itemsRepository = itemsRepository;
    }
    async upsert(body, files, req) {
        const { userId } = req.user;
        try {
            let imagePath = null;
            if (files?.image && files.image[0]) {
                const folderPath = `${body.companyId}/images`;
                imagePath = await s3_upload_service_1.S3UploadService.uploadFile(files.image[0], folderPath);
            }
            else {
                imagePath = body.imageUrl;
            }
            let uploadedAttachments = [];
            if (files?.attachments && files.attachments.length > 0) {
                uploadedAttachments = await Promise.all(files.attachments.map(async (file) => {
                    const folderPath = `${body.companyId}/attachments`;
                    const filePath = await s3_upload_service_1.S3UploadService.uploadFile(file, folderPath);
                    return { filepath: filePath };
                }));
            }
            const metadata = JSON.parse(body.attachmentMetadata || '[]');
            const fullAttachments = metadata.map((meta, index) => ({
                ...meta,
                filepath: uploadedAttachments[index]?.filepath || null,
            }));
            const command = new items_upsert_command_1.ItemsUpsertCommand(body.id === undefined ? null : body.id, body.name, body.SKUCode, body.manufacturer, body.brand, body.model, body.unit, !(0, class_validator_1.isEmpty)(body.categories) ? body.categories : body.tags, body.description ?? '', Number(body.price), body.vat ? Number(body.vat) : null, body.stock ? Number(body.stock) : 0, [], imagePath, fullAttachments, body.status ?? null, body.type, body.companyId, userId, body.ItemNR);
            const result = await this.commandBus.execute(command);
            return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        }
        catch (error) {
            console.error('Error during item upsert:', error);
            throw new common_1.InternalServerErrorException('An error occurred while saving the item.');
        }
    }
    async changeStatus(itemsChangeStatusRequest, req) {
        const { userId } = req.user;
        const command = new items_change_status_command_1.ItemsChangeStatusCommand(itemsChangeStatusRequest.id, itemsChangeStatusRequest.status, userId);
        const result = await this.commandBus.execute(command);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async delete(itemsDeleteRequest, req) {
        const { userId } = req.user;
        const item = await this.itemsRepository.getById(itemsDeleteRequest.id);
        if (!item) {
            throw new common_1.NotFoundException("Item not found");
        }
        if (item.image) {
            try {
                const imageKey = item.image.split('/').pop();
                await s3_config_1.s3Client.send(new client_s3_1.DeleteObjectCommand({
                    Bucket: s3_config_1.S3_BUCKET,
                    Key: `${item.userId}/images/${imageKey}`,
                }));
            }
            catch (error) {
                console.error("Error deleting image from S3:", error);
                throw new common_1.InternalServerErrorException("Failed to delete image from S3.");
            }
        }
        const command = new items_delete_command_1.ItemsDeleteCommand(itemsDeleteRequest.id);
        const result = await this.commandBus.execute(command);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, null, null, result.error);
    }
    async get(itemsGetRequest) {
        const query = new items_get_query_1.ItemsGetQuery(itemsGetRequest.id);
        const result = await this.queryBus.execute(query);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async getAll(itemsGetAllRequest, req) {
        const { userId } = req.user || {};
        const query = new items_get_all_query_1.ItemsGetAllQuery(itemsGetAllRequest.pageSize, itemsGetAllRequest.pageNumber, itemsGetAllRequest.withPaging, itemsGetAllRequest.search, itemsGetAllRequest.type, itemsGetAllRequest.status, itemsGetAllRequest.companyId, userId);
        const result = await this.queryBus.execute(query);
        const responseData = result.data?.map(item => items_get_all_response_1.ItemsGetAllResponse.create(item.id, item.name, item.SKUCode, item.manufacturer, item.brand, item.model, item.unit, item.categories, item.description, item.price, item.vat, item.stock, item.tags, item.image, item.type, item.status, item.companyId, item.userId, item.ItemNR));
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('upsert'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'image', maxCount: 1 },
        { name: 'attachments', maxCount: 20 },
    ], multer_config_1.multerOptions)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ItemsController.prototype, "upsert", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('changeStatus'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof items_change_status_request_1.ItemsChangeStatusRequest !== "undefined" && items_change_status_request_1.ItemsChangeStatusRequest) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ItemsController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof items_delete_request_1.ItemsDeleteRequest !== "undefined" && items_delete_request_1.ItemsDeleteRequest) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ItemsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof items_get_request_1.ItemsGetRequest !== "undefined" && items_get_request_1.ItemsGetRequest) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], ItemsController.prototype, "get", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof items_get_all_request_1.ItemsGetAllRequest !== "undefined" && items_get_all_request_1.ItemsGetAllRequest) === "function" ? _l : Object, Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], ItemsController.prototype, "getAll", null);
exports.ItemsController = ItemsController = __decorate([
    (0, common_1.Controller)({
        path: 'web/items',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object, typeof (_c = typeof items_repository_1.ItemsRepository !== "undefined" && items_repository_1.ItemsRepository) === "function" ? _c : Object])
], ItemsController);


/***/ }),
/* 373 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsGetAllResponse = void 0;
class ItemsGetAllResponse {
    constructor(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, type = '', status, companyId = '', userId = '', ItemNR = 0) {
        this.id = id;
        this.name = name;
        this.SKUCode = SKUCode;
        this.manufacturer = manufacturer;
        this.brand = brand;
        this.model = model;
        this.unit = unit;
        this.categories = categories;
        this.description = description;
        this.price = price;
        this.vat = vat;
        this.stock = stock;
        this.tags = tags;
        this.image = image;
        this.type = type;
        this.status = status;
        this.companyId = companyId;
        this.userId = userId;
        this.ItemNR = ItemNR;
    }
    static create(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat = null, stock = null, tags = [], image = null, type, status = null, companyId = '', userId = '', ItemNR = 0) {
        return new ItemsGetAllResponse(id, name, SKUCode, manufacturer, brand, model, unit, categories, description, price, vat, stock, tags, image, type, status, companyId, userId, ItemNR);
    }
}
exports.ItemsGetAllResponse = ItemsGetAllResponse;


/***/ }),
/* 374 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsGetRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class ItemsGetRequest {
}
exports.ItemsGetRequest = ItemsGetRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ItemsGetRequest.prototype, "id", void 0);


/***/ }),
/* 375 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsGetAllRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const app_paging_request_1 = __webpack_require__(79);
const app_transforms_1 = __webpack_require__(80);
const item_status_enum_1 = __webpack_require__(276);
const item_type_enum_1 = __webpack_require__(376);
class ItemsGetAllRequest extends app_paging_request_1.AppPagingRequest {
    constructor() {
        super(...arguments);
        this.search = null;
        this.type = null;
        this.status = null;
        this.tenderId = null;
        this.companyId = null;
    }
}
exports.ItemsGetAllRequest = ItemsGetAllRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], ItemsGetAllRequest.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(item_type_enum_1.ItemTypeEnum),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", typeof (_a = typeof item_type_enum_1.ItemTypeEnum !== "undefined" && item_type_enum_1.ItemTypeEnum) === "function" ? _a : Object)
], ItemsGetAllRequest.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(item_status_enum_1.ItemStatusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", typeof (_b = typeof item_status_enum_1.ItemStatusEnum !== "undefined" && item_status_enum_1.ItemStatusEnum) === "function" ? _b : Object)
], ItemsGetAllRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringCommasSeparatedTransform),
    __metadata("design:type", String)
], ItemsGetAllRequest.prototype, "tenderId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], ItemsGetAllRequest.prototype, "companyId", void 0);


/***/ }),
/* 376 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemTypeEnum = void 0;
var ItemTypeEnum;
(function (ItemTypeEnum) {
    ItemTypeEnum["MACHINE"] = "Machine";
    ItemTypeEnum["SERVICE"] = "Service";
    ItemTypeEnum["INSTALLATION"] = "Installation";
})(ItemTypeEnum || (exports.ItemTypeEnum = ItemTypeEnum = {}));


/***/ }),
/* 377 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsDeleteRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class ItemsDeleteRequest {
}
exports.ItemsDeleteRequest = ItemsDeleteRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ItemsDeleteRequest.prototype, "id", void 0);


/***/ }),
/* 378 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsChangeStatusRequest = void 0;
const class_validator_1 = __webpack_require__(55);
const item_status_enum_1 = __webpack_require__(276);
class ItemsChangeStatusRequest {
}
exports.ItemsChangeStatusRequest = ItemsChangeStatusRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ItemsChangeStatusRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(item_status_enum_1.ItemStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof item_status_enum_1.ItemStatusEnum !== "undefined" && item_status_enum_1.ItemStatusEnum) === "function" ? _a : Object)
], ItemsChangeStatusRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ItemsChangeStatusRequest.prototype, "companyId", void 0);


/***/ }),
/* 379 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HelpModule = void 0;
const common_1 = __webpack_require__(3);
const help_controller_1 = __webpack_require__(380);
const help_service_1 = __webpack_require__(381);
const users_module_1 = __webpack_require__(67);
let HelpModule = class HelpModule {
};
exports.HelpModule = HelpModule;
exports.HelpModule = HelpModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule],
        controllers: [help_controller_1.HelpController],
        providers: [help_service_1.HelpService,
        ],
    })
], HelpModule);


/***/ }),
/* 380 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HelpController = void 0;
const common_1 = __webpack_require__(3);
const platform_express_1 = __webpack_require__(174);
const help_service_1 = __webpack_require__(381);
const express_1 = __webpack_require__(180);
const jwt_auth_guard_1 = __webpack_require__(69);
let HelpController = class HelpController {
    constructor(helpService) {
        this.helpService = helpService;
    }
    async sendHelpRequest(question, attachment, req) {
    }
};
exports.HelpController = HelpController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('questions'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('attachment')),
    __param(0, (0, common_1.Body)('question')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object, typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], HelpController.prototype, "sendHelpRequest", null);
exports.HelpController = HelpController = __decorate([
    (0, common_1.Controller)({
        path: 'web/help',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof help_service_1.HelpService !== "undefined" && help_service_1.HelpService) === "function" ? _a : Object])
], HelpController);


/***/ }),
/* 381 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HelpService = void 0;
const common_1 = __webpack_require__(3);
const mailer_1 = __webpack_require__(61);
let HelpService = class HelpService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendHelpRequest(question, attachment, userName, userEmail) {
        const mailOptions = {
            to: 'deemsulaman8@gmail.com',
            subject: 'Help Request',
            template: 'help-request.ejs',
            context: {
                question,
                userName,
                userEmail,
            },
        };
        if (attachment) {
            mailOptions.attachments = [
                {
                    filename: attachment.originalname,
                    content: attachment.buffer,
                },
            ];
        }
        await this.mailerService.sendMail(mailOptions);
    }
};
exports.HelpService = HelpService;
exports.HelpService = HelpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object])
], HelpService);


/***/ }),
/* 382 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsModule = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(41);
const mongoose_1 = __webpack_require__(24);
const companies_module_1 = __webpack_require__(207);
const transforms_upsert_handler_1 = __webpack_require__(383);
const transforms_change_status_handler_1 = __webpack_require__(394);
const transforms_delete_handler_1 = __webpack_require__(397);
const transforms_get_handler_1 = __webpack_require__(399);
const notification_module_1 = __webpack_require__(347);
const orders_module_1 = __webpack_require__(311);
const transforms_get_all_handler_1 = __webpack_require__(401);
const transform_controller_1 = __webpack_require__(404);
const stransforms_repository_1 = __webpack_require__(390);
const stransform_schema_1 = __webpack_require__(392);
const transform_factory_1 = __webpack_require__(386);
const transform_schema_factory_1 = __webpack_require__(391);
const transforms_get_all_admin_handler_1 = __webpack_require__(412);
let TransformsModule = class TransformsModule {
};
exports.TransformsModule = TransformsModule;
exports.TransformsModule = TransformsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: stransform_schema_1.TransformSchema.name,
                    schema: stransform_schema_1.CreatedTransformSchema,
                },
            ]),
            companies_module_1.CompaniesModule,
            orders_module_1.OrdersModule,
            notification_module_1.NotificationModule,
        ],
        providers: [
            stransforms_repository_1.TransformsRepository,
            transform_schema_factory_1.TransformSchemaFactory,
            transform_factory_1.TransformFactory,
            transforms_upsert_handler_1.TransformsUpsertHandler,
            transforms_get_all_handler_1.TransformsGetAllHandler,
            transforms_change_status_handler_1.TransformsChangeStatusHandler,
            transforms_delete_handler_1.TransformsDeleteHandler,
            transforms_get_handler_1.TransformsGetHandler,
            transforms_get_all_admin_handler_1.TransformsGetAllAdminHandler,
        ],
        controllers: [transform_controller_1.TransformsController],
        exports: [
            stransforms_repository_1.TransformsRepository,
            transform_factory_1.TransformFactory,
        ],
    })
], TransformsModule);


/***/ }),
/* 383 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsUpsertHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const transforms_upsert_command_1 = __webpack_require__(384);
const transforms_get_result_1 = __webpack_require__(385);
const transform_factory_1 = __webpack_require__(386);
const stransforms_repository_1 = __webpack_require__(390);
let TransformsUpsertHandler = class TransformsUpsertHandler {
    constructor(transformsRepository, transformFactory, eventPublisher) {
        this.transformsRepository = transformsRepository;
        this.transformFactory = transformFactory;
        this.eventPublisher = eventPublisher;
        console.log('TransformsRepository initialized');
    }
    async execute(command) {
        const isInsert = command.id === null;
        if (!isInsert) {
            const foundEntity = await this.transformsRepository.getById(command.id);
            if (foundEntity === null) {
                throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("Transform"));
            }
        }
        let entity = await this.transformFactory.save(command.id, command.title, command.status, command.buyerId, command.sellerId, command.userId, command.orderId, command.type, command.products || [], command.totalPrice, command.transformRequest, command.transformDoc || [], command.withdrawRequest, command.bankAccount || []);
        entity = this.eventPublisher.mergeObjectContext(entity);
        entity.commit();
        const resultData = transforms_get_result_1.TransformsGetResult.create(entity._id, entity.title, entity.status, entity.buyerId, entity.sellerId, entity.userId, entity.orderId, entity.type, entity.products, entity.totalPrice, new Date(), entity.transformRequest, entity.transformDoc || [], entity.withdrawRequest, entity.bankAccount || []);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.TransformsUpsertHandler = TransformsUpsertHandler;
exports.TransformsUpsertHandler = TransformsUpsertHandler = __decorate([
    (0, cqrs_1.CommandHandler)(transforms_upsert_command_1.TransformsUpsertCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof stransforms_repository_1.TransformsRepository !== "undefined" && stransforms_repository_1.TransformsRepository) === "function" ? _a : Object, typeof (_b = typeof transform_factory_1.TransformFactory !== "undefined" && transform_factory_1.TransformFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object])
], TransformsUpsertHandler);


/***/ }),
/* 384 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsUpsertCommand = void 0;
class TransformsUpsertCommand {
    constructor(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest = false, bankAccount) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.userId = userId;
        this.orderId = orderId;
        this.type = type;
        this.products = products;
        this.totalPrice = totalPrice;
        this.transformRequest = transformRequest;
        this.transformDoc = transformDoc;
        this.withdrawRequest = withdrawRequest;
        this.bankAccount = bankAccount;
    }
}
exports.TransformsUpsertCommand = TransformsUpsertCommand;


/***/ }),
/* 385 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetResult = void 0;
class TransformsGetResult {
    constructor(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, createdAt, transformRequest = false, transformDoc, withdrawRequest = false, bankAccount) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.userId = userId;
        this.orderId = orderId;
        this.type = type;
        this.products = products;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.transformRequest = transformRequest;
        this.transformDoc = transformDoc;
        this.withdrawRequest = withdrawRequest;
        this.bankAccount = bankAccount;
    }
    static create(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, createdAt, transformRequest = false, transformDoc, withdrawRequest = false, bankAccount) {
        return new TransformsGetResult(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, createdAt, transformRequest, transformDoc || [], withdrawRequest, bankAccount || []);
    }
}
exports.TransformsGetResult = TransformsGetResult;


/***/ }),
/* 386 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformFactory = void 0;
const common_1 = __webpack_require__(3);
const transform_1 = __webpack_require__(387);
const mongo_functions_1 = __webpack_require__(29);
const attachment_1 = __webpack_require__(357);
const bank_1 = __webpack_require__(389);
const stransforms_repository_1 = __webpack_require__(390);
let TransformFactory = class TransformFactory {
    constructor(transformsRepository) {
        this.transformsRepository = transformsRepository;
    }
    async save(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt) {
        const isInsert = id === null;
        const processedAttachments = transformDoc?.map((attachment) => new attachment_1.Attachment(attachment.name, attachment.description, attachment.fileId || null, attachment.filepath || null)) || [];
        const processedBankAccounts = bankAccount?.map((account) => new bank_1.Bank(account.accountName, account.accountNumber, account.bankName, account.iban)) || [];
        if (isInsert) {
            const entity = transform_1.Transform.create((0, mongo_functions_1.createObjectIdAsString)(id), title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, processedAttachments, withdrawRequest, processedBankAccounts, createdAt || new Date(), updatedAt || new Date());
            await this.transformsRepository.insert(entity);
            return entity;
        }
        const foundEntity = await this.transformsRepository.getById(id);
        if (foundEntity === null) {
            return null;
        }
        foundEntity.title = title;
        foundEntity.status = status;
        foundEntity.buyerId = buyerId;
        foundEntity.sellerId = sellerId;
        foundEntity.userId = userId;
        foundEntity.orderId = orderId;
        foundEntity.type = type,
            foundEntity.products = products;
        foundEntity.totalPrice = totalPrice;
        foundEntity.transformRequest = transformRequest;
        foundEntity.transformDoc = processedAttachments;
        foundEntity.withdrawRequest = withdrawRequest;
        foundEntity.bankAccount = processedBankAccounts;
        foundEntity.updatedAt = new Date();
        const updatedEntity = await this.transformsRepository.getAndUpdate({ _id: (0, mongo_functions_1.createObjectId)(id) }, foundEntity);
        return updatedEntity;
    }
};
exports.TransformFactory = TransformFactory;
exports.TransformFactory = TransformFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof stransforms_repository_1.TransformsRepository !== "undefined" && stransforms_repository_1.TransformsRepository) === "function" ? _a : Object])
], TransformFactory);


/***/ }),
/* 387 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Transform = void 0;
const cqrs_1 = __webpack_require__(41);
const mongo_functions_1 = __webpack_require__(29);
const transform_status_enum_1 = __webpack_require__(388);
class Transform extends cqrs_1.AggregateRoot {
    constructor(_id, title, status = transform_status_enum_1.TransformStatusEnum.PENDING, buyerId, sellerId, userId, orderId, type, products = [], totalPrice, transformRequest = false, transformDoc = [], withdrawRequest = false, bankAccount = [], createdAt, updatedAt, displayOrder, isVisible, deletedAt, createdBy, updatedBy, deletedBy) {
        super();
        this._id = _id;
        this.title = title;
        this.status = status;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.userId = userId;
        this.orderId = orderId;
        this.type = type;
        this.products = products;
        this.totalPrice = totalPrice;
        this.transformRequest = transformRequest;
        this.transformDoc = transformDoc;
        this.withdrawRequest = withdrawRequest;
        this.bankAccount = bankAccount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.displayOrder = displayOrder;
        this.isVisible = isVisible;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
    static create(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest = false, transformDoc = [], withdrawRequest = false, bankAccount = [], createdAt = null, updatedAt = null, displayOrder = 0, isVisible = true, deletedAt = null, createdBy = null, updatedBy = null, deletedBy = null) {
        return new Transform((0, mongo_functions_1.createObjectIdAsString)(id), title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt, displayOrder, isVisible, deletedAt, createdBy, updatedBy, deletedBy);
    }
}
exports.Transform = Transform;


/***/ }),
/* 388 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformStatusEnum = void 0;
var TransformStatusEnum;
(function (TransformStatusEnum) {
    TransformStatusEnum["PENDING"] = "Pending";
    TransformStatusEnum["ACCEPTED"] = "Accepted";
    TransformStatusEnum["REFUSED"] = "Refused";
})(TransformStatusEnum || (exports.TransformStatusEnum = TransformStatusEnum = {}));


/***/ }),
/* 389 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Bank = void 0;
class Bank {
    constructor(accountName, accountNumber, bankName, iban) {
        this.accountName = accountName;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.iban = iban;
    }
}
exports.Bank = Bank;


/***/ }),
/* 390 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsRepository = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const base_repository_1 = __webpack_require__(26);
const transform_schema_factory_1 = __webpack_require__(391);
const stransform_schema_1 = __webpack_require__(392);
let TransformsRepository = class TransformsRepository extends base_repository_1.BaseRepository {
    constructor(model, schemaFactory) {
        super(model, schemaFactory);
        this.model = model;
        this.schemaFactory = schemaFactory;
    }
};
exports.TransformsRepository = TransformsRepository;
exports.TransformsRepository = TransformsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(stransform_schema_1.TransformSchema.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof transform_schema_factory_1.TransformSchemaFactory !== "undefined" && transform_schema_factory_1.TransformSchemaFactory) === "function" ? _b : Object])
], TransformsRepository);


/***/ }),
/* 391 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformSchemaFactory = void 0;
const common_1 = __webpack_require__(3);
const transform_1 = __webpack_require__(387);
const mongo_functions_1 = __webpack_require__(29);
const attachment_1 = __webpack_require__(357);
const bank_1 = __webpack_require__(389);
let TransformSchemaFactory = class TransformSchemaFactory {
    constructor() {
        console.log('TransformSchemaFactory is initialized');
    }
    create(entity) {
        return {
            _id: (0, mongo_functions_1.createObjectId)(entity._id),
            title: entity.title,
            status: entity.status,
            buyerId: (0, mongo_functions_1.createObjectId)(entity.buyerId),
            sellerId: (0, mongo_functions_1.createObjectId)(entity.sellerId),
            userId: (0, mongo_functions_1.createObjectId)(entity.userId),
            orderId: (0, mongo_functions_1.createObjectId)(entity.orderId),
            type: entity.type,
            products: entity.products?.map((product) => ({
                itemId: product.itemId,
                item: product.item,
                quantity: product.quantity,
                price: product.price,
                discount: product.discount || 0,
                notice: product.notice || '',
                image: product.image || '',
                attachment: product.attachment || null,
                SKUCode: product.SKUCode || '',
                vat: product.vat || '0',
                quatationId: product.quatationId || null,
            })) || [],
            totalPrice: entity.totalPrice || 0,
            transformRequest: Boolean(entity.transformRequest),
            transformDoc: entity.transformDoc?.map((doc) => ({
                name: doc.name,
                description: doc.description,
                fileId: doc.fileId || null,
                filepath: doc.filepath,
            })) || [],
            withdrawRequest: Boolean(entity.withdrawRequest),
            bankAccount: entity.bankAccount?.map((bank) => ({
                accountName: bank.accountName,
                accountNumber: bank.accountNumber,
                bankName: bank.bankName,
                iban: bank.iban,
            })) || [],
            createdAt: entity.createdAt || new Date(),
            updatedAt: entity.updatedAt || new Date(),
            displayOrder: entity.displayOrder || 0,
            isVisible: Boolean(entity.isVisible),
            deletedAt: entity.deletedAt,
            createdBy: entity.createdBy,
            updatedBy: entity.updatedBy,
            deletedBy: entity.deletedBy,
        };
    }
    createFromSchema(schema) {
        return new transform_1.Transform((0, mongo_functions_1.fromObjectId)(schema._id), schema.title, schema.status, (0, mongo_functions_1.fromObjectId)(schema.buyerId), (0, mongo_functions_1.fromObjectId)(schema.sellerId), (0, mongo_functions_1.fromObjectId)(schema.userId), (0, mongo_functions_1.fromObjectId)(schema.orderId), schema.type, schema.products?.map((product) => ({
            itemId: product.itemId,
            item: product.item,
            quantity: product.quantity,
            price: product.price,
            discount: product.discount || 0,
            notice: product.notice || '',
            image: product.image || '',
            attachment: product.attachment || null,
            SKUCode: product.SKUCode || '',
            vat: product.vat || '0',
            quatationId: product.quatationId
        })) || [], Number(schema.totalPrice) || 0, Boolean(schema.transformRequest), schema.transformDoc?.map((doc) => new attachment_1.Attachment(doc.name, doc.description, doc.fileId || null, doc.filepath)) || [], Boolean(schema.withdrawRequest), schema.bankAccount?.map((bank) => new bank_1.Bank(bank.accountName, bank.accountNumber, bank.bankName, bank.iban)) || [], schema.createdAt || new Date(), schema.updatedAt || new Date(), schema.displayOrder, schema.isVisible, schema.deletedAt, schema.createdBy, schema.updatedBy, schema.deletedBy);
    }
};
exports.TransformSchemaFactory = TransformSchemaFactory;
exports.TransformSchemaFactory = TransformSchemaFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TransformSchemaFactory);


/***/ }),
/* 392 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatedTransformSchema = exports.TransformSchema = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mongodb_1 = __webpack_require__(30);
const schemas_names_1 = __webpack_require__(34);
const company_schema_1 = __webpack_require__(211);
const user_schema_1 = __webpack_require__(36);
const base_with_Info_schema_1 = __webpack_require__(37);
const transform_status_enum_1 = __webpack_require__(388);
const order_schema_1 = __webpack_require__(316);
const transform_type_enum_1 = __webpack_require__(393);
let TransformSchema = class TransformSchema extends base_with_Info_schema_1.BaseWithInfoSchema {
};
exports.TransformSchema = TransformSchema;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TransformSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: transform_status_enum_1.TransformStatusEnum,
        default: transform_status_enum_1.TransformStatusEnum.PENDING,
    }),
    __metadata("design:type", String)
], TransformSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: company_schema_1.CompanySchema.name,
    }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _a : Object)
], TransformSchema.prototype, "buyerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: company_schema_1.CompanySchema.name,
    }),
    __metadata("design:type", typeof (_b = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _b : Object)
], TransformSchema.prototype, "sellerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: user_schema_1.UserSchema.name,
    }),
    __metadata("design:type", typeof (_c = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _c : Object)
], TransformSchema.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        index: true,
        type: mongoose_2.Types.ObjectId,
        ref: order_schema_1.OrderSchema.name,
    }),
    __metadata("design:type", typeof (_d = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _d : Object)
], TransformSchema.prototype, "orderId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: transform_type_enum_1.TransformTypeEnum,
        default: transform_type_enum_1.TransformTypeEnum.TRANSFORM,
    }),
    __metadata("design:type", String)
], TransformSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                itemId: { type: String, required: true },
                item: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                discount: { type: Number, required: true },
                notice: { type: String, required: false },
                image: { type: String, required: false },
                attachment: { type: mongoose_2.SchemaTypes.Mixed, required: false },
                SKUCode: { type: String, required: false },
                vat: { type: String, required: false },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], TransformSchema.prototype, "products", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_e = typeof Number !== "undefined" && Number) === "function" ? _e : Object)
], TransformSchema.prototype, "totalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false,
    }),
    __metadata("design:type", typeof (_f = typeof Boolean !== "undefined" && Boolean) === "function" ? _f : Object)
], TransformSchema.prototype, "transformRequest", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                name: { type: String, required: true },
                description: { type: String, required: true },
                fileId: { type: String, required: false, default: null },
                filepath: { type: String, required: true },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], TransformSchema.prototype, "transformDoc", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false,
    }),
    __metadata("design:type", typeof (_g = typeof Boolean !== "undefined" && Boolean) === "function" ? _g : Object)
], TransformSchema.prototype, "withdrawRequest", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                accountName: { type: String, required: true },
                accountNumber: { type: String, required: true },
                bankName: { type: String, required: true },
                iban: { type: String, required: true },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], TransformSchema.prototype, "bankAccount", void 0);
exports.TransformSchema = TransformSchema = __decorate([
    (0, mongoose_1.Schema)({
        collection: schemas_names_1.schemasNames.transforms,
        versionKey: false,
        timestamps: false,
    })
], TransformSchema);
exports.CreatedTransformSchema = mongoose_1.SchemaFactory.createForClass(TransformSchema);
exports.CreatedTransformSchema.set("toJSON", { virtuals: true });
exports.CreatedTransformSchema.set("toObject", { virtuals: true });


/***/ }),
/* 393 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformTypeEnum = void 0;
var TransformTypeEnum;
(function (TransformTypeEnum) {
    TransformTypeEnum["TRANSFORM"] = "Transform";
    TransformTypeEnum["WITHDRAW"] = "withdraw";
    TransformTypeEnum["ORDERTRASFORM"] = "OrderTransfrom";
})(TransformTypeEnum || (exports.TransformTypeEnum = TransformTypeEnum = {}));


/***/ }),
/* 394 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsChangeStatusHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const transforms_change_status_command_1 = __webpack_require__(395);
const transforms_get_result_1 = __webpack_require__(385);
const transform_status_enum_1 = __webpack_require__(388);
const transforms_error_1 = __webpack_require__(396);
const transform_factory_1 = __webpack_require__(386);
const stransforms_repository_1 = __webpack_require__(390);
let TransformsChangeStatusHandler = class TransformsChangeStatusHandler {
    constructor(transformsRepository, transformFactory, eventPublisher) {
        this.transformsRepository = transformsRepository;
        this.transformFactory = transformFactory;
        this.eventPublisher = eventPublisher;
        console.log('TransformsChangeStatusHandler initialized');
    }
    async execute(command) {
        const foundTransformEntity = await this.transformsRepository.getById(command.id);
        if (!foundTransformEntity) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("transform"));
        }
        if (command.status === transform_status_enum_1.TransformStatusEnum.REFUSED &&
            foundTransformEntity.status === transform_status_enum_1.TransformStatusEnum.ACCEPTED) {
            throw app_result_1.AppResult.createError(transforms_error_1.TransformsError.invalidStatusTransition("Cannot refuse an already accepted transform"));
        }
        let transformEntity = await this.transformFactory.save(foundTransformEntity._id, foundTransformEntity.title, command.status, foundTransformEntity.buyerId, foundTransformEntity.sellerId, foundTransformEntity.userId, foundTransformEntity.orderId, foundTransformEntity.type, foundTransformEntity.products, foundTransformEntity.totalPrice, command.transformRequest, foundTransformEntity.transformDoc, command.withdrawRequest, foundTransformEntity.bankAccount);
        transformEntity = this.eventPublisher.mergeObjectContext(transformEntity);
        transformEntity.commit();
        const resultData = transforms_get_result_1.TransformsGetResult.create(transformEntity._id, transformEntity.title, transformEntity.status, transformEntity.buyerId.toString(), transformEntity.sellerId.toString(), transformEntity.userId.toString(), transformEntity.orderId.toString(), transformEntity.type, transformEntity.products, transformEntity.totalPrice, new Date(), transformEntity.transformRequest, transformEntity.transformDoc, transformEntity.withdrawRequest, transformEntity.bankAccount);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.TransformsChangeStatusHandler = TransformsChangeStatusHandler;
exports.TransformsChangeStatusHandler = TransformsChangeStatusHandler = __decorate([
    (0, cqrs_1.CommandHandler)(transforms_change_status_command_1.TransformsChangeStatusCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof stransforms_repository_1.TransformsRepository !== "undefined" && stransforms_repository_1.TransformsRepository) === "function" ? _a : Object, typeof (_b = typeof transform_factory_1.TransformFactory !== "undefined" && transform_factory_1.TransformFactory) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _c : Object])
], TransformsChangeStatusHandler);


/***/ }),
/* 395 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsChangeStatusCommand = void 0;
class TransformsChangeStatusCommand {
    constructor(id, status, transformRequest, withdrawRequest) {
        this.id = id;
        this.status = status;
        this.transformRequest = transformRequest;
        this.withdrawRequest = withdrawRequest;
    }
}
exports.TransformsChangeStatusCommand = TransformsChangeStatusCommand;


/***/ }),
/* 396 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsError = void 0;
const app_messages_keys_1 = __webpack_require__(88);
const app_error_1 = __webpack_require__(93);
class TransformsError extends app_error_1.AppError {
    constructor(code, message) {
        super(code, message);
        this.code = code;
        this.message = message;
    }
    static invalidStatusTransition(textE) {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.invalidStockOperation, textE);
    }
    static stockMustBeZeroForOutOfStock() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.invalidStockOperation, `Stock must be zero to mark the Transform as OutOfStock.`);
    }
    static stockMustBeGreaterThanZero() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.invalidStock, `Stock must be greater than zero for this operation.`);
    }
    static invalidTransformType() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.invalidType, `The Transform type provided is invalid.`);
    }
    static TransformNotFound() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.notFound, `The requested Transform could not be found.`);
    }
    static userNotAuthorized() {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.notRelateToYourAccount, `You are not authorized to perform this action.`);
    }
    static requiredFieldMissing(fieldName) {
        return new app_error_1.AppError(app_messages_keys_1.appMessagesKeys.requiredField, `The field '${fieldName}' is required.`);
    }
}
exports.TransformsError = TransformsError;


/***/ }),
/* 397 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsDeleteHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const transforms_delete_command_1 = __webpack_require__(398);
const stransforms_repository_1 = __webpack_require__(390);
let TransformsDeleteHandler = class TransformsDeleteHandler {
    constructor(TransformsRepository) {
        this.TransformsRepository = TransformsRepository;
    }
    async execute(command) {
        const entity = await this.TransformsRepository.getById(command.id);
        if (entity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("Transform"));
        }
        const isDeleted = await this.TransformsRepository.deleteById(command.id);
        if (!isDeleted) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.operationFailed());
        }
        return app_result_1.AppResult.createSuccess(null, null, null);
    }
};
exports.TransformsDeleteHandler = TransformsDeleteHandler;
exports.TransformsDeleteHandler = TransformsDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(transforms_delete_command_1.TransformsDeleteCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof stransforms_repository_1.TransformsRepository !== "undefined" && stransforms_repository_1.TransformsRepository) === "function" ? _a : Object])
], TransformsDeleteHandler);


/***/ }),
/* 398 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsDeleteCommand = void 0;
class TransformsDeleteCommand {
    constructor(id) {
        this.id = id;
    }
}
exports.TransformsDeleteCommand = TransformsDeleteCommand;


/***/ }),
/* 399 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const app_errors_1 = __webpack_require__(102);
const transforms_get_query_1 = __webpack_require__(400);
const transforms_get_result_1 = __webpack_require__(385);
const stransforms_repository_1 = __webpack_require__(390);
let TransformsGetHandler = class TransformsGetHandler {
    constructor(transformsRepository) {
        this.transformsRepository = transformsRepository;
    }
    async execute(query) {
        const entity = await this.transformsRepository.getById(query.id, {});
        if (entity === null) {
            throw app_result_1.AppResult.createError(app_errors_1.AppErrors.nullValue("Transform"));
        }
        const resultData = transforms_get_result_1.TransformsGetResult.create(entity._id, entity.title, entity.status, entity.buyerId, entity.sellerId, entity.userId, entity.orderId, entity.type, entity.products || [], entity.totalPrice, new Date(), entity.transformRequest, entity.transformDoc || [], entity.withdrawRequest || false, entity.bankAccount || []);
        return app_result_1.AppResult.createSuccess(null, null, resultData);
    }
};
exports.TransformsGetHandler = TransformsGetHandler;
exports.TransformsGetHandler = TransformsGetHandler = __decorate([
    (0, cqrs_1.QueryHandler)(transforms_get_query_1.TransfromsGetQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof stransforms_repository_1.TransformsRepository !== "undefined" && stransforms_repository_1.TransformsRepository) === "function" ? _a : Object])
], TransformsGetHandler);


/***/ }),
/* 400 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransfromsGetQuery = void 0;
class TransfromsGetQuery {
    constructor(id) {
        this.id = id;
    }
}
exports.TransfromsGetQuery = TransfromsGetQuery;


/***/ }),
/* 401 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetAllHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const app_result_1 = __webpack_require__(27);
const reg_ex_functions_1 = __webpack_require__(99);
const mongo_functions_1 = __webpack_require__(29);
const transforms_get_all_result_1 = __webpack_require__(402);
const stransforms_get_all_query_1 = __webpack_require__(403);
const stransforms_repository_1 = __webpack_require__(390);
let TransformsGetAllHandler = class TransformsGetAllHandler {
    constructor(transformsRepository) {
        this.transformsRepository = transformsRepository;
    }
    async execute(query) {
        const filter = {};
        if (query.search !== null) {
            filter.$or = [
                { title: (0, reg_ex_functions_1.searchRegEx)(query.search) },
                { description: (0, reg_ex_functions_1.searchRegEx)(query.search) },
            ];
        }
        if (query.status !== null) {
            filter.status = query.status;
        }
        if (query.buyerId !== null) {
            filter.buyerId = (0, mongo_functions_1.createObjectId)(query.buyerId);
        }
        if (query.sellerId !== null) {
            filter.sellerId = (0, mongo_functions_1.createObjectId)(query.sellerId);
        }
        if (query.userId !== null) {
            filter.userId = (0, mongo_functions_1.createObjectId)(query.userId);
        }
        const result = await this.transformsRepository.getAllAsResult(filter, {}, [], query.pageSize, query.pageNumber, query.withPaging);
        const entitiesResults = result.data.map((element) => transforms_get_all_result_1.TransformsGetAllResult.create(element._id, element.title, element.status, element.buyerId, element.sellerId, element.userId, element.orderId, element.type, element.products, element.totalPrice, element.transformRequest, element.transformDoc || [], element.withdrawRequest, element.bankAccount || [], element.createdAt, element.updatedAt));
        return app_result_1.AppResult.createSuccess(null, null, entitiesResults, result.paging);
    }
};
exports.TransformsGetAllHandler = TransformsGetAllHandler;
exports.TransformsGetAllHandler = TransformsGetAllHandler = __decorate([
    (0, cqrs_1.QueryHandler)(stransforms_get_all_query_1.TransformsGetAllQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof stransforms_repository_1.TransformsRepository !== "undefined" && stransforms_repository_1.TransformsRepository) === "function" ? _a : Object])
], TransformsGetAllHandler);


/***/ }),
/* 402 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetAllResult = void 0;
class TransformsGetAllResult {
    constructor(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.userId = userId;
        this.orderId = orderId;
        this.type = type;
        this.products = products;
        this.totalPrice = totalPrice;
        this.transformRequest = transformRequest;
        this.transformDoc = transformDoc;
        this.withdrawRequest = withdrawRequest;
        this.bankAccount = bankAccount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt) {
        return new TransformsGetAllResult(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt);
    }
}
exports.TransformsGetAllResult = TransformsGetAllResult;


/***/ }),
/* 403 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetAllQuery = void 0;
class TransformsGetAllQuery {
    constructor(pageSize, pageNumber, withPaging, search, status, buyerId, sellerId, userId, startDate, endDate) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.withPaging = withPaging;
        this.search = search;
        this.status = status;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
exports.TransformsGetAllQuery = TransformsGetAllQuery;


/***/ }),
/* 404 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsController = void 0;
const common_1 = __webpack_require__(3);
const cqrs_1 = __webpack_require__(41);
const jwt_auth_guard_1 = __webpack_require__(69);
const app_response_1 = __webpack_require__(87);
const platform_express_1 = __webpack_require__(174);
const multer_config_1 = __webpack_require__(237);
const s3_upload_service_1 = __webpack_require__(239);
const transforms_upsert_command_1 = __webpack_require__(384);
const transforms_change_status_command_1 = __webpack_require__(395);
const transforms_delete_command_1 = __webpack_require__(398);
const transforms_get_query_1 = __webpack_require__(400);
const stransforms_get_all_query_1 = __webpack_require__(403);
const stransforms_repository_1 = __webpack_require__(390);
const transforms_get_all_response_1 = __webpack_require__(405);
const transforms_get_all_request_1 = __webpack_require__(406);
const transforms_change_status_request_1 = __webpack_require__(407);
const transforms_delete_request_1 = __webpack_require__(408);
const transforms_get_request_1 = __webpack_require__(409);
const transform_type_enum_1 = __webpack_require__(393);
const roles_decorator_1 = __webpack_require__(86);
const roles_guard_1 = __webpack_require__(85);
const transforms_get_admin_all_response_1 = __webpack_require__(410);
const stransforms_get_all_admin_query_1 = __webpack_require__(411);
const attachment_1 = __webpack_require__(357);
let TransformsController = class TransformsController {
    constructor(queryBus, commandBus, transformsRepository) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
        this.transformsRepository = transformsRepository;
    }
    async upsert(body, files, req) {
        const { userId } = req.user;
        try {
            const uploadedAttachments = files?.attachment
                ? await Promise.all(files.attachment.map(async (file) => {
                    try {
                        const folderPath = `${body.companyId}/attachments`;
                        const uploadResult = await s3_upload_service_1.S3UploadService.uploadFile(file, folderPath);
                        return {
                            name: file.originalname,
                            filepath: uploadResult
                        };
                    }
                    catch (uploadError) {
                        console.error("Error uploading file:", uploadError);
                        throw new common_1.InternalServerErrorException("File upload failed.");
                    }
                }))
                : [];
            const metadata = [];
            const fullAttachments = uploadedAttachments.map((meta, index) => {
                const filepath = uploadedAttachments[index]?.filepath || null;
                return new attachment_1.Attachment(meta.name, "Tranformation", null, filepath);
            });
            let transformRequest = body.transformRequest === 'true' ? true : false;
            let products = null;
            try {
                products = JSON.parse(body.products);
            }
            catch (e) {
                console.log(e);
            }
            let bankAccount = null;
            try {
                bankAccount = JSON.parse(body.bankAccount);
            }
            catch (e) {
                console.log(e);
            }
            const command = new transforms_upsert_command_1.TransformsUpsertCommand(body.id || null, body.title, body.status, body.buyerId || null, body.sellerId, userId, body.orderId || null, body.orderId === undefined ? body.buyerId === undefined ? transform_type_enum_1.TransformTypeEnum.WITHDRAW : transform_type_enum_1.TransformTypeEnum.TRANSFORM : transform_type_enum_1.TransformTypeEnum.ORDERTRASFORM, products, body.totalPrice, false, fullAttachments || [], false, bankAccount);
            const result = await this.commandBus.execute(command);
            return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
        }
        catch (error) {
            console.error('Error during Transform upsert:', error);
            throw new common_1.InternalServerErrorException('An error occurred while saving the Transform.');
        }
    }
    async changeStatus(TransformsChangeStatusRequest, req) {
        const { userId } = req.user;
        const command = new transforms_change_status_command_1.TransformsChangeStatusCommand(TransformsChangeStatusRequest.id, TransformsChangeStatusRequest.status, TransformsChangeStatusRequest.transformRequest, TransformsChangeStatusRequest.withdrawRequest);
        const result = await this.commandBus.execute(command);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async delete(TransformsDeleteRequest, req) {
        const { userId } = req.user;
        const transform = await this.transformsRepository.getById(TransformsDeleteRequest.id);
        if (!transform) {
            throw new common_1.NotFoundException('Transform not found');
        }
        const command = new transforms_delete_command_1.TransformsDeleteCommand(TransformsDeleteRequest.id);
        const result = await this.commandBus.execute(command);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, null, null, result.error);
    }
    async get(TransformsGetRequest) {
        const query = new transforms_get_query_1.TransfromsGetQuery(TransformsGetRequest.id);
        const result = await this.queryBus.execute(query);
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, result.data, null, result.error);
    }
    async getAll(TransformsGetAllRequest, req) {
        const { userId } = req.user || {};
        const query = new stransforms_get_all_query_1.TransformsGetAllQuery(TransformsGetAllRequest.pageSize || 10, TransformsGetAllRequest.pageNumber || 1, TransformsGetAllRequest.withPaging || false, TransformsGetAllRequest.search || null, TransformsGetAllRequest.status || null, TransformsGetAllRequest.buyerId || null, TransformsGetAllRequest.sellerId || null, null);
        const result = await this.queryBus.execute(query);
        console.log('Registered Query Handlers:', Array.from(this.queryBus['handlers'].keys()));
        const responseData = result.data?.map((transform) => transforms_get_all_response_1.TransformsGetAllResponse.create(transform.id, transform.title, transform.status, transform.buyerId, transform.sellerId, transform.userId, transform.orderId, transform.type, transform.products, transform.totalPrice, transform.transformRequest, transform.transformDoc, transform.withdrawRequest, transform.bankAccount, transform.createdAt));
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
    async adminGetAll(TransformsGetAllRequest, req) {
        const { userId } = req.user || {};
        const query = new stransforms_get_all_admin_query_1.TransformsGetAllAdminQuery(TransformsGetAllRequest.pageSize || 10, TransformsGetAllRequest.pageNumber || 1, TransformsGetAllRequest.withPaging || false, TransformsGetAllRequest.search || null, TransformsGetAllRequest.status || null, TransformsGetAllRequest.buyerId || null, TransformsGetAllRequest.sellerId || null, null);
        const result = await this.queryBus.execute(query);
        const responseData = result.data?.map((transform) => transforms_get_admin_all_response_1.TransformsGetAllAdminResponse.create(transform.id, transform.title, transform.status, transform.buyerId, transform.sellerId, transform.userId, transform.orderId, transform.type, transform.products, transform.totalPrice, transform.transformRequest, transform.transformDoc, transform.withdrawRequest, transform.bankAccount, transform.createdAt, transform.updatedAt, transform.buyerCompany, transform.sellerCompany));
        return app_response_1.AppResponse.create(result.isSuccess, result.key, result.message, responseData, result.paging, result.error);
    }
};
exports.TransformsController = TransformsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('upsert'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'attachment', maxCount: 20 },
    ], multer_config_1.multerOptions)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], TransformsController.prototype, "upsert", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('changeStatus'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof transforms_change_status_request_1.TransformsChangeStatusRequest !== "undefined" && transforms_change_status_request_1.TransformsChangeStatusRequest) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], TransformsController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof transforms_delete_request_1.TransformsDeleteRequest !== "undefined" && transforms_delete_request_1.TransformsDeleteRequest) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], TransformsController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof transforms_get_request_1.TransformsGetRequest !== "undefined" && transforms_get_request_1.TransformsGetRequest) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], TransformsController.prototype, "get", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof transforms_get_all_request_1.TransformsGetAllRequest !== "undefined" && transforms_get_all_request_1.TransformsGetAllRequest) === "function" ? _l : Object, Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], TransformsController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('Admin/getAll'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof transforms_get_all_request_1.TransformsGetAllRequest !== "undefined" && transforms_get_all_request_1.TransformsGetAllRequest) === "function" ? _o : Object, Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], TransformsController.prototype, "adminGetAll", null);
exports.TransformsController = TransformsController = __decorate([
    (0, common_1.Controller)({
        path: 'web/Transforms',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object, typeof (_c = typeof stransforms_repository_1.TransformsRepository !== "undefined" && stransforms_repository_1.TransformsRepository) === "function" ? _c : Object])
], TransformsController);


/***/ }),
/* 405 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetAllResponse = void 0;
class TransformsGetAllResponse {
    constructor(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.userId = userId;
        this.orderId = orderId;
        this.type = type;
        this.products = products;
        this.totalPrice = totalPrice;
        this.transformRequest = transformRequest;
        this.transformDoc = transformDoc;
        this.withdrawRequest = withdrawRequest;
        this.bankAccount = bankAccount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt) {
        return new TransformsGetAllResponse(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt);
    }
}
exports.TransformsGetAllResponse = TransformsGetAllResponse;


/***/ }),
/* 406 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetAllRequest = void 0;
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(55);
const app_paging_request_1 = __webpack_require__(79);
const app_transforms_1 = __webpack_require__(80);
const transform_status_enum_1 = __webpack_require__(388);
class TransformsGetAllRequest extends app_paging_request_1.AppPagingRequest {
    constructor() {
        super(...arguments);
        this.search = null;
        this.status = null;
    }
}
exports.TransformsGetAllRequest = TransformsGetAllRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", String)
], TransformsGetAllRequest.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(transform_status_enum_1.TransformStatusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(app_transforms_1.default.stringTransform),
    __metadata("design:type", typeof (_a = typeof transform_status_enum_1.TransformStatusEnum !== "undefined" && transform_status_enum_1.TransformStatusEnum) === "function" ? _a : Object)
], TransformsGetAllRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransformsGetAllRequest.prototype, "buyerId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransformsGetAllRequest.prototype, "sellerId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransformsGetAllRequest.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], TransformsGetAllRequest.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], TransformsGetAllRequest.prototype, "endDate", void 0);


/***/ }),
/* 407 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsChangeStatusRequest = void 0;
const class_validator_1 = __webpack_require__(55);
const transform_status_enum_1 = __webpack_require__(388);
class TransformsChangeStatusRequest {
}
exports.TransformsChangeStatusRequest = TransformsChangeStatusRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransformsChangeStatusRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(transform_status_enum_1.TransformStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof transform_status_enum_1.TransformStatusEnum !== "undefined" && transform_status_enum_1.TransformStatusEnum) === "function" ? _a : Object)
], TransformsChangeStatusRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Boolean !== "undefined" && Boolean) === "function" ? _b : Object)
], TransformsChangeStatusRequest.prototype, "transformRequest", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_c = typeof Boolean !== "undefined" && Boolean) === "function" ? _c : Object)
], TransformsChangeStatusRequest.prototype, "withdrawRequest", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransformsChangeStatusRequest.prototype, "buyerId", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransformsChangeStatusRequest.prototype, "sellerId", void 0);


/***/ }),
/* 408 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsDeleteRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class TransformsDeleteRequest {
}
exports.TransformsDeleteRequest = TransformsDeleteRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], TransformsDeleteRequest.prototype, "id", void 0);


/***/ }),
/* 409 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetRequest = void 0;
const class_validator_1 = __webpack_require__(55);
class TransformsGetRequest {
}
exports.TransformsGetRequest = TransformsGetRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], TransformsGetRequest.prototype, "id", void 0);


/***/ }),
/* 410 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetAllAdminResponse = void 0;
class TransformsGetAllAdminResponse {
    constructor(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt, buyerCompany, sellerCompany) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.userId = userId;
        this.orderId = orderId;
        this.type = type;
        this.products = products;
        this.totalPrice = totalPrice;
        this.transformRequest = transformRequest;
        this.transformDoc = transformDoc;
        this.withdrawRequest = withdrawRequest;
        this.bankAccount = bankAccount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.buyerCompany = buyerCompany;
        this.sellerCompany = sellerCompany;
    }
    static create(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt, buyerCompany, sellerCompany) {
        return new TransformsGetAllAdminResponse(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt, buyerCompany, sellerCompany);
    }
}
exports.TransformsGetAllAdminResponse = TransformsGetAllAdminResponse;


/***/ }),
/* 411 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetAllAdminQuery = void 0;
class TransformsGetAllAdminQuery {
    constructor(pageSize, pageNumber, withPaging, search, status, buyerId, sellerId, userId, startDate, endDate) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.withPaging = withPaging;
        this.search = search;
        this.status = status;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
exports.TransformsGetAllAdminQuery = TransformsGetAllAdminQuery;


/***/ }),
/* 412 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetAllAdminHandler = void 0;
const cqrs_1 = __webpack_require__(41);
const transforms_get_all_admin_result_1 = __webpack_require__(413);
const companies_repository_1 = __webpack_require__(210);
const stransforms_get_all_admin_query_1 = __webpack_require__(411);
const stransforms_repository_1 = __webpack_require__(390);
const reg_ex_functions_1 = __webpack_require__(99);
const mongo_functions_1 = __webpack_require__(29);
const app_result_1 = __webpack_require__(27);
let TransformsGetAllAdminHandler = class TransformsGetAllAdminHandler {
    constructor(transformsRepository, companiesRepository) {
        this.transformsRepository = transformsRepository;
        this.companiesRepository = companiesRepository;
    }
    async execute(query) {
        const filter = {};
        if (query.search) {
            filter.$or = [
                { title: (0, reg_ex_functions_1.searchRegEx)(query.search) },
                { description: (0, reg_ex_functions_1.searchRegEx)(query.search) },
            ];
        }
        if (query.status) {
            filter.status = query.status;
        }
        if (query.buyerId) {
            filter.buyerId = (0, mongo_functions_1.createObjectId)(query.buyerId);
        }
        if (query.sellerId) {
            filter.sellerId = (0, mongo_functions_1.createObjectId)(query.sellerId);
        }
        const transforms = await this.transformsRepository.getAllAsResult(filter, {}, [], query.pageSize, query.pageNumber, query.withPaging);
        const results = await Promise.all(transforms.data.map(async (transform) => {
            const buyerCompany = await this.companiesRepository.getById(transform.buyerId);
            const sellerCompany = await this.companiesRepository.getById(transform.sellerId);
            return transforms_get_all_admin_result_1.TransformsGetAllAdminResult.create(transform._id, transform.title, transform.status, transform.buyerId, transform.sellerId, transform.userId, transform.orderId, transform.type, transform.products, transform.totalPrice, transform.transformRequest, transform.transformDoc, transform.withdrawRequest, transform.bankAccount, transform.createdAt, transform.updatedAt, buyerCompany, sellerCompany);
        }));
        return app_result_1.AppResult.createSuccess(null, null, results, transforms.paging);
    }
};
exports.TransformsGetAllAdminHandler = TransformsGetAllAdminHandler;
exports.TransformsGetAllAdminHandler = TransformsGetAllAdminHandler = __decorate([
    (0, cqrs_1.QueryHandler)(stransforms_get_all_admin_query_1.TransformsGetAllAdminQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof stransforms_repository_1.TransformsRepository !== "undefined" && stransforms_repository_1.TransformsRepository) === "function" ? _a : Object, typeof (_b = typeof companies_repository_1.CompaniesRepository !== "undefined" && companies_repository_1.CompaniesRepository) === "function" ? _b : Object])
], TransformsGetAllAdminHandler);


/***/ }),
/* 413 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformsGetAllAdminResult = void 0;
class TransformsGetAllAdminResult {
    constructor(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt, buyerCompany, sellerCompany) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.userId = userId;
        this.orderId = orderId;
        this.type = type;
        this.products = products;
        this.totalPrice = totalPrice;
        this.transformRequest = transformRequest;
        this.transformDoc = transformDoc;
        this.withdrawRequest = withdrawRequest;
        this.bankAccount = bankAccount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.buyerCompany = buyerCompany;
        this.sellerCompany = sellerCompany;
    }
    static create(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt, buyerCompany, sellerCompany) {
        return new TransformsGetAllAdminResult(id, title, status, buyerId, sellerId, userId, orderId, type, products, totalPrice, transformRequest, transformDoc, withdrawRequest, bankAccount, createdAt, updatedAt, buyerCompany, sellerCompany);
    }
}
exports.TransformsGetAllAdminResult = TransformsGetAllAdminResult;


/***/ }),
/* 414 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentModule = void 0;
const common_1 = __webpack_require__(3);
const payment_controller_1 = __webpack_require__(415);
const payment_service_1 = __webpack_require__(416);
const users_module_1 = __webpack_require__(67);
const paylat_request_schema_1 = __webpack_require__(417);
const mongoose_1 = __webpack_require__(24);
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                { name: paylat_request_schema_1.PaylatRequest.name, schema: paylat_request_schema_1.PaylatRequestSchema },
            ]),
        ],
        controllers: [payment_controller_1.PaymentController],
        providers: [
            payment_service_1.PaymentService,
        ],
    })
], PaymentModule);


/***/ }),
/* 415 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentController = void 0;
const common_1 = __webpack_require__(3);
const payment_service_1 = __webpack_require__(416);
const express_1 = __webpack_require__(180);
const jwt_auth_guard_1 = __webpack_require__(69);
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async sendPaylatRequest(body, req) {
        try {
            await this.paymentService.processPaylatRequest(body);
            return { success: true, message: 'Pay Later request sent successfully' };
        }
        catch (error) {
            return { success: false, message: 'Failed to send Pay Later request', error: error.message };
        }
    }
    async getAllPaylatRequests() {
        try {
            const requests = await this.paymentService.getAllPaylatRequests();
            return { success: true, data: requests };
        }
        catch (error) {
            return { success: false, message: 'Failed to fetch Paylat requests', error: error.message };
        }
    }
    async acceptPaylat(id) {
        try {
            await this.paymentService.acceptPaylatRequest(id);
            return { success: true, message: 'Paylat request approved and email sent!' };
        }
        catch (error) {
            throw new common_1.HttpException("Failed to approve Paylat request", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async refusePaylat(id, body) {
        try {
            await this.paymentService.refusePaylatRequest(id, body.reason);
            return { success: true, message: 'Paylat request refused and email sent!' };
        }
        catch (error) {
            throw new common_1.HttpException("Failed to refuse Paylat request", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "sendPaylatRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAllPaylatRequests", null);
__decorate([
    (0, common_1.Post)('accept/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "acceptPaylat", null);
__decorate([
    (0, common_1.Post)('refuse/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "refusePaylat", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('web/paylat'),
    __metadata("design:paramtypes", [typeof (_a = typeof payment_service_1.PaymentService !== "undefined" && payment_service_1.PaymentService) === "function" ? _a : Object])
], PaymentController);


/***/ }),
/* 416 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
const mailer_1 = __webpack_require__(61);
const paylat_request_schema_1 = __webpack_require__(417);
let PaymentService = class PaymentService {
    constructor(mailerService, paylatRequestModel) {
        this.mailerService = mailerService;
        this.paylatRequestModel = paylatRequestModel;
    }
    async processPaylatRequest(data) {
        const newRequest = new this.paylatRequestModel({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber || null,
            company: data.company,
            status: 'pending',
        });
        await newRequest.save();
        const mailOptions = {
            to: 'deemsulaman8@gmail.com',
            subject: 'Pay Later Request',
            template: 'payment-request.ejs',
            context: {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber || 'N/A',
                company: data.company,
            },
        };
        await this.mailerService.sendMail(mailOptions);
        const userMailOptions = {
            to: data.email,
            subject: 'Confirmation: Your Pay Later Request',
            template: 'confirmation-email.ejs',
            context: {
                name: data.name,
                company: data.company,
            },
        };
        await this.mailerService.sendMail(userMailOptions);
    }
    async getAllPaylatRequests() {
        try {
            return await this.paylatRequestModel.find().sort({ createdAt: -1 }).exec();
        }
        catch (error) {
            console.error('Error fetching Paylat requests:', error);
            throw new Error('Failed to retrieve Paylat requests.');
        }
    }
    async acceptPaylatRequest(id) {
        const paylat = await this.paylatRequestModel.findById(id);
        if (!paylat) {
            throw new common_1.NotFoundException("Paylat request not found");
        }
        paylat.status = 'approved';
        await paylat.save();
        await this.mailerService.sendMail({
            to: paylat.email,
            subject: "تمت الموافقة على طلب Paylat الخاص بك",
            template: "paylat-approved.ejs",
            context: { name: paylat.name, company: paylat.company },
        });
        return paylat;
    }
    async refusePaylatRequest(id, reason) {
        const paylat = await this.paylatRequestModel.findById(id);
        if (!paylat) {
            throw new common_1.NotFoundException("Paylat request not found");
        }
        paylat.status = 'rejected';
        paylat.rejectionReason = reason;
        await paylat.save();
        await this.mailerService.sendMail({
            to: paylat.email,
            subject: "تم رفض طلب Paylat الخاص بك",
            template: "paylat-rejected.ejs",
            context: { name: paylat.name, company: paylat.company, reason },
        });
        return paylat;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(paylat_request_schema_1.PaylatRequest.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], PaymentService);


/***/ }),
/* 417 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaylatRequestSchema = exports.PaylatRequest = void 0;
const mongoose_1 = __webpack_require__(24);
const mongoose_2 = __webpack_require__(25);
let PaylatRequest = class PaylatRequest extends mongoose_2.Document {
};
exports.PaylatRequest = PaylatRequest;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaylatRequest.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaylatRequest.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PaylatRequest.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaylatRequest.prototype, "company", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending' }),
    __metadata("design:type", String)
], PaylatRequest.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PaylatRequest.prototype, "rejectionReason", void 0);
exports.PaylatRequest = PaylatRequest = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PaylatRequest);
exports.PaylatRequestSchema = mongoose_1.SchemaFactory.createForClass(PaylatRequest);


/***/ }),
/* 418 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
let AppController = class AppController {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);


/***/ }),
/* 419 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppValidationPipe = void 0;
const common_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(55);
const class_transformer_1 = __webpack_require__(72);
let AppValidationPipe = class AppValidationPipe {
    async transform(value, { metatype }) {
        const isValid = this
            .toValidate(metatype);
        if (!metatype || !isValid) {
            return value;
        }
        const object = (0, class_transformer_1.plainToClass)(metatype, value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(this
                .formatErrors(errors));
        }
        return value;
    }
    toValidate(metatype) {
        const types = [
            String,
            Boolean,
            Number,
            Array,
            Object,
        ];
        return !types
            .includes(metatype);
    }
    formatErrors(errors) {
        return errors
            .map(err => ({
            property: err.property,
            constraints: err.constraints,
        }));
    }
};
exports.AppValidationPipe = AppValidationPipe;
exports.AppValidationPipe = AppValidationPipe = __decorate([
    (0, common_1.Injectable)()
], AppValidationPipe);


/***/ }),
/* 420 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appCorsOptions = void 0;
exports.appCorsOptions = {
    origin: [
        'https://www.medex2b.com',
        'http://medex2b.com',
        'http://admin.medex2b.com',
        'https://admin.medex2b.com',
        'http://localhost:4200',
        'http://localhost:4201',
        'https://localhost:4200'
    ],
    methods: [
        'OPTIONS',
        'GET',
        'HEAD',
        'PUT',
        'PATCH',
        'POST',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-CSRF-Token',
        'X-Requested-With',
        'Accept',
        'Accept-Version'
    ],
    credentials: true,
    optionsSuccessStatus: 204,
};


/***/ }),
/* 421 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppGlobalExceptionFilter = void 0;
const common_1 = __webpack_require__(3);
const app_logger_service_1 = __webpack_require__(4);
const app_result_1 = __webpack_require__(27);
const app_response_1 = __webpack_require__(87);
let AppGlobalExceptionFilter = class AppGlobalExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    async catch(exception, host) {
        this.logger.error(exception.message, exception.stack);
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        const problemDetails = this.getProblemDetails(exception);
        let statusCode = problemDetails.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let result = null;
        if (exception instanceof app_result_1.AppResult) {
            statusCode = exception.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            result = app_response_1.AppResponse.create(false, exception.error.code, exception.error.message, null, null, exception);
        }
        else {
            result = problemDetails;
        }
        response.status(statusCode).json(result);
    }
    getProblemDetails(exception) {
        if (exception instanceof common_1.BadRequestException) {
            const response = exception.getResponse();
            return new ProblemDetails(common_1.HttpStatus.BAD_REQUEST, "ValidationFailure", "Validation error", "One or more validation errors occurred", response.message, exception.stack);
        }
        if (exception instanceof common_1.HttpException) {
            const response = exception.getResponse();
            const status = exception.getStatus();
            const details = typeof response === "string" ? response : (response["message"] || exception.message);
            return new ProblemDetails(status, this.getExceptionType(status), exception.name, details, null, exception.stack);
        }
        console.log("exception", exception instanceof app_result_1.AppResult);
        return new ProblemDetails(common_1.HttpStatus.INTERNAL_SERVER_ERROR, "ServerFailure", "Server error", exception.message, null, exception.stack);
    }
    getExceptionType(status) {
        switch (status) {
            case common_1.HttpStatus.BAD_REQUEST:
                return "ValidationFailure";
            case common_1.HttpStatus.UNAUTHORIZED:
                return "Unauthorized";
            case common_1.HttpStatus.NOT_FOUND:
                return "NotFound";
            default:
                return "ServerFailure";
        }
    }
};
exports.AppGlobalExceptionFilter = AppGlobalExceptionFilter;
exports.AppGlobalExceptionFilter = AppGlobalExceptionFilter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_logger_service_1.AppLoggerService !== "undefined" && app_logger_service_1.AppLoggerService) === "function" ? _a : Object])
], AppGlobalExceptionFilter);
class ProblemDetails {
    constructor(status, type, title, details, errors, stackTrace) {
        this.status = status;
        this.type = type;
        this.title = title;
        this.details = details;
        this.errors = errors;
        this.stackTrace = stackTrace;
    }
}


/***/ }),
/* 422 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-socket.io");

/***/ }),
/* 423 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminCompaniesUpsertRequest = void 0;
const class_validator_1 = __webpack_require__(55);
const companies_upsert_request_1 = __webpack_require__(227);
class AdminCompaniesUpsertRequest extends companies_upsert_request_1.CompaniesUpsertRequest {
}
exports.AdminCompaniesUpsertRequest = AdminCompaniesUpsertRequest;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminCompaniesUpsertRequest.prototype, "userId", void 0);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const app_logger_service_1 = __webpack_require__(4);
const app_validation_pipe_1 = __webpack_require__(419);
const app_configs_service_1 = __webpack_require__(7);
const app_cors_options_1 = __webpack_require__(420);
const app_global_exception_filter_1 = __webpack_require__(421);
const common_1 = __webpack_require__(3);
const protected_files_middleware_1 = __webpack_require__(244);
const requests_logger_middleware_1 = __webpack_require__(245);
const miedas_functions_1 = __webpack_require__(148);
const medias_constants_1 = __webpack_require__(147);
const jwt_provider_service_1 = __webpack_require__(43);
const mongoose_1 = __webpack_require__(25);
const platform_socket_io_1 = __webpack_require__(422);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
        logger: ["error", "warn", "log", "debug"],
    });
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.enableCors(app_cors_options_1.appCorsOptions);
    await pipes(app);
    app.setGlobalPrefix("api");
    const appLoggerService = app.get(app_logger_service_1.AppLoggerService);
    app.useLogger(appLoggerService);
    await filters(app, appLoggerService);
    await middlewares(app, appLoggerService);
    app.useStaticAssets((0, miedas_functions_1.getPublicDirectory)(), {
        prefix: `/${medias_constants_1.mediasConstants.paths.public}`,
    });
    await run(app, appLoggerService);
    await hotReload(app);
}
async function pipes(app) {
    app.useGlobalPipes(new app_validation_pipe_1.AppValidationPipe());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: false,
    }));
}
async function filters(app, appLoggerService) {
    console.log("first");
    app.useGlobalFilters(new app_global_exception_filter_1.AppGlobalExceptionFilter(appLoggerService));
}
async function middlewares(app, appLoggerService) {
    app.use((req, res, next) => {
        console.log("req#######################");
        new requests_logger_middleware_1.RequestsLoggerMiddleware(appLoggerService).use(req, res, next);
    });
    const jwtProviderService = app.get(jwt_provider_service_1.JwtProviderService);
    app.use((req, res, next) => new protected_files_middleware_1.ProtectedFilesMiddleware(jwtProviderService).use(req, res, next));
}
async function run(app, appLoggerService) {
    const appConfigsService = app.get(app_configs_service_1.AppConfigsService);
    if (!appConfigsService.isProduction) {
        mongoose_1.default.set("debug", true);
    }
    await app.listen(appConfigsService.appConfig.port).then(() => {
        appLoggerService.log(`'${appConfigsService.appConfig.name}' running on port ${appConfigsService.appConfig.port}`);
    });
}
async function hotReload(app) {
    if (false) {}
}
bootstrap();

})();

/******/ })()
;