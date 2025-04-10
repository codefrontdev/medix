import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const appCorsOptions: CorsOptions = {
	origin: [
		'https://www.medex2b.com',
		'http://medex2b.com',		
		'http://admin.medex2b.com',		
		'https://admin.medex2b.com',		
		//'https://deft-daifuku-622df3.netlify.app',
		//'https://keen-daffodil-00dfa6.netlify.app',
		//'http://3.66.112.240',
		'http://localhost:4200',
		'http://localhost:4201',
		//'http://localhost:3000',
		//'https://localhost:3000',
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