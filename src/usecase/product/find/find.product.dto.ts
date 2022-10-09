interface InputFindProductDto {
  id: string;
}

interface OutputFindProductDto {
  id: string;
  name: string;
  price: number;
}

export {
  InputFindProductDto,
  OutputFindProductDto
}