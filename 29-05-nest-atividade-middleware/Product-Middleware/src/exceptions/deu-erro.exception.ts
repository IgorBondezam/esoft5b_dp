import {HttpException, HttpStatus} from '@nestjs/common';

export class DeuErro extends HttpException {
    constructor(status: HttpStatus, message: string, id: string) {
        super({ id, message }, status);
    }
}