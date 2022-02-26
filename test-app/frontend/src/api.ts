export interface IAuthClient {
	 sendMessage(input: any): any;
}

export class AuthClient implements IAuthClient {
	methods = Auth.methods;
	
	sendMessage(input: any): any {
		return "hello"
	}
}

export class Connection {
	host: string
	auth: AuthClient
	private session?: string

	constructor(host: string): any {
		this.host = host
		this.auth = new AuthClient()
	}

	setSession(session: string) {
		this.session = session
	}

	getSession() {
		return this.session
	}
}
