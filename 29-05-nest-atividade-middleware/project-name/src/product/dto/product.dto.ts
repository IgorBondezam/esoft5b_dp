import {IsNumber, IsString, Length, Max, Min,} from "class-validator";

export class ProductDto {

    @IsString()
    @Length(3, 40)
    name: string;

    @IsNumber()
    @Min(1)
    @Max(200)
    value: number;

    @IsNumber()
    @Min(1)
    @Max(200)
    quantity: number;
}
