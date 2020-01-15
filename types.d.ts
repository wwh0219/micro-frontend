import Vue from 'Vue'
import { Factory } from 'shared/index'

declare global {
	interface Window {
		ROOT_VM?: Vue
		IS_INTERNAL?: boolean
		SUB_SYS_FACTORY_MAP: {
			[key: string]: () => Vue
		}

	}
	type AppData = {
		ID: number
		ALIAS: string
		PUBLIC_PATH: string
		PORT: number
		manifest:{
			scripts:string[]
			styles: string[]
		}
	}
	type NODE_ENV = 'production' | 'development' | 'debug'

	namespace NodeJS {
		export type EnvVars = {
			NODE_ENV: NODE_ENV
			BASE_URL: string
			ID: number
			IS_ROOT: boolean
			ROUTER_BASE: string
			BASE_API: string
			IS_DEV: boolean
			IS_PRODUCTION: boolean
			ALIAS: string
			DEV_SUB_SYS_CONFIG_MAP: {
				ID: number
				ALIAS: string
				PUBLIC_PATH: string
				PORT: number
				[key:string]:string|number
			}
		}
		export interface Process {
			env: EnvVars
		}

	}
}
