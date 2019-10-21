import Vue from 'Vue'
import { Factory } from 'common/index'

declare global {
	interface Window {
		ROOT_VM?: Vue
		IS_INTERNAL?: boolean
		SUB_SYS_FACTORY_MAP: {
			[key: string]: Factory
		}
	}

	type NODE_ENV = 'production' | 'development' | 'debug'

	namespace NodeJS {
		export type EnvVars = {
			NODE_ENV: NODE_ENV
			BASE_URL: string
			APP_ID: number
			IS_ROOT: boolean
			ROUTER_BASE: string
			BASE_API: string
			IS_DEV: boolean
			IS_PRODUCTION: boolean
			ALIAS:string
		}
		export interface Process {
			env: EnvVars
		}
	}
}
