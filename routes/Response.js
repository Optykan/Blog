'use strict';

const STATUS_OK = 200;
const STATUS_NO_CONTENT = 204;
const STATUS_NOT_FOUND = 404;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;
const STATUS_INTERNAL_ERROR = 500;

class Response{
	constructor(status, message, body){
		
		this.status  = status || null;
		this.message = message || null;
		this.body    = body || null;
		this.ok 	 = 200 <= status && status < 400;
	}
	send(res){
		res.setHeader('Content-Type', 'application/json');
		res.status(this.status).json({
			status: this.status,
			message: this.message,
			response: this.body
		});
	}
	static get STATUS_OK(){
		return STATUS_OK;
	}
	static get STATUS_NO_CONTENT(){
		return STATUS_NO_CONTENT;
	}
	static get STATUS_NOT_FOUND(){
		return STATUS_NOT_FOUND;
	}
	static get STATUS_BAD_REQUEST(){
		return STATUS_BAD_REQUEST;
	}
	static get STATUS_UNAUTHORIZED(){
		return STATUS_UNAUTHORIZED;
	}
	static get STATUS_FORBIDDEN(){
		return STATUS_FORBIDDEN;
	}
	static get STATUS_INTERNAL_ERROR(){
		return STATUS_INTERNAL_ERROR;
	}

}

module.exports = Response;